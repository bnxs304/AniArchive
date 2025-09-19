import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  Alert,
  useTheme,
  useMediaQuery,
  Chip,
  IconButton,
  Tooltip,
  Divider,
  LinearProgress,
  Stack,
  Avatar,
  Badge
} from '@mui/material';
import { 
  Speed as SpeedIcon,
  TouchApp as TouchAppIcon,
  ViewInAr as ViewInArIcon,
  Visibility as VisibilityIcon,
  Event as EventIcon,
  Share as ShareIcon,
  History as HistoryIcon,
  Refresh as RefreshIcon,
  Clear as ClearIcon,
  Logout as LogoutIcon,
  AdminPanelSettings as AdminIcon,
  TrendingUp as TrendingUpIcon,
  Analytics as AnalyticsIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { adminLogout } from '../../config/firebase';
import analytics from '../../utils/analytics';

const AnalyticsDashboard = () => {
  const [events, setEvents] = useState([]);
  const [coreWebVitals, setCoreWebVitals] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setIsLoading(true);
    try {
      const storedEvents = analytics.getStoredEvents();
      setEvents(storedEvents);

      const lcpEvents = storedEvents.filter(e => e.event === 'lcp');
      const fidEvents = storedEvents.filter(e => e.event === 'fid');
      const clsEvents = storedEvents.filter(e => e.event === 'cls');

      const latestLCP = lcpEvents.length > 0 ? lcpEvents[lcpEvents.length - 1] : null;
      const latestFID = fidEvents.length > 0 ? fidEvents[fidEvents.length - 1] : null;
      const latestCLS = clsEvents.length > 0 ? clsEvents[clsEvents.length - 1] : null;

      setCoreWebVitals({
        lcp: latestLCP,
        fid: latestFID,
        cls: latestCLS
      });
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await adminLogout();
      sessionStorage.removeItem('adminAuthenticated');
      window.location.reload();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const clearAnalytics = () => {
    analytics.clearStoredEvents();
    setEvents([]);
    setCoreWebVitals({});
  };

  const getVitalStatus = (value, thresholds) => {
    if (value <= thresholds.good) return { status: 'Good', color: 'success', icon: '🟢' };
    if (value <= thresholds.needsImprovement) return { status: 'Needs Improvement', color: 'warning', icon: '🟡' };
    return { status: 'Poor', color: 'error', icon: '🔴' };
  };

  const formatTime = (ms) => {
    if (ms < 1000) return `${ms.toFixed(0)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const formatCLS = (value) => {
    return value.toFixed(3);
  };

  const getProgressValue = (value, thresholds) => {
    const max = thresholds.needsImprovement * 1.5;
    return Math.min((value / max) * 100, 100);
  };
  
  const StatCard = ({ title, value, unit, status, icon, description }) => (
    <Card sx={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
      borderRadius: '20px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: isMobile ? '90vw' : '100%',
      margin: 'auto',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
      }
    }}
    data-analytics="stat-card"
    >
      <CardContent sx={{
        p: { xs: 2, md: 3 },
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ 
            bgcolor: status?.color === 'success' ? '#4caf50' : 
                     status?.color === 'warning' ? '#ff9800' : 
                     status?.color === 'error' ? '#f44336' : '#9e9e9e',
            mr: 2,
            width: { xs: 40, md: 48 },
            height: { xs: 40, md: 48 }
          }}>
            {icon}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ 
              fontFamily: 'Freeman', 
              color: '#333',
              fontWeight: 'bold',
              lineHeight: 1.2,
              fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' }
            }}>
              {title}
            </Typography>
            {description && (
              <Typography sx={{ 
                color: '#666', 
                display: { xs: 'none', sm: 'block' },
                fontSize: { sm: '0.75rem', md: '0.875rem' },
                mt: 0.5
              }}>
                {description}
              </Typography>
            )}
          </Box>
        </Box>
        
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {value ? (
            <>
              <Box sx={{ mb: 2 }}>
                <Typography sx={{ 
                  color: '#111', 
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 1,
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
                }}>
                  {value}
                  {unit && (
                    <Typography component="span" sx={{ 
                      color: '#555',
                      fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' }
                    }}>
                      {unit}
                    </Typography>
                  )}
                </Typography>
                
                <LinearProgress 
                  variant="determinate" 
                  value={getProgressValue(value, 
                    title.includes('LCP') ? { good: 2500, needsImprovement: 4000 } :
                    title.includes('FID') ? { good: 100, needsImprovement: 300 } :
                    { good: 0.1, needsImprovement: 0.25 }
                  )}
                  sx={{ 
                    mt: 1, 
                    height: 6, 
                    borderRadius: 3,
                    bgcolor: 'rgba(0,0,0,0.1)',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: status?.color === 'success' ? '#4caf50' : 
                              status?.color === 'warning' ? '#ff9800' : '#f44336'
                    }
                  }} 
                />
              </Box>
              
              <Chip 
                label={status.status} 
                color={status.color}
                size={isMobile ? "small" : "medium"}
                sx={{ 
                  fontWeight: 'bold',
                  '& .MuiChip-label': { 
                    px: 1,
                    fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.875rem' }
                  }
                }}
              />
            </>
          ) : (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography sx={{ 
                color: 'text.secondary', 
                fontStyle: 'italic',
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}>
                No data available
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );

  const MetricCard = ({ title, value, icon, color = 'primary' }) => (
    <Card sx={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%)',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
      }
    }}
    data-analytics="metric-card"
    >
      <CardContent sx={{ p: { xs: 2, md: 2.5 }, textAlign: 'center' }}>
        <Avatar sx={{ 
          bgcolor: `${color}.main`, 
          mx: 'auto', 
          mb: 1,
          width: { xs: 40, md: 48 },
          height: { xs: 40, md: 48 }
        }}>
          {icon}
        </Avatar>
        <Typography sx={{ 
          color: `${color}.main`,
          fontWeight: 'bold', 
          mb: 0.5,
          fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
        }}>
          {value}
        </Typography>
        <Typography sx={{ 
          color: '#555', 
          fontWeight: 500,
          fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' }
        }}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ 
      p: { xs: 1, sm: 2, md: 3 }, 
      maxWidth: '1400px', 
      mx: 'auto',
      minHeight: '100vh'
    }}
    className="analytics-dashboard"
  >
      {/* Header Section */}
      <Paper sx={{ 
        p: { xs: 2, md: 3 }, 
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        mb: 3,
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}
      data-analytics="dashboard-paper"
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: 2 
        }}
        className="analytics-header"
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ 
              bgcolor: 'primary.main',
              width: { xs: 48, md: 56 },
              height: { xs: 48, md: 56 }
            }}>
              <AnalyticsIcon sx={{ fontSize: { xs: 24, md: 28 } }} />
            </Avatar>
            <Box>
              <Typography sx={{ 
                fontWeight: 'bold', 
                color: 'white', 
                fontFamily: 'Freeman', 
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                lineHeight: 1.2,
                fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' }
              }}
              className="analytics-title"
              >
                Analytics Dashboard
              </Typography>
              <Typography sx={{ 
                color: 'rgba(255,255,255,0.8)', 
                mt: 0.5,
                fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' }
              }}
              className="analytics-subtitle"
              >
                Performance & User Engagement Metrics
              </Typography>
            </Box>
          </Box>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ alignItems: 'stretch' }}>
            <Button 
              component={Link} 
              to="/admin" 
              variant="outlined" 
              startIcon={<AdminIcon />}
              sx={{ 
                borderRadius: '12px', 
                color: 'white', 
                borderColor: 'rgba(255,255,255,0.3)',
                '&:hover': { 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: 'white'
                },
                minHeight: { xs: 40, sm: 48 }
              }}
              data-analytics="action-button"
            >
              {!isMobile && 'Admin Panel'}
            </Button>
            <Button 
              variant="contained" 
              color="error" 
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{ 
                borderRadius: '12px', 
                fontWeight: 'bold',
                minHeight: { xs: 40, sm: 48 }
              }}
              data-analytics="action-button"
            >
              {!isMobile && 'Logout'}
            </Button>
          </Stack>
        </Box>
      </Paper>

      {isLoading && (
        <LinearProgress sx={{ mb: 3, borderRadius: 2, height: 4 }} data-analytics="loading-bar" />
      )}

      {/* Core Web Vitals Section */}
      <Paper sx={{ 
        p: { xs: 2, md: 3 }, 
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        backdropFilter: 'blur(15px)',
        borderRadius: '20px', 
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        mb: 3,
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}
      data-analytics="dashboard-paper"
      className="analytics-section"
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <SpeedIcon sx={{ color: 'white', mr: 1, fontSize: { xs: 24, md: 28 } }} />
          <Typography sx={{ 
            color: 'white', 
            fontFamily: 'Freeman',
            fontWeight: 'bold',
            fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' }
          }}
          className="analytics-title"
          >
            Core Web Vitals
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            {coreWebVitals.lcp ? (
              <StatCard 
                title="Largest Contentful Paint"
                value={formatTime(coreWebVitals.lcp.data.value).replace(/[a-zA-Z]+$/, '')}
                unit={formatTime(coreWebVitals.lcp.data.value).match(/[a-zA-Z]+$/)?.[0]}
                status={getVitalStatus(coreWebVitals.lcp.data.value, { good: 2500, needsImprovement: 4000 })}
                icon={<SpeedIcon />}
                description="Time to render the largest content element"
              />
            ) : <StatCard title="Largest Contentful Paint" icon={<SpeedIcon />} />}
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            {coreWebVitals.fid ? (
              <StatCard 
                title="First Input Delay"
                value={formatTime(coreWebVitals.fid.data.value).replace(/[a-zA-Z]+$/, '')}
                unit={formatTime(coreWebVitals.fid.data.value).match(/[a-zA-Z]+$/)?.[0]}
                status={getVitalStatus(coreWebVitals.fid.data.value, { good: 100, needsImprovement: 300 })}
                icon={<TouchAppIcon />}
                description="Time to respond to first user interaction"
              />
            ) : <StatCard title="First Input Delay" icon={<TouchAppIcon />} />}
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            {coreWebVitals.cls ? (
              <StatCard 
                title="Cumulative Layout Shift"
                value={formatCLS(coreWebVitals.cls.data.value)}
                status={getVitalStatus(coreWebVitals.cls.data.value, { good: 0.1, needsImprovement: 0.25 })}
                icon={<ViewInArIcon />}
                description="Visual stability measure"
              />
            ) : <StatCard title="Cumulative Layout Shift" icon={<ViewInArIcon />} />}
          </Grid>
        </Grid>
      </Paper>

      {/* Event Statistics Section */}
      <Paper sx={{ 
        p: { xs: 2, md: 3 }, 
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        backdropFilter: 'blur(15px)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        mb: 3,
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}
      data-analytics="dashboard-paper"
      className="analytics-section"
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TrendingUpIcon sx={{ color: 'white', mr: 1, fontSize: { xs: 24, md: 28 } }} />
            <Typography sx={{ 
              color: 'white', 
              fontFamily: 'Freeman',
              fontWeight: 'bold',
              fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' }
            }}
            className="analytics-title"
            >
              Event Statistics
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Refresh Data">
              <IconButton 
                onClick={loadAnalytics}
                sx={{ 
                  color: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                }}
                data-analytics="toolbar-button"
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Clear All Data">
              <IconButton 
                onClick={clearAnalytics}
                color="error"
                sx={{ 
                  bgcolor: 'rgba(244,67,54,0.2)',
                  '&:hover': { bgcolor: 'rgba(244,67,54,0.3)' }
                }}
                data-analytics="toolbar-button"
              >
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        
        <Grid container spacing={2} data-analytics="metrics-grid">
          <Grid size={{ xs: 6, md: 3 }}>
            <MetricCard 
              title="Page Views"
              value={events.filter(e => e.event === 'page_view').length}
              icon={<VisibilityIcon />}
              color="primary"
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <MetricCard 
              title="Ticket Clicks"
              value={events.filter(e => e.event === 'ticket_click').length}
              icon={<EventIcon />}
              color="secondary"
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <MetricCard 
              title="Social Clicks"
              value={events.filter(e => e.event === 'social_click').length}
              icon={<ShareIcon />}
              color="success"
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <MetricCard 
              title="Past Event Clicks"
              value={events.filter(e => e.event === 'past_event_click').length}
              icon={<HistoryIcon />}
              color="warning"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Recent Events Table */}
      <Paper sx={{ 
        p: { xs: 2, md: 3 }, 
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        backdropFilter: 'blur(15px)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}
      data-analytics="dashboard-paper"
      className="analytics-section"
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <HistoryIcon sx={{ color: 'white', mr: 1, fontSize: { xs: 24, md: 28 } }} />
          <Typography sx={{ 
            color: 'white', 
            fontFamily: 'Freeman',
            fontWeight: 'bold',
            fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' }
          }}
          className="analytics-title"
          >
            Recent Events Log
          </Typography>
          <Badge 
            badgeContent={events.length} 
            color="primary" 
            sx={{ ml: 'auto' }}
          />
        </Box>
        
        <TableContainer sx={{ 
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <Table size={isMobile ? "small" : "medium"}>
            <TableHead>
              <TableRow sx={{ bgcolor: 'rgba(0,0,0,0.05)' }}>
                <TableCell sx={{ 
                  fontWeight: 'bold', 
                  color: '#333',
                  fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' }
                }}>Event</TableCell>
                {!isMobile && <TableCell sx={{ 
                  fontWeight: 'bold', 
                  color: '#333',
                  fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' }
                }}>Data</TableCell>}
                <TableCell sx={{ 
                  fontWeight: 'bold', 
                  color: '#333',
                  fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' }
                }}>
                  {isMobile ? 'Time' : 'Timestamp'}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.slice(-10).reverse().map((event, index) => (
                <TableRow 
                  key={index} 
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' }
                  }}
                >
                  <TableCell>
                    <Chip 
                      label={event.event} 
                      size="small"
                      color={
                        event.event === 'page_view' ? 'primary' :
                        event.event === 'ticket_click' ? 'secondary' :
                        event.event === 'social_click' ? 'success' :
                        event.event === 'past_event_click' ? 'warning' : 'default'
                      }
                      sx={{ 
                        fontWeight: 'bold',
                        '& .MuiChip-label': {
                          fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.875rem' }
                        }
                      }}
                    />
                  </TableCell>
                  {!isMobile && (
                    <TableCell sx={{ wordBreak: 'break-all', maxWidth: 200 }}>
                      <Typography sx={{ 
                        fontFamily: 'monospace', 
                        fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.875rem' }
                      }}>
                        {typeof event.data === 'object' 
                          ? JSON.stringify(event.data)
                          : String(event.data)
                        }
                      </Typography>
                    </TableCell>
                  )}
                  <TableCell>
                    <Typography sx={{ 
                      color: '#666',
                      fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' }
                    }}>
                      {isMobile 
                        ? new Date(event.timestamp).toLocaleTimeString()
                        : new Date(event.timestamp).toLocaleString()
                      }
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
              {events.length === 0 && (
                <TableRow>
                  <TableCell colSpan={isMobile ? 2 : 3} sx={{ textAlign: 'center', py: 4 }}
                  className="analytics-empty-state"
                  >
                    <Typography sx={{ 
                      color: 'text.secondary', 
                      fontStyle: 'italic',
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}>
                      No events recorded yet
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default AnalyticsDashboard; 