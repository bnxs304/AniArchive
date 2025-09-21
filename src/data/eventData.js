// Import event poster images
import aug2nd25Image from '../images/aug2nd25.png'
import feb26Image from '../images/26feb25.png'
import feb5Image from '../images/5feb25.png'
import dec11Image from '../images/11dec24.png'
import dec5Image from '../images/5dec24.png'
import feb28Image from '../images/28feb24.png'
import nov8th25Image from '../images/08Nov25.png'

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
}

// Event status management utilities
export const getEventStatus = (eventDate, eventTime) => {
  const now = new Date()
  const eventDateTime = new Date(`${eventDate} ${eventTime}`)
  const eventEndTime = new Date(eventDateTime.getTime() + (8 * 60 * 60 * 1000)) // 8 hours duration
  
  if (now < eventDateTime) {
    return 'upcoming'
  } else if (now >= eventDateTime && now <= eventEndTime) {
    return 'ongoing'
  } else {
    return 'past'
  }
}

export const getDaysUntilEvent = (eventDate) => {
  const now = new Date()
  const eventDateTime = new Date(eventDate)
  const diffTime = eventDateTime - now
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// Comprehensive event data structure
export const eventsData = {
  /*coventry: {
    id: 'coventry-aug-2025',
    city: 'coventry',
    title: "AniArchive Coventry",
    date: "2025-08-02",
    time: "10:00 AM - 6:00 PM",
    image: aug2nd25Image,
    status: getEventStatus("2025-08-02", "10:00 AM"),
    daysUntil: getDaysUntilEvent("2025-08-02"),
    venue: {
      name: "The Box at Fargo Village",
      address: "Far Gosford Street, Coventry, UK. CV1 5ED",
      coordinates: {
        lat: 52.40783193692662,
        lng: -1.4939690475292444
      },
      parking: [
        {
          name: "Far Gosford St. Car Park",
          address: "Far Gosford Street, CV1 5DT",
          info: `Spaces: 30\nUp to 1 hour: £0.60\n1 to 2 hours: £1.10\n2 to 3 hours: £2.20\nUp to 24 hours: £5.50\nTariffs apply every day except Christmas Day and New Year's Day.\nNo charge for Blue Badge Holders.\nNote: a section of this car park is designated as 'private' and is not available for public parking during office hours Monday - Friday. Parking here may result in a fine. Warning signs are clearly displayed.`,
          coordinates: { lat: 52.408119, lng: -1.494334 }
        },
        {
          name: "Paynes Lane (Fargo) Car Park",
          address: "Paynes Lane, CV1 5LN (Accessed via Oxford Street)",
          info: `Spaces: 90\nMon - Sunday 10am - 10pm\nCar parking is currently free of charge.\nPlease refer to site signage for current restrictions and T&C's. Visitors park at their own risk.`,
          coordinates: { lat: 52.409191, lng: -1.49305 }
        },
        {
          name: "Whitefriars Lane/Whitefriars Street",
          address: "Whitefriars Street, CV1 2DS",
          info: `On-Street Car Parking`,
          coordinates: { lat: 52.40610, lng: -1.50600 }
        },
        {
          name: "Grove St. Car Park",
          address: "Grove Street, CV1 5PH",
          info: `Spaces: 179 (Disabled Spaces: 5)\nUp to 1 Hour £2.20\nUp to 2 Hours £3.30\nUp to 3 Hours £4.40\nUp to 4 Hours £5.50\nUp to 5 Hours £6.60\nUp to 6 Hours £6.60\nUp to 7 Hours £7.70\nUp to 8 Hours £8.80\nUp to 9 Hours £8.80\nUp to 10 Hours £8.80\nUp to 12 Hours £8.80\nUp to 24 Hours £10.00\nCharges apply everyday except Christmas Day and New Year's Day. No Charges for Blue Badge Holders. Please refer to site signage for current restrictions and T&C's. Visitors park at their own risk.`,
          coordinates: { lat: 52.407291, lng: -1.502123 }
        }
      ]
    },
    description: "Join us for our biggest event yet! Experience retro gaming, anime themed trivia and challenges, the latest merchandise, win prizes, participate in cosplay competitions, and much more.",
    highlights: [
      "Tabletop Gaming",
      "Trivia Competition", 
      "Cosplay Competition",
      "Artist Alley",
      "Retro Gaming Zone",
      "TCG Stalls",
      "Live Art",
      "Giveaways",
      "Special Offers on Food and Drink",
      "Merchandise Market",
    ],
    announcements: [
      "Event Registration is now closed! Good luck to everyone who entered!",
      "Early bird tickets available until July 15th",
      "Cosplay competition registration opens June 1st",
      "Artist Alley applications closing soon"
    ],
    socialMedia: {
      instagram: "https://www.instagram.com/theaniarchive",
      facebook: "https://www.facebook.com/share/1X5nn3uunk/?mibextid=wwXIfr"
    },
    ticketLink: "https://eventbrite.com/aniarchive-coventry-2025",
    travelInfo: {
      fromLondon: "London Euston → Coventry Station (~1h via Avanti West Coast)",
      fromBirmingham: "Birmingham New Street → Coventry (20-30 min via West Midlands Railway)",
      fromManchester: "Manchester Piccadilly → Coventry Station (~1h via Virgin Trains)",
      localTransport: "🚶‍♂️ Walk (~20 min) or 🚌 Bus 1/11/21 to Far Gosford Street"
    }
  },*/
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
  }
}

// Past events data
export const pastEventsData = [
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
  return Object.values(eventsData).filter(event => event.status === 'upcoming')
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