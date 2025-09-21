import React, { useState, memo, useCallback, useRef, forwardRef } from 'react'
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Button, 
  Card, 
  CardContent, 
  Grid, 
  useTheme, 
  useMediaQuery, 
  Chip, 
  Container,
  Fade,
  Slide
} from '@mui/material'
import LazyImage from '../common/LazyImage'
import InteractiveMap from '../common/InteractiveMap'
import { getCurrentSubdomain } from '../../utils/subdomain'
import { getCurrentEvent } from '../../data/eventData'

// Import images
import igGif from '../../images/IG.gif'
import fbGif from '../../images/FB.gif'

const EventPage = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'))
  const currentSubdomain = getCurrentSubdomain()
  const eventData = getCurrentEvent(currentSubdomain)
  const [activeTab, setActiveTab] = useState('event-title')
  
  // Refs for each tab content section
  const eventTitleRef = useRef(null)
  const highlightsRef = useRef(null)
  const mapRef = useRef(null)
  const ticketsRef = useRef(null)
  const socialsRef = useRef(null)

  // Memoized tab change handler with smooth scrolling for mobile
  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId)
    
    // Smooth scroll to content on mobile devices
    if (isMobile) {
      setTimeout(() => {
        let targetRef = null
        switch (tabId) {
          case 'event-title':
            targetRef = eventTitleRef
            break
          case 'highlights':
            targetRef = highlightsRef
            break
          case 'map':
            targetRef = mapRef
            break
          case 'tickets':
            targetRef = ticketsRef
            break
          case 'socials':
            targetRef = socialsRef
            break
          default:
            targetRef = eventTitleRef
        }
        
        if (targetRef && targetRef.current) {
          targetRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          })
        }
      }, 100) // Small delay to ensure content is rendered
    }
  }, [isMobile])

  // Safety check
  if (!eventData) {
    return (
      <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
        <Fade in timeout={500}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h4" 
              sx={{ 
                color: 'white', 
                mb: 2,
                fontSize: { xs: '1.5rem', md: '2rem' }
              }}
            >
              Event Not Found
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: { xs: '0.9rem', md: '1rem' }
              }}
            >
              The requested event could not be found.
            </Typography>
          </Box>
        </Fade>
      </Container>
    )
  }

  // Tab navigation component
  const TabBar = memo(({ activeTab, onTabChange, isMobile, isTablet }) => {
    const tabs = [
      { id: 'event-title', label: eventData.title },
      { id: 'highlights', label: 'Highlights'},
      { id: 'map', label: 'Map & Travel' },
      { id: 'tickets', label: 'Tickets' },
      { id: 'socials', label: 'Socials' }
    ]

    return (
      <Paper 
        elevation={3} 
        sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-evenly',
          gap: { xs: '4px', md: '8px' },
          padding: { xs: '0px', md: '12px' },
          zIndex: 1000,
          maxWidth: { xs: '100%', md: 'fit-content' },
          height: { xs: 'auto', md: '100%' },
          mx: 'auto',
          overflow: 'hidden'
        }}
      >
        <List sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-evenly',
          gap: { xs: '4px', md: '8px' },
          width: '100%',
          p: 0
        }}>
          {tabs.map((tab) => (
            <ListItem key={tab.id} disablePadding sx={{ width: '100%' }}>
              <ListItemButton 
                selected={activeTab === tab.id}
                onClick={() => onTabChange(tab.id)}
                sx={{
                  height: { xs: '44px', md: '44px' },
                  borderRadius: { xs: '8px', md: '15px' },
                  background: activeTab === tab.id 
                    ? 'rgba(255, 107, 107, 0.2)' 
                    : 'rgba(255, 255, 255, 0.1)',
                  border: activeTab === tab.id 
                    ? '1px solid rgba(255, 107, 107, 0.3)' 
                    : '1px solid transparent',
                  minHeight: { xs: '44px', md: '44px' },
                  px: { xs: 1, md: 3 },
                  py: { xs: 0.5, md: 1.5 },
                  transition: 'all 0.3s ease',
                  width: '100%',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    transform: { xs: 'none', md: 'translateY(-1px)' },
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255, 107, 107, 0.25)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 107, 107, 0.3)',
                    }
                  }
                }}
              >
                <ListItemText 
                  primary={
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 0.5,
                      justifyContent: 'center',
                      width: '100%'
                    }}>
                      <Typography 
                        component="span"
                        sx={{
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          color: activeTab === tab.id ? theme.palette.primary.main : theme.palette.secondary.main,
                          textAlign: 'center',
                          textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                          fontSize: { xs: '0.9rem', md: '1.2rem' },
                          lineHeight: 1.2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: '100%'
                        }}
                      >
                        {tab.label}
                      </Typography>
                    </Box>
                  }
                  sx={{ m: 0, textAlign: 'center' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    )
  })

  // Event Title Tab
  const EventTitleTab = memo(forwardRef(({ isMobile, isTablet }, ref) => (
    <Container ref={ref} maxWidth="lg" sx={{ py: { xs: 0, md: 4 } }}>
      <Fade in timeout={600}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: 'center',
          gap: { xs: 3, md: 4 },
          minHeight: { xs: 'auto', md: '600px' },
        }}>
          {/* Content Section */}
          <Box sx={{ 
            flex: 1, 
            textAlign: 'center',
            order: { xs: 2, lg: 1 }
          }}>
            {/* Title and Status */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: { xs: 1, md: 2 }, 
              mb: { xs: 2, md: 3 }, 
              flexWrap: 'wrap',
              flexDirection: { xs: 'column', sm: 'row' }
            }}>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem', lg: '3rem' },
                  fontWeight: 'bold',
                  color: 'white',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  lineHeight: 1.2,
                  mb: { xs: 1, sm: 0 }
                }}
              >
                {eventData.title}
              </Typography>
              <Chip 
                label={eventData.status === 'ongoing' ? 'Happening Now!' : eventData.status === 'upcoming' ? 'Upcoming' : 'Past Event'}
                color={eventData.status === 'ongoing' ? 'warning' : eventData.status === 'upcoming' ? 'success' : 'default'}
                sx={{ 
                  fontWeight: 'bold',
                  fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                  height: { xs: '28px', sm: '32px', md: '36px' },
                  px: { xs: 1, md: 2 }
                }}
              />
            </Box>
            
            {/* Description */}
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.9)', 
                fontFamily: 'Freeman, cursive, sans-serif',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                mb: { xs: 2, md: 3 },
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.2rem' },
                lineHeight: 1.6,
                maxWidth: { xs: '100%', md: '600px' },
                mx: 'auto',
                px: { xs: 1, md: 0 }
              }}
            >
              {eventData.description}
            </Typography>
            
            {/* Event Details Card */}
            <Card sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: { xs: '12px', md: '15px' },
              p: { xs: 2, md: 3 },
              mb: { xs: 2, md: 3 },
              maxWidth: { xs: '100%', md: '500px' },
              mx: 'auto',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: { xs: 1, md: 1.5 },
                alignItems: 'center',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              }}>
                <Typography 
                  sx={{ 
                    color: theme.palette.primary.main, 
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                 {eventData.date}
                </Typography>
                <Typography 
                  sx={{ 
                    color: theme.palette.primary.main, 
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  {eventData.time}
                </Typography>
                <Typography 
                  sx={{ 
                    color: theme.palette.primary.main, 
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                 {eventData.venue.name}
                </Typography>
              </Box>
            </Card>

            {/* Announcements */}
            {eventData.announcements && eventData.announcements.length > 0 && (
              <Box sx={{ mb: { xs: 2, md: 3 } }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    textAlign: 'center', 
                    mb: { xs: 1.5, md: 2 }, 
                    color: 'white', 
                    fontFamily: 'Freeman, cursive, sans-serif',
                    fontSize: { xs: '1rem', md: '1.4rem' },
                    textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
                    borderBottom: '1px solid rgba(255, 107, 107, 0.3)',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    borderRadius: { xs: '8px', md: '10px' },
                  }}
                >
                  Latest Announcements:
                </Typography>
                {eventData.announcements.map((announcement, index) => (
                  <Typography 
                    key={index} 
                    variant="body1" 
                    sx={{ 
                      textAlign: 'center', 
                      color: 'white',
                      backgroundColor: 'rgba(255, 107, 107, 0.2)',
                      padding: { xs: '12px', md: '15px' },
                      borderRadius: { xs: '8px', md: '10px' },
                      mb: { xs: 1.5, md: 2 },
                      fontSize: { xs: '0.85rem', md: '0.95rem' },
                      lineHeight: 1.5,
                      maxWidth: { xs: '100%', md: '600px' },
                      mx: 'auto',
                      border: '1px solid rgba(255, 107, 107, 0.3)'
                    }}
                  >
                    {announcement}
                  </Typography>
                ))}
              </Box>
            )}
          </Box>
          
          {/* Image Section */}
          <Box sx={{ 
            flex: 1, 
            display: 'flex', 
            justifyContent: 'center',
            order: { xs: 1, lg: 2 },
            mb: { xs: 2, lg: 0 },
          }}>
            <LazyImage 
              src={eventData.image} 
              alt="Event Poster"
              style={{
                width: '100%',
                maxWidth: { xs: '300px', sm: '400px', md: '450px', lg: '500px' },
                borderRadius: { xs: '12px', md: '15px' },
                height: 'auto',
                objectFit: 'contain',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              }}
            />
          </Box>
        </Box>
      </Fade>
    </Container>
  )))

  // Highlights Tab
  const HighlightsTab = memo(forwardRef(({ isMobile, isTablet }, ref) => (
    <Container ref={ref} maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      <Fade in timeout={600}>
        <Box>
          <Typography 
            variant="h4" 
            sx={{
              textAlign: 'center',
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem', lg: '3rem' },
              fontWeight: 'bold',
              color: 'white',
              mb: { xs: 3, md: 4 },
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            Event Highlights
          </Typography>
          
          <Grid 
            container 
            spacing={{ xs: 2, md: 3 }} 
            sx={{ 
              maxWidth: { xs: '100%', md: '900px' }, 
              mx: 'auto',
              px: { xs: 1, md: 0 }
            }}
          >
            {eventData.highlights.map((highlight, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                <Slide 
                  direction="up" 
                  in 
                  timeout={600 + (index * 100)}
                >
                  <Card sx={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: { xs: '12px', md: '15px' },
                    padding: { xs: '16px', md: '20px' },
                    textAlign: 'center',
                    height: '100%',
                    minHeight: { xs: '120px', md: '140px' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease-in-out',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    '&:hover': {
                      transform: { xs: 'scale(1.02)', md: 'translateY(-5px)' },
                      boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                      border: '1px solid rgba(255, 107, 107, 0.3)',
                    },
                  }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                        lineHeight: 1.4,
                        textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                      }}
                    >
                      {highlight}
                    </Typography>
                  </Card>
                </Slide>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Fade>
    </Container>
  )))

  // Map Tab
  const MapTab = memo(forwardRef(({ isMobile, isTablet }, ref) => (
    <Container ref={ref} maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      <Fade in timeout={600}>
        <Box>
          <Typography 
            variant="h4" 
            sx={{
              textAlign: 'center',
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem', lg: '3rem' },
              fontWeight: 'bold',
              color: 'white',
              mb: { xs: 3, md: 4 },
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            Event Location
          </Typography>
          
          <Grid 
            container 
            spacing={{ xs: 2, md: 4 }} 
            sx={{ 
              maxWidth: { xs: '100%', md: '1100px' }, 
              mx: 'auto',
              px: { xs: 1, md: 0 }
            }}
          >
            {/* Venue Information */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Slide direction="right" in timeout={700}>
                <Card sx={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: { xs: '12px', md: '15px' },
                  p: { xs: 2, md: 3 },
                  height: '100%',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: theme.palette.primary.main, 
                      fontWeight: 'bold', 
                      mb: { xs: 1.5, md: 2 },
                      fontSize: { xs: '1.2rem', md: '1.4rem' },
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    📍 {eventData.venue.name}
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.8)', 
                      mb: { xs: 2, md: 3 },
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      lineHeight: 1.5
                    }}
                  >
                    {eventData.venue.address}
                  </Typography>

                  {eventData.travelInfo && (
                    <Box>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: theme.palette.primary.main, 
                          fontWeight: 'bold', 
                          mb: { xs: 1.5, md: 2 },
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}
                      >
                        Getting There
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {Object.entries(eventData.travelInfo).map(([key, value]) => (
                          <Typography 
                            key={key} 
                            variant="body2" 
                            sx={{ 
                              color: 'rgba(255, 255, 255, 0.8)',
                              fontSize: { xs: '0.85rem', md: '0.95rem' },
                              lineHeight: 1.4,
                              p: 1,
                              backgroundColor: 'rgba(255, 255, 255, 0.05)',
                              borderRadius: '8px',
                              border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                          >
                            <Box component="span" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                            </Box>
                            <Box component="span" sx={{ ml: 1 }}>{value}</Box>
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  )}
                </Card>
              </Slide>
            </Grid>
            
            {/* Interactive Map */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Slide direction="left" in timeout={800}>
                <Card sx={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: { xs: '12px', md: '15px' },
                  p: { xs: 2, md: 3 },
                  height: '100%',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'white', 
                      mb: { xs: 1.5, md: 2 },
                      fontSize: { xs: '1.1rem', md: '1.3rem' },
                      fontWeight: 'bold',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                      textAlign: 'center'
                    }}
                  >
                    Interactive Map
                  </Typography>
                  <InteractiveMap 
                    venueLocation={[eventData.venue.coordinates.lat, eventData.venue.coordinates.lng]}
                    venueName={eventData.venue.name}
                    venueAddress={eventData.venue.address}
                  />
                </Card>
              </Slide>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Container>
  )))

  // Tickets Tab
  const TicketsTab = memo(forwardRef(({ isMobile, isTablet }, ref) => {
    const ticketTypes = [
      {
        name: 'General Admission',
        price: '£15',
        description: 'Full day access to all activities, panels, and vendor areas',
        features: ['Access to all panels', 'Vendor marketplace', 'Gaming areas', 'Cosplay competition viewing']
      },
      {
        name: 'VIP Ticket',
        price: '£25',
        description: 'Premium experience with exclusive perks and free gift',
        features: ['All General Admission benefits', 'Priority seating', 'Exclusive VIP area', 'Free gift bag', 'Meet & greet opportunities'],
        popular: true
      }
    ]

    return (
      <Container ref={ref} maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        <Fade in timeout={600}>
          <Box>
            <Typography 
              variant="h4" 
              sx={{
                textAlign: 'center',
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem', lg: '3rem' },
                fontWeight: 'bold',
                color: 'white',
                mb: { xs: 3, md: 4 },
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              }}
            >
               Get Your Tickets!
            </Typography>


            {/* Purchase Button */}
            <Box sx={{ textAlign: 'center' }}>
              <Slide direction="up" in timeout={1000}>
                <Button
                  variant="contained"
                  href={eventData.ticketLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics="ticket"
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: { xs: '20px', md: '25px' },
                    padding: { xs: '12px 24px', md: '15px 40px' },
                    fontSize: { xs: '0.9rem', md: '1.1rem' },
                    textTransform: 'uppercase',
                    boxShadow: '0 4px 16px rgba(255, 107, 107, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #FF5252, #FF7979)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(255, 107, 107, 0.4)',
                    },
                  }}
                >
                  Buy Tickets Now
                </Button>
              </Slide>
              
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)', 
                  mt: 2,
                  fontSize: { xs: '0.8rem', md: '0.9rem' }
                }}
              >
                Tickets are sold through Eventbrite - secure and trusted ticketing platform
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Container>
    )
  }))

  // Socials Tab
  const SocialsTab = memo(forwardRef(({ isMobile, isTablet }, ref) => {
    const socialLinks = [
      {
        name: 'Instagram',
        url: 'https://instagram.com/aniarchive',
        color: '#E4405F',
        description: 'Follow us for event updates, behind-the-scenes content, and community highlights.',
        icon: igGif
      },
      {
        name: 'Facebook',
        url: 'https://facebook.com/aniarchive',
        color: '#1877F2',
        description: 'Join our Facebook community for event discussions, photos, and networking.',
        icon: fbGif
      }
    ]

    return (
      <Container ref={ref} maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        <Fade in timeout={600}>
          <Box>
            <Typography 
              variant="h4" 
              sx={{
                textAlign: 'center',
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem', lg: '3rem' },
                fontWeight: 'bold',
                color: 'white',
                mb: { xs: 3, md: 4 },
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              }}
            >
               Connect With Us
            </Typography>
            
            <Grid 
              container 
              spacing={{ xs: 2, md: 3 }} 
              sx={{ 
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                maxWidth: { xs: '100%', md: '100%' }, 
                mx: 'auto',

              }}
            >
              {socialLinks.map((social, index) => (
                <Grid key={social.name} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Slide 
                    direction="up" 
                    in 
                    timeout={600 + (index * 150)}
                  >
                    <Card sx={{
                      background: `linear-gradient(135deg, ${social.color}20, ${social.color}10)`,
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${social.color}40`,
                      borderRadius: { xs: '12px', md: '15px' },
                      padding: { xs: '16px', md: '20px' },
                      textAlign: 'center',
                      height: '100%',
                      minHeight: { xs: '280px', md: '320px' },
                      transition: 'all 0.3s ease-in-out',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                      '&:hover': {
                        transform: { xs: 'scale(1.02)', md: 'translateY(-5px)' },
                        boxShadow: `0 12px 40px ${social.color}30`,
                        border: `1px solid ${social.color}60`,
                      },
                    }}>
                      <CardContent sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'space-between',
                      }}>
                        <Box>
                          <Box sx={{ mb: { xs: 1.5, md: 2 }, display: 'flex', justifyContent: 'center' }}>
                            <LazyImage 
                              src={social.icon} 
                              alt={`${social.name} icon`}
                              style={{
                                width: { xs: '36px', md: '40px' },
                                height: { xs: '36px', md: '40px' },
                                borderRadius: '50%',
                              }}
                            />
                          </Box>
                          
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              color: social.color,
                              marginBottom: { xs: '8px', md: '10px' },
                              fontSize: { xs: '1.1rem', md: '1.3rem' },
                              fontWeight: 'bold',
                              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                            }}
                          >
                            {social.name}
                          </Typography>
                          
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: 'rgba(255, 255, 255, 0.8)',
                              marginBottom: { xs: '16px', md: '20px' },
                              lineHeight: 1.5,
                              fontSize: { xs: '0.85rem', md: '0.95rem' },
                            }}
                          >
                            {social.description}
                          </Typography>
                        </Box>
                        
                        <Button
                          variant="contained"
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            background: `linear-gradient(135deg, ${social.color}, ${social.color}CC)`,
                            color: 'white',
                            borderRadius: { xs: '20px', md: '25px' },
                            padding: { xs: '8px 16px', md: '10px 24px' },
                            textTransform: 'uppercase',
                            fontSize: { xs: '0.8rem', md: '0.9rem' },
                            fontWeight: 'bold',
                            boxShadow: `0 4px 16px ${social.color}30`,
                            '&:hover': {
                              background: `linear-gradient(135deg, ${social.color}CC, ${social.color})`,
                              transform: 'translateY(-2px)',
                              boxShadow: `0 6px 20px ${social.color}40`,
                            },
                          }}
                        >
                          Follow on {social.name}
                        </Button>
                      </CardContent>
                    </Card>
                  </Slide>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>
      </Container>
    )
  }))

  // Render tab content
  const renderTabContent = useCallback(() => {
    switch (activeTab) {
      case 'event-title':
        return <EventTitleTab isMobile={isMobile} isTablet={isTablet} ref={eventTitleRef} />
      case 'highlights':
        return <HighlightsTab isMobile={isMobile} isTablet={isTablet} ref={highlightsRef} />
      case 'map':
        return <MapTab isMobile={isMobile} isTablet={isTablet} ref={mapRef} />
      case 'tickets':
        return <TicketsTab isMobile={isMobile} isTablet={isTablet} ref={ticketsRef} />
      case 'socials':
        return <SocialsTab isMobile={isMobile} isTablet={isTablet} ref={socialsRef} />
      default:
        return <EventTitleTab isMobile={isMobile} isTablet={isTablet} ref={eventTitleRef} />
    }
  }, [activeTab, isMobile, isTablet])

  return (
    <main 
      id="event-page" 
      className="event-page" 
      role="main" 
      aria-label={`${eventData.title} Event Page`}
    >
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}>
        {/* Tab bar positioned above content */}
        <Box
          className="tab-bar-container"
          role="navigation"
          aria-label="Event information navigation"
          sx={{
            position: isMobile ? 'sticky' : 'relative',
            top: isMobile ? '0px' : '10px',
            zIndex: 1000,
            mb: { xs: 2, md: 3 },
            px: { xs: 1, md: 0 }
          }}
        >
          <TabBar 
            activeTab={activeTab} 
            onTabChange={handleTabChange} 
            isMobile={isMobile} 
            isTablet={isTablet} 
          />
        </Box>
        
        {/* Content area */}
        <Box sx={{ 
          flex: 1,
          pt: { xs: 2, md: 3 } // Space after tab bar
        }}>
          {renderTabContent()}
        </Box>
      </Box>
    </main>
  )
}

export default memo(EventPage)