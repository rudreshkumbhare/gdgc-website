import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer" id="join">
      {/* High-energy Join CTA card */}
      <div className="container">
        <div className="footer__cta-card animate-scaleIn">
          <div className="footer__cta-bg-blobs" aria-hidden="true">
            <span className="blob blob-blue"></span>
            <span className="blob blob-red"></span>
            <span className="blob blob-yellow"></span>
            <span className="blob blob-green"></span>
          </div>

          <div className="footer__cta-content">
            <span className="tag tag-blue footer__cta-badge">Join 500+ Developers</span>
            <h2 className="footer__cta-title">
              Ready to start your developer journey with GDGC PCCOE?
            </h2>
            <p className="footer__cta-desc">
              Get access to exclusive Google Cloud credits, study jams, mentorship, and join our active Discord & WhatsApp community channels.
            </p>

            <div className="footer__cta-actions">
              <a
                href="https://gdg.community.dev"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary footer__primary-btn"
                id="footer-join-community-btn"
              >
                Join Chapter on GDG Portal
              </a>
              <a href="#events" className="btn btn-outline footer__secondary-btn">
                Browse Events
              </a>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="footer__body">
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="google-dots">
                <span></span><span></span><span></span><span></span>
              </div>
              <span className="footer__logo-text">GDGC PCCOE</span>
            </div>
            <p className="footer__brand-desc">
              Google Developer Groups on Campus at Pimpri Chinchwad College of Engineering, Pune.
            </p>
          </div>

          <div className="footer__links-grid">
            <div className="footer__col">
              <h4>Navigation</h4>
              <ul>
                <li><a href="#hero">Home</a></li>
                <li><a href="#about">About GDGC</a></li>
                <li><a href="#what-we-do">What We Do</a></li>
                <li><a href="#events">Events & Jams</a></li>
                <li><a href="#team">Core Team</a></li>
              </ul>
            </div>

            <div className="footer__col">
              <h4>Programs</h4>
              <ul>
                <li><a href="#events">Google Cloud Jams</a></li>
                <li><a href="#events">Flutter Hackathons</a></li>
                <li><a href="#events">Solution Challenge</a></li>
                <li><a href="#events">GenAI Workshops</a></li>
              </ul>
            </div>

            <div className="footer__col">
              <h4>Connect</h4>
              <ul>
                <li><a href="#" target="_blank" rel="noreferrer">Discord Community</a></li>
                <li><a href="#" target="_blank" rel="noreferrer">WhatsApp Group</a></li>
                <li><a href="#" target="_blank" rel="noreferrer">LinkedIn Page</a></li>
                <li><a href="#" target="_blank" rel="noreferrer">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom Notice */}
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} GDGC PCCOE. Built with ❤️ for the student community.</p>
          <p className="footer__disclaimer">
            Disclaimer: GDGC PCCOE is an independent student group. Activities and opinions expressed herein should in no way be taken as official statements from Google Inc.
          </p>
        </div>
      </div>
    </footer>
  )
}
