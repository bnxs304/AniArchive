import React, { useState, useRef, useEffect } from 'react'
import { Box, Typography, Paper, List, ListItem, ListItemButton, ListItemText, Button, IconButton, Card, CardContent, Grid, Modal, useTheme, useMediaQuery, Chip } from '@mui/material'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import RSVPModal from '../common/RSVPModal'
import { getCurrentSubdomain } from '../../utils/subdomain'
import { getCurrentEvent } from '../../data/eventData'

// Import images
import wispersGif from '../../images/wispers.gif'
import sfGif from '../../images/sf.gif'
import mntGif from '../../images/mnt.gif'
import igGif from '../../images/IG.gif'
import fbGif from '../../images/FB.gif'
import sgGif from '../../images/sg.gif'
import logoImg from '../../images/logo.png'

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const EventPage = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const currentSubdomain = getCurrentSubdomain()
  const eventData = getCurrentEvent(currentSubdomain)
  const [activeTab, setActiveTab] = useState('event-title')
  const [rsvpModalOpen, setRsvpModalOpen] = useState(false)

  const TabBar = ({ activeTab, setActiveTab, isMobile }) => {
    const SidebarItems = [
      { key: 0, title: eventData.title, id: "event-title" },
      { key: 1, title: "Highlights", id: "highlights" },
      { key: 2, title: "Map & Travel", id: "map" },
      { key: 3, title: "Tickets", id: "tickets" },
      { key: 4, title: "Socials", id: "socials" }
    ]

    return (
      <Paper elevation={3} sx={{ 
        background: 'transparent',
        boxShadow: 'none',
        borderRadius: '10px',
        padding: '10px',
        gap: '10px',
        zIndex: 1000,
      }}>
        <List sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          width: 'fit-content',
          gap: '10px',
        }}>
          {SidebarItems.map((item) => (
            <ListItem key={item.key} disablePadding>
              <ListItemButton 
                selected={activeTab === item.id}
                onClick={() => setActiveTab(item.id)}
                sx={{
                  whiteSpace: 'nowrap',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  minWidth: isMobile ? '200px' : 'auto',
                  '&.Mui-selected': {
                    background: 'rgba(128, 149, 155, 0.2)',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                <ListItemText primary={item.title}
                  sx={{
                    fontSize: isMobile ? '1em' : '1.1em',
                    fontWeight: 'bold',
                    textShadow: '1px 1px 2px #FF9376',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    color: '#FFD776',
                  }}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    )
  }

  const EventTitleTab = ({ isMobile }) => {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: isMobile ? 'auto' : '700px',
        width: '100%',
        position: 'relative',
        padding: { xs: '20px', md: '0px' },
      }}>
        <Box sx={{
          height: '100%',
          gap: '10px',
          position: 'relative',
          top: isMobile ? '25px' : '-50px',
          zIndex: 1,  
          maxWidth: { xs: '100%', md: '50%' },
          padding: { xs: '20px', md: '0px' },
          marginInline: isMobile ? 'auto' : '10px',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography variant="h4" sx={{ fontSize: { xs: '2rem', md: '4rem' } }}>
              {eventData.title}
            </Typography>
            <Chip 
              label={eventData.status === 'ongoing' ? 'Happening Now!' : eventData.status === 'upcoming' ? 'Upcoming' : 'Past Event'}
              color={eventData.status === 'ongoing' ? 'warning' : eventData.status === 'upcoming' ? 'success' : 'default'}
              sx={{ fontWeight: 'bold' }}
            />
          </Box>
          
          <Typography variant="body1" sx={{ textAlign: 'center', width: '100%', mb: 2 }}>
            {eventData.description}
          </Typography>
          
          <Typography variant="body1" sx={{ textAlign: 'center', width: '100%', mb: 1 }}>
            {eventData.date}
          </Typography>
          
          <Typography variant="body1" sx={{ textAlign: 'center', width: '100%', mb: 1 }}>
            {eventData.time}
          </Typography>
          
          <Typography variant="body1" sx={{ textAlign: 'center', width: '100%', mb: 2 }}>
             {eventData.venue.name}
          </Typography>

          {eventData.announcements && eventData.announcements.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ textAlign: 'center', mb: 2, color: '#FF6B6B', fontWeight: 'bold' }}>
                Latest Announcements
              </Typography>
              {eventData.announcements.map((announcement, index) => (
                <Typography key={index} variant="body2" sx={{ 
                  textAlign: 'center', 
                  color: 'white',
                  backgroundColor: 'rgba(255, 107, 107, 0.2)',
                  padding: '10px',
                  borderRadius: '10px',
                  mb: 1,
                }}>
                  {announcement}
                </Typography>
              ))}
            </Box>
          )}

          {eventData.status === 'upcoming' && (
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => setRsvpModalOpen(true)}
              sx={{
                width: 'fit-content',
                height: 'fit-content',
                marginBlock: '10px',
                marginInline: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
                color: 'white',
                borderRadius: '25px',
                padding: '16px 38px',
                textTransform: 'uppercase',
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                fontWeight: 'bold',
                '&:hover': {
                  background: 'linear-gradient(135deg, #FF4757, #FF6B6B)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              RSVP Now
            </Button>
          )}
        </Box>
        
        <img src={eventData.image} alt="Event Poster"
          style={{
            width: isMobile ? '100%' : '50%',
            maxWidth: '600px',
            borderRadius: '10px',
            height: 'fit-content',
            objectFit: 'contain',
            marginTop: isMobile ? '20px' : '0px',
          }}/>
      </Box>
    )
  }

  const HighlightsTab = ({ isMobile }) => {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        padding: '20px',
        minHeight: isMobile ? 'auto' : '700px',
        width: '100%',
      }}>
        <Typography variant="h4" sx={{
          textAlign: 'center',
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: 'bold',
          color: 'white',
          mb: 4,
        }}>
          Event Highlights
        </Typography>
        
        <Grid container spacing={3} sx={{ maxWidth: '800px' }}>
          {eventData.highlights.map((highlight, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6 }}>
              <Card sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '15px',
                padding: '20px',
                textAlign: 'center',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}>
                <Typography variant="h6" sx={{ 
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: isMobile ? '1.1rem' : '1.3rem',
                }}>
                  {highlight}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  }

  const MapTab = ({ isMobile }) => {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: '20px',
        width: '100%',
        height: '100%',
        padding: '20px',
        minHeight: isMobile ? 'auto' : '700px',
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: isMobile ? '100%' : '50%',
        }}>
          <Typography variant="h4" sx={{
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            marginBottom: '10px',
            fontSize: isMobile ? '1.5rem' : '2.5rem',
            color: 'white',
          }}>
            Event Location
          </Typography>
          
          <Typography variant="h6" sx={{
            color: '#FF6B6B',
            fontWeight: 'bold',
            mb: 1,
          }}>
            {eventData.venue.name}
          </Typography>
          
          <Typography variant="body1" sx={{
            color: 'rgba(255, 255, 255, 0.8)',
            mb: 2,
          }}>
            {eventData.venue.address}
          </Typography>

          {eventData.travelInfo && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ color: '#FF6B6B', fontWeight: 'bold', mb: 2 }}>
                🚗 Getting There
              </Typography>
              {Object.entries(eventData.travelInfo).map(([key, value]) => (
                <Typography key={key} variant="body2" sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                  mb: 1,
                  fontSize: isMobile ? '0.9rem' : '1rem',
                }}>
                  <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {value}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
        
        <Box sx={{
          height: isMobile ? '300px' : '600px',
          width: '100%',
          borderRadius: '15px',
          overflow: 'hidden',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        }}>
          <MapContainer
            center={[eventData.venue.coordinates.lat, eventData.venue.coordinates.lng]}
            zoom={15}
            style={{ height: '100%', width: '100%' }}
            className="leaflet-container"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            <Marker position={[eventData.venue.coordinates.lat, eventData.venue.coordinates.lng]}>
              <Popup>
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ color: '#FF6B6B', margin: '0 0 10px 0' }}>
                    {eventData.title}
                  </h3>
                  <p style={{ margin: '5px 0' }}>📅 {eventData.date}</p>
                  <p style={{ margin: '5px 0' }}>⏰ {eventData.time}</p>
                  <p style={{ margin: '5px 0' }}>🏢 {eventData.venue.name}</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </Box>
      </Box>
    )
  }

  const TicketsTab = ({ isMobile }) => {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        padding: '20px',
        minHeight: isMobile ? 'auto' : '700px',
        width: '100%',
      }}>
        <Typography variant="h4" sx={{
          textAlign: 'center',
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: 'bold',
          color: 'white',
          mb: 4,
        }}>
          Get Your Tickets
        </Typography>
        
        <Card sx={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center',
          maxWidth: '600px',
        }}>
          <Typography variant="h5" sx={{ color: 'white', mb: 3, fontWeight: 'bold' }}>
            {eventData.title}
          </Typography>
          
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
            📅 {eventData.date}
          </Typography>
          
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
            ⏰ {eventData.time}
          </Typography>
          
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 4 }}>
            📍 {eventData.venue.name}
          </Typography>
          
          <Button
            variant="contained"
            href={eventData.ticketLink}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              background: 'linear-gradient(135deg, #4CAF50, #66BB6A)',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '25px',
              padding: '15px 40px',
              textTransform: 'uppercase',
              fontSize: '1.2rem',
              '&:hover': {
                background: 'linear-gradient(135deg, #45a049, #5cb85c)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            Buy Tickets Now
          </Button>
        </Card>
      </Box>
    )
  }

  const SocialsTab = ({ isMobile }) => {
    const socialLinks = [
      {
        name: 'Instagram',
        url: eventData.socialMedia.instagram,
        image: igGif,
        color: '#F21877',
        description: 'Follow us on Instagram for event updates, behind-the-scenes content, and cosplay highlights!'
      },
      {
        name: 'Facebook',
        url: eventData.socialMedia.facebook,
        image: fbGif,
        color: '#1877F2',
        description: 'Join our Facebook community for discussions, event updates, and more!'
      }
    ]

    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        padding: '20px',
        minHeight: isMobile ? 'auto' : '700px',
        width: '100%',
      }}>
        <Typography variant="h4" sx={{
          textAlign: 'center',
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: 'bold',
          color: 'white',
          mb: 4,
        }}>
          Connect With Us
        </Typography>
        
        <Grid container spacing={4} sx={{ maxWidth: '800px' }}>
          {socialLinks.map((social, index) => (
            <Grid key={social.name} size={{ xs: 12, sm: 6 }}>
              <Card sx={{
                background: `linear-gradient(135deg, ${social.color}20, ${social.color}10)`,
                border: `2px solid ${social.color}40`,
                borderRadius: '20px',
                boxShadow: `0 8px 32px ${social.color}30`,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: `0 12px 40px ${social.color}50`,
                },
              }}>
                <CardContent sx={{ textAlign: 'center', padding: '30px' }}>
                  <Box sx={{ fontSize: '3rem', marginBottom: '15px' }}>
                    <img src={social.image} alt={social.name} style={{ width: '60px', height: '60px' }} />
                  </Box>
                  
                  <Typography variant="h5" sx={{
                    fontWeight: 'bold',
                    color: social.color,
                    marginBottom: '10px',
                    fontSize: isMobile ? '1.2rem' : '1.5rem',
                  }}>
                    {social.name}
                  </Typography>
                  
                  <Typography variant="body2" sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    marginBottom: '20px',
                    lineHeight: 1.5,
                    fontSize: isMobile ? '0.9rem' : '1rem',
                  }}>
                    {social.description}
                  </Typography>
                  
                  <Button
                    variant="contained"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      background: `linear-gradient(135deg, ${social.color}, ${social.color}CC)`,
                      color: 'white',
                      borderRadius: '25px',
                      padding: { xs: '8px 20px', md: '12px 30px' },
                      textTransform: 'uppercase',
                      fontSize: { xs: '0.8rem', md: '1rem' },
                      '&:hover': {
                        background: `linear-gradient(135deg, ${social.color}CC, ${social.color})`,
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    Follow on {social.name}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'event-title':
        return <EventTitleTab isMobile={isMobile} />
      case 'highlights':
        return <HighlightsTab isMobile={isMobile} />
      case 'map':
        return <MapTab isMobile={isMobile} />
      case 'tickets':
        return <TicketsTab isMobile={isMobile} />
      case 'socials':
        return <SocialsTab isMobile={isMobile} />
      default:
        return <EventTitleTab isMobile={isMobile} />
    }
  }

  return (
    <main id="event-page" className="event-page" role="main" aria-label={`${eventData.title} Event Page`}>
      <Box sx={{
        padding: '0px',
        minHeight: isMobile ? 'auto' : '600px',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <Box>
          <Paper sx={{
            backgroundColor: 'transparent',
            boxShadow: 'none',  
          }}>
            {renderTabContent()}
          </Paper>
        </Box>
        
        <Box
          className="tab-bar-container"
          role="navigation"
          aria-label="Event information navigation"
          sx={{
            position: 'sticky',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            borderRadius: '10px',
            width: 'fit-content',
            margin: '20px auto',
          }}>
          <TabBar activeTab={activeTab} setActiveTab={setActiveTab} isMobile={isMobile} />
        </Box>
      </Box>

      {/* RSVP Modal */}
      <RSVPModal 
        open={rsvpModalOpen} 
        onClose={() => setRsvpModalOpen(false)} 
      />
    </main>
  )
}

export default EventPage
