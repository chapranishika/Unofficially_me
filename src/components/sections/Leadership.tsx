'use client'
import { useEffect, useRef } from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'

const events = [
  { name: 'Garba Night',    desc: 'Full event marketing' },
  { name: 'Freshers',       desc: 'Campus-wide campaign' },
  { name: 'Farewell',       desc: 'Brand + collateral' },
  { name: 'Naari',          desc: "Women's day event" },
  { name: 'Sports Fests',   desc: 'Inter-college promos' },
  { name: 'Cultural + Tech',desc: 'Multi-event campaigns' },
]

export default function Leadership() {
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
    <section id="leadership" ref={ref} style={{ padding: pad, borderBottom: '3px solid var(--ink)', background: 'var(--light)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px', flexWrap: 'wrap', gap: '8px' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: mob ? '24px' : '30px', fontWeight: 900 }}>
          Beyond <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>the code</em>
          <span className="sec-num">04</span>
        </h2>
        <span style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)' }}>
          Leadership · Events · Culture
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : '1fr 2px 1fr', gap: 0 }}>

        {/* BloomBox */}
        <div className="fade-up" style={{ paddingRight: compact ? 0 : '40px', paddingBottom: compact ? '32px' : 0, borderBottom: compact ? '1px solid var(--border)' : 'none' }}>
          <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--teal-mid)', marginBottom: '10px', fontWeight: 600 }}>
            Marketing Head · 2025–Present
          </div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: mob ? '20px' : '22px', fontWeight: 900, marginBottom: '10px' }}>
            BloomBox <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>Entrepreneurship Cell</em>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.75, marginBottom: '16px' }}>
            Leading all marketing for KJSSE's entrepreneurship cell — brand strategy, campaigns, social presence, outreach. Building the kind of thing from the inside that I want to work on from the outside.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['Brand Strategy', 'Campaigns', 'Social Media', 'Outreach'].map(t => (
              <span key={t} style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '5px 12px', border: '1.5px solid var(--orange)', borderRadius: '2px', color: 'var(--orange)' }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Divider — desktop only */}
        {!compact && <div style={{ background: 'var(--ink)' }} />}

        {/* Student Council */}
        <div className="fade-up" style={{ paddingLeft: compact ? 0 : '40px', paddingTop: compact ? '32px' : 0 }}>
          <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--teal-mid)', marginBottom: '10px', fontWeight: 600 }}>
            Jt. Marketing Secretary · 2024–25
          </div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: mob ? '20px' : '22px', fontWeight: 900, marginBottom: '10px' }}>
            Student <em style={{ fontStyle: 'italic', color: 'var(--teal-mid)' }}>Council, KJSSE</em>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.75, marginBottom: '16px' }}>
            Co-ran marketing for every major college event — end to end. If it happened at KJSSE, I had a hand in making people show up for it.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : '1fr 1fr', gap: '8px' }}>
            {events.map(ev => (
              <div key={ev.name} style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: '4px', padding: '10px 14px' }}>
                <div style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--orange)', fontWeight: 600, marginBottom: '3px' }}>{ev.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{ev.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
