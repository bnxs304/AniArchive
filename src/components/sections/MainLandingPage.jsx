import React, { useState, useRef, useMemo, useCallback, memo } from 'react'
import { Box, Typography, Card, CardContent, CardMedia, Button, Chip, Grid, Modal, IconButton, useTheme, useMediaQuery } from '@mui/material'
import { Link } from 'react-router-dom'
import { getUpcomingEvents, getOngoingEvents, getPastEvents, eventsData } from '../../data/eventData'
import { getSubdomainUrl } from '../../utils/subdomain'

const MainLandingPage = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [activeTab, setActiveTab] = useState('upcoming')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const modalRef = useRef(null)
  
  // Memoize expensive calculations
  const events = useMemo(() => ({
    upcoming: getUpcomingEvents(),
    ongoing: getOngoingEvents(),
    past: getPastEvents()
  }), [])
  
  const upcomingEvents = events.upcoming
  const ongoingEvents = events.ongoing
  const pastEvents = events.past

  // Memoize event handlers to prevent unnecessary re-renders
  const handleEventClick = useCallback((event) => {
    if (activeTab === 'past') {
      setSelectedEvent(event)
    } else {
      const subdomainUrl = getSubdomainUrl(event.city)
      window.location.href = subdomainUrl
    }
  }, [activeTab])

  const handleCloseModal = useCallback(() => {
    setSelectedEvent(null)
    setMousePosition({ x: 0, y: 0 })
  }, [])

  const handleMouseMove = useCallback((event) => {
    if (modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const rotateX = (y - centerY) / centerY * 10
      const rotateY = (x - centerX) / centerX * 10
      
      setMousePosition({ x: rotateX, y: rotateY })
    }
  }, [])

  // Memoize utility functions
  const getStatusColor = useCallback((status) => {
    switch (status) {
      case 'upcoming': return '#4CAF50'
      case 'ongoing': return '#FF9800'
      case 'past': return '#9E9E9E'
      default: return '#9E9E9E'
    }
  }, [])

  const getStatusText = useCallback((status) => {
    switch (status) {
      case 'upcoming': return 'Upcoming'
      case 'ongoing': return 'Happening Now!'
      case 'past': return 'Past Event'
      default: return 'Unknown'
    }
  }, [])

  const EventCard = memo(({ event, isPast = false }) => {
    // Add safety checks for event data
    if (!event) {
      return (
        <Card sx={{ 
          maxWidth: isMobile ? '100%' : 400,
          margin: '10px',
          borderRadius: '15px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
        }}>
          <CardContent sx={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6" color="white">
              Event data unavailable
            </Typography>
          </CardContent>
        </Card>
      )
    }

    return (
      <Card 
        sx={{ 
          maxWidth: isMobile ? '100%' : 400,
          margin: '10px',
          cursor: 'pointer',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          },
          borderRadius: '15px',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
        }}
        onClick={() => handleEventClick(event)}
      >
        <CardMedia
          component="img"
          height={isMobile ? 200 : 250}
          image={event.image}
          alt={event.title}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            }
          }}
        />
        <CardContent sx={{ padding: '20px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6" component="h3" sx={{ 
              fontWeight: 'bold',
              color: 'white',
              fontSize: isMobile ? '1.1rem' : '1.3rem',
            }}>
              {event.title}
            </Typography>
            <Chip 
              label={getStatusText(event.status)} 
              size="small"
              sx={{
                backgroundColor: getStatusColor(event.status),
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.8rem',
              }}
            />
          </Box>
          
          <Typography variant="body2" color="rgba(255,255,255,0.8)" sx={{ mb: 1 }}>
             {event.date}
          </Typography>
          
          <Typography variant="body2" color="rgba(255,255,255,0.9)" sx={{ 
            fontSize: '0.9rem',
            lineHeight: 1.4,
            mb: 2,
          }}>
            {event.description}
          </Typography>
          
          {!isPast && (
            <Button
              variant="contained"
              onClick={() => handleEventClick(event)}
              sx={{
                width: '100%',
                background: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: '25px',
                padding: '10px 20px',
                textTransform: 'uppercase',
                fontSize: '0.9rem',
                '&:hover': {
                  background: 'linear-gradient(135deg, #FF4757, #FF6B6B)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              View Event Details
            </Button>
          )}
        </CardContent>
      </Card>
    )
  })

  const TabButton = memo(({ label, value, count }) => (
    <Button
      onClick={() => setActiveTab(value)}
      sx={{
        color: activeTab === value ? '#FF6B6B' : 'rgba(255,255,255,0.7)',
        fontWeight: 'bold',
        fontSize: isMobile ? '1rem' : '1.2rem',
        textTransform: 'uppercase',
        padding: '10px 20px',
        borderRadius: '25px',
        background: activeTab === value ? 'rgba(255,107,107,0.2)' : 'transparent',
        border: activeTab === value ? '2px solid #FF6B6B' : '2px solid transparent',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          background: 'rgba(255,107,107,0.1)',
          color: '#FF6B6B',
        },
      }}
    >
      {label} ({count})
    </Button>
  ))

  const HeroEventCard = memo(({ event }) => {
    if (!event) return null

    return (
      <Card 
        sx={{ 
          width: '100%',
          maxWidth: '100%',
          margin: '0',
          cursor: 'pointer',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
          },
          minHeight: isMobile ? '400px' : '500px',
        }}
        onClick={() => handleEventClick(event)}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          height: '100%',
        }}>
          <CardMedia
            component="img"
            sx={{
              width: isMobile ? '100%' : '50%',
              height: isMobile ? '250px' : '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
              }
            }}
            image={event.image}
            alt={event.title}
          />
          <CardContent sx={{ 
            padding: isMobile ? '20px' : '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: isMobile ? '100%' : '50%',
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h3" component="h3" sx={{ 
                fontWeight: 'bold',
                color: 'white',
                fontSize: isMobile ? '1.5rem' : '2.5rem',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              }}>
                {event.title}
              </Typography>
              <Chip 
                label={getStatusText(event.status)} 
                size="medium"
                sx={{
                  backgroundColor: getStatusColor(event.status),
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: isMobile ? '0.8rem' : '1rem',
                  padding: '8px 16px',
                }}
              />
            </Box>
            
            <Typography variant="h6" color="rgba(255,255,255,0.9)" sx={{ 
              mb: 2,
              fontSize: isMobile ? '1rem' : '1.3rem',
              fontWeight: '500',
            }}>
              {event.date}
            </Typography>
            
            <Typography variant="body1" color="rgba(255,255,255,0.9)" sx={{ 
              fontSize: isMobile ? '1rem' : '1.2rem',
              lineHeight: 1.6,
              mb: 3,
            }}>
              {event.description}
            </Typography>
            
            <Button
              variant="contained"
              onClick={() => handleEventClick(event)}
              sx={{
                width: '100%',
                background: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: '30px',
                padding: isMobile ? '12px 24px' : '16px 32px',
                textTransform: 'uppercase',
                fontSize: isMobile ? '1rem' : '1.1rem',
                '&:hover': {
                  background: 'linear-gradient(135deg, #FF4757, #FF6B6B)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              View Event Details
            </Button>
          </CardContent>
        </Box>
      </Card>
    )
  })

  const renderEventList = useMemo(() => {
    let events = []
    let title = ''
    
    switch (activeTab) {
      case 'upcoming':
        events = upcomingEvents
        title = 'More Upcoming Events'
        break
      case 'ongoing':
        events = ongoingEvents
        title = 'Happening Now'
        break
      case 'past':
        events = pastEvents
        title = 'Past Events'
        break
      default:
        events = upcomingEvents
        title = 'More Upcoming Events'
    }

    // For upcoming events, show the first event as hero card, then show remaining events below
    if (activeTab === 'upcoming' && events.length > 0) {
      const heroEvent = events[0]
      const remainingEvents = events.slice(1)
      
      return (
        <Box sx={{ mt: 4 }}>
          {/* Hero Event Card */}
          <Box sx={{ mb: 6 }}>
            <HeroEventCard event={heroEvent} />
          </Box>
          
          {/* Remaining Events */}
          {remainingEvents.length > 0 && (
            <>
              <Typography variant="h3" sx={{ 
                textAlign: 'center',
                mb: 4,
                color: 'white',
                fontWeight: 'bold',
                fontSize: isMobile ? '1.8rem' : '2.5rem',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}>
                {title}
              </Typography>
              
              <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                {remainingEvents.map((event) => (
                  <Grid key={event.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <EventCard event={event} isPast={false} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Box>
      )
    }

    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h3" sx={{ 
          textAlign: 'center',
          mb: 4,
          color: 'white',
          fontWeight: 'bold',
          fontSize: isMobile ? '1.8rem' : '2.5rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        }}>
          {title}
        </Typography>
        
        {events.length === 0 ? (
          <Typography variant="h6" sx={{ 
            textAlign: 'center',
            color: 'rgba(255,255,255,0.7)',
            mt: 4,
          }}>
            No {activeTab} events at the moment
          </Typography>
        ) : (
          <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
            {events.map((event) => (
              <Grid key={event.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <EventCard event={event} isPast={activeTab === 'past'} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    )
  }, [activeTab, upcomingEvents, ongoingEvents, pastEvents, isMobile])

  return (
    <Box sx={{ 
      minHeight: '100vh',
      padding: isMobile ? '100px 20px 50px' : '120px 50px 50px',
      
    }}>
      {/* Hero Section */}
      <Box sx={{
         textAlign: 'center', 
         mb: activeTab === 'upcoming' ? 3 : 6,
         background: 'rgba(255,255,255,0.1)',
         borderRadius: '20px',
         padding: activeTab === 'upcoming' ? '15px' : '20px',
         }}>
        <Typography variant="h1" sx={{ 
          fontSize: activeTab === 'upcoming' ? (isMobile ? '2rem' : '3rem') : (isMobile ? '2.5rem' : '4rem'),
          fontWeight: 'bold',
          color: 'white',
          mb: activeTab === 'upcoming' ? 1 : 2,
          textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
        }}>
          The Anime Archive
        </Typography>
        
        <Typography variant="h5" sx={{ 
          color: 'rgba(255,255,255,0.9)',
          fontFamily: 'Freeman, cursive, sans-serif',
          mb: activeTab === 'upcoming' ? 2 : 4,
          fontSize: activeTab === 'upcoming' ? (isMobile ? '1rem' : '1.2rem') : (isMobile ? '1.2rem' : '1.5rem'),
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          Your premier destination for anime conventions and pop culture events across the UK.
          Join our community and experience the best of anime culture!
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          gap: '20px', 
          justifyContent: 'center',
          flexWrap: 'wrap',
          mb: activeTab === 'upcoming' ? 2 : 4,
        }}>
          <TabButton label="Upcoming" value="upcoming" count={upcomingEvents.length} />
          <TabButton label="Happening Now" value="ongoing" count={ongoingEvents.length} />
          <TabButton label="Past Events" value="past" count={pastEvents.length} />
        </Box>
      </Box>

      {/* Event List */}
      {renderEventList}
      
      {/* Call to Action */}
      <Box sx={{ 
        textAlign: 'center', 
        mt: 8,
        padding: '40px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '20px',
      }}>
        <Typography variant="h4" sx={{ 
          color: 'white',
          fontWeight: 'bold',
          mb: 2,
          fontSize: isMobile ? '1.5rem' : '2rem',
        }}>
          Want to Get Involved?
        </Typography>
        
        <Typography variant="body1" sx={{ 
          color: 'rgba(255,255,255,0.8)',
          mb: 3,
          fontSize: isMobile ? '1rem' : '1.2rem',
        }}>
          Whether you're interested in becoming a vendor, volunteer, or performer, we'd love to have you join our community!
        </Typography>
        
        <Box sx={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            component={Link}
            to="/vendor"
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #4CAF50, #66BB6A)',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '25px',
              padding: '12px 30px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #45a049, #5cb85c)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            Become a Vendor
          </Button>
          
          <Button
            component={Link}
            to="/volunteers"
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #2196F3, #42A5F5)',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '25px',
              padding: '12px 30px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #1976D2, #1E88E5)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            Become a Volunteer
          </Button>
          
          <Button
            component={Link}
            to="/guests"
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #9C27B0, #BA68C8)',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '25px',
              padding: '12px 30px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #8E24AA, #AB47BC)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            Become a Guest
          </Button>
        </Box>
      </Box>

      {/* Event Modal for Past Events */}
      <Modal
        open={!!selectedEvent}
        onClose={handleCloseModal}
        aria-labelledby="event-modal-title"
        aria-describedby="event-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        <Box
          ref={modalRef}
          onMouseMove={handleMouseMove}
          role="dialog"
          aria-modal="true"
          sx={{
            position: 'relative',
            background: 'rgba(0, 0, 0, 0.9)',
            borderRadius: '20px',
            padding: { xs: '20px', md: '30px' },
            maxWidth: '90vw',
            maxHeight: '90vh',
            overflow: 'hidden',
            transform: isMobile ? 'none' : `perspective(1000px) rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg)`,
            transition: 'transform 0.1s ease-out',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <IconButton
            onClick={handleCloseModal}
            aria-label="Close event details"
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
              zIndex: 10,
            }}
          >
            ✕
          </IconButton>
          
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}>
            <Typography 
              id="event-modal-title"
              variant="h3" 
              component="h3"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                marginBottom: '10px',
                fontSize: { xs: '1.5rem', md: '2rem' },
              }}>
              {selectedEvent?.title}
            </Typography>
            
            <Box sx={{
              position: 'relative',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
              maxWidth: '100%',
              maxHeight: '70vh',
            }}>
              <img 
                src={selectedEvent?.image} 
                alt={selectedEvent?.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '70vh',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </Box>
            
            {selectedEvent?.date && (
              <Typography variant="h6" sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                textAlign: 'center',
                fontStyle: 'italic',
                fontSize: { xs: '1rem', md: '1.2rem' },
              }}>
                📅 {selectedEvent.date}
              </Typography>
            )}

            {selectedEvent?.highlights && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  mb: 2,
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                }}>
                  Event Highlights
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '10px', 
                  justifyContent: 'center',
                  maxWidth: '600px',
                }}>
                  {selectedEvent.highlights.map((highlight, index) => (
                    <Chip
                      key={index}
                      label={highlight}
                      sx={{
                        backgroundColor: 'rgba(255, 107, 107, 0.2)',
                        color: 'white',
                        border: '1px solid rgba(255, 107, 107, 0.5)',
                        fontSize: { xs: '0.8rem', md: '0.9rem' },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default memo(MainLandingPage)
