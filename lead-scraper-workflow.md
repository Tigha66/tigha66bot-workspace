# Lead Scraper Workflow

Automated lead generation pipeline using OpenClaw skills.

## Stack

- **Search:** Tavily API (AI-optimized search)
- **Scraping:** FireCrawl or agent-browser
- **Output:** JSON/CSV file
- **Email:** imap-smtp-email (optional)

---

## Step 1: Search for Leads

```bash
cd ~/.openclaw/workspace/skills/tavily-search-1-0-0
node scripts/search.mjs "SaaS companies in New York" -n 10
```

**Or use deep-research-pro (free, no API key):**
```bash
cd ~/.openclaw/workspace/skills/deep-research-pro
# Runs DuckDuckGo search automatically
```

---

## Step 2: Extract Contact Info

Use agent-browser to visit each website and extract:
- Company name
- Email address
- Phone number
- Contact page URL

```bash
cd ~/.openclaw/workspace/skills/agent-browser
agent-browser open "https://target-company.com"
agent-browser snapshot -i
# Parse elements for contact info
```

---

## Step 3: Save Leads

Save to `leads.json`:
```json
[
  {
    "company": "Example Corp",
    "email": "contact@example.com",
    "website": "https://example.com",
    "source": "Tavily search"
  }
]
```

---

## Step 4: Send Cold Emails (Optional)

```bash
cd ~/.openclaw/workspace/skills/imap-smtp-email
node scripts/send.js \
  --to "contact@example.com" \
  --subject "Quick question about {{company}}" \
  --body "Hi team, I noticed..."
```

---

## Full Automation Script

Create `scrape-leads.sh`:
```bash
#!/bin/bash
QUERY="$1"
OUTPUT="leads-$(date +%Y%m%d).json"

echo "🔍 Searching for: $QUERY"
# Run Tavily search
# Parse results
# Extract contact info
# Save to $OUTPUT

echo "✅ Saved to $OUTPUT"
```

---

## Next Steps

1. Run a test search
2. Review extracted leads
3. Customize email template
4. Scale up!
