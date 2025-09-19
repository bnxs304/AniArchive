import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, useTheme, useMediaQuery, Menu, MenuItem, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import { getCurrentSubdomain, getNavigationItems, getGetInvolvedItems, getMainDomainUrl } from '../../utils/subdomain'
import { getCurrentEvent } from '../../data/eventData'

const Header = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const currentSubdomain = getCurrentSubdomain()
  const navItems = getNavigationItems(currentSubdomain)
  const getInvolvedItems = getGetInvolvedItems()
  const currentEvent = getCurrentEvent(currentSubdomain)
  
  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false)
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
        padding: isMobile ? '8px' : '10px',
        backgroundColor: 'rgba(169, 237, 255, 0.2)',
        boxShadow: '0 -2px 8px rgba(0,0,0,0.2)',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
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
            alignItems: 'center',
            gap: isMobile ? '0.5rem' : '2rem',
            padding: isMobile ? '5px' : '10px',
            minWidth: '100%',
            fontSize: isMobile ? '1rem' : '1.5rem',
            flexWrap: 'nowrap',
            overflow: 'hidden'
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
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <ul 
              className="nav-menu"
              style={{
                display: 'flex',
                listStyle: 'none',
                margin: 0,
                padding: 0,
                gap: '2rem',
                alignItems: 'center',
                flexWrap: 'nowrap',
                overflow: 'hidden'
              }}
            >
              {/* Get Tickets Button - Only show on subdomains, positioned before Get Involved */}
              {currentSubdomain && currentEvent && (
                <li>
                  <Button
                    variant="contained"
                    href={currentEvent.ticketLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      background: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
                      color: 'white',
                      fontWeight: 'bold',
                      borderRadius: '20px',
                      padding: '10px 24px',
                      fontSize: '1rem',
                      textTransform: 'uppercase',
                      boxShadow: '0 4px 16px rgba(255, 107, 107, 0.3)',
                      minWidth: '120px',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #FF5252, #FF7979)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(255, 107, 107, 0.4)',
                      },
                    }}
                  >
                    Get Tickets
                  </Button>
                </li>
              )}
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
                          fontSize: '1.5rem',
                          transition: 'color 0.2s ease-in-out',
                          fontWeight: 'bold',
                          textTransform: 'none',
                          minWidth: 'auto',
                          padding: '0',
                          minHeight: '44px',
                          display: 'flex',
                          alignItems: 'center'
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
                              fontSize: '1.2rem',
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
                        fontSize: '1.5rem',
                        transition: 'color 0.2s ease-in-out',
                        fontWeight: 'bold',
                        minHeight: '44px',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '8px 4px'
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
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Get Tickets Button for Mobile */}
              {currentSubdomain && currentEvent && (
                <Button
                  variant="contained"
                  href={currentEvent.ticketLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    background: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: '15px',
                    padding: '6px 12px',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    boxShadow: '0 4px 16px rgba(255, 107, 107, 0.3)',
                    minWidth: 'auto',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #FF5252, #FF7979)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(255, 107, 107, 0.4)',
                    },
                  }}
                >
                  Tickets
                </Button>
              )}
              
              {/* Mobile Menu Button */}
              <IconButton
                onClick={handleMobileMenuToggle}
                sx={{
                  color: 'black',
                  padding: '8px',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 230, 169, 0.2)',
                  }
                }}
                aria-label="Open navigation menu"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </nav>
      </div>
      
      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuClose}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(169, 237, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            width: '280px',
            padding: '20px 0',
          }
        }}
      >
        <List sx={{ padding: 0 }}>
          {navItems.map((item, index) => (
            <ListItem key={index} sx={{ padding: 0 }}>
              {item.hasDropdown ? (
                <Box sx={{ width: '100%' }}>
                  <ListItemText
                    primary={item.label}
                    sx={{
                      padding: '12px 20px',
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      color: 'black',
                      borderBottom: '1px solid rgba(0,0,0,0.1)',
                    }}
                  />
                  {getInvolvedItems.map((dropdownItem, idx) => (
                    <ListItem key={idx} sx={{ padding: 0 }}>
                      <Link 
                        to={dropdownItem.href}
                        onClick={handleMobileMenuClose}
                        style={{
                          textDecoration: 'none',
                          color: 'black',
                          width: '100%',
                          display: 'block',
                          padding: '8px 40px',
                          fontSize: '1rem',
                          fontWeight: '500',
                          borderBottom: '1px solid rgba(0,0,0,0.05)',
                        }}
                      >
                        {dropdownItem.label}
                      </Link>
                    </ListItem>
                  ))}
                </Box>
              ) : (
                <Link 
                  to={item.href}
                  onClick={handleMobileMenuClose}
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                    width: '100%',
                    display: 'block',
                    padding: '12px 20px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    borderBottom: '1px solid rgba(0,0,0,0.1)',
                  }}
                >
                  {item.label}
                </Link>
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </header>
  )
}

export default Header 