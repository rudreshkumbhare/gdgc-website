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

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // If path is /admin, render secret Admin Portal
  if (currentPath === '/admin' || currentPath === '/admin/') {
    return <AdminDashboard />
  }

  // Otherwise, render 100% clean public website for normal visitors
  return (
    <div className="app">
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
