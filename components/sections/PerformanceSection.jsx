'use client'

import { useEffect, useRef } from 'react'

const ACCENT = '#C10001'

const SPECS = [
  { label: 'Engine',         val: '6.5L V12 Naturally Aspirated' },
  { label: 'Peak Power',     val: '830 HP @ 8,500 RPM'           },
  { label: 'Max Torque',     val: '720 Nm @ 6,750 RPM'           },
  { label: 'Transmission',   val: '7-Speed ISR Sequential'        },
  { label: 'Drivetrain',     val: 'Full-Time All-Wheel Drive'     },
  { label: 'Curb Weight',    val: '1,550 kg'                      },
  { label: 'Power Density',  val: '535 hp / tonne'               },
  { label: 'Top Speed',      val: '355 km/h'                      },
  { label: 'Braking 100–0',  val: '31.0 m'                       },
  { label: 'Lateral G',      val: '1.5 G'                        },
]

const STATS = [
  { num: '830', unit: 'HP',   label: 'Peak Power'  },
  { num: '2.9', unit: 's',    label: '0–100 km/h'  },
  { num: '355', unit: 'km/h', label: 'Top Speed'   },
  { num: '1.5', unit: 'G',    label: 'Lateral G'   },
]

export default function PerformanceSection({ active }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([e]) => e.target.classList.toggle('visible', e.isIntersecting),
      { threshold: 0.2 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center"
      style={{ background: 'rgba(0,0,0,0.15)' }}
    >
      {/* Speed lines decorative */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="speed-line absolute"
            style={{
              top: `${15 + i * 10}%`,
              width: `${60 + i * 5}%`,
              animationDelay: `${i * 0.08}s`,
              animationDuration: `${0.5 + i * 0.05}s`,
              opacity: active ? 0.6 : 0,
              transition: 'opacity 0.8s',
            }}
          />
        ))}
      </div>

      <div ref={ref} className="section-content w-full flex flex-col lg:flex-row gap-0">

        {/* Left: big stats */}
        <div className="flex-1 pl-16 pr-8 py-24 flex flex-col justify-center">
          <div
            className="font-orbitron text-[10px] tracking-[5px] uppercase mb-4"
            style={{ color: ACCENT }}
          >
            Performance DNA
          </div>

          <h2
            className="font-orbitron font-black leading-[0.9] mb-8"
            style={{ fontSize: 'clamp(38px, 5vw, 72px)' }}
          >
            <span className="gradient-green block">ENGINEERED FOR</span>
            <span className="gradient-green block">EXTREMES</span>
          </h2>

          <p className="font-rajdhani text-white/50 text-lg leading-relaxed max-w-md mb-10">
            Every Lamborghini begins life on a dynamometer. Refined in the wind tunnel.
            Baptised on the Fiorano circuit. The numbers don't lie — they terrify.
          </p>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-3 max-w-sm">
            {STATS.map(({ num, unit, label }) => (
              <div
                key={label}
                className="border rounded-sm p-4 transition-all duration-500"
                style={{
                  borderColor: `${ACCENT}33`,
                  background: `${ACCENT}08`,
                  boxShadow: active ? `0 0 20px ${ACCENT}22` : 'none',
                }}
              >
                <div className="font-orbitron font-black" style={{ fontSize: '28px', color: ACCENT }}>
                  {num}<span className="text-sm ml-1 opacity-70">{unit}</span>
                </div>
                <div className="font-rajdhani text-[10px] tracking-[3px] text-white/40 uppercase mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: spec table + video */}
        <div className="flex-1 border-l py-24 pr-16 pl-10 flex flex-col justify-center relative" style={{ borderColor: `${ACCENT}22` }}>
          {/* Background video */}
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-lg">
            <video
              className="w-full h-full object-cover opacity-20"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/cars/Cars1.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
          </div>

          <div className="font-orbitron text-[10px] tracking-[5px] uppercase mb-6" style={{ color: ACCENT }}>
            Technical Specifications
          </div>
          <table className="w-full">
            <tbody>
              {SPECS.map(({ label, val }) => (
                <tr
                  key={label}
                  className="border-b transition-colors duration-300"
                  style={{ borderColor: `${ACCENT}15` }}
                >
                  <td className="font-rajdhani text-white/40 text-sm tracking-wider py-3.5 pr-4">
                    {label}
                  </td>
                  <td
                    className="font-orbitron text-sm font-bold text-right py-3.5"
                    style={{ color: ACCENT }}
                  >
                    {val}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Divider */}
          <div className="mt-8 flex items-center gap-3">
            <div className="flex-1 h-px shimmer-line" style={{ '--lambo-gold': ACCENT }} />
            <span className="font-orbitron text-[9px] tracking-[3px] text-white/30">
              HURACÁN EVO
            </span>
            <div className="flex-1 h-px shimmer-line" />
          </div>
        </div>
      </div>
    </section>
  )
}
