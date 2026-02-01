// Subdomain detection and management utilities

/**
 * Get the current subdomain from the hostname
 * @returns {string|null} The subdomain or null if on main domain
 */
export const getCurrentSubdomain = () => {
  if (typeof window === 'undefined') return null
  
  const hostname = window.location.hostname
  
  // Handle localhost development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    // Check for port-based subdomain simulation
    const port = window.location.port
    if (port === '3001') return 'coventry'
    if (port === '3002') return 'birmingham'
    if (port === '3003') return 'london'
    if (port === '3004') return 'manchester'
    if (port === '3005' || port === '3006') return 'leicester' // Support both ports
    if (port === '3007') return 'wolverhampton'
    if (port === '3008') return 'stafford'
    return null
  }
  
  // Handle production subdomains
  const parts = hostname.split('.')
  if (parts.length >= 3) {
    const subdomain = parts[0]
    return subdomain !== 'www' ? subdomain : null
  }
  
  return null
}

/**
 * Check if we're on a subdomain
 * @returns {boolean}
 */
export const isSubdomain = () => {
  return getCurrentSubdomain() !== null
}

/**
 * Get the main domain URL
 * @returns {string}
 */
export const getMainDomainUrl = () => {
  if (typeof window === 'undefined') return ''
  
  const hostname = window.location.hostname
  const protocol = window.location.protocol
  
  // Handle localhost development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `${protocol}//${hostname}:3000`
  }
  
  // Handle production
  const parts = hostname.split('.')
  if (parts.length >= 2) {
    const domain = parts.slice(-2).join('.')
    return `${protocol}//${domain}`
  }
  
  return `${protocol}//${hostname}`
}

/**
 * Get subdomain URL for a specific city
 * @param {string} city - The city subdomain
 * @returns {string}
 */
export const getSubdomainUrl = (city) => {
  if (typeof window === 'undefined') return ''
  
  const hostname = window.location.hostname
  const protocol = window.location.protocol
  
  // Handle localhost development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    const port = city === 'coventry' ? '3001' : 
                 city === 'birmingham' ? '3002' :
                 city === 'london' ? '3003' :
                 city === 'manchester' ? '3004' :
                 city === 'leicester' ? '3005' :
                 city === 'wolverhampton' ? '3007' :
                 city === 'stafford' ? '3008' : '3000'
    return `${protocol}//${hostname}:${port}`
  }
  
  // Handle production
  const parts = hostname.split('.')
  if (parts.length >= 2) {
    const domain = parts.slice(-2).join('.')
    return `${protocol}//${city}.${domain}`
  }
  
  return `${protocol}//${city}.${hostname}`
}

/**
 * Redirect to subdomain
 * @param {string} city - The city subdomain
 */
export const redirectToSubdomain = (city) => {
  const subdomainUrl = getSubdomainUrl(city)
  window.location.href = subdomainUrl
}

/**
 * Redirect to main domain
 */
export const redirectToMainDomain = () => {
  const mainDomainUrl = getMainDomainUrl()
  window.location.href = mainDomainUrl
}

/**
 * Get navigation items based on current context
 * @param {string} currentSubdomain - Current subdomain
 * @returns {Array} Navigation items
 */
export const getNavigationItems = (currentSubdomain) => {
  const baseItems = [
    { label: 'About', href: '/about', ariaLabel: 'Learn more about AniArchive' }
  ]
  
  if (currentSubdomain) {
    // Subdomain navigation
    return [
      { label: 'Get Involved', href: '#get-involved', ariaLabel: 'Get involved with AniArchive', hasDropdown: true },
      { label: 'FAQ', href: '/faq', ariaLabel: 'Frequently asked questions' },
      { label: 'About', href: '/about', ariaLabel: 'Learn more about AniArchive' }
    ]
  } else {
    // Main domain navigation
    return [
      { label: 'Get Involved', href: '#get-involved', ariaLabel: 'Get involved with AniArchive', hasDropdown: true },
      { label: 'FAQ', href: '/faq', ariaLabel: 'Frequently asked questions' },
      { label: 'About', href: '/about', ariaLabel: 'Learn more about AniArchive' }
    ]
  }
}

/**
 * Get dropdown items for "Get Involved" section
 * @returns {Array} Dropdown items
 */
export const getGetInvolvedItems = () => {
  return [
    { label: 'Become a Vendor', href: '/vendor', ariaLabel: 'Apply to become a vendor' },
    { label: 'Become a Volunteer', href: '/volunteers', ariaLabel: 'Apply to volunteer with us' },
    { label: 'Become a Guest', href: '/guests', ariaLabel: 'Apply to be a guest/performer' }
  ]
}

/**
 * Get SEO configuration for current subdomain
 * @param {string} subdomain - Current subdomain
 * @returns {Object} SEO configuration
 */
