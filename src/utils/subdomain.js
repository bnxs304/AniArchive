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
    if (port === '3005') return 'leicester'
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
                 city === 'leicester' ? '3005' : '3000'
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
      { label: 'FAQs', href: '#faqs', ariaLabel: 'Frequently asked questions' },
      { label: 'About', href: '/about', ariaLabel: 'Learn more about AniArchive' }
    ]
  } else {
    // Main domain navigation
    return [
      { label: 'Get Involved', href: '#get-involved', ariaLabel: 'Get involved with AniArchive', hasDropdown: true },
      { label: 'FAQs', href: '#faqs', ariaLabel: 'Frequently asked questions' },
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
    { label: 'Vendor Booking', href: '#vendor-booking', ariaLabel: 'Book a vendor stall' },
    { label: 'Volunteers', href: '#volunteers', ariaLabel: 'Volunteer with us' },
    { label: 'Performers/Panelists', href: '#performers', ariaLabel: 'Apply to perform or speak' }
  ]
}
