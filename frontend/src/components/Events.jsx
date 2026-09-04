import { useState, useEffect } from 'react'
import './Events.css'
import ScrollReveal from './ui/ScrollReveal'
import { useMagneticHover } from './ui/useMagneticHover'
import ArrowFillButton from './ui/arrow-fill-button'

// Helper to parse date string into Month and Day for ticket stamp
function parseDateParts(dateStr) {
  if (!dateStr) return { month: 'EVENT', day: '2026' }
  const parts = dateStr.trim().split(' ')
  if (parts.length >= 2) {
    const month = parts[0].substring(0, 3).toUpperCase()
    const day = parts[1].replace(',', '')
    return { month, day }
  }
  return { month: 'EVT', day: '26' }
}

// Fallback tech tags mapping based on category
const DEFAULT_TAGS = {
  Cloud: ['Google Cloud', 'Vertex AI', 'DevOps'],
  Mobile: ['Flutter', 'Dart', 'Firebase'],
  'AI / ML': ['Gemini API', 'TensorFlow', 'Python'],
  Community: ['Networking', 'Swag', 'Workshops']
}

// Clean Magnetic Event Card
function MagneticEventCard({ evt, onOpenModal }) {
  const { cardRef, glowRef } = useMagneticHover({ strength: 0.18, tiltStrength: 6, lift: true })
  const { month, day } = parseDateParts(evt.date)
  const tags = evt.tags || DEFAULT_TAGS[evt.category] || ['Google Tech', 'Hands-on']

  return (
    <article ref={cardRef} className="events__card animate-fadeUp">
      {/* Subtle Cursor glow */}
      <div ref={glowRef} className="events__card-glow" aria-hidden="true" />

      {/* Banner & Floating Ticket Stamp */}
      <div className="events__card-banner">
        <img src={evt.banner} alt={evt.title} loading="lazy" />
        <div className="events__banner-overlay" />
        
        {/* Subtle, low-intensity shine sweep effect */}
        <div className="events__shine" aria-hidden="true" />

        {/* Date Ticket Stamp */}
        <div className="events__ticket-stamp">
          <span className="events__stamp-month">{month}</span>
          <span className="events__stamp-day">{day}</span>
        </div>

        {/* Minimal Status Badge */}
        <div className={`events__badge-wrap ${evt.status === 'Upcoming' ? 'events__badge--upcoming' : 'events__badge--past'}`}>
          {evt.status === 'Upcoming' && <span className="events__pulse-dot" />}
          <span>{evt.status}</span>
        </div>
      </div>

      {/* Perforated Divider */}
      <div className="events__ticket-divider">
        <div className="events__notch events__notch--left" />
        <div className="events__dashed-line" />
        <div className="events__notch events__notch--right" />
      </div>

      {/* Body Content */}
      <div className="events__card-body">
        <div className="events__meta">
          <span className="events__category">{evt.category}</span>
          <span className="events__seats">{evt.seatsLeft || (evt.status === 'Upcoming' ? 'Free Entry' : 'Completed')}</span>
        </div>

        <h3 className="events__title">{evt.title}</h3>
        <p className="events__desc">{evt.description}</p>

        {/* Tech Stack Pills */}
        <div className="events__tags">
          {tags.map((tag, idx) => (
            <span key={idx} className="events__tag-pill">#{tag}</span>
          ))}
        </div>

        {/* Details Box */}
        <div className="events__details">
          <div className="events__detail-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>{evt.venue}</span>
          </div>
          <div className="events__detail-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>{evt.time}</span>
          </div>
        </div>

        {/* Action Footer */}
        <div className="events__footer">
          <button
            onClick={() => onOpenModal(evt)}
            className="events__details-btn"
            title="View Event Details"
          >
            Details
          </button>
          <ArrowFillButton
            btnText={evt.status === 'Upcoming' ? 'Get Ticket' : 'View Recap'}
            href={evt.registrationLink}
            size="sm"
            bgColor={evt.status === 'Upcoming' ? '#4285F4' : '#5f6368'}
            textColor="#ffffff"
            fillBgColor="#ffffff"
            fillTextColor={evt.status === 'Upcoming' ? '#4285F4' : '#5f6368'}
          />
        </div>
      </div>
    </article>
  )
}

