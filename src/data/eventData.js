// Import event poster images
import aug2nd25Image from '../images/aug2nd25.png'
import feb26Image from '../images/26feb25.png'
import feb5Image from '../images/5feb25.png'
import dec11Image from '../images/11dec24.png'
import dec5Image from '../images/5dec24.png'
import feb28Image from '../images/28feb24.png'
import nov8th25Image from '../images/08Nov25.png'
import jan3rd26Image from '../images/03jan26.png'
import feb15th26Image from '../images/15feb26.jpeg'

// City-specific variables
export const cityVariables = {
  leicester: {
    name: 'Leicester',
    subdomain: 'leicester',
    coordinates: { lat: 52.6386, lng: -1.1380 },
    timezone: 'Europe/London',
    currency: 'GBP',
    language: 'en-GB'
  },
  wolverhampton: {
    name: 'Wolverhampton',
    subdomain: 'wolverhampton',
    coordinates: { lat: 52.5963, lng: -2.1337 },
    timezone: 'Europe/London',
    currency: 'GBP',
    language: 'en-GB'
  }
}

// Event status management utilities
export const getEventStatus = (eventDate, eventTime) => {
  const now = new Date()
  
  // Parse date more robustly for mobile compatibility
  let eventDateTime
  
  try {
    if (eventDate.includes('-')) {
      // Handle ISO format dates (YYYY-MM-DD)
      const timeStr = eventTime.replace(' AM', '').replace(' PM', '')
      eventDateTime = new Date(eventDate + 'T' + timeStr)
    } else if (eventDate.includes('Nov')) {
      // Handle "Sat. 8th Nov. 2025" format
      const parts = eventDate.split(' ')
      const day = parts[1].replace(/\D/g, '') // Extract day number
      const month = '11' // November
      const year = parts[3] // 2025
      const timeStr = eventTime.replace(' AM', '').replace(' PM', '')
      eventDateTime = new Date(`${year}-${month}-${day.padStart(2, '0')}T${timeStr}`)
    } else {
      // Handle other formats
      eventDateTime = new Date(`${eventDate} ${eventTime}`)
    }
    
    // Ensure we have a valid date
    if (isNaN(eventDateTime.getTime())) {
      console.warn('Invalid date format:', eventDate, eventTime)
      return 'past' // Default to past if date parsing fails
    }
  } catch (error) {
    console.warn('Date parsing error:', error, eventDate, eventTime)
    return 'past'
  }
  
  const eventEndTime = new Date(eventDateTime.getTime() + (8 * 60 * 60 * 1000)) // 8 hours duration
  
  console.log('Date comparison:', {
    now: now.toISOString(),
    eventDateTime: eventDateTime.toISOString(),
    eventEndTime: eventEndTime.toISOString(),
    nowTime: now.getTime(),
    eventTime: eventDateTime.getTime(),
    endTime: eventEndTime.getTime()
  })
  
  if (now < eventDateTime) {
    console.log('Event status: upcoming')
    return 'upcoming'
  } else if (now >= eventDateTime && now <= eventEndTime) {
    console.log('Event status: ongoing')
    return 'ongoing'
  } else {
    console.log('Event status: past')
    return 'past'
  }
}

