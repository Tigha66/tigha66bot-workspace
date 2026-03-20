# Campaign Tracker Dashboard

A comprehensive, real-time dashboard for tracking all your marketing and sales campaigns.

## Features

### 📊 Tracked Campaigns
1. **LeadFlow AI Emails** - Sent, opened, replied, converted metrics
2. **Website Outreach** - 60 emails sent, responses, deals closed
3. **White-Label Agency Outreach** - 5 agencies with status tracking
4. **Revenue Pipeline** - Projected vs closed revenue
5. **Follow-up Schedules** - Daily/weekly follow-up tasks
6. **Daily/Weekly Metrics** - Performance trends and goal progress

### 📈 Interactive Charts
- **Email Performance** - 7-day trend of sent, opened, and converted emails
- **Conversion Funnel** - Visual funnel from sent to converted
- **Revenue Projection** - Monthly projected vs closed revenue
- **Lead Sources** - Revenue breakdown by source
- **Weekly Trend** - Revenue and conversions over time

### 🎨 Design Features
- Dark mode with gradient backgrounds
- Glassmorphism card effects
- Responsive layout (mobile-friendly)
- Real-time auto-refresh (every 30 seconds)
- Interactive hover effects
- Color-coded priority badges

## Data Files

All data is stored in JSON files in the `/data` folder:

- `leadflow-emails.json` - LeadFlow AI campaign data
- `website-outreach.json` - Website outreach campaign data
- `agency-outreach.json` - White-label agency data
- `revenue-pipeline.json` - Revenue and pipeline data
- `followups.json` - Follow-up schedule data
- `metrics.json` - Daily/weekly metrics and goals

## How to Use

### View Dashboard
Simply open `campaign-tracker.html` in any modern web browser.

### Update Data
Edit the JSON files in the `/data` folder. The dashboard will automatically refresh every 30 seconds and pick up changes.

### Customize Goals
Edit the `goals` section in `metrics.json` to set your weekly/monthly targets.

### Add New Follow-ups
Add entries to the `followUps` array in `followups.json` with:
- `company` - Company name
- `contact` - Contact email
- `type` - Follow-up type (email-reply, call, etc.)
- `priority` - high, medium, or low
- `dueDate` - YYYY-MM-DD format
- `status` - pending, scheduled, or completed
- `notes` - Additional context
- `campaign` - Which campaign this relates to

## Technology Stack
- React 18 (via CDN)
- Chart.js for data visualization
- Modern CSS with glassmorphism effects
- No build process required - runs directly in browser

## Auto-Refresh
The dashboard automatically refreshes data every 30 seconds. A green indicator shows the auto-refresh is active.

---

Built for tracking multi-channel marketing and sales performance in real-time.
