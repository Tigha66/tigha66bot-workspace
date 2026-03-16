# 🤖 AI RECEPTIONIST - Complete Technical Specification
## Missed Call Text-Back System

**Product:** AI Employee that answers every missed call within 90 seconds  
**Target:** Plumbers, HVAC, electricians, roofers, auto repair  
**Pricing:** £199 setup + £99/month  
**Build Time:** 3-5 days  
**Tech Stack:** Twilio + Google Sheets + Gmail/OpenClaw

---

## 📋 TABLE OF CONTENTS

1. [System Architecture](#system-architecture)
2. [Prerequisites](#prerequisites)
3. [Twilio Setup](#twilio-setup)
4. [Google Sheets Setup](#google-sheets-setup)
5. [Code Implementation](#code-implementation)
6. [Deployment Guide](#deployment-guide)
7. [Testing Checklist](#testing-checklist)
8. [Customer Onboarding](#customer-onboarding)
9. [Troubleshooting](#troubleshooting)
10. [Scaling & White-Label](#scaling--white-label)

---

## 🏗️ SYSTEM ARCHITECTURE

### High-Level Flow

```
┌─────────────┐
│  Customer   │
│    Calls    │
└──────┬──────┘
       │
       ▼
┌─────────────┐     No Answer      ┌─────────────┐
│  Business   │───────────────────▶│   Twilio    │
│    Phone    │                    │   Webhook   │
└─────────────┘                    └──────┬──────┘
                                          │
                                          │ 30 second delay
                                          ▼
                                   ┌─────────────┐
                                   │  Send SMS   │
                                   │ "Sorry we   │
                                   │ missed you" │
                                   └──────┬──────┘
                                          │
                                          ▼
                                   ┌─────────────┐
                                   │   Customer  │
                                   │   Replies   │
                                   └──────┬──────┘
                                          │
                                          ▼
                                   ┌─────────────┐
                                   │ Alert Owner │
                                   │ via WhatsApp│
                                   └──────┬──────┘
                                          │
                                          ▼
                                   ┌─────────────┐
                                   │   Log in    │
                                   │   Google    │
                                   │   Sheets    │
                                   └─────────────┘
```

### Components

| Component | Service | Purpose | Cost |
|-----------|---------|---------|------|
| **Phone Number** | Twilio | Receive calls, send SMS | £1/month |
| **SMS Sending** | Twilio | Text missed callers | £0.06/SMS |
| **Webhook Handler** | OpenClaw/Node.js | Process call events | Free |
| **Data Storage** | Google Sheets | Log all calls & responses | Free |
| **Owner Alerts** | WhatsApp/Email | Notify when customer replies | Free |
| **Dashboard** | Google Sheets | Customer views call log | Free |

### Call Flow States

```
STATE 1: Call Incoming
  ↓
STATE 2: Ringing (wait for answer)
  ↓
STATE 3a: Answered → End (no action needed)
  ↓
STATE 3b: No Answer → Start 30s timer
  ↓
STATE 4: Send SMS to caller
  ↓
STATE 5: Wait for reply
  ↓
STATE 6a: Customer replies → Alert owner
  ↓
STATE 6b: No reply in 24h → Log as lost
```

---

## ✅ PREREQUISITES

### Required Accounts

1. **Twilio Account** (https://www.twilio.com/try-twilio)
   - Free trial: £12 credit
   - Need: Phone number, Account SID, Auth Token

2. **Google Account**
   - Google Sheets (free)
   - Google Forms (optional, free)

3. **OpenClaw Installed**
   - Version: 2026.3.13 or later
   - Skills: imap-smtp-email (for alerts)

4. **Node.js** (for standalone deployment)
   - Version: 18.x or later
   - npm package manager

### Required Skills

- Basic JavaScript/Node.js
- Understanding of webhooks
- Google Sheets formulas
- Twilio console navigation

### Time Estimate

| Task | Time |
|------|------|
| Twilio setup | 30 minutes |
| Google Sheets setup | 20 minutes |
| Code implementation | 2-3 hours |
| Testing | 1 hour |
| **Total** | **4-5 hours** |

---

## 🔧 TWILIO SETUP

### Step 1: Create Twilio Account

1. Go to https://www.twilio.com/try-twilio
2. Click "Sign Up"
3. Enter:
   - Email address
   - Phone number (for verification)
   - Company name (your business name)
4. Verify email and phone
5. Complete account setup

**Trial Account:**
- £12 free credit
- Enough for ~200 SMS messages
- Upgrade when ready for production

### Step 2: Get Account Credentials

1. Log into Twilio Console
2. Go to **Dashboard** (https://console.twilio.com/)
3. Find on dashboard:
   - **Account SID**: `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - **Auth Token**: Click "Show" to reveal

**⚠️ SECURITY:** Save these securely! Never commit to GitHub.

```bash
# Create .env file
touch .env
echo "TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" >> .env
echo "TWILIO_AUTH_TOKEN=your_auth_token_here" >> .env
echo "TWILIO_PHONE_NUMBER=+447418300000" >> .env
```

### Step 3: Buy Phone Number

1. In Twilio Console, go to **Phone Numbers** → **Buy a Number**
2. Search for UK numbers:
   - Country: United Kingdom (+44)
   - Capabilities: SMS + Voice
   - Location: Any (or specific city)
3. Choose a number (e.g., `+447418300000`)
4. Click "Buy" (£1/month)

**Number Requirements:**
- ✅ SMS capable
- ✅ Voice capable
- ✅ UK number (+44)
- ✅ Not a toll-free number

### Step 4: Configure Webhook for Calls

1. Go to **Phone Numbers** → **Manage** → **Active Numbers**
2. Click your phone number
3. Scroll to **Voice & Fax** section
4. Configure **A Call Comes In**:
   - Select: **Webhook**
   - URL: `https://your-domain.com/twilio/webhook/call`
   - HTTP Method: **POST**

**For Testing (Ngrok):**
```bash
# Install ngrok
npm install -g ngrok

# Start local server on port 3000
node server.js

# In another terminal, expose to internet
ngrok http 3000

# Copy the HTTPS URL (e.g., https://abc123.ngrok.io)
# Use: https://abc123.ngrok.io/twilio/webhook/call
```

### Step 5: Configure Webhook for SMS Replies

1. Same phone number settings
2. Scroll to **Messaging** section
3. Configure **A Message Comes In**:
   - Select: **Webhook**
   - URL: `https://your-domain.com/twilio/webhook/sms`
   - HTTP Method: **POST**

### Step 6: Enable Call Recording (Optional)

For compliance and quality assurance:

1. Phone number settings → **Voice & Fax**
2. **Record Calls**: Yes
3. **Recording Type**: Record from answer
4. **Webhook for Recording Status**: `https://your-domain.com/twilio/recording`

**⚠️ GDPR Compliance:**
- Inform customers calls may be recorded
- Store recordings securely
- Delete after 30-90 days
- Provide deletion on request

---

## 📊 GOOGLE SHEETS SETUP

### Step 1: Create Call Log Spreadsheet

1. Go to https://sheets.google.com
2. Click "+ Blank" spreadsheet
3. Name it: `AI Receptionist - [Customer Name]`
4. Create these columns:

| Column | Header | Example |
|--------|--------|---------|
| A | Timestamp | 2026-03-15 14:30:00 |
| B | Caller Phone | +447700900000 |
| C | Call Status | Missed / Answered |
| D | SMS Sent | Yes / No |
| E | SMS Sent At | 2026-03-15 14:30:30 |
| F | Customer Replied | Yes / No |
| G | Reply Message | "Yes, I need a quote" |
| H | Reply Received At | 2026-03-15 14:32:00 |
| I | Owner Alerted | Yes / No |
| J | Job Value | £200 (estimated) |
| K | Notes | "Roof repair, urgent" |
| L | Status | New / Contacted / Converted / Lost |

### Step 2: Add Formulas

**Column A (Timestamp - Auto):**
```excel
=NOW()
```

**Column M (Hours Since Call - Auto):**
```excel
=IF(A2="", "", (NOW()-A2)*24)
```

**Column N (Response Time in Minutes - Auto):**
```excel
=IF(H2="", "", (H2-E2)*1440)
```

**Column O (Conversion Rate - Summary):**
```excel
=COUNTIF(L:L, "Converted") / COUNTIF(C:C, "Missed")
```

### Step 3: Create Dashboard Tab

1. Add new sheet tab → Name: "Dashboard"
2. Add summary metrics:

```excel
A1: "Total Missed Calls"
B1: =COUNTIF('Call Log'!C:C, "Missed")

A2: "Customers Replied"
B2: =COUNTIF('Call Log'!F:F, "Yes")

A3: "Response Rate"
B3: =B2/B1

A4: "Jobs Converted"
B4: =COUNTIF('Call Log'!L:L, "Converted")

A5: "Conversion Rate"
B5: =B4/B1

A6: "Estimated Revenue"
B6: =SUM('Call Log'!J:J)
```

### Step 4: Share with Customer

1. Click "Share" button (top right)
2. Enter customer email
3. Permission: **Viewer** (can view, not edit)
4. Uncheck "Notify people" (send manually)
5. Copy shareable link

**Customer Access:**
- Can view all missed calls
- Can see which customers replied
- Can track converted jobs
- Cannot edit data

### Step 5: Get Sheet ID for API

1. URL looks like: `https://docs.google.com/spreadsheets/d/1ABC123xyz/edit`
2. Sheet ID is: `1ABC123xyz` (between `/d/` and `/edit`)
3. Save this for code implementation

---

## 💻 CODE IMPLEMENTATION

### Option A: OpenClaw Skill (Recommended)

Create a new OpenClaw skill:

**File Structure:**
```
ai-receptionist-skill/
├── SKILL.md
├── package.json
├── .env.example
├── src/
│   ├── webhook-call.js
│   ├── webhook-sms.js
│   ├── send-sms.js
│   ├── alert-owner.js
│   └── log-to-sheets.js
└── README.md
```

### SKILL.md

```markdown
---
name: ai-receptionist
description: AI Receptionist - Auto-texts missed calls within 90 seconds
version: 1.0.0
author: Tigha66bot
---

# AI Receptionist Skill

Automatically texts every missed caller within 90 seconds.

## Configuration

Required environment variables:
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_PHONE_NUMBER`
- `GOOGLE_SHEET_ID`
- `OWNER_PHONE_NUMBER`

## Usage

Install and configure webhooks in Twilio console.
```

### package.json

```json
{
  "name": "ai-receptionist",
  "version": "1.0.0",
  "description": "AI Receptionist - Missed call text-back system",
  "main": "src/webhook-call.js",
  "scripts": {
    "start": "node src/server.js",
    "test": "node src/test.js"
  },
  "dependencies": {
    "twilio": "^4.0.0",
    "googleapis": "^100.0.0",
    "express": "^4.18.0",
    "dotenv": "^16.0.0"
  }
}
```

### .env.example

```bash
# Twilio Credentials
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+447418300000

# Google Sheets
GOOGLE_SHEET_ID=1ABC123xyz
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Owner Alert Settings
OWNER_PHONE_NUMBER=+447700900000
OWNER_WHATSAPP_NUMBER=+447700900000

# Business Settings
BUSINESS_NAME="Your Business"
BUSINESS_HOURS_START=9
BUSINESS_HOURS_END=18
SMS_DELAY_SECONDS=30
```

### src/server.js (Express Server)

```javascript
require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const { google } = require('googleapis');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Google Sheets client
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const sheets = google.sheets({ version: 'v4', auth });

// Webhook: Incoming Call
app.post('/twilio/webhook/call', async (req, res) => {
  const { From, To, CallStatus } = req.body;
  
  console.log(`Call from ${From} to ${To}, Status: ${CallStatus}`);
  
  // Log call to Google Sheets
  await logCallToSheets(From, CallStatus);
  
  // If call wasn't answered (no-answer or completed)
  if (CallStatus === 'no-answer' || CallStatus === 'completed') {
    // Wait 30 seconds before sending SMS
    setTimeout(async () => {
      await sendMissedCallSMS(From);
    }, process.env.SMS_DELAY_SECONDS * 1000 || 30000);
  }
  
  // Respond with TwiML (empty - we just want to track)
  const twiml = new twilio.twiml.VoiceResponse();
  res.type('text/xml');
  res.send(twiml.toString());
});

// Webhook: Incoming SMS Reply
app.post('/twilio/webhook/sms', async (req, res) => {
  const { From, To, Body } = req.body;
  
  console.log(`SMS from ${From}: ${Body}`);
  
  // Log reply to Google Sheets
  await logReplyToSheets(From, Body);
  
  // Alert owner via WhatsApp/SMS
  await alertOwner(From, Body);
  
  // Respond to customer
  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message('Thanks! A team member will contact you shortly.');
  
  res.type('text/xml');
  res.send(twiml.toString());
});

// Helper: Log call to Google Sheets
async function logCallToSheets(phoneNumber, callStatus) {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const timestamp = new Date().toISOString();
    
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Call Log!A:L',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          timestamp,
          phoneNumber,
          callStatus === 'in-progress' ? 'Missed' : 'Answered',
          'No',
          '',
          'No',
          '',
          '',
          'No',
          '',
          '',
          'New'
        ]]
      }
    });
    
    console.log('Call logged to Sheets');
  } catch (error) {
    console.error('Error logging to Sheets:', error);
  }
}

// Helper: Send missed call SMS
async function sendMissedCallSMS(phoneNumber) {
  try {
    const businessName = process.env.BUSINESS_NAME || 'Our Business';
    const message = `Hi! This is ${businessName}. Sorry we missed your call! How can we help? Reply here or call back anytime.`;
    
    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });
    
    console.log(`SMS sent to ${phoneNumber}`);
    
    // Update Google Sheets
    await updateSheetSMSSent(phoneNumber);
    
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
}

// Helper: Log reply to Google Sheets
async function logReplyToSheets(phoneNumber, message) {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const timestamp = new Date().toISOString();
    
    // Find the row with this phone number and update
    const { data } = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Call Log!A:L'
    });
    
    const rows = data.values;
    const rowIndex = rows.findIndex(row => row[1] === phoneNumber);
    
    if (rowIndex !== -1) {
      // Update row (rowIndex + 2 because A1 is row 1 and we have headers)
      const range = `Call Log!F${rowIndex + 2}:L${rowIndex + 2}`;
      
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[
            'Yes',
            message,
            timestamp,
            'Yes',
            '',
            '',
            'New'
          ]]
        }
      });
      
      console.log('Reply logged to Sheets');
    }
  } catch (error) {
    console.error('Error logging reply:', error);
  }
}

