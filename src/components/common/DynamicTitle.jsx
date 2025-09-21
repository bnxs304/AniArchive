import { useEffect } from 'react'
import { getCurrentSubdomain } from '../../utils/subdomain'
import { getCurrentEvent } from '../../data/eventData'

const DynamicTitle = () => {
  useEffect(() => {
    const currentSubdomain = getCurrentSubdomain()
    const eventData = getCurrentEvent(currentSubdomain)
    
    if (eventData) {
      // Update document title for event subdomain
      document.title = `${eventData.title} | ${eventData.date} | AniArchive - Premier Anime & Gaming Event`
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', 
          `Join ${eventData.title} on ${eventData.date} at ${eventData.venue.name}. Experience epic anime and gaming activities including cosplay competitions, artist alley, retro gaming, TCG tournaments, and exclusive merchandise. Book your tickets now!`
        )
      }
      
      // Update meta keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]')
      if (metaKeywords) {
        const cityKeywords = eventData.city === 'leicester' ? 'Leicester anime event, Leicester gaming convention, DMU anime event' : 
                           eventData.city === 'coventry' ? 'Coventry anime event, Coventry gaming convention, Midlands anime event' :
                           `${eventData.city} anime event, ${eventData.city} gaming convention`
        metaKeywords.setAttribute('content', 
          `aniarchive, ${eventData.title.toLowerCase()}, anime convention ${eventData.city}, gaming convention ${eventData.city}, ${cityKeywords}, cosplay competition UK, artist alley UK, retro gaming UK, TCG tournament UK, anime merchandise UK, ${eventData.date}`
        )
      }
      
      // Update Open Graph title
      const ogTitle = document.querySelector('meta[property="og:title"]')
      if (ogTitle) {
        ogTitle.setAttribute('content', `${eventData.title} | ${eventData.date} | AniArchive - Premier Anime & Gaming Event`)
      }
      
      // Update Open Graph description
      const ogDescription = document.querySelector('meta[property="og:description"]')
      if (ogDescription) {
        ogDescription.setAttribute('content', 
          `Join ${eventData.title} on ${eventData.date} at ${eventData.venue.name}. Experience epic anime and gaming activities including cosplay competitions, artist alley, retro gaming, TCG tournaments, and exclusive merchandise. Book your tickets now!`
        )
      }
      
      // Update Open Graph image
      const ogImage = document.querySelector('meta[property="og:image"]')
      if (ogImage && eventData.image) {
        const fullImageUrl = eventData.image.startsWith('http') ? eventData.image : `https://www.theaniarchive.com${eventData.image}`
        ogImage.setAttribute('content', fullImageUrl)
      }
      
      // Update Twitter Card title
      const twitterTitle = document.querySelector('meta[name="twitter:title"]')
      if (twitterTitle) {
        twitterTitle.setAttribute('content', `${eventData.title} | ${eventData.date} | AniArchive`)
      }
      
      // Update Twitter Card description
      const twitterDescription = document.querySelector('meta[name="twitter:description"]')
      if (twitterDescription) {
        twitterDescription.setAttribute('content', 
          `Join ${eventData.title} on ${eventData.date} at ${eventData.venue.name}. Experience epic anime and gaming activities including cosplay competitions, artist alley, retro gaming, TCG tournaments, and exclusive merchandise.`
        )
      }
      
      // Update Twitter Card image
      const twitterImage = document.querySelector('meta[name="twitter:image"]')
      if (twitterImage && eventData.image) {
        const fullImageUrl = eventData.image.startsWith('http') ? eventData.image : `https://www.theaniarchive.com${eventData.image}`
        twitterImage.setAttribute('content', fullImageUrl)
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
        const eventDate = new Date(eventData.date)
        const startTime = "10:00:00"
        const endTime = "18:00:00"
        
        const structuredData = {
          "@context": "https://schema.org",
          "@type": "Event",
          "name": eventData.title,
          "alternateName": ["AniArchive", "Ani Archive", `${eventData.city} Anime Event`],
          "description": eventData.description,
          "startDate": `${eventData.date}T${startTime}+00:00`,
          "endDate": `${eventData.date}T${endTime}+00:00`,
          "eventSchedule": {
            "@type": "Schedule",
            "startTime": `${eventData.date}T${startTime}+00:00`,
            "endTime": `${eventData.date}T${endTime}+00:00`
          },
          "location": {
            "@type": "Place",
            "name": eventData.venue.name,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": eventData.venue.address,
              "addressLocality": eventData.city.charAt(0).toUpperCase() + eventData.city.slice(1),
              "addressCountry": "GB"
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
            "url": "https://www.theaniarchive.com",
            "logo": "https://www.theaniarchive.com/images/logo.png",
            "sameAs": [
              "https://www.instagram.com/theaniarchive",
              "https://www.facebook.com/share/1X5nn3uunk/?mibextid=wwXIfr"
            ]
          },
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "price": "0",
            "priceCurrency": "GBP",
            "url": eventData.ticketLink || `https://${currentSubdomain}.theaniarchive.com/`,
            "validFrom": "2024-01-01",
            "validThrough": eventData.date
          },
          "eventStatus": "https://schema.org/EventScheduled",
          "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
          "category": ["Anime", "Gaming", "Cosplay", "Comics", "Anime Convention", "Gaming Convention", "Anime Event", "Tabletop Gaming", "TCG Tournament"],
          "keywords": `aniarchive, ${eventData.title.toLowerCase()}, anime convention ${eventData.city}, gaming convention ${eventData.city}, cosplay competition UK, artist alley UK, retro gaming UK, TCG tournament UK`,
          "image": eventData.image.startsWith('http') ? eventData.image : `https://www.theaniarchive.com${eventData.image}`,
          "url": currentSubdomain ? `https://${currentSubdomain}.theaniarchive.com/` : "https://www.theaniarchive.com",
          "performer": {
            "@type": "Organization",
            "name": "AniArchive Entertainment"
          },
          "audience": {
            "@type": "Audience",
            "audienceType": "Anime and Gaming Enthusiasts"
          },
          "isAccessibleForFree": true,
          "maximumAttendeeCapacity": 500
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
