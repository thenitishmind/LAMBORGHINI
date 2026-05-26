'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/* ── Per-section scene states ──────────────────────────────────────────── */
const STATES = [
  { // 0 Hero — golden, front view, auto-rotate
    camX: 0,    camY: 2.5, camZ: 9,
    tgtX: 0,    tgtY: 0.8, tgtZ: 0,
    body: 0xFFD700, ambient: 0x1a0800, sun: 0xffffff,
    fill: 0xFF6600, rim: 0xFF8C00,
    fogColor: 0x000000, fogD: 0.018,
    autoRot: true, rotY: 0,
    pColor: 0xFF8C00, pOpacity: 0.6,
    gridColor: 0x331100,
    sunIntensity: 2.5, fillIntensity: 1.0, rimIntensity: 0.8,
  },
  { // 1 Performance — scarlet, dramatic side view
    camX: 7.5,  camY: 1.4, camZ: 2.5,
    tgtX: 0,    tgtY: 0.6, tgtZ: 0,
    body: 0xCC0000, ambient: 0x220000, sun: 0xFF3300,
    fill: 0xFF1100, rim: 0xFF0000,
    fogColor: 0x0d0000, fogD: 0.035,
    autoRot: false, rotY: -0.15,
    pColor: 0xFF4400, pOpacity: 0.35,
    gridColor: 0x330000,
    sunIntensity: 3.0, fillIntensity: 1.5, rimIntensity: 1.2,
  },
  { // 2 Models — blue, top-down
    camX: 0,    camY: 10,  camZ: 5,
    tgtX: 0,    tgtY: 0,   tgtZ: 0,
    body: 0x0055FF, ambient: 0x001133, sun: 0x4488FF,
    fill: 0x0033CC, rim: 0x0077FF,
    fogColor: 0x000011, fogD: 0.014,
    autoRot: false, rotY: 0,
    pColor: 0x0088FF, pOpacity: 0.5,
    gridColor: 0x001133,
    sunIntensity: 2.0, fillIntensity: 1.0, rimIntensity: 1.4,
  },
  { // 3 Tech — cyber green, close front
    camX: 0,    camY: 1.4, camZ: 5.2,
    tgtX: 0,    tgtY: 1.3, tgtZ: 1.5,
    body: 0x00DD88, ambient: 0x001a00, sun: 0x00FF88,
    fill: 0x00CC66, rim: 0x00AA44,
    fogColor: 0x001100, fogD: 0.025,
    autoRot: false, rotY: 0,
    pColor: 0x00FF88, pOpacity: 0.7,
    gridColor: 0x002200,
    sunIntensity: 2.2, fillIntensity: 1.2, rimIntensity: 1.0,
  },
  { // 4 Heritage — silver/mono, 3/4 rear left
    camX: -7,   camY: 3.2, camZ: 5,
    tgtX: 0,    tgtY: 0.6, tgtZ: 0,
    body: 0xBBBBBB, ambient: 0x111111, sun: 0xDDDDDD,
    fill: 0x999999, rim: 0xAAAAAA,
    fogColor: 0x050505, fogD: 0.022,
    autoRot: false, rotY: 0.2,
    pColor: 0xAAAAAA, pOpacity: 0.25,
    gridColor: 0x111111,
    sunIntensity: 1.8, fillIntensity: 0.8, rimIntensity: 0.6,
  },
  { // 5 Footer — orange, wide hero shot
    camX: 0,    camY: 2.8, camZ: 8.5,
    tgtX: 0,    tgtY: 0.8, tgtZ: 0,
    body: 0xFF8C00, ambient: 0x1a0a00, sun: 0xffffff,
    fill: 0xFF6600, rim: 0xFFD700,
    fogColor: 0x030100, fogD: 0.016,
    autoRot: true, rotY: 0,
    pColor: 0xFFD700, pOpacity: 0.55,
    gridColor: 0x331800,
    sunIntensity: 2.5, fillIntensity: 1.0, rimIntensity: 0.9,
  },
]

/* ── Utility: lerp a THREE.Color toward target ── */
function lerpColor(cur, target, t) {
  cur.r += (target.r - cur.r) * t
  cur.g += (target.g - cur.g) * t
  cur.b += (target.b - cur.b) * t
}

