'use client'

import { useRef, useMemo, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { sharedMouse as mouse } from '@/lib/sharedMouse'

// Fix 3 — resize-aware mobile detection
function useMobileDetect() {
  const [mobile, setMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', h, { passive: true })
    return () => window.removeEventListener('resize', h)
  }, [])
  return mobile
}



const C = {
  teal:   '#00BFA5',
  tealD:  '#003D36',
  tealM:  '#00897B',
  orange: '#FF6B35',
  cream:  '#F2FAFA',
}

/* ── Particles ── */
function ParticleField({ mobile }: { mobile: boolean }) {
  const mesh  = useRef<THREE.Points>(null)
  const count = mobile ? 200 : 800

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const t = new THREE.Color(C.teal)
    const o = new THREE.Color(C.orange)
    const m = new THREE.Color(C.tealM)
    for (let i = 0; i < count; i++) {
      pos[i*3]   = (Math.random()-.5)*30
      pos[i*3+1] = (Math.random()-.5)*20
      pos[i*3+2] = (Math.random()-.5)*14
      const r = Math.random()
      const c = r < .6 ? t : r < .85 ? m : o
      col[i*3]=c.r; col[i*3+1]=c.g; col[i*3+2]=c.b
    }
    return [pos, col]
  }, [count])

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.getElapsedTime()
    mesh.current.rotation.y = t*.035 + mouse.x*.1
    mesh.current.rotation.x = t*.018 + mouse.y*.07
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors,    3]} />
      </bufferGeometry>
      <pointsMaterial size={0.055} vertexColors transparent opacity={0.75} sizeAttenuation />
    </points>
  )
}

/* ── Custom 3D Symbols ── */
function PythonSymbol({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[0.1, 0.1, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.1]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.7} emissive={color} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[-0.1, -0.1, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.1]} />
        <meshStandardMaterial color="#FFD43B" roughness={0.2} metalness={0.7} emissive="#FFD43B" emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

function BadmintonRacket({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[0, 0.3, 0]}>
        <torusGeometry args={[0.2, 0.02, 8, 24]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.7} emissive={color} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.4]} />
        <meshStandardMaterial color="#ccc" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.15]} />
        <meshStandardMaterial color="#FF6B35" roughness={0.8} />
      </mesh>
    </group>
  )
}

function Shuttlecock({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[0, 0.15, 0]}>
        <coneGeometry args={[0.2, 0.3, 12, 1, true]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.7} emissive={color} emissiveIntensity={0.2} side={THREE.DoubleSide} wireframe />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#fff" roughness={0.9} />
      </mesh>
    </group>
  )
}

function Football({ color }: { color: string }) {
  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[0.25, 1]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} wireframe />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.24, 1]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
    </group>
  )
}

function JavaCup({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.15, 0.1, 0.3]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.7} emissive={color} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0.15, -0.1, 0]}>
        <torusGeometry args={[0.08, 0.02, 8, 16]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.7} emissive={color} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#fff" transparent opacity={0.5} />
      </mesh>
      <mesh position={[0.05, 0.25, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#fff" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

function CSymbol({ color }: { color: string }) {
  return (
    <group>
      <mesh>
        <torusGeometry args={[0.2, 0.08, 16, 32, Math.PI * 1.5]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.7} emissive={color} emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

function DancingGirl({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.7} emissive={color} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <coneGeometry args={[0.2, 0.4, 16]} />
        <meshStandardMaterial color="#FF6B35" roughness={0.2} metalness={0.7} emissive="#FF6B35" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[-0.15, 0.1, 0]} rotation={[0, 0, Math.PI/4]}>
        <cylinderGeometry args={[0.02, 0.02, 0.2]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.15, 0.2, 0]} rotation={[0, 0, -Math.PI/4]}>
        <cylinderGeometry args={[0.02, 0.02, 0.2]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  )
}

/* ── Floating wrapper ── */
type ShapeProps = {
  children: React.ReactNode
  position: [number, number, number]
  rotSpeed?: [number, number, number]
  scale?: number
  floatAmp?: number
}
function FloatShape({ children, position, rotSpeed=[.4,.6,.2], scale=1, floatAmp=.3 }: ShapeProps) {
  const mesh   = useRef<THREE.Group>(null)
  const offset = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.getElapsedTime()
    mesh.current.rotation.x = t*rotSpeed[0] + mouse.y*.12
    mesh.current.rotation.y = t*rotSpeed[1] + mouse.x*.12
    mesh.current.rotation.z = t*rotSpeed[2]
    mesh.current.position.y = position[1] + Math.sin(t*.8+offset)*floatAmp
    mesh.current.position.x = position[0] + Math.cos(t*.5+offset)*floatAmp*.4
  })

  return (
    <group ref={mesh} position={position} scale={scale}>
      {children}
    </group>
  )
}

