import React, { Suspense, lazy } from 'react'
import { CssBaseline, CircularProgress, Box } from '@mui/material'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import PerformanceMonitor from './components/common/PerformanceMonitor'
import DynamicTitle from './components/common/DynamicTitle'
import { Routes, Route } from 'react-router-dom'
import './styles/mobile.css'
import analytics from './utils/analytics'
import usePageTracking from './hooks/usePageTracking'
import { isSubdomain, getCurrentSubdomain } from './utils/subdomain'

// Lazy load components for better performance
const MainLandingPage = lazy(() => import('./components/sections/MainLandingPage'))
const EventPage = lazy(() => import('./components/sections/EventPage'))
const VendorPage = lazy(() => import('./components/sections/VendorPage'))
const Volunteers = lazy(() => import('./components/sections/Voulenteers'))
const Guests = lazy(() => import('./components/sections/Guests'))
const FAQSection = lazy(() => import('./components/sections/FAQSection'))
const AboutSection = lazy(() => import('./components/sections/AboutSection'))
const AnalyticsDashboard = lazy(() => import('./components/admin/AnalyticsDashboard'))
const ProtectedRoute = lazy(() => import('./components/admin/ProtectedRoute'))

// Loading component
const LoadingSpinner = () => (
  <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    minHeight="50vh"
    sx={{ color: 'white' }}
  >
    <CircularProgress color="inherit" />
  </Box>
)

// Initialize analytics
analytics;

function App() {
  usePageTracking();
  const currentSubdomain = getCurrentSubdomain()
  const onSubdomain = isSubdomain()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <DynamicTitle />
      <Header />
      <main style={{ flex: 1 }}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {onSubdomain ? (
              // Subdomain routes - event-specific pages
              <>
                <Route path="/" element={<EventPage />} />
                <Route path={`/${currentSubdomain}`} element={<EventPage />} />
                <Route path="/about" element={<AboutSection />} />
                <Route path="/volunteers" element={<Volunteers />} />
                <Route path="/vendor" element={<VendorPage />} />
                <Route path="/guests" element={<Guests />} />
                <Route path="/faq" element={<FAQSection />} />
                <Route 
                  path="/admin" 
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <ProtectedRoute>
                        <AnalyticsDashboard />
                      </ProtectedRoute>
                    </Suspense>
                  } 
                />
                <Route 
                  path="/analytics" 
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <ProtectedRoute>
                        <AnalyticsDashboard />
                      </ProtectedRoute>
                    </Suspense>
                  } 
                />
              </>
            ) : (
              // Main domain routes - landing page with all events
              <>
                <Route path="/" element={<MainLandingPage />} />
                <Route path="/about" element={<AboutSection />} />
                <Route path="/volunteers" element={<Volunteers />} />
                <Route path="/vendor" element={<VendorPage />} />
                <Route path="/guests" element={<Guests />} />
                <Route path="/faq" element={<FAQSection />} />
                <Route 
                  path="/admin" 
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <ProtectedRoute>
                        <AnalyticsDashboard />
                      </ProtectedRoute>
                    </Suspense>
                  } 
                />
                <Route 
                  path="/analytics" 
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <ProtectedRoute>
                        <AnalyticsDashboard />
                      </ProtectedRoute>
                    </Suspense>
                  } 
                />
              </>
            )}
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <PerformanceMonitor showDetails={true} />
    </div>
  )
}

export default App 