/* ── Build the Lamborghini car using BufferGeometry boxes/cylinders ── */
function buildCar(scene) {
  const car = new THREE.Group()
  const cabinParts = []

  const body = (w, h, d, mat) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat)
    m.castShadow = true; m.receiveShadow = true
    return m
  }

  // Materials (we'll mutate bodyMat.color each frame)
  const bodyMat  = new THREE.MeshStandardMaterial({ color: 0xFFD700, metalness: 0.9, roughness: 0.08 })
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x88aaff, metalness: 0.1, roughness: 0, transparent: true, opacity: 0.35 })
  const darkMat  = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.5, roughness: 0.6 })
  const rimMat   = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.95, roughness: 0.05 })
  const tyreMAT  = new THREE.MeshStandardMaterial({ color: 0x0d0d0d, metalness: 0.1, roughness: 0.9 })
  const headMat  = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffaa, emissiveIntensity: 3 })
  const tailMat  = new THREE.MeshStandardMaterial({ color: 0xff2200, emissive: 0xff0000, emissiveIntensity: 2.5 })
  const calMat   = new THREE.MeshStandardMaterial({ color: 0xFF8C00, metalness: 0.7, roughness: 0.3 })

  // ── Lower body ──────────────────────────────────────────────
  const floor = body(3.8, 0.28, 8.2, bodyMat); floor.position.set(0, 0.35, 0); car.add(floor)
  const lower = body(3.8, 0.55, 6.8, bodyMat); lower.position.set(0, 0.72, 0); car.add(lower)

  // ── Skirts ──────────────────────────────────────────────────
  const skirtL = body(0.12, 0.18, 6.0, darkMat); skirtL.position.set(1.97, 0.44, 0); car.add(skirtL)
  const skirtR = skirtL.clone(); skirtR.position.x = -1.97; car.add(skirtR)

  // ── Cabin ──────────────────────────────────────────────────
  const cabin = body(3.2, 0.72, 2.8, bodyMat); cabin.position.set(0, 1.22, -0.3); car.add(cabin)
  cabinParts.push(cabin)
  const roof  = body(2.9, 0.08, 2.2, bodyMat); roof.position.set(0, 1.62, -0.3);  car.add(roof)
  cabinParts.push(roof)

  // Windshields
  const mkGlass = (w, h, x, y, z, rx = 0, ry = 0) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), glassMat)
    m.position.set(x, y, z); m.rotation.set(rx, ry, 0); car.add(m)
    cabinParts.push(m)
  }
  mkGlass(2.8, 0.85,  0, 1.25,  1.12, -0.55)
  mkGlass(2.5, 0.75,  0, 1.25, -1.72,  0.55)
  mkGlass(2.2, 0.58,  1.61, 1.25, -0.3, 0, Math.PI / 2)
  mkGlass(2.2, 0.58, -1.61, 1.25, -0.3, 0, -Math.PI / 2)

  // ── Front ──────────────────────────────────────────────────
  const fChin = body(3.6, 0.18, 0.5, bodyMat); fChin.position.set(0, 0.44, 4.1);   car.add(fChin)
  const fNose = body(3.6, 0.55, 0.3, bodyMat); fNose.position.set(0, 0.78, 4.25);  car.add(fNose)
  const fSplit= body(3.4, 0.22, 0.6, darkMat); fSplit.position.set(0, 0.32, 4.35); car.add(fSplit)

  // Splitter fins
  for (let i = -1.2; i <= 1.2; i += 0.4) {
    const fin = body(0.04, 0.18, 0.55, darkMat); fin.position.set(i, 0.28, 4.35); car.add(fin)
  }

  // Headlights
  const hl1 = body(0.55, 0.12, 0.18, headMat); hl1.position.set( 1.5, 0.92, 4.32); car.add(hl1)
  const hl2 = hl1.clone(); hl2.position.x = -1.5; car.add(hl2)
  // DRL strips
  const drl1 = body(1.4, 0.045, 0.1, headMat); drl1.position.set( 1.3, 0.80, 4.35); car.add(drl1)
  const drl2 = drl1.clone(); drl2.position.x = -1.3; car.add(drl2)

  // ── Hood vents ─────────────────────────────────────────────
  const hv1 = body(0.5, 0.06, 0.9, darkMat); hv1.position.set( 0.7, 1.06, 3.0); car.add(hv1)
  const hv2 = hv1.clone(); hv2.position.x = -0.7; car.add(hv2)

  // ── Rear ───────────────────────────────────────────────────
  const rPanel = body(3.6, 0.28, 0.35, bodyMat); rPanel.position.set(0, 0.82, -4.05); car.add(rPanel)
  const rDiff  = body(3.4, 0.14, 0.4,  darkMat); rDiff.position.set(0, 0.38, -4.25);  car.add(rDiff)
  for (let i = -1.3; i <= 1.3; i += 0.35) {
    const fin = body(0.04, 0.12, 0.38, darkMat); fin.position.set(i, 0.35, -4.25); car.add(fin)
  }

  // Tail lights
  const tl1 = body(1.0, 0.08, 0.12, tailMat); tl1.position.set( 1.2, 0.88, -4.2); car.add(tl1)
  const tl2 = tl1.clone(); tl2.position.x = -1.2; car.add(tl2)
  const tlC  = body(2.2, 0.04, 0.08, tailMat); tlC.position.set(0, 0.88, -4.2);   car.add(tlC)

  // ── Engine vents (rear quarter) ────────────────────────────
  const ev1 = body(0.7, 0.30, 0.12, darkMat); ev1.position.set( 1.85, 0.95, -2.2); car.add(ev1)
  const ev2 = ev1.clone(); ev2.position.x = -1.85; car.add(ev2)
  for (let j = 0; j < 3; j++) {
    const slat = body(0.65, 0.04, 0.08, new THREE.MeshStandardMaterial({ color: 0x222222 }))
    slat.position.set( 1.85, 0.82 + j * 0.11, -2.2); car.add(slat)
    const slatR = slat.clone(); slatR.position.x = -1.85; car.add(slatR)
  }

  // ── Wing ──────────────────────────────────────────────────
  const wing  = body(3.0, 0.08, 0.55, bodyMat); wing.position.set(0, 2.0, -3.5);   car.add(wing)
  const wepL  = body(0.12, 0.62, 0.22, bodyMat); wepL.position.set( 1.4, 1.72, -3.5); car.add(wepL)
  const wepR  = wepL.clone(); wepR.position.x = -1.4; car.add(wepR)
  const wsL   = body(0.1, 0.55, 0.1, darkMat); wsL.position.set( 0.8, 1.72, -3.5); car.add(wsL)
  const wsR   = wsL.clone(); wsR.position.x = -0.8; car.add(wsR)

  // ── Exhaust ────────────────────────────────────────────────
  const mkExh = (x) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.35, 16), rimMat)
    m.position.set(x, 0.38, -4.4); m.rotation.x = Math.PI / 2; car.add(m)
  }
  mkExh(0.55); mkExh(-0.55)

  // ── Wheels ────────────────────────────────────────────────
  const wheels = []
  const mkWheel = (x, z) => {
    const wg = new THREE.Group()

    const tyre = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.22, 16, 64), tyreMAT)
    tyre.rotation.y = Math.PI / 2; tyre.castShadow = true; wg.add(tyre)

    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.50, 0.50, 0.06, 32), rimMat)
    disc.rotation.z = Math.PI / 2; wg.add(disc)

    for (let i = 0; i < 5; i++) {
      const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.06, 0.45), rimMat)
      spoke.rotation.z = Math.PI / 2
      spoke.rotation.x = (i / 5) * Math.PI * 2
      spoke.position.y = Math.sin((i / 5) * Math.PI * 2) * 0.22
      spoke.position.z = Math.cos((i / 5) * Math.PI * 2) * 0.22
      wg.add(spoke)
    }

    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.08, 16), rimMat)
    cap.rotation.z = Math.PI / 2; wg.add(cap)

    const cal = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.28, 0.08), calMat)
    cal.position.set(0.08, -0.28, 0); wg.add(cal)

    wg.position.set(x, 0.58, z)
    wg.rotation.z = Math.PI / 2
    car.add(wg)
    wheels.push(wg)
  }

  mkWheel( 1.85,  2.65)
  mkWheel(-1.85,  2.65)
  mkWheel( 1.85, -2.65)
  mkWheel(-1.85, -2.65)

  car.position.y = 0.3
  scene.add(car)
  return { car, bodyMat, wheels, cabinParts }
}

