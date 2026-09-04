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
    // Admin Passcode check
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
        alert('🎉 Event published successfully live to the website!')
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
            <p>Enter organizer passkey to access management panel</p>
          </div>

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="form-group">
              <label>Admin Passcode</label>
              <input
                type="password"
                placeholder="Enter passcode (e.g. gdgc2026)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                required
              />
            </div>

            {error && <div className="admin-login-error">{error}</div>}

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
      {/* Top Navbar */}
      <header className="admin-nav">
        <div className="admin-nav-inner container">
          <div className="admin-nav-brand">
            <div className="google-dots">
              <span></span><span></span><span></span><span></span>
            </div>
            <span>GDGC PCCOE <strong>Admin Portal</strong></span>
          </div>

          <div className="admin-nav-actions">
            <a href="/" className="btn btn-outline" style={{ fontSize: '13px', padding: '6px 16px' }}>
              View Public Site ↗
            </a>
            <button onClick={handleLogout} className="btn btn-red" style={{ fontSize: '13px', padding: '6px 16px' }}>
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container admin-dashboard-main">
        <div className="admin-grid">
          {/* Left: Create Event Form */}
          <div className="admin-card">
            <div className="admin-card-header">
              <span className="tag tag-blue">Event Management</span>
              <h3>+ Push New Upcoming Event</h3>
            </div>

            <form onSubmit={handlePublish} className="admin-form">
              <div className="form-group">
                <label>Event Title *</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Flutter Forward Hackathon 2026"
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
                    placeholder="e.g. Oct 25, 2026"
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
                    placeholder="e.g. 10:00 AM - 4:00 PM"
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
                    placeholder="e.g. PCCOE Auditorium"
                    value={formData.venue}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange}>
                    <option value="Cloud">Cloud</option>
                    <option value="Mobile">Mobile</option>
                    <option value="AI / ML">AI / ML</option>
                    <option value="Web Dev">Web Dev</option>
                    <option value="Community">Community</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Theme Color</label>
                  <select name="color" value={formData.color} onChange={handleInputChange}>
                    <option value="blue">Google Blue</option>
                    <option value="red">Google Red</option>
                    <option value="yellow">Google Yellow</option>
                    <option value="green">Google Green</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Registration Link</label>
                  <input
                    type="url"
                    name="registrationLink"
                    placeholder="https://gdg.community.dev/..."
                    value={formData.registrationLink}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Banner Image URL</label>
                <input
                  type="url"
                  name="banner"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.banner}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Event Description</label>
                <textarea
                  name="description"
                  rows="3"
                  placeholder="Brief agenda and details..."
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
                style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}
              >
                {submitting ? 'Publishing Event...' : '🚀 Publish Event Live'}
              </button>
            </form>
          </div>

          {/* Right: Existing Events List */}
          <div className="admin-card">
            <div className="admin-card-header">
              <span className="tag tag-green">Live Events ({events.length})</span>
              <h3>Manage Published Events</h3>
            </div>

            {loading ? (
              <p style={{ color: 'var(--text-muted)' }}>Loading live events...</p>
            ) : events.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No events published yet.</p>
            ) : (
              <div className="admin-events-list">
                {events.map((evt) => (
                  <div key={evt.id} className="admin-event-item">
                    <div className="admin-event-item-info">
                      <span className={`tag tag-${evt.color}`}>{evt.category}</span>
                      <h4>{evt.title}</h4>
                      <p>📅 {evt.date} | 📍 {evt.venue}</p>
                    </div>
                    <button
                      className="btn btn-outline"
                      onClick={() => handleDelete(evt.id)}
                      style={{ color: 'var(--google-red)', borderColor: 'var(--google-red)', padding: '6px 12px', fontSize: '12px' }}
                    >
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
