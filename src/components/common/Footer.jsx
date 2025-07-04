import React from 'react'
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'

const Footer = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  
  return (
    <footer className="bg-gray-900 text-white py-6 mt-12"
    style={{
      padding: isMobile ? '1rem 0' : '1.5rem 0',
      marginTop: isMobile ? '2rem' : '3rem',
    }}>
      <div className="container text-center">
        <Typography variant="body2" className="text-sm" style={{
          fontSize: isMobile ? '0.8rem' : '0.875rem',
        }}>&copy; {new Date().getFullYear()} AniArchive. All rights reserved.</Typography>
        <Box className="mt-2 flex justify-center space-x-4 social-links"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: isMobile ? '0.5rem' : '1rem',
          marginTop: isMobile ? '0.5rem' : '1rem',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
        }}
        >
          <a href="https://instagram.com/theaniarchive" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400" style={{
            fontSize: isMobile ? '0.8rem' : '1rem',
            fontFamily: 'Freeman, Comic Sans MS, cursive',
            background: 'linear-gradient(90deg, #FF6B6B, #FFD776 80%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '2px 2px 0 #fff, 0 2px 8px #FF6B6B44',
            transform: 'skew(-8deg, 0deg)',
            transition: 'all 0.2s cubic-bezier(.4,2,.6,1)',
          }}
          onMouseOver={e => { e.currentTarget.style.transform = 'skew(-16deg, 0deg) scale(1.08)'; e.currentTarget.style.textShadow = '0 0 8px #FF6B6B, 2px 2px 0 #fff'; }}
          onMouseOut={e => { e.currentTarget.style.transform = 'skew(-8deg, 0deg)'; e.currentTarget.style.textShadow = '2px 2px 0 #fff, 0 2px 8px #FF6B6B44'; }}
          >Instagram</a>
          <a href="https://facebook.com/share/1X5nn3uunk/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600" style={{
            fontSize: isMobile ? '0.8rem' : '1rem',
            fontFamily: 'Freeman, Comic Sans MS, cursive',
            background: 'linear-gradient(90deg, #4A90E2, #FFD776 80%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '2px 2px 0 #fff, 0 2px 8px #4A90E244',
            transform: 'skew(-8deg, 0deg)',
            transition: 'all 0.2s cubic-bezier(.4,2,.6,1)',
          }}
          onMouseOver={e => { e.currentTarget.style.transform = 'skew(-16deg, 0deg) scale(1.08)'; e.currentTarget.style.textShadow = '0 0 8px #4A90E2, 2px 2px 0 #fff'; }}
          onMouseOut={e => { e.currentTarget.style.transform = 'skew(-8deg, 0deg)'; e.currentTarget.style.textShadow = '2px 2px 0 #fff, 0 2px 8px #4A90E244'; }}
          >Facebook</a>
          <a href="https://www.instagram.com/sekai.senshi.uk/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400" style={{
            fontSize: isMobile ? '0.8rem' : '1rem',
            fontFamily: 'Freeman, Comic Sans MS, cursive',
            background: 'linear-gradient(90deg, #D94F8A, #FFD776 80%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '2px 2px 0 #fff, 0 2px 8px #D94F8A44',
            transform: 'skew(-8deg, 0deg)',
            transition: 'all 0.2s cubic-bezier(.4,2,.6,1)',
          }}
          onMouseOver={e => { e.currentTarget.style.transform = 'skew(-16deg, 0deg) scale(1.08)'; e.currentTarget.style.textShadow = '0 0 8px #D94F8A, 2px 2px 0 #fff'; }}
          onMouseOut={e => { e.currentTarget.style.transform = 'skew(-8deg, 0deg)'; e.currentTarget.style.textShadow = '2px 2px 0 #fff, 0 2px 8px #D94F8A44'; }}
          >Sekai Senshi - Walsall</a>
        </Box>
      </div>
    </footer>
  )
}

export default Footer 