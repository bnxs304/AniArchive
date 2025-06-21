import React, { useState, useRef, useEffect } from 'react'
import { eventData } from '../../data/eventData'
import { Box, Typography, Paper, List, ListItem, ListItemButton, ListItemText, Fade, Button, IconButton, Card, CardContent, Grid, Modal, useTheme, useMediaQuery } from '@mui/material'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import RSVPModal from '../common/RSVPModal'

// Import images properly for Vite
import wispersGif from '../../images/wispers.gif'
import sfGif from '../../images/sf.gif'
import mntGif from '../../images/mnt.gif'
import igGif from '../../images/IG.gif'
import fbGif from '../../images/FB.gif'
import sgGif from '../../images/sg.gif'

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Custom cartoon marker icon
const createCartoonMarker = () => {
    return L.divIcon({
        className: 'custom-cartoon-marker',
        html: `
            <div style="
                width: 40px;
                height: 40px;
                background: linear-gradient(135deg, #FF6B6B, #FF8E8E);
                border: 3px solid #FF4757;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                position: relative;
                animation: bounce 2s infinite, pulse 3s ease-in-out infinite;
            ">
                <div style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) rotate(45deg);
                    color: white;
                    font-weight: bold;
                    font-size: 16px;
                    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
                ">📍</div>
            </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    })
}

const TabBar = ({ activeTab, setActiveTab, isMobile }) => {
    return (
        <Paper elevation={3} sx={{ 
            background: 'transparent',
            boxShadow: 'none',
            borderRadius: '10px',
            padding: '10px',
            gap: '10px',
            zIndex: 1000,
            transform: isMobile ? 'none' : 'perspective(1500px) rotateY(20deg) rotateX(5deg)',
        }}>
            <List sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                width: 'fit-content',
                gap: '10px',
            }}
            className="tab-bar-list"
            >
                {SidebarItems.map((item) => (
                    <ListItem key={item.key} disablePadding>
                        <ListItemButton 
                            selected={activeTab === item.id}
                            onClick={() => {
                                setActiveTab(item.id)
                                if (isMobile) {
                                    window.scrollTo({ top: 0, behavior: 'smooth' })
                                }
                            }}
                            className="tab-bar-item"
                            sx={{
                                whiteSpace: 'nowrap',
                                borderRadius: '10px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                minWidth: isMobile ? '200px' : 'auto',

                                '&.Mui-selected': {
                                    background: 'rgba(128, 149, 155, 0.2)',
                                    transition: 'scale 0.5s ease-in-out',
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',

                                    '&:not(.Mui-selected)': {
                                        scale: isMobile ? '1.05' : '1.2',
                                        transition: 'scale 0.5s ease-in-out',
                                        background: 'rgba(255, 255, 255, 0.2)',
                                    },
                                },
                            }}
                        >
                            <ListItemText primary={item.title}
                            sx={{
                                textDecoration: 'none',
                                fontSize: isMobile ? '1em' : '1.1em',
                                fontWeight: 'bold',
                                textShadow: '1px 1px 2px #FF9376',
                                textTransform: 'uppercase',
                                textAlign: 'center',
                                color: '#FFD776',

                                '&:hover': {
                                    color: 'white',
                                    transform: 'scale(1.05)',
                                    transition: 'color 0.2s ease-in-out',

                                    '&:not(.Mui-selected)': {
                                        transition: 'scale 0.5s ease-in-out',

                                    },
                                },
                            }}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Paper>
    )
}

const SidebarItems = [
    {
        key: 0,
        title: eventData.title,
        id: "event-title"
    },
    {
        key: 1,
        title: "More Info",
        id: "more-info"
    },
    {
        key: 2,
        title: "Map",
        id: "map"
    },
    {
        key: 3,
        title: "Socials",
        id: "socials"
    }
]

const EventTitleTab = ({ isMobile }) => {   
    const [rsvpModalOpen, setRsvpModalOpen] = useState(false)

    useEffect(() => {
        // Add custom CSS for the bounce animation
        const style = document.createElement('style')
        style.textContent = `
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {
                    transform: ${isMobile ? 'translateY(0)' : 'perspective(1000px) rotateY(-20deg) rotateX(5deg) translateY(0)'};
                }
                40% {
                    transform: ${isMobile ? 'translateY(-10px)' : 'perspective(1000px) rotateY(-20deg) rotateX(5deg) translateY(-10px)'};
                }
                60% {
                    transform: ${isMobile ? 'translateY(-5px)' : 'perspective(1000px) rotateY(-20deg) rotateX(5deg) translateY(-5px)'};
                }
            }
        `
        document.head.appendChild(style)

        return () => {
            document.head.removeChild(style)
        }
    }, [isMobile])

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
                top: isMobile ? '25px' : '-110px',
                zIndex: 1,  
                maxWidth: { xs: '100%', md: '50%' },
                padding: { xs: '20px', md: '0px' },
                marginInline: isMobile ? 'auto' : '10px',
                transform: isMobile ? 'none' : 'perspective(1500px) rotateY(20deg) rotateX(5deg)',
            }}>
            <Typography variant="h6" sx={{
                fontSize: { xs: '2rem', md: '4rem' },
            }}>
                {eventData.title}</Typography>
            <Typography variant="body1" sx={{
                textAlign: 'center',
                width: '100%',
            }}>{eventData.description}</Typography>
            <Typography variant="body1" sx={{
                textAlign: 'center',
                width: '100%',
            }}>{eventData.date}
            </Typography>
            <Typography variant="body1" sx={{
                textAlign: 'center',
                width: '100%',
                fontSize: { xs: '0.8rem', md: '1rem' },
            }}>{eventData.time}</Typography>
            <Typography variant="body1" sx={{
                textAlign: 'center',
                width: '100%',
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}>
            Let us know you're coming for a chance to win
            in our giveaway!
            </Typography>

            <Button 
                variant="contained" 
                color="primary" 
                onClick={() => setRsvpModalOpen(true)}
                sx={{
                    width: 'fit-content',
                    marginBlock: '10px',
                    marginInline: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
                    color: 'white',
                    fontFamily: 'Freeman',
                    borderRadius: '25px',
                    padding: '12px 30px',
                    textTransform: 'uppercase',
                    boxShadow: '0 4px 15px rgba(255, 107, 107, 0.5)',
                    transition: 'all 0.3s ease',
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    '&:hover': {
                        background: 'linear-gradient(135deg, #FF4757, #FF6B6B)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(255, 107, 107, 0.7)',
                    },
                }}
            >
                RSVP Now
            </Button>
            </Box>
            <img src={eventData.image} alt="Event Poster"
            style={{
                width: isMobile ? '100%' : '50%',
                maxWidth: '600px',
                borderRadius: '10px',
                height: 'fit-content',
                objectFit: 'contain',
                transform: isMobile ? 'none' : 'perspective(1000px) rotateY(-20deg) rotateX(5deg)',
                animation: isMobile ? 'none' : 'bounce 2s ease-in-out infinite',
                marginTop: isMobile ? '20px' : '0px',
            }}/>
            {!isMobile && (
                <img src= {wispersGif}
                style={{
                    position: 'absolute',
                    left: '-100px',
                    bottom: '-50px',
                    margin: 'auto',
                    overflow: 'hidden',
                    width: 'fit-content',
                    height: 'fit-content',
                    transform: 'perspective(1000px) translateZ(50px) rotateX(5deg)',
                }}
                sx={{
                    display: { xs: 'none', md: 'block' },
                    transform: { xs: 'none', md: 'perspective(1000px) translateZ(100px) rotateX(5deg)' },
                }}/>
            )}

            {/* RSVP Modal */}
            <RSVPModal 
                open={rsvpModalOpen} 
                onClose={() => setRsvpModalOpen(false)} 
            />
        </Box>
    )
}

const MoreInfoTab = ({ isMobile }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            position: 'relative',
            padding: '10px',
            minHeight: isMobile ? 'auto' : '700px',
            width: '100%',
        }}>
            <Typography variant="h6"
            sx={{
                flex: 1,
                textAlign: 'center',
                position: 'relative',
                left: isMobile ? '0px' : '50px',
                top: '0px',
                transform: isMobile ? 'none' : 'perspective(1500px) rotateY(20deg) rotateX(5deg)',
                fontSize: isMobile ? '1.5rem' : '5rem',  
            }}
            >More Information</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'left',
                gap: '10px',
                width: isMobile ? '100%' : '50%',
                transform: isMobile ? 'none' : 'perspective(1500px) rotateY(-20deg) rotateX(5deg)',
                padding: { xs: '20px', md: '0px' },

            }}>
            <Typography variant="body1" sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
            }}>
                Date: {eventData.date}
            </Typography>
            <Typography variant="body1" sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
            }}>
                Time: {eventData.time}
            </Typography>
            <Typography variant="body1" sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
            }}>
                Venue: {eventData.venue.name}
            </Typography>
            <Typography variant="body1" sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
            }}>
                Address: {eventData.venue.address}
            </Typography>
            <Typography variant="body1" sx={{
                textAlign: 'center',
                width: '100%',
                fontSize: { xs: '1.2rem', md: '1.4rem' },
                fontWeight: 'bold',
            }}>
                Highlights:
            </Typography>
            {eventData.highlights.map((highlight, index) => (
                <Typography key={index} variant="body1" sx={{
                    textAlign: 'center',
                    width: '100%',
                    color: 'black',
                    fontSize: { xs: '1rem', md: '1.2rem' },
                }}>
                    {highlight}
                </Typography>
            ))}
            </Box>
            {!isMobile && (
                <img src= {sfGif}
                style={{
                    position: 'absolute',
                    left: '-100px',
                    top: '-80px',
                    margin: 'auto',
                    scale: '0.5',
                    width: 'fit-content',
                    height: 'fit-content',
                    transform: 'perspective(1000px) rotateY(20deg) rotateX(180deg) rotateZ(180deg)',
                }}/>
            )}
        </Box>
    )
}

const MapTab = ({ isMobile }) => {
    const mapRef = useRef(null)

    useEffect(() => {
        // Add custom CSS for the cartoon marker animation
        const style = document.createElement('style')
        style.textContent = `
            .custom-cartoon-marker {
                background: transparent !important;
                border: none !important;
            }
            
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {
                    transform: rotate(-45deg) translateY(0);
                }
                40% {
                    transform: rotate(-45deg) translateY(-10px);
                }
                60% {
                    transform: rotate(-45deg) translateY(-5px);
                }
            }
            
            @keyframes pulse {
                0% {
                    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                }
                50% {
                    box-shadow: 0 4px 20px rgba(255, 107, 107, 0.6);
                }
                100% {
                    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                }
            }
            
            .leaflet-container {
                border-radius: 15px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.3);
                overflow: hidden;
                animation: pulse 3s ease-in-out infinite;
            }
            
            .leaflet-popup-content-wrapper {
                background: linear-gradient(135deg, #FFE5E5, #FFF5F5);
                border-radius: 15px;
                box-shadow: 0 8px 25px rgba(0,0,0,0.2);
                border: 2px solid #FFB3B3;
                animation: slideIn 0.5s ease-out;
            }
            
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-20px) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            .leaflet-popup-tip {
                background: linear-gradient(135deg, #FFE5E5, #FFF5F5);
                border: 2px solid #FFB3B3;
            }
            
            .leaflet-popup-content {
                font-family: 'Comic Sans MS', cursive, sans-serif;
                color: #333;
                font-weight: bold;
            }
            
            .leaflet-control-zoom {
                border-radius: 10px !important;
                overflow: hidden;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2) !important;
            }
            
            .leaflet-control-zoom a {
                background: linear-gradient(135deg, #FF6B6B, #FF8E8E) !important;
                color: white !important;
                border: 2px solid #FF4757 !important;
                font-weight: bold !important;
                transition: all 0.3s ease !important;
            }
            
            .leaflet-control-zoom a:hover {
                background: linear-gradient(135deg, #FF4757, #FF6B6B) !important;
                transform: scale(1.1) !important;
            }
        `
        document.head.appendChild(style)

        return () => {
            document.head.removeChild(style)
        }
    }, [])

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '20px',
            width: '100%',
            height: '100%',
            padding: '20px',
            minHeight: isMobile ? 'auto' : '700px',
            position: 'relative',

        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                width: isMobile ? '100%' : '50%',
                position: 'relative',
                left: 0,
                top: '0px',
                transform: isMobile ? 'none' : 'perspective(1500px) rotateY(20deg) rotateX(5deg)',
            }}>
                <Typography variant="h6" sx={{
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    marginBottom: '10px',
                    fontSize: isMobile ? '1.5rem' : '5rem',
                }}>
                    Event Location
                </Typography>
                <Typography variant="body1" sx={{
                    color: '#666',
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    fontWeight: '500',
                }}>
                    {eventData.venue.name}
                </Typography>
                <Typography variant="body2" sx={{
                    color: '#888',
                    fontStyle: 'italic',
                    fontSize: { xs: '0.9rem', md: '1rem' },
                }}>
                    {eventData.venue.address}
                </Typography>
                {isMobile && (
                <Typography variant="body2" sx={{
                    color: 'rgba(255, 255, 255, 1)',
                    textAlign: 'center',
                    lineHeight: 1.6,
                    fontSize: { xs: '1rem', md: '1.2rem' },
                }}>
                    The venue is easily accessible by public transport and car. 
                    There's plenty of parking available nearby. 
                    Look for the colorful banners and anime decorations!
                </Typography>
                )}
            </Box>
            
            <Box sx={{
                height: isMobile ? '300px' : '400px',
                width: '100%',
                position: 'relative',
                margin: 'auto',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            }}>
                <MapContainer
                    ref={mapRef}
                    center={[eventData.venue.coordinates.lat, eventData.venue.coordinates.lng]}
                    zoom={15}
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={true}
                    scrollWheelZoom={true}
                    doubleClickZoom={true}
                    dragging={true}
                    touchZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    />
                    <Marker 
                        position={[eventData.venue.coordinates.lat, eventData.venue.coordinates.lng]}
                        icon={createCartoonMarker()}
                    >
                        <Popup>
                            <div style={{
                                textAlign: 'center',
                                fontFamily: 'Freeman, cursive, sans-serif',
                            }}>
                                <h3 style={{
                                    color: '#FF6B6B',
                                    margin: '0 0 10px 0',
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                }}>
                                    {eventData.title}
                                </h3>
                                <p style={{
                                    margin: '5px 0',
                                    fontSize: '0.9rem',
                                    color: '#666',
                                }}>
                                    📅 {eventData.date}
                                </p>
                                <p style={{
                                    margin: '5px 0',
                                    fontSize: '0.9rem',
                                    color: '#666',
                                }}>
                                    ⏰ {eventData.time}
                                </p>
                                <p style={{
                                    margin: '5px 0',
                                    fontSize: '0.9rem',
                                    color: '#666',
                                }}>
                                    🏢 {eventData.venue.name}
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                </MapContainer>
            </Box>
            
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '20px',
                background: 'transparent',
                borderRadius: '15px',
                margin: 'auto',
                transform: isMobile ? 'none' : 'perspective(1500px) rotateY(-20deg) rotateX(5deg)',
            }}>
                <Typography variant="h6" sx={{
                    color: '#FF6B6B',
                    fontWeight: 'bold',
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    textAlign: 'center',
                    marginBottom: '10px',
                }}>
                    🚗 Getting There
                </Typography>
                <Typography variant="body1" sx={{
                    color: 'rgba(255, 255, 255, 1)',
                    textAlign: 'center',
                    lineHeight: 1.6,
                    fontSize: { xs: '1rem', md: '1.2rem' },
                }}>
                    From London:
                    London Euston → Coventry Station
                    Duration: ~1h via Avanti West Coast or London Northwestern Railway
                    <br />
                    From Birmingham:
                    Birmingham New Street → Coventry (20-30 min via West Midlands Railway)
                    or
                    Direct bus from Birmingham: The fast X1 runs between Birmingham → Coventry city centre, every 20 min
                    <br />
                    From Manchester:
                    Manchester Piccadilly → Coventry Station
                    Duration: ~1h via Virgin Trains or West Midlands Railway
                    <br />
                    <br />
                    After Coventry Station:
                    🚶‍♂️ Walk (~20 min) or 🚌 Bus 1/11/21 to Far Gosford Street
                    🚖 Taxi (~5-10 min)
                    <br />
                </Typography>

            </Box>
            {!isMobile && (
                <img src= {mntGif}
                style={{
                    position: 'absolute',
                    left: '0',
                    bottom: '-50px',
                    right: '0',
                    zIndex: -1,
                    scale: '0.6',
                    transform: 'perspective(1500px) rotateY(20deg) rotateX(5deg)',
                }}/>
            )}
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
            description: 'We just joined Facebook! Join our community for discussions, event updates, and more!'
        }
    ]

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            maxHeight: isMobile ? 'auto' : '700px',
            width: '100%',
            height: '100%',
            minHeight: isMobile ? 'auto' : '700px',
            position: 'relative',
            padding: { xs: '20px', md: '0px' },
        }}>
            <Box sx={{
                textAlign: 'center',
                transform: isMobile ? 'none' : 'perspective(1500px) rotateY(20deg) rotateX(5deg)',
                marginBottom: '20px',
            }}>
                <Typography variant="h4" sx={{
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    color: 'white',
                    marginBottom: '10px',
                    fontSize: { xs: '1.5rem', md: '3rem' },
                }}>
                    Connect With Us
                </Typography>
                <Typography variant="body1" sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: { xs: '1rem', md: '1.2rem' },
                    maxWidth: '600px',
                    margin: '0 auto',
                    lineHeight: 1.6,
                }}>
                    Stay updated with the latest news, event announcements, and exclusive content from AniArchive!
                </Typography>
            </Box>

            <Grid container spacing={4} sx={{
                display: 'flex', 
                width: '100%',
                height: '100%',
                gap: '20px',

            }}>
                {socialLinks.map((social, index) => (
                    <Grid key={social.name} size={{ xs: 12, sm: 6 }}>
                        <Card sx={{
                            background: `linear-gradient(135deg, ${social.color}20, ${social.color}10)`,
                            border: `2px solid ${social.color}40`,
                            borderRadius: '20px',
                            boxShadow: `0 8px 32px ${social.color}30`,
                            transition: 'all 0.3s ease-in-out',
                            transform: isMobile ? 'none' : `perspective(1000px) rotateY(${index === 0 ? '20deg' : '-20deg'}) rotateX(5deg)`,
                            '&:hover': {
                                transform: isMobile ? 'scale(1.02)' : `perspective(1000px) rotateY(${index === 0 ? '20deg' : '-20deg'}) rotateX(5deg) scale(1.05)`,
                                boxShadow: `0 12px 40px ${social.color}50`,
                                border: `2px solid ${social.color}80`,
                            },
                        }}
                        className="social-card"
                        >
                            <CardContent sx={{
                                textAlign: 'center',
                                padding: '10px 20px',
                            }}>
                                <Box sx={{
                                    fontSize: '3rem',
                                    marginBottom: '15px',
                                    filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
                                }}>
                                    <img src={social.image} alt={social.name} style={{ width: '10%', height: '10%' }} />
                                </Box>
                                <Typography variant="h5" sx={{
                                    fontWeight: 'bold',
                                    color: social.color,
                                    marginBottom: '10px',
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                                }}>
                                    {social.name}
                                </Typography>
                                <Typography variant="body2" sx={{
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    marginBottom: '20px',
                                    lineHeight: 1.5,
                                    fontSize: { xs: '0.9rem', md: '1rem' },
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
                                        fontFamily: 'Freeman',
                                        borderRadius: '25px',
                                        padding: { xs: '8px 20px', md: '12px 30px' },
                                        textTransform: 'uppercase',
                                        boxShadow: `0 4px 15px ${social.color}50`,
                                        transition: 'all 0.3s ease',
                                        fontSize: { xs: '0.8rem', md: '1rem' },
                                        '&:hover': {
                                            background: `linear-gradient(135deg, ${social.color}CC, ${social.color})`,
                                            transform: 'translateY(-2px)',
                                            boxShadow: `0 6px 20px ${social.color}70`,
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

            <Box sx={{
                textAlign: 'center',
                position: 'relative',
                top: isMobile ? '0px' : '-100px',
                right: 0,
                transform: isMobile ? 'none' : 'perspective(1500px) rotateY(-20deg) rotateX(5deg)',
            }}>
                <Typography variant="h6" sx={{
                    color: '#cbfaa7',
                    fontWeight: 'bold',
                    marginBottom: '15px',
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                }}>
                    Stay Connected!
                </Typography>
                <Typography variant="body1" sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    maxWidth: '500px',
                    margin: '0 auto',
                    lineHeight: 1.6,
                    fontSize: { xs: '0.9rem', md: '1rem' },
                }}>
                    Don't miss out on exclusive announcements, early bird tickets, 
                    and behind-the-scenes content from your favorite anime event!
                </Typography>
            </Box>

            {/* Floating GIF */}
            {!isMobile && (
                <img src={sgGif}
                    style={{
                        position: 'absolute',
                        right: '-100px',
                        bottom: '-100px',
                        scale: '0.4',
                        transform: 'perspective(1000px) rotateY(-20deg) rotateX(10deg)',
                        zIndex: -1,
                    }}
                />
            )}
        </Box>
    )
}

const HeroSection = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const [activeTab, setActiveTab] = useState('event-title')
    const [showFloatingTabBar, setShowFloatingTabBar] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const tabBarRef = useRef(null)
    const modalRef = useRef(null)

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            ([entry]) => {
                setShowFloatingTabBar(!entry.isIntersecting)
            },
            { threshold: 0.1 }
        )
        if (tabBarRef.current) {
            observer.observe(tabBarRef.current)
        }
        return () => {
            if (tabBarRef.current) observer.unobserve(tabBarRef.current)
        }
    }, [])

    const handleMouseMove = (event) => {
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
    }

    const handleEventClick = (event) => {
        setSelectedEvent(event)
    }

    const handleCloseModal = () => {
        setSelectedEvent(null)
        setMousePosition({ x: 0, y: 0 })
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'event-title':
                return <EventTitleTab isMobile={isMobile} />
            case 'more-info':
                return <MoreInfoTab isMobile={isMobile} />
            case 'map':
                return <MapTab isMobile={isMobile} />
            case 'socials':
                return <SocialsTab isMobile={isMobile} />
            default:
                return <EventTitleTab isMobile={isMobile} />
        }
    }

    return (
        <main id="hero" className="hero-section" role="main" aria-label="AniArchive Coventry Event" style={{ padding: '0px' }}>
            <Box sx={{
                padding: '0px',
                minHeight: isMobile ? 'auto' : '600px',
                width: '100%',
                maxWidth: '1200px',
            }}>
                <Box>
                    <Paper sx={{
                        backgroundColor: 'transparent',
                        boxShadow: 'none',  
                    }}>
                        {renderTabContent()}
                    </Paper>
                </Box>
                <Box ref={tabBarRef}
                    className="tab-bar-container"
                    role="navigation"
                    aria-label="Event information navigation"
                    sx={{
                        position: isMobile ? 'relative' : 'sticky',
                        left: isMobile ? '0px' : '100px',
                        bottom: '0',
                        zIndex: 1000,
                        scale: isMobile ? '1' : '1.1',
                        borderRadius: '10px',
                        width: 'fit-content',
                        margin: isMobile ? '20px auto' : '0px',
                    }}>
                    <TabBar activeTab={activeTab} setActiveTab={setActiveTab} isMobile={isMobile} />
                </Box>
            </Box>

            <section aria-labelledby="past-events-heading">
                <Box sx={{ mt: 4, overflow: 'visible' }}>
                    <Typography 
                        id="past-events-heading"
                        variant="h2" 
                        component="h2"
                        sx={{ 
                            mb: 2,
                            textAlign: 'center',
                            fontSize: { xs: '1.5rem', md: '2rem' },
                            fontWeight: 'bold',
                            textShadow: '1px 1px 2px #FFBBA9',
                            textTransform: 'uppercase',
                            color: 'white',
                        }}
                    >
                        Past Events
                    </Typography>
                    <Box sx={{
                        marginBlock: '50px',
                        display: 'flex',
                        gap: { xs: '20px', md: '50px' },
                        justifyContent: 'center',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: 'center',
                        overflow: 'visible',
                    }} 
                    className="past-events-container"
                    role="list"
                    aria-label="Gallery of past AniArchive events"
                    >
                        {eventData.pastEvents.map((event, index) => (
                            <Paper 
                                key={index} 
                                elevation={2} 
                                component="article"
                                role="listitem"
                                sx={{ 
                                    overflow: 'visible',
                                    marginBlock: '50px',
                                    height: { xs: '100px', md: '280px' },
                                    objectFit: 'cover',    
                                    cursor: 'pointer',

                                    '&:hover': {
                                        scale: '1.1',
                                        transition: 'transform 0.3s ease-in-out',
                                    },
                                }}
                                className="past-event-item"
                                onClick={() => handleEventClick(event)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault()
                                        handleEventClick(event)
                                    }
                                }}
                                tabIndex={0}
                                aria-label={`View details for ${event.title}`}
                            >
                                <img 
                                    src={event.image} 
                                    alt={`${event.title} event poster`}
                                    style={{ width: '100%', height: '100%'}}
                                    loading="lazy"
                                />
                            </Paper>
                        ))}
                    </Box>
                </Box>
            </section>

            {/* Event Modal */}
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
                                    {selectedEvent.date}
                                </Typography>
                            )}
                    </Box>
                </Box>
            </Modal>
        </main>
    )
}

export default HeroSection
