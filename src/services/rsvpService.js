import { collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore'
import { db } from '../config/firebase'
import emailjs from '@emailjs/browser'

// Email validation function
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Check if raffle code already exists in database
const checkExistingRaffleCode = async (raffleCode) => {
  try {
    const q = query(collection(db, 'rsvps'), where('raffleCode', '==', raffleCode))
    const querySnapshot = await getDocs(q)
    return !querySnapshot.empty
  } catch (error) {
    console.error('Error checking existing raffle code:', error)
    throw error
  }
}

// Generate a unique raffle ticket code
export const generateRaffleCode = async () => {
  const maxAttempts = 100 // Prevent infinite loops
  let attempts = 0
  
  while (attempts < maxAttempts) {
    // Generate a random 4-digit number (1000-9999)
    const min = 1000
    const max = 9999
    const raffleCode = Math.floor(Math.random() * (max - min + 1)) + min
    
    // Check if this code already exists
    const exists = await checkExistingRaffleCode(raffleCode)
    
    if (!exists) {
      return raffleCode
    }
    
    attempts++
  }
  
  // If we've tried too many times, throw an error
  throw new Error('Unable to generate unique raffle code after maximum attempts')
}

// Check if email already exists in RSVP collection
export const checkExistingRSVP = async (email) => {
  try {
    const q = query(collection(db, 'rsvps'), where('email', '==', email))
    const querySnapshot = await getDocs(q)
    return !querySnapshot.empty
  } catch (error) {
    console.error('Error checking existing RSVP:', error)
    throw error
  }
}

// Add new RSVP to Firestore
export const addRSVP = async (email) => {
  try {
    const raffleCode = await generateRaffleCode()
    const rsvpData = {
      email: email,
      raffleCode: raffleCode.toString(),
      timestamp: Timestamp.fromDate(new Date()),
      eventTitle: 'AniArchive Coventry',
      eventDate: 'Saturday, 2nd August 2025'
    }
    
    const docRef = await addDoc(collection(db, 'rsvps'), rsvpData)
    return { success: true, raffleCode, docId: docRef.id }
  } catch (error) {
    console.error('Error adding RSVP:', error)
    throw error
  }
}

// Send confirmation email using EmailJS
export const sendConfirmationEmail = async (email, raffleCode, eventData = null) => {
  try {
    // Use default event data if not provided
    const defaultEventData = {
      event_title: 'AniArchive Coventry',
      event_date: 'Saturday, 2nd August 2025',
      event_time: '10:00 AM - 6:00 PM',
      venue_name: 'The Box at Fargo Village',
      venue_address: 'Far Gosford Street, Coventry, UK. CV1 5ED',
      event_highlights: 'Gaming tournaments, cosplay competitions, artist alley, and more!',
      social_instagram: 'https://www.instagram.com/theaniarchive',
      social_facebook: 'https://www.facebook.com/share/1X5nn3uunk/?mibextid=wwXIfr',
      ticket_link: '#'
    }

    const emailData = {
      to_email: email,
      raffle_code: raffleCode,
      ...(eventData || defaultEventData)
    }

    // Import the email template service
    const { sendRSVPConfirmationEmail } = await import('./emailTemplates')
    return await sendRSVPConfirmationEmail(emailData)
  } catch (error) {
    console.error('Error sending confirmation email:', error)
    
    // Fallback to mock email for development
    if (import.meta.env.DEV) {
      console.log(`Mock email sent to ${email} with raffle code: ${raffleCode}`)
      return { success: true, message: 'Mock email sent successfully' }
    }
    
    throw error
  }
}

// Get total RSVP count
export const getRSVPCount = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'rsvps'))
    return querySnapshot.size
  } catch (error) {
    console.error('Error getting RSVP count:', error)
    throw error
  }
}

// Get RSVP statistics for admin panel
export const getRSVPStats = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'rsvps'))
    const rsvps = querySnapshot.docs.map(doc => doc.data())
    
    const today = new Date()
    const todayRSVPs = rsvps.filter(rsvp => {
      const rsvpDate = rsvp.timestamp?.toDate?.() || new Date(rsvp.timestamp)
      return rsvpDate.toDateString() === today.toDateString()
    })
    
    const thisWeekRSVPs = rsvps.filter(rsvp => {
      const rsvpDate = rsvp.timestamp?.toDate?.() || new Date(rsvp.timestamp)
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
      return rsvpDate >= weekAgo
    })
    
    return {
      total: rsvps.length,
      today: todayRSVPs.length,
      thisWeek: thisWeekRSVPs.length
    }
  } catch (error) {
    console.error('Error getting RSVP stats:', error)
    throw error
  }
} 