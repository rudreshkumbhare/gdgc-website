import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import ScrollReveal from './ui/ScrollReveal'
import './Gallery.css'

// 🖼️ CHANGE YOUR IMAGES HERE.
// - "cover" is the thumbnail shown in the panel below.
// - "photos" is the list shown inside the pop-up gallery when a panel is clicked.
// Swap any URL for your own event photo (any hosted image URL works — Drive, Cloudinary, etc.)
const GALLERY_ITEMS = [
  {
    id: 'workshops',
    title: 'Workshops',
    category: 'Hands-on Learning',
    color: 'blue',
    cover: 'https://picsum.photos/seed/gdgc-workshops-cover/900/1200',
    photos: [
      'https://picsum.photos/seed/gdgc-workshops-1/700/500',
      'https://picsum.photos/seed/gdgc-workshops-2/700/500',
      'https://picsum.photos/seed/gdgc-workshops-3/700/500',
      'https://picsum.photos/seed/gdgc-workshops-4/700/500',
      'https://picsum.photos/seed/gdgc-workshops-5/700/500',
      'https://picsum.photos/seed/gdgc-workshops-6/700/500',
    ],
  },
  {
    id: 'hackathons',
    title: 'Hackathons',
    category: 'Build & Ship',
    color: 'red',
    cover: 'https://picsum.photos/seed/gdgc-hackathons-cover/900/1200',
    photos: [
      'https://picsum.photos/seed/gdgc-hackathons-1/700/500',
      'https://picsum.photos/seed/gdgc-hackathons-2/700/500',
      'https://picsum.photos/seed/gdgc-hackathons-3/700/500',
      'https://picsum.photos/seed/gdgc-hackathons-4/700/500',
      'https://picsum.photos/seed/gdgc-hackathons-5/700/500',
      'https://picsum.photos/seed/gdgc-hackathons-6/700/500',
    ],
  },
  {
    id: 'study-jams',
    title: 'Study Jams',
    category: 'Learn Together',
    color: 'yellow',
    cover: 'https://picsum.photos/seed/gdgc-studyjams-cover/900/1200',
    photos: [
      'https://picsum.photos/seed/gdgc-studyjams-1/700/500',
      'https://picsum.photos/seed/gdgc-studyjams-2/700/500',
      'https://picsum.photos/seed/gdgc-studyjams-3/700/500',
      'https://picsum.photos/seed/gdgc-studyjams-4/700/500',
      'https://picsum.photos/seed/gdgc-studyjams-5/700/500',
      'https://picsum.photos/seed/gdgc-studyjams-6/700/500',
    ],
  },
  {
    id: 'fests',
    title: 'Fests & Socials',
    category: 'Community Vibes',
    color: 'green',
    cover: 'https://picsum.photos/seed/gdgc-fests-cover/900/1200',
    photos: [
      'https://picsum.photos/seed/gdgc-fests-1/700/500',
      'https://picsum.photos/seed/gdgc-fests-2/700/500',
      'https://picsum.photos/seed/gdgc-fests-3/700/500',
      'https://picsum.photos/seed/gdgc-fests-4/700/500',
      'https://picsum.photos/seed/gdgc-fests-5/700/500',
      'https://picsum.photos/seed/gdgc-fests-6/700/500',
    ],
  },
  {
    id: 'meetups',
    title: 'Meetups',
    category: 'Tech Talks',
    color: 'blue',
    cover: 'https://picsum.photos/seed/gdgc-meetups-cover/900/1200',
    photos: [
      'https://picsum.photos/seed/gdgc-meetups-1/700/500',
      'https://picsum.photos/seed/gdgc-meetups-2/700/500',
      'https://picsum.photos/seed/gdgc-meetups-3/700/500',
      'https://picsum.photos/seed/gdgc-meetups-4/700/500',
      'https://picsum.photos/seed/gdgc-meetups-5/700/500',
      'https://picsum.photos/seed/gdgc-meetups-6/700/500',
    ],
  },
]

function GalleryModal({ item, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!item) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  if (!item) return null

  return (
    <div
      className="gallery-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} gallery`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="gallery-modal__panel" ref={dialogRef}>
        <div className="gallery-modal__header">
          <div>
            <span className={`tag tag-${item.color} gallery-modal__tag`}>{item.category}</span>
            <h3 className="gallery-modal__title">{item.title}</h3>
          </div>
          <button
            type="button"
            className="gallery-modal__close"
            onClick={onClose}
            aria-label="Close gallery"
          >
            <X size={20} />
          </button>
        </div>

        <div className="gallery-modal__grid">
          {item.photos.map((src, i) => (
            <div className="gallery-modal__card" key={src}>
              <img
                src={src}
                alt={`${item.title} photo ${i + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Gallery() {
  const [activeId, setActiveId] = useState(GALLERY_ITEMS[2]?.id ?? GALLERY_ITEMS[0].id)
  const [openItem, setOpenItem] = useState(null)

  const handlePanelClick = (item) => {
    // First tap/click expands the panel; a second click on the
    // already-expanded panel opens the full gallery pop-up.
    if (activeId === item.id) {
      setOpenItem(item)
    } else {
      setActiveId(item.id)
    }
  }

  return (
    <section className="gallery section" id="gallery" aria-labelledby="gallery-heading">
      <div className="container">
        <div className="gallery__header">
          <ScrollReveal as="span" className="tag tag-blue section-label-tag">
            Gallery
          </ScrollReveal>
          <ScrollReveal as="h2" className="gallery__heading" id="gallery-heading">
            Moments Worth <span className="underline-gradient">Remembering</span>
          </ScrollReveal>
          <ScrollReveal as="p" className="gallery__sub" baseOpacity={0.25} blurStrength={4}>
            A peek into our workshops, hackathons, and community meetups. Click a panel to open the full album.
          </ScrollReveal>
        </div>

        <div className="gallery__strip">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setActiveId(item.id)}
              onClick={() => handlePanelClick(item)}
              className={`gallery__panel gallery__panel--${item.color} ${activeId === item.id ? 'gallery__panel--active' : ''}`}
              role="button"
              tabIndex={0}
              aria-label={`Open ${item.title} gallery`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handlePanelClick(item)
                }
              }}
            >
              <div className="gallery__panel-bg">
                <img
                  src={item.cover}
                  alt={item.title}
                  loading="lazy"
                  className="gallery__panel-img"
                />
                <div className="gallery__panel-overlay" />
              </div>

              <div className="gallery__panel-content">
                <div className="gallery__panel-active-content">
                  <span className={`tag tag-${item.color} gallery__panel-tag`}>{item.category}</span>
                  <h3 className="gallery__panel-title">{item.title}</h3>
                  <span className="gallery__panel-cta">
                    View Gallery <ArrowUpRight size={16} />
                  </span>
                </div>

                <div className="gallery__panel-idle-content">
                  <span className="gallery__panel-vertical">{item.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <GalleryModal item={openItem} onClose={() => setOpenItem(null)} />
    </section>
  )
}
