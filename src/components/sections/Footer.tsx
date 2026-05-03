'use client'
import { useBreakpoint } from '@/hooks/useBreakpoint'

const links = [
  { label: 'Mail →',     href: 'mailto:chapranishika@gmail.com' },
  { label: 'Email →',    href: 'mailto:nishika.c@somaiya.edu' },
  { label: 'GitHub →',   href: 'https://github.com/chapranishika' },
  { label: 'LinkedIn →', href: 'https://linkedin.com/in/nco02' },
]

export default function Footer() {
  const bp = useBreakpoint()
  const mob = bp === 'mobile'

  return (
    <footer style={{
      padding: mob ? '28px 20px' : '28px 48px',
      display: 'grid',
      gridTemplateColumns: mob ? '1fr' : '1fr auto 1fr',
      alignItems: 'center',
      gap: mob ? '20px' : '20px',
      background: 'var(--teal-dark)',
      borderTop: '3px solid var(--ink)',
      textAlign: mob ? 'center' : 'inherit',
    }}>
      <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#2a7a6a', lineHeight: 2 }}>
        © 2026 Nishika Chapra<br />Built different. Shipped for real.
      </div>
      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: 900, textAlign: 'center', color: 'var(--bg)' }}>
        N<em style={{ fontStyle: 'italic', color: 'var(--teal)' }}>C</em>
      </div>
      <div style={{ display: 'flex', flexDirection: mob ? 'row' : 'column', flexWrap: 'wrap', gap: mob ? '12px 20px' : '8px', justifyContent: mob ? 'center' : 'flex-end', alignItems: mob ? 'center' : 'flex-end' }}>
        {links.map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
            style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#2a7a6a', textDecoration: 'none', transition: 'color .2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--teal)')}
            onMouseLeave={e => (e.currentTarget.style.color = '#2a7a6a')}
          >
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  )
}
