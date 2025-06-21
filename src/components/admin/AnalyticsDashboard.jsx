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
  Alert
} from '@mui/material';
import analytics from '../../utils/analytics';

const AnalyticsDashboard = () => {
  const [events, setEvents] = useState([]);
  const [coreWebVitals, setCoreWebVitals] = useState({});

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = () => {
    const storedEvents = analytics.getStoredEvents();
    setEvents(storedEvents);

    // Calculate Core Web Vitals
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
  };

  const clearAnalytics = () => {
    analytics.clearStoredEvents();
    setEvents([]);
    setCoreWebVitals({});
  };

  const getVitalStatus = (value, thresholds) => {
    if (value <= thresholds.good) return { status: 'Good', color: 'success' };
    if (value <= thresholds.needsImprovement) return { status: 'Needs Improvement', color: 'warning' };
    return { status: 'Poor', color: 'error' };
  };

  const formatTime = (ms) => {
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const formatCLS = (value) => {
    return value.toFixed(3);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Analytics Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Core Web Vitals Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Largest Contentful Paint (LCP)
              </Typography>
              {coreWebVitals.lcp ? (
                <>
                  <Typography variant="h4" color="primary">
                    {formatTime(coreWebVitals.lcp.data.value)}
                  </Typography>
                  <Alert severity={getVitalStatus(coreWebVitals.lcp.data.value, { good: 2500, needsImprovement: 4000 }).color}>
                    {getVitalStatus(coreWebVitals.lcp.data.value, { good: 2500, needsImprovement: 4000 }).status}
                  </Alert>
                  <Typography variant="caption" display="block">
                    Target: &lt; 2.5s
                  </Typography>
                </>
              ) : (
                <Typography color="text.secondary">No data available</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                First Input Delay (FID)
              </Typography>
              {coreWebVitals.fid ? (
                <>
                  <Typography variant="h4" color="primary">
                    {formatTime(coreWebVitals.fid.data.value)}
                  </Typography>
                  <Alert severity={getVitalStatus(coreWebVitals.fid.data.value, { good: 100, needsImprovement: 300 }).color}>
                    {getVitalStatus(coreWebVitals.fid.data.value, { good: 100, needsImprovement: 300 }).status}
                  </Alert>
                  <Typography variant="caption" display="block">
                    Target: &lt; 100ms
                  </Typography>
                </>
              ) : (
                <Typography color="text.secondary">No data available</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cumulative Layout Shift (CLS)
              </Typography>
              {coreWebVitals.cls ? (
                <>
                  <Typography variant="h4" color="primary">
                    {formatCLS(coreWebVitals.cls.data.value)}
                  </Typography>
                  <Alert severity={getVitalStatus(coreWebVitals.cls.data.value, { good: 0.1, needsImprovement: 0.25 }).color}>
                    {getVitalStatus(coreWebVitals.cls.data.value, { good: 0.1, needsImprovement: 0.25 }).status}
                  </Alert>
                  <Typography variant="caption" display="block">
                    Target: &lt; 0.1
                  </Typography>
                </>
              ) : (
                <Typography color="text.secondary">No data available</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Event Statistics */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Event Statistics
              </Typography>
              <Button variant="outlined" onClick={clearAnalytics}>
                Clear Data
              </Button>
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <Typography variant="h6" color="primary">
                  {events.filter(e => e.event === 'page_view').length}
                </Typography>
                <Typography variant="body2">Page Views</Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="h6" color="primary">
                  {events.filter(e => e.event === 'rsvp_click').length}
                </Typography>
                <Typography variant="body2">RSVP Clicks</Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="h6" color="primary">
                  {events.filter(e => e.event === 'social_click').length}
                </Typography>
                <Typography variant="body2">Social Clicks</Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="h6" color="primary">
                  {events.filter(e => e.event === 'past_event_click').length}
                </Typography>
                <Typography variant="body2">Event Clicks</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Recent Events Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Events
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Event</TableCell>
                    <TableCell>Data</TableCell>
                    <TableCell>Timestamp</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {events.slice(-10).reverse().map((event, index) => (
                    <TableRow key={index}>
                      <TableCell>{event.event}</TableCell>
                      <TableCell>
                        {typeof event.data === 'object' 
                          ? JSON.stringify(event.data).substring(0, 50) + '...'
                          : event.data
                        }
                      </TableCell>
                      <TableCell>
                        {new Date(event.timestamp).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsDashboard; 