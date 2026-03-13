---
name: auto-model-selection
description: Automatic model selection based on request content. Analyzes incoming requests and routes to the optimal model from bailian, dashscope, or minimax-portal providers. Use when: (1) You want automatic model routing, (2) Request needs specific model capabilities (coding, vision, reasoning, long-context), (3) Optimizing for cost/performance. Triggers on any request that would benefit from intelligent model selection.
---

# Auto Model Selection

This skill provides automatic model selection based on your request content. It analyzes the task type and routes to the optimal model from your configured providers.

## Quick Start

The model selector automatically analyzes your request and chooses the best model. You don't need to specify a model—just ask your question naturally.

## Model Selection Rules

### By Task Type

| Task Type | Selected Model | Why |
|-----------|---------------|-----|
| **Coding/Programming** | `bailian/qwen3-coder-plus` | Optimized for code generation, 1M context |
| **Code Review** | `bailian/qwen3-coder-next` | Fast code analysis, 262k context |
| **Image Analysis** | `bailian/kimi-k2.5` or `dashscope/qwen3-vl-plus` | Vision-language capabilities |
| **Long Documents (>100k tokens)** | `bailian/qwen3.5-plus` | 1M context window |
| **Complex Reasoning** | `bailian/qwen3-max-2026-01-23` | Best reasoning capabilities |
| **General Chat** | `bailian/qwen3.5-plus` | Balanced performance |
| **Fast Responses** | `bailian/MiniMax-M2.5` | Quick turnaround |
| **Math/Logic** | `bailian/glm-5` | Strong mathematical reasoning |
| **Creative Writing** | `bailian/qwen3.5-plus` | Good language fluency |

### By Content Keywords

The selector looks for these keywords to determine task type:

**Coding**: `code`, `program`, `function`, `debug`, `refactor`, `API`, `endpoint`, `repository`, `commit`, `deploy`, `script`, `algorithm`, `data structure`

**Vision**: `image`, `picture`, `photo`, `diagram`, `chart`, `graph`, `screenshot`, `visual`, `draw`, `design`

**Long Context**: `document`, `book`, `article`, `transcript`, `log`, `history`, `full text`, `entire`

**Reasoning**: `analyze`, `compare`, `evaluate`, `decision`, `strategy`, `complex`, `multi-step`

**Math**: `calculate`, `equation`, `formula`, `proof`, `theorem`, `statistics`, `probability`

## Configuration

The model selector uses this priority order:

1. **Explicit model request** - If you mention a specific model, it uses that
2. **Task-based routing** - Matches keywords to task types
3. **Default fallback** - Uses `bailian/qwen3.5-plus`

## Scripts

### model_selector.py

Run the model selector script to determine the best model for a given request:

```bash
python scripts/model_selector.py "your request here"
```

The script outputs the recommended model and reasoning.

## References

- **Model Capabilities**: See `references/model-guide.md` for detailed model specs
- **Provider Info**: See `references/providers.md` for provider-specific details

## Usage Examples

**Example 1: Coding Task**
```
User: "Help me write a Python function to parse JSON"
→ Selected: bailian/qwen3-coder-plus
```

**Example 2: Image Analysis**
```
User: "What's in this screenshot?"
→ Selected: bailian/kimi-k2.5
```

**Example 3: Long Document**
```
User: "Summarize this 500-page document"
→ Selected: bailian/qwen3.5-plus
```

**Example 4: Complex Analysis**
```
User: "Analyze the pros and cons of these three approaches"
→ Selected: bailian/qwen3-max-2026-01-23
```

## Integration

To enable automatic model selection:

1. This skill analyzes requests before they're sent to the model
2. It sets the appropriate model in the session context
3. The request is then routed to the selected model

## Model Aliases

For convenience, you can use these aliases:

| Alias | Full Model Path |
|-------|-----------------|
| `coder-plus` | `bailian/qwen3-coder-plus` |
| `coder-next` | `bailian/qwen3-coder-next` |
| `max` | `bailian/qwen3-max-2026-01-23` |
| `plus` | `bailian/qwen3.5-plus` |
| `vision` | `bailian/kimi-k2.5` |
| `math` | `bailian/glm-5` |
| `fast` | `bailian/MiniMax-M2.5` |
