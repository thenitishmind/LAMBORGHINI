'use client'

import { useEffect, useRef } from 'react'

const ACCENT = '#AAFF00'

const MODELS = [
  {
    name: 'REVUELTO',
    year: '2023 – PRESENT',
    tag: 'V12 Hybrid',
    icon: '⚡',
    color: '#39FF14',
    hp: '1,001', secs: '2.5s', top: '350',
    image: '/cars/yellow.png',
    desc: 'The future is electrified and deafening. Three electric motors amplify the screaming V12 for over 1,000 combined horsepower.',
  },
  {
    name: 'HURACÁN STO',
    year: '2021 – PRESENT',
    tag: 'V10 RWD Track',
    icon: '🏁',
    color: '#00FF88',
    hp: '640', secs: '3.0s', top: '310',
    image: '/cars/red.png',
    desc: 'Super Trofeo Omologata — 200 race wins distilled into a road-legal weapon. 90% new bodywork, one purpose: pure speed.',
  },
  {
    name: 'URUS PERFORMANTE',
    year: '2022 – PRESENT',
    tag: 'Twin-Turbo V8 SUV',
    icon: '🏔️',
    color: '#AAFF00',
    hp: '666', secs: '3.3s', top: '306',
    image: '/cars/orange.png',
    desc: "The world's first Super Sport Utility Vehicle. Redefines what four doors can do on any surface — tarmac, gravel, snow.",
  },
]

export default function ModelsSection({ active }) {
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
      <div ref={ref} className="section-content px-16">

        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="font-orbitron text-[10px] tracking-[5px] uppercase mb-4"
            style={{ color: ACCENT }}
          >
            The Lineup
          </div>
          <h2
            className="font-orbitron font-black leading-[0.9]"
            style={{ fontSize: 'clamp(38px, 5vw, 72px)' }}
          >
            <span className="gradient-green block">CHOOSE YOUR</span>
            <span className="gradient-green block">WEAPON</span>
          </h2>
          <p className="font-rajdhani text-white/40 text-lg mt-4 max-w-xl mx-auto">
            Three distinct visions of automotive supremacy — each a masterpiece of Italian excess.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {MODELS.map((m, i) => (
            <div
              key={m.name}
              className="group relative border-2 rounded-lg p-6 cursor-pointer transition-all duration-500 hover:-translate-y-3 overflow-hidden h-full flex flex-col"
              style={{
                borderColor: `${m.color}40`,
                background: `linear-gradient(145deg, ${m.color}06, rgba(0,0,0,0.8))`,
                boxShadow: active ? `0 8px 40px ${m.color}20` : 'none',
              }}
            >
              {/* Background image */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none">
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-lg origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"
                style={{ background: `linear-gradient(90deg, ${m.color}, transparent)` }}
              />

              {/* Content */}
              <div className="relative z-10 flex-1 flex flex-col">
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${m.color}18`, border: `1px solid ${m.color}33` }}
                >
                  {m.icon}
                </div>

                {/* Tag */}
                <div
                  className="font-orbitron text-[9px] tracking-[4px] uppercase mb-2"
                  style={{ color: m.color }}
                >
                  {m.tag}
                </div>

                <h3
                  className="font-orbitron font-black text-2xl mb-1"
                  style={{ color: m.color }}
                >
                  {m.name}
                </h3>
                <p className="font-rajdhani text-white/35 text-[11px] tracking-[2px] mb-4">
                  {m.year}
                </p>
                <p className="font-rajdhani text-white/55 text-[13px] leading-relaxed mb-auto flex-1">
                  {m.desc}
                </p>
              </div>

              {/* Bottom specs */}
              <div
                className="grid grid-cols-3 gap-2 pt-4 border-t mt-4 relative z-10"
                style={{ borderColor: `${m.color}20` }}
              >
                {[['hp', 'HP'], ['secs', '0-100'], ['top', 'km/h']].map(([key, lbl]) => (
                  <div key={lbl} className="text-center py-2">
                    <div className="font-orbitron font-bold text-lg transition-colors duration-300 group-hover:text-white" style={{ color: m.color }}>
                      {m[key]}
                    </div>
                    <div className="font-rajdhani text-[9px] tracking-[2px] text-white/30 uppercase">
                      {lbl}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
