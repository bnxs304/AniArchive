// import jsPDF from 'jspdf'; // Temporarily disabled due to Vite loading issues

// Web3Forms Configuration

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'your_web3forms_access_key';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

// Email validation function
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// PDF Generation Functions (Temporarily disabled)
const generateVolunteerPDF = (formData) => {
    // PDF generation temporarily disabled due to jsPDF loading issues
    // Will be re-enabled once Vite module loading is resolved
    console.log('PDF generation temporarily disabled for volunteer application:', formData);
    return null;
};

const generateVendorPDF = (formData) => {
    // PDF generation temporarily disabled due to jsPDF loading issues
    console.log('PDF generation temporarily disabled for vendor application:', formData);
    return null;
};

const generateGuestPDF = (formData) => {
    // PDF generation temporarily disabled due to jsPDF loading issues
    console.log('PDF generation temporarily disabled for guest application:', formData);
    return null;
};

// Generic form submission function using Web3Forms
export const submitForm = async (formData, pdfDataUri = null, pdfFilename = null) => {
    // Check if Web3Forms is properly configured
    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === 'your_web3forms_access_key') {
        console.warn('Web3Forms not configured. Using mock email for development.');
        console.log('Mock email sent with params:', formData);
        return { success: true, message: 'Mock email sent successfully (Web3Forms not configured)' };
    }

    try {
        // Prepare form data for Web3Forms
        const formDataToSend = new FormData();
        
        // Add access key
        formDataToSend.append('access_key', WEB3FORMS_ACCESS_KEY);
        
        // Add form data
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null && formData[key] !== undefined) {
                formDataToSend.append(key, formData[key]);
            }
        });
        
        // Add PDF attachment if provided
        if (pdfDataUri && pdfFilename) {
            // Convert data URI to blob
            const response = await fetch(pdfDataUri);
            const blob = await response.blob();
            formDataToSend.append('attachment', blob, pdfFilename);
        }
        
        // Submit to Web3Forms
        const result = await fetch(WEB3FORMS_ENDPOINT, {
            method: 'POST',
            body: formDataToSend
        });
        
        const response = await result.json();
        
        if (response.success) {
            console.log('Form submitted successfully:', response);
            return { success: true, message: 'Form submitted successfully!' };
        } else {
            console.error('Form submission failed:', response);
            return { 
                success: false, 
                message: response.message || 'There was an error submitting your form. Please try again.' 
            };
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        
        // Fallback for development
        if (import.meta.env.DEV) {
            console.log('Mock email sent with params:', formData);
            return { success: true, message: 'Mock email sent successfully' };
        }
        
        return { 
            success: false, 
            message: 'There was an error submitting your form. Please try again.' 
        };
    }
};

// Volunteer application submission
export const submitVolunteerApplication = async (formData) => {
    // Generate PDF (temporarily disabled)
    const pdfDataUri = generateVolunteerPDF(formData);
    const pdfFilename = pdfDataUri ? `volunteer_application_${formData.volunteerName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf` : null;
    
    const formDataToSend = {
        subject: 'New Volunteer Application - AniArchive',
        name: formData.volunteerName,
        email: formData.email,
        phone: formData.phoneNumber,
        'Work Experience': formData.workExperience,
        'Volunteer Description': formData.volunteerDescription,
        'Why Volunteer': formData.whyVolunteer,
        'Availability': formData.availability.join(', '),
        'Special Requirements': formData.specialRequirements || 'None',
        'Over 18': formData.over18 ? 'Yes' : 'No',
        'Submission Type': 'Volunteer Application',
        'Submission Date': new Date().toLocaleDateString(),
        'Submission Time': new Date().toLocaleTimeString(),
        'Form Type': 'Volunteer Application'
    };
    
    return await submitForm(formDataToSend, pdfDataUri, pdfFilename);
};

// Vendor application submission
export const submitVendorApplication = async (formData) => {
    // Generate PDF (temporarily disabled)
    const pdfDataUri = generateVendorPDF(formData);
    const pdfFilename = pdfDataUri ? `vendor_application_${formData.businessName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf` : null;
    
    const formDataToSend = {
        subject: 'New Vendor Application - AniArchive',
        'Business Name': formData.businessName,
        'Primary Contact': formData.primaryContact,
        email: formData.email,
        phone: formData.phoneNumber,
        'Website/Socials': formData.websiteSocials,
        'Event Name & Date': formData.eventNameDate,
        'Product/Service Type': formData.productServiceType.join(', '),
        'Product/Service Description': formData.productServiceDescription,
        'Special Requirements': formData.specialRequirements || 'None',
        'Submission Type': 'Vendor Application',
        'Submission Date': new Date().toLocaleDateString(),
        'Submission Time': new Date().toLocaleTimeString(),
        'Form Type': 'Vendor Application'
    };
    
    return await submitForm(formDataToSend, pdfDataUri, pdfFilename);
};