/* ── Build Particles ── */
function buildParticles(scene) {
  const count = 1200
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 36
    positions[i * 3 + 1] = Math.random() * 8
    positions[i * 3 + 2] = (Math.random() - 0.5) * 36
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const mat = new THREE.PointsMaterial({
    color: 0xFF8C00,
    size: 0.08,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })

  const pts = new THREE.Points(geo, mat)
  scene.add(pts)
  return { pts, mat }
}

/* ── Build Speed Lines ── */
function buildSpeedLines(scene) {
  const group = new THREE.Group()

  for (let i = 0; i < 80; i++) {
    const y = (Math.random() - 0.5) * 4 + 1.0
    const z = (Math.random() - 0.5) * 5
    const len = 3 + Math.random() * 6
    const x = (Math.random() - 0.5) * 22

    const positions = new Float32Array([x, y, z, x + len, y, z])
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const mat = new THREE.LineBasicMaterial({
      color: i % 3 === 0 ? 0xFF4400 : i % 3 === 1 ? 0xFF8C00 : 0xFFD700,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    })

    group.add(new THREE.Line(geo, mat))
  }

  scene.add(group)
  return { group }
}

/* ── Build Circuit Grid ── */
function buildCircuitGrid(scene) {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size; canvas.height = size
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, size, size)

  ctx.strokeStyle = '#C10001'
  ctx.lineWidth = 1.2

  const step = 40
  for (let x = 0; x <= size; x += step) {
    for (let y = 0; y <= size; y += step) {
      const dirs = []
      if (x + step <= size) dirs.push([x + step, y])
      if (y + step <= size) dirs.push([x, y + step])
      dirs.forEach(([tx, ty]) => {
        if (Math.random() > 0.45) {
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(tx, ty); ctx.stroke()
        }
      })
      if (Math.random() > 0.65) {
        ctx.beginPath()
        ctx.arc(x, y, Math.random() > 0.7 ? 4 : 2, 0, Math.PI * 2)
        ctx.fillStyle = '#C10001'; ctx.fill()
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  const geo = new THREE.PlaneGeometry(36, 36)
  const mat = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })

  const mesh = new THREE.Mesh(geo, mat)
  mesh.rotation.x = -Math.PI / 2
  mesh.position.y = 0.02
  scene.add(mesh)
  return mesh
}

