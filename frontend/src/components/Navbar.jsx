import StaggeredMenu from './ui/StaggeredMenu'

const menuItems = [
  { label: 'ABOUT',       ariaLabel: 'Learn about GDGC PCCOE',     link: '#about',      color: 'blue' },
  { label: 'WHAT WE DO',  ariaLabel: 'View our activities',        link: '#what-we-do', color: 'red' },
  { label: 'EVENTS',      ariaLabel: 'Browse upcoming events',     link: '#events',     color: 'yellow' },
  { label: 'TEAM',        ariaLabel: 'Meet the core team',         link: '#team',       color: 'green' },
  { label: 'JOIN US',     ariaLabel: 'Join chapter community',     link: '#join',       color: 'blue' },
]

const socialItems = [
  { label: 'LinkedIn',  link: 'https://www.linkedin.com/company/google-developer-groups-on-campus-pccoe/' },
  { label: 'Instagram', link: 'https://www.instagram.com/gdgcpccoe/' },
]

export default function Navbar() {
  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={false}
      menuButtonColor="var(--text-primary)"
      openMenuButtonColor="var(--text-primary)"
      changeMenuColorOnOpen={false}
      colors={['#4285F4', '#EA4335', '#FBBC04', '#34A853']}
      accentColor="#4285F4"
      isFixed={true}
      closeOnClickAway={true}
    />
  )
}
