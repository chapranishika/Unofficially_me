'use client'

import { useEffect, useRef } from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'

const projects = [
  {
    slug: 'Relapse', rest: 'Guard',
    stack: ['FastAPI', 'Gemini', 'React', 'Docker'],
    desc: 'AI recovery PWA. 4-class addiction classification on 30,882 NHIS 2024 records. Crisis interceptor hard-overrides to 988 Lifeline — it calls for help before the user can stop it. bcrypt, httpOnly JWT, rate limiting.',
    metric: '95.8%', metricLabel: 'Holdout accuracy · F1 0.971',
    gh: 'https://github.com/chapranishika/relapseguard-recovery-ai',
    featured: false,
  },
  {
    slug: 'Fraud', rest: 'Guard',
    stack: ['XGBoost', 'SHAP', 'FastAPI', 'Docker'],
    desc: 'Credit card fraud on 284,807 transactions (0.17% fraud). ADASYN inside training split — no leakage, no inflated metrics. SHAP TreeExplainer gives auditable per-prediction attribution. Honest ML.',
    metric: '0.99', metricLabel: 'ROC-AUC · Precision 0.95 · F1 0.91',
    gh: 'https://github.com/chapranishika/Fraudguard',
    featured: false,
  },
  {
    slug: 'Pay', rest: 'Sense',
    stack: ['XGBoost', 'Android', 'SHAP', 'FastAPI'],
    story: 'I found out the datasets everyone was using were contaminated. Nobody had caught it. That made me angry enough to build something real.',
    desc: 'UPI fraud — 3-layer arch: SMS gate → on-device Room DB HITL cache → XGBoost/FastAPI inference. Busted contamination across 3 widely-cited datasets. SHAP isolated new_device_flag (mean |SHAP|=1.17) as dominant signal.',
    metric: '0.8851', metricLabel: 'ROC-AUC · 100% Precision@0.5',
    gh: 'https://github.com/chapranishika/PaySense-UPIFraud-Detection',
    featured: true,
  },
  {
    slug: 'VoiceForge', rest: ' AI',
    stack: ['Flask', 'AssemblyAI', 'React', 'Gemini'],
    desc: 'Speech intelligence — diarization, sentiment, entity detection, auto-chapters. Gemini NLP post-processing with per-request feature toggles. How many intelligence layers on a human voice? Turns out, a lot.',
    metric: 'Full-stack', metricLabel: 'Production-ready · Modular',
    gh: 'https://github.com/chapranishika/voiceforge-ai/tree/main/speech-ai-platform',
    featured: false,
  },
  {
    slug: 'Rockfall', rest: ' AI',
    stack: ['Python', 'Scikit-learn', 'Geospatial ML'],
    desc: 'Geospatial + sensor-fusion ML pipeline with temporal feature engineering for real-time rockfall risk scoring. Qualified SIH 2025 intra-college pre-final.',
    metric: 'SIH 2025', metricLabel: 'Pre-final qualifier',
    gh: 'https://github.com/chapranishika/rockfall-ai-multi-modal-geophysical-risk-prediction-system',
    featured: false,
  },
]

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const bp  = useBreakpoint()
  const mob = bp === 'mobile'
  const tab = bp === 'tablet'
  const pad = mob ? '24px 20px' : tab ? '28px 28px' : '32px 40px'
  const cols = mob || tab ? '1fr' : '1fr 1fr'

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

  return (
    <section id="projects" ref={ref} style={{ borderBottom: '3px solid var(--ink)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: mob ? '16px 20px' : '20px 48px 16px', borderBottom: '1px solid var(--border)', flexWrap: 'wrap', gap: '8px' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: mob ? '24px' : '30px', fontWeight: 900 }}>
          Things that <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>actually ship</em>
          <span className="sec-num">03</span>
        </h2>
        <span style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)' }}>
          Real data · Real users
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: cols }}>
        {projects.map((p, i) => {
          const borderRight = !mob && !tab && i % 2 === 0 ? '2px solid var(--ink)' : 'none'
          const borderTop   = (mob || tab)
            ? i > 0 ? '1px solid var(--border)' : 'none'
            : i >= 2 ? '1px solid var(--border)' : 'none'

          return (
            <div
              key={p.slug}
              className={`pitem fade-up`}
              style={{
                padding: pad,
                borderRight,
                borderTop,
                background: p.featured ? 'var(--teal-dark)' : 'transparent',
                transition: 'background .22s ease',
              }}
              onMouseEnter={e => { if (!p.featured) e.currentTarget.style.background = 'var(--light)' }}
              onMouseLeave={e => { if (!p.featured) e.currentTarget.style.background = 'transparent' }}
            >
              {p.featured && (
                <div style={{ display: 'inline-block', background: 'var(--orange)', color: '#fff', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', padding: '3px 10px', borderRadius: '2px', marginBottom: '10px', fontWeight: 600 }}>
                  Best story ↓
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', gap: '12px' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: mob ? '20px' : '24px', fontWeight: 900, lineHeight: 1.05, color: p.featured ? 'var(--bg)' : 'var(--ink)', flexShrink: 0 }}>
                  <em style={{ fontStyle: 'italic', color: 'var(--teal-mid)' }}>{p.slug}</em>{p.rest}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'flex-end' }}>
                  {p.stack.map(s => (
                    <span key={s} style={{ fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', color: p.featured ? '#5a9a90' : 'var(--muted)', background: p.featured ? 'rgba(0,191,165,0.08)' : 'var(--light)', padding: '2px 7px', borderRadius: '2px' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {p.story && (
                <p style={{ fontSize: '12px', fontStyle: 'italic', color: 'var(--teal)', lineHeight: 1.7, marginBottom: '8px', borderLeft: '2px solid var(--teal)', paddingLeft: '10px' }}>
                  "{p.story}"
                </p>
              )}

              <p style={{ fontSize: '12.5px', color: p.featured ? '#a8d8d0' : 'var(--muted)', lineHeight: 1.75, marginBottom: '14px' }}>
                {p.desc}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div className="metric-num" style={{ fontFamily: 'Playfair Display, serif', fontSize: mob ? '20px' : '24px', fontWeight: 900, color: 'var(--orange)', lineHeight: 1 }}>
                    {p.metric}
                  </div>
                  <div style={{ fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', color: p.featured ? '#5a9a90' : 'var(--muted)', marginTop: '2px' }}>
                    {p.metricLabel}
                  </div>
                </div>
                <span style={{ fontSize: '18px', color: p.featured ? '#5a9a90' : 'var(--muted)', transition: 'transform .2s ease' }}>↗</span>
              </div>

              <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: `1px solid ${p.featured ? '#1a5a50' : 'var(--border)'}` }}>
                <a href={p.gh} target="_blank" rel="noreferrer" className="gh-link">
                  GitHub
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
