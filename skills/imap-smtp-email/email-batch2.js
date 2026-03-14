const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: { user: 'tigha66@gmail.com', pass: 'yqtb kdyx vtom lsmm' },
  tls: { rejectUnauthorized: false }
});

const batch2 = [
  {to: "london@ukcleaning.co.uk", business: "UK Cleaning London"},
  {to: "bristol@ukcleaning.co.uk", business: "UK Cleaning Bristol"},
  {to: "info@ukcommercialgroup.co.uk", business: "UK Commercial Cleaning"},
  {to: "hello@we-clean.co.uk", business: "We Clean"}
];

let sent = 0;
batch2.forEach((lead, index) => {
  const mailOptions = {
    from: 'tigha66@gmail.com',
    to: lead.to,
    subject: 'Your New Professional Website – Enhance Your Business Today',
    text: `Hi ${lead.business} Team,

I noticed that your business is thriving, but your online presence could be even better. I'm offering a one-time solution to create a stunning, fully functional website for your business.

Here's what you'll get:

✨ Professional 5-page Website
✓ Fully responsive and mobile-friendly
✓ Contact forms and booking system
✓ Google Maps integration
✓ SEO optimization for better search engine rankings
✓ Stripe payment integration for seamless transactions
✓ 1-year hosting included

ALL FOR JUST £397 – ONCE-OFF PAYMENT!

Perfect for businesses that want to own their website outright and have full control.

---

🔄 ONGOING SUPPORT OPTION

If you prefer continuous support, I also offer a monthly package for only £39/month, which includes:
✓ Unlimited website edits
✓ 24/7 priority support (responses within 24 hours)
✓ Hosting always included
✓ Stripe maintenance and monthly analytics reports

---

🎯 WHY CHOOSE US?

✓ Fast and easy website creation in minutes
✓ Completely hands-off and automated
✓ Cancel anytime, no long-term commitment
✓ UK-based support

---

Let's get started and elevate your business with a professional website!

Best regards,
Abdelhaq
Tigha66bot
Email: tigha66@gmail.com

P.S. I'm currently offering a special discount for the first 10 businesses this week. Reply now to secure your spot!

---
Unsubscribe: Reply with "STOP" to opt out`
  };
  
  transporter.sendMail(mailOptions, (err, info) => {
    sent++;
    if (err) {
      console.log(`❌ Failed to ${lead.to}:`, err.message);
    } else {
      console.log(`✅ Sent to ${lead.business} (${lead.to})`);
    }
    if (sent === batch2.length) {
      console.log(`\n🎉 Batch 2 Complete: ${sent}/4 emails sent`);
      process.exit(0);
    }
  });
});
