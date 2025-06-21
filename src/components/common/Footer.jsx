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
            fontSize: isMobile ? '0.9rem' : '1rem',
          }}>Instagram</a>
          <a href="https://facebook.com/share/1X5nn3uunk/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600" style={{
            fontSize: isMobile ? '0.9rem' : '1rem',
          }}>Facebook</a>
        </Box>
      </div>
    </footer>
  )
}

export default Footer 