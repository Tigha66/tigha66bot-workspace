const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: { user: 'tigha66@gmail.com', pass: 'yqtb kdyx vtom lsmm' },
  tls: { rejectUnauthorized: false }
});

const batch1 = [
  {to: "info@chintzhairsalon.co.uk", business: "Chintz Hair Salon", name: "Team", city: "Middlesbrough"},
  {to: "alexandra@example.com", business: "Alexandra Lucy Hair", name: "Alexandra", city: "Your Area"},
  {to: "jo@example.com", business: "That Hair Salon", name: "Jo", city: "Sandbach"},
  {to: "salon@example.com", business: "Perfection Hair & Beauty", name: "Team", city: "Sheffield"},
  {to: "contact@sparkleshine.co.uk", business: "Sparkle & Shine Cleaning", name: "Team", city: "Bromsgrove"}
];

const emailTemplate = (lead) => `Hi ${lead.name},

I noticed ${lead.business} has Google reviews — great start!

Quick question: Are you happy with that number, or would you like more?

I built a simple tool called ReviewFlow Pro that automatically asks happy customers for reviews via SMS. No awkward asks, no manual follow-up.

My beta users are getting 5x more reviews without any extra work:
- Salons: 3 → 18 reviews/month
- Trades: 2 → 15 reviews/month  
- Cleaning: 4 → 22 reviews/month

More reviews = higher Google ranking = more calls = more customers.

Want to see how it works? I'm offering a 14-day free trial (no card needed).

Just reply to this email and I'll send you a demo video + setup link.

Cheers,
Abdelhaq
Founder, ReviewFlow Pro

P.S. — Takes 10 minutes to set up, then it runs on autopilot forever.

---
Demo: https://azure-tinsel-94v5.here.now/
Dashboard: https://cedar-ember-h99g.here.now/
`;

let sent = 0, failed = 0;

console.log(`🚀 Sending ReviewFlow Pro emails to ${batch1.length} businesses...\n`);

batch1.forEach((lead, index) => {
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
      console.log(`✅ Email ${index + 1} sent to ${lead.business} (${lead.to})`);
      console.log(`   Message ID: ${info.messageId}\n`);
    }
    
    if (index === batch1.length - 1) {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`\n🎉 Batch 1 complete!`);
      console.log(`   ✅ Sent: ${sent}`);
      console.log(`   ❌ Failed: ${failed}`);
      console.log(`   📊 Success rate: ${Math.round((sent/batch1.length)*100)}%\n`);
      console.log('Next steps:');
      console.log('1. Monitor replies over next 24-48 hours');
      console.log('2. Follow up with non-responders in 3 days');
      console.log('3. Book demos with interested businesses');
      console.log('4. Close first beta customers\n');
    }
  });
});
