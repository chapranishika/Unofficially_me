'use client'
import { useEffect, useRef } from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'

const songs = [
  { n: '01', name: 'Jaane Kyun',          artist: 'Vishal Dadlani',          vibe: 'nostalgia' },
  { n: '02', name: 'Offo',                artist: 'Aditi Singh Sharma',      vibe: 'fun & energetic' },
  { n: '03', name: 'Manali Trance',       artist: 'Yo Yo Honey Singh',       vibe: 'dance practice 🔥' },
  { n: '04', name: 'Shiv Strotam',        artist: 'Shankar Mahadevan',       vibe: 'before a deadline' },
  { n: '05', name: 'Dope Shope',          artist: 'Yo Yo Honey Singh',       vibe: 'hype mode' },
  { n: '06', name: 'Sheesha',             artist: 'King',                    vibe: '2am debug mode' },
  { n: '07', name: 'Centuries',           artist: 'Fall Out Boy',            vibe: 'model training' },
  { n: '08', name: 'Old Money',           artist: 'AP Dhillon',              vibe: 'chill vibes' },
]

export default function Music() {
  const ref = useRef<HTMLElement>(null)
  const bp = useBreakpoint()
  const mob = bp === 'mobile'
  const tab = bp === 'tablet'

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.fade-up')
    if (!els) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.06 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const cols = mob ? '1fr 1fr' : tab ? '1fr 1fr 1fr' : 'repeat(4, 1fr)'
  const pad  = mob ? '28px 20px' : '48px'

  return (
    <section id="music" ref={ref} style={{ padding: pad, borderBottom: '3px solid var(--ink)', background: 'var(--teal-dark)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: mob ? '24px' : '30px', fontWeight: 900, color: 'var(--bg)' }}>
          What I'm <em style={{ fontStyle: 'italic', color: 'var(--teal)' }}>actually vibing to</em>
          <span className="sec-num" style={{ color: '#2a7a6a' }}>06</span>
        </h2>
        <span style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#2a7a6a' }}>real playlist · no curation</span>
      </div>

      {/* Now playing */}
      <div style={{ display: 'flex', alignItems: 'center', gap: mob ? '14px' : '22px', background: 'rgba(0,0,0,.25)', border: '1px solid #1a5a50', borderRadius: '4px', padding: mob ? '14px 16px' : '18px 22px', marginBottom: '20px' }}>
        <div className="vinyl-spin" style={{ width: mob ? '44px' : '54px', height: mob ? '44px' : '54px', borderRadius: '50%', background: 'conic-gradient(#1a5a50 0deg,#003d36 90deg,#1a5a50 180deg,#002b26 270deg)', flexShrink: 0, position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '13px', height: '13px', borderRadius: '50%', background: 'var(--bg)' }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#2a7a6a', marginBottom: '3px' }}>Now playing</div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: mob ? '15px' : '19px', fontWeight: 700, color: 'var(--bg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Jaane Kyun</div>
          <div style={{ fontSize: '11px', color: '#2a7a6a', marginTop: '2px' }}>Vishal Dadlani</div>
        </div>
        {!mob && (
          <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '26px' }}>
            {['bar-1','bar-2','bar-3','bar-4','bar-5'].map(c => (
              <div key={c} className={c} style={{ width: '3px', background: 'var(--orange)', borderRadius: '1px' }} />
            ))}
          </div>
        )}
      </div>

      {/* Songs grid */}
      <div style={{ display: 'grid', gridTemplateColumns: cols, gap: '10px' }}>
        {songs.map(s => (
          <div key={s.n} className="fade-up song-card"
            style={{ padding: mob ? '12px' : '14px' }}
          >
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '30px', color: '#1a5a50', lineHeight: 1, marginBottom: '6px' }}>{s.n}</div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--bg)', marginBottom: '3px', lineHeight: 1.3 }}>{s.name}</div>
            <div style={{ fontSize: '10px', color: '#2a7a6a' }}>{s.artist}</div>
            <div style={{ fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--orange)', marginTop: '8px' }}>{s.vibe}</div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: '22px', fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: mob ? '13px' : '15px', color: '#2a7a6a', lineHeight: 1.65 }}>
        "The playlist changes depending on whether I'm debugging or dancing. Both happen a lot. Sometimes simultaneously."
      </p>
    </section>
  )
}