// Helper: Alert owner via WhatsApp
async function alertOwner(customerPhone, message) {
  try {
    const ownerPhone = process.env.OWNER_WHATSAPP_NUMBER;
    const alertMessage = `🔔 NEW LEAD!\n\nFrom: ${customerPhone}\nMessage: ${message}\n\nReply ASAP!`;
    
    await twilioClient.messages.create({
      body: alertMessage,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: ownerPhone
    });
    
    console.log('Owner alerted');
  } catch (error) {
    console.error('Error alerting owner:', error);
  }
}

// Helper: Update sheet when SMS sent
async function updateSheetSMSSent(phoneNumber) {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const timestamp = new Date().toISOString();
    
    const { data } = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Call Log!A:L'
    });
    
    const rows = data.values;
    const rowIndex = rows.findIndex(row => row[1] === phoneNumber);
    
    if (rowIndex !== -1) {
      const range = `Call Log!D${rowIndex + 2}:E${rowIndex + 2}`;
      
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[
            'Yes',
            timestamp
          ]]
        }
      });
    }
  } catch (error) {
    console.error('Error updating sheet:', error);
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`AI Receptionist server running on port ${PORT}`);
});

module.exports = app;
```

### Option B: Standalone Node.js Script (Simpler)

For a simpler deployment without OpenClaw:

```javascript
// ai-receptionist.js
require('dotenv').config();
const twilio = require('twilio');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Webhook for incoming calls
app.post('/call', (req, res) => {
  const { From, CallStatus } = req.body;
  
  if (CallStatus === 'no-answer') {
    setTimeout(() => {
      twilioClient.messages.create({
        body: `Hi! Sorry we missed your call! How can we help?`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: From
      });
    }, 30000);
  }
  
  res.send('<Response></Response>');
});

