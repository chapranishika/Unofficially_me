'use client'

import { useState, useEffect } from 'react'

export type BP = 'mobile' | 'tablet' | 'desktop'

export function useBreakpoint(): BP {
  const [bp, setBp] = useState<BP>('desktop')

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth
      if (w < 640)  setBp('mobile')
      else if (w < 1024) setBp('tablet')
      else setBp('desktop')
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  return bp
}

export const isMob = (bp: BP) => bp === 'mobile'
export const isTab = (bp: BP) => bp === 'tablet'
export const isMobOrTab = (bp: BP) => bp !== 'desktop'
