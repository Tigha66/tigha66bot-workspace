# ReviewFlow Pro - OpenClaw Workflow

## Overview
Automated review request system that sends SMS + email sequences to customers after service completion.

---

## Workflow Triggers

### Trigger Options:
1. **Manual** - Business owner triggers via command
2. **Cron Schedule** - Check for completed services every 2 hours
3. **Webhook** - External system (Calendly, Stripe) posts completion
4. **Calendar** - Google Calendar event completed

---

## Workflow Logic

```
┌─────────────────────────────────────────────────────────────┐
│                    SERVICE COMPLETED                         │
│              (Manual / Cron / Webhook / Calendar)            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              WAIT 2 HOURS (optimal timing)                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│           SEND SMS REVIEW REQUEST                            │
│ Template: "Hi [Name], thanks for choosing [Business]!       │
│ Quick favor — can you leave us a review? [Review Link]"     │
│                                                              │
│ Tools: Twilio API / GSM Gateway                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              WAIT 24 HOURS                                   │
│              Check if review left                           │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌───────┴───────┐
                    │               │
              YES   │               │   NO
        (Review     │               │   (No Review
         Left)      │               │    Yet)
                    │               │
                    ▼               ▼
        ┌──────────────────┐  ┌─────────────────────────────────┐
        │  SEND THANK YOU  │  │    SEND EMAIL FOLLOW-UP         │
        │  SMS/EMAIL       │  │    Template: Longer format,     │
        │                  │  │    same message + review link   │
        │  LOG TO DASHBOARD│  │    Tools: Gmail SMTP            │
        └──────────────────┘  └─────────────────────────────────┘
                                        │
                                        ▼
                              ┌─────────────────────────────────┐
                              │           WAIT 48 HOURS          │
                              │           Check again            │
                              └─────────────────────────────────┘
                                        │
                              ┌───────┴───────┐
                              │               │
                        YES   │               │   NO
                              │               │
                              ▼               ▼
                    ┌──────────────┐  ┌─────────────────────────┐
                    │  LOG RESULT  │  │  SEND SMS REMINDER #2   │
                    │  TO DASHBOARD│  │  "Still hoping for your │
                    └──────────────┘  │  feedback!"             │
                                      └─────────────────────────┘
                                                │
                                                ▼
                                      ┌─────────────────────────┐
                                      │    WAIT 24 HOURS        │
                                      │    Final check          │
                                      └─────────────────────────┘
                                                │
                                      ┌───────┴───────┐
                                      │               │
                                YES   │               │   NO
                                      │               │
                                      ▼               ▼
                              ┌────────────┐  ┌─────────────────┐
                              │ LOG RESULT │  │ MARK AS         │
                              │            │  │ "NO RESPONSE"   │
                              └────────────┘  └─────────────────┘
```

---

## Configuration File

```yaml
# reviewflow-config.yaml

business:
  name: "Your Business Name"
  google_review_link: "https://g.page/r/YOUR-BUSINESS/review"
  phone: "+44XXXXXXXXXX"
  email: "hello@yourbusiness.com"

timing:
  initial_delay_hours: 2
  followup_1_delay_hours: 24
  followup_2_delay_hours: 48
  final_check_hours: 24

messages:
  sms_initial: |
    Hi {name}, thanks for choosing {business}! 
    Quick favor — can you leave us a review? 
    {review_link}
  
  email_subject: "How was your experience with {business}?"
  
  email_body: |
    Hi {name},
    
    Thank you for choosing {business}! We hope you had a great experience.
    
    If you have a moment, we'd really appreciate a quick Google review. 
    It helps us grow and lets other customers know what to expect.
    
    Click here to leave a review: {review_link}
    
    Takes less than 2 minutes!
    
    Thanks,
    The {business} Team
  
  sms_followup: |
    Hi {name}! Just a friendly reminder — we'd love your feedback 
    if you have a moment: {review_link}

integrations:
  twilio:
    account_sid: "ACXXXXXXXXXXXXXXXX"
    auth_token: "XXXXXXXXXXXXXXXX"
    from_number: "+44XXXXXXXXXX"
  
  gmail:
    smtp_host: "smtp.gmail.com"
    smtp_port: 587
    username: "your-email@gmail.com"
    # App password stored in secure config
  
  google_calendar:
    calendar_id: "primary"
    enabled: false
  
  stripe:
    webhook_enabled: false
    api_key: "sk_test_XXX"

notifications:
  dashboard_webhook: "https://your-dashboard.here.now/api/review-logged"
  email_on_review: true
  sms_on_review: false
```

---

## OpenClaw Cron Job Setup

```bash
# Create cron job to check for completed services every 2 hours
openclaw cron add --name "reviewflow-check" --schedule "0 */2 * * *" --command "reviewflow-check-completions"

# Create webhook endpoint for external triggers
openclaw webhook create --name "reviewflow-service-complete" --handler "reviewflow-trigger"
```

---

## API Endpoints

### POST /api/reviewflow/trigger
Manually trigger review request

```json
{
  "customer_name": "Sarah Johnson",
  "customer_phone": "+447700900123",
  "customer_email": "sarah@example.com",
  "service_type": "Haircut & Colour",
  "service_date": "2026-03-15T14:30:00Z"
}
```

### GET /api/reviewflow/status/{customer_id}
Check review request status

```json
{
  "customer_id": "cust_123",
  "status": "pending",
  "sms_sent": true,
  "sms_sent_at": "2026-03-15T16:30:00Z",
  "email_sent": false,
  "review_left": false,
  "last_check": "2026-03-16T16:30:00Z"
}
```

---

## Dashboard Integration

The dashboard at `https://cedar-ember-h99g.here.now/` connects via:
- Local state file: `.reviewflow/state.json`
- Optional webhook for real-time updates

State file format:
```json
{
  "reviews": [
    {
      "id": "rev_001",
      "customer": "Sarah Johnson",
      "phone": "+447700900123",
      "service_date": "2026-03-15T14:30:00Z",
      "sms_sent": "2026-03-15T16:30:00Z",
      "review_left": "2026-03-15T17:45:00Z",
      "rating": 5,
      "review_text": "Amazing service! Highly recommend."
    }
  ],
  "stats": {
    "total_requests": 156,
    "reviews_received": 47,
    "response_rate": 0.30,
    "avg_rating": 4.8
  }
}
```

---

## Setup Checklist

- [ ] Save Twilio credentials in secure config
- [ ] Configure Gmail SMTP (app password)
- [ ] Get Google review link for business
- [ ] Customise SMS/email templates
- [ ] Set up cron job or webhook trigger
- [ ] Test with 3-5 friendly customers
- [ ] Monitor first week of requests
- [ ] Optimise timing based on response rates

---

## Compliance Notes

### GDPR
- Only send to customers who provided contact details
- Include opt-out in every message: "Reply STOP to opt out"
- Store consent records

### TCPA (if US customers)
- Prior express written consent for SMS
- Clear opt-out mechanism

### Google Review Policies
- No incentives for reviews
- No fake reviews
- All customers eligible (not just happy ones)
