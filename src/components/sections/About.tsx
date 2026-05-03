'use client'
import { useEffect, useRef } from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'

// Photo embedded as base64 — replace src attr with your photo
const PHOTO_PLACEHOLDER = "/photo.png"

const facts = [
  { label: 'College',    value: 'KJSSE + IIT Madras',  color: '' },
  { label: 'Degree',     value: 'B.Tech IT + B.Sc. DS',color: '' },
  { label: 'CGPA',       value: '9.3 / 10',            color: 'var(--teal-mid)' },
  { label: 'Publication',value: 'ICCET 2026 ↗',        color: 'var(--teal-mid)', href: 'https://drive.google.com/file/d/13DOjauPinLhMkZyL5ACZXexEDvVOXVWE/view?usp=sharing' },
  { label: 'Experience', value: 'WOLFx · Cert ↗',      color: '', href: 'https://drive.google.com/file/d/1PFmdKGRp1GaHa-cI4ItGWv-dvhBolYI7/view?usp=sharing' },
  { label: 'IIT Cert',   value: 'Foundation DS ↗',     color: '', href: 'https://drive.google.com/file/d/1Ny9y4ChDDEAulTF4YXvXGWswUJm64CIj/view?usp=sharing' },
  { label: 'Resume',     value: 'Download PDF ↓',      color: 'var(--orange)', href: 'https://drive.google.com/file/d/1PF50MwoH8csexG9UdkC_4EP8g-QH73HO/view' },
  { label: 'Status',     value: 'Open to intern 🔥',   color: 'var(--orange)' },
]

function Photo({ size }: { size: number }) {
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: '-10px', borderRadius: '50%', border: '1.5px dashed var(--border)', animation: 'ringRotate 16s linear infinite' }} />
      <img
        src={PHOTO_PLACEHOLDER}
        alt="Nishika Chapra"
        style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top', border: '3px solid var(--teal-mid)', display: 'block' }}
      />
    </div>
  )
}

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const bp = useBreakpoint()
  const mob = bp === 'mobile'
  const tab = bp === 'tablet'
  const compact = mob || tab

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.fade-up')
    if (!els) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.07 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const pad = mob ? '28px 20px' : '48px'

  return (
    <section id="about" ref={ref} style={{ borderBottom: '3px solid var(--ink)' }}>

      {/* Mobile / tablet: single column */}
      {compact ? (
        <div style={{ padding: pad }}>
          {/* Photo centred */}
          <div className="fade-up" style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
            <Photo size={140} />
          </div>

          <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '12px' }}>// about</div>
          <h2 className="fade-up" style={{ fontFamily: 'Playfair Display, serif', fontSize: mob ? '36px' : '44px', fontWeight: 900, lineHeight: .95, letterSpacing: '-1px', marginBottom: '20px' }}>
            The whole <em style={{ fontStyle: 'italic', color: 'var(--teal-mid)' }}>picture.</em>
            <span className="sec-num">05</span>
          </h2>
          <p className="fade-up" style={{ fontSize: '13.5px', lineHeight: 1.82, color: 'var(--muted)', marginBottom: '20px' }}>
            Not just an ML engineer. Someone who questions what everyone else accepts, ships things that actually work, and has been performing under pressure since age 3.<br /><br />
            Two degrees simultaneously. One peer-reviewed publication. Five deployed projects.<br /><br />
            <strong style={{ color: 'var(--ink)' }}>I don't believe in doing one thing.</strong>
          </p>
          <div className="fade-up" style={{ padding: '16px 20px', borderLeft: '3px solid var(--orange)', background: 'var(--light)', fontSize: '13px', lineHeight: 1.7, color: 'var(--ink)', fontStyle: 'italic', marginBottom: '24px' }}>
            "I've been on stage since I was 3. Judges, audiences, pressure. The same way I approach a dance — I don't ship until it's ready to perform."<br /><br />
            "Being a sportsperson taught me spirit. You don't always win, but you always play full out."<br /><br />
            Quote I live by: "Just keep going hahaha hehehe everything will be sorted."
          </div>

          {/* Hobby chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
            {['💃 Dancer · 10yr', '🏸 Badminton', '⚽ Football', '🏐 Throwball'].map(h => (
              <span key={h} className="hobby-chip">
                {h}
              </span>
            ))}
          </div>

          {/* Facts */}
          {facts.map(f => (
            <div key={f.label} className="fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--muted)' }}>{f.label}</span>
              {f.href ? (
                <a href={f.href} target="_blank" rel="noreferrer" className="fact-link" style={{ fontFamily: 'Playfair Display, serif', fontSize: '14px', fontWeight: 700, color: f.color || 'var(--ink)' }}>{f.value}</a>
              ) : (
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '14px', fontWeight: 700, color: f.color || 'var(--ink)' }}>{f.value}</span>
              )}
            </div>
          ))}
        </div>

      ) : (
        /* Desktop: two columns */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2px 1fr' }}>
          {/* Left col */}
          <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '14px' }}>// about</div>
              <h2 className="fade-up" style={{ fontFamily: 'Playfair Display, serif', fontSize: '48px', fontWeight: 900, lineHeight: .95, letterSpacing: '-1px' }}>
                The<br />whole<br /><em style={{ fontStyle: 'italic', color: 'var(--teal-mid)' }}>picture.</em>
                <span className="sec-num">05</span>
              </h2>
              <p className="fade-up" style={{ fontSize: '13.5px', lineHeight: 1.82, color: 'var(--muted)', marginTop: '20px' }}>
                Not just an ML engineer. Someone who questions what everyone else accepts, ships things that actually work, and has been performing under pressure since age 3.<br /><br />
                Two degrees simultaneously. One peer-reviewed publication. Five deployed projects.<br /><br />
                <strong style={{ color: 'var(--ink)' }}>I don't believe in doing one thing.</strong>
              </p>
              <div className="fade-up" style={{ marginTop: '20px', padding: '16px 20px', borderLeft: '3px solid var(--orange)', background: 'var(--light)', fontSize: '13px', lineHeight: 1.7, color: 'var(--ink)', fontStyle: 'italic' }}>
                "I've been on stage since I was 3. Judges, audiences, pressure. The same way I approach a dance — I don't ship until it's ready to perform."<br /><br />
                "Being a sportsperson taught me spirit. You don't always win, but you always play full out."<br /><br />
                Quote I live by: "Just keep going hahaha hehehe everything will be sorted."
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '24px' }}>
              {['💃 Dancer · 10yr · National', '🏸 Badminton', '⚽ Football', '🏐 Throwball'].map(h => (
                <span key={h} className="hobby-chip">
                  {h}
                </span>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--ink)' }} />

          {/* Right col */}
          <div style={{ padding: '48px' }}>
            <div className="fade-up" style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
              <Photo size={160} />
            </div>
            {facts.map(f => (
              <div key={f.label} className="fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '13px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--muted)' }}>{f.label}</span>
                {f.href ? (
                  <a href={f.href} target="_blank" rel="noreferrer" className="fact-link" style={{ fontFamily: 'Playfair Display, serif', fontSize: '15px', fontWeight: 700, color: f.color || 'var(--ink)' }}>{f.value}</a>
                ) : (
                  <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '15px', fontWeight: 700, color: f.color || 'var(--ink)' }}>{f.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
