'use client'
import { useBreakpoint } from '@/hooks/useBreakpoint'

export default function Publication() {
  const bp = useBreakpoint()
  const mob = bp === 'mobile'

  return (
    <section style={{
      padding: mob ? '28px 20px' : '36px 48px',
      borderBottom: '3px solid var(--ink)',
      display: 'flex',
      flexDirection: mob ? 'column' : 'row',
      gap: mob ? '20px' : '36px',
      alignItems: mob ? 'flex-start' : 'center',
      background: 'var(--light)',
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--teal-mid)', marginBottom: '10px', fontWeight: 600 }}>
          Peer-reviewed · ICCET 2026
          <span className="sec-num">07</span>
        </div>
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: mob ? '16px' : '20px', fontWeight: 700, lineHeight: 1.35, marginBottom: '8px' }}>
          <a
            href="https://drive.google.com/file/d/13DOjauPinLhMkZyL5ACZXexEDvVOXVWE/view?usp=sharing"
            target="_blank" rel="noreferrer"
            style={{ color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px solid var(--border)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--teal-mid)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink)')}
          >
            ML-Based Classification of Alcohol Consumption Patterns with Chatbot-Assisted Intervention ↗
          </a>
        </div>
        <div style={{ fontSize: '11.5px', color: 'var(--muted)' }}>
          OSIET × Samarkand State University, Uzbekistan · March 2026
        </div>
      </div>
      <div style={{ border: '2.5px solid var(--teal-mid)', padding: '16px 18px', textAlign: 'center', transform: mob ? 'none' : 'rotate(-2deg)', borderRadius: '2px', flexShrink: 0 }}>
        <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--muted)' }}>Peer</div>
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 900, color: 'var(--teal-mid)', lineHeight: 1, margin: '4px 0' }}>Re-<br />viewed</div>
        <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--muted)' }}>2026</div>
      </div>
    </section>
  )
}
