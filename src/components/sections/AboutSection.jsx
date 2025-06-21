import React from 'react'
import { Box, Typography} from '@mui/material'

const AboutSection = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: { xs: '20px', md: '40px' },
            px: { xs: 2, sm: 3, md: 4 },
        }}>
            <div className="hero-content" style={{position: 'relative', zIndex: 1}}>
                <Typography variant="body1" className="hero-description"
                        sx={{
                            textAlign: 'center',
                            width: { xs: '100%', md: '70%' },
                            margin: 'auto',
                            fontSize: { xs: '1rem', md: '1.2rem' },
                            lineHeight: { xs: 1.5, md: 1.6 },
                        }}>
                            The AniArchive hosts FREE events for anime fans to share and showcase their love for anime and games, 
                            get access to a wide range of merchandise, and connect with the local anime community.
                        </Typography>
                    </div>
        </Box>
    )
}

export default AboutSection;