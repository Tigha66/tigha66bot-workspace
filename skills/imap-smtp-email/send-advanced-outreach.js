const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: { user: 'tigha66@gmail.com', pass: 'yqtb kdyx vtom lsmm' },
  tls: { rejectUnauthorized: false }
});

const highPriorityLeads = [
  {
    to: "office@londonuk.lawyer",
    business: "London UK Lawyer",
    industry: "Legal Services",
    hook: "Your law firm website doesn't have automated client intake - we can add a system that qualifies leads before they call"
  },
  {
    to: "press@legalservicesboard.org.uk",
    business: "Legal Services Board",
    industry: "Legal Services",
    hook: "Your regulatory body website could benefit from modern case tracking - citizens need better visibility into complaint status"
  },
  {
    to: "info@uklaw.co.uk",
    business: "UK Law",
    industry: "Legal Services",
    hook: "You're open 24hrs but have no live chat - adding this could capture 30% more claims overnight"
  },
  {
    to: "info@facesconsent.com",
    business: "Faces Consent",
    industry: "Healthcare Booking",
    hook: "You help businesses fix outdated booking systems - does your own website reflect the modern solutions you recommend?"
  },
  {
    to: "hello@market-link.co.uk",
    business: "Market Link",
    industry: "Marketing Services",
    hook: "You teach businesses about booking optimization - let's audit your own conversion funnel for free"
  },
  {
    to: "info@upshotmedia.co.uk",
    business: "Upshot Media",
    industry: "Marketing Agency",
    hook: "You write about booking systems but don't have demo booking on your site - ironic, right? Let's fix it"
  },
  {
    to: "info@britishwebsitedesign.co.uk",
    business: "British Website Design",
    industry: "Web Design",
    hook: "Fellow web designers - noticed your redesign article. Want to partner on overflow work?"
  },
  {
    to: "contact@uk.dental",
    business: "UK.Dental",
    industry: "Dental Services",
    hook: "Your dental recruitment site doesn't have instant booking for consultations - adding this could increase conversions 40%"
  },
  {
    to: "info@rightlegalgroup.com",
    business: "Right Legal Group",
    industry: "Legal Services",
    hook: "Your contact form says emails 'aren't going to get lost' - but no automated confirmation? We can fix this"
  },
  {
    to: "support@lawhive.co.uk",
    business: "Lawhive",
    industry: "Legal Tech",
    hook: "Impressed with your platform - want to discuss partnership opportunities for overflow web design work?"
  }
];

let sent = 0, failed = 0;

highPriorityLeads.forEach((lead) => {
  const mailOptions = {
    from: 'tigha66@gmail.com',
    to: lead.to,
    subject: 'Quick question about your website',
    text: `Hi ${lead.business} Team,

I was researching ${lead.industry} businesses in the UK and came across your website.

${lead.hook}

I specialize in helping UK businesses like yours modernize their digital presence with:

✨ Professional Website Redesign - £397 one-time
✓ Fully responsive and mobile-friendly
✓ Contact forms and booking systems
✓ Google Maps integration
✓ SEO optimization
✓ Stripe payment integration
✓ 1-year hosting included

OR

🔄 Ongoing Support - £39/month
✓ Unlimited website edits
✓ 24/7 priority support
✓ Hosting always included
✓ Monthly analytics reports

I'm currently offering a special discount for the first 10 businesses this week.

Would you be open to a quick 10-minute call to discuss?

Best regards,
Abdelhaq
Tigha66bot
Email: tigha66@gmail.com

P.S. No pressure at all - even if you're not interested, I'm happy to provide a free website audit with specific recommendations.

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
      console.log(`   Hook: ${lead.hook.substring(0, 80)}...`);
    }
    if (sent === highPriorityLeads.length) {
      console.log(`\n🎉 ADVANCED OUTREACH COMPLETE: ${sent - failed}/${sent} emails sent successfully`);
      process.exit(0);
    }
  });
});
