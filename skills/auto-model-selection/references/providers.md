# Provider Configuration

Details about each model provider and their endpoints.

---

## Bailian (Primary)

**Base URL**: `https://coding-intl.dashscope.aliyuncs.com/v1`  
**API Type**: OpenAI-compatible  
**API Key**: `sk-sp-4a62778a6b82452189be203d3616901f`

### Advantages
- Single endpoint for multiple model families
- OpenAI-compatible API
- Good international availability
- Supports thinking format (Qwen-style)

### Models Available
- Qwen3 family (plus, max, coder)
- GLM family (glm-5, glm-4.7)
- Kimi (kimi-k2.5)
- MiniMax (M2.5)

---

## Dashscope

**Base URL**: `https://dashscope.aliyuncs.com/compatible-mode/v1`  
**API Type**: OpenAI-compatible  
**API Key**: `sk-sp-4a62778a6b82452189be203d3616901f`

### Advantages
- Mainland China endpoint
- Full Qwen model availability
- Stable and reliable

---

## Dashscope-US

**Base URL**: `https://dashscope-us.aliyuncs.com/compatible-mode/v1`  
**API Type**: OpenAI-compatible  
**API Key**: `sk-sp-4a62778a6b82452189be203d3616901f`

### Advantages
- US-region endpoint
- Lower latency for US users
- Qwen vision models available

---

## Dashscope-Coding-Intl

**Base URL**: `https://coding-intl.dashscope.aliyuncs.com/v1`  
**API Type**: OpenAI-compatible  
**API Key**: `sk-sp-4a62778a6b82452189be203d3616901f`

### Advantages
- Optimized for coding tasks
- International availability
- Same as Bailian endpoint

---

## MiniMax-Portal

**Base URL**: `https://api.minimax.io/anthropic`  
**API Type**: Anthropic-compatible  
**API Key**: OAuth (minimax-oauth)

### Advantages
- Anthropic-compatible API
- Fast inference
- Good for simple tasks

---

## Provider Selection Logic

The auto-model-selection skill uses this priority:

1. **Bailian** - Primary provider for most tasks
2. **Dashscope** - Fallback for specific Qwen models
3. **Dashscope-US** - US-region optimization
4. **MiniMax-Portal** - Fast/simple tasks

---

## Rate Limits

Current configuration does not specify rate limits. Monitor usage and adjust if needed:

- Add `rateLimit` configuration per provider if experiencing limits
- Consider request batching for high-volume tasks
- Implement exponential backoff for 429 responses
