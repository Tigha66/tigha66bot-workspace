# Model Capabilities Guide

Detailed specifications and best-use cases for all configured models.

---

## Bailian Provider

### qwen3.5-plus
- **Context**: 1,000,000 tokens
- **Max Output**: 65,536 tokens
- **Input**: Text, Image
- **Best For**: General purpose, long documents, balanced performance
- **Use When**: You need the best all-rounder with massive context

### qwen3-max-2026-01-23
- **Context**: 262,144 tokens
- **Max Output**: 65,536 tokens
- **Input**: Text only
- **Best For**: Complex reasoning, analysis, difficult problems
- **Use When**: Task requires deep thinking or multi-step logic

### qwen3-coder-next
- **Context**: 262,144 tokens
- **Max Output**: 65,536 tokens
- **Input**: Text only
- **Best For**: Code review, quick code tasks, analysis
- **Use When**: You need fast code-related responses

### qwen3-coder-plus
- **Context**: 1,000,000 tokens
- **Max Output**: 65,536 tokens
- **Input**: Text only
- **Best For**: Large codebases, complex programming tasks
- **Use When**: Working with extensive code or need deep code understanding

### MiniMax-M2.5
- **Context**: 196,608 tokens
- **Max Output**: 32,768 tokens
- **Input**: Text only
- **Best For**: Fast responses, simple queries
- **Use When**: Speed is priority over depth

### glm-5
- **Context**: 202,752 tokens
- **Max Output**: 16,384 tokens
- **Input**: Text only
- **Best For**: Math, logic, scientific reasoning
- **Use When**: Task involves calculations or formal logic

### glm-4.7
- **Context**: 202,752 tokens
- **Max Output**: 16,384 tokens
- **Input**: Text only
- **Best For**: General reasoning, good balance
- **Use When**: Need solid reasoning without max complexity

### kimi-k2.5
- **Context**: 262,144 tokens
- **Max Output**: 32,768 tokens
- **Input**: Text, Image
- **Best For**: Vision-language tasks, image analysis
- **Use When**: You need to analyze images or diagrams

---

## Dashscope Provider

### qwen3-max-2026-01-23
- **Context**: 262,144 tokens
- **Max Output**: 65,536 tokens
- **Input**: Text only
- **Best For**: Complex reasoning (alternative endpoint)

### qwen3.5-plus
- **Context**: 1,000,000 tokens
- **Max Output**: 65,536 tokens
- **Input**: Text, Image
- **Best For**: General purpose with vision (alternative endpoint)

---

## Dashscope-US Provider

### qwen3-max-2025-09-23
- **Context**: 32,768 tokens
- **Max Output**: 8,192 tokens
- **Input**: Text only
- **Best For**: US-region reasoning tasks

### qwen3-vl-plus
- **Context**: 32,768 tokens
- **Max Output**: 8,192 tokens
- **Input**: Text, Image
- **Best For**: Vision tasks (US region)

---

## Dashscope-Coding-Intl Provider

### qwen3.5-plus
- **Context**: 1,000,000 tokens
- **Max Output**: 65,536 tokens
- **Input**: Text, Image
- **Best For**: International coding tasks

---

## MiniMax-Portal Provider

### MiniMax-M2.5
- **Context**: 200,000 tokens
- **Max Output**: 8,192 tokens
- **Input**: Text only
- **Best For**: Fast general tasks

### MiniMax-M2.5-highspeed
- **Context**: 200,000 tokens
- **Max Output**: 8,192 tokens
- **Input**: Text only
- **Reasoning**: Enabled
- **Best For**: Fast reasoning tasks

### MiniMax-M2.5-Lightning
- **Context**: 200,000 tokens
- **Max Output**: 8,192 tokens
- **Input**: Text only
- **Reasoning**: Enabled
- **Best For**: Fastest reasoning with good quality

---

## Quick Selection Matrix

| Need | Primary Choice | Alternative |
|------|---------------|-------------|
| Code Generation | `bailian/qwen3-coder-plus` | `bailian/qwen3-coder-next` |
| Image Analysis | `bailian/kimi-k2.5` | `dashscope/qwen3-vl-plus` |
| Long Documents | `bailian/qwen3.5-plus` | `bailian/qwen3-coder-plus` |
| Complex Reasoning | `bailian/qwen3-max-2026-01-23` | `bailian/glm-5` |
| Math/Science | `bailian/glm-5` | `bailian/glm-4.7` |
| Fast Response | `bailian/MiniMax-M2.5` | `minimax-portal/MiniMax-M2.5-Lightning` |
| General Chat | `bailian/qwen3.5-plus` | `bailian/glm-4.7` |

---

## Cost Considerations

All models currently configured with $0 cost (using API key with free tier or internal allocation). For production use, consider:

1. **High-cost tasks** → Use smaller models when possible
2. **Batch processing** → Use faster models for throughput
3. **Critical tasks** → Use best models regardless of cost