const FALLBACK_EVENTS = [
  {
    id: 'evt-1',
    title: 'Google Cloud Study Jam 2026',
    date: 'Sep 20, 2026',
    time: '10:00 AM - 4:00 PM',
    venue: 'PCCOE Main Auditorium & Online',
    category: 'Cloud',
    description: 'Get hands-on experience with Google Cloud Platform, Vertex AI, and earn official Google Cloud skill badges.',
    registrationLink: '#',
    status: 'Upcoming',
    banner: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    tags: ['GCP', 'Vertex AI', 'Kubernetes'],
    seatsLeft: '45 Seats Left'
  },
  {
    id: 'evt-2',
    title: 'Flutter Forward Hackathon',
    date: 'Oct 05, 2026',
    time: '9:00 AM (24 Hours)',
    venue: 'PCCOE Tech Lab 3',
    category: 'Mobile',
    description: 'A 24-hour hackathon focused on building multi-platform apps with Flutter and Firebase. Win cool Google swag!',
    registrationLink: '#',
    status: 'Upcoming',
    banner: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    tags: ['Flutter', 'Dart', 'Firebase'],
    seatsLeft: 'Limited Squads'
  },
  {
    id: 'evt-3',
    title: 'GenAI & Gemini API Masterclass',
    date: 'Oct 18, 2026',
    time: '2:00 PM - 5:00 PM',
    venue: 'Seminar Hall 2',
    category: 'AI / ML',
    description: 'Discover how to integrate Gemini models into your applications with multi-modal prompts and function calling.',
    registrationLink: '#',
    status: 'Upcoming',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    tags: ['Gemini API', 'LLMs', 'Python'],
    seatsLeft: '60 Spots Open'
  },
  {
    id: 'evt-4',
    title: 'GDGC Orientation & Tech Kickoff',
    date: 'Aug 15, 2026',
    time: '11:00 AM - 1:00 PM',
    venue: 'PCCOE Campus Ground',
    category: 'Community',
    description: 'Our annual kickoff meeting welcoming 500+ new campus members to the GDGC PCCOE family.',
    registrationLink: '#',
    status: 'Past',
    banner: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    tags: ['Community', 'Orientation', 'Google Swag'],
    seatsLeft: '500+ Attended'
  }
]

export default function Events() {
  const [backendEvents, setBackendEvents] = useState([])
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [toastMsg, setToastMsg] = useState('')

  // Fetch events from backend API
  useEffect(() => {
    fetch('http://localhost:5001/api/events')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setBackendEvents(data.data)
        }
      })
      .catch((err) => {
        console.warn('Backend API offline, using fallback events:', err)
        setBackendEvents(FALLBACK_EVENTS)
      })
  }, [])

  const displayEvents = backendEvents.length > 0 ? backendEvents : FALLBACK_EVENTS
  const filters = ['All', 'Upcoming', 'Past', 'Cloud', 'Mobile', 'AI / ML']

  const filteredEvents = displayEvents.filter((evt) => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Upcoming') return evt.status === 'Upcoming'
    if (activeFilter === 'Past') return evt.status === 'Past'
    return evt.category === activeFilter
  })

  return (
    <section className="events section" id="events" aria-labelledby="events-heading">
      <div className="container">
        {/* Public Header */}
        <div className="events__header-row">
          <div>
            <ScrollReveal as="span" className="tag tag-yellow section-label-tag">
              Events & Workshops
            </ScrollReveal>
            <ScrollReveal as="h2" className="events__heading" id="events-heading">
              Connect, Learn & <span className="underline-yellow">Build Together</span>
            </ScrollReveal>
            <ScrollReveal as="p" className="events__sub" baseOpacity={0.25} blurStrength={4}>
              Join our flagship technical events, bootcamps, and hackathons hosted right here at PCCOE.
            </ScrollReveal>
          </div>
        </div>

        {/* Filter Pills */}
        <ScrollReveal as="div" className="events__filters" role="tablist">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`events__filter-btn ${activeFilter === filter ? 'events__filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(filter)}
              role="tab"
              aria-selected={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </ScrollReveal>

        {/* Events Grid — Clean cards with ScrollReveal */}
        <div className="events__grid stagger">
          {filteredEvents.map((evt) => (
            <ScrollReveal key={evt.id} as="div" baseOpacity={0.2} blurStrength={6}>
              <MagneticEventCard evt={evt} onOpenModal={(e) => setSelectedEvent(e)} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Clean Event Details Modal */}
      {selectedEvent && (
        <div className="events__modal-backdrop" onClick={() => setSelectedEvent(null)}>
          <div className="events__modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="events__modal-close" onClick={() => setSelectedEvent(null)} aria-label="Close modal">×</button>

            <div className="events__pass-header">
              <div className="events__pass-badge">GDGC OFFICIAL EVENT</div>
              <h3 className="events__pass-title">{selectedEvent.title}</h3>
              <p className="events__pass-date">📅 {selectedEvent.date} • {selectedEvent.time}</p>
            </div>

            <div className="events__pass-body">
              <div className="events__pass-info">
                <div><strong>📍 Location:</strong> {selectedEvent.venue}</div>
                <div><strong>🏷️ Category:</strong> {selectedEvent.category}</div>
                <div><strong>⚡ Format:</strong> In-Person Workshop & Hands-on Coding</div>
                <div><strong>🎁 Perks:</strong> Google Swag + Digital Badge + Refreshments</div>
              </div>

              <p className="events__pass-desc">{selectedEvent.description}</p>

              <div className="events__modal-actions">
                <ArrowFillButton
                  btnText={selectedEvent.status === 'Upcoming' ? 'Confirm Registration' : 'View Recap Highlights'}
                  href={selectedEvent.registrationLink}
                  bgColor="#34A853"
                  textColor="#ffffff"
                  fillBgColor="#ffffff"
                  fillTextColor="#34A853"
                  onClick={() => {
                    setToastMsg(`Registered for ${selectedEvent.title}!`)
                    setTimeout(() => setToastMsg(''), 4000)
                    setSelectedEvent(null)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RSVP Confirmation Toast */}
      {toastMsg && (
        <div className="events__toast animate-slideRight">
          <span>🎉 {toastMsg}</span>
        </div>
      )}
    </section>
  )
}
