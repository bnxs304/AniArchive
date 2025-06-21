import React from 'react'
import { Link } from 'react-router-dom'
import { Box, useTheme, useMediaQuery } from '@mui/material'

const Header = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  
  const navItems = [
    { label: 'About', href: '/about', ariaLabel: 'Learn more about AniArchive'},
  ]

  return (
    <header 
      className="header"
      role="banner"
      aria-label="Main navigation"
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
      }}
    >
      <div className="header-container" style={{ width: '100%' }}>
        <nav 
          className="nav-items font-rubik-vinyl" 
          role="navigation"
          aria-label="Primary navigation"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: isMobile ? '1rem' : '2rem',
            padding: isMobile ? '5px' : '10px',
            minWidth: '100%',
            fontSize: isMobile ? '1.2rem' : '1.5rem',
          }}
        >
          <div className="nav-brand">
            <Link 
              to="/"
              className="nav-brand-link"
              aria-label="AniArchive - Home"
              style={{
                textDecoration: 'none',
                color: 'black',
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                fontWeight: 'bold',
                transition: 'color 0.2s ease-in-out',
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
              Home
            </Link>
          </div>
          
          <ul 
            className="nav-menu"
            style={{
              display: 'flex',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              gap: isMobile ? '1rem' : '2rem',
            }}
          >
            {navItems.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.href}
                  className="nav-item font-medium"
                  aria-label={item.ariaLabel}
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
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header 