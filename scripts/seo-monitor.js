#!/usr/bin/env node

/**
 * SEO Monitoring Script for AniArchive
 * 
 * This script monitors various SEO metrics and provides reports
 * Run with: node scripts/seo-monitor.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  domains: [
    'https://www.theaniarchive.com',
    'https://leicester.theaniarchive.com'
  ],
  pages: [
    '/',
    '/about',
    '/vendor',
    '/volunteers',
    '/guests',
    '/faq'
  ],
  outputDir: './seo-reports',
  reportFile: 'seo-report.json'
};

// SEO Metrics to check
const METRICS = {
  title: {
    minLength: 30,
    maxLength: 60,
    required: true
  },
  description: {
    minLength: 120,
    maxLength: 160,
    required: true
  },
  keywords: {
    required: false
  },
  canonical: {
    required: true
  },
  ogTitle: {
    required: true
  },
  ogDescription: {
    required: true
  },
  ogImage: {
    required: true
  },
  twitterCard: {
    required: true
  },
  structuredData: {
    required: true
  }
};

/**
 * Fetch HTML content from URL
 */
function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        resolve(data);
      });
    });
    
    request.on('error', (error) => {
      reject(error);
    });
    
    request.setTimeout(10000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

/**
 * Extract meta tags from HTML
 */
function extractMetaTags(html) {
  const metaTags = {};
  
  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  if (titleMatch) {
    metaTags.title = titleMatch[1].trim();
  }
  
  // Extract meta description
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  if (descMatch) {
    metaTags.description = descMatch[1].trim();
  }
  
  // Extract meta keywords
  const keywordsMatch = html.match(/<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  if (keywordsMatch) {
    metaTags.keywords = keywordsMatch[1].trim();
  }
  
  // Extract canonical URL
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i);
  if (canonicalMatch) {
    metaTags.canonical = canonicalMatch[1].trim();
  }
  
  // Extract Open Graph tags
  const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  if (ogTitleMatch) {
    metaTags.ogTitle = ogTitleMatch[1].trim();
  }
  
  const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  if (ogDescMatch) {
    metaTags.ogDescription = ogDescMatch[1].trim();
  }
  
  const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  if (ogImageMatch) {
    metaTags.ogImage = ogImageMatch[1].trim();
  }
  
  // Extract Twitter Card
  const twitterCardMatch = html.match(/<meta[^>]*name=["']twitter:card["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  if (twitterCardMatch) {
    metaTags.twitterCard = twitterCardMatch[1].trim();
  }
  
  // Check for structured data
  const structuredDataMatch = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/is);
  if (structuredDataMatch) {
    try {
      metaTags.structuredData = JSON.parse(structuredDataMatch[1].trim());
    } catch (e) {
      metaTags.structuredData = 'Invalid JSON';
    }
  }
  
  return metaTags;
}

/**
 * Validate meta tags against requirements
 */
function validateMetaTags(metaTags, url) {
  const issues = [];
  
  Object.entries(METRICS).forEach(([key, requirements]) => {
    const value = metaTags[key];
    
    if (requirements.required && !value) {
      issues.push({
        type: 'missing',
        field: key,
        message: `Missing required ${key}`,
        url: url
      });
    }
    
    if (value && requirements.minLength && value.length < requirements.minLength) {
      issues.push({
        type: 'too_short',
        field: key,
        message: `${key} is too short (${value.length} chars, minimum ${requirements.minLength})`,
        url: url,
        value: value
      });
    }
    
    if (value && requirements.maxLength && value.length > requirements.maxLength) {
      issues.push({
        type: 'too_long',
        field: key,
        message: `${key} is too long (${value.length} chars, maximum ${requirements.maxLength})`,
        url: url,
        value: value
      });
    }
  });
  
  return issues;
}

/**
 * Check page performance using PageSpeed Insights API
 */
async function checkPageSpeed(url) {
  // Note: This would require a PageSpeed Insights API key
  // For now, return mock data
  return {
    lcp: Math.random() * 3000 + 1000, // Largest Contentful Paint
    fid: Math.random() * 200 + 50,    // First Input Delay
    cls: Math.random() * 0.3,         // Cumulative Layout Shift
    fcp: Math.random() * 2000 + 800, // First Contentful Paint
    score: Math.random() * 40 + 60    // Overall score
  };
}

/**
 * Generate SEO report
 */
async function generateSEOReport() {
  console.log('🔍 Starting SEO audit...\n');
  
  const report = {
    timestamp: new Date().toISOString(),
    domains: {},
    summary: {
      totalPages: 0,
      totalIssues: 0,
      criticalIssues: 0,
      warnings: 0
    }
  };
  
  for (const domain of CONFIG.domains) {
    console.log(`📊 Checking domain: ${domain}`);
    report.domains[domain] = {
      pages: {},
      issues: [],
      performance: {}
    };
    
    for (const page of CONFIG.pages) {
      const url = `${domain}${page}`;
      console.log(`  📄 Checking page: ${url}`);
      
      try {
        const html = await fetchHTML(url);
        const metaTags = extractMetaTags(html);
        const issues = validateMetaTags(metaTags, url);
        const performance = await checkPageSpeed(url);
        
        report.domains[domain].pages[page] = {
          metaTags,
          issues,
          performance,
          status: 'success'
        };
        
        report.summary.totalPages++;
        report.summary.totalIssues += issues.length;
        
        issues.forEach(issue => {
          if (issue.type === 'missing') {
            report.summary.criticalIssues++;
          } else {
            report.summary.warnings++;
          }
        });
        
        report.domains[domain].issues.push(...issues);
        
        // Log issues
        if (issues.length > 0) {
          console.log(`    ⚠️  Found ${issues.length} issues:`);
          issues.forEach(issue => {
            console.log(`      - ${issue.message}`);
          });
        } else {
          console.log(`    ✅ No issues found`);
        }
        
      } catch (error) {
        console.log(`    ❌ Error checking ${url}: ${error.message}`);
        report.domains[domain].pages[page] = {
          status: 'error',
          error: error.message
        };
      }
    }
  }
  
  return report;
}

/**
 * Save report to file
 */
function saveReport(report) {
  // Ensure output directory exists
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }
  
  const reportPath = path.join(CONFIG.outputDir, CONFIG.reportFile);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`\n📁 Report saved to: ${reportPath}`);
}

