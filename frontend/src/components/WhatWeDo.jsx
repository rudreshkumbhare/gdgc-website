import './WhatWeDo.css'
import ScrollReveal from './ui/ScrollReveal'
import { useMagneticHover } from './ui/useMagneticHover'
import ArrowFillButton from './ui/arrow-fill-button'

// Magnetic activity card wrapper
function MagneticWWDCard({ act }) {
  const { cardRef, glowRef } = useMagneticHover({ strength: 0.25, tiltStrength: 9, lift: true })
  return (
    <article
      ref={cardRef}
      className={`wwd__card wwd__card--${act.color} animate-fadeUp`}
      id={`wwd-card-${act.id}`}
      role="listitem"
      aria-label={act.title}
    >
      <div ref={glowRef} className="wwd__card-glow" aria-hidden="true" />
      <div className="wwd__card-top">
        <div className={`wwd__card-icon icon-${act.color}`}>
          {act.icon}
        </div>
        <div className="wwd__card-stat">
          <span className={`wwd__stat-num stat-${act.color}`}>{act.count}</span>
          <span className="wwd__stat-label">{act.countLabel}</span>
        </div>
      </div>
      <h3 className="wwd__card-title">{act.title}</h3>
      <p className="wwd__card-desc">{act.desc}</p>
      <div className="wwd__card-tags">
        {act.tags.map((t) => (
          <span key={t} className={`tag tag-${act.color} wwd__tag`}>{t}</span>
        ))}
      </div>
    </article>
  )
}

const ACTIVITIES = [
  {
    id: 'workshops',
    color: 'blue',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
      </svg>
    ),
    title: 'Workshops',
    desc: 'Hands-on technical workshops led by industry experts and Googlers covering Flutter, Firebase, Cloud, AI/ML, and more.',
    tags: ['Flutter', 'Firebase', 'Cloud'],
    count: '25+',
    countLabel: 'workshops',
  },
  {
    id: 'hackathons',
    color: 'red',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
      </svg>
    ),
    title: 'Hackathons',
    desc: '24–48 hour build-a-thons where teams ideate, prototype, and ship real products. Prizes, mentorship, and Google swag included.',
    tags: ['24h Build', 'Teams', 'Prizes'],
    count: '8+',
    countLabel: 'hackathons',
  },
  {
    id: 'study-jams',
    color: 'yellow',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
      </svg>
    ),
    title: 'Study Jams',
    desc: 'Structured group learning sessions following Google\'s official learning paths. Earn Google certificates and badges together.',
    tags: ['Certs', 'Google Cloud', 'Free'],
    count: '12+',
    countLabel: 'study jams',
  },
  {
    id: 'info-sessions',
    color: 'green',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"/>
      </svg>
    ),
    title: 'Info Sessions & Talks',
    desc: 'Inspirational talks from developers, GDEs, and startup founders. Career guidance, resume reviews, and industry insights.',
    tags: ['GDEs', 'Career', 'Industry'],
    count: '15+',
    countLabel: 'sessions',
  },
  {
    id: 'projects',
    color: 'blue',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
      </svg>
    ),
    title: 'Community Projects',
    desc: 'Collaborate on open-source projects, campus utility apps, and social good initiatives. Real experience, real impact.',
    tags: ['Open Source', 'Collaboration', 'Portfolio'],
    count: '20+',
    countLabel: 'projects',
  },
  {
    id: 'networking',
    color: 'green',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      </svg>
    ),
    title: 'Networking',
    desc: 'Connect with peers, alumni, Google employees, and startup founders at our social mixers and afterparty events.',
    tags: ['Alumni', 'Google', 'Startups'],
    count: '500+',
    countLabel: 'connections',
  },
]

export default function WhatWeDo() {
  return (
    <section className="what-we-do section" id="what-we-do" aria-labelledby="wwd-heading">
      <div className="container">
        {/* Header */}
        <div className="wwd__header">
          <ScrollReveal as="div" className="tag tag-red section-label-tag">
            What We Do
          </ScrollReveal>
          <ScrollReveal as="h2" className="wwd__heading" id="wwd-heading">
            Everything you need to
            <br />
            <span className="wwd__heading-accent">level&nbsp;up</span> as a developer.
          </ScrollReveal>
          <ScrollReveal as="p" className="wwd__sub" baseOpacity={0.25} blurStrength={4}>
            From beginner-friendly workshops to advanced hackathons GDGC PCCOE has an activity for every stage of your journey.
          </ScrollReveal>
        </div>

        {/* Cards grid — magnetic hover with ScrollReveal */}
        <div className="wwd__grid stagger" role="list">
          {ACTIVITIES.map((act) => (
            <ScrollReveal key={act.id} as="div" baseOpacity={0.2} blurStrength={6}>
              <MagneticWWDCard act={act} />
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA bar */}
        <ScrollReveal as="div" className="wwd__cta-bar animate-fadeUp" baseOpacity={0.25} blurStrength={4}>
          <p>Ready to dive in?</p>
          <div className="wwd__cta-btns">
            <ArrowFillButton
              id="wwd-events-btn"
              btnText="See Upcoming Events"
              href="#events"
              bgColor="#FBBC04"
            />
            <ArrowFillButton
              id="wwd-join-btn"
              btnText="Join for Free"
              href="#join"
              transparent
              textColor="var(--text-primary)"
              borderColor="#4285F4"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
