'use client'

import { useRef, useMemo, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { sharedMouse as cmouse } from '@/lib/sharedMouse'

/* ── Section messages ── */
const SECTIONS = [
  { id: 'hero',       msg: "Hey! I'm Nishika 👋",        sub: 'Scroll to see what I built.' },
  { id: 'building',   msg: 'Currently levelling up 📈',   sub: 'Two things cooking right now.' },
  { id: 'projects',   msg: 'These ship in production 🚀', sub: 'Not notebooks. Real products.' },
  { id: 'leadership', msg: 'I run marketing too 🎯',      sub: 'Every big KJSSE event — me.' },
  { id: 'about',      msg: "On stage since I was 3 💃",  sub: 'Dance + code = my whole thing.' },
  { id: 'music',      msg: 'Current playlist 🎵',         sub: 'Real songs, no curation.' },
]

function useScrollSection() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach((s, i) => {
      const el = document.getElementById(s.id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setIdx(i) },
        { threshold: 0.35 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  return SECTIONS[idx]
}

/* ── Anim type ── */
type Anim = 'idle' | 'wave' | 'point' | 'dance'


/* ── Fix 16 — Pupil that tracks mouse within eye socket ── */
function TrackingPupil({ x, mat }: { x: number; mat: THREE.MeshStandardMaterial }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(() => {
    if (!ref.current) return
    // Clamp offset so pupil stays inside white of eye
    const ox = THREE.MathUtils.clamp(cmouse.x * 0.025, -0.025, 0.025)
    const oy = THREE.MathUtils.clamp(cmouse.y * 0.018, -0.018, 0.018)
    ref.current.position.x = x + ox
    ref.current.position.y = 0.06 + oy
    ref.current.position.z = 0.40
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <primitive object={mat} attach="material" />
    </mesh>
  )
}

/* ── CHARACTER — materials inside useMemo ── */
function Character({ anim }: { anim: Anim }) {
  const root    = useRef<THREE.Group>(null)
  const head    = useRef<THREE.Group>(null)
  const armL    = useRef<THREE.Group>(null)
  const armR    = useRef<THREE.Group>(null)
  const eyeLidL = useRef<THREE.Mesh>(null)
  const eyeLidR = useRef<THREE.Mesh>(null)
  const body    = useRef<THREE.Mesh>(null)
  const blinkV  = useRef(0)
  const blinkT  = useRef(Math.random() * 3 + 2)

  /* FIX 5 — materials in useMemo with disposal */
  const mat = useMemo(() => {
    const skin   = new THREE.MeshStandardMaterial({ color: '#C68642', roughness: 0.8 })
    const hair   = new THREE.MeshStandardMaterial({ color: '#1a0a00', roughness: 0.9 })
    const outfit = new THREE.MeshStandardMaterial({ color: '#F2FAFA', roughness: 0.8, metalness: 0.1, emissive: '#F2FAFA', emissiveIntensity: 0.05 })
    const eyeW   = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.5 })
    const pupil  = new THREE.MeshStandardMaterial({ color: '#1a0a00', roughness: 0.5 })
    const blush  = new THREE.MeshStandardMaterial({ color: '#e87c7c', roughness: 0.9, transparent: true, opacity: 0.55 })
    const orange = new THREE.MeshStandardMaterial({ color: '#FF6B35', roughness: 0.6, metalness: 0.1, emissive: '#cc3300', emissiveIntensity: 0.15 })
    const pants  = new THREE.MeshStandardMaterial({ color: '#1A5A99', roughness: 0.8, metalness: 0.1 })
    return { skin, hair, outfit, eyeW, pupil, blush, orange, pants }
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    /* Idle bounce */
    if (root.current) root.current.position.y = Math.sin(t * 1.8) * 0.07

    /* Head tracks mouse */
    if (head.current) {
      head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, cmouse.x * 0.32, 0.06)
      head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, -cmouse.y * 0.18, 0.06)
    }

    /* Blink */
    blinkT.current -= 1 / 60
    if (blinkT.current <= 0) { blinkV.current = 1; blinkT.current = Math.random() * 3 + 2 }
    if (blinkV.current > 0) {
      blinkV.current = Math.max(0, blinkV.current - 0.14)
      const s = Math.sin(blinkV.current * Math.PI)
      if (eyeLidL.current) eyeLidL.current.scale.y = 1 + s * 4
      if (eyeLidR.current) eyeLidR.current.scale.y = 1 + s * 4
    }

    /* Arms */
    if (!armL.current || !armR.current) return
    if (anim === 'wave') {
      armR.current.rotation.z = -Math.PI * 0.8 + Math.sin(t * 6) * 0.4
      armR.current.rotation.x = Math.sin(t * 3) * 0.15
      armL.current.rotation.z = Math.PI * 0.15 + Math.sin(t * 1.2 + 1) * 0.05
    } else if (anim === 'point') {
      // Fix 17 — point dynamically toward mouse / CTA on screen
      const targetY = THREE.MathUtils.clamp(-cmouse.x * 0.8, -1.0, 0.2)
      const targetX = THREE.MathUtils.clamp(-cmouse.y * 0.3 + 0.2, -0.2, 0.5)
      armR.current.rotation.z = THREE.MathUtils.lerp(armR.current.rotation.z, -Math.PI * 0.5, 0.08)
      armR.current.rotation.y = THREE.MathUtils.lerp(armR.current.rotation.y, targetY, 0.06)
      armR.current.rotation.x = THREE.MathUtils.lerp(armR.current.rotation.x, targetX, 0.06)
      armL.current.rotation.z = THREE.MathUtils.lerp(armL.current.rotation.z,  Math.PI * 0.15, 0.08)
    } else if (anim === 'dance') {
      armL.current.rotation.z =  Math.PI * 0.3 + Math.sin(t * 4) * 0.5
      armR.current.rotation.z = -Math.PI * 0.3 + Math.sin(t * 4 + Math.PI) * 0.5
      armL.current.rotation.x = Math.cos(t * 2) * 0.2
      armR.current.rotation.x = Math.cos(t * 2 + Math.PI) * 0.2
      if (body.current) body.current.rotation.y = Math.sin(t * 2) * 0.15
    } else {
      armL.current.rotation.z = THREE.MathUtils.lerp(armL.current.rotation.z,  Math.PI * 0.12 + Math.sin(t * 0.9) * 0.04, 0.07)
      armR.current.rotation.z = THREE.MathUtils.lerp(armR.current.rotation.z, -(Math.PI * 0.12 + Math.sin(t * 0.9 + 1) * 0.04), 0.07)
      armR.current.rotation.y = THREE.MathUtils.lerp(armR.current.rotation.y, 0, 0.07)
      if (body.current) body.current.rotation.y = THREE.MathUtils.lerp(body.current.rotation.y, 0, 0.05)
    }
  })

  const M = mat

  return (
    <group ref={root}>
      {/* Body */}
      <mesh ref={body} position={[0, -0.55, 0]}>
        <cylinderGeometry args={[0.28, 0.35, 0.75, 8]} />
        <primitive object={M.outfit} attach="material" />
      </mesh>

      {/* Collar */}
      <mesh position={[0, -0.18, 0]}>
        <torusGeometry args={[0.27, 0.04, 6, 12]} />
        <primitive object={M.orange} attach="material" />
      </mesh>

      {/* Legs */}
      {[-0.12, 0.12].map((x, i) => (
        <mesh key={i} position={[x, -1.05, 0]}>
          <cylinderGeometry args={[0.1, 0.09, 0.45, 6]} />
          <primitive object={M.pants} attach="material" />
        </mesh>
      ))}

      {/* Feet */}
      {[-0.12, 0.12].map((x, i) => (
        <mesh key={i} position={[x, -1.32, 0.06]}>
          <boxGeometry args={[0.14, 0.08, 0.22]} />
          <primitive object={M.hair} attach="material" />
        </mesh>
      ))}

      {/* Left arm */}
      <group ref={armL} position={[-0.38, -0.22, 0]}>
        <mesh position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.09, 0.08, 0.42, 6]} />
          <primitive object={M.outfit} attach="material" />
        </mesh>
        <mesh position={[0, -0.48, 0]}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <primitive object={M.skin} attach="material" />
        </mesh>
      </group>

      {/* Right arm */}
      <group ref={armR} position={[0.38, -0.22, 0]}>
        <mesh position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.09, 0.08, 0.42, 6]} />
          <primitive object={M.outfit} attach="material" />
        </mesh>
        <mesh position={[0, -0.48, 0]}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <primitive object={M.skin} attach="material" />
        </mesh>
      </group>

      {/* Head group */}
      <group ref={head} position={[0, 0.15, 0]}>
        <mesh>
          <sphereGeometry args={[0.38, 12, 10]} />
          <primitive object={M.skin} attach="material" />
        </mesh>

        {/* Hair cap */}
        <mesh position={[0, 0.22, 0]}>
          <sphereGeometry args={[0.38, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
          <primitive object={M.hair} attach="material" />
        </mesh>
        {/* Hair back */}
        <mesh position={[0, 0.28, -0.08]} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[0.62, 0.18, 0.1]} />
          <primitive object={M.hair} attach="material" />
        </mesh>
        {/* Fringe */}
        <mesh position={[0, 0.28, 0.3]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[0.5, 0.14, 0.12]} />
          <primitive object={M.hair} attach="material" />
        </mesh>
        {/* Side falls */}
        {[-0.35, 0.35].map((x, i) => (
          <mesh key={i} position={[x, 0.0, 0.0]}>
            <boxGeometry args={[0.1, 0.44, 0.18]} />
            <primitive object={M.hair} attach="material" />
          </mesh>
        ))}
        {/* Teal hair highlight streak */}
        <mesh position={[0.12, 0.32, 0.28]} rotation={[-0.15, 0.1, 0]}>
          <boxGeometry args={[0.06, 0.12, 0.08]} />
          <meshStandardMaterial color="#00BFA5" roughness={0.7} emissive="#00BFA5" emissiveIntensity={0.3} />
        </mesh>

        {/* Eyes + tracking pupils */}
        {[-0.14, 0.14].map((x, i) => (
          <group key={i}>
            <mesh position={[x, 0.06, 0.32]}>
              <sphereGeometry args={[0.09, 8, 8]} />
              <primitive object={M.eyeW} attach="material" />
            </mesh>
            <TrackingPupil x={x} mat={M.pupil} />
          </group>
        ))}

        {/* Eyelids for blink */}
        <mesh ref={eyeLidL} position={[-0.14, 0.10, 0.38]} scale={[1, 0.1, 1]}>
          <sphereGeometry args={[0.09, 8, 4, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <primitive object={M.hair} attach="material" />
        </mesh>
        <mesh ref={eyeLidR} position={[0.14, 0.10, 0.38]} scale={[1, 0.1, 1]}>
          <sphereGeometry args={[0.09, 8, 4, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <primitive object={M.hair} attach="material" />
        </mesh>

        {/* Blush */}
        {[-0.24, 0.24].map((x, i) => (
          <mesh key={i} position={[x, -0.04, 0.28]}>
            <sphereGeometry args={[0.07, 8, 8]} />
            <primitive object={M.blush} attach="material" />
          </mesh>
        ))}

        {/* Smile */}
        <mesh position={[0, -0.1, 0.36]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.08, 0.018, 6, 12, Math.PI * 0.7]} />
          <primitive object={M.hair} attach="material" />
        </mesh>

        {/* Earrings */}
        {[-0.38, 0.38].map((x, i) => (
          <mesh key={i} position={[x, -0.04, 0]}>
            <sphereGeometry args={[0.04, 6, 6]} />
            <primitive object={M.orange} attach="material" />
          </mesh>
        ))}
      </group>
    </group>
  )
}

/* ── 3D Scene ── */
function Scene({ anim }: { anim: Anim }) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[2, 3, 3]}   intensity={22} color="#F2FAFA" />
      <pointLight position={[-2, 1, 2]}  intensity={14} color="#00BFA5" />
      <pointLight position={[0, -2, 2]}  intensity={8}  color="#FF6B35" />
      <Character anim={anim} />

      {/* Fix 14 — subtle ground shadow plane */}
      <mesh position={[0, -1.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.45, 24]} />
        <meshBasicMaterial color="#001a14" transparent opacity={0.22} />
      </mesh>
    </>
  )
}

