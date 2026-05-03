'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Cursor  from '@/components/ui/Cursor'
import Navbar  from '@/components/ui/Navbar'
import Ticker  from '@/components/ui/Ticker'
import HeroText   from '@/components/sections/HeroText'
import Building   from '@/components/sections/Building'
import Projects   from '@/components/sections/Projects'
import Leadership from '@/components/sections/Leadership'
import About      from '@/components/sections/About'
import Music      from '@/components/sections/Music'
import Publication from '@/components/sections/Publication'
import EasterEgg  from '@/components/sections/EasterEgg'
import Footer        from '@/components/sections/Footer'
import ScrollProgress   from '@/components/ui/ScrollProgress'
const GuideCharacter = dynamic(() => import('@/components/3d/GuideCharacter'), { ssr: false })

const HeroCanvas = dynamic(() => import('@/components/3d/HeroCanvas'), { ssr: false })

export default function Home() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <GuideCharacter />

      {/* NAV first — sticky on top */}
      <Navbar />

      {/* TICKER below nav */}
      <div style={{ paddingTop: '44px' }}> {/* offset for sticky nav height */}
        <Ticker />
      </div>

      {/* HERO — full viewport height minus nav+ticker */}
      <section id="hero" style={{ position: 'relative', width: '100%', height: '100vh', background: 'var(--teal-dark)', marginTop: '-44px' }}>
        <Suspense fallback={<div style={{position:'absolute',inset:0,background:'#003D36'}}/>}>
          <HeroCanvas />
        </Suspense>
        <HeroText />
      </section>

      {/* Gradient bridge from dark teal hero to cream content */}
      <div style={{
        height: '80px',
        background: 'linear-gradient(to bottom, var(--teal-dark), var(--bg))',
        marginTop: '-3px',
      }} />

      <main style={{ background: 'var(--bg)' }}>
        <Building />
        <Projects />
        <Leadership />
        <About />
        <Music />
        <Publication />
        <EasterEgg />
      </main>

      <Footer />
    </>
  )
}
