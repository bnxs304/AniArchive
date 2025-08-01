// Import event poster images
import aug2nd25Image from '../images/aug2nd25.png'
import feb26Image from '../images/26feb25.png'
import feb5Image from '../images/5feb25.png'
import dec11Image from '../images/11dec24.png'
import dec5Image from '../images/5dec24.png'
import feb28Image from '../images/28feb24.png'

export const eventData = {
  title: "AniArchive Coventry",
  date: "Saturday, 2nd August 2025",
  time: "10:00 AM - 6:00 PM",
  image: aug2nd25Image,
  venue: {
    name: "The Box at Fargo Village",
    address: "Far Gosford Street , Coventry, UK. CV1 5ED",
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
        info: `On-Street Car Parking` ,
        coordinates: { lat: 52.40610, lng: -1.50600 }
      },
      {
        name: "Grove St. Car Park",
        address: "Grove Street, CV1 5PH",
        info: `Spaces: 179 (Disabled Spaces: 5)\nUp to 1 Hour £2.20\nUp to 2 Hours £3.30\nUp to 3 Hours £4.40\nUp to 4 Hours £5.50\nUp to 5 Hours £6.60\nUp to 6 Hours £6.60\nUp to 7 Hours £7.70\nUp to 8 Hours £8.80\nUp to 9 Hours £8.80\nUp to 10 Hours £8.80\nUp to 12 Hours £8.80\nUp to 24 Hours £10.00\nCharges apply everyday except Christmas Day and New Year's Day. No Charges for Blue Badge Holders. Please refer to site signage for current restrictions and T&C's. Visitors park at their own risk.`,
        coordinates: { lat:52.407291, lng: -1.502123}
      }
    ]
  },
  description:
   "Join us for our biggest event yet! Experience retro gaming, anime themed trivia and challenges, the latest merchandise, win prizes, participate in cosplay competitions, and much more.",
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

  socialMedia: {
    instagram: "https://www.instagram.com/theaniarchive",
    facebook: "https://www.facebook.com/share/1X5nn3uunk/?mibextid=wwXIfr"
  },
  pastEvents: [
    {
      title: "AniArchive 2025",
      image: feb26Image
    },
    {
      title: "AniArchive 2025",
      image: feb5Image
    },
    {
      title: "AniArchive 2024",
      image: dec11Image
    },
    {
      title: "AniArchive 2024",
      image: dec5Image
    },
    {
      title: "AniArchive 2024",
      image: feb28Image
    }
  ]
} 