/* ── FIX 2 — Speech bubble right-anchored, never off-screen ── */
function SpeechBubble({ msg, sub, onClose }: { msg: string; sub: string; onClose: () => void }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: 'calc(100% + 10px)',   /* sits above character, not % of container */
      right: 0,                       /* anchors to right edge — never goes off-screen */
      background: '#fff',
      border: '2px solid var(--teal-mid)',
      borderRadius: '10px',
      padding: '10px 12px',
      width: '190px',
      boxShadow: '0 4px 20px rgba(0,137,123,0.18)',
      zIndex: 20,
      pointerEvents: 'auto',
    }}>
      {/* FIX 3 — Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '5px', right: '6px',
          background: 'none', border: 'none',
          fontSize: '12px', color: 'var(--muted)',
          cursor: 'none', lineHeight: 1, padding: '2px 4px',
          transition: 'color .15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
        data-hover="true"
        aria-label="Close guide"
      >
        ✕
      </button>

      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: 'var(--ink)', margin: '0 16px 3px 0', lineHeight: 1.4 }}>
        {msg}
      </p>
      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12.5px', color: 'var(--muted)', margin: 0, lineHeight: 1.4 }}>
        {sub}
      </p>

      {/* Bubble tail — bottom right */}
      <div style={{ position: 'absolute', bottom: '-10px', right: '28px', width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '10px solid var(--teal-mid)' }} />
      <div style={{ position: 'absolute', bottom: '-7px',  right: '30px', width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid #fff' }} />
    </div>
  )
}

