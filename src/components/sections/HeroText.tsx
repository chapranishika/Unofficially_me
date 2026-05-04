'use client'

import { useEffect, useRef } from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'

export default function HeroText() {
  const ref = useRef<HTMLDivElement>(null)
  const bp = useBreakpoint()
  const mob = bp === 'mobile'
  const tab = bp === 'tablet'

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(28px)'
    const t = setTimeout(() => {
      el.style.transition = 'opacity 1.2s ease, transform 1.2s ease'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    }, 500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute', inset: 0, zIndex: 10,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: mob ? '70px 20px 36px' : tab ? '70px 32px 40px' : '80px 48px 48px',
      }}
    >
      {/* Top label */}
      <div style={{ pointerEvents: 'auto' }}>
        <p style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: mob ? '8px' : '10px',
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
          color: 'rgba(0,191,165,0.65)',
        }}>
          Mumbai · India · Open to internships
        </p>
      </div>

      {/* Mobile: stack vertically. Desktop: side by side */}
      <div style={{
        display: 'flex',
        flexDirection: mob ? 'column' : 'row',
        alignItems: mob ? 'stretch' : 'flex-end',
        justifyContent: 'space-between',
        gap: mob ? '20px' : '24px',
        pointerEvents: 'auto',
      }}>
        {/* Left: intro + stats */}
        <div style={{ maxWidth: mob ? '100%' : '400px' }}>
          <p style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '9px', letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'rgba(0,191,165,0.5)',
            marginBottom: '10px',
          }}>
            ML Engineer · GenAI Builder · Published Researcher
          </p>
          <p style={{
            fontSize: mob ? '13px' : '15px',
            color: 'rgba(242,250,250,0.72)',
            lineHeight: 1.72, fontWeight: 300,
          }}>
            I build things that work in production.{' '}
            <span style={{ color: 'var(--cream)', fontWeight: 500 }}>
              Not demos. Not notebooks.
            </span>{' '}
            Products with real users and real data.
          </p>

          {/* Stats — hide on very small screens */}
          {!mob && (
            <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
              {[
                { n: '0.99', l: 'ROC-AUC' },
                { n: '9.3',  l: 'CGPA' },
                { n: '5',    l: 'Projects' },
              ].map(s => (
                <div key={s.l}>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', fontWeight: 900, color: 'var(--teal)', lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(0,191,165,0.45)', marginTop: '3px' }}>{s.l}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: CTAs */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: mob ? 'flex-start' : 'flex-end',
        }}>
          {/* Mail — primary */}
          <a
            href="mailto:chapranishika@gmail.com"
            target="_blank" rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: 'var(--orange)', color: '#fff',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: mob ? '12px' : '13px',
              fontWeight: 600, letterSpacing: '1.5px',
              textTransform: 'uppercase',
              padding: mob ? '12px 20px' : '14px 28px',
              borderRadius: '3px', textDecoration: 'none',
              transition: 'background .2s, transform .15s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='#FF8C5A'; e.currentTarget.style.transform='translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background='var(--orange)'; e.currentTarget.style.transform='translateY(0)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            Mail me
          </a>

          {/* WhatsApp — restore CTA */}
          <a
            href="https://wa.me/918369314670"
            target="_blank" rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: 'rgba(0,191,165,0.12)', color: 'var(--cream)',
              fontFamily: 'DM Sans, sans-serif', fontSize: mob ? '12px' : '13px',
              fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase',
              padding: mob ? '12px 20px' : '12px 22px',
              borderRadius: '3px', textDecoration: 'none',
              transition: 'background .15s, transform .12s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='var(--teal)'; e.currentTarget.style.transform='translateY(-2px)'}}
            onMouseLeave={e => { e.currentTarget.style.background='rgba(0,191,165,0.12)'; e.currentTarget.style.transform='translateY(0)'}}
          >
            WhatsApp →
          </a>

          {/* Secondary links */}
          <div style={{ display: 'flex', gap: '16px' }}>
            {[
              { label: 'GitHub',   href: 'https://github.com/chapranishika' },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/nco02' },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                style={{
                  fontFamily: 'Space Mono, monospace', fontSize: '10px',
                  letterSpacing: '2px', textTransform: 'uppercase',
                  color: 'rgba(0,191,165,0.6)', textDecoration: 'none',
                  borderBottom: '1px solid rgba(0,191,165,0.25)',
                  paddingBottom: '2px', transition: 'color .2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--teal)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(0,191,165,0.6)')}
              >
                {l.label} →
              </a>
            ))}
          </div>

          {!mob && (
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', letterSpacing: '2px', color: 'rgba(0,191,165,0.3)', textTransform: 'uppercase', textAlign: 'right' }}>
              scroll ↓
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
