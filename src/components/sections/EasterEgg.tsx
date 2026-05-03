'use client'

import { useState } from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'

export default function EasterEgg() {
  const [open, setOpen] = useState(false)
  const bp  = useBreakpoint()
  const mob = bp === 'mobile'
  const pad = mob ? '12px 20px' : '12px 48px'
  const padOpen = mob ? '32px 20px' : '40px 48px'

  return (
    <>
      <div
        onClick={() => setOpen(o => !o)}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setOpen(o => !o)}
        style={{
          padding: pad,
          fontSize: '9px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'rgba(74,112,106,0.5)',
          borderBottom: open ? 'none' : '1px solid var(--border)',
          cursor: 'none',
          userSelect: 'none',
          transition: 'color .3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--muted)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(74,112,106,0.5)')}
        data-hover
      >
        <span style={{ color: 'var(--orange)', opacity: open ? 1 : 0.6, transition: 'opacity .3s' }}>●</span>
        {open ? 'okay close it then.' : '··· psst. you found something. click if you\'re curious.'}
      </div>

      {open && (
        <div
          className="egg-reveal"
          style={{
            background: 'var(--orange)',
            color: '#fff',
            padding: padOpen,
            borderBottom: '3px solid var(--ink)',
          }}
        >
          <div style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: mob ? '26px' : '34px',
            fontWeight: 900,
            fontStyle: 'italic',
            marginBottom: '16px',
          }}>
            okay you actually clicked.
          </div>

          <p style={{ fontSize: '13.5px', lineHeight: 1.85, maxWidth: '580px', opacity: .96, marginBottom: '20px' }}>
            Fun fact: I once spent 3 hours debugging a Docker container at 2am only to realise I'd typed{' '}
            <strong>form</strong> instead of <strong>from</strong> in the Dockerfile.
            Worked perfectly after. I named the container. I still think about it.<br /><br />
            If you're a recruiter — hi. I ship real things, catch what others miss,
            and have been performing under pressure since I was 11.
            I want to work somewhere that makes things that <em>feel like something</em>.<br /><br />
            <strong>nishika.c@somaiya.edu · +91 83693 14670</strong>
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/918369314670"
              target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.2)', color: '#fff', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '10px 18px', borderRadius: '3px', textDecoration: 'none', transition: 'background .2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.35)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.2)')}
            >
              WhatsApp →
            </a>
            <a
              href="mailto:nishika.c@somaiya.edu"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.2)', color: '#fff', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '10px 18px', borderRadius: '3px', textDecoration: 'none', transition: 'background .2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.35)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.2)')}
            >
              Email →
            </a>
          </div>
        </div>
      )}
    </>
  )
}