/* ── Main export ── */
export default function GuideCharacter() {
  /* FIX 1 — hide on mobile */
  const bp = useBreakpoint()
  if (bp === 'mobile') return null

  return <GuideCharacterInner />
}

function GuideCharacterInner() {
  const section   = useScrollSection()
  const [anim, setAnim]       = useState<Anim>('wave')
  const [visible, setVisible] = useState(false)
  const [closed, setClosed]   = useState(false)
  const [entered, setEntered] = useState(false)

  /* Entrance animation */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 600)
    const t2 = setTimeout(() => setEntered(true), 650)
    return () => { clearTimeout(t); clearTimeout(t2) }
  }, [])

  /* Mount wave then idle */
  useEffect(() => {
    setAnim('wave')
    const t = setTimeout(() => setAnim('idle'), 2800)
    return () => clearTimeout(t)
  }, [])

  /* Section-based anim — FIX 4: music dance has 5s timeout */
  useEffect(() => {
    let cleanup: ReturnType<typeof setTimeout> | null = null

    if (section.id === 'about') {
      setAnim('dance')
      cleanup = setTimeout(() => setAnim('idle'), 3000)
    } else if (section.id === 'projects') {
      setAnim('point')
      cleanup = setTimeout(() => setAnim('idle'), 2000)
    } else if (section.id === 'music') {
      setAnim('dance')
      cleanup = setTimeout(() => setAnim('idle'), 5000) /* FIX 4 */
    } else {
      setAnim('idle')
    }

    return () => { if (cleanup) clearTimeout(cleanup) }
  }, [section.id])

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      width: '160px',
      height: '240px',
      zIndex: 500,
      /* Entrance scale-in */
      transform: entered ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(40px)',
      opacity:   entered ? 1 : 0,
      transition: 'transform 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.55s ease',
      transformOrigin: 'bottom right',
    }}>
      {/* Speech bubble — hidden when closed */}
      {!closed && (
        <SpeechBubble
          msg={section.msg}
          sub={section.sub}
          onClose={() => setClosed(true)}
        />
      )}

      {/* Re-open button when closed */}
      {closed && (
        <button
          onClick={() => setClosed(false)}
          style={{
            position: 'absolute',
            top: '-28px', right: 0,
            background: 'var(--teal-mid)',
            border: 'none',
            borderRadius: '12px',
            fontSize: '9px',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: '#fff',
            padding: '4px 10px',
            cursor: 'none',
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 600,
          }}
          data-hover="true"
        >
          chat ↑
        </button>
      )}

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <Scene anim={anim} />
        </Suspense>
      </Canvas>
    </div>
  )
}
