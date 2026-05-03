'use client'

import { useEffect, useState } from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'

const links = [
  { href: '#projects',   label: 'Work' },
  { href: '#building',   label: 'Building' },
  { href: '#leadership', label: 'Leadership' },
  { href: '#about',      label: 'About' },
  { href: '#music',      label: 'Vibes' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const bp = useBreakpoint()
  const mob = bp === 'mobile'
  const tab = bp === 'tablet'
  const compact = mob || tab

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  // Close menu on scroll
  useEffect(() => {
    if (menuOpen) {
      const h = () => setMenuOpen(false)
      window.addEventListener('scroll', h, { once: true })
    }
  }, [menuOpen])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled || menuOpen ? 'rgba(0,61,54,0.95)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,191,165,0.12)' : '1px solid transparent',
        transition: 'background .3s, border-color .3s',
        padding: mob ? '10px 20px' : '10px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '52px',
      }}>
        {/* Logo */}
        <a href="#hero" style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: mob ? '16px' : '18px',
          fontWeight: 900, color: '#F2FAFA',
          textDecoration: 'none', letterSpacing: '-0.5px',
        }}>
          N<em style={{ fontStyle: 'italic', color: 'var(--teal)' }}>C</em>
        </a>

        {/* Desktop nav */}
        {!compact && (
          <div style={{ display: 'flex', gap: '28px' }}>
            {links.map(l => (
              <a key={l.href} href={l.href} style={{
                fontFamily: 'Space Mono, monospace', fontSize: '10px',
                letterSpacing: '2.5px', textTransform: 'uppercase',
                color: 'rgba(242,250,250,0.55)', textDecoration: 'none',
                transition: 'color .2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--teal)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,250,250,0.55)')}
              >{l.label}</a>
            ))}
          </div>
        )}

        {/* Desktop live pill */}
        {!compact && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <span className="live-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal)', display: 'inline-block' }} />
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--teal)', fontWeight: 600 }}>
              Open to internships
            </span>
          </div>
        )}

        {/* Mobile/tablet: hamburger */}
        {compact && (
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'none', padding: '4px', display: 'flex', flexDirection: 'column', gap: '5px' }}
            aria-label="Toggle menu"
            data-hover
          >
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: '22px', height: '1.5px',
                background: 'var(--teal)',
                transition: 'transform .25s, opacity .25s',
                transform: menuOpen
                  ? i === 0 ? 'translateY(6.5px) rotate(45deg)'
                  : i === 2 ? 'translateY(-6.5px) rotate(-45deg)'
                  : 'scaleX(0)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        )}
      </nav>

      {/* Mobile menu drawer */}
      {compact && menuOpen && (
        <div style={{
          position: 'fixed', top: '52px', left: 0, right: 0, zIndex: 199,
          background: 'rgba(0,61,54,0.97)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(0,191,165,0.15)',
          padding: '24px 20px 28px',
          animation: 'eggIn .25s ease',
        }}>
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                fontFamily: 'Playfair Display, serif',
                fontSize: '22px', fontWeight: 700,
                color: '#F2FAFA', textDecoration: 'none',
                padding: '12px 0',
                borderBottom: '1px solid rgba(0,191,165,0.1)',
                transition: 'color .2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--teal)')}
              onMouseLeave={e => (e.currentTarget.style.color = '#F2FAFA')}
            >
              {l.label}
            </a>
          ))}
          {/* CTA in drawer */}
          <a href="mailto:chapranishika@gmail.com" target="_blank" rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              marginTop: '20px', background: 'var(--orange)', color: '#fff',
              fontFamily: 'DM Sans, sans-serif', fontSize: '12px',
              fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase',
              padding: '12px 22px', borderRadius: '3px', textDecoration: 'none',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            Mail me
          </a>
          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '7px' }}>
            <span className="live-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal)', display: 'inline-block' }} />
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--teal)' }}>
              Open to internships
            </span>
          </div>
        </div>
      )}
    </>
  )
}