export const getDaysUntilEvent = (eventDate) => {
  const now = new Date()
  
  // Parse date more robustly for mobile compatibility
  let eventDateTime
  
  try {
    if (eventDate.includes('-')) {
      // Handle ISO format dates (YYYY-MM-DD)
      eventDateTime = new Date(eventDate + 'T00:00:00')
    } else if (eventDate.includes('Nov')) {
      // Handle "Sat. 8th Nov. 2025" format
      const parts = eventDate.split(' ')
      const day = parts[1].replace(/\D/g, '') // Extract day number
      const month = '11' // November
      const year = parts[3] // 2025
      eventDateTime = new Date(`${year}-${month}-${day.padStart(2, '0')}T00:00:00`)
    } else {
      // Handle other formats
      eventDateTime = new Date(eventDate)
    }
    
    // Ensure we have a valid date
    if (isNaN(eventDateTime.getTime())) {
      console.warn('Invalid date format:', eventDate)
      return 0 // Default to 0 if date parsing fails
    }
  } catch (error) {
    console.warn('Date parsing error:', error, eventDate)
    return 0
  }
  
  const diffTime = eventDateTime - now
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// Comprehensive event data structure
export const eventsData = {
  /* example event data
  leicester: {
    id: 'leicester-nov-2025',
    city: 'leicester',
    title: 'Anime Con Leicester 2025',
    date: "Sat. 8th Nov. 2025",
    time: "10:00 AM - 5:30 PM",
    image: nov8th25Image,
    status: getEventStatus("2025-11-08", "10:00 AM"),
    daysUntil: getDaysUntilEvent("2025-11-08"),
    venue: {
      name: "De Montfort Students' Union",
      address: "De Montfort Students' Union, Campus Centre Building, Mill Ln, Leicester LE2 7DR",
      coordinates: {
        lat: 52.62983181222611,
        lng: -1.1384354536718413
      }
    },
    description: "Join us for an exciting anime convention at De Montfort University! Experience retro gaming, anime themed trivia and challenges, the latest merchandise, win prizes, participate in cosplay competitions, and much more.",
    highlights: [
      "Stage Show",
      "Cosplay Competition", 
      "Artist Alley",
      "Retro Gaming Zone",
      "Games and Prizes",
      "Merchandise Market",
    ],
    announcements: [
      "Tickets on sale now!",
      "Limted Vip Tickets available includes free gift!",
      "Vendor, Voulenteer and Guest applications available for this event!"
    ],
    socialMedia: {
      instagram: "https://www.instagram.com/theaniarchive",
      facebook: "https://www.facebook.com/share/1X5nn3uunk/?mibextid=wwXIfr"
    },
    ticketLink: "https://www.eventbrite.co.uk/e/anime-con-leicester-2025-tickets-1687755545269",
    travelInfo: {
      fromBirmingham: "Birmingham New Street → Leicester Station (~45 min via CrossCountry)",
      fromManchester: "Manchester Piccadilly → Leicester Station (~1h 30min via CrossCountry)",
      localTransport: "Walk (~15 min) or  Bus 22/26 to DMU campus"
    }
  }*/
  stafford: {
    id: '15-feb-2026',
    city: 'stafford',
    title: "Anime Con Stafford 2026",
    date: "Sun. 15th Feb. 2026",
    time: "10:30 AM - 5:30 PM",
    image: feb15th26Image,
    status: 'upcoming',
    highlights: ["Retro Gaming", "Merchandise Market","Cosplay Competition", "Prize Giveaways"],
    venue: {
      name: "SRFC Venue",
      address: "6 Marston Rd, Stafford ST16 3BS",
      coordinates: { lat: 52.819276066291856, lng: -2.1166545517279127}
    },
    timezone: 'Europe/London',
    currency: 'GBP',
    language: 'en-GB',
    description: "Join us for an exciting anime convention at Stafford! Experience retro gaming, anime themed trivia and challenges, the latest merchandise, win prizes, participate in the cosplay competition, and much more.",
    announcements: [
      "Tickets on sale now!",
      "Limited Vip Tickets available includes free gift!",
      "Vendor, Voulenteer and Guest applications available for this event!"
    ],
    socialMedia: {
      instagram: "https://www.instagram.com/theaniarchive",
      facebook: "https://www.facebook.com/share/1X5nn3uunk/?mibextid=wwXIfr"
    },
    ticketLink: "https://www.eventbrite.co.uk/e/stafford-anime-con-2026-tickets-1982108677411?aff=oddtdtcreator",
    travelInfo: {
      fromBirmingham: "Birmingham New Street → Stafford Station (~1h 10min via CrossCountry)",
      localTransport: "Walk (~20 min) from Stafford Town or  Bus/Drive (~5-10 min)"
    }
  }
}

// Past events data
export const pastEventsData = [
  {
    id: '3-jan-2026',
    city: 'wolverhampton',
    title: "AniArchive Wolverhampton 2026",
    date: "2026-01-03",
    image: jan3rd26Image,
    status: 'past',
    highlights: ["Retro Gaming", "Merchandise Market"]
  },
  {
      id: '8-nov-2025',
      city: 'leicester',
      title: "AniArchive Leicester 2025",
      date: "2025-11-08",
      image: nov8th25Image,
      status: 'past',
      highlights: ["Retro Gaming", "Merchandise Market"]
    },
  { id: '2-aug-2025',
    city: 'coventry',
    title: "AniArchive Coventry 2025",
    date: "2025-08-02",
    image: aug2nd25Image,
    status: 'past',
    highlights: ["Retro Gaming","Cosplay Competition", "Merchandise Market" ,"Prize Giveaways" , "Stage show"]
  },
  {
    id: '26-feb-2025',
    city: 'leicester',
    title: "DMU Campus Market 2025",
    date: "2025-02-26",
    image: feb26Image,
    status: 'past',
    highlights: ["Gaming", "Merchandise Market"]
  },
  {
    id: '5-feb-2025',
    city: 'leicester',
    title: "DMU Campus Market 2025",
    date: "2025-02-05",
    image: feb5Image,
    status: 'past',
    highlights: ["Retro Gaming", "Merchandise Market"]
  },
  {
    id: '11-dec-2024',
    city: 'leicester',
    title: "DMU Christmas Market 2024",
    date: "2024-12-11",
    image: dec11Image,
    status: 'past',
    highlights: ["Holiday Special", "Christmas Sales", ]
  },
  {
    id: '5-dec-2024',
    city: 'leicester',
    title: "Christmas Market Leicester 2024",
    date: "2024-12-05",
    image: dec5Image,
    status: 'past',
    highlights: ["Early Winter Event", "Merchandise Market"]
  },
  {
    id: '28-feb-2024',
    city: 'leicester',
    title: "Demontfort Market",
    date: "2024-02-28",
    image: feb28Image,
    status: 'past',
    highlights: ["Spring Launch", "New Merchandise", "Student Discounts"]
  }
]

// Subdomain mapping
export const subdomainMapping = {
  'leicester': 'leicester'
}

// Get current event based on subdomain
export const getCurrentEvent = (subdomain) => {
  if (subdomain && eventsData[subdomain]) {
    return eventsData[subdomain]
  }
  return null // blank if no event
}

// Get all upcoming events
export const getUpcomingEvents = () => {
  const upcomingEvents = Object.values(eventsData).filter(event => event.status === 'upcoming')
  console.log('Upcoming events:', upcomingEvents.length, upcomingEvents)
  return upcomingEvents
}

// Get all ongoing events
export const getOngoingEvents = () => {
  return Object.values(eventsData).filter(event => event.status === 'ongoing')
}

// Get all past events
export const getPastEvents = () => {
  return pastEventsData.filter(event => event.status === 'past')
}

// Legacy export for backward compatibility - defaults to Leicester event
export const eventData = eventsData.leicester