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
    name: "The Box - Fargo Village",
    address: "Far Gosford Street , Coventry, UK. CV1 5ED",
    coordinates: {
      lat: 52.40783193692662,
      lng: -1.4939690475292444
    }
  },
  description:
   "Join us for our biggest event yet! Experience retro gaming, the latest merchandise, win Prizes, join giveaways, participate in cosplay Competitions, and much more.",
  highlights: [
    "Tabletop Gaming",
    "Trivia Competition", 
    "Cosplay Competition",
    "Artist Alley",
    "Retro Gaming Zone",
    "TCG Stalls",
    "Workshops",
    "Giveaways",
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