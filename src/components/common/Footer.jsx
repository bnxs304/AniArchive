import React from 'react'
import { Box, Typography, useTheme, useMediaQuery, Button } from '@mui/material'
import { getCurrentSubdomain, getMainDomainUrl } from '../../utils/subdomain'
import { colors } from '../../styles/theme'

const Footer = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const currentSubdomain = getCurrentSubdomain()
  const mainDomainUrl = getMainDomainUrl()
  
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
          gap: isMobile ? '1rem' : '1rem',
          marginTop: isMobile ? '0.5rem' : '1rem',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          flexWrap: 'wrap'
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
          <a href="https://www.facebook.com/profile.php?id=61581434721974" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600" style={{
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
          
          {/* Small Visit Main Site Link for Subdomains */}
          {currentSubdomain && (
            <a 
              href={mainDomainUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: isMobile ? '0.7rem' : '0.8rem',
                fontFamily: 'Freeman, Comic Sans MS, cursive',
                color: colors.info.main,
                textDecoration: 'none',
                opacity: 0.8,
                transition: 'opacity 0.2s ease',
              }}
              onMouseOver={e => { e.currentTarget.style.opacity = '1'; }}
              onMouseOut={e => { e.currentTarget.style.opacity = '0.8'; }}
            >
              Visit Main Site
            </a>
          )}
        </Box>
      </div>
    </footer>
  )
}

export default Footer 