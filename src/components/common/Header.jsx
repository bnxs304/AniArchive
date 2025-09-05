import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, useTheme, useMediaQuery, Menu, MenuItem, Button } from '@mui/material'
import { getCurrentSubdomain, getNavigationItems, getGetInvolvedItems, getMainDomainUrl } from '../../utils/subdomain'

const Header = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const currentSubdomain = getCurrentSubdomain()
  const navItems = getNavigationItems(currentSubdomain)
  const getInvolvedItems = getGetInvolvedItems()
  
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleGetInvolvedClick = (event) => {
    if (event.target.textContent === 'Get Involved') {
      event.preventDefault()
      handleClick(event)
    }
  }

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
              to={currentSubdomain ? `/${currentSubdomain}` : "/"}
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
              {currentSubdomain ? `Anime Con ${currentSubdomain.charAt(0).toUpperCase() + currentSubdomain.slice(1)}` : 'Home'}
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
                {item.hasDropdown ? (
                  <>
                    <Button
                      onClick={handleClick}
                      className="nav-item font-medium"
                      aria-label={item.ariaLabel}
                      style={{
                        textDecoration: 'none',
                        color: 'black',
                        fontSize: isMobile ? '1.2rem' : '1.5rem',
                        transition: 'color 0.2s ease-in-out',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        minWidth: 'auto',
                        padding: '0',
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
                      {item.label} ▼
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'get-involved-button',
                      }}
                      PaperProps={{
                        style: {
                          backgroundColor: 'rgba(169, 237, 255, 0.95)',
                          borderRadius: '10px',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                        }
                      }}
                    >
                      {getInvolvedItems.map((dropdownItem, idx) => (
                        <MenuItem 
                          key={idx} 
                          onClick={handleClose}
                          style={{
                            fontSize: isMobile ? '1rem' : '1.2rem',
                            fontWeight: 'bold',
                            color: 'black',
                          }}
                        >
                          <Link 
                            to={dropdownItem.href}
                            style={{
                              textDecoration: 'none',
                              color: 'inherit',
                              width: '100%',
                            }}
                          >
                            {dropdownItem.label}
                          </Link>
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : (
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
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header 