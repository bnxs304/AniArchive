// Dynamic Sitemap Generation for AniArchive
// This file generates sitemaps dynamically based on active events

import { eventsData, getActiveSubdomains } from '../src/data/eventData.js'

export default function handler(req, res) {
  const { subdomain } = req.query
  
  // Set proper headers for XML content
  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600') // Cache for 1 hour
  
  // Get current timestamp for lastmod
  const now = new Date().toISOString()
  
  // Generate sitemap XML
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">`

  if (subdomain && eventsData[subdomain]) {
    // Generate subdomain-specific sitemap
    const eventData = eventsData[subdomain]
    const baseUrl = `https://${subdomain}.theaniarchive.com`
    
    // Main event page
    sitemap += `
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${eventData.image.startsWith('http') ? eventData.image : `https://www.theaniarchive.com${eventData.image}`}</image:loc>
      <image:title>${eventData.title} - ${eventData.date}</image:title>
      <image:caption>Join us for ${eventData.title} at ${eventData.venue.name}</image:caption>
    </image:image>
  </url>`
    
    // Event-specific pages
    const pages = ['about', 'vendor', 'volunteers', 'guests', 'faq']
    pages.forEach(page => {
      sitemap += `
  <url>
    <loc>${baseUrl}/${page}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    })
    
  } else {
    // Generate main domain sitemap
    const baseUrl = 'https://www.theaniarchive.com'
    
    // Main pages
    const mainPages = [
      { path: '/', priority: '1.0', changefreq: 'daily' },
      { path: '/about', priority: '0.9', changefreq: 'weekly' },
      { path: '/vendor', priority: '0.8', changefreq: 'weekly' },
      { path: '/volunteers', priority: '0.8', changefreq: 'weekly' },
      { path: '/guests', priority: '0.8', changefreq: 'weekly' },
      { path: '/faq', priority: '0.7', changefreq: 'monthly' }
    ]
    
    mainPages.forEach(page => {
      sitemap += `
  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>`
      
      if (page.path === '/') {
        sitemap += `
    <image:image>
      <image:loc>${baseUrl}/images/logo.png</image:loc>
      <image:title>AniArchive Logo - Premier Anime &amp; Gaming Events</image:title>
      <image:caption>AniArchive hosts the UK's premier anime and gaming conventions</image:caption>
    </image:image>`
      }
      
      sitemap += `
  </url>`
    })
    
    // Add active subdomain events
    const activeSubdomains = getActiveSubdomains()
    activeSubdomains.forEach(subdomainName => {
      if (eventsData[subdomainName]) {
        const eventData = eventsData[subdomainName]
        const subdomainUrl = `https://${subdomainName}.theaniarchive.com`
        
        sitemap += `
  <url>
    <loc>${subdomainUrl}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
    <image:image>
      <image:loc>${eventData.image.startsWith('http') ? eventData.image : `https://www.theaniarchive.com${eventData.image}`}</image:loc>
      <image:title>${eventData.title} - ${eventData.date}</image:title>
      <image:caption>Join us for ${eventData.title} at ${eventData.venue.name}</image:caption>
    </image:image>
  </url>`
      }
    })
  }
  
  sitemap += `
</urlset>`
  
  res.status(200).send(sitemap)
}
