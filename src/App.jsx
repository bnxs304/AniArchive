import React from 'react'
import { CssBaseline } from '@mui/material'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import RSVPAdmin from './components/admin/RSVPAdmin'
import { Routes, Route } from 'react-router-dom'
import './styles/mobile.css'

function App() {
  return (
    <div>
      <CssBaseline />
      <Header />
      <main>
        {/* default route set as <HeroSection /> */}
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/admin" element={<RSVPAdmin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App 