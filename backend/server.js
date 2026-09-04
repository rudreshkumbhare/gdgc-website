import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// In-memory data store for events
let events = [
  {
    id: 'evt-1',
    title: 'Google Cloud Study Jam 2026',
    date: 'Sep 20, 2026',
    time: '10:00 AM - 4:00 PM',
    venue: 'PCCOE Main Auditorium & Online',
    category: 'Cloud',
    color: 'blue',
    description: 'Get hands-on experience with Google Cloud Platform, Vertex AI, and earn official Google Cloud skill badges.',
    registrationLink: 'https://gdg.community.dev/events/',
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
    registrationLink: 'https://gdg.community.dev/events/',
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
    registrationLink: 'https://gdg.community.dev/events/',
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
];

// Root endpoint — API Status Page
app.get('/', (req, res) => {
  res.json({
    status: 'Online 🚀',
    service: 'GDGC PCCOE Backend API',
    version: '1.0.0',
    endpoints: {
      getAllEvents: 'GET /api/events',
      createEvent: 'POST /api/admin/events',
      deleteEvent: 'DELETE /api/admin/events/:id'
    }
  });
});

// Get all events (User API)
app.get('/api/events', (req, res) => {
  res.json({ success: true, count: events.length, data: events });
});

// Admin API: Create a new event
app.post('/api/admin/events', (req, res) => {
  const { title, date, time, venue, category, color, description, registrationLink, banner } = req.body;
  
  if (!title || !date || !category) {
    return res.status(400).json({ success: false, message: 'Title, date, and category are required' });
  }

  const newEvent = {
    id: `evt-${Date.now()}`,
    title,
    date,
    time: time || 'TBA',
    venue: venue || 'PCCOE Campus',
    category: category || 'General',
    color: color || 'blue',
    description: description || '',
    registrationLink: registrationLink || '#',
    status: 'Upcoming',
    banner: banner || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
  };

  events.unshift(newEvent);
  res.status(201).json({ success: true, message: 'Event pushed successfully!', data: newEvent });
});

// Admin API: Delete an event
app.delete('/api/admin/events/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = events.length;
  events = events.filter(evt => evt.id !== id);

  if (events.length === initialLength) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }

  res.json({ success: true, message: 'Event deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`GDGC PCCOE Backend Server listening on http://localhost:${PORT}`);
});
