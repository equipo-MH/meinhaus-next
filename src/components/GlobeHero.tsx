'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'

// ─── WebGL / mobile detection ────────────────────────────────
function canUseWebGL(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')))
  } catch { return false }
}

// Key cities/regions to show as markers on the globe
const MARKERS = [
  // Argentina
  { lat: -34.6, lng: -58.4, label: 'Buenos Aires', color: '#E8531A', size: 0.028 },
  { lat: -38.9, lng: -68.1, label: 'General Roca', color: '#F0A060', size: 0.035 }, // MeinHaus HQ
  { lat: -40.8, lng: -62.9, label: 'Patagonia', color: '#9B7C5A', size: 0.022 },
  { lat: -31.4, lng: -64.2, label: 'Córdoba', color: '#9B7C5A', size: 0.022 },
  // World
  { lat: 40.4, lng: -3.7, label: 'Madrid', color: 'rgba(250,249,246,.3)', size: 0.016 },
  { lat: 51.5, lng: -0.1, label: 'London', color: 'rgba(250,249,246,.3)', size: 0.016 },
  { lat: -33.9, lng: 151.2, label: 'Sydney', color: 'rgba(250,249,246,.3)', size: 0.016 },
  { lat: 37.8, lng: -122.4, label: 'San Francisco', color: 'rgba(250,249,246,.3)', size: 0.016 },
  { lat: -23.5, lng: -46.6, label: 'São Paulo', color: 'rgba(250,249,246,.25)', size: 0.018 },
  { lat: -33.5, lng: -70.6, label: 'Santiago', color: 'rgba(250,249,246,.25)', size: 0.018 },
  { lat: 35.7, lng: 139.7, label: 'Tokyo', color: 'rgba(250,249,246,.2)', size: 0.014 },
]

function latLngToVec3(lat: number, lng: number, r = 1) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return {
    x: -r * Math.sin(phi) * Math.cos(theta),
    y: r * Math.cos(phi),
    z: r * Math.sin(phi) * Math.sin(theta),
  }
}

// ─── STATIC FALLBACK (mobile / no WebGL) ─────────────────────
function HeroFallback() {
  return (
    <div style={{
      height: '100svh', position: 'relative' as const, overflow: 'hidden' as const,
      display: 'flex' as const, flexDirection: 'column' as const, justifyContent: 'flex-end' as const,
      background: 'var(--dark)',
    }}>
      <div style={{
        position: 'absolute' as const, inset: 0,
        backgroundImage: 'url(/images/terreno-luna.jpg)',
        backgroundSize: 'cover' as const, backgroundPosition: 'center',
        opacity: 0.35,
      }} />
      <div style={{
        position: 'absolute' as const, inset: 0,
        background: 'linear-gradient(to top, rgba(22,22,20,.95) 0%, rgba(22,22,20,.4) 60%, transparent 100%)',
      }} />
      <HeroContent />
    </div>
  )
}

