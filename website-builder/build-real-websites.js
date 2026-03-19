#!/usr/bin/env node
/**
 * Build and deploy websites for 60 real UK businesses
 */

const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');

// Read real leads
async function loadLeads() {
  const leadsFile = path.join(__dirname, 'real-leads.json');
  const data = await fs.readFile(leadsFile, 'utf8');
  return JSON.parse(data);
}

// Generate website HTML for a business
function generateWebsite(business, index) {
  const safeName = business.name.toLowerCase().replace(/[^a-z0-9]/g, '-').substring(0, 50);
  const demoUrl = `https://demo-${index + 1}.here.now/`;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${business.name} - Premium ${business.niche} Services in ${business.city || 'UK'}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        .gradient-bg { background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%); }
        .gradient-text { 
            background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    </style>
</head>
<body class="bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-lg sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 py-4">
            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center text-white text-xl font-bold">
                        ${business.name.charAt(0)}
                    </div>
                    <div>
                        <h1 class="text-xl font-bold text-slate-900">${business.name}</h1>
                        <p class="text-sm text-slate-600">Professional ${business.niche} Services</p>
                    </div>
                </div>
                <a href="mailto:${business.email}" class="gradient-bg text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90">
                    Contact Us
                </a>
            </div>
        </div>
    </nav>

    <!-- Hero -->
    <section class="py-20">
        <div class="max-w-7xl mx-auto px-4 text-center">
            <h2 class="text-5xl md:text-6xl font-black mb-6">
                Expert ${business.niche.charAt(0).toUpperCase() + business.niche.slice(1)} Services in ${business.city || 'Your Area'}
            </h2>
            <p class="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
                Professional, reliable, and affordable ${business.niche} services. Get your free quote today!
            </p>
            <div class="flex justify-center gap-4">
                <a href="tel:${business.phone || '+44 123 456 7890'}" class="gradient-bg text-white px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90">
                    Call Now
                </a>
                <a href="mailto:${business.email}" class="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg border-2 border-slate-200 hover:border-blue-500">
                    Get Free Quote
                </a>
            </div>
        </div>
    </section>

    <!-- Services -->
    <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4">
            <h3 class="text-4xl font-black text-center mb-12">Our Services</h3>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-slate-50 rounded-2xl p-8">
                    <div class="w-16 h-16 gradient-bg rounded-xl flex items-center justify-center text-white mb-6">
                        <i data-lucide="wrench" class="w-8 h-8"></i>
                    </div>
                    <h4 class="text-2xl font-bold mb-4">Expert Service</h4>
                    <p class="text-slate-600">Professional ${business.niche} services with years of experience.</p>
                </div>
                <div class="bg-slate-50 rounded-2xl p-8">
                    <div class="w-16 h-16 gradient-bg rounded-xl flex items-center justify-center text-white mb-6">
                        <i data-lucide="clock" class="w-8 h-8"></i>
                    </div>
                    <h4 class="text-2xl font-bold mb-4">Fast Response</h4>
                    <p class="text-slate-600">Quick response times and emergency services available.</p>
                </div>
                <div class="bg-slate-50 rounded-2xl p-8">
                    <div class="w-16 h-16 gradient-bg rounded-xl flex items-center justify-center text-white mb-6">
                        <i data-lucide="check" class="w-8 h-8"></i>
                    </div>
                    <h4 class="text-2xl font-bold mb-4">Guaranteed Work</h4>
                    <p class="text-slate-600">All work guaranteed with transparent pricing.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact -->
    <section class="py-20">
        <div class="max-w-4xl mx-auto px-4 text-center">
            <h3 class="text-4xl font-black mb-8">Get In Touch</h3>
            <div class="bg-white rounded-3xl p-8 shadow-xl">
                <div class="grid md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <div class="text-sm text-slate-600 mb-2">Email</div>
                        <a href="mailto:${business.email}" class="text-xl font-bold gradient-text">${business.email}</a>
                    </div>
                    <div>
                        <div class="text-sm text-slate-600 mb-2">Phone</div>
                        <a href="tel:${business.phone || '+44 123 456 7890'}" class="text-xl font-bold gradient-text">${business.phone || '+44 123 456 7890'}</a>
                    </div>
                </div>
                <p class="text-slate-600 mb-6">Ready to get started? Contact us today for a free, no-obligation quote!</p>
                <a href="mailto:${business.email}" class="gradient-bg text-white px-8 py-4 rounded-xl font-bold text-lg inline-block hover:opacity-90">
                    Contact Us Now
                </a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-slate-900 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 text-center">
            <div class="flex items-center justify-center space-x-3 mb-6">
                <div class="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                    <i data-lucide="wrench" class="w-6 h-6"></i>
                </div>
                <span class="text-xl font-bold">${business.name}</span>
            </div>
            <p class="text-slate-400">Professional ${business.niche} services in ${business.city || 'the UK'}</p>
            <p class="text-slate-500 text-sm mt-4">© 2026 ${business.name}. All rights reserved.</p>
        </div>
    </footer>

    <script>
        lucide.createIcons();
    </script>
</body>
</html>`;
}

// Main function
async function buildAllWebsites() {
  console.log('🚀 Building websites for 60 real UK businesses...\n');
  
  const leads = await loadLeads();
  const outputDir = path.join(__dirname, 'real-business-websites');
  
  // Create output directory
  await fs.mkdir(outputDir, { recursive: true });
  
  let built = 0;
  
  for (let i = 0; i < Math.min(leads.length, 60); i++) {
    const business = leads[i];
    const safeName = business.name.toLowerCase().replace(/[^a-z0-9]/g, '-').substring(0, 50);
    const websiteDir = path.join(outputDir, safeName);
    
    console.log(`📦 [${i + 1}/${leads.length}] Building: ${business.name}`);
    
    try {
      // Create directory
      await fs.mkdir(websiteDir, { recursive: true });
      
      // Generate and save website
      const html = generateWebsite(business, i);
      await fs.writeFile(path.join(websiteDir, 'index.html'), html);
      
      console.log(`   ✅ Built: ${safeName}`);
      built++;
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ WEBSITES BUILT!');
  console.log(`📊 Built: ${built}/${leads.length}`);
  console.log(`📁 Location: ${outputDir}`);
  console.log('='.repeat(60));
  
  console.log('\n🚀 NEXT: Deploy to here.now');
  console.log(`   cd ${outputDir}/[business-name]`);
  console.log('   bash ~/.openclaw/workspace/skills/here-now/scripts/publish.sh .');
  console.log('='.repeat(60));
}

// Run
if (require.main === module) {
  buildAllWebsites()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('Error:', error);
      process.exit(1);
    });
}

module.exports = { buildAllWebsites };
