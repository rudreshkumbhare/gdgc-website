import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import WhatWeDo from './components/WhatWeDo'
import Events from './components/Events'
import Team from './components/Team'
import Footer from './components/Footer'
import AdminModal from './components/AdminModal'

function App() {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false)
  const [customEvents, setCustomEvents] = useState([])

  const handleOpenAdminModal = () => setIsAdminModalOpen(true)
  const handleCloseAdminModal = () => setIsAdminModalOpen(false)

  const handleAddEvent = (newEvent) => {
    setCustomEvents((prev) => [newEvent, ...prev])
  }

  return (
    <div className="app">
      <Navbar onOpenAdminModal={handleOpenAdminModal} />
      <main>
        <Hero />
        <About />
        <WhatWeDo />
        <Events
          isAdminModalOpen={isAdminModalOpen}
          onOpenAdminModal={handleOpenAdminModal}
          customEvents={customEvents}
        />
        <Team />
      </main>
      <Footer />

      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={handleCloseAdminModal}
        onAddEvent={handleAddEvent}
      />
    </div>
  )
}

export default App
