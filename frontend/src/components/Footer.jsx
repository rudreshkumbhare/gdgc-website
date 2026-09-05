import './Footer.css'
import ScrollReveal from './ui/ScrollReveal'
import ArrowFillButton from './ui/arrow-fill-button'

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
            <ScrollReveal as="span" className="tag tag-blue footer__cta-badge">
              Join 500+ Developers
            </ScrollReveal>
            <ScrollReveal as="h2" className="footer__cta-title">
              Ready to start your developer journey with GDGC PCCOE?
            </ScrollReveal>
            <ScrollReveal as="p" className="footer__cta-desc" baseOpacity={0.2} blurStrength={4}>
              Get access to exclusive Google Cloud credits, study jams, mentorship, and join our active Discord & WhatsApp community channels.
            </ScrollReveal>

            <ScrollReveal as="div" className="footer__cta-actions">
              <ArrowFillButton
                id="footer-join-community-btn"
                btnText="Join Chapter on GDG Portal"
                href="https://gdg.community.dev"
                target="_blank"
                rel="noreferrer"
                bgColor="#4285F4"
              />
              <ArrowFillButton
                btnText="Browse Events"
                href="#events"
                transparent
                textColor="var(--text-primary)"
                borderColor="#34A853"
              />
            </ScrollReveal>
          </div>
        </div>

        {/* Main Footer Links — fade/slide only, no blur: this block spans
            three full link columns, too large an area to blur cheaply. */}
        <ScrollReveal as="div" className="footer__body" baseOpacity={0.3} enableBlur={false}>
          <div className="footer__brand">
            <div className="footer__logo">
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
                <li><a href="https://www.linkedin.com/company/google-developer-groups-on-campus-pccoe/" target="_blank" rel="noreferrer">LinkedIn Page</a></li>
                <li><a href="https://www.instagram.com/gdgcpccoe/" target="_blank" rel="noreferrer">Instagram</a></li>
              </ul>
            </div>
          </div>
        </ScrollReveal>

        {/* Footer Bottom Notice */}
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} GDGC PCCOE. Built with ❤️ for the student community.</p>
          <p className="footer__disclaimer">
            GDGC PCCOE is an independent student group. Activities and opinions expressed herein should in no way be taken as official statements from Google Inc.
          </p>
        </div>
      </div>
    </footer>
  )
}