// Webhook for SMS replies
app.post('/sms', (req, res) => {
  const { From, Body } = req.body;
  
  // Alert owner
  twilioClient.messages.create({
    body: `🔔 NEW LEAD! From: ${From}\nMessage: ${Body}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: process.env.OWNER_PHONE_NUMBER
  });
  
  res.send('<Response><Message>Thanks! We\'ll contact you shortly.</Message></Response>');
});

app.listen(3000, () => {
  console.log('AI Receptionist running on port 3000');
});
```

---

## 🚀 DEPLOYMENT GUIDE

### Option 1: Deploy to Vercel (Recommended)

**Step 1: Prepare for Vercel**

Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/twilio/webhook/(.*)",
      "dest": "src/server.js"
    }
  ],
  "env": {
    "TWILIO_ACCOUNT_SID": "@twilio-account-sid",
    "TWILIO_AUTH_TOKEN": "@twilio-auth-token",
    "TWILIO_PHONE_NUMBER": "@twilio-phone-number",
    "GOOGLE_SHEET_ID": "@google-sheet-id",
    "OWNER_PHONE_NUMBER": "@owner-phone-number"
  }
}
```

**Step 2: Add Environment Variables to Vercel**

```bash
vercel env add TWILIO_ACCOUNT_SID production
vercel env add TWILIO_AUTH_TOKEN production
vercel env add TWILIO_PHONE_NUMBER production
vercel env add GOOGLE_SHEET_ID production
vercel env add OWNER_PHONE_NUMBER production
```

**Step 3: Deploy**

```bash
vercel --prod
```

**Step 4: Update Twilio Webhooks**

Copy Vercel URL (e.g., `https://your-project.vercel.app`) and update Twilio:
- Call Webhook: `https://your-project.vercel.app/twilio/webhook/call`
- SMS Webhook: `https://your-project.vercel.app/twilio/webhook/sms`

### Option 2: Deploy to Railway

**Step 1: Create Railway Account**

https://railway.app

**Step 2: Create New Project**

- Click "New Project"
- Select "Deploy from GitHub repo"
- Connect your repository

**Step 3: Add Environment Variables**

In Railway dashboard → Variables:
- Add all required env vars from `.env.example`

**Step 4: Deploy**

Railway auto-deploys on push. Copy the generated URL and update Twilio webhooks.

### Option 3: Deploy to DigitalOcean Droplet

**Step 1: Create Droplet**

- Size: £4/month (1GB RAM)
- OS: Ubuntu 22.04
- Region: London (closest to UK customers)

**Step 2: SSH into Server**

```bash
ssh root@your-droplet-ip
```

**Step 3: Install Node.js**

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Step 4: Clone & Install**

```bash
git clone your-repo
cd ai-receptionist
npm install
```

**Step 5: Setup PM2 (Process Manager)**

```bash
npm install -g pm2
pm2 start src/server.js --name ai-receptionist
pm2 save
pm2 startup
```

**Step 6: Setup Nginx (Optional)**

```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/ai-receptionist
```

Nginx config:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location /twilio/webhook/ {
        proxy_pass http://localhost:3000/twilio/webhook/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/ai-receptionist /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Option 4: Deploy as OpenClaw Skill

**Step 1: Create Skill Directory**

```bash
mkdir -p ~/.openclaw/workspace/skills/ai-receptionist
cd ~/.openclaw/workspace/skills/ai-receptionist
```

**Step 2: Copy Files**

Copy all files from the code implementation section.

**Step 3: Install Dependencies**

```bash
npm install
```

**Step 4: Configure Environment**

Create `.env` file with all required variables.

**Step 5: Test Locally**

```bash
npm start
```

**Step 6: Deploy to OpenClaw**

The skill is now available to your OpenClaw instance.

---

## ✅ TESTING CHECKLIST

### Pre-Launch Testing

**1. Twilio Configuration**
- [ ] Account SID correct
- [ ] Auth Token correct
- [ ] Phone number purchased
- [ ] Voice webhook configured
- [ ] SMS webhook configured
- [ ] Trial credit available (£12)

**2. Google Sheets**
- [ ] Spreadsheet created
- [ ] All columns present
- [ ] Formulas working
- [ ] Service account created
- [ ] Sheet shared with service account
- [ ] Sheet ID copied to .env

**3. Code Testing**
- [ ] Server starts without errors
- [ ] Webhook endpoints respond
- [ ] SMS sends successfully
- [ ] Replies log to Sheets
- [ ] Owner alerts work
- [ ] Error handling in place

**4. End-to-End Test**
- [ ] Call from test phone → No answer
- [ ] Wait 30 seconds
- [ ] Receive SMS
- [ ] Reply to SMS
- [ ] Owner receives alert
- [ ] All logged in Sheets

### Customer Testing

**Beta Customer Checklist:**
- [ ] Install at customer location
- [ ] Forward calls to Twilio number (or port number)
- [ ] Test with real customer calls
- [ ] Monitor for 1 week
- [ ] Collect feedback
- [ ] Get testimonial
- [ ] Calculate ROI (saved jobs)

### Performance Testing

- [ ] SMS sends within 90 seconds
- [ ] Owner alerts within 10 seconds
- [ ] Sheets updates within 5 seconds
- [ ] No duplicate SMS
- [ ] Handles 10+ calls/hour
- [ ] Error recovery works

---

## 👤 CUSTOMER ONBOARDING

### Onboarding Checklist

**Day 1: Setup**
1. Collect customer info:
   - Business name
   - Owner phone number
   - Business hours
   - Current phone number (to forward or port)
   - Google email (for Sheets access)

2. Create Google Sheet:
   - Copy template
   - Share with customer
   - Add dashboard tab

3. Configure Twilio:
   - Purchase number (or use customer's)
   - Set up call forwarding
   - Configure webhooks

4. Test system:
   - Make test call
   - Verify SMS sends
   - Verify owner alert
   - Verify Sheets logging

**Day 2: Training**
1. Show customer:
   - How to view call log
   - How to update job status
   - How to estimate job values
   - How to read dashboard

2. Provide:
   - Login credentials
   - Quick start guide
   - Support contact
   - Video tutorial (Loom)

**Day 3-7: Monitoring**
1. Daily checks:
   - All calls logging correctly
   - SMS sending successfully
   - Owner alerts working
   - No errors in logs

2. Collect data:
   - Number of missed calls
   - Number of SMS sent
   - Number of replies
   - Number of jobs saved

**Day 7: Review**
1. Show customer results:
   - "You missed X calls"
   - "Y customers replied"
   - "Z jobs saved"
   - "Estimated revenue: £X"

2. Calculate ROI:
   - Jobs saved × Average job value
   - Compare to £99/month cost
   - Show payback period

3. Get testimonial:
   - Video (phone is fine)
   - Written with specific numbers
   - Permission to use in marketing

### Customer Success Metrics

Track these metrics per customer:

| Metric | Target | Why |
|--------|--------|-----|
| **Missed Calls/Month** | 20-50 | Shows they need it |
| **SMS Response Rate** | 30-50% | Shows system works |
| **Jobs Saved/Month** | 2-5 | Shows ROI |
| **Customer Satisfaction** | 4.5/5 | Shows they're happy |
| **Churn Rate** | <5%/month | Shows retention |

### Red Flags (At-Risk Customers)

Watch for these warning signs:
- ❌ No missed calls in 2 weeks (not using it)
- ❌ Complaining about SMS volume
- ❌ Not logging into dashboard
- ❌ Asking to pause/cancel
- ❌ Slow to pay invoice

**Intervention:**
- Call immediately
- Review their metrics
- Show ROI
- Offer additional training
- Adjust settings if needed

---

## 🔧 TROUBLESHOOTING

### Common Issues

**Problem: SMS not sending**

**Diagnosis:**
```bash
# Check Twilio logs
https://console.twilio.com/us1/monitor/logs/messages

# Check error messages
# Check account balance
# Check phone number capabilities
```

**Solutions:**
- [ ] Verify Twilio account has credit
- [ ] Verify phone number has SMS capability
- [ ] Check webhook is responding (200 status)
- [ ] Check phone number format (+44...)
- [ ] Check business hours restriction

---

**Problem: Calls not logging to Sheets**

**Diagnosis:**
```bash
# Check Google Sheets API
# Check service account permissions
# Check sheet ID is correct
# Check column headers match
```

**Solutions:**
- [ ] Verify GOOGLE_SHEET_ID in .env
- [ ] Re-share sheet with service account
- [ ] Regenerate service account credentials
- [ ] Check sheet structure matches code
- [ ] Check API quota not exceeded

---

**Problem: Owner not receiving alerts**

**Diagnosis:**
```bash
# Check owner phone number format
# Check WhatsApp/SMS delivery
# Check Twilio logs for errors
```

**Solutions:**
- [ ] Verify OWNER_PHONE_NUMBER in .env
- [ ] Test manually: `twilioClient.messages.create()`
- [ ] Check phone can receive SMS/WhatsApp
- [ ] Check not blocked by carrier

---

**Problem: Duplicate SMS sent**

**Diagnosis:**
```bash
# Check webhook is called once
# Check no duplicate server instances
# Check timeout logic
```

**Solutions:**
- [ ] Add unique call ID tracking
- [ ] Use Redis/database for state
- [ ] Add SMS sent flag in Sheets
- [ ] Check before sending

---

**Problem: SMS sends during night hours**

**Diagnosis:**
```bash
# Check business hours config
# Check timezone handling
# Check condition logic
```

**Solutions:**
- [ ] Add business hours check:
```javascript
const hour = new Date().getHours();
if (hour < BUSINESS_HOURS_START || hour > BUSINESS_HOURS_END) {
  return; // Don't send SMS
}
```
- [ ] Add timezone handling
- [ ] Add "emergency only" mode for nights

---

### Error Codes Reference

| Twilio Error | Meaning | Solution |
|--------------|---------|----------|
| 21211 | Invalid phone number | Check format (+44...) |
| 21608 | Unverified number (trial) | Upgrade account |
| 21610 | Account suspended | Contact Twilio support |
| 21612 | Insufficient funds | Add credit |
| 30003 | Invalid destination | Check phone number |
| 30005 | Unknown destination | Check country code |

| Google Sheets Error | Meaning | Solution |
|---------------------|---------|----------|
| 400 | Bad request | Check range format |
| 401 | Unauthorized | Check service account |
| 403 | Forbidden | Re-share sheet |
| 404 | Not found | Check sheet ID |
| 429 | Rate limited | Add delay between requests |

---

## 📈 SCALING & WHITE-LABEL

### Scaling to 100+ Customers

**Infrastructure:**
- Move from Google Sheets to PostgreSQL
- Add Redis for caching
- Use load balancer (nginx/HAProxy)
- Deploy to multiple regions
- Add monitoring (DataDog/New Relic)

**Operations:**
- Hire support person (10-20 customers)
- Create onboarding automation
- Build customer portal
- Add automated billing (Stripe)
- Create knowledge base

**Technical:**
```
Current (1-10 customers):
- Google Sheets
- Single server
- Manual onboarding

Growth (10-50 customers):
- PostgreSQL
- Load balancer
- Automated onboarding

Scale (50-200 customers):
- Multi-region
- Auto-scaling
- Full customer portal
- Dedicated support
```

### White-Label for Agencies

**Offer:**
- Agency sells under their brand
- You fulfill (build & maintain)
- Revenue share: 70/30 or 60/40

**Agency Package:**
```
Setup: £500 per customer
Monthly: £149/customer
Agency gets: £100/customer/month
You get: £49/customer/month (passive)
```

**Agency Onboarding:**
1. Sign partnership agreement
2. Provide training (1 hour call)
3. Give sales materials
4. Set up sub-account
5. First customer together
6. Ongoing support

**Materials to Provide:**
- Sales deck (PDF)
- Demo video (Loom)
- Pricing sheet
- Case studies
- Email templates
- Call scripts

### Building Your SaaS Platform

**Phase 1: Manual (1-20 customers)**
- Google Sheets per customer
- Manual setup
- You do everything

**Phase 2: Semi-Auto (20-50 customers)**
- Single database
- Customer portal
- Automated onboarding
- Self-service dashboard

**Phase 3: Full SaaS (50-200 customers)**
- Multi-tenant architecture
- Self-service signup
- Automated billing
- Customer support team
- API for integrations

**Tech Stack Evolution:**
```
Phase 1:
- Twilio + Google Sheets + Node.js

Phase 2:
- Twilio + PostgreSQL + React + Node.js

Phase 3:
- Twilio + PostgreSQL + React + Node.js + Redis + Stripe
```

---

## 💰 PRICING & PACKAGES

### Customer Packages

**STARTER - £199 setup + £79/month**
- 1 phone number
- Auto SMS to missed calls
- Google Sheets dashboard
- Email support
- Business hours (9am-6pm)

**PRO - £299 setup + £129/month** (MOST POPULAR)
- Everything in Starter
- WhatsApp alerts to owner
- Custom message templates
- 24/7 support
- Weekly report email
- Up to 500 SMS/month

**PREMIUM - £499 setup + £199/month**
- Everything in Pro
- Multi-number support
- CRM integration
- Call recording
- Dedicated support
- Unlimited SMS
- Custom dashboard

### Agency Packages

**PARTNER - Free to join**
- 30% revenue share
- Basic training
- Email support

**PREMIUM PARTNER - £500/month**
- 40% revenue share
- Advanced training
- Priority support
- Co-marketing
- Case study feature

**MASTER PARTNER - £2,000/month**
- 50% revenue share
- White-label platform
- Dedicated account manager
- Custom features
- Territory exclusivity

---

## 📊 METRICS & KPIs

### Business Metrics to Track

| Metric | Formula | Target |
|--------|---------|--------|
| **MRR** | Sum of all monthly subscriptions | £10,000 by month 12 |
| **Churn Rate** | Customers lost / Total customers | <5%/month |
| **LTV** | Avg monthly price × Avg months | £2,000+ |
| **CAC** | Sales & marketing cost / New customers | <£100 |
| **LTV:CAC** | LTV / CAC | >20:1 |
| **Gross Margin** | (Revenue - COGS) / Revenue | >80% |

### Customer Success Metrics

| Metric | Target | Why |
|--------|--------|-----|
| **Missed Calls/Month** | 20-50 | Shows they need it |
| **SMS Response Rate** | 30-50% | Shows system works |
| **Jobs Saved/Month** | 2-5 | Shows ROI |
| **NPS Score** | 8+/10 | Shows satisfaction |
| **Support Tickets/Month** | <3 | Shows it works well |

---

## 🎉 LAUNCH CHECKLIST

### Pre-Launch (Week 1)
- [ ] Twilio account setup
- [ ] Google Sheets template created
- [ ] Code deployed and tested
- [ ] 3 beta customers identified
- [ ] Landing page built
- [ ] Sales scripts written

### Launch (Week 2-3)
- [ ] Install for 3 beta customers (free)
- [ ] Track results for 1 week
- [ ] Collect testimonials
- [ ] Refine pitch based on feedback
- [ ] Start cold outreach (50 calls/day)

### Post-Launch (Week 4)
- [ ] Convert beta to paid (if ROI proven)
- [ ] Close first 5-10 paid customers
- [ ] Document onboarding process
- [ ] Create support FAQ
- [ ] Plan Month 2 scaling

---

## 📞 SUPPORT & MAINTENANCE

### Support Tiers

**Tier 1: Self-Service**
- Knowledge base
- Video tutorials
- FAQ document
- Response time: N/A

**Tier 2: Email Support**
- support@yourcompany.com
- Response time: 24 hours
- Included in all plans

**Tier 3: Priority Support**
- WhatsApp/Phone support
- Response time: 2 hours
- Included in Pro+ plans

**Tier 4: Dedicated Support**
- Dedicated account manager
- Response time: 30 minutes
- Included in Premium plan

### Maintenance Tasks

**Daily:**
- [ ] Check Twilio error logs
- [ ] Check server health
- [ ] Review support tickets

**Weekly:**
- [ ] Review customer metrics
- [ ] Check for at-risk customers
- [ ] Update documentation

**Monthly:**
- [ ] Send customer reports
- [ ] Review churn reasons
- [ ] Plan improvements

**Quarterly:**
- [ ] Review pricing
- [ ] Add new features
- [ ] Customer satisfaction survey

---

## 🏆 SUCCESS STORIES (Template)

### Case Study Template

**Customer:** [Business Name]
**Industry:** [Plumber/HVAC/etc.]
**Location:** [City, UK]
**Setup Date:** [Date]

**Before:**
- Missing 15-20 calls/week
- Losing £500-1,000/month
- No system to track missed calls

**After:**
- 0 missed calls without follow-up
- Saving 3-5 jobs/month
- £600-2,500 extra revenue/month
- Full visibility into call log

**ROI:**
- Cost: £129/month
- Revenue gained: £600-2,500/month
- Payback period: First saved job
- **ROI: 5-20x**

**Quote:**
*"This system paid for itself in the first week. We saved 7 jobs in week 1 alone. Best £129/month we spend."*
- [Owner Name], [Business Name]

---

## 🎯 NEXT STEPS

1. **Today:** Set up Twilio account (30 min)
2. **Today:** Create Google Sheets template (20 min)
3. **Tomorrow:** Deploy code (2-3 hours)
4. **Day 3:** Test end-to-end (1 hour)
5. **Day 4:** Install for 3 beta customers
6. **Day 5-11:** Monitor and collect testimonials
7. **Day 12:** Start selling to paid customers

**You can have your first paying customer in 14 days!** 🚀

---

**Ready to build? Start with Twilio setup and work through each section!**

Questions? Check the Troubleshooting section or reach out to support.

**Good luck! You've got this!** 💪
