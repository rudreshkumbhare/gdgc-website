import { useState, useEffect } from 'react'
import './Events.css'
import ScrollReveal from './ui/ScrollReveal'

const FALLBACK_EVENTS = [
  {
    id: 'evt-1',
    title: 'Google Cloud Study Jam 2026',
    date: 'Sep 20, 2026',
    time: '10:00 AM - 4:00 PM',
    venue: 'PCCOE Main Auditorium & Online',
    category: 'Cloud',
    color: 'blue',
    description: 'Get hands-on experience with Google Cloud Platform, Vertex AI, and earn official Google Cloud skill badges.',
    registrationLink: '#',
    status: 'Upcoming',
    banner: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'evt-2',
    title: 'Flutter Forward Hackathon',
    date: 'Oct 05, 2026',
    time: '9:00 AM (24 Hours)',
    venue: 'PCCOE Tech Lab 3',
    category: 'Mobile',
    color: 'red',
    description: 'A 24-hour hackathon focused on building multi-platform apps with Flutter and Firebase. Win cool Google swag!',
    registrationLink: '#',
    status: 'Upcoming',
    banner: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'evt-3',
    title: 'GenAI & Gemini API Masterclass',
    date: 'Oct 18, 2026',
    time: '2:00 PM - 5:00 PM',
    venue: 'Seminar Hall 2',
    category: 'AI / ML',
    color: 'yellow',
    description: 'Discover how to integrate Gemini models into your applications with multi-modal prompts and function calling.',
    registrationLink: '#',
    status: 'Upcoming',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'evt-4',
    title: 'GDGC Orientation & Tech Kickoff',
    date: 'Aug 15, 2026',
    time: '11:00 AM - 1:00 PM',
    venue: 'PCCOE Campus Ground',
    category: 'Community',
    color: 'green',
    description: 'Our annual kickoff meeting welcoming 500+ new campus members to the GDGC PCCOE family.',
    registrationLink: '#',
    status: 'Past',
    banner: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'
  }
]

export default function Events() {
  const [backendEvents, setBackendEvents] = useState([])
  const [activeFilter, setActiveFilter] = useState('All')

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
            <span className="tag tag-yellow section-label-tag">Events & Workshops</span>
            <h2 className="events__heading" id="events-heading">
              Connect, Learn & <span className="underline-yellow">Build Together</span>
            </h2>
            <ScrollReveal baseOpacity={0.25} enableBlur={true} blurStrength={3}>
              Join our flagship technical events bootcamps and hackathons hosted right here at PCCOE.
            </ScrollReveal>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="events__filters" role="tablist">
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
        </div>

        {/* Events Grid */}
        <div className="events__grid stagger">
          {filteredEvents.map((evt) => (
            <article key={evt.id} className={`events__card card-${evt.color} animate-fadeUp`}>
              <div className="events__card-banner">
                <img src={evt.banner} alt={evt.title} loading="lazy" />
                <span className={`tag tag-${evt.color} events__badge`}>
                  {evt.status}
                </span>
              </div>

              <div className="events__card-body">
                <div className="events__meta">
                  <span className="events__category">{evt.category}</span>
                  <span className="events__date">📅 {evt.date}</span>
                </div>

                <h3 className="events__title">{evt.title}</h3>
                <p className="events__desc">{evt.description}</p>

                <div className="events__details">
                  <span>📍 {evt.venue}</span>
                  <span>⏰ {evt.time}</span>
                </div>

                <div className="events__footer">
                  <a
                    href={evt.registrationLink}
                    className={`btn btn-${evt.color === 'yellow' ? 'primary' : evt.color} events__register-btn`}
                  >
                    {evt.status === 'Upcoming' ? 'Register Now' : 'View Recap'}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
