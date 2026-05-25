'use client'

import { useEffect, useRef } from 'react'

const ACCENT = '#39FF14'

const TIMELINE = [
  {
    year: '1963',
    title: 'The Raging Bull is Born',
    desc: 'Ferruccio Lamborghini, a tractor magnate, founds Automobili Lamborghini after Enzo Ferrari dismisses a farmer\'s right to criticise a Ferrari. The 350 GT stuns Turin.',
  },
  {
    year: '1966',
    title: 'The Miura — Supercar Invented',
    desc: 'The P400 Miura debuts at Geneva and redefines automotive possibility. Mid-engine, transverse V12, 350 hp. The world\'s first true supercar — and still one of history\'s most beautiful objects.',
  },
  {
    year: '1974',
    title: 'Countach — The Poster Car',
    desc: 'The LP400 Countach enters production. Scissor doors, wedge silhouette, 300 km/h capability. It defines an era and adorns bedroom walls worldwide for two decades.',
  },
  {
    year: '2003',
    title: 'Murciélago & the Audi Era',
    desc: "Under Audi's stewardship, quality and reliability transform completely. The Murciélago arrives with 580hp and AWD. The Gallardo democratises the supercar dream with 14,022 units sold.",
  },
  {
    year: '2011',
    title: 'Aventador — The Apex Predator',
    desc: 'Carbon-fibre monocoque, push-rod suspension, 7-speed ISR gearbox. 700hp V12. 0–100 in 2.9s. The Aventador SVJ later claims the Nürburgring production-car lap record.',
  },
  {
    year: '2023',
    title: 'Revuelto — The Hybrid Revolution',
    desc: "1,001 hp. Three electric motors. V12 + electrons. The Revuelto announces Lamborghini's electrified future — yet it roars louder than anything that came before.",
  },
]

export default function HeritageSection({ active }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([e]) => e.target.classList.toggle('visible', e.isIntersecting),
      { threshold: 0.1 }
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
            Racing Heritage
          </div>
          <h2
            className="font-orbitron font-black leading-[0.9]"
            style={{ fontSize: 'clamp(38px, 5vw, 72px)' }}
          >
            <span className="gradient-silver block">A LEGACY WRITTEN</span>
            <span className="gradient-silver block">IN FIRE & SPEED</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Centre spine */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 transition-opacity duration-1000"
            style={{
              background: `linear-gradient(180deg, transparent, ${ACCENT}50, transparent)`,
              opacity: active ? 1 : 0,
            }}
          />

          {TIMELINE.map((item, i) => {
            const isRight = i % 2 === 0
            return (
              <div
                key={item.year}
                className={`relative flex items-center gap-8 mb-10 ${isRight ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Content card */}
                <div
                  className="flex-1 border rounded-sm p-6 transition-all duration-500"
                  style={{
                    borderColor: `${ACCENT}22`,
                    background: 'rgba(5,5,5,0.85)',
                    boxShadow: active ? `0 4px 30px rgba(0,0,0,0.6)` : 'none',
                  }}
                >
                  <div
                    className="font-orbitron font-black text-3xl mb-2"
                    style={{ color: ACCENT }}
                  >
                    {item.year}
                  </div>
                  <h3
                    className="font-orbitron text-sm font-bold mb-2"
                    style={{ color: '#fff' }}
                  >
                    {item.title}
                  </h3>
                  <p className="font-rajdhani text-white/45 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Centre dot */}
                <div
                  className="flex-shrink-0 w-3.5 h-3.5 rounded-full z-10 transition-all duration-500"
                  style={{
                    background: ACCENT,
                    boxShadow: active ? `0 0 16px ${ACCENT}` : 'none',
                  }}
                />

                {/* Spacer */}
                <div className="flex-1" />
              </div>
            )
          })}
        </div>

        {/* Quote */}
        <div
          className="mt-10 mx-auto max-w-3xl text-center py-10 border-t border-b"
          style={{ borderColor: `${ACCENT}20` }}
        >
          <p
            className="font-orbitron text-xl font-light italic leading-relaxed"
            style={{ color: `${ACCENT}cc` }}
          >
            "A Lamborghini is not a car — it is a declaration of war
            against mediocrity, a rolling manifesto of Italian defiance."
          </p>
          <p className="font-rajdhani text-white/30 text-xs tracking-[4px] mt-4 uppercase">
            — Ferruccio Lamborghini · 1963
          </p>
        </div>
      </div>
    </section>
  )
}
