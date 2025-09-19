import React, { useState } from 'react';
import { 
    Box, 
    Typography, 
    Container, 
    Accordion, 
    AccordionSummary, 
    AccordionDetails,
    useTheme,
    useMediaQuery,
    Paper
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const FAQSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const faqs = [
        {
            question: "What is AniArchive?",
            answer: "AniArchive (also known as The Anime Archive) is the ultimate free anime and gaming convention in the UK. We host regular anime events featuring cosplay competitions, retro gaming, artist alley, TCG tournaments, and amazing giveaways. Our anime convention brings together fans from across the Midlands and beyond."
        },
        {
            question: "When is the next AniArchive event?",
            answer: "Our next major anime event is scheduled for Saturday, 2nd August 2025 at The Box - Fargo Village in Coventry. We also host regular monthly anime meetups around the UK starting in 2026. Check our website for the latest event updates and anime convention schedule."
        },
        {
            question: "How much do AniArchive events cost?",
            answer: "AniArchive events are completely FREE to attend! We believe that anime conventions should be accessible to everyone. Our anime events include all activities, gaming tournaments, and giveaways at no cost. Just bring your enthusiasm for anime and gaming!"
        },
        {
            question: "What can I expect at an AniArchive anime convention?",
            answer: "At our anime convention, you'll experience retro gaming stations, cosplay competitions, artist alley with unique merchandise, TCG tournaments, workshops, and amazing giveaways. Our anime events feature the best in anime culture with activities for all ages and skill levels."
        },
        {
            question: "Where are AniArchive events held?",
            answer: "Our main anime convention is held at The Box - Fargo Village in Coventry, West Midlands. We're based in the Midlands area and host regular anime events throughout the region. If you'd like to host an AniArchive event in your area, please contact us!"
        },
        {
            question: "Can I participate in cosplay competitions at AniArchive?",
            answer: "Absolutely! Cosplay competitions are a highlight of our anime convention. Whether you're a beginner or experienced cosplayer, everyone is welcome to participate. Our anime events celebrate creativity and passion for anime culture."
        },
        {
            question: "What gaming activities are available at AniArchive events?",
            answer: "Our anime convention features retro gaming stations, TCG tournaments, and various gaming activities. From classic arcade games to modern tabletop gaming, there's something for every gaming enthusiast at our anime events."
        },
        {
            question: "How can I stay updated about AniArchive events?",
            answer: "Follow us on social media (@theaniarchive) for the latest updates about our anime convention and events. You can also register for our events through our website to receive notifications about upcoming anime events and special announcements."
        },
        {
            question: "How do I get to the venue?",
            answer: "The Box - Fargo Village is easily accessible by public transport and car. Coventry train station is just a 20-minute walk away, and there are several car parks nearby including Far Gosford St. Car Park and Paynes Lane Car Park. Check our travel info section for detailed directions and parking options."
        },
        {
            question: "What should I bring to the event?",
            answer: "Bring your enthusiasm for anime and gaming! We recommend bringing cash for vendor purchases, a camera for photos, comfortable shoes for walking around, and any cosplay accessories you might need. Food and drinks are available at the venue, but you're welcome to bring your own."
        },
        {
            question: "Are there age restrictions for AniArchive events?",
            answer: "AniArchive events are family-friendly and welcome attendees of all ages! Children under 16 must be accompanied by an adult. Some activities like gaming tournaments may have age restrictions, but most events are suitable for everyone."
        },
        {
            question: "Can I bring my own food and drinks?",
            answer: "Yes, you're welcome to bring your own food and drinks to our events. However, we also have food vendors and refreshments available on-site. Please be mindful of the venue and dispose of any waste properly."
        },
        {
            question: "How can I become a vendor at AniArchive?",
            answer: "We welcome vendors offering anime merchandise, manga, art prints, cosplay accessories, gaming products, and more! Visit our 'Become a Vendor' page to fill out an application form. We'll review your application and get back to you with details about booth availability and pricing."
        },
        {
            question: "How can I volunteer at AniArchive events?",
            answer: "We're always looking for enthusiastic volunteers to help make our events amazing! Volunteers get free entry to the event and valuable experience in event management. Visit our 'Become a Volunteer' page to apply. You must be over 18 and available for assigned shift times."
        },
        {
            question: "Can I apply to be a guest/performer at AniArchive?",
            answer: "Absolutely! We welcome voice actors, artists, cosplayers, content creators, and industry professionals as guests. Visit our 'Become a Guest' page to submit an application. We'll review your submission and contact you about opportunities to participate in panels, workshops, or performances."
        },
        {
            question: "What COVID-19 safety measures are in place?",
            answer: "We follow current government guidelines and venue requirements for health and safety. This may include hand sanitizing stations, ventilation, and any other measures recommended by health authorities. We'll update attendees about specific requirements closer to each event."
        },
        {
            question: "Is there parking available at the venue?",
            answer: "Yes! There are several parking options near The Box - Fargo Village including Far Gosford St. Car Park (30 spaces), Paynes Lane Car Park (90 spaces, currently free), and on-street parking on Whitefriars Street. Check our venue page for detailed parking information and rates."
        },
        {
            question: "What happens if the event is cancelled or postponed?",
            answer: "In the unlikely event of cancellation or postponement due to circumstances beyond our control, we'll notify all registered attendees via email and social media. We'll work to reschedule the event and honor all registrations for the new date."
        },
        {
            question: "Can I take photos and videos at the event?",
            answer: "Yes, photography and videography are welcome for personal use! However, please be respectful of other attendees and ask permission before taking photos of cosplayers or other guests. Commercial photography requires prior permission from event organizers."
        },
        {
            question: "Are there any prohibited items at AniArchive events?",
            answer: "For everyone's safety, we prohibit weapons (real or replica), alcohol, illegal substances, and any items that could be dangerous or disruptive. Cosplay props must be clearly fake and safe. Security reserves the right to inspect bags and items at entry."
        }
    ];

    return (
        <Box sx={{ 
            py: { xs: 6, md: 10 },
            background: 'transparent',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background decorative elements */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                opacity: 0.3
            }} />
            
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                {/* Hero Title Section */}
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography 
                        variant="h1" 
                        component="h1"
                        sx={{ 
                            color: 'white',
                            fontWeight: 900,
                            mb: 2,
                            fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem', lg: '4.5rem' },
                            lineHeight: 1.1,
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                            background: 'linear-gradient(45deg, #ffffff 30%, #f0f0f0 90%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        Frequently Asked Questions
                    </Typography>
                    
                    <Typography 
                        variant="h2" 
                        sx={{ 
                            color: 'rgba(255,255,255,0.95)',
                            mb: 3,
                            fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem', lg: '2rem' },
                            fontWeight: 300,
                            lineHeight: 1.4,
                            textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                        }}
                    >
                        Everything you need to know about AniArchive anime events and conventions
                    </Typography>

                    {/* Decorative line */}
                    <Box sx={{ 
                        width: { xs: '60px', md: '80px' }, 
                        height: '4px', 
                        background: 'linear-gradient(90deg, #ff6b6b, #feca57)',
                        borderRadius: '2px',
                        mx: 'auto',
                        mb: 4
                    }} />
                </Box>

                {/* FAQ Content */}
                <Paper sx={{ 
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    p: { xs: 3, md: 4 },
                    border: '1px solid rgba(255,255,255,0.2)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}>
                    {faqs.map((faq, index) => (
                        <Accordion 
                            key={index}
                            expanded={expanded === `panel${index}`}
                            onChange={handleChange(`panel${index}`)}
                            sx={{
                                background: 'rgba(255,255,255,0.1)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                mb: 2,
                                '&:before': {
                                    display: 'none',
                                },
                                '&:hover': {
                                    background: 'rgba(255,255,255,0.15)',
                                }
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                                sx={{
                                    '& .MuiAccordionSummary-content': {
                                        margin: '16px 0',
                                    }
                                }}
                            >
                                <Typography 
                                    variant="h6" 
                                    sx={{ 
                                        color: 'white',
                                        fontSize: { xs: '1.1rem', md: '1.2rem' },
                                        fontWeight: 600,
                                        textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    {faq.question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        color: 'rgba(255,255,255,0.9)',
                                        fontSize: { xs: '1rem', md: '1.1rem' },
                                        lineHeight: 1.7,
                                        fontWeight: 400,
                                        textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    {faq.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Paper>

                {/* Call to Action */}
                <Box sx={{ mt: 6, textAlign: 'center' }}>
                    <Typography 
                        variant="h3" 
                        sx={{ 
                            color: 'white',
                            mb: 3,
                            fontSize: { xs: '1.8rem', md: '2.2rem' },
                            fontWeight: 700,
                            textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                        }}
                    >
                        Ready to join the ultimate anime convention?
                    </Typography>
                    <Typography 
                        variant="body1" 
                        sx={{ 
                            color: 'rgba(255,255,255,0.9)',
                            fontSize: { xs: '1.1rem', md: '1.2rem' },
                            lineHeight: 1.6,
                            mb: 4,
                            maxWidth: '600px',
                            mx: 'auto'
                        }}
                    >
                        Don't miss out on the best anime events in the Midlands. Join thousands of anime and gaming fans at AniArchive - the premier anime convention in Coventry and the surrounding areas.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default FAQSection; 