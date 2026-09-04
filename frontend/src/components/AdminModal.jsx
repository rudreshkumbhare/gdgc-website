import { useState } from 'react'
import './AdminModal.css'

export default function AdminModal({ isOpen, onClose, onAddEvent }) {
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

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title || !formData.date) return

    const newEvent = {
      ...formData,
      id: `evt-${Date.now()}`,
      status: 'Upcoming'
    }

    onAddEvent(newEvent)
    onClose()

    // Reset form
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

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-labelledby="modal-title">
        <div className="admin-modal__header">
          <div className="admin-modal__title-group">
            <span className="tag tag-red">Admin Portal</span>
            <h3 id="modal-title">Push New Event</h3>
          </div>
          <button className="admin-modal__close" onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-modal__form">
          <div className="form-group">
            <label>Event Title *</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Android Study Jam 2026"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date *</label>
              <input
                type="text"
                name="date"
                placeholder="e.g. Nov 12, 2026"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input
                type="text"
                name="time"
                placeholder="e.g. 10:00 AM - 2:00 PM"
                value={formData.time}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Venue</label>
              <input
                type="text"
                name="venue"
                placeholder="e.g. PCCOE Lab 5"
                value={formData.venue}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange}>
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
              <label>Brand Theme Color</label>
              <select name="color" value={formData.color} onChange={handleChange}>
                <option value="blue">Google Blue (#4285F4)</option>
                <option value="red">Google Red (#EA4335)</option>
                <option value="yellow">Google Yellow (#FBBC04)</option>
                <option value="green">Google Green (#34A853)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Banner Image URL</label>
              <input
                type="url"
                name="banner"
                placeholder="https://..."
                value={formData.banner}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Brief details about the session..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="admin-modal__actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Publish Event Live
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