// Guest application submission
export const submitGuestApplication = async (formData) => {
    // Generate PDF (temporarily disabled)
    const pdfDataUri = generateGuestPDF(formData);
    const pdfFilename = pdfDataUri ? `guest_application_${formData.guestName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf` : null;
    
    const formDataToSend = {
        subject: 'New Guest Application - AniArchive',
        'Guest/Group Name': formData.guestName,
        'Primary Contact': formData.primaryContact,
        email: formData.email,
        phone: formData.phoneNumber,
        'Website/Socials': formData.websiteSocials,
        'Charges Fee': formData.chargesFee ? 'Yes' : 'No',
        'Fee Details': formData.chargesFee ? (formData.feeDetails || 'No details provided') : 'N/A',
        'Guest Type': formData.guestType.join(', '),
        'Guest Description': formData.guestDescription,
        'Guest Availability': formData.guestAvailability.join(', '),
        'Special Requirements': formData.specialRequirements || 'None',
        'Submission Type': 'Guest Application',
        'Submission Date': new Date().toLocaleDateString(),
        'Submission Time': new Date().toLocaleTimeString(),
        'Form Type': 'Guest Application'
    };
    
    return await submitForm(formDataToSend, pdfDataUri, pdfFilename);
};

// Contact form submission (if needed)
export const submitContactForm = async (formData) => {
    const formDataToSend = {
        subject: formData.subject || 'New Contact Form Submission - AniArchive',
        name: formData.name,
        email: formData.email,
        message: formData.message,
        'Submission Type': 'Contact Form',
        'Submission Date': new Date().toLocaleDateString(),
        'Submission Time': new Date().toLocaleTimeString(),
        'Form Type': 'Contact Form'
    };
    
    return await submitForm(formDataToSend);
};

// Form validation utilities
export const validateVolunteerForm = (formData) => {
    const errors = {};
    
    if (!formData.volunteerName?.trim()) errors.volunteerName = 'Name is required';
    if (!formData.email?.trim()) errors.email = 'Email is required';
    else if (!validateEmail(formData.email)) errors.email = 'Invalid email format';
    if (!formData.phoneNumber?.trim()) errors.phoneNumber = 'Phone number is required';
    if (!formData.workExperience?.trim()) errors.workExperience = 'Work experience is required';
    if (!formData.whyVolunteer?.trim()) errors.whyVolunteer = 'Please explain why you want to volunteer';
    if (!formData.availability?.length) errors.availability = 'Please select at least one availability option';
    if (!formData.over18) errors.over18 = 'You must be over 18 to volunteer';
    
    return errors;
};

export const validateVendorForm = (formData) => {
    const errors = {};
    
    if (!formData.businessName?.trim()) errors.businessName = 'Business name is required';
    if (!formData.primaryContact?.trim()) errors.primaryContact = 'Primary contact is required';
    if (!formData.email?.trim()) errors.email = 'Email is required';
    else if (!validateEmail(formData.email)) errors.email = 'Invalid email format';
    if (!formData.phoneNumber?.trim()) errors.phoneNumber = 'Phone number is required';
    if (!formData.eventNameDate?.trim()) errors.eventNameDate = 'Event name and date is required';
    if (!formData.productServiceType?.length) errors.productServiceType = 'Please select at least one product/service type';
    if (!formData.productServiceDescription?.trim()) errors.productServiceDescription = 'Product/service description is required';
    
    return errors;
};

export const validateGuestForm = (formData) => {
    const errors = {};
    
    if (!formData.guestName?.trim()) errors.guestName = 'Guest name/group name is required';
    if (!formData.primaryContact?.trim()) errors.primaryContact = 'Primary contact is required';
    if (!formData.email?.trim()) errors.email = 'Email is required';
    else if (!validateEmail(formData.email)) errors.email = 'Invalid email format';
    if (!formData.phoneNumber?.trim()) errors.phoneNumber = 'Phone number is required';
    if (!formData.websiteSocials?.trim()) errors.websiteSocials = 'Website/socials are required';
    if (!formData.guestType?.length) errors.guestType = 'Please select at least one guest type';
    if (!formData.guestDescription?.trim()) errors.guestDescription = 'Guest description is required';
    if (!formData.guestAvailability?.length) errors.guestAvailability = 'Please select at least one availability option';
    
    // Validate fee details if they charge a fee
    if (formData.chargesFee && !formData.feeDetails?.trim()) {
        errors.feeDetails = 'Please provide details about your fee structure';
    }
    
    return errors;
};

// Email template configurations (for reference)
export const emailTemplates = {
    volunteer: {
        id: 'template_volunteer',
        name: 'Volunteer Application',
        fields: [
            'to_email', 'from_name', 'from_email', 'phone_number',
            'work_experience', 'volunteer_description', 'why_volunteer',
            'availability', 'special_requirements', 'over_18',
            'submission_type', 'submission_date', 'submission_time'
        ]
    },
    vendor: {
        id: 'template_vendor',
        name: 'Vendor Application',
        fields: [
            'to_email', 'business_name', 'primary_contact', 'from_email',
            'phone_number', 'website_socials', 'event_name_date',
            'product_service_type', 'product_service_description',
            'special_requirements', 'submission_type', 'submission_date', 'submission_time'
        ]
    },
    guest: {
        id: 'template_guest',
        name: 'Guest Application',
        fields: [
            'to_email', 'guest_name', 'primary_contact', 'from_email',
            'phone_number', 'website_socials', 'charges_fee', 'fee_details', 'guest_type',
            'guest_description', 'guest_availability', 'special_requirements',
            'submission_type', 'submission_date', 'submission_time'
        ]
    },
    contact: {
        id: 'template_contact',
        name: 'Contact Form',
        fields: [
            'to_email', 'from_name', 'from_email', 'subject',
            'message', 'submission_type', 'submission_date', 'submission_time'
        ]
    }
};

export default {
    submitVolunteerApplication,
    submitVendorApplication,
    submitGuestApplication,
    submitContactForm,
    validateVolunteerForm,
    validateVendorForm,
    validateGuestForm,
    validateEmail,
    emailTemplates
};
