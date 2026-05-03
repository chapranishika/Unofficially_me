'use client'

import { useEffect, useRef } from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'

const items = [
  {
    tag: 'In progress · 80%',
    name: 'RelapseGuard v2',
    desc: 'Multi-modal risk signals + improved SSE streaming. NHIS 2024 data pipeline rewrite.',
    pct: 80,
  },
  {
    tag: 'Research · 45%',
    name: 'NVIDIA Deep Learning cert',
    desc: 'Generative AI certification in progress. Applying to FraudGuard anomaly detection.',
    pct: 45,
  },
]

export default function Building() {
  const ref    = useRef<HTMLElement>(null)
  const bp     = useBreakpoint()
  const mob    = bp === 'mobile'
  const pad    = mob ? '28px 20px' : '48px'

  useEffect(() => {
    const section = ref.current
    if (!section) return

    // Fade-up cards
    const cards = section.querySelectorAll<HTMLElement>('.fade-up')
    const cardObs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    cards.forEach(el => cardObs.observe(el))

    // Progress bars — trigger when scrolled in
    const bars = section.querySelectorAll<HTMLElement>('.grow-bar')
    const barObs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          const bar = e.target as HTMLElement
          // small delay so card fade lands first
          setTimeout(() => bar.classList.add('animate'), 300)
          barObs.unobserve(bar)
        }
      }),
      { threshold: 0.5 }
    )
    bars.forEach(el => barObs.observe(el))

    return () => { cardObs.disconnect(); barObs.disconnect() }
  }, [])

  return (
    <section id="building" ref={ref} style={{ padding: pad, borderBottom: '3px solid var(--ink)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: mob ? '24px' : '30px', fontWeight: 900 }}>
          Currently <em style={{ fontStyle: 'italic', color: 'var(--teal-mid)' }}>building</em>
          <span className="sec-num">02</span>
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--ink)', color: 'var(--bg)', fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', padding: '6px 14px', borderRadius: '2px' }}>
          <span className="live-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal)', display: 'inline-block' }} />
          Live
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? '16px' : '24px' }}>
        {items.map(item => (
          <div key={item.name} className="build-card fade-up">
            <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--teal-mid)', marginBottom: '8px', fontWeight: 600 }}>
              {item.tag}
            </div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '19px', fontWeight: 700, marginBottom: '6px' }}>
              {item.name}
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--muted)', lineHeight: 1.65 }}>
              {item.desc}
            </p>
            <div style={{ marginTop: '14px', height: '2px', background: 'var(--border)', borderRadius: '1px', overflow: 'hidden' }}>
              {/* --bar-width drives the CSS transition target */}
              <div
                className="grow-bar"
                style={{ '--bar-width': `${item.pct}%`, height: '100%', background: 'linear-gradient(90deg,var(--teal-mid),var(--teal))', borderRadius: '1px' } as React.CSSProperties}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
