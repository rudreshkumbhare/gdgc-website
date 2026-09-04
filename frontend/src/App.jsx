import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import WhatWeDo from './components/WhatWeDo'
import Events from './components/Events'
import Team from './components/Team'
import Footer from './components/Footer'
import AdminDashboard from './components/AdminDashboard'
import BoxLoader from './components/ui/box-loader'
import CustomCursor from './components/CustomCursor'
import DotParticleCanvas from './components/ui/dot-particles'
import ScrollProgressBar from './components/ui/ScrollProgressBar'

function App() {
  const [loading, setLoading] = useState(true)
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Preloader duration — snappy 2s
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Secret Admin Portal at /admin
  if (currentPath === '/admin' || currentPath === '/admin/') {
    return <AdminDashboard />
  }

  return (
    <div className="app">
      {/* Top Google 4-Color Gradient Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Site-Wide Antigravity Dot Particle Canvas */}
      <DotParticleCanvas
        backgroundColor="transparent"
        particleColor="50, 50, 55"
        animationSpeed={0.006}
      />

      {/* Google 4-Color Magnetic Fluid Custom Cursor */}
      <CustomCursor />

      {/* Preloader Overlay (Google Color 3D Blocks on White Background) */}
      <div className={`preloader-overlay ${!loading ? 'preloader-overlay--hidden' : ''}`}>
        <BoxLoader />
        <div className="preloader-text">
          <div className="google-dots" style={{ marginBottom: '6px' }}>
            <span></span><span></span><span></span><span></span>
          </div>
          <span className="preloader-title">GDGC PCCOE</span>
          <span className="preloader-subtitle">Google Developer Groups on Campus</span>
        </div>
      </div>

      {/* Main Website Content */}
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhatWeDo />
        <Events />
        <Team />
      </main>
      <Footer />
    </div>
  )
}

export default App
