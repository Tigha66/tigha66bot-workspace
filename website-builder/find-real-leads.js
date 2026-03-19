#!/usr/bin/env node
/**
 * Find real UK businesses with emails using Tavily API
 * Then build and deploy websites for them
 */

const https = require('https');

const TAVILY_API_KEY = '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';

// Search queries for different niches
const SEARCH_QUERIES = [
  // Plumbers
  'plumber Manchester email contact phone',
  'plumbing services Birmingham email',
  'emergency plumber Leeds contact',
  'plumber Sheffield email',
  'plumbing company Nottingham email',
  'plumber Bristol contact email',
  'plumbing services Leicester email',
  'plumber Liverpool contact',
  'plumbing company Newcastle email',
  'plumber Cardiff email contact',
  
  // Electricians
  'electrician Manchester email contact',
  'electrical services Birmingham email',
  'electrician Leeds contact email',
  'electrical company Sheffield email',
  'electrician Nottingham contact',
  'electrical services Bristol email',
  'electrician Leicester email contact',
  'electrical company Liverpool email',
  'electrician Newcastle contact email',
  'electrical services Cardiff email',
  
  // Roofers
  'roofer Manchester email contact',
  'roofing company Birmingham email',
  'roofer Leeds contact email',
  'roofing services Sheffield email',
  'roofer Nottingham contact',
  'roofing company Bristol email',
  'roofer Leicester email contact',
  'roofing services Liverpool email',
  'roofer Newcastle contact email',
  'roofing company Cardiff email'
];

// Tavily search function
async function tavilySearch(query) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      query: query,
      max_results: 5,
      search_depth: 'basic',
      include_email: true,
      include_phone: true
    });

    const options = {
      hostname: 'api.tavily.com',
      port: 443,
      path: '/search',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'Authorization': `Bearer ${TAVILY_API_KEY}`
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

// Extract business info from search results
function extractBusiness(result, niche) {
  const business = {
    name: result.title || 'Unknown',
    url: result.url || '',
    email: null,
    phone: null,
    city: '',
    niche: niche
  };

  // Try to extract email from content
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
  const emails = result.content?.match(emailRegex);
  if (emails && emails.length > 0) {
    business.email = emails[0];
  }

  // Try to extract phone
  const phoneRegex = /(\d[\d\s-]{9,}\d)/g;
  const phones = result.content?.match(phoneRegex);
  if (phones && phones.length > 0) {
    business.phone = phones[0];
  }

  // Try to extract city from URL or content
  const cities = ['Manchester', 'Birmingham', 'Leeds', 'Sheffield', 'Nottingham', 'Bristol', 'Leicester', 'Liverpool', 'Newcastle', 'Cardiff'];
  for (const city of cities) {
    if (result.url?.toLowerCase().includes(city.toLowerCase()) || 
        result.content?.toLowerCase().includes(city.toLowerCase())) {
      business.city = city;
      break;
    }
  }

  return business;
}

// Main search function
async function findRealLeads() {
  console.log('🔍 Searching for real UK businesses with emails...\n');
  
  const allBusinesses = [];
  
  for (let i = 0; i < SEARCH_QUERIES.length; i++) {
    const query = SEARCH_QUERIES[i];
    console.log(`📍 [${i + 1}/${SEARCH_QUERIES.length}] Searching: ${query}`);
    
    try {
      const result = await tavilySearch(query);
      
      if (result.results && result.results.length > 0) {
        for (const res of result.results) {
          const business = extractBusiness(res, query.includes('plumb') ? 'plumber' : query.includes('electr') ? 'electrician' : 'roofer');
          
          // Only add if we found an email
          if (business.email && business.name !== 'Unknown') {
            allBusinesses.push(business);
            console.log(`   ✅ Found: ${business.name} - ${business.email} (${business.city})`);
          }
        }
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }
    
    // Delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ SEARCH COMPLETE!');
  console.log(`📊 Total businesses found: ${allBusinesses.length}`);
  console.log('='.repeat(60));
  
  // Save to file
  const fs = require('fs');
  const path = require('path');
  const outputFile = path.join(__dirname, 'real-leads.json');
  fs.writeFileSync(outputFile, JSON.stringify(allBusinesses, null, 2));
  
  console.log(`\n💾 Saved to: ${outputFile}`);
  console.log('='.repeat(60));
  
  return allBusinesses;
}

// Run
if (require.main === module) {
  findRealLeads()
    .then(businesses => {
      console.log('\n🎯 NEXT STEPS:');
      console.log(`   1. Build websites for ${businesses.length} businesses`);
      console.log('   2. Deploy to here.now');
      console.log('   3. Send personalized emails with demo URLs');
      console.log('   4. Close clients at £997 each');
      console.log(`   5. Revenue potential: GBP ${(businesses.length * 997).toLocaleString()}`);
      console.log('='.repeat(60));
      process.exit(0);
    })
    .catch(error => {
      console.error('Error:', error);
      process.exit(1);
    });
}

module.exports = { findRealLeads };