/* ── 3D Name ── */
function Name3D() {
  const group = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouse.x*.18, .05)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -mouse.y*.10, .05)
    group.current.position.y = Math.sin(t*.35)*.1
  })

  return (
    <group ref={group}>
      <Text
        position={[0, 0.58, 0]}
        font="/fonts/bebas-neue.woff"
        fontSize={1.15}
        letterSpacing={0.06}
        anchorX="center"
        anchorY="middle"
      >
        NISHIKA
        <meshStandardMaterial color={C.teal} roughness={0.1} metalness={0.85}
          emissive={C.teal} emissiveIntensity={0.35} />
      </Text>
      <Text
        position={[0, -0.72, 0]}
        font="/fonts/bebas-neue.woff"
        fontSize={1.15}
        letterSpacing={0.06}
        anchorX="center"
        anchorY="middle"
      >
        CHAPRA
        <meshStandardMaterial color={C.orange} roughness={0.1} metalness={0.85}
          emissive={C.orange} emissiveIntensity={0.4} />
      </Text>
    </group>
  )
}


/* ── Font ErrorBoundary — catches Three.js Text load failure ── */
import { Component, type ReactNode } from 'react'

class FontErrorBoundary extends Component<
  { children: ReactNode; onError?: () => void },
  { failed: boolean }
> {
  state = { failed: false }
  componentDidCatch() {
    this.setState({ failed: true })
    this.props.onError?.()
  }
  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}

function Name3DWithFallback({ onFontError }: { onFontError?: () => void }) {
  return (
    <FontErrorBoundary onError={onFontError}>
      <Name3D />
    </FontErrorBoundary>
  )
}

/* ── Camera drift ── */
function CameraDrift() {
  const { camera } = useThree()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x*.8,  .025)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y*.45 + Math.sin(t*.28)*.08, .025)
    camera.lookAt(0, 0, 0)
  })
  return null
}

