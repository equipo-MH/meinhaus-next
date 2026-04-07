'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import type { Pais } from '@/data/paises'

interface GlobeProps {
  paises: Pais[]
  selectedIso: string | null
  onSelect: (iso: string) => void
  onHover: (iso: string | null) => void
}

function hasWebGL(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch { return false }
}

function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768 ||
    /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent)
}

function latLngToVec3(lat: number, lng: number, radius = 1) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return {
    x: -radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta),
  }
}

const SC = { full: '#9B7C5A', partial: '#6B4F3A', scaffold: 'rgba(250,249,246,.12)' }
const HOVER_C = '#E8531A'
const SEL_C = '#F0A060'

// ─── MOBILE FALLBACK: simple list ────────────────────────────
function GlobeFallback({ paises, selectedIso, onSelect }: Omit<GlobeProps, 'onHover'>) {
  const continentes = [...new Set(paises.map(p => p.continente))].sort()
  return (
    <div style={{ width: '100%', height: '100%', background: 'var(--dark)', overflowY: 'auto' as const }}>
      <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(250,249,246,.05)' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.14em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.3)' }}>
          Seleccioná un país
        </span>
      </div>
      {continentes.map(cont => (
        <div key={cont}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '.46rem', letterSpacing: '.18em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.2)', padding: '.65rem 1.25rem .3rem' }}>
            {cont}
          </div>
          {paises.filter(p => p.continente === cont).map(p => (
            <button key={p.iso} onClick={() => onSelect(p.iso)} style={{
              display: 'flex' as const, alignItems: 'center' as const, gap: '.6rem',
              width: '100%', padding: '.7rem 1.25rem', background: selectedIso === p.iso ? 'rgba(155,124,90,.08)' : 'transparent',
              border: 'none', borderLeft: selectedIso === p.iso ? '2px solid var(--rl)' : '2px solid transparent',
              cursor: 'pointer' as const, textAlign: 'left' as const,
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: SC[p.statusData], flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--serif)', fontSize: '.95rem', fontWeight: 300, color: selectedIso === p.iso ? 'var(--rl)' : 'var(--white)' }}>{p.nombre}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '.46rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.22)', marginLeft: 'auto' }}>{p.iso}</span>
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

// ─── MAIN GLOBE ──────────────────────────────────────────────
export default function Globe3D({ paises, selectedIso, onSelect, onHover }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)
  const [useFallback, setUseFallback] = useState(false)

  const st = useRef({
    scene: null as unknown, camera: null as unknown, renderer: null as unknown,
    globe: null as unknown, markers: [] as unknown[], raycaster: null as unknown,
    isDragging: false, lastMouse: { x: 0, y: 0 },
    rotY: 0, rotX: 0, targetY: 0, targetX: 0,
    autoRotate: true, hoveredIso: null as string | null,
    animFrame: 0, THREE: null as unknown,
  })

  const rotateTo = useCallback((lat: number, lng: number) => {
    st.current.autoRotate = false
    st.current.targetY = -(lng + 180) * (Math.PI / 180) + Math.PI
    st.current.targetX = lat * (Math.PI / 180) * 0.4
  }, [])

  useEffect(() => {
    if (!hasWebGL() || isMobileDevice()) { setUseFallback(true); return }
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    let mounted = true

    const init = async () => {
      try {
        const THREE = await import('three')
        if (!mounted) return
        const s = st.current
        s.THREE = THREE

        const w = Math.max(canvas.clientWidth || canvas.offsetWidth, 300)
        const h = Math.max(canvas.clientHeight || canvas.offsetHeight, 300)

        const scene = new THREE.Scene(); s.scene = scene
        const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
        camera.position.z = 2.5; s.camera = camera

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' })
        renderer.setSize(w, h)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
        renderer.setClearColor(0x000000, 0); s.renderer = renderer

        const globe = new THREE.Mesh(
          new THREE.SphereGeometry(1, 48, 48),
          new THREE.MeshPhongMaterial({ color: 0x1a1a18, emissive: 0x0a0a08, specular: 0x333330, shininess: 8 })
        )
        scene.add(globe); s.globe = globe

        scene.add(new THREE.Mesh(
          new THREE.SphereGeometry(1.002, 24, 24),
          new THREE.MeshBasicMaterial({ color: 0x2a2a25, wireframe: true, transparent: true, opacity: 0.2 })
        ))
        scene.add(new THREE.Mesh(
          new THREE.SphereGeometry(1.06, 48, 48),
          new THREE.MeshBasicMaterial({ color: 0x9B7C5A, transparent: true, opacity: 0.03, side: THREE.BackSide })
        ))

        scene.add(new THREE.AmbientLight(0xffffff, 0.4))
        const sun = new THREE.DirectionalLight(0xfff5e0, 1.2)
        sun.position.set(5, 3, 5); scene.add(sun)

        const mGeo = new THREE.SphereGeometry(0.022, 10, 10)
        paises.forEach(p => {
          const mat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(SC[p.statusData]),
            transparent: p.statusData === 'scaffold', opacity: p.statusData === 'scaffold' ? 0.25 : 1,
          })
          const mesh = new THREE.Mesh(mGeo, mat.clone())
          const pos = latLngToVec3(p.lat, p.lng, 1.02)
          mesh.position.set(pos.x, pos.y, pos.z)
          mesh.userData = { iso: p.iso, lat: p.lat, lng: p.lng, status: p.statusData }
          scene.add(mesh); s.markers.push(mesh)
        })

        s.raycaster = new THREE.Raycaster()

        const tick = () => {
          if (!mounted) return
          s.animFrame = requestAnimationFrame(tick)
          const T = THREE
          s.rotY += (s.targetY - s.rotY) * 0.05
          s.rotX += (s.targetX - s.rotX) * 0.05
          if (s.autoRotate) s.targetY += 0.002

          const g = s.globe as InstanceType<typeof T.Mesh>
          g.rotation.y = s.rotY; g.rotation.x = s.rotX

          s.markers.forEach(m => {
            const mesh = m as InstanceType<typeof T.Mesh>
            mesh.rotation.y = s.rotY; mesh.rotation.x = s.rotX
            const mat = mesh.material as InstanceType<typeof T.MeshBasicMaterial>
            const iso = mesh.userData.iso as string
            if (iso === selectedIso) { mat.color.setStyle(SEL_C); mesh.scale.setScalar(1.8) }
            else if (iso === s.hoveredIso) { mat.color.setStyle(HOVER_C); mesh.scale.setScalar(1.4) }
            else { mat.color.setStyle(SC[mesh.userData.status as keyof typeof SC]); mesh.scale.setScalar(1) }
          })

          renderer.render(scene, camera)
        }
        tick()
        setReady(true)
      } catch {
        if (mounted) setUseFallback(true)
      }
    }
    init()

    const onResize = () => {
      const s = st.current
      if (!s.camera || !s.renderer || !s.THREE) return
      const T = s.THREE as typeof import('three')
      const cam = s.camera as InstanceType<typeof T.PerspectiveCamera>
      const ren = s.renderer as InstanceType<typeof T.WebGLRenderer>
      const rw = Math.max(canvas.clientWidth, 300)
      const rh = Math.max(canvas.clientHeight, 300)
      cam.aspect = rw / rh; cam.updateProjectionMatrix()
      ren.setSize(rw, rh)
    }
    window.addEventListener('resize', onResize)
    return () => { mounted = false; window.removeEventListener('resize', onResize); if (st.current.animFrame) cancelAnimationFrame(st.current.animFrame) }
  }, [paises])

  useEffect(() => {
    if (!selectedIso || useFallback) return
    const p = paises.find(x => x.iso === selectedIso)
    if (p) rotateTo(p.lat, p.lng)
  }, [selectedIso, paises, rotateTo, useFallback])

  const onMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const s = st.current; const canvas = canvasRef.current
    if (!canvas || !s.raycaster || !s.THREE) return
    const T = s.THREE as typeof import('three')
    if (s.isDragging) {
      s.targetY += (e.clientX - s.lastMouse.x) * 0.008
      s.targetX += (e.clientY - s.lastMouse.y) * 0.008
      s.targetX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, s.targetX))
      s.lastMouse = { x: e.clientX, y: e.clientY }; s.autoRotate = false; return
    }
    const rect = canvas.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    const rc = s.raycaster as InstanceType<typeof T.Raycaster>
    const cam = s.camera as InstanceType<typeof T.PerspectiveCamera>
    rc.setFromCamera({ x, y }, cam)
    const hits = rc.intersectObjects(s.markers as InstanceType<typeof T.Mesh>[])
    if (hits.length > 0) {
      const iso = hits[0].object.userData.iso as string
      if (iso !== s.hoveredIso) { s.hoveredIso = iso; onHover(iso); canvas.style.cursor = 'pointer' }
    } else if (s.hoveredIso) { s.hoveredIso = null; onHover(null); canvas.style.cursor = 'grab' }
  }, [onHover])

  const onDown = useCallback((e: React.MouseEvent) => {
    st.current.isDragging = true; st.current.lastMouse = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing'
  }, [])

  const onUp = useCallback(() => {
    st.current.isDragging = false
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
  }, [])

  const onClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const s = st.current; const canvas = canvasRef.current
    if (!canvas || !s.raycaster || !s.THREE) return
    const T = s.THREE as typeof import('three')
    const rect = canvas.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    const rc = s.raycaster as InstanceType<typeof T.Raycaster>
    const cam = s.camera as InstanceType<typeof T.PerspectiveCamera>
    rc.setFromCamera({ x, y }, cam)
    const hits = rc.intersectObjects(s.markers as InstanceType<typeof T.Mesh>[])
    if (hits.length > 0) { onSelect(hits[0].object.userData.iso as string); st.current.autoRotate = false }
  }, [onSelect])

  if (useFallback) return <GlobeFallback paises={paises} selectedIso={selectedIso} onSelect={onSelect} />

  return (
    <div style={{ position: 'relative' as const, width: '100%', height: '100%' }}>
      {!ready && (
        <div style={{ position: 'absolute' as const, inset: 0, display: 'flex' as const, alignItems: 'center' as const, justifyContent: 'center' as const, background: 'var(--dark)' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.16em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.25)' }}>Cargando globe...</span>
        </div>
      )}
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', cursor: 'grab', display: 'block' as const }}
        onMouseMove={onMove} onMouseDown={onDown} onMouseUp={onUp} onMouseLeave={onUp}
        onClick={onClick} onDoubleClick={() => { st.current.autoRotate = true }}
      />
      {ready && (
        <div style={{ position: 'absolute' as const, bottom: '1rem', right: '1rem', fontFamily: 'var(--mono)', fontSize: '.46rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.18)' }}>
          Drag · Doble click para girar
        </div>
      )}
    </div>
  )
}
