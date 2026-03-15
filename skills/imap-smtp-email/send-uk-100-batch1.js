const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: { user: 'tigha66@gmail.com', pass: 'yqtb kdyx vtom lsmm' },
  tls: { rejectUnauthorized: false }
});

const batch1 = [
  {to: "dianejones325@gmail.com", business: "M's Hair Salon"},
  {to: "birmingham@jamesbushell.co.uk", business: "James Bushell Hair Salon"},
  {to: "support@cleaning-agency.co.uk", business: "London Cleaning Agency"},
  {to: "Comeclean@live.co.uk", business: "Come Clean Ltd"},
  {to: "office@cullens.co.uk", business: "Cullens Cleaning"},
  {to: "hello@londonhousecleaners.co.uk", business: "London House Cleaners"},
  {to: "hello@coffeehouseonline.co.uk", business: "Coffee House"},
  {to: "eatalylondon@eataly.co.uk", business: "Eataly London"},
  {to: "info@Jeremykingrestaurants.com", business: "Jeremy King Restaurants"},
  {to: "helena@real-eating.co.uk", business: "Real Eating Company"},
  {to: "contact@gaseco.co.uk", business: "Eco Gas Engineers"},
  {to: "dunlopplumbing@gmail.com", business: "Dunlop Plumbing"},
  {to: "info@eastendplumbers.co.uk", business: "East End Plumbers"},
  {to: "keithgordon982@btinternet.com", business: "Keith Gordon Plumbing"},
  {to: "info@ukelec.co.uk", business: "UK Electrical Installations"},
  {to: "info@eliteelectrical.co.uk", business: "Elite Electrical Contracting"},
  {to: "info@trendco.co.uk", business: "Trendco"}
];

let sent = 0, failed = 0;

batch1.forEach((lead) => {
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
      failed++;
      console.log(`❌ Failed to ${lead.business}:`, err.message);
    } else {
      console.log(`✅ Sent to ${lead.business} (${lead.to})`);
    }
    if (sent === batch1.length) {
      console.log(`\n🎉 BATCH 1 COMPLETE: ${sent - failed}/${sent} emails sent successfully`);
      process.exit(0);
    }
  });
});
