import React from 'react'
import { Box, Typography, Container, Grid, Card, CardContent, Avatar, Chip, useTheme, useMediaQuery, Divider, Paper } from '@mui/material'
import { Event as EventIcon, LocationOn as LocationIcon, Group as GroupIcon, EmojiEvents as TrophyIcon, Star as StarIcon, Favorite as FavoriteIcon } from '@mui/icons-material'
import { colors } from '../../styles/theme'

const AboutSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

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
                <Grid container spacing={6}>
                    {/* Main Content */}
                    <Grid size={{ xs: 12, lg: 8 }}>
                        {/* Hero Title Section */}
                        <Box sx={{ mb: 6, textAlign: { xs: 'center', lg: 'left' } }}>
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
                                About AniArchive
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
                                Bringing Anime Marketplaces, Conventions and Events to the UK.
                            </Typography>

                            {/* Decorative line */}
                            <Box sx={{ 
                                width: { xs: '60px', md: '80px' }, 
                                height: '4px', 
                                background: 'linear-gradient(90deg, #ff6b6b, #feca57)',
                                borderRadius: '2px',
                                mx: { xs: 'auto', lg: 0 },
                                mb: 4
                            }} />
                        </Box>

                        {/* Main Content Text */}
                        <Box sx={{ mb: 6 }}>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    color: 'rgba(255,255,255,0.9)',
                                    fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
                                    lineHeight: 1.8,
                                    mb: 3,
                                    fontWeight: 400,
                                    textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                }}
                            >
                                <strong style={{ color: colors.primary.main, fontSize: '1.1em' }}>AniArchive </strong>
                                (also known as "The Anime Archive" or "The AniArchive") is a growing company of anime and gaming enthusiasts, 
                                bringing together fans from across the UK. We aim to host a safe inclusive and friendly space for all.
                                We feature the best in anime culture bringing you challenges and activities with prizes, gaming tournaments,
                                 cosplay competitions, and exclusive merchandise.
                            </Typography>
                            
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    color: 'rgba(255,255,255,0.9)',
                                    fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
                                    lineHeight: 1.8,
                                    mb: 3,
                                    fontWeight: 400,
                                    textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                }}
                            >
                                As a emerging <strong>anime convention</strong> in the UK, we pride ourselves on creating an inclusive and safe
                                environment where anime enthusiasts, gamers, and cosplayers can celebrate their passions together. 
                                Our <strong>anime events</strong> feature retro gaming stations, artist alley, TCG tournaments, 
                                and amazing giveaways that keep attendees coming back year after year.
                                 We are a growing company and we are always looking for new ideas and new ways to grow. We are based in West Midlands, UK.
                            </Typography>
                            
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    color: 'rgba(255,255,255,0.9)',
                                    fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
                                    lineHeight: 1.8,
                                    fontWeight: 400,
                                    textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                }}
                            >
                                Whether you're searching for a fun day out, unique, niche or exclusive merchandise, fanmade merch from talanted artists,
                                 or a way to connect with your local community, 
                                you've found the perfect destination for your <strong>anime and gaming adventure</strong>. Join us at the next <strong>AniArchive event</strong> and experience the ultimate <strong>anime convention</strong> in the Midlands.
                            </Typography>
                        </Box>

                        {/* Event Highlights Cards */}
                        <Grid container spacing={3} sx={{ mb: 6, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Card sx={{ 
                                    background: 'rgba(255,255,255,0.15)',
                                    backdropFilter: 'blur(15px)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    borderRadius: '16px',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                        background: 'rgba(255,255,255,0.2)'
                                    }
                                }}>
                                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                        <Box sx={{ 
                                            width: 60, 
                                            height: 60, 
                                            borderRadius: '50%', 
                                            background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mx: 'auto',
                                            mb: 2
                                        }}>
                                            <EventIcon sx={{ fontSize: 30, color: 'white' }} />
                                        </Box>
                                        <Typography variant="h6" sx={{ 
                                            color: 'white', 
                                            mb: 1, 
                                            fontSize: { xs: '1.1rem', md: '1.2rem' },
                                            fontWeight: 600
                                        }}>
                                            Regular Events
                                        </Typography>
                                        <Typography variant="body2" sx={{ 
                                            color: 'rgba(255,255,255,0.8)',
                                            fontSize: { xs: '0.9rem', md: '1rem' }
                                        }}>
                                            Monthly anime and gaming meetups around the UK
                                            coming in 2026.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Card sx={{ 
                                    background: 'rgba(255,255,255,0.15)',
                                    backdropFilter: 'blur(15px)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    borderRadius: '16px',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                        background: 'rgba(255,255,255,0.2)'
                                    }
                                }}>
                                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                        <Box sx={{ 
                                            width: 60, 
                                            height: 60, 
                                            borderRadius: '50%', 
                                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mx: 'auto',
                                            mb: 2
                                        }}>
                                            <LocationIcon sx={{ fontSize: 30, color: 'white' }} />
                                        </Box>
                                        <Typography variant="h6" sx={{ 
                                            color: 'white', 
                                            mb: 1, 
                                            fontSize: { xs: '1.1rem', md: '1.2rem' },
                                            fontWeight: 600
                                        }}>
                                            Midlands Based
                                        </Typography>
                                        <Typography variant="body2" sx={{ 
                                            color: 'rgba(255,255,255,0.8)',
                                            fontSize: { xs: '0.9rem', md: '1rem' }
                                        }}>
                                            Frequent events in the Midlands area. Let us know if you want to host an event in your area.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Sidebar */}
                    <Grid size={{ xs: 12, lg: 4 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , margin: 'auto' }}>
                        <Paper sx={{ 
                            background: 'rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '20px',
                            p: 4,
                            border: '1px solid rgba(255,255,255,0.2)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                            height: 'fit-content',
                            position: 'sticky',
                            top: 20
                        }}>
                            <Typography variant="h3" sx={{ 
                                color: 'white', 
                                mb: 4, 
                                textAlign: 'center',
                                fontSize: { xs: '1.8rem', md: '2rem' },
                                fontWeight: 700
                            }}>
                                Event Features
                            </Typography>
                            
                            <Box sx={{ mb: 4 }}>
                                {[
                                    { icon: <TrophyIcon />, text: 'Cosplay Competitions', color: colors.primary.main },
                                    { icon: <GroupIcon />, text: 'Artist Alley', color: colors.secondary.main },
                                    { icon: <EventIcon />, text: 'Retro Gaming', color: colors.accent.main },
                                    { icon: <LocationIcon />, text: 'TCG Tournaments', color: colors.info.main }
                                ].map((feature, index) => (
                                    <Box key={index} sx={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        mb: 3,
                                        p: 2,
                                        borderRadius: '12px',
                                        background: 'rgba(255,255,255,0.1)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            background: 'rgba(255,255,255,0.15)',
                                            transform: 'translateX(5px)'
                                        }
                                    }}>
                                        <Avatar sx={{ 
                                            bgcolor: feature.color, 
                                            mr: 2,
                                            width: 45,
                                            height: 45,
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                                        }}>
                                            {feature.icon}
                                        </Avatar>
                                        <Typography variant="body1" sx={{ 
                                            color: 'white',
                                            fontSize: { xs: '1rem', md: '1.1rem' },
                                            fontWeight: 500
                                        }}>
                                            {feature.text}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                            
                            <Divider sx={{ 
                                borderColor: 'rgba(255,255,255,0.2)', 
                                mb: 3 
                            }} />
                            
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="body1" sx={{ 
                                    color: 'rgba(255,255,255,0.9)', 
                                    fontSize: { xs: '1rem', md: '1.1rem' },
                                    lineHeight: 1.6,
                                    mb: 2
                                }}>
                                    Join thousands of anime and gaming fans at the Midlands' premier anime convention!
                                </Typography>
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    gap: 1 
                                }}>
                                    <FavoriteIcon sx={{ color: colors.primary.main, fontSize: 20 }} />
                                    <FavoriteIcon sx={{ color: colors.secondary.main, fontSize: 20 }} />
                                    <FavoriteIcon sx={{ color: colors.accent.main, fontSize: 20 }} />
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default AboutSection;