/* ── Video Domes Helper ── */
function buildVideoDomes(scene) {
  const sources = [
    '/cars/Cars1.mp4',
    '/cars/car2.mp4',
    '/cars/showspice.mp4'
  ]
  const domes = []

  sources.forEach((src, idx) => {
    const video = document.createElement('video')
    video.src = src
    video.loop = true
    video.muted = true
    video.playsInline = true
    video.autoplay = true
    video.crossOrigin = 'anonymous'
    video.play().catch(err => console.log('Autoplay blocked: ', err))

    const texture = new THREE.VideoTexture(video)
    texture.colorSpace = THREE.SRGBColorSpace

    // Use slightly different radii to prevent z-fighting when cross-fading
    const radius = 35 + idx * 0.1
    const geo = new THREE.SphereGeometry(radius, 60, 40)
    geo.scale(-1, 1, 1) // Flip inside out

    const mat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0,
      side: THREE.BackSide,
      depthWrite: false
    })

    const mesh = new THREE.Mesh(geo, mat)
    scene.add(mesh)

    domes.push({ mesh, mat, video })
  })

  return domes
}

/* ══════════════════════════════════════════════════════════════════════════ */
export default function ThreeScene({
  googleViewActive = false,
  cameraMode = 'orbit',
  activeVideoIndex = 0,
}) {
  const mountRef = useRef(null)

  const propsRef = useRef({ googleViewActive, cameraMode, activeVideoIndex })
  useEffect(() => {
    propsRef.current = { googleViewActive, cameraMode, activeVideoIndex }
  }, [googleViewActive, cameraMode, activeVideoIndex])

  useEffect(() => {
    if (!mountRef.current) return
    const el = mountRef.current
    const W = window.innerWidth, H = window.innerHeight

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.3
    el.appendChild(renderer.domElement)

    /* ── Scene + Camera ── */
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)
    scene.fog = new THREE.FogExp2(0x000000, 0.018)

    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 120)
    camera.position.set(0, 2.5, 9)

    /* ── Lights ── */
    const ambient = new THREE.AmbientLight(0x1a0800, 0.15)
    scene.add(ambient)

    const sun = new THREE.DirectionalLight(0xffffff, 2.5)
    sun.position.set(10, 15, 10); sun.castShadow = true
    scene.add(sun)

    const fill = new THREE.DirectionalLight(0xFF6600, 1.0)
    fill.position.set(-8, 4, -5)
    scene.add(fill)

    const rim = new THREE.DirectionalLight(0xFF8C00, 0.8)
    rim.position.set(0, 3, -10)
    scene.add(rim)

    const underPt = new THREE.PointLight(0xFF8C00, 2, 6)
    underPt.position.set(0, -0.5, 0)
    scene.add(underPt)

    /* ── Ground ── */
    const grid = new THREE.GridHelper(50, 50, 0x331100, 0x110800)
    grid.position.y = 0
    scene.add(grid)

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 50),
      new THREE.MeshStandardMaterial({ color: 0x030100, roughness: 0.15, metalness: 0.85 })
    )
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    scene.add(ground)

    // Neon underglow strip beneath car
    const glowStrip = new THREE.Mesh(
      new THREE.PlaneGeometry(4.2, 8.8),
      new THREE.MeshBasicMaterial({ color: 0xFF6600, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending, depthWrite: false })
    )
    glowStrip.rotation.x = -Math.PI / 2
    glowStrip.position.set(0, 0.005, 0.3)
    scene.add(glowStrip)

    // Shadow glow ellipse
    const shadowEl = new THREE.Mesh(
      new THREE.PlaneGeometry(9, 5),
      new THREE.MeshBasicMaterial({ color: 0xFF8C00, transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending, depthWrite: false })
    )
    shadowEl.rotation.x = -Math.PI / 2
    shadowEl.position.y = 0.01
    scene.add(shadowEl)

    /* ── Car ── */
    const { car, bodyMat, wheels, cabinParts } = buildCar(scene)

    /* ── Video Domes ── */
    const videoDomes = buildVideoDomes(scene)

    /* ── Particles ── */
    const { pts: particles, mat: particleMat } = buildParticles(scene)

    /* ── Speed lines ── */
    const { group: speedLines } = buildSpeedLines(scene)

    /* ── Circuit grid ── */
    const circuitGrid = buildCircuitGrid(scene)

    /* ── State interpolation ── */
    const currentCamPos  = new THREE.Vector3(0, 2.5, 9)
    const currentCamTgt  = new THREE.Vector3(0, 0.8, 0)
    const currentBodyCol = new THREE.Color(0xFFD700)
    const currentAmbCol  = new THREE.Color(0x1a0800)
    const currentSunCol  = new THREE.Color(0xffffff)
    const currentFillCol = new THREE.Color(0xFF6600)
    const currentRimCol  = new THREE.Color(0xFF8C00)
    const currentFogCol  = new THREE.Color(0x000000)
    const currentPCol    = new THREE.Color(0xFF8C00)
    const currentGridCol = new THREE.Color(0x331100)

    let currentSunInt  = 2.5
    let currentFillInt = 1.0
    let currentRimInt  = 0.8
    let currentFogD    = 0.018
    let currentPOp     = 0.6
    let carRotY        = 0
    let autoRotTimer   = 0

    // Pointer look-around controls (used in Google View cockpit mode)
    let isDragging = false
    let pointerX = 0
    let pointerY = 0
    let targetTheta = 0 // horizontal drag angle
    let targetPhi = 0.15  // vertical drag angle
    let theta = 0
    let phi = 0.15

    const onPointerDown = (e) => {
      isDragging = true
      pointerX = e.clientX
      pointerY = e.clientY
    }

    const onPointerMove = (e) => {
      if (!isDragging) return
      const dx = e.clientX - pointerX
      const dy = e.clientY - pointerY
      pointerX = e.clientX
      pointerY = e.clientY

      targetTheta += dx * 0.004
      targetPhi = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetPhi + dy * 0.004))
    }

    const onPointerUp = () => {
      isDragging = false
    }

    const dom = renderer.domElement
    dom.addEventListener('pointerdown', onPointerDown)
    dom.addEventListener('pointermove', onPointerMove)
    dom.addEventListener('pointerup', onPointerUp)
    dom.addEventListener('pointerleave', onPointerUp)

    // Scroll state
    const scrollState = { idx: 0, autoRot: true }

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const prog  = Math.min(window.scrollY / total, 1)
      const idx   = Math.min(Math.floor(prog * 6), 5)
      scrollState.idx     = idx
      scrollState.autoRot = STATES[idx].autoRot
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    /* ── Animation loop ── */
    const clock = new THREE.Clock()
    let animId

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const dt = clock.getDelta()
      const t  = dt * 2.5      // lerp speed
      const st = STATES[scrollState.idx]

      const { googleViewActive: gActive, cameraMode: cMode, activeVideoIndex: vIdx } = propsRef.current

      // ── Interpolate drag angles
      theta += (targetTheta - theta) * 0.15
      phi += (targetPhi - phi) * 0.15

      // ── Lerp camera position and look target
      if (gActive) {
        // Cockpit mode hides the cabin roof/pillars for clean 360 view
        const hideCabin = cMode === 'cockpit'
        cabinParts.forEach(p => p.visible = !hideCabin)

        if (cMode === 'cockpit') {
          // Camera inside cabin looking around
          const cabinPos = new THREE.Vector3(0, 1.25, 0.1)
          camera.position.copy(cabinPos)

          const lookTarget = new THREE.Vector3(
            cabinPos.x + Math.sin(theta) * Math.cos(phi),
            cabinPos.y + Math.sin(phi),
            cabinPos.z - Math.cos(theta) * Math.cos(phi)
          )
          camera.lookAt(lookTarget)
        } else if (cMode === 'hood') {
          // Camera on hood looking forward
          const hoodPos = new THREE.Vector3(0, 1.15, 2.8)
          camera.position.copy(hoodPos)

          const lookTarget = new THREE.Vector3(
            hoodPos.x + Math.sin(theta) * Math.cos(phi),
            hoodPos.y + Math.sin(phi),
            hoodPos.z + Math.cos(theta) * Math.cos(phi)
          )
          camera.lookAt(lookTarget)
        } else {
          // Orbit view around the car
          const dist = 8.5
          camera.position.x = dist * Math.sin(theta) * Math.cos(phi)
          camera.position.y = dist * Math.sin(phi) + 0.8
          camera.position.z = dist * Math.cos(theta) * Math.cos(phi)
          camera.lookAt(0, 0.8, 0)
        }
      } else {
        // Normal scroll camera lerp
        cabinParts.forEach(p => p.visible = true)

        currentCamPos.lerp(new THREE.Vector3(st.camX, st.camY, st.camZ), t)
        currentCamTgt.lerp(new THREE.Vector3(st.tgtX, st.tgtY, st.tgtZ), t)
        camera.position.copy(currentCamPos)
        camera.lookAt(currentCamTgt)

        // Slowly drift drag targets back to neutral so entering VR is clean
        targetTheta += (0 - targetTheta) * t
        targetPhi += (0.15 - targetPhi) * t
      }

      // ── Lerp body color
      lerpColor(currentBodyCol, new THREE.Color(st.body), t)
      bodyMat.color.copy(currentBodyCol)

      // ── Lerp ambient
      lerpColor(currentAmbCol, new THREE.Color(st.ambient), t)
      ambient.color.copy(currentAmbCol)

      // ── Lerp sun
      lerpColor(currentSunCol, new THREE.Color(st.sun), t)
      sun.color.copy(currentSunCol)
      currentSunInt += (st.sunIntensity - currentSunInt) * t
      sun.intensity = currentSunInt

      // ── Lerp fill
      lerpColor(currentFillCol, new THREE.Color(st.fill), t)
      fill.color.copy(currentFillCol)
      currentFillInt += (st.fillIntensity - currentFillInt) * t
      fill.intensity = currentFillInt

      // ── Lerp rim
      lerpColor(currentRimCol, new THREE.Color(st.rim), t)
      rim.color.copy(currentRimCol)
      currentRimInt += (st.rimIntensity - currentRimInt) * t
      rim.intensity = currentRimInt

      // ── Lerp fog
      lerpColor(currentFogCol, new THREE.Color(st.fogColor), t)
      scene.fog.color.copy(currentFogCol)
      currentFogD += (st.fogD - currentFogD) * t
      scene.fog.density = currentFogD

      // ── Lerp particles
      lerpColor(currentPCol, new THREE.Color(st.pColor), t)
      particleMat.color.copy(currentPCol)
      currentPOp += (st.pOpacity - currentPOp) * t
      particleMat.opacity = currentPOp

      // ── Lerp grid color
      lerpColor(currentGridCol, new THREE.Color(st.gridColor), t)
      grid.material.color.copy(currentGridCol)

      // ── Under point light tracks body color
      underPt.color.copy(currentBodyCol)
      underPt.intensity = 1.5 + Math.sin(clock.elapsedTime * 1.5) * 0.5

      // ── Shadow ellipse + glow strip color
      shadowEl.material.color.copy(currentBodyCol)
      glowStrip.material.color.copy(currentBodyCol)

      // ── Car auto-rotation
      autoRotTimer += dt
      if (scrollState.autoRot && !gActive) {
        carRotY += dt * 0.35
      } else if (!gActive) {
        carRotY += (st.rotY - carRotY) * t * 0.5
      } else {
        // Keep car stationary in Google View so panning makes sense
        carRotY += (0 - carRotY) * t * 0.5
      }
      car.rotation.y = carRotY

      // ── Wheel spin
      const spinSpeed = (scrollState.autoRot && !gActive) ? 1.5 : (scrollState.idx === 1 && !gActive ? 3.0 : 0.5)
      wheels.forEach(w => { w.rotation.x -= dt * spinSpeed })

      // ── Video Domes Crossfades
      videoDomes.forEach((dome, idx) => {
        let targetOp = 0
        if (gActive) {
          targetOp = (idx === vIdx) ? 0.9 : 0.0
        } else {
          // Scroll section matching
          let currentSectionVideoIdx = 0
          if (scrollState.idx === 1) currentSectionVideoIdx = 1
          else if (scrollState.idx === 2 || scrollState.idx === 3) currentSectionVideoIdx = 2
          else currentSectionVideoIdx = 0

          targetOp = (idx === currentSectionVideoIdx) ? 0.25 : 0.0
        }
        dome.mat.opacity += (targetOp - dome.mat.opacity) * t
      })

      // ── Particle drift
      const pPos = particles.geometry.attributes.position.array
      for (let i = 0; i < pPos.length; i += 3) {
        pPos[i + 1] += dt * 0.08
        if (pPos[i + 1] > 6) pPos[i + 1] = 0
      }
      particles.geometry.attributes.position.needsUpdate = true

      // ── Speed lines (section 1)
      const wantSpeedLines = scrollState.idx === 1 && !gActive
      speedLines.children.forEach((line, i) => {
        const targetOp = wantSpeedLines ? 0.4 + Math.random() * 0.3 : 0
        line.material.opacity += (targetOp - line.material.opacity) * t * 0.5
        if (wantSpeedLines) {
          const pts = line.geometry.attributes.position.array
          pts[0] -= dt * (8 + i * 0.3)
          pts[3] -= dt * (8 + i * 0.3)
          if (pts[0] < -22) { pts[0] += 44; pts[3] += 44 }
          line.geometry.attributes.position.needsUpdate = true
        }
      })

      // ── Circuit grid (section 3)
      const wantCircuit = scrollState.idx === 3 && !gActive
      const targetCircuit = wantCircuit ? 0.5 : 0
      circuitGrid.material.opacity += (targetCircuit - circuitGrid.material.opacity) * t * 0.4

      renderer.render(scene, camera)
    }
    animate()

    /* ── Resize ── */
    const onResize = () => {
      const W2 = window.innerWidth, H2 = window.innerHeight
      camera.aspect = W2 / H2
      camera.updateProjectionMatrix()
      renderer.setSize(W2, H2)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      dom.removeEventListener('pointerdown', onPointerDown)
      dom.removeEventListener('pointermove', onPointerMove)
      dom.removeEventListener('pointerup', onPointerUp)
      dom.removeEventListener('pointerleave', onPointerUp)
      renderer.dispose()
      videoDomes.forEach(d => {
        d.video.pause()
        d.video.src = ''
        d.video.load()
        d.mesh.geometry.dispose()
        d.mat.dispose()
      })
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0"
      style={{ width: '100vw', height: '100vh' }}
    />
  )
}
