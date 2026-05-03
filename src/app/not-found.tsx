'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--teal-dark)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
      padding: '40px 20px',
      fontFamily: 'DM Sans, sans-serif',
    }}>
      {/* Big 404 */}
      <div style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: 'clamp(80px, 20vw, 160px)',
        fontWeight: 900,
        lineHeight: 1,
        color: 'var(--teal)',
        letterSpacing: '-4px',
      }}>
        404
      </div>

      {/* Message */}
      <div style={{ textAlign: 'center', maxWidth: '420px' }}>
        <p style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '24px',
          fontWeight: 700,
          color: '#F2FAFA',
          marginBottom: '10px',
        }}>
          This page doesn't exist.
        </p>
        <p style={{
          fontSize: '14px',
          color: 'rgba(242,250,250,0.5)',
          lineHeight: 1.7,
        }}>
          Unlike my projects, this one wasn't deployed.
        </p>
      </div>

      {/* Ticker-style label */}
      <div style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: '10px',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        color: 'rgba(0,191,165,0.45)',
        marginTop: '8px',
      }}>
        ML Engineer · GenAI Builder · Published Researcher
      </div>

      {/* Back home */}
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          background: 'var(--orange)',
          color: '#fff',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          padding: '13px 28px',
          borderRadius: '3px',
          textDecoration: 'none',
          marginTop: '8px',
          transition: 'background .2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#FF8C5A')}
        onMouseLeave={e => (e.currentTarget.style.background = 'var(--orange)')}
      >
        ← Back to portfolio
      </Link>

      {/* Small contact */}
      <p style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: '10px',
        color: 'rgba(0,191,165,0.3)',
        letterSpacing: '1px',
        marginTop: '8px',
      }}>
        nishika.c@somaiya.edu · +91 83693 14670
      </p>
    </div>
  )
}