export const getSubdomainSEOConfig = (subdomain) => {
  const seoConfigs = {
    leicester: {
      title: "Anime Con Leicester 2025 | November 8th | AniArchive - Premier Anime & Gaming Event",
      description: "Join Anime Con Leicester 2025 on November 8th at De Montfort Students' Union. Experience epic anime and gaming activities including cosplay competitions, artist alley, retro gaming, TCG tournaments, and exclusive merchandise. Book your tickets now!",
      keywords: "aniarchive, anime con leicester 2025, anime convention leicester, gaming convention leicester, Leicester anime event, Leicester gaming convention, DMU anime event, cosplay competition UK, artist alley UK, retro gaming UK, TCG tournament UK, anime merchandise UK, november 8th 2025",
      canonical: "https://leicester.theaniarchive.com/",
      ogImage: "https://www.theaniarchive.com/images/08nov25.png",
      twitterImage: "https://www.theaniarchive.com/images/08nov25.png",
      structuredData: {
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          "name": "De Montfort Students' Union",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "De Montfort Students' Union, Campus Centre Building, Mill Ln, Leicester LE2 7DR",
            "addressLocality": "Leicester",
            "addressCountry": "GB"
          }
        }
      }
    },
    coventry: {
      title: "AniArchive Coventry | Premier Anime & Gaming Event | The Box Fargo Village",
      description: "Join AniArchive Coventry for an epic anime and gaming convention at The Box Fargo Village. Experience retro gaming, cosplay competitions, artist alley, TCG tournaments, and exclusive merchandise in the heart of Coventry.",
      keywords: "aniarchive coventry, anime convention coventry, gaming convention coventry, Coventry anime event, Coventry gaming convention, Midlands anime event, The Box Fargo Village, anime event Coventry, gaming event Coventry",
      canonical: "https://coventry.theaniarchive.com/",
      ogImage: "https://www.theaniarchive.com/images/aug2nd25.png",
      twitterImage: "https://www.theaniarchive.com/images/aug2nd25.png",
      structuredData: {
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          "name": "The Box at Fargo Village",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Far Gosford Street, Coventry, UK. CV1 5ED",
            "addressLocality": "Coventry",
            "addressCountry": "GB"
          }
        }
      }
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
    },
    wolverhampton: {
      title: "AniArchive Wolverhampton | Premier Anime & Gaming Event",
      description: "Join AniArchive Wolverhampton for an epic anime and gaming convention. Experience retro gaming, cosplay competitions, artist alley, TCG tournaments, and exclusive merchandise in Wolverhampton.",
      keywords: "aniarchive wolverhampton, anime convention wolverhampton, gaming convention wolverhampton, Wolverhampton anime event, Wolverhampton gaming convention, anime event Wolverhampton, gaming event Wolverhampton",
      canonical: "https://wolverhampton.theaniarchive.com/",
      ogImage: "https://www.theaniarchive.com/images/logo.png",
      twitterImage: "https://www.theaniarchive.com/images/logo.png"
    },
    stafford: {
      title: "Anime Con Stafford | Premier Anime & Gaming Event",
      description: "Join us inStafford for an epic anime and gaming convention. Experience retro gaming, cosplay competitions, artist alley, TCG tournaments, and exclusive merchandise in Stafford.",
      keywords: "aniarchive stafford, anime convention stafford, gaming convention stafford, Stafford anime event, Stafford gaming convention, anime event Stafford, gaming event Stafford",
      canonical: "https://stafford.theaniarchive.com/",
      ogImage: "https://www.theaniarchive.com/images/logo.png",
      twitterImage: "https://www.theaniarchive.com/images/logo.png"
    }
  }

  return seoConfigs[subdomain] || null
}

/**
 * Get canonical URL for current page
 * @param {string} path - Current path
 * @param {string} subdomain - Current subdomain
 * @returns {string} Canonical URL
 */
export const getCanonicalUrl = (path = '/', subdomain = null) => {
  const baseUrl = subdomain ? `https://${subdomain}.theaniarchive.com` : 'https://www.theaniarchive.com'
  return `${baseUrl}${path}`
}

/**
 * Get Open Graph image URL for current subdomain
 * @param {string} subdomain - Current subdomain
 * @returns {string} OG image URL
 */
export const getOGImageUrl = (subdomain = null) => {
  const seoConfig = getSubdomainSEOConfig(subdomain)
  return seoConfig ? seoConfig.ogImage : 'https://www.theaniarchive.com/images/logo.png'
}

/**
 * Get Twitter image URL for current subdomain
 * @param {string} subdomain - Current subdomain
 * @returns {string} Twitter image URL
 */
export const getTwitterImageUrl = (subdomain = null) => {
  const seoConfig = getSubdomainSEOConfig(subdomain)
  return seoConfig ? seoConfig.twitterImage : 'https://www.theaniarchive.com/images/logo.png'
}

/**
 * Check if subdomain is active (has upcoming events)
 * @param {string} subdomain - Subdomain to check
 * @returns {boolean} Whether subdomain is active
 */
export const isSubdomainActive = (subdomain) => {
  const activeSubdomains = ['leicester', 'wolverhampton'] // Add more as events become active
  return activeSubdomains.includes(subdomain)
}

/**
 * Get list of all active subdomains
 * @returns {Array} List of active subdomains
 */
export const getActiveSubdomains = () => {
  return ['leicester', 'wolverhampton'] // Add more as events become active
}

/**
 * Get subdomain-specific sitemap URL
 * @param {string} subdomain - Subdomain
 * @returns {string} Sitemap URL
 */
export const getSubdomainSitemapUrl = (subdomain) => {
  return `https://${subdomain}.theaniarchive.com/sitemap.xml`
}