/**
 * Print summary
 */
function printSummary(report) {
  console.log('\n📈 SEO Audit Summary');
  console.log('==================');
  console.log(`Total pages checked: ${report.summary.totalPages}`);
  console.log(`Total issues found: ${report.summary.totalIssues}`);
  console.log(`Critical issues: ${report.summary.criticalIssues}`);
  console.log(`Warnings: ${report.summary.warnings}`);
  
  if (report.summary.criticalIssues > 0) {
    console.log('\n🚨 Critical Issues Found:');
    Object.entries(report.domains).forEach(([domain, data]) => {
      data.issues.forEach(issue => {
        if (issue.type === 'missing') {
          console.log(`  - ${issue.url}: ${issue.message}`);
        }
      });
    });
  }
  
  console.log('\n💡 Recommendations:');
  console.log('  - Fix all critical issues immediately');
  console.log('  - Optimize meta descriptions for better click-through rates');
  console.log('  - Ensure all images have proper alt text');
  console.log('  - Monitor Core Web Vitals regularly');
  console.log('  - Submit sitemaps to Google Search Console');
}

/**
 * Main function
 */
async function main() {
  try {
    const report = await generateSEOReport();
    saveReport(report);
    printSummary(report);
    
    // Exit with error code if critical issues found
    if (report.summary.criticalIssues > 0) {
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Error running SEO audit:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  generateSEOReport,
  validateMetaTags,
  extractMetaTags
};