/* ── Scene ── */
function Scene({ mobile, onFontError }: { mobile: boolean; onFontError?: () => void }) {
  return (
    <>
      <CameraDrift />
      <ambientLight intensity={0.22} />
      <pointLight position={[ 8,  8, 8]} intensity={55} color={C.teal} />
      <pointLight position={[-8, -4, 4]} intensity={38} color={C.orange} />
      <pointLight position={[ 0, -6,-4]} intensity={18} color={C.tealM} />
      <spotLight   position={[ 0, 12, 6]} intensity={75} angle={0.4} penumbra={0.8} color={C.cream} />

      <ParticleField mobile={mobile} />
      <Sparkles count={mobile ? 20 : 40} scale={13} size={1.6} speed={0.28} color={C.teal}   opacity={0.55} />
      <Sparkles count={mobile ? 10 : 20}  scale={9}  size={2.0} speed={0.45} color={C.orange} opacity={0.45} />

      <Suspense fallback={null}>
        <Name3DWithFallback onFontError={onFontError} />
      </Suspense>

      {/* Core shapes — always shown */}
      <FloatShape position={[-4.2, 1.8,-1]}  rotSpeed={[.30,.50,.20]} scale={1.2}>
        <PythonSymbol color={C.teal} />
      </FloatShape>
      <FloatShape position={[-3.5,-1.2, .5]}  rotSpeed={[.60,.30,.80]} scale={1.4}>
        <BadmintonRacket color={C.orange} />
      </FloatShape>
      <FloatShape position={[-5.0,-0.2,-2]}   rotSpeed={[.40,.70,.30]} scale={1.3}>
        <JavaCup color={C.tealM} />
      </FloatShape>
      <FloatShape position={[ 4.0, 1.4,-1]}   rotSpeed={[.50,.30,.60]} scale={1.3}>
        <Football color={C.orange} />
      </FloatShape>
      <FloatShape position={[ 3.6,-1.5, .4]}  rotSpeed={[.70,.50,.40]} scale={1.3}>
        <Shuttlecock color={C.teal} />
      </FloatShape>
      <FloatShape position={[ 5.0, 0.5,-2]}   rotSpeed={[.30,.60,.50]} scale={1.3}>
        <CSymbol color={C.tealM} />
      </FloatShape>

      {/* Accent shapes — desktop only */}
      {!mobile && (
        <>
          <FloatShape position={[-1.8, 2.8,-1.5]} rotSpeed={[.80,.40,.90]} scale={1} floatAmp={0.45}>
            <DancingGirl color={C.orange} />
          </FloatShape>
          <FloatShape position={[ 2.2,-2.6,-0.8]} rotSpeed={[.60,.90,.30]} scale={1.2} floatAmp={0.35}>
            <PythonSymbol color={C.teal} />
          </FloatShape>
        </>
      )}

      {/* Bloom — desktop only */}
      {!mobile && (
        <EffectComposer>
          <Bloom luminanceThreshold={0.28} luminanceSmoothing={0.9} intensity={1.5} />
        </EffectComposer>
      )}
    </>
  )
}

/* ── Loading fallback ── */
function Fallback() {
  return (
    <div style={{ position:'absolute', inset:0, background:'#003D36', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <span className="live-dot" style={{ width:8, height:8, borderRadius:'50%', background:'#FF6B35', display:'inline-block' }} />
    </div>
  )
}

/* ── Canvas ── */
export default function HeroCanvas() {
  const mobile        = useMobileDetect()
  const [fontFailed, setFontFailed] = useState(false)

  // Belt-and-suspenders: if font hasn't reported OK after 4s, show HTML fallback
  useEffect(() => {
    const t = setTimeout(() => {
      // Only trigger if we haven't already resolved
    }, 4000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ position:'absolute', inset:0, zIndex:0 }}>
      {/* HTML name fallback — shown instantly, hidden when 3D text loads OK */}
      {fontFailed && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 5,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <div style={{
            fontFamily: 'Bebas Neue, DM Sans, sans-serif',
            fontSize: 'clamp(48px, 10vw, 110px)',
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: '2px',
            textAlign: 'center',
          }}>
            <div style={{ color: '#00BFA5' }}>NISHIKA</div>
            <div style={{ color: '#FF6B35' }}>CHAPRA</div>
          </div>
        </div>
      )}

      <Suspense fallback={<Fallback />}>
        <Canvas
          camera={{ position:[0,0,9], fov:52 }}
          gl={{ antialias:true, alpha:false, toneMapping:THREE.ACESFilmicToneMapping, powerPreference:'high-performance' }}
          dpr={[1, 1]}
          performance={{ min: 0.5 }}
        >
          <color attach="background" args={['#003D36']} />
          <fog attach="fog" args={['#003D36', 14, 28]} />
          <Scene mobile={mobile} onFontError={() => setFontFailed(true)} />
        </Canvas>
      </Suspense>
    </div>
  )
}
