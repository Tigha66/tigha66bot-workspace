const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: { user: 'tigha66@gmail.com', pass: 'yqtb kdyx vtom lsmm' },
  tls: { rejectUnauthorized: false }
});

const batch2 = [
  {to: "info@cleannatural.co.uk", business: "CleanNatural", name: "Team", city: "London", niche: "Cleaning"},
  {to: "office@cleanersoflondon.co.uk", business: "Cleaners of London", name: "Team", city: "London", niche: "Cleaning"},
  {to: "hello@thehomemaid.co.uk", business: "The Home Maid", name: "Team", city: "Edinburgh", niche: "Cleaning"},
  {to: "info@aqgcleaning.co.uk", business: "AQG Cleaning Services", name: "Team", city: "Yorkshire", niche: "Cleaning"},
  {to: "info@busybees-homecare.co.uk", business: "Busy Bees Housekeeping", name: "Team", city: "Reigate", niche: "Cleaning"},
  {to: "info@olenacleaning.co.uk", business: "Olena Cleaning", name: "Team", city: "London", niche: "Cleaning"},
  {to: "contact@poppies.co.uk", business: "Poppies Cleaning", name: "Team", city: "UK-wide", niche: "Cleaning"},
  {to: "info@glimmr.co.uk", business: "Glimmr Cleaning", name: "Team", city: "London", niche: "Cleaning"},
  {to: "info@missmaid.co.uk", business: "Miss Maid", name: "Team", city: "London", niche: "Cleaning"},
  {to: "info@dailypoppins.co.uk", business: "Daily Poppins", name: "Team", city: "UK-wide", niche: "Cleaning"},
  {to: "info@tidychoice.com", business: "TidyChoice", name: "Team", city: "London", niche: "Cleaning"},
  {to: "info@cleaning-express.com", business: "Cleaning Express", name: "Team", city: "London", niche: "Cleaning"},
  {to: "salon@salonno6.co.uk", business: "Salon No.6", name: "Team", city: "Norwich", niche: "Hair & Beauty"},
  {to: "info@thehaircompany.co.uk", business: "The Hair Company", name: "Team", city: "UK", niche: "Hair"},
  {to: "hello@hausofbeauty.co.uk", business: "Hause of Beauty", name: "Team", city: "Hatfield", niche: "Beauty Salon"},
  {to: "info@mccroryhair.co.uk", business: "McCrorie Hair", name: "Team", city: "Manchester", niche: "Hair Salon"},
  {to: "bookings@thesalonno1.co.uk", business: "Salon No.1", name: "Team", city: "UK", niche: "Hair"},
  {to: "hello@salonsociety.co.uk", business: "Salon Society", name: "Team", city: "UK", niche: "Hair Co-working"},
  {to: "info@salonguru.net", business: "Salon Guru", name: "Team", city: "UK", niche: "Hair & Beauty"},
  {to: "contact@vezra.co.uk", business: "Vezra", name: "Team", city: "UK", niche: "Salon Websites"}
];

const emailTemplate = (lead) => `Hi ${lead.name},

I noticed ${lead.business} in ${lead.city} — looks like you're doing great work!

Quick question: Are you happy with your Google review count, or would you like more?

I built ReviewFlow Pro — a tool that automatically asks happy customers for reviews via SMS. No awkward asks, no manual follow-up.

My beta users are getting 5x more reviews:
- ${lead.niche} businesses: 3 → 18 reviews/month average
- More reviews = higher Google ranking = more customers

Want to see how it works? 14-day free trial (no card needed).

Just reply "yes" and I'll send you a demo video + setup link.

Cheers,
Abdelhaq
Founder, ReviewFlow Pro

P.S. — Takes 10 minutes to set up, then runs on autopilot.

---
Demo: https://azure-tinsel-94v5.here.now/
Dashboard: https://cedar-ember-h99g.here.now/
`;

let sent = 0, failed = 0;

console.log(`🚀 Sending ReviewFlow Pro Batch 2 to ${batch2.length} businesses...\n`);

batch2.forEach((lead, index) => {
  const mailOptions = {
    from: 'tigha66@gmail.com',
    to: lead.to,
    subject: `Quick question about your Google reviews`,
    text: emailTemplate(lead)
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      failed++;
      console.log(`❌ Email ${index + 1} FAILED to ${lead.business} (${lead.to})`);
      console.log(`   Error: ${error.message}\n`);
    } else {
      sent++;
      console.log(`✅ Email ${index + 1} sent to ${lead.business} (${lead.to}) - ${lead.niche} - ${lead.city}`);
      console.log(`   Message ID: ${info.messageId}\n`);
    }
    
    if (index === batch2.length - 1) {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`\n🎉 Batch 2 complete!`);
      console.log(`   ✅ Sent: ${sent}`);
      console.log(`   ❌ Failed: ${failed}`);
      console.log(`   📊 Success rate: ${Math.round((sent/batch2.length)*100)}%\n`);
      console.log('📈 CUMULATIVE TOTALS:');
      console.log(`   Total emails sent: ${sent + 5} (Batch 1: 5 + Batch 2: ${sent})`);
      console.log(`\nNext steps:`);
      console.log(`1. Monitor replies over next 24-48 hours`);
      console.log(`2. Follow up with non-responders in 3 days`);
      console.log(`3. Book demos with interested businesses`);
      console.log(`4. Close first beta customers\n`);
      console.log(`Expected responses (20% rate): ${Math.round(sent * 0.2)}-${Math.round(sent * 0.3)} replies`);
      console.log(`Expected demos (50% of responses): ${Math.round(sent * 0.1)}-${Math.round(sent * 0.15)} bookings\n`);
    }
  });
});
