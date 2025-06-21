import React from 'react'
import { Link } from 'react-router-dom'
import { Box, useTheme, useMediaQuery } from '@mui/material'

const Header = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about'},
  ]

  return (
    <header className="header"
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      height: isMobile ? '60px' : '80px',
      padding: isMobile ? '5px' : '10px',
      backgroundColor: 'rgba(169, 237, 255, 0.2)',
      boxShadow: '0 -2px 8px rgba(0,0,0,0.2)',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
    }}>
          <nav 
            className="nav-items font-rubik-vinyl" 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: isMobile ? '1rem' : '2rem',
              padding: isMobile ? '5px' : '10px',
              minWidth: '100%',
              fontSize: isMobile ? '1.2rem' : '1.5rem',
            }}
          >
            {navItems.map((item, index) => (
              <Link 
                key={index} 
                to={item.href}
                className="nav-item font-medium"
                style={{
                  textDecoration: 'none',
                  color: 'black',
                  fontSize: isMobile ? '1.2rem' : '1.5rem',
                  transition: 'color 0.2s ease-in-out',
                  fontWeight: 'bold',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#ffe6a9';
                  e.target.style.transition = 'color 0.2s ease-in-out';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'black';
                  e.target.style.transition = 'color 0.2s ease-in-out';
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
    </header>
  )
}

export default Header 