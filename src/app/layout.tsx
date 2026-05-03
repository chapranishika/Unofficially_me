import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://nishikachapra.vercel.app'),
  title: 'Nishika Chapra — ML Engineer · GenAI Builder · Published Researcher',
  description: '3rd-year B.Tech IT @ KJSSE + IIT Madras. ML pipelines, fraud detection, GenAI products that ship. ICCET 2026. Open to internships.',
  keywords: ['ML Engineer', 'GenAI', 'FastAPI', 'XGBoost', 'SHAP', 'Docker', 'React', 'Mumbai', 'internship'],
  authors: [{ name: 'Nishika Chapra', url: 'https://linkedin.com/in/nco02' }],
  openGraph: {
    title: 'Nishika Chapra — ML Engineer · GenAI Builder',
    description: 'I build things that work in production. Not demos. Not notebooks. Products with real users and real data.',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Nishika Chapra Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nishika Chapra — ML Engineer',
    description: 'I build things that work in production. ICCET 2026. Open to internships.',
    images: ['/og.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preload local fonts */}
        <link rel="preload" href="/fonts/bebas-neue.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