// ─── HERO TEXT CONTENT ────────────────────────────────────────
function HeroContent() {
  return (
    <div style={{
      position: 'relative' as const, zIndex: 10,
      maxWidth: 'var(--max)', margin: '0 auto', width: '100%',
      padding: '0 var(--pad) 5rem',
      display: 'grid' as const, gridTemplateColumns: '1fr 1fr',
      alignItems: 'flex-end' as const, gap: '4rem',
    }}>
      <div>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.22em',
          textTransform: 'uppercase' as const, color: 'var(--rl)',
          marginBottom: '1.5rem', display: 'flex' as const, alignItems: 'center' as const, gap: '.65rem',
        }}>
          <span style={{ width: '20px', height: '1px', background: 'var(--rl)', display: 'block' }} />
          General Roca · Patagonia · Argentina · Plataforma global
        </div>
        <h1 style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(2.8rem,7vw,7.5rem)',
          fontWeight: 300, lineHeight: .92,
          letterSpacing: '-.02em', color: 'var(--white)',
          marginBottom: '1.75rem',
        }}>
          Construir<br />mejor.<br />
          <em style={{ fontStyle: 'italic', color: 'rgba(250,249,246,.35)' }}>
            Decidir con criterio.
          </em>
        </h1>
        <div style={{ display: 'flex' as const, flexWrap: 'wrap' as const, gap: '.85rem' }}>
          <Link href="/selector" style={{
            fontFamily: 'var(--mono)', fontSize: '.58rem', letterSpacing: '.13em',
            textTransform: 'uppercase' as const, background: 'var(--white)',
            color: 'var(--dark)', padding: '.85rem 1.75rem', textDecoration: 'none',
          }}>
            ⬡ Qué sistema te conviene →
          </Link>
          <Link href="/quiero-construir" style={{
            fontFamily: 'var(--mono)', fontSize: '.58rem', letterSpacing: '.13em',
            textTransform: 'uppercase' as const, background: 'transparent',
            color: 'rgba(250,249,246,.6)', padding: '.85rem 1.75rem',
            border: '1px solid rgba(250,249,246,.2)', textDecoration: 'none',
          }}>
            Quiero construir
          </Link>
        </div>
      </div>

      <div>
        <p style={{
          fontSize: 'clamp(.88rem,1.1vw,.95rem)', fontWeight: 300,
          color: 'rgba(250,249,246,.38)', lineHeight: 1.85,
          maxWidth: '44ch', marginBottom: '2.25rem',
        }}>
          La plataforma de referencia sobre sistemas constructivos. Criterio técnico, datos reales y red de profesionales verificados. Desde Patagonia para el mundo.
        </p>
        <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(250,249,246,.06)' }}>
          {[
            ['8', 'Sistemas documentados'],
            ['25', 'Países en la plataforma'],
            ['3.5M', 'Déficit habitacional AR'],
            ['USD 1.350', 'Costo m² promedio 2026'],
          ].map(([num, label]) => (
            <div key={label} style={{ padding: '.9rem 1.1rem', background: 'rgba(22,22,20,.65)' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', fontWeight: 300, color: 'var(--white)', lineHeight: 1 }}>{num}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '.46rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.28)', marginTop: '.25rem' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── MAIN GLOBE HERO ─────────────────────────────────────────
export default function GlobeHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)
  const [fallback, setFallback] = useState(false)

  const st = useRef({
    scene: null as unknown, camera: null as unknown,
    renderer: null as unknown, globe: null as unknown,
    markers: [] as unknown[],
    rotY: 0, targetY: 2.4, // start facing South America
    rotX: 0, targetX: -0.15,
    autoRotate: true, THREE: null as unknown,
    animFrame: 0, isDragging: false,
    lastMouse: { x: 0, y: 0 },
  })

  useEffect(() => {
    if (!canUseWebGL()) { setFallback(true); return }
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    let mounted = true

    const init = async () => {
      try {
        const THREE = await import('three')
        if (!mounted) return
        const s = st.current
        s.THREE = THREE

        const w = Math.max(canvas.clientWidth || window.innerWidth, 400)
        const h = Math.max(canvas.clientHeight || window.innerHeight, 400)

        const scene = new THREE.Scene()
        s.scene = scene

        // Camera — positioned to see full globe with some drama
        const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100)
        camera.position.z = 2.65
        s.camera = camera

        const renderer = new THREE.WebGLRenderer({
          canvas, antialias: true, alpha: true, powerPreference: 'low-power',
        })
        renderer.setSize(w, h)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setClearColor(0x000000, 0)
        s.renderer = renderer

        // ── Globe sphere ───────────────────────────────────────
        const globe = new THREE.Mesh(
          new THREE.SphereGeometry(1, 64, 64),
          new THREE.MeshPhongMaterial({
            color: 0x14140f,
            emissive: 0x080804,
            specular: 0x222218,
            shininess: 6,
          })
        )
        scene.add(globe)
        s.globe = globe

        // ── Grid lines (lat/lng) ───────────────────────────────
        // Latitude lines
        for (let lat = -75; lat <= 75; lat += 15) {
          const pts: THREE.Vector3[] = []
          for (let lng = 0; lng <= 360; lng += 3) {
            const v = latLngToVec3(lat, lng, 1.003)
            pts.push(new THREE.Vector3(v.x, v.y, v.z))
          }
          const line = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(pts),
            new THREE.LineBasicMaterial({ color: 0x1e1e17, transparent: true, opacity: 0.6 })
          )
          scene.add(line)
        }
        // Longitude lines
        for (let lng = 0; lng < 360; lng += 15) {
          const pts: THREE.Vector3[] = []
          for (let lat = -90; lat <= 90; lat += 3) {
            const v = latLngToVec3(lat, lng, 1.003)
            pts.push(new THREE.Vector3(v.x, v.y, v.z))
          }
          const line = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(pts),
            new THREE.LineBasicMaterial({ color: 0x1e1e17, transparent: true, opacity: 0.6 })
          )
          scene.add(line)
        }

        // ── Atmosphere glow ────────────────────────────────────
        const atm = new THREE.Mesh(
          new THREE.SphereGeometry(1.12, 64, 64),
          new THREE.MeshBasicMaterial({
            color: 0x9B7C5A, transparent: true, opacity: 0.04, side: THREE.BackSide,
          })
        )
        scene.add(atm)

        // Outer glow ring
        const glow = new THREE.Mesh(
          new THREE.SphereGeometry(1.18, 64, 64),
          new THREE.MeshBasicMaterial({
            color: 0x2D3A50, transparent: true, opacity: 0.02, side: THREE.BackSide,
          })
        )
        scene.add(glow)

        // ── Lighting ───────────────────────────────────────────
        scene.add(new THREE.AmbientLight(0xffffff, 0.25))
        const sun = new THREE.DirectionalLight(0xffeedd, 1.4)
        sun.position.set(6, 4, 6)
        scene.add(sun)
        const rim = new THREE.DirectionalLight(0x4466aa, 0.35)
        rim.position.set(-6, -2, -4)
        scene.add(rim)

        // ── City/region markers ────────────────────────────────
        MARKERS.forEach(m => {
          const size = m.size
          const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(size, 12, 12),
            new THREE.MeshBasicMaterial({ color: new THREE.Color(m.color) })
          )
          const pos = latLngToVec3(m.lat, m.lng, 1.015)
          mesh.position.set(pos.x, pos.y, pos.z)
          mesh.userData = { label: m.label, isHQ: m.label === 'General Roca' }
          scene.add(mesh)
          s.markers.push(mesh)
        })

        // ── Pulse ring for General Roca ────────────────────────
        const pulseGeo = new THREE.TorusGeometry(0.05, 0.006, 8, 32)
        const pulseMat = new THREE.MeshBasicMaterial({
          color: 0xE8531A, transparent: true, opacity: 0.7,
        })
        const pulse = new THREE.Mesh(pulseGeo, pulseMat)
        const hqPos = latLngToVec3(-38.9, -68.1, 1.015)
        pulse.position.set(hqPos.x, hqPos.y, hqPos.z)
        // Orient ring to face outward from sphere center
        pulse.lookAt(0, 0, 0)
        pulse.rotateX(Math.PI / 2)
        pulse.userData = { isPulse: true, phase: 0 }
        scene.add(pulse)

        // ── Animation loop ─────────────────────────────────────
        const tick = () => {
          if (!mounted) return
          s.animFrame = requestAnimationFrame(tick)
          const T = THREE

          // Smooth rotation
          s.rotY += (s.targetY - s.rotY) * 0.025
          s.rotX += (s.targetX - s.rotX) * 0.025

          if (s.autoRotate) {
            s.targetY -= 0.0018 // slow westward drift
          }

          const g = s.globe as InstanceType<typeof T.Mesh>
          g.rotation.y = s.rotY
          g.rotation.x = s.rotX

          // Rotate all markers and grid lines with globe
          scene.children.forEach(child => {
            if (child !== g && child !== atm && child !== glow && !(child instanceof T.DirectionalLight) && !(child instanceof T.AmbientLight)) {
              child.rotation.y = s.rotY
              child.rotation.x = s.rotX
            }
          })

          // Pulse animation for HQ ring
          const p = pulse as InstanceType<typeof T.Mesh>
          p.userData.phase = (p.userData.phase + 0.04) % (Math.PI * 2)
          const scale = 1 + Math.sin(p.userData.phase) * 0.35
          p.scale.setScalar(scale)
          ;(p.material as InstanceType<typeof T.MeshBasicMaterial>).opacity = 0.5 + Math.sin(p.userData.phase) * 0.4

          renderer.render(scene, camera)
        }
        tick()
        setReady(true)

      } catch (err) {
        console.error('Globe init failed:', err)
        if (mounted) setFallback(true)
      }
    }

    init()

    // Handle resize
    const onResize = () => {
      const s = st.current
      if (!s.camera || !s.renderer || !s.THREE) return
      const T = s.THREE as typeof import('three')
      const cam = s.camera as InstanceType<typeof T.PerspectiveCamera>
      const ren = s.renderer as InstanceType<typeof T.WebGLRenderer>
      const w = Math.max(canvas.clientWidth, 400)
      const h = Math.max(canvas.clientHeight, 400)
      cam.aspect = w / h
      cam.updateProjectionMatrix()
      ren.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      mounted = false
      window.removeEventListener('resize', onResize)
      if (st.current.animFrame) cancelAnimationFrame(st.current.animFrame)
    }
  }, [])

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    st.current.isDragging = true
    st.current.lastMouse = { x: e.clientX, y: e.clientY }
    st.current.autoRotate = false
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!st.current.isDragging) return
    const dx = e.clientX - st.current.lastMouse.x
    const dy = e.clientY - st.current.lastMouse.y
    st.current.targetY -= dx * 0.006
    st.current.targetX += dy * 0.006
    st.current.targetX = Math.max(-0.5, Math.min(0.5, st.current.targetX))
    st.current.lastMouse = { x: e.clientX, y: e.clientY }
  }, [])

  const onMouseUp = useCallback(() => {
    st.current.isDragging = false
  }, [])

  const onDoubleClick = useCallback(() => {
    st.current.autoRotate = true
  }, [])

  if (fallback) return <HeroFallback />

  return (
    <div style={{
      height: '100svh', position: 'relative' as const,
      overflow: 'hidden' as const, background: '#0e0e0c',
    }}>
      {/* Globe canvas — full bleed */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute' as const, inset: 0,
          width: '100%', height: '100%',
          cursor: 'grab',
          // Shift globe to right so text has room on left
          transform: 'translateX(20%)',
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onDoubleClick={onDoubleClick}
      />

      {/* Gradient overlays */}
      <div style={{
        position: 'absolute' as const, inset: 0, pointerEvents: 'none' as const,
        background: 'linear-gradient(to right, rgba(14,14,12,.96) 0%, rgba(14,14,12,.7) 40%, rgba(14,14,12,.1) 65%, rgba(14,14,12,.0) 80%)',
      }} />
      <div style={{
        position: 'absolute' as const, inset: 0, pointerEvents: 'none' as const,
        background: 'linear-gradient(to top, rgba(14,14,12,.85) 0%, transparent 30%)',
      }} />

      {/* Loading state */}
      {!ready && (
        <div style={{
          position: 'absolute' as const, inset: 0,
          display: 'flex' as const, alignItems: 'center' as const, justifyContent: 'center' as const,
          background: '#0e0e0c',
        }}>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.18em',
            textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.2)',
          }}>Cargando...</span>
        </div>
      )}

      {/* MeinHaus HQ tag */}
      {ready && (
        <div style={{
          position: 'absolute' as const, top: '42%', left: '52%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--mono)', fontSize: '.46rem', letterSpacing: '.14em',
          textTransform: 'uppercase' as const, color: 'var(--rl)',
          display: 'flex' as const, alignItems: 'center' as const, gap: '.4rem',
          pointerEvents: 'none' as const, opacity: 0.85,
        }}>
          <span style={{ width: '20px', height: '1px', background: 'var(--rl)' }} />
          General Roca
        </div>
      )}

      {/* Drag hint */}
      {ready && (
        <div style={{
          position: 'absolute' as const, bottom: '2rem', right: '2rem',
          fontFamily: 'var(--mono)', fontSize: '.44rem', letterSpacing: '.12em',
          textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.18)',
          pointerEvents: 'none' as const,
        }}>
          Drag para rotar · Doble click para auto-rotación
        </div>
      )}

      {/* Hero text content */}
      <HeroContent />
    </div>
  )
}
