import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Tabs,
  Tab,
  IconButton,
  useTheme,
  useMediaQuery,
  Stack,
  Divider
} from '@mui/material'
import { getRSVPCount, getRSVPStats } from '../../services/rsvpService'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db, adminLogout, getCurrentUser, onAuthChange } from '../../config/firebase'
import RaffleDrawer from './RaffleDrawer'
import AdminLogin from './AdminLogin'

const RSVPAdmin = () => {
  const [rsvps, setRsvps] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [totalCount, setTotalCount] = useState(0)
  const [stats, setStats] = useState({ total: 0, today: 0, thisWeek: 0 })
  const [activeTab, setActiveTab] = useState(0)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    // Set up authentication listener
    const unsubscribe = onAuthChange((user) => {
      if (user) {
        setIsAuthenticated(true)
        fetchRSVPs()
        fetchStats()
      } else {
        setIsAuthenticated(false)
        setRsvps([])
        setStats({ total: 0, today: 0, thisWeek: 0 })
        setActiveTab(0)
      }
      setLoading(false)
    })

    // Check if user is already authenticated
    const currentUser = getCurrentUser()
    if (currentUser) {
      setIsAuthenticated(true)
      fetchRSVPs()
      fetchStats()
    } else {
      setLoading(false)
    }

    return () => unsubscribe()
  }, [])

  const fetchRSVPs = async () => {
    try {
      setLoading(true)
      const q = query(collection(db, 'rsvps'), orderBy('timestamp', 'desc'))
      const querySnapshot = await getDocs(q)
      
      const rsvpData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.() || new Date(doc.data().timestamp)
      }))
      
      setRsvps(rsvpData)
      setTotalCount(rsvpData.length)
    } catch (error) {
      console.error('Error fetching RSVPs:', error)
      setError('Failed to load RSVP data')
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const statsData = await getRSVPStats()
      setStats(statsData)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const exportToCSV = () => {
    const headers = ['Email', 'Raffle Code', 'Timestamp', 'Event Title', 'Event Date']
    const csvContent = [
      headers.join(','),
      ...rsvps.map(rsvp => [
        rsvp.email,
        rsvp.raffleCode,
        rsvp.timestamp.toLocaleString(),
        rsvp.eventTitle,
        rsvp.eventDate
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `rsvp-data-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const refreshData = () => {
    fetchRSVPs()
    fetchStats()
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleLogout = async () => {
    try {
      const result = await adminLogout()
      if (result.success) {
        sessionStorage.removeItem('adminAuthenticated')
        setIsAuthenticated(false)
        setRsvps([])
        setStats({ total: 0, today: 0, thisWeek: 0 })
        setActiveTab(0)
      } else {
        console.error('Logout error:', result.error)
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />
  }

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh',
        flexDirection: 'column',
        gap: 2,
        p: { xs: 2, md: 4 }
      }}>
        <CircularProgress 
          size={isMobile ? 50 : 60}
          sx={{
            color: '#FF6B6B',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
        <Typography variant="h6" sx={{ 
          color: 'white', 
          fontFamily: 'Freeman',
          fontSize: { xs: '1rem', md: '1.25rem' },
          textAlign: 'center'
        }}>
          Loading Admin Panel...
        </Typography>
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: '600px', margin: '0 auto' }}>
        <Alert 
          severity="error" 
          sx={{ 
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '15px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          {error}
        </Alert>
      </Box>
    )
  }

  // Mobile-friendly RSVP card component
  const MobileRSVPCard = ({ rsvp }) => (
    <Card sx={{
      mb: 2,
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '15px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    }}>
      <CardContent sx={{ p: 2 }}>
        <Stack spacing={1.5}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle2" sx={{ 
              color: '#666', 
              fontFamily: 'Freeman',
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Email
            </Typography>
            <Typography variant="body2" sx={{ 
              fontFamily: 'Freeman',
              fontWeight: 'bold',
              wordBreak: 'break-all'
            }}>
              {rsvp.email}
            </Typography>
          </Box>
          
          <Divider />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle2" sx={{ 
              color: '#666', 
              fontFamily: 'Freeman',
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Raffle Code
            </Typography>
            <Chip 
              label={rsvp.raffleCode} 
              size="small" 
              sx={{ 
                background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                color: 'white',
                fontFamily: 'monospace',
                fontWeight: 'bold',
                fontSize: '0.7rem',
                boxShadow: '0 2px 8px rgba(78, 205, 196, 0.3)',
              }} 
            />
          </Box>
          
          <Divider />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle2" sx={{ 
              color: '#666', 
              fontFamily: 'Freeman',
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Event
            </Typography>
            <Typography variant="body2" sx={{ 
              fontFamily: 'Freeman',
              fontWeight: 'bold',
              textAlign: 'right',
              maxWidth: '60%'
            }}>
              {rsvp.eventTitle}
            </Typography>
          </Box>
          
          <Divider />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle2" sx={{ 
              color: '#666', 
              fontFamily: 'Freeman',
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Date
            </Typography>
            <Typography variant="body2" sx={{ 
              fontFamily: 'Freeman',
              fontSize: '0.8rem'
            }}>
              {rsvp.eventDate}
            </Typography>
          </Box>
          
          <Divider />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle2" sx={{ 
              color: '#666', 
              fontFamily: 'Freeman',
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Time
            </Typography>
            <Typography variant="body2" sx={{ 
              fontFamily: 'Freeman',
              fontSize: '0.8rem'
            }}>
              {rsvp.timestamp.toLocaleString()}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )

  const renderRSVPManagement = () => (
    <>
      {/* Statistics Cards */}
      <Grid container spacing={isMobile ? 2 : 3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #FF6B6B, #FFB56B)',
            color: 'white',
            textAlign: 'center',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(255, 107, 107, 0.3)',
            transition: 'all 0.3s ease-in-out',
            transform: isMobile ? 'none' : 'perspective(1000px) rotateY(5deg) rotateX(2deg)',
            '&:hover': {
              transform: isMobile ? 'scale(1.02)' : 'perspective(1000px) rotateY(5deg) rotateX(2deg) scale(1.05)',
              boxShadow: '0 12px 40px rgba(255, 107, 107, 0.4)',
            },
          }}>
            <CardContent sx={{ p: isMobile ? 2 : 3 }}>
              <Typography variant={isMobile ? "h4" : "h3"} sx={{ 
                fontWeight: 'bold',
                fontFamily: 'Rubik Vinyl, cursive',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                mb: 1,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
              }}>
                {stats.total}
              </Typography>
              <Typography variant={isMobile ? "body1" : "h6"} sx={{ 
                fontFamily: 'Freeman, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontSize: { xs: '0.8rem', sm: '1rem' }
              }}>
                Total RSVPs
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
            color: 'white',
            textAlign: 'center',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(78, 205, 196, 0.3)',
            transition: 'all 0.3s ease-in-out',
            transform: isMobile ? 'none' : 'perspective(1000px) rotateY(-5deg) rotateX(2deg)',
            '&:hover': {
              transform: isMobile ? 'scale(1.02)' : 'perspective(1000px) rotateY(-5deg) rotateX(2deg) scale(1.05)',
              boxShadow: '0 12px 40px rgba(78, 205, 196, 0.4)',
            },
          }}>
            <CardContent sx={{ p: isMobile ? 2 : 3 }}>
              <Typography variant={isMobile ? "h4" : "h3"} sx={{ 
                fontWeight: 'bold',
                fontFamily: 'Rubik Vinyl, cursive',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                mb: 1,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
              }}>
                {stats.thisWeek}
              </Typography>
              <Typography variant={isMobile ? "body1" : "h6"} sx={{ 
                fontFamily: 'Freeman, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontSize: { xs: '0.8rem', sm: '1rem' }
              }}>
                This Week
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #FFE66D, #FFB56B)',
            color: 'white',
            textAlign: 'center',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(255, 230, 109, 0.3)',
            transition: 'all 0.3s ease-in-out',
            transform: isMobile ? 'none' : 'perspective(1000px) rotateY(5deg) rotateX(-2deg)',
            '&:hover': {
              transform: isMobile ? 'scale(1.02)' : 'perspective(1000px) rotateY(5deg) rotateX(-2deg) scale(1.05)',
              boxShadow: '0 12px 40px rgba(255, 230, 109, 0.4)',
            },
          }}>
            <CardContent sx={{ p: isMobile ? 2 : 3 }}>
              <Typography variant={isMobile ? "h4" : "h3"} sx={{ 
                fontWeight: 'bold',
                fontFamily: 'Rubik Vinyl, cursive',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                mb: 1,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
              }}>
                {stats.today}
              </Typography>
              <Typography variant={isMobile ? "body1" : "h6"} sx={{ 
                fontFamily: 'Freeman, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontSize: { xs: '0.8rem', sm: '1rem' }
              }}>
                Today
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Action Bar */}
      <Box sx={{ 
        mb: 4, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: 2,
        p: isMobile ? 2 : 3,
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        flexDirection: isSmallMobile ? 'column' : 'row',
      }}>
        <Typography variant={isMobile ? "h6" : "h5"} sx={{ 
          color: 'white', 
          fontFamily: 'Freeman, sans-serif',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          textAlign: isSmallMobile ? 'center' : 'left',
          fontSize: { xs: '1rem', sm: '1.25rem' }
        }}>
          Total RSVPs: {totalCount}
        </Typography>
        <Stack 
          direction={isSmallMobile ? 'column' : 'row'} 
          spacing={2} 
          sx={{ width: isSmallMobile ? '100%' : 'auto' }}
        >
          <Button
            variant="contained"
            onClick={refreshData}
            fullWidth={isSmallMobile}
            sx={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              fontFamily: 'Freeman, sans-serif',
              borderRadius: '25px',
              padding: isMobile ? '10px 20px' : '12px 24px',
              textTransform: 'uppercase',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s ease',
              fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' },
              minHeight: isMobile ? '44px' : 'auto',
              '&:hover': {
                background: 'linear-gradient(135deg, #764ba2, #667eea)',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
              },
            }}
          >
            Refresh Data
          </Button>
          <Button
            variant="contained"
            onClick={exportToCSV}
            fullWidth={isSmallMobile}
            sx={{
              background: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
              color: 'white',
              fontFamily: 'Freeman, sans-serif',
              borderRadius: '25px',
              padding: isMobile ? '10px 20px' : '12px 24px',
              textTransform: 'uppercase',
              boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)',
              transition: 'all 0.3s ease',
              fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' },
              minHeight: isMobile ? '44px' : 'auto',
              '&:hover': {
                background: 'linear-gradient(135deg, #FF4757, #FF6B6B)',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(255, 107, 107, 0.6)',
              },
            }}
          >
            Export CSV
          </Button>
        </Stack>
      </Box>

      {/* RSVP Data Display */}
      {isMobile ? (
        // Mobile Card Layout
        <Box>
          {rsvps.length > 0 ? (
            rsvps.map((rsvp) => (
              <MobileRSVPCard key={rsvp.id} rsvp={rsvp} />
            ))
          ) : (
            <Box sx={{ 
              textAlign: 'center', 
              mt: 4,
              p: 4,
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}>
              <Typography variant="h6" sx={{ 
                color: 'white', 
                fontFamily: 'Freeman, sans-serif',
                mb: 2,
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}>
                No RSVPs Found Yet
              </Typography>
              <Typography variant="body2" sx={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: 'Freeman, sans-serif',
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}>
                RSVPs will appear here once people start registering for events.
              </Typography>
            </Box>
          )}
        </Box>
      ) : (
        // Desktop Table Layout
        <>
          <TableContainer component={Paper} sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            overflow: 'hidden',
          }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: 'linear-gradient(135deg, #FF8E8E, #B56BFF, #FF8E8E)' }}>
                  <TableCell sx={{ 
                    fontWeight: 'bold', 
                    color: 'white',
                    fontFamily: 'Freeman, sans-serif',
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Email
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 'bold', 
                    color: 'white',
                    fontFamily: 'Freeman, sans-serif',
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Raffle Code
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 'bold', 
                    color: 'white',
                    fontFamily: 'Freeman, sans-serif',
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Timestamp
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 'bold', 
                    color: 'white',
                    fontFamily: 'Freeman, sans-serif',
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Event Title
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 'bold', 
                    color: 'white',
                    fontFamily: 'Freeman, sans-serif',
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Event Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rsvps.map((rsvp, index) => (
                  <TableRow 
                    key={rsvp.id}
                    sx={{
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 107, 107, 0.1)',
                        transform: 'scale(1.01)',
                      },
                      '&:nth-of-type(even)': {
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                      },
                    }}
                  >
                    <TableCell sx={{ 
                      fontFamily: 'Freeman, sans-serif',
                      fontSize: '0.9rem'
                    }}>
                      {rsvp.email}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={rsvp.raffleCode} 
                        size="small" 
                        sx={{ 
                          background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                          color: 'white',
                          fontFamily: 'monospace',
                          fontWeight: 'bold',
                          boxShadow: '0 2px 8px rgba(78, 205, 196, 0.3)',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            transition: 'transform 0.2s ease',
                          }
                        }} 
                      />
                    </TableCell>
                    <TableCell sx={{ 
                      fontFamily: 'Freeman, sans-serif',
                      fontSize: '0.9rem'
                    }}>
                      {rsvp.timestamp.toLocaleString()}
                    </TableCell>
                    <TableCell sx={{ 
                      fontFamily: 'Freeman, sans-serif',
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}>
                      {rsvp.eventTitle}
                    </TableCell>
                    <TableCell sx={{ 
                      fontFamily: 'Freeman, sans-serif',
                      fontSize: '0.9rem'
                    }}>
                      {rsvp.eventDate}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {rsvps.length === 0 && (
            <Box sx={{ 
              textAlign: 'center', 
              mt: 4,
              p: 4,
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}>
              <Typography variant="h5" sx={{ 
                color: 'white', 
                fontFamily: 'Freeman, sans-serif',
                mb: 2
              }}>
                No RSVPs Found Yet
              </Typography>
              <Typography variant="body1" sx={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: 'Freeman, sans-serif'
              }}>
                RSVPs will appear here once people start registering for events.
              </Typography>
            </Box>
          )}
        </>
      )}
    </>
  )

  return (
    <Box sx={{ 
      p: { xs: 1, sm: 2, md: 4 }, 
      maxWidth: '1400px', 
      margin: '0 auto',
      minHeight: '100vh',
    }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4,
        p: isMobile ? 2 : 3,
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '25px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        flexWrap: 'wrap',
        gap: 2,
        flexDirection: isSmallMobile ? 'column' : 'row',
      }}>
        <Typography variant={isMobile ? "h4" : "h3"} sx={{ 
          color: 'white', 
          textAlign: 'center',
          fontFamily: 'Rubik Vinyl, cursive',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}>
          RSVP Admin Panel
        </Typography>
        <Button
          variant="outlined"
          onClick={handleLogout}
          sx={{
            color: 'white',
            borderColor: 'rgba(255, 255, 255, 0.5)',
            fontFamily: 'Freeman, sans-serif',
            borderRadius: '25px',
            padding: isMobile ? '8px 16px' : '10px 20px',
            textTransform: 'uppercase',
            transition: 'all 0.3s ease',
            fontSize: { xs: '0.8rem', sm: '0.9rem' },
            minHeight: isMobile ? '44px' : 'auto',
            '&:hover': {
              borderColor: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          Logout
        </Button>
      </Box>
      
      {/* Tabs */}
      <Paper sx={{ 
        mb: 4, 
        backgroundColor: 'transparent',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        overflow: 'hidden'
      }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          centered
          variant={isMobile ? "fullWidth" : "standard"}
          sx={{
            '& .MuiTab-root': {
              fontWeight: 'bold',
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              fontFamily: 'Freeman, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: '#666',
              transition: 'all 0.3s ease',
              minHeight: isMobile ? '56px' : 'auto',
              '&.Mui-selected': {
                color: '#FF6B6B',
                fontWeight: 'bold',
              },
            },
            '& .MuiTabs-indicator': {
              display: 'none',
            },
          }}
        >
          <Tab label="RSVP Management" />
          <Tab label="Raffle Drawing" />
        </Tabs>
      </Paper>

      {activeTab === 0 && renderRSVPManagement()}
      {activeTab === 1 && <RaffleDrawer />}
    </Box>
  )
}

export default RSVPAdmin 