import { useEffect } from 'react'
import { getCurrentSubdomain } from '../../utils/subdomain'
import { getCurrentEvent } from '../../data/eventData'

const DynamicTitle = () => {
  useEffect(() => {
    const currentSubdomain = getCurrentSubdomain()
    const eventData = getCurrentEvent(currentSubdomain)
    
    if (eventData) {
      // Update document title for event subdomain
      document.title = `${eventData.title} - Anime & Gaming Event | ${eventData.date}`
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', 
          `Join ${eventData.title} on ${eventData.date} at ${eventData.venue.name}. Experience retro gaming, anime themed trivia and challenges, the latest merchandise, win prizes, participate in cosplay competitions, and much more.`
        )
      }
      
      // Update Open Graph title
      const ogTitle = document.querySelector('meta[property="og:title"]')
      if (ogTitle) {
        ogTitle.setAttribute('content', `${eventData.title} - Anime & Gaming Event | ${eventData.date}`)
      }
      
      // Update Open Graph description
      const ogDescription = document.querySelector('meta[property="og:description"]')
      if (ogDescription) {
        ogDescription.setAttribute('content', 
          `Join ${eventData.title} on ${eventData.date} at ${eventData.venue.name}. Experience retro gaming, anime themed trivia and challenges, the latest merchandise, win prizes, participate in cosplay competitions, and much more.`
        )
      }
      
      // Update Open Graph image
      const ogImage = document.querySelector('meta[property="og:image"]')
      if (ogImage && eventData.image) {
        ogImage.setAttribute('content', eventData.image)
      }
      
      // Update canonical URL
      const canonical = document.querySelector('link[rel="canonical"]')
      if (canonical) {
        const subdomainUrl = currentSubdomain ? `https://${currentSubdomain}.theaniarchive.com/` : 'https://www.theaniarchive.com/'
        canonical.setAttribute('href', subdomainUrl)
      }
      
      // Update structured data
      const structuredDataScript = document.querySelector('script[type="application/ld+json"]')
      if (structuredDataScript) {
        const structuredData = {
          "@context": "https://schema.org",
          "@type": "Event",
          "name": eventData.title,
          "alternateName": "AniArchive, Ani Archive",
          "description": eventData.description,
          "startDate": `${eventData.date}T10:00:00+01:00`,
          "endDate": `${eventData.date}T18:00:00+01:00`,
          "location": {
            "@type": "Place",
            "name": eventData.venue.name,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": eventData.venue.address
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": eventData.venue.coordinates.lat,
              "longitude": eventData.venue.coordinates.lng
            }
          },
          "organizer": {
            "@type": "Organization",
            "name": "AniArchive",
            "url": "https://www.theaniarchive.com"
          },
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "price": "0",
            "priceCurrency": "GBP"
          },
          "eventStatus": "https://schema.org/EventScheduled",
          "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
          "category": ["Anime", "Gaming", "Cosplay", "Comics", "Anime Convention", "Gaming Convention", "Anime Event"],
          "keywords": "aniarchive, ani archive, anime event, anime convention, gaming convention, cosplay competition",
          "image": eventData.image,
          "url": currentSubdomain ? `https://${currentSubdomain}.theaniarchive.com/` : "https://www.theaniarchive.com"
        }
        
        structuredDataScript.textContent = JSON.stringify(structuredData)
      }
    } else {
      // Default title for main domain
      document.title = "AniArchive - Anime & Gaming Events"
      
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', 
          "AniArchive brings you the ultimate anime and gaming events across the UK. Join us for retro gaming, cosplay competitions, artist alley, TCG stalls, and amazing giveaways."
        )
      }
    }
  }, [])

  return null // This component doesn't render anything
}

export default DynamicTitle
