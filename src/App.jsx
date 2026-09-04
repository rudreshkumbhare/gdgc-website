import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import WhatWeDo from './components/WhatWeDo'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhatWeDo />
      </main>
    </div>
  )
}

export default App
