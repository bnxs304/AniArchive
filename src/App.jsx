import React from 'react'
import { CssBaseline } from '@mui/material'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import RSVPAdmin from './components/admin/RSVPAdmin'
import AnalyticsDashboard from './components/admin/AnalyticsDashboard'
import ProtectedRoute from './components/admin/ProtectedRoute'
import { Routes, Route } from 'react-router-dom'
import './styles/mobile.css'
import analytics from './utils/analytics'
import usePageTracking from './hooks/usePageTracking'

// Initialize analytics
analytics;

function App() {
  usePageTracking();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Header />
      <main style={{ flex: 1 }}>
        {/* default route set as <HeroSection /> */}
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/about" element={<AboutSection />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <RSVPAdmin />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <ProtectedRoute>
                <AnalyticsDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App 