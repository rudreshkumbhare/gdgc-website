// Centralized backend API base URL.
//
// Locally, this defaults to http://localhost:5001 so `npm run dev` keeps
// working exactly as before with no setup required.
//
// When you deploy the frontend (Vercel/Netlify/etc.) the browser can no
// longer reach "localhost:5001" — that address means "the visitor's own
// computer", not your server. To fix this in production, set the
// VITE_API_URL environment variable in your hosting provider's dashboard
// to your deployed backend's URL, e.g.:
//   VITE_API_URL=https://your-backend.onrender.com
//
// (Copy .env.example to .env.local for local overrides if you ever run
// the backend on a different port/host.)
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'
