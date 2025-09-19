import emailjs from '@emailjs/browser'

// EmailJS configuration
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateIds: {
    eventReminder: import.meta.env.VITE_EMAILJS_REMINDER_TEMPLATE_ID,
    vendorApplication: import.meta.env.VITE_EMAILJS_VENDOR_TEMPLATE_ID,
  },
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}

// Email template parameters validation
const validateEmailParams = (params, requiredFields) => {
  const missingFields = requiredFields.filter(field => !params[field])
  if (missingFields.length > 0) {
    throw new Error(`Missing required email parameters: ${missingFields.join(', ')}`)
  }
}


// Event Reminder Email
export const sendEventReminderEmail = async (emailData) => {
  try {
    const requiredFields = ['to_email', 'event_title', 'event_date', 'event_time', 'venue_name', 'venue_address']
    validateEmailParams(emailData, requiredFields)

    if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateIds.eventReminder || !EMAILJS_CONFIG.publicKey) {
      console.warn('EmailJS configuration missing, falling back to mock email')
      console.log(`Mock event reminder email sent to ${emailData.to_email}`)
      return { success: true, message: 'Mock email sent successfully' }
    }

    const templateParams = {
      to_email: emailData.to_email,
      event_title: emailData.event_title,
      event_date: emailData.event_date,
      event_time: emailData.event_time,
      venue_name: emailData.venue_name,
      venue_address: emailData.venue_address,
      event_highlights: emailData.event_highlights || 'Gaming tournaments, cosplay competitions, artist alley, and more!',
      announcements: emailData.announcements || 'Don\'t forget to bring your cosplay and gaming gear!',
      social_instagram: emailData.social_instagram || 'https://www.instagram.com/theaniarchive',
      social_facebook: emailData.social_facebook || 'https://www.facebook.com/share/1X5nn3uunk/?mibextid=wwXIfr',
      ticket_link: emailData.ticket_link || '#',
      map_link: emailData.map_link || '#',
    }

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateIds.eventReminder,
      templateParams,
      EMAILJS_CONFIG.publicKey
    )

    if (response.status === 200) {
      console.log('Event reminder email sent successfully:', response)
      return { success: true, message: 'Event reminder email sent successfully' }
    } else {
      throw new Error('Email service returned non-200 status')
    }
  } catch (error) {
    console.error('Error sending event reminder email:', error)
    
    // Fallback to mock email for development
    if (import.meta.env.DEV) {
      console.log(`Mock event reminder email sent to ${emailData.to_email}`)
      return { success: true, message: 'Mock email sent successfully' }
    }
    
    throw error
  }
}

// Vendor Application Confirmation Email
export const sendVendorApplicationEmail = async (emailData) => {
  try {
    const requiredFields = ['to_email', 'vendor_name', 'business_name', 'event_title', 'event_date']
    validateEmailParams(emailData, requiredFields)

    if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateIds.vendorApplication || !EMAILJS_CONFIG.publicKey) {
      console.warn('EmailJS configuration missing, falling back to mock email')
      console.log(`Mock vendor application email sent to ${emailData.to_email}`)
      return { success: true, message: 'Mock email sent successfully' }
    }

    const templateParams = {
      to_email: emailData.to_email,
      vendor_name: emailData.vendor_name,
      business_name: emailData.business_name,
      event_title: emailData.event_title,
      event_date: emailData.event_date,
      event_time: emailData.event_time || '10:00 AM - 6:00 PM',
      venue_name: emailData.venue_name || 'The Box at Fargo Village',
      venue_address: emailData.venue_address || 'Far Gosford Street, Coventry, UK. CV1 5ED',
      application_id: emailData.application_id || 'APP-' + Date.now(),
      next_steps: emailData.next_steps || 'We will review your application and get back to you within 5-7 business days.',
      contact_email: emailData.contact_email || 'info@aniarchive.com',
      social_instagram: emailData.social_instagram || 'https://www.instagram.com/theaniarchive',
      social_facebook: emailData.social_facebook || 'https://www.facebook.com/share/1X5nn3uunk/?mibextid=wwXIfr',
    }

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateIds.vendorApplication,
      templateParams,
      EMAILJS_CONFIG.publicKey
    )

    if (response.status === 200) {
      console.log('Vendor application email sent successfully:', response)
      return { success: true, message: 'Vendor application email sent successfully' }
    } else {
      throw new Error('Email service returned non-200 status')
    }
  } catch (error) {
    console.error('Error sending vendor application email:', error)
    
    // Fallback to mock email for development
    if (import.meta.env.DEV) {
      console.log(`Mock vendor application email sent to ${emailData.to_email}`)
      return { success: true, message: 'Mock email sent successfully' }
    }
    
    throw error
  }
}

