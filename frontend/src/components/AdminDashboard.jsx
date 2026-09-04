import { useState, useEffect } from 'react'
import './AdminDashboard.css'

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState('')
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)

  // New Event Form State
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    category: 'Cloud',
    color: 'blue',
    description: '',
    registrationLink: '#',
    banner: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
  })
  const [submitting, setSubmitting] = useState(false)

  // Check saved session
  useEffect(() => {
    const savedAuth = localStorage.getItem('gdgc_admin_auth')
    if (savedAuth === 'true') {
      setIsAuthenticated(true)
      fetchEvents()
    }
  }, [])

  const fetchEvents = () => {
    setLoading(true)
    fetch('http://localhost:5001/api/events')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setEvents(data.data)
        }
      })
      .catch((err) => console.error('Failed to fetch events:', err))
      .finally(() => setLoading(false))
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (passcode === 'gdgc2026' || passcode === 'admin123') {
      setIsAuthenticated(true)
      localStorage.setItem('gdgc_admin_auth', 'true')
      setError('')
      fetchEvents()
    } else {
      setError('Invalid Admin Passcode. Access denied.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('gdgc_admin_auth')
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePublish = async (e) => {
    e.preventDefault()
    if (!formData.title || !formData.date) return

    setSubmitting(true)
    try {
      const res = await fetch('http://localhost:5001/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (data.success) {
        setEvents((prev) => [data.data, ...prev])
        setFormData({
          title: '',
          date: '',
          time: '',
          venue: '',
          category: 'Cloud',
          color: 'blue',
          description: '',
          registrationLink: '#',
          banner: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
        })
      }
    } catch (err) {
      alert('Error publishing event: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return

    try {
      const res = await fetch(`http://localhost:5001/api/admin/events/${id}`, {
        method: 'DELETE'
      })
      const data = await res.json()
      if (data.success) {
        setEvents((prev) => prev.filter((evt) => evt.id !== id))
      }
    } catch (err) {
      alert('Error deleting event: ' + err.message)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-card animate-scaleIn">
          <div className="admin-login-header">
            <div className="google-dots">
              <span></span><span></span><span></span><span></span>
            </div>
            <h2>GDGC PCCOE Admin Portal</h2>
            <p>Enter your chapter lead passcode to continue</p>
          </div>

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="form-group">
              <label>Passcode</label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter passcode (e.g. gdgc2026)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                required
              />
            </div>

            {error && <div className="admin-login-error">⚠️ {error}</div>}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Sign In to Dashboard
            </button>
          </form>

          <div className="admin-login-footer">
            <a href="/">← Return to Public Website</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-dashboard-page">
      {/* Navbar */}
      <header className="admin-nav">
        <div className="admin-nav-inner container">
          <div className="admin-nav-brand">
            <div className="google-dots">
              <span></span><span></span><span></span><span></span>
            </div>
            <span>GDGC PCCOE <strong>Organizers Portal</strong></span>
          </div>

          <div className="admin-nav-actions">
            <a href="/" className="btn btn-outline" style={{ fontSize: '13px', padding: '7px 18px' }}>
              View Live Website ↗
            </a>
            <button onClick={handleLogout} className="btn btn-red" style={{ fontSize: '13px', padding: '7px 18px' }}>
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="container admin-dashboard-main">
        <div className="admin-page-title">
          <h1>Event Publisher Dashboard</h1>
          <p>Create and manage official GDGC PCCOE technical events, workshops, and hackathons.</p>
        </div>

        <div className="admin-grid">
          {/* Left: Create Event Form */}
          <div className="admin-card">
            <div className="admin-card-header">
              <span className="tag tag-blue">Publish New Event</span>
              <h3>Fill Event Details</h3>
            </div>

            <form onSubmit={handlePublish} className="admin-form">
              <div className="form-group">
                <label>Event Title *</label>
                <input
                  type="text"
                  name="title"
                  className="form-input"
                  placeholder="e.g. Android Study Jam 2026"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date *</label>
                  <input
                    type="text"
                    name="date"
                    className="form-input"
                    placeholder="e.g. Nov 12, 2026"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="text"
                    name="time"
                    className="form-input"
                    placeholder="e.g. 10:00 AM - 2:00 PM"
                    value={formData.time}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Venue / Location</label>
                  <input
                    type="text"
                    name="venue"
                    className="form-input"
                    placeholder="e.g. PCCOE Lab 5"
                    value={formData.venue}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    className="form-select"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="Cloud">Google Cloud</option>
                    <option value="Mobile">Mobile / Flutter</option>
                    <option value="AI / ML">AI / Gemini</option>
                    <option value="Web Dev">Web Development</option>
                    <option value="Community">Community / Kickoff</option>
                  </select>
                </div>
              </div>

              {/* Theme Color Selector */}
              <div className="form-group">
                <label>Theme Brand Color</label>
                <div className="color-selector">
                  {['blue', 'red', 'yellow', 'green'].map((col) => (
                    <button
                      key={col}
                      type="button"
                      className={`color-pill-btn color-pill-${col} ${formData.color === col ? 'color-pill-btn--active' : ''}`}
                      onClick={() => setFormData((prev) => ({ ...prev, color: col }))}
                    >
                      {col.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Registration URL</label>
                <input
                  type="url"
                  name="registrationLink"
                  className="form-input"
                  placeholder="https://gdg.community.dev/events/..."
                  value={formData.registrationLink}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Banner Image URL</label>
                <input
                  type="url"
                  name="banner"
                  className="form-input"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.banner}
                  onChange={handleInputChange}
                />
                {/* Live Banner Preview */}
                {formData.banner && (
                  <div className="banner-preview-box">
                    <img src={formData.banner} alt="Banner preview" />
                    <div className="banner-preview-overlay">
                      <span className={`tag tag-${formData.color}`}>Preview Card Banner</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Event Description</label>
                <textarea
                  name="description"
                  className="form-textarea"
                  rows="3"
                  placeholder="Brief details about the event, prerequisites, and swag..."
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
                style={{ width: '100%', justifyContent: 'center', marginTop: '8px', padding: '14px' }}
              >
                {submitting ? 'Publishing...' : '🚀 Publish Event Live'}
              </button>
            </form>
          </div>

          {/* Right: Manage Existing Events */}
          <div className="admin-card">
            <div className="admin-card-header">
              <span className="tag tag-green">Live Events ({events.length})</span>
              <h3>Manage Events</h3>
            </div>

            {loading ? (
              <p style={{ color: 'var(--text-muted)' }}>Loading live events...</p>
            ) : events.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No live events published yet.</p>
            ) : (
              <div className="admin-events-list">
                {events.map((evt) => (
                  <div key={evt.id} className="admin-event-card">
                    <img src={evt.banner} alt={evt.title} className="admin-event-img" />
                    <div className="admin-event-content">
                      <span className={`tag tag-${evt.color}`} style={{ fontSize: '11px', padding: '2px 8px' }}>
                        {evt.category}
                      </span>
                      <h4 className="admin-event-title">{evt.title}</h4>
                      <div className="admin-event-meta">
                        <span>📅 {evt.date}</span>
                        <span>📍 {evt.venue}</span>
                      </div>
                    </div>
                    <button className="delete-btn" onClick={() => handleDelete(evt.id)}>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
