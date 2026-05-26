'use client'

import { useState, useEffect } from 'react'

const LINKS = ['Models', 'Performance', 'Technology', 'Heritage', 'Contact']

export default function Navbar({ activeSection, theme }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  
  const scrollTo = (i) => {
    const total = document.documentElement.scrollHeight - window.innerHeight
    window.scrollTo({ top: ((i + 1) / 6) * total, behavior: 'smooth' })
  }
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-10 py-4 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(0,0,0,0.88)'
          : 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%)',
        borderBottom: scrolled ? `1px solid ${theme.accent}22` : 'none',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
      }}
    >
      {/* Logo */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="font-orbitron font-black text-xl tracking-[4px] transition-all duration-500 flex items-center gap-3"
        style={{
          background: `linear-gradient(90deg, ${theme.accent}, #fff)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        <img src="/logo.png" alt="Lamborghini" className="w-8 h-8 object-contain" />
        LAMBORGHINI
      </button>

      {/* Nav links */}
      <ul className="hidden md:flex items-center gap-9">
        {LINKS.map((link, i) => (
          <li key={link}>
            <button
              onClick={() => scrollTo(i)}
              className="font-rajdhani text-[11px] tracking-[3px] uppercase transition-all duration-400"
              style={{
                color: activeSection === i + 1 ? theme.accent : 'rgba(255,255,255,0.5)',
                textShadow: activeSection === i + 1 ? `0 0 20px ${theme.accent}88` : 'none',
              }}
            >
              {link}
            </button>
          </li>
        ))}
      </ul>

      {/* Right Action Buttons */}
      <div className="hidden md:flex items-center gap-4">
        <button
          className="font-orbitron text-[10px] tracking-[2px] uppercase px-5 py-2.5 rounded-sm transition-all duration-500"
          style={{
            border: `1px solid ${theme.accent}`,
            color: theme.accent,
            background: `${theme.accent}15`,
            boxShadow: `0 0 20px ${theme.accent}22`,
          }}
        >
          Configure Yours
        </button>
      </div>
    </nav>
  )
}