// Bulk email sending for event reminders
export const sendBulkEventReminders = async (recipients, eventData) => {
  try {
    const results = []
    
    for (const recipient of recipients) {
      try {
        const emailData = {
          to_email: recipient.email,
          ...eventData
        }
        
        const result = await sendEventReminderEmail(emailData)
        results.push({ email: recipient.email, success: true, result })
        
        // Add delay between emails to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error) {
        console.error(`Failed to send reminder to ${recipient.email}:`, error)
        results.push({ email: recipient.email, success: false, error: error.message })
      }
    }
    
    const successCount = results.filter(r => r.success).length
    const failureCount = results.filter(r => !r.success).length
    
    return {
      success: true,
      message: `Bulk email sending completed. ${successCount} successful, ${failureCount} failed.`,
      results,
      summary: {
        total: recipients.length,
        successful: successCount,
        failed: failureCount
      }
    }
  } catch (error) {
    console.error('Error in bulk email sending:', error)
    throw error
  }
}

// Email template preview (for development)
export const previewEmailTemplate = (templateType, sampleData) => {
  const templates = {
    eventReminder: {
      subject: `⏰ Reminder: ${sampleData.event_title} is Tomorrow!`,
      html: `
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%); padding: 20px; border-radius: 15px;">
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
            <h1 style="color: #FF6B6B; text-align: center; margin-bottom: 20px;">⏰ Event Tomorrow!</h1>
            <p style="font-size: 18px; color: #333; text-align: center; margin-bottom: 30px;"><strong>${sampleData.event_title}</strong> is happening tomorrow!</p>
            
            <div style="background: #fff3cd; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #ffc107;">
              <h3 style="color: #856404; margin-bottom: 15px;">📢 Last Minute Announcements</h3>
              <p style="color: #856404;">${sampleData.announcements}</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="color: #FF6B6B; margin-bottom: 15px;">📋 Event Details</h3>
              <p><strong>📅 Date:</strong> ${sampleData.event_date}</p>
              <p><strong>⏰ Time:</strong> ${sampleData.event_time}</p>
              <p><strong>📍 Venue:</strong> ${sampleData.venue_name}</p>
              <p><strong>🏠 Address:</strong> ${sampleData.venue_address}</p>
            </div>
            
            <div style="margin: 30px 0;">
              <h3 style="color: #FF6B6B; margin-bottom: 15px;">🌟 What to Expect</h3>
              <p style="color: #666; line-height: 1.6;">${sampleData.event_highlights}</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${sampleData.ticket_link}" style="background: linear-gradient(135deg, #4CAF50, #66BB6A); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; margin: 0 10px;">🎫 Get Tickets</a>
              <a href="${sampleData.map_link}" style="background: linear-gradient(135deg, #2196F3, #42A5F5); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; margin: 0 10px;">🗺️ View Map</a>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #666; margin-bottom: 15px;">Follow us for updates:</p>
              <a href="${sampleData.social_instagram}" style="margin: 0 10px; color: #E4405F;">📸 Instagram</a>
              <a href="${sampleData.social_facebook}" style="margin: 0 10px; color: #1877F2;">📘 Facebook</a>
            </div>
            
            <p style="text-align: center; color: #999; font-size: 14px; margin-top: 30px;">Can't wait to see you there! 🎌</p>
          </div>
        </div>
      `
    },
    vendorApplication: {
      subject: `✅ Vendor Application Received for ${sampleData.event_title}`,
      html: `
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%); padding: 20px; border-radius: 15px;">
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
            <h1 style="color: #4CAF50; text-align: center; margin-bottom: 20px;">✅ Application Received!</h1>
            <p style="font-size: 18px; color: #333; text-align: center; margin-bottom: 30px;">Thank you for applying to be a vendor at <strong>${sampleData.event_title}</strong>!</p>
            
            <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="color: #4CAF50; margin-bottom: 15px;">📋 Application Details</h3>
              <p><strong>👤 Vendor:</strong> ${sampleData.vendor_name}</p>
              <p><strong>🏢 Business:</strong> ${sampleData.business_name}</p>
              <p><strong>📅 Event:</strong> ${sampleData.event_title}</p>
              <p><strong>📅 Date:</strong> ${sampleData.event_date}</p>
              <p><strong>🆔 Application ID:</strong> ${sampleData.application_id}</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="color: #4CAF50; margin-bottom: 15px;">📋 Event Details</h3>
              <p><strong>⏰ Time:</strong> ${sampleData.event_time}</p>
              <p><strong>📍 Venue:</strong> ${sampleData.venue_name}</p>
              <p><strong>🏠 Address:</strong> ${sampleData.venue_address}</p>
            </div>
            
            <div style="background: #fff3cd; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #ffc107;">
              <h3 style="color: #856404; margin-bottom: 15px;">⏭️ Next Steps</h3>
              <p style="color: #856404;">${sampleData.next_steps}</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #666; margin-bottom: 15px;">Questions? Contact us:</p>
              <a href="mailto:${sampleData.contact_email}" style="background: linear-gradient(135deg, #4CAF50, #66BB6A); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">📧 Contact Us</a>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #666; margin-bottom: 15px;">Follow us for updates:</p>
              <a href="${sampleData.social_instagram}" style="margin: 0 10px; color: #E4405F;">📸 Instagram</a>
              <a href="${sampleData.social_facebook}" style="margin: 0 10px; color: #1877F2;">📘 Facebook</a>
            </div>
            
            <p style="text-align: center; color: #999; font-size: 14px; margin-top: 30px;">Thank you for your interest in AniArchive! 🎌</p>
          </div>
        </div>
      `
    }
  }
  
  return templates[templateType] || null
}
