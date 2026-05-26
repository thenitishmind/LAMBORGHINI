'use client'

import { useEffect, useRef } from 'react'

const ACCENT = '#DD3D0D'

const COLS = [
  {
    title: 'Models',
    links: ['Revuelto', 'Huracán STO', 'Urus Performante', 'SC63 Hypercar', 'Lamborghini Sián'],
  },
  {
    title: 'Company',
    links: ['Our Story', 'Squadra Corse', 'Ad Personam', 'Lifestyle', 'Careers'],
  },
  {
    title: 'Connect',
    links: ['Find a Dealer', 'Configure Online', 'Press Room', 'Museum', 'Contact Us'],
  },
]

export default function FooterSection({ active }) {
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
    <section
      className="relative min-h-screen flex flex-col justify-end"
      style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.95) 25%)' }}
    >
      <div ref={ref} className="section-content">

        {/* Big CTA */}
        <div
          className="mx-16 mb-0 py-16 border-t text-center"
          style={{ borderColor: `${ACCENT}30` }}
        >
          <div
            className="font-orbitron text-[10px] tracking-[5px] uppercase mb-4"
            style={{ color: ACCENT }}
          >
            Begin Your Journey
          </div>
          <h2
            className="font-orbitron font-black leading-[0.9] mb-8"
            style={{ fontSize: 'clamp(38px, 5vw, 72px)' }}
          >
            <span
              className="block"
              style={{
                background: `linear-gradient(135deg, #fff 20%, ${ACCENT} 65%, #FEA700 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              FIND YOUR
            </span>
            <span
              className="block"
              style={{
                background: `linear-gradient(135deg, #fff 20%, ${ACCENT} 65%, #FEA700 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              RAGING BULL
            </span>
          </h2>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              className="font-orbitron text-xs tracking-[3px] uppercase px-10 py-4 font-bold transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${ACCENT}, #C10001)`,
                color: '#000',
                boxShadow: `0 0 50px ${ACCENT}55`,
              }}
            >
              Explore All Models ›
            </button>
            <button
              className="font-orbitron text-xs tracking-[3px] uppercase px-10 py-4 font-bold border transition-all duration-300 hover:-translate-y-1"
              style={{ borderColor: ACCENT, color: ACCENT, background: `${ACCENT}12` }}
            >
              Find a Dealer
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer
          className="border-t px-16 pt-14 pb-10"
          style={{ borderColor: `${ACCENT}25`, background: 'rgba(0,0,0,0.7)' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

            {/* Brand */}
            <div>
              <div
                className="font-orbitron font-black text-xl tracking-[3px] mb-4"
                style={{
                  background: `linear-gradient(90deg, ${ACCENT}, #C10001)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                LAMBORGHINI
              </div>
              <p className="font-rajdhani text-white/35 text-sm leading-relaxed max-w-xs">
                Automobili Lamborghini S.p.A.<br />
                Via Modena 12, Sant'Agata Bolognese, Italy.
                <br /><br />
                Born to drift. Built to dominate.
              </p>
            </div>

            {/* Link columns */}
            {COLS.map((col) => (
              <div key={col.title}>
                <h4
                  className="font-orbitron text-[10px] tracking-[3px] uppercase mb-5"
                  style={{ color: ACCENT }}
                >
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="font-rajdhani text-sm text-white/40 hover:text-white transition-colors duration-300"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <p className="font-rajdhani text-white/25 text-xs tracking-wider text-center">
              © 2025 Automobili Lamborghini S.p.A. All trademarks are property of their respective owners.
              Built with Nitish❤️.
            </p>
            <div className="flex gap-3">
              {['𝕏', 'in', '▶', '📷'].map((icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-full border flex items-center justify-center text-sm transition-all duration-300 hover:scale-110"
                  style={{
                    borderColor: `${ACCENT}35`,
                    color: 'rgba(255,255,255,0.5)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = ACCENT
                    e.currentTarget.style.background = `${ACCENT}18`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = `${ACCENT}35`
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}
