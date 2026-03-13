#!/usr/bin/env python3
"""
Auto Model Selector for OpenClaw

Analyzes request content and selects the optimal model based on task type.
"""

import re
import sys
import json

# Model selection rules
MODEL_RULES = {
    # Coding tasks
    "coding": {
        "keywords": [
            "code", "program", "function", "debug", "refactor", "API", 
            "endpoint", "repository", "commit", "deploy", "script", 
            "algorithm", "data structure", "class", "method", "variable",
            "loop", "conditional", "exception", "module", "package",
            "git", "version control", "pull request", "merge", "branch",
            "test", "unit test", "integration test", "CI/CD", "pipeline",
            "docker", "container", "kubernetes", "devops", "infrastructure",
            "frontend", "backend", "fullstack", "web app", "mobile app",
            "React", "Vue", "Angular", "Django", "Flask", "FastAPI",
            "Node.js", "Express", "TypeScript", "JavaScript", "Python",
            "Java", "C++", "Rust", "Go", "Ruby", "PHP", "Swift", "Kotlin"
        ],
        "model": "bailian/qwen3-coder-plus",
        "priority": 1
    },
    
    # Code review (lighter than full coding)
    "code_review": {
        "keywords": [
            "review", "lint", "style", "best practice", "optimize",
            "performance", "refactor", "clean code", "code quality"
        ],
        "model": "bailian/qwen3-coder-next",
        "priority": 2
    },
    
    # Vision/Image tasks
    "vision": {
        "keywords": [
            "image", "picture", "photo", "diagram", "chart", "graph",
            "screenshot", "visual", "draw", "design", "logo", "icon",
            "illustration", "pixel", "resolution", "crop", "resize",
            "color", "filter", "effect", "scan", "OCR", "text in image",
            "what do you see", "describe this", "analyze this image"
        ],
        "model": "bailian/kimi-k2.5",
        "priority": 1
    },
    
    # Long context tasks
    "long_context": {
        "keywords": [
            "document", "book", "article", "transcript", "log", "history",
            "full text", "entire", "complete", "whole", "all pages",
            "long", "extensive", "comprehensive", "detailed analysis",
            "summarize", "extract", "parse", "process text"
        ],
        "model": "bailian/qwen3.5-plus",
        "priority": 2
    },
    
    # Complex reasoning
    "reasoning": {
        "keywords": [
            "analyze", "compare", "evaluate", "decision", "strategy",
            "complex", "multi-step", "reasoning", "logical", "critical thinking",
            "pros and cons", "trade-offs", "implications", "consequences",
            "root cause", "diagnose", "troubleshoot", "investigate"
        ],
        "model": "bailian/qwen3-max-2026-01-23",
        "priority": 3
    },
    
    # Math/Logic
    "math": {
        "keywords": [
            "calculate", "equation", "formula", "proof", "theorem",
            "statistics", "probability", "algebra", "calculus", "geometry",
            "matrix", "vector", "derivative", "integral", "solve for x",
            "numerical", "quantitative", "arithmetic"
        ],
        "model": "bailian/glm-5",
        "priority": 2
    },
    
    # Creative writing
    "creative": {
        "keywords": [
            "write", "story", "poem", "creative", "fiction", "narrative",
            "character", "plot", "scene", "dialogue", "prose", "verse",
            "imagine", "create", "compose", "draft", "edit", "rewrite"
        ],
        "model": "bailian/qwen3.5-plus",
        "priority": 4
    },
    
    # Fast/simple tasks
    "fast": {
        "keywords": [
            "quick", "fast", "simple", "brief", "short", "quick answer",
            "yes or no", "what is", "who is", "when", "where"
        ],
        "model": "bailian/MiniMax-M2.5",
        "priority": 5
    }
}

# Default model
DEFAULT_MODEL = "bailian/qwen3.5-plus"

# Model aliases
MODEL_ALIASES = {
    "coder-plus": "bailian/qwen3-coder-plus",
    "coder-next": "bailian/qwen3-coder-next",
    "max": "bailian/qwen3-max-2026-01-23",
    "plus": "bailian/qwen3.5-plus",
    "vision": "bailian/kimi-k2.5",
    "math": "bailian/glm-5",
    "fast": "bailian/MiniMax-M2.5",
    "glm-4.7": "bailian/glm-4.7",
    "kimi": "bailian/kimi-k2.5"
}


def normalize_text(text):
    """Normalize text for keyword matching."""
    return text.lower()


def check_explicit_model(request):
    """Check if user explicitly requested a model."""
    # Check for model aliases
    for alias, full_path in MODEL_ALIASES.items():
        if f"use {alias}" in request.lower() or f"model {alias}" in request.lower():
            return full_path, f"Explicit alias request: {alias}"
    
    # Check for full model paths
    for model in ["bailian/", "dashscope/", "minimax-portal/"]:
        if model in request.lower():
            # Extract the model path
            match = re.search(r'(bailian/[^\s]+|dashscope[^\s]*|[^\s]+/qwen[^\s]*)', request.lower())
            if match:
                return match.group(1), "Explicit model path request"
    
    return None, None


def score_request(request, rule):
    """Score a request against a rule's keywords."""
    normalized = normalize_text(request)
    score = 0
    
    for keyword in rule["keywords"]:
        if keyword.lower() in normalized:
            score += 1
    
    return score


def select_model(request):
    """
    Select the best model for a given request.
    
    Returns:
        tuple: (model_path, reason, confidence)
    """
    # Check for explicit model request first
    explicit_model, explicit_reason = check_explicit_model(request)
    if explicit_model:
        return explicit_model, explicit_reason, 1.0
    
    # Score against all rules
    scores = []
    for task_type, rule in MODEL_RULES.items():
        score = score_request(request, rule)
        if score > 0:
            scores.append({
                "task_type": task_type,
                "score": score,
                "model": rule["model"],
                "priority": rule["priority"]
            })
    
    if not scores:
        return DEFAULT_MODEL, "No specific task type detected, using default", 0.5
    
    # Sort by score (descending), then by priority (ascending)
    scores.sort(key=lambda x: (-x["score"], x["priority"]))
    
    best = scores[0]
    confidence = min(best["score"] / 5.0, 1.0)  # Normalize confidence
    
    return best["model"], f"Task type: {best['task_type']} (score: {best['score']})", confidence


def main():
    """Main entry point."""
    if len(sys.argv) < 2:
        print("Usage: python model_selector.py <request_text>")
        print("       python model_selector.py --json <request_text>")
        sys.exit(1)
    
    request = " ".join(sys.argv[1:])
    
    # Check for JSON output mode
    json_mode = False
    if request.startswith("--json "):
        json_mode = True
        request = request[7:]
    
    model, reason, confidence = select_model(request)
    
    if json_mode:
        output = {
            "model": model,
            "reason": reason,
            "confidence": confidence,
            "request": request[:100] + "..." if len(request) > 100 else request
        }
        print(json.dumps(output, indent=2))
    else:
        print(f"Request: {request[:80]}..." if len(request) > 80 else f"Request: {request}")
        print(f"Selected Model: {model}")
        print(f"Reason: {reason}")
        print(f"Confidence: {confidence:.2f}")


if __name__ == "__main__":
    main()
