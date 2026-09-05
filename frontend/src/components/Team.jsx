import './Team.css'
import ScrollReveal from './ui/ScrollReveal'
import TeamKineticList from './ui/TeamKineticList'

const TEAM_MEMBERS = [
  {
    name: 'Mayur Kharat',
    role: 'GDGC Lead',
    domain: 'Leadership',
    color: 'blue',
    avatar: 'https://i.pinimg.com/236x/5a/bd/98/5abd985735a8fd4adcb0e795de6a1005.jpg?nii=t',
    linkedin: '#',
    github: '#',
    twitter: '#'
  },
  {
    name: 'Sharvari Bangar',
    role: 'GDGC Co-Lead',
    domain: 'Leadership',
    color: 'red',
    avatar: 'https://i.pinimg.com/236x/5a/bd/98/5abd985735a8fd4adcb0e795de6a1005.jpg?nii=t',
    linkedin: '#',
    github: '#',
    twitter: '#'
  },
  {
    name: 'Soumil Chandra',
    role: 'Management Head',
    domain: 'Management',
    color: 'yellow',
    avatar: 'https://i.pinimg.com/236x/5a/bd/98/5abd985735a8fd4adcb0e795de6a1005.jpg?nii=t',
    linkedin: '#',
    github: '#',
    twitter: '#'
  },
  {
    name: 'Samiksha Mote',
    role: 'UI/UX Design Head',
    domain: 'UI/UX Design',
    color: 'green',
    avatar: 'https://i.pinimg.com/236x/5a/bd/98/5abd985735a8fd4adcb0e795de6a1005.jpg?nii=t',
    linkedin: '#',
    github: '#',
    twitter: '#'
  },
  {
    name: 'Prachi Pawar',
    role: 'Social Media Head',
    domain: 'Social Media',
    color: 'blue',
    avatar: 'https://i.pinimg.com/236x/5a/bd/98/5abd985735a8fd4adcb0e795de6a1005.jpg?nii=t',
    linkedin: '#',
    github: '#',
    twitter: '#'
  },
  {
    name: 'rudresh',
    role: 'idk what i do',
    domain: 'anywhere',
    color: 'red',
    avatar: 'https://avatars.githubusercontent.com/u/250403819?s=400&u=4e4f0f86b23  c306cf6cd79d4964266d2d793cff3&v=4',
    linkedin: 'https://www.linkedin.com/in/rudreshkumbhare/',
    github: 'https://www.github.com/rudreshkumbhare',
    twitter: '#'
  }
]

export default function Team() {
  return (
    <section className="team section" id="team" aria-labelledby="team-heading">
      <div className="container">
        {/* Header */}
        <div className="team__header">
          <ScrollReveal as="span" className="tag tag-green section-label-tag">
            Our Team
          </ScrollReveal>
          <ScrollReveal as="h2" className="team__heading" id="team-heading">
            Meet the Minds Behind <span className="underline-gradient">GDGC PCCOE</span>
          </ScrollReveal>
          <ScrollReveal as="p" className="team__sub" baseOpacity={0.25} blurStrength={4}>
            Passionate student leaders developers and creators working together to build a strong tech community.
          </ScrollReveal>
        </div>

        {/* Kinetic Team List — fade/slide only, no blur: this wraps the
            entire team list (photos, floating preview, everything), and
            animating `filter: blur()` across a container that large was
            the single heaviest scroll-reveal on the page. */}
        <ScrollReveal as="div" baseOpacity={0.2} enableBlur={false}>
          <TeamKineticList members={TEAM_MEMBERS} />
        </ScrollReveal>
      </div>
    </section>
  )
}