#!/usr/bin/env python3
"""Build premium landing pages for businesses without websites."""
import os
import json

# Color schemes by industry
COLORS = {
    "Plumber": {"primary": "#1e40af", "secondary": "#3b82f6", "accent": "#60a5fa", "bg": "#f0f9ff"},
    "Electrician": {"primary": "#f59e0b", "secondary": "#fbbf24", "accent": "#fcd34d", "bg": "#fffbeb"},
    "Roofer": {"primary": "#7f1d1d", "secondary": "#b91c1c", "accent": "#dc2626", "bg": "#fef2f2"},
    "Hair Salon": {"primary": "#7c3aed", "secondary": "#a78bfa", "accent": "#c4b5fd", "bg": "#f5f3ff"},
    "Restaurant/Cafe": {"primary": "#ea580c", "secondary": "#f97316", "accent": "#fb923c", "bg": "#fff7ed"},
    "Auto Repair": {"primary": "#1e293b", "secondary": "#334155", "accent": "#475569", "bg": "#f1f5f9"},
    "Dental Clinic": {"primary": "#0891b2", "secondary": "#06b6d4", "accent": "#67e8f9", "bg": "#ecfeff"},
    "Law Firm": {"primary": "#1e3a8a", "secondary": "#1e40af", "accent": "#3b82f6", "bg": "#eff6ff"}
}

def generate_website(business):
    """Generate a premium HTML landing page for a business."""
    name = business["name"]
    phone = business["phone"]
    email = business["email"]
    city = business["city"]
    industry = business["industry"]
    colors = COLORS.get(industry, COLORS["Plumber"])
    
    # Industry-specific services
    services = {
        "Plumber": ["Emergency Plumbing", "Bathroom Installation", "Boiler Repairs", "Leak Detection", "Pipe Installation"],
        "Electrician": ["Electrical Repairs", "Full Rewiring", "Consumer Unit Upgrades", "Lighting Installation", "Safety Inspections"],
        "Roofer": ["Roof Repairs", "New Roof Installation", "Guttering & Fascias", "Flat Roofing", "Emergency Repairs"],
        "Hair Salon": ["Haircuts & Styling", "Colouring & Highlights", "Balayage", "Wedding Hair", "Hair Treatments"],
        "Restaurant/Cafe": ["Fresh Local Produce", "Artisan Coffee", "Homemade Cakes", "Lunch & Dinner", "Private Events"],
        "Auto Repair": ["MOT Testing", "Car Servicing", "Brake Repairs", "Diagnostics", "Tyre Fitting"],
        "Dental Clinic": ["General Dentistry", "Teeth Whitening", "Dental Implants", "Emergency Care", "Cosmetic Dentistry"],
        "Law Firm": ["Family Law", "Property Law", "Employment Law", "Wills & Probate", "Legal Advice"]
    }
    
    service_list = services.get(industry, ["Professional Services", "Quality Work", "Expert Advice"])
    
    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{name} - {city}</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            line-height: 1.6;
            color: #1f2937;
        }}
        
        .hero {{
            background: linear-gradient(135deg, {colors["primary"]}, {colors["secondary"]});
            color: white;
            padding: 100px 20px;
            text-align: center;
        }}
        
        .hero h1 {{
            font-size: 3rem;
            margin-bottom: 20px;
            font-weight: 700;
        }}
        
        .hero p {{
            font-size: 1.5rem;
            opacity: 0.95;
            margin-bottom: 30px;
        }}
        
        .cta-button {{
            display: inline-block;
            background: white;
            color: {colors["primary"]};
            padding: 15px 40px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            transition: transform 0.2s;
        }}
        
        .cta-button:hover {{
            transform: translateY(-2px);
        }}
        
        .section {{
            padding: 80px 20px;
            max-width: 1200px;
            margin: 0 auto;
        }}
        
        .section h2 {{
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 50px;
            color: {colors["primary"]};
        }}
        
        .services-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            margin-bottom: 40px;
        }}
        
        .service-card {{
            background: {colors["bg"]};
            padding: 30px;
            border-radius: 12px;
            text-align: center;
            border-left: 4px solid {colors["primary"]};
        }}
        
        .service-card h3 {{
            color: {colors["primary"]};
            margin-bottom: 15px;
            font-size: 1.3rem;
        }}
        
        .contact-section {{
            background: {colors["bg"]};
            padding: 80px 20px;
        }}
        
        .contact-grid {{
            max-width: 800px;
            margin: 0 auto;
            display: grid;
            gap: 30px;
        }}
        
        .contact-item {{
            background: white;
            padding: 30px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }}
        
        .contact-item h3 {{
            color: {colors["primary"]};
            margin-bottom: 10px;
        }}
        
        .contact-item a {{
            color: {colors["secondary"]};
            text-decoration: none;
            font-size: 1.2rem;
            font-weight: 600;
        }}
        
        .contact-item a:hover {{
            text-decoration: underline;
        }}
        
        footer {{
            background: #1f2937;
            color: white;
            text-align: center;
            padding: 40px 20px;
        }}
        
        @media (max-width: 768px) {{
            .hero h1 {{
                font-size: 2rem;
            }}
            .hero p {{
                font-size: 1.2rem;
            }}
            .section h2 {{
                font-size: 2rem;
            }}
        }}
    </style>
