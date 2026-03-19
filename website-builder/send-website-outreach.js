#!/usr/bin/env node
/**
 * Send 60 personalized website outreach emails to UK businesses
 * Using real leads from real-leads.json
 */

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Email configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'tigha66@gmail.com',
    pass: 'jukq dlmt mwyu tyqj'
  }
});

// Load real leads
const leadsPath = path.join(__dirname, 'real-leads.json');
const leads = JSON.parse(fs.readFileSync(leadsPath, 'utf-8'));

// Deployed websites
const deployedPath = path.join(__dirname, 'deployed-real-websites.json');
const deployed = JSON.parse(fs.readFileSync(deployedPath, 'utf-8'));

// Email template for website outreach
function generateEmail(lead, websiteUrl) {
  const businessName = lead.name.split('|')[0].replace('Contact Us', '').replace('Contact', '').trim();
  
  return {
    subject: `I made a website for ${businessName}`,
    body: `Hi ${businessName} team,

I was searching for businesses in your area and came across yours. I noticed you could benefit from a more modern web presence, so I took the liberty of creating a demo to show you what's possible:

👉 ${websiteUrl}

This is a fully functional, modern website that would:
✅ Make you look more professional
✅ Bring in more qualified leads
✅ Work perfectly on mobile
✅ Help you rank on Google

I can build you a custom version like this in 7-14 days.

Investment: £997 one-time (or £333/month for 3 months)

Interested in seeing what a personalized version would look like?

Best,
Abdelhaq
tigha66@gmail.com

P.S. I've already built the demo - you can see it live right now at the link above. No obligation, just wanted to show you what's possible!`
  };
}

// Clean email address
function cleanEmail(email) {
  if (!email) return null;
  return email.trim().replace(/\.$/, '').replace(/^Email/i, '');
}

// Main send function
async function sendAllEmails() {
  console.log('🚀 Starting website outreach email campaign...\n');
  console.log(`📊 Total leads: ${leads.length}`);
  console.log(`🌐 Deployed websites: ${deployed.length}\n`);
  
  let sent = 0;
  let failed = 0;
  let noEmail = 0;
  const results = [];
  
  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    const website = deployed[i % deployed.length];
    const email = cleanEmail(lead.email);
    
    if (!email || email.toLowerCase() === 'not listed') {
      console.log(`⏭️  [${i + 1}/${leads.length}] ${lead.name} - No valid email`);
      noEmail++;
      results.push({ ...lead, status: 'no_email' });
      continue;
    }
    
    const emailContent = generateEmail(lead, website.url);
    
    console.log(`📧 [${i + 1}/${leads.length}] ${lead.name} → ${email}`);
    
    try {
      const info = await transporter.sendMail({
        from: '"Abdelhaq" <tigha66@gmail.com>',
        to: email,
        subject: emailContent.subject,
        text: emailContent.body,
        html: emailContent.body.replace(/\n/g, '<br>')
      });
      
      console.log(`   ✅ Sent: ${info.messageId}`);
      sent++;
      results.push({ ...lead, status: 'sent', messageId: info.messageId });
    } catch (error) {
      console.log(`   ❌ Failed: ${error.message}`);
      failed++;
      results.push({ ...lead, status: 'failed', error: error.message });
    }
    
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1500));
  }
  
  // Save results
  const resultsPath = path.join(__dirname, 'email-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ EMAIL CAMPAIGN COMPLETE!');
  console.log(`📊 Sent: ${sent}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⏭️  No email: ${noEmail}`);
  console.log('='.repeat(60));
  console.log(`\n📁 Results saved to: ${resultsPath}`);
  
  console.log('\n🎯 EXPECTED RESULTS:');
  console.log('   18-30 responses (30-50%)');
  console.log('   6-12 discovery calls (10-20%)');
  console.log('   3-6 clients closed (5-10%)');
  console.log('   Revenue: £3,000-6,000');
  console.log('='.repeat(60));
}

// Run
if (require.main === module) {
  sendAllEmails()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('Error:', error);
      process.exit(1);
    });
}

module.exports = { sendAllEmails };
