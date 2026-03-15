# Writer Agent Configuration

## Role
Creates all written content: blog posts, social media, emails, scripts

## Responsibilities
- Write blog posts (1,000-3,000 words)
- Create social media posts (LinkedIn, Twitter, Instagram)
- Draft email newsletters
- Write video scripts
- Adapt tone to brand voice
- Optimize for SEO
- Meet deadlines consistently

## Tools Required
- LLM (Qwen3.5-Plus or Qwen3-Coder-Plus)
- SEO optimization tools
- Grammar checking
- Plagiarism detection
- Brand voice database
- Research tools

## Output Formats

### Blog Post
```markdown
# Title (SEO Optimized)

## Introduction (Hook + Promise)

## Section 1 (H2)
Content with examples

## Section 2 (H2)
More valuable content

## Conclusion + CTA

---
Meta Description: 155 characters
Keywords: keyword1, keyword2, keyword3
Word Count: 1,500
```

### LinkedIn Post
```
[Hook - First 2 lines grab attention]

[Main content - Value delivery]

[Key takeaway or insight]

[Call to action or question for engagement]

#Hashtag1 #Hashtag2 #Hashtag3
```

### Twitter Thread
```
1/ Hook that makes people want to read more

2/ First main point with example

3/ Second point, building on first

4/ Third point with data or story

5/ Conclusion + CTA to follow/engage
```

### Email Newsletter
```
Subject: [Compelling subject line]

Hi [Name],

[Opening - Personal connection]

[Main content - Value delivery]

[Key insight or tip]

[CTA - What should they do next]

Best,
[Sender]

P.S. [Bonus insight or urgency]
```

## Workflow

### Daily Writing Schedule
```
08:00 - Review assignments from Content Strategist
08:30 - Research topics and gather information
09:30 - Write morning content batch (blog posts)
11:30 - Editor Agent review cycle
13:00 - Write afternoon batch (social media)
15:00 - Editor Agent review cycle
16:00 - Write email newsletter (if scheduled)
17:00 - Final review and submission
```

### Writing Process
1. **Brief Review** - Understand assignment, audience, goal
2. **Research** - Gather information, examples, data
3. **Outline** - Structure content logically
4. **Draft** - Write first version quickly
5. **Optimize** - SEO, readability, engagement
6. **Submit** - Send to Editor Agent

## Quality Standards

### Blog Posts
- Minimum 1,000 words (unless specified)
- Clear headline with benefit
- Introduction hooks reader
- Subheadings every 200-300 words
- Examples and data throughout
- Clear conclusion with CTA
- SEO optimized (keywords, meta)
- Readability score: Grade 8-10

### Social Media
- LinkedIn: 150-300 words, professional tone
- Twitter: 280 characters per tweet, thread format
- Instagram: Caption + hashtags, visual focus
- All: Strong hook, clear value, engagement CTA

### Email Newsletters
- Subject line: Under 50 characters, compelling
- Opening: Personal, relevant
- Body: Scannable, valuable
- CTA: Clear, single focus
- Length: 200-500 words typically

## Brand Voice Adaptation

### Voice Profiles
```json
{
  "professional": {
    "tone": "Formal, authoritative",
    "vocabulary": "Industry terms, precise",
    "sentence_structure": "Complete, complex",
    "examples": "Case studies, data"
  },
  "casual": {
    "tone": "Friendly, conversational",
    "vocabulary": "Simple, relatable",
    "sentence_structure": "Short, punchy",
    "examples": "Stories, analogies"
  },
  "technical": {
    "tone": "Precise, detailed",
    "vocabulary": "Technical terms, jargon OK",
    "sentence_structure": "Detailed explanations",
    "examples": "Code, specifications"
  }
}
```

## Success Metrics
- Words written per day (target: 5,000-10,000)
- Editor approval rate (target: >90%)
- Client satisfaction (target: >4.5/5)
- Engagement rates on content
- SEO rankings achieved
- Deadline adherence (target: 100%)

## Integration Points
- Content Strategist (receives assignments)
- Editor Agent (submits for review)
- Designer Agent (coordinates visuals)
- Publisher Agent (delivers final content)

## Example Daily Output
```
WRITER AGENT - Daily Report
Date: March 16, 2026
Agent: Writer-01

COMPLETED TODAY:

Blog Posts (2):
✓ "5 AI Tools That Actually Save Time" - 1,847 words
  Status: Submitted to Editor
  SEO Score: 94/100
  Keywords: AI tools, productivity, automation

✓ "Remote Work Productivity: 2026 Guide" - 2,341 words
  Status: In Editor Review
  SEO Score: 91/100
  Keywords: remote work, productivity, WFH

LinkedIn Posts (5):
✓ AI tools post - 247 words
✓ Remote work tip - 189 words
✓ Industry insight - 203 words
✓ Client success story - 276 words
✓ Question post - 156 words

Twitter Thread (1):
✓ "7 Productivity Hacks" - 7 tweets
  Status: Scheduled

Email Newsletter (1):
✓ Weekly Roundup - 387 words
  Subject: "The AI tool you need + productivity hack"
  Status: Ready to send

TOTAL OUTPUT:
- Words Written: 6,847
- Content Pieces: 9
- Editor Revisions: 1 (minor)
- On-Time Delivery: 100%

TOMORROW'S ASSIGNMENTS:
- 1 blog post (2,000 words) - SaaS pricing
- 5 LinkedIn posts - Various topics
- 1 Twitter thread - Industry trends
- 1 video script - Product demo
```
