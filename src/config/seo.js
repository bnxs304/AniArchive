// SEO Configuration for AniArchive
// This file contains all SEO-related constants and utilities

export const SEO_CONFIG = {
  // Main site configuration
  main: {
    title: "AniArchive - Premier Anime & Gaming Events Across the UK | Leicester, Coventry & More",
    description: "AniArchive hosts the UK's premier anime and gaming conventions. Join us for epic events featuring retro gaming, cosplay competitions, artist alley, TCG tournaments, and exclusive merchandise. Events in Leicester, Coventry, Birmingham, London, and Manchester.",
    keywords: "aniarchive, ani archive, anime event UK, anime convention UK, anime convention Leicester, anime convention Coventry, anime convention Birmingham, anime convention London, anime convention Manchester, gaming convention UK, cosplay competition UK, retro gaming UK, artist alley UK, TCG tournament UK, anime merchandise UK, tabletop gaming UK, anime festival UK, midlands anime event, UK anime community, anime meetup UK, gaming meetup UK",
    canonical: "https://www.theaniarchive.com/",
    ogImage: "https://www.theaniarchive.com/images/logo.png",
    twitterImage: "https://www.theaniarchive.com/images/logo.png"
  },

  // Subdomain-specific configurations
  subdomains: {
    leicester: {
      title: "Anime Con Leicester 2025 | November 8th | AniArchive - Premier Anime & Gaming Event",
      description: "Join Anime Con Leicester 2025 on November 8th at De Montfort Students' Union. Experience epic anime and gaming activities including cosplay competitions, artist alley, retro gaming, TCG tournaments, and exclusive merchandise. Book your tickets now!",
      keywords: "aniarchive, anime con leicester 2025, anime convention leicester, gaming convention leicester, Leicester anime event, Leicester gaming convention, DMU anime event, cosplay competition UK, artist alley UK, retro gaming UK, TCG tournament UK, anime merchandise UK, november 8th 2025",
      canonical: "https://leicester.theaniarchive.com/",
      ogImage: "https://www.theaniarchive.com/images/08nov25.png",
      twitterImage: "https://www.theaniarchive.com/images/08nov25.png"
    },
    coventry: {
      title: "AniArchive Coventry | Premier Anime & Gaming Event | The Box Fargo Village",
      description: "Join AniArchive Coventry for an epic anime and gaming convention at The Box Fargo Village. Experience retro gaming, cosplay competitions, artist alley, TCG tournaments, and exclusive merchandise in the heart of Coventry.",
      keywords: "aniarchive coventry, anime convention coventry, gaming convention coventry, Coventry anime event, Coventry gaming convention, Midlands anime event, The Box Fargo Village, anime event Coventry, gaming event Coventry",
      canonical: "https://coventry.theaniarchive.com/",
      ogImage: "https://www.theaniarchive.com/images/aug2nd25.png",
      twitterImage: "https://www.theaniarchive.com/images/aug2nd25.png"
    },
    birmingham: {
      title: "AniArchive Birmingham | Premier Anime & Gaming Event",
      description: "Join AniArchive Birmingham for an epic anime and gaming convention. Experience retro gaming, cosplay competitions, artist alley, TCG tournaments, and exclusive merchandise in Birmingham.",
      keywords: "aniarchive birmingham, anime convention birmingham, gaming convention birmingham, Birmingham anime event, Birmingham gaming convention, anime event Birmingham, gaming event Birmingham",
      canonical: "https://birmingham.theaniarchive.com/",
      ogImage: "https://www.theaniarchive.com/images/logo.png",
      twitterImage: "https://www.theaniarchive.com/images/logo.png"
    },
    london: {
      title: "AniArchive London | Premier Anime & Gaming Event",
      description: "Join AniArchive London for an epic anime and gaming convention. Experience retro gaming, cosplay competitions, artist alley, TCG tournaments, and exclusive merchandise in London.",
      keywords: "aniarchive london, anime convention london, gaming convention london, London anime event, London gaming convention, anime event London, gaming event London",
      canonical: "https://london.theaniarchive.com/",
      ogImage: "https://www.theaniarchive.com/images/logo.png",
      twitterImage: "https://www.theaniarchive.com/images/logo.png"
    },
    manchester: {
      title: "AniArchive Manchester | Premier Anime & Gaming Event",
      description: "Join AniArchive Manchester for an epic anime and gaming convention. Experience retro gaming, cosplay competitions, artist alley, TCG tournaments, and exclusive merchandise in Manchester.",
      keywords: "aniarchive manchester, anime convention manchester, gaming convention manchester, Manchester anime event, Manchester gaming convention, anime event Manchester, gaming event Manchester",
      canonical: "https://manchester.theaniarchive.com/",
      ogImage: "https://www.theaniarchive.com/images/logo.png",
      twitterImage: "https://www.theaniarchive.com/images/logo.png"
    }
  },

  // Page-specific configurations
  pages: {
    about: {
      title: "About AniArchive | Premier Anime & Gaming Events Across the UK",
      description: "Learn about AniArchive, the UK's premier anime and gaming convention organizer. Discover our mission, values, and commitment to bringing amazing anime and gaming experiences to communities across the UK.",
      keywords: "about aniarchive, anime convention organizer UK, gaming event organizer UK, anime community UK, gaming community UK, anime event history, gaming convention history"
    },
    vendor: {
      title: "Become a Vendor | AniArchive - Anime & Gaming Events",
      description: "Join AniArchive as a vendor and showcase your anime and gaming merchandise to thousands of passionate fans. Apply now to be part of our premier events across the UK.",
      keywords: "aniarchive vendor, anime convention vendor, gaming convention vendor, anime merchandise vendor, gaming merchandise vendor, artist alley vendor, TCG vendor"
    },
    volunteers: {
      title: "Volunteer with AniArchive | Join Our Amazing Team",
      description: "Volunteer with AniArchive and be part of creating unforgettable anime and gaming experiences. Join our passionate team and help bring joy to thousands of fans across the UK.",
      keywords: "aniarchive volunteer, anime convention volunteer, gaming convention volunteer, anime event volunteer, gaming event volunteer, volunteer opportunities UK"
    },
    guests: {
      title: "Become a Guest | AniArchive - Anime & Gaming Events",
      description: "Apply to be a guest performer, panelist, or special guest at AniArchive events. Share your expertise and passion with anime and gaming fans across the UK.",
      keywords: "aniarchive guest, anime convention guest, gaming convention guest, anime event guest, gaming event guest, cosplay guest, anime panelist"
    },
    faq: {
      title: "FAQ | AniArchive - Frequently Asked Questions",
      description: "Find answers to frequently asked questions about AniArchive events, tickets, venue information, and more. Get all the information you need for our anime and gaming conventions.",
      keywords: "aniarchive faq, anime convention faq, gaming convention faq, anime event questions, gaming event questions, event information"
    }
  },

  // Social media configuration
  social: {
    twitter: {
      site: "@theaniarchive",
      creator: "@theaniarchive",
      card: "summary_large_image"
    },
    facebook: {
      appId: "your-facebook-app-id", // Replace with actual Facebook App ID
      pageId: "your-facebook-page-id" // Replace with actual Facebook Page ID
    },
    instagram: {
      username: "theaniarchive"
    }
  },

  // Structured data templates
  structuredData: {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "AniArchive",
      "alternateName": ["Ani Archive", "The Ani Archive"],
      "url": "https://www.theaniarchive.com",
      "logo": "https://www.theaniarchive.com/images/logo.png",
      "description": "AniArchive hosts the UK's premier anime and gaming conventions",
      "foundingDate": "2024",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "GB",
        "addressRegion": "England"
      },
      "areaServed": [
        { "@type": "City", "name": "Leicester" },
        { "@type": "City", "name": "Coventry" },
        { "@type": "City", "name": "Birmingham" },
        { "@type": "City", "name": "London" },
        { "@type": "City", "name": "Manchester" }
      ],
      "sameAs": [
        "https://www.instagram.com/theaniarchive",
        "https://www.facebook.com/share/1X5nn3uunk/?mibextid=wwXIfr"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": "English",
        "areaServed": "GB"
      }
    },

    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "AniArchive",
      "url": "https://www.theaniarchive.com",
      "description": "Premier anime and gaming events across the UK",
      "publisher": {
        "@type": "Organization",
        "name": "AniArchive"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.theaniarchive.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  },

  // Performance optimization settings
  performance: {
    imageOptimization: {
      formats: ['webp', 'avif', 'jpg', 'png'],
      quality: 85,
      lazyLoading: true,
      placeholder: true
    },
    preload: {
      criticalResources: [
        '/images/logo.png',
        '/fonts/inter-var.woff2'
      ]
    },
    prefetch: {
      nextPages: [
        '/about',
        '/vendor',
        '/volunteers',
        '/guests',
        '/faq'
      ]
    }
  },

  // Analytics configuration
  analytics: {
    googleAnalytics: {
      measurementId: 'G-6MQTHHG2LR',
      enhancedEcommerce: true,
      customDimensions: {
        subdomain: 1,
        eventCity: 2,
        userType: 3
      }
    },
    googleTagManager: {
      containerId: 'GTM-XXXXXXX' // Replace with actual GTM container ID
    }
  }
}

