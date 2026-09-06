import ScrollReveal from './ui/ScrollReveal'
import './Team.css'

const TEAM_MEMBERS = [
  {
    name: 'Aarav Mehta',
    role: 'GDGC Lead',
    color: 'blue',
    avatar: 'https://i.pinimg.com/236x/5a/bd/98/5abd985735a8fd4adcb0e795de6a1005.jpg?nii=t',
    linkedin: '#',
    github: '#',
  },
  {
    name: 'Ishita Kulkarni',
    role: 'GDGC Co-Lead',
    color: 'red',
    avatar: 'https://i.pinimg.com/236x/5a/bd/98/5abd985735a8fd4adcb0e795de6a1005.jpg?nii=t',
    linkedin: '#',
    github: '#',
  },
  {
    name: 'Kabir Shah',
    role: 'Management Head',
    color: 'yellow',
    avatar: 'https://i.pinimg.com/236x/5a/bd/98/5abd985735a8fd4adcb0e795de6a1005.jpg?nii=t',
    linkedin: '#',
    github: '#',
  },
  {
    name: 'Naina Deshmukh',
    role: 'UI/UX Design Head',
    color: 'green',
    avatar: 'https://i.pinimg.com/236x/5a/bd/98/5abd985735a8fd4adcb0e795de6a1005.jpg?nii=t',
    linkedin: '#',
    github: '#',
  },
  {
    name: 'Vihaan Patil',
    role: 'Social Media Head',
    color: 'blue',
    avatar: 'https://i.pinimg.com/236x/5a/bd/98/5abd985735a8fd4adcb0e795de6a1005.jpg?nii=t',
    linkedin: '#',
    github: '#',
  },
  {
    name: 'rudresh',
    role: 'Community Developer',
    color: 'red',
    avatar: 'https://avatars.githubusercontent.com/u/250403819?s=400&u=4e4f0f86b23c306cf6cd79d4964266d2d793cff3&v=4',
    linkedin: 'https://www.linkedin.com/in/rudreshkumbhare/',
    github: 'https://www.github.com/rudreshkumbhare',
  },
]

function SocialIcon({ href, label, children }) {
  if (!href || href === '#') return null

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {children}
    </a>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
    </svg>
  )
}

export default function Team() {
  return (
    <section className="team section" id="team" aria-labelledby="team-heading">
      <div className="container">
        <div className="team__header">
          <ScrollReveal as="span" className="tag tag-green section-label-tag">
            Our Team
          </ScrollReveal>
          <ScrollReveal as="h2" className="team__heading" id="team-heading">
            Meet the Minds Behind <span className="underline-gradient">GDGC PCCOE</span>
          </ScrollReveal>
          <ScrollReveal as="p" className="team__sub" baseOpacity={0.25} blurStrength={4}>
            Passionate student leaders, developers, and creators working together to build a strong tech community.
          </ScrollReveal>
        </div>

        <div className="team__grid">
          {TEAM_MEMBERS.map((member) => (
            <ScrollReveal key={member.name} as="article" className={`team__card team__card--${member.color}`} baseOpacity={0.15} enableBlur={false}>
              <div className="team__avatar-wrapper">
                <img className="team__avatar" src={member.avatar} alt={`${member.name}, ${member.role}`} loading="lazy" />
              </div>

              <div className="team__info">
                <h3 className="team__name">{member.name}</h3>
                <p className="team__role">{member.role}</p>
              </div>

              <div className="team__card-footer">
                <div className="team__socials">
                  <SocialIcon href={member.linkedin} label={`${member.name} on LinkedIn`}>
                    <LinkedInIcon />
                  </SocialIcon>
                  <SocialIcon href={member.github} label={`${member.name} on GitHub`}>
                    <GitHubIcon />
                  </SocialIcon>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
