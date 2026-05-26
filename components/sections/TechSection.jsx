'use client'

import { useEffect, useRef } from 'react'

const ACCENT = '#FEA700'

const FEATURES = [
  {
    icon: '🔺',
    title: 'ALA 2.0 Active Aerodynamics',
    desc: 'Electroactuated flaps switch between low-drag and high-downforce in 500ms. Result: 750kg downforce at top speed with minimal drag penalty.',
  },
  {
    icon: '⚙️',
    title: 'LDVI — Predictive Torque Vectoring',
    desc: 'Processes 100+ sensor inputs per millisecond, anticipating driver intent before it happens. Strada, Sport, Corsa — each mode rewrites the car\'s soul.',
  },
  {
    icon: '🧬',
    title: 'Forged Composite Carbon Fiber',
    desc: 'Lamborghini\'s proprietary FCA process delivers aerospace-grade carbon at 1/5 the cost. The entire monocoque weighs just 147.5 kg.',
  },
  {
    icon: '🔋',
    title: 'HPEV Hybrid Architecture',
    desc: 'Three electric motors amplify the V12\'s fury for 1,001 combined HP. Zero lag, instant torque, and a soundtrack that defies electrification.',
  },
  {
    icon: '🎛️',
    title: 'MagneRide Suspension',
    desc: 'Electromagnetic fluid hardens dampers 1,000× per second. Cloud-smooth in Strada, track-sharp in Corsa — transition in under 50 milliseconds.',
  },
  {
    icon: '📡',
    title: 'Lamborghini Infotainment 3.0',
    desc: 'Dual 12.3" displays, real-time telemetry, lap timer, and G-force meter. Over-the-air updates keep your car perpetually current.',
  },
]

export default function TechSection({ active }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([e]) => e.target.classList.toggle('visible', e.isIntersecting),
      { threshold: 0.15 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center py-24">
      {/* Tech grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(${ACCENT}15 1px, transparent 1px),
            linear-gradient(90deg, ${ACCENT}15 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          opacity: active ? 0.15 : 0,
          transition: 'opacity 1s',
        }}
      />

      <div ref={ref} className="section-content px-16">

        {/* Header */}
        <div className="mb-14 max-w-xl">
          <div
            className="font-orbitron text-[10px] tracking-[5px] uppercase mb-4"
            style={{ color: ACCENT }}
          >
            Innovation
          </div>
          <h2
            className="font-orbitron font-black leading-[0.9] mb-4"
            style={{ fontSize: 'clamp(38px, 5vw, 72px)' }}
          >
            <span className="gradient-green block">TECHNOLOGY</span>
            <span className="gradient-green block">WITHOUT LIMITS</span>
          </h2>
          <p className="font-rajdhani text-white/45 text-lg leading-relaxed">
            Aerospace materials, active aerodynamics, predictive dynamics.
            Each system obsessively refined to the atomic level.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="group border rounded-sm p-6 flex gap-4 transition-all duration-500 hover:border-opacity-60 cursor-default"
              style={{
                borderColor: `${ACCENT}25`,
                background: `${ACCENT}06`,
                transitionDelay: `${i * 0.06}s`,
              }}
            >
              {/* Icon bubble */}
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-110"
                style={{ background: `${ACCENT}18` }}
              >
                {f.icon}
              </div>

              <div>
                <h3
                  className="font-orbitron text-sm font-bold mb-2 leading-snug"
                  style={{ color: ACCENT }}
                >
                  {f.title}
                </h3>
                <p className="font-rajdhani text-white/50 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div
          className="mt-12 p-6 border rounded-sm flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            borderColor: `${ACCENT}30`,
            background: `linear-gradient(90deg, ${ACCENT}12, transparent)`,
          }}
        >
          <div>
            <p
              className="font-orbitron font-black text-2xl"
              style={{ color: ACCENT }}
            >
              1,001 hp
            </p>
            <p className="font-rajdhani text-white/40 text-sm tracking-[2px] mt-1">
              REVUELTO HYBRID — THE FUTURE IS NOW
            </p>
          </div>
          <div className="flex items-center gap-6">
            {[['0→100', '2.5s'], ['0→200', '8.6s'], ['0→300', '24s']].map(([lbl, val]) => (
              <div key={lbl} className="text-center">
                <div className="font-orbitron font-bold text-xl" style={{ color: ACCENT }}>{val}</div>
                <div className="font-rajdhani text-white/30 text-[10px] tracking-[2px]">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
