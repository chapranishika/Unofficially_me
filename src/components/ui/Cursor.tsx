'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const curRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cur = curRef.current
    if (!cur) return

    // Smooth cursor follow with lerp
    let raf: number
    let cx = 0, cy = 0
    let tx = 0, ty = 0

    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY }
    window.addEventListener('mousemove', onMove, { passive: true })

    const loop = () => {
      cx += (tx - cx) * 0.12
      cy += (ty - cy) * 0.12
      cur.style.left = cx + 'px'
      cur.style.top  = cy + 'px'
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Hover detection
    const addHov = () => cur.classList.add('hov')
    const remHov = () => cur.classList.remove('hov')

    const attach = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', addHov)
        el.addEventListener('mouseleave', remHov)
      })
    }
    attach()

    const obs = new MutationObserver(attach)
    obs.observe(document.body, { childList: true, subtree: true })

    // Hide cursor when leaving window
    const onLeave = () => cur.style.opacity = '0'
    const onEnter = () => cur.style.opacity = '1'
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(raf)
      obs.disconnect()
    }
  }, [])

  return (
    <div className="cursor" ref={curRef}>
      <div className="cursor-dot" />
    </div>
  )
}