// Utility functions for SEO
export const SEO_UTILS = {
  // Generate page title
  generateTitle: (page, subdomain = null) => {
    if (subdomain && SEO_CONFIG.subdomains[subdomain]) {
      return SEO_CONFIG.subdomains[subdomain].title
    }
    if (SEO_CONFIG.pages[page]) {
      return SEO_CONFIG.pages[page].title
    }
    return SEO_CONFIG.main.title
  },

  // Generate page description
  generateDescription: (page, subdomain = null) => {
    if (subdomain && SEO_CONFIG.subdomains[subdomain]) {
      return SEO_CONFIG.subdomains[subdomain].description
    }
    if (SEO_CONFIG.pages[page]) {
      return SEO_CONFIG.pages[page].description
    }
    return SEO_CONFIG.main.description
  },

  // Generate page keywords
  generateKeywords: (page, subdomain = null) => {
    if (subdomain && SEO_CONFIG.subdomains[subdomain]) {
      return SEO_CONFIG.subdomains[subdomain].keywords
    }
    if (SEO_CONFIG.pages[page]) {
      return SEO_CONFIG.pages[page].keywords
    }
    return SEO_CONFIG.main.keywords
  },

  // Generate canonical URL
  generateCanonical: (path = '/', subdomain = null) => {
    const baseUrl = subdomain ? `https://${subdomain}.theaniarchive.com` : 'https://www.theaniarchive.com'
    return `${baseUrl}${path}`
  },

  // Generate Open Graph image URL
  generateOGImage: (subdomain = null) => {
    if (subdomain && SEO_CONFIG.subdomains[subdomain]) {
      return SEO_CONFIG.subdomains[subdomain].ogImage
    }
    return SEO_CONFIG.main.ogImage
  },

  // Generate Twitter image URL
  generateTwitterImage: (subdomain = null) => {
    if (subdomain && SEO_CONFIG.subdomains[subdomain]) {
      return SEO_CONFIG.subdomains[subdomain].twitterImage
    }
    return SEO_CONFIG.main.twitterImage
  }
}

export default SEO_CONFIG
