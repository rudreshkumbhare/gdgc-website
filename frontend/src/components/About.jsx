import './About.css'
import ScrollReveal from './ui/ScrollReveal'
import ArrowFillButton from './ui/arrow-fill-button'

const PILLARS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
      </svg>
    ),
    color: 'blue',
    title: 'Learn',
    desc: 'Hands-on workshops, study jams, and speaker sessions covering the latest Google technologies.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
      </svg>
    ),
    color: 'red',
    title: 'Build',
    desc: 'Hackathons, project showcases, and collaborative builds where ideas become real products.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      </svg>
    ),
    color: 'yellow',
    title: 'Connect',
    desc: 'A growing network of 500+ peers, mentors, and Google Developer Experts across Pune.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
      </svg>
    ),
    color: 'green',
    title: 'Impact',
    desc: 'Real-world community projects, open-source contributions, and sustainable tech solutions.',
  },
]

export default function About() {
  return (
    <section className="about section" id="about" aria-labelledby="about-heading">
      <div className="container">
        {/* Top label */}
        <ScrollReveal as="div" className="section-label">
          <span className="tag tag-blue">About Us</span>
        </ScrollReveal>

        <div className="about__layout">
          {/* Left — text with ScrollReveal */}
          <div className="about__text">
            <ScrollReveal as="h2" className="about__heading" id="about-heading">
              We're <span className="about__heading-g">G</span>
              <span className="about__heading-o1">o</span>
              <span className="about__heading-o2">o</span>
              <span className="about__heading-gl">g</span>
              <span className="about__heading-e">l</span>
              <span className="about__heading-e2">e</span>'s
              <br />community at PCCOE.
            </ScrollReveal>

            <ScrollReveal as="p" className="about__para" baseOpacity={0.2} blurStrength={4}>
              Google Developer Groups on Campus GDGC PCCOE is an official student chapter at Pimpri Chinchwad College of Engineering Pune. We bring global technology energy right to your campus.
            </ScrollReveal>

            <ScrollReveal as="p" className="about__para" baseOpacity={0.2} blurStrength={4}>
              From Flutter and Firebase to Cloud and Machine Learning, we bridge classroom learning and industry-ready skills for every passionate developer.
            </ScrollReveal>

            <ScrollReveal as="div" className="about__badges">
              <span className="tag tag-blue">Google Supported</span>
              <span className="tag tag-green">Open to All</span>
              <span className="tag tag-red">Student Led</span>
              <span className="tag tag-yellow">Free Events</span>
            </ScrollReveal>

            <ScrollReveal as="div" className="about__cta-wrap">
              <ArrowFillButton
                id="about-join-btn"
                btnText="Become a Member"
                href="#join"
                bgColor="#4285F4"
              />
            </ScrollReveal>
          </div>

          {/* Right — pillar cards */}
          <div className="about__pillars stagger">
            {PILLARS.map((p) => (
              <ScrollReveal
                key={p.title}
                as="article"
                className={`about__pillar about__pillar--${p.color}`}
                aria-label={`${p.title}: ${p.desc}`}
                baseOpacity={0.2}
                enableBlur={false}
              >
                <div className={`about__pillar-icon icon-${p.color}`}>
                  {p.icon}
                </div>
                <div>
                  <h3 className="about__pillar-title">{p.title}</h3>
                  <p className="about__pillar-desc">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
