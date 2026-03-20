const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));

// API endpoint to get all projects data
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await getProjectsData();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to get deployed websites
app.get('/api/websites', async (req, res) => {
  try {
    const websites = await getWebsitesData();
    res.json(websites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to get revenue stats
app.get('/api/stats', async (req, res) => {
  try {
    const stats = await getRevenueStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve dashboard
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Mock data functions (in production, these would query databases)
async function getProjectsData() {
  return {
    leadflow: {
      name: 'LeadFlow AI',
      status: 'active',
      description: 'Automated email outreach for lead generation',
      emailsPerDay: 200,
      totalLeads: 505,
      automation: '9 AM daily + 2 PM follow-ups',
      projectedMRR: '$5,000-10,000',
      github: 'https://github.com/Tigha66/leadflow-ai',
      metrics: {
        emailsSent: 50,
        responses: 0,
        demos: 0,
        closed: 0
      }
    },
    websiteBuilder: {
      name: 'Website Builder Service',
      status: 'active',
      description: 'Premium websites for local UK businesses',
      websitesDeployed: 69,
      niches: ['Plumbers', 'Electricians', 'Roofers'],
      cities: '20+ UK cities',
      projectedRevenue: '£10,000-15,000',
      github: 'https://github.com/Tigha66/website-builder-service',
      portfolio: 'https://gilded-mesa-8gg9.here.now/',
      metrics: {
        leadsResearched: 100,
        websitesBuilt: 69,
        emailsSent: 0,
        clientsClosed: 0
      }
    },
    agencyProgram: {
      name: 'White-Label Agency Program',
      status: 'active',
      description: 'Resell LeadFlow AI to agencies',
      agenciesContacted: 5,
      packages: ['Starter $497', 'Growth $997', 'Enterprise $2,497'],
      projectedMRR: '$50,000-500,000',
      metrics: {
        contacted: 5,
        responses: 0,
        demos: 0,
        partners: 0
      }
    },
    autoLeadGen: {
      name: 'Automated Lead Generation',
      status: 'active',
      description: 'Tavily + Firecrawl automated lead finding',
      apisConfigured: ['Tavily', 'Firecrawl', 'Apify', 'Brave Search'],
      leadsGenerated: 20,
      automation: 'On-demand or scheduled',
      metrics: {
        searchesRun: 1,
        leadsFound: 20,
        websitesCrawled: 20,
        emailsExtracted: 1
      }
    }
  };
}

async function getWebsitesData() {
  // Read from the built-websites directory
  try {
    const builtDir = path.join(__dirname, '..', 'website-builder', 'built-websites');
    const demoDir = path.join(__dirname, '..', 'website-builder', 'demo-websites');
    
    const websites = [];
    
    // Get built client websites
    try {
      const builtSites = await fs.readdir(builtDir);
      for (const site of builtSites.slice(0, 20)) { // First 20 for demo
        if (site !== '.git' && site !== 'node_modules') {
          websites.push({
            name: site.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            type: 'client',
            niche: site.includes('plumb') ? 'Plumber' : site.includes('electric') ? 'Electrician' : 'Roofer',
            url: `https://${site}.here.now/`,
            city: site.split('-').pop() || 'UK'
          });
        }
      }
    } catch (error) {
      console.log('Built websites directory not found');
    }
    
    // Get demo websites
    try {
      const demoSites = await fs.readdir(demoDir);
      for (const site of demoSites) {
        if (site !== '.git' && site !== 'node_modules' && site !== 'index.html' && site !== '.herenow') {
          websites.push({
            name: site.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            type: 'demo',
            niche: 'Portfolio',
            url: `https://gilded-mesa-8gg9.here.now/${site}/`,
            city: 'Portfolio'
          });
        }
      }
    } catch (error) {
      console.log('Demo websites directory not found');
    }
    
    return {
      total: 69,
      displayed: websites.length,
      websites: websites,
      portfolio: 'https://gilded-mesa-8gg9.here.now/',
      github: 'https://github.com/Tigha66/website-builder-service'
    };
  } catch (error) {
    return {
      total: 69,
      displayed: 0,
      websites: [],
      portfolio: 'https://gilded-mesa-8gg9.here.now/',
      github: 'https://github.com/Tigha66/website-builder-service'
    };
  }
}

async function getRevenueStats() {
  return {
    totalPipeline: '$66,000-537,000+',
    breakdown: [
      {
        name: 'LeadFlow AI',
        value: '$5,000-10,000 MRR',
        timeline: '7-14 days',
        color: 'from-blue-500 to-cyan-500'
      },
      {
        name: 'Website Service',
        value: '£10,000-15,000',
        timeline: '7-14 days',
        color: 'from-purple-500 to-pink-500'
      },
      {
        name: 'Website Care Plans',
        value: '£1,000-2,000 MRR',
        timeline: '14-30 days',
        color: 'from-green-500 to-emerald-500'
      },
      {
        name: 'Agency Program',
        value: '$50,000-500,000 MRR',
        timeline: '14-30 days',
        color: 'from-orange-500 to-red-500'
      }
    ],
    quickWins: [
      {
        action: 'Send 69 website emails',
        potential: '£10,000-15,000',
        time: '2 hours',
        priority: 'HIGH'
      },
      {
        action: 'Monitor LeadFlow AI responses',
        potential: '$5,000-10,000 MRR',
        time: 'Passive',
        priority: 'MEDIUM'
      },
      {
        action: 'Generate 100 more leads',
        potential: '£10,000-15,000',
        time: '1 hour',
        priority: 'MEDIUM'
      }
    ]
  };
}

app.listen(PORT, () => {
  console.log(`🚀 Dashboard running at http://localhost:${PORT}`);
  console.log(`📊 View your projects at http://localhost:${PORT}`);
});