</head>
<body>
    <section class="hero">
        <h1>{name}</h1>
        <p>Your Trusted {industry} in {city}</p>
        <a href="tel:{phone}" class="cta-button">📞 Call Now: {phone}</a>
    </section>
    
    <section class="section">
        <h2>Our Services</h2>
        <div class="services-grid">
            {''.join([f'''
            <div class="service-card">
                <h3>{service}</h3>
                <p>Professional, reliable service with years of experience. We guarantee quality workmanship and customer satisfaction.</p>
            </div>''' for service in service_list])}
        </div>
    </section>
    
    <section class="contact-section">
        <div class="section">
            <h2>Get In Touch</h2>
            <div class="contact-grid">
                <div class="contact-item">
                    <h3>📍 Location</h3>
                    <p>{city}, United Kingdom</p>
                    <p style="margin-top: 10px; color: #6b7280;">Serving {city} and surrounding areas</p>
                </div>
                <div class="contact-item">
                    <h3>📞 Phone</h3>
                    <p><a href="tel:{phone}">{phone}</a></p>
                    <p style="margin-top: 10px; color: #6b7280;">Call us for a free quote</p>
                </div>
                <div class="contact-item">
                    <h3>✉️ Email</h3>
                    <p><a href="mailto:{email}">{email}</a></p>
                    <p style="margin-top: 10px; color: #6b7280;">We respond within 24 hours</p>
                </div>
            </div>
        </div>
    </section>
    
    <footer>
        <p>&copy; 2026 {name}. All rights reserved.</p>
        <p style="margin-top: 10px; opacity: 0.8;">Professional {industry} services in {city}</p>
    </footer>
</body>
</html>'''
    
    return html

# Load businesses
with open('/data/.openclaw/workspace/oxylabs-leads/oxylabs-businesses-50.json', 'r') as f:
    data = json.load(f)

businesses = data["businesses"]

# Filter businesses without websites
no_website = [b for b in businesses if b["website_status"] == "None"]

print(f"Building websites for {len(no_website)} businesses...")

# Create output directory
os.makedirs('/data/.openclaw/workspace/oxylabs-leads/built-websites', exist_ok=True)

# Generate websites
deployed_urls = []
for business in no_website:
    html = generate_website(business)
    filename = business["name"].lower().replace(" ", "-").replace("'", "")
    filepath = f'/data/.openclaw/workspace/oxylabs-leads/built-websites/{filename}.html'
    
    with open(filepath, 'w') as f:
        f.write(html)
    
    print(f"✓ Built: {business['name']} -> {filename}.html")
    deployed_urls.append({
        "name": business["name"],
        "file": f"{filename}.html",
        "industry": business["industry"],
        "city": business["city"]
    })

print(f"\n✅ Built {len(deployed_urls)} websites successfully!")
print("Next step: Deploy to here.now")

# Save deployment list
with open('/data/.openclaw/workspace/oxylabs-leads/websites-to-deploy.json', 'w') as f:
    json.dump(deployed_urls, f, indent=2)
