'use client'

import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const h = () => {
      const scrolled = window.scrollY
      const total    = document.body.scrollHeight - window.innerHeight
      el.style.transform = `scaleX(${total > 0 ? scrolled / total : 0})`
    }
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  return <div className="scroll-progress" ref={ref} />
}
