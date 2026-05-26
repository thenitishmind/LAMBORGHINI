'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import VideoHero from '@/components/VideoHero'
import View360 from '@/components/View360'
import HeroSection from '@/components/sections/HeroSection'
import View360Section from '@/components/sections/View360Section'
import PerformanceSection from '@/components/sections/PerformanceSection'
import ConfigureYoursSection from '@/components/sections/ConfigureYoursSection'
import ModelsSection from '@/components/sections/ModelsSection'
import TechSection from '@/components/sections/TechSection'
import HeritageSection from '@/components/sections/HeritageSection'
import FooterSection from '@/components/sections/FooterSection'
import VideoShowcase from '@/components/VideoShowcase'

const SECTION_THEMES = [
  { accent: '#FEA700', label: '01 / BORN TO DRIFT',      bg: 'bg-hero'      },
  { accent: '#C10001', label: '02 / PERFORMANCE DNA',    bg: 'bg-perf'      },
  { accent: '#DD3D0D', label: '03 / CONFIGURE YOURS',    bg: 'bg-configure' },
  { accent: '#DD3D0D', label: '04 / THE LINEUP',         bg: 'bg-models'    },
  { accent: '#FEA700', label: '05 / INNOVATION',         bg: 'bg-tech'      },
  { accent: '#C10001', label: '06 / RACING HERITAGE',    bg: 'bg-heritage'  },
  { accent: '#DD3D0D', label: '07 / CONTACT',            bg: 'bg-footer'    },
]

export default function Home() {
  const [activeSection, setActiveSection] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const prog = Math.min(window.scrollY / total, 1)
      setScrollProgress(prog)
      const idx = Math.min(Math.floor(prog * 7), 6)
      setActiveSection(idx)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const theme = SECTION_THEMES[activeSection]

  return (
    <main className="relative bg-black min-h-screen overflow-x-hidden">
      {/* ── 360 View Background ── */}
      <View360 scrollProgress={scrollProgress} />
      
      {/* ── Fixed video background in hero ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <VideoHero />
      </div>

      {/* ── Fixed overlay tint changes with section ── */}
      <div
        className={`fixed inset-0 z-[1] pointer-events-none transition-all duration-1000 ${theme.bg}`}
      />

      {/* ── Fixed HUD: section indicator + progress ── */}
      <div className="fixed top-1/2 right-6 -translate-y-1/2 z-50 flex flex-col items-center gap-3 transition-all duration-500">
        {SECTION_THEMES.map((s, i) => (
          <button
            key={i}
            onClick={() => {
              const total = document.documentElement.scrollHeight - window.innerHeight
              window.scrollTo({ top: (i / 6) * total, behavior: 'smooth' })
            }}
            className="w-2 h-2 rounded-full transition-all duration-500 cursor-pointer"
            style={{
              background: i === activeSection ? s.accent : 'rgba(255,255,255,0.2)',
              transform: i === activeSection ? 'scale(1.8)' : 'scale(1)',
              boxShadow: i === activeSection ? `0 0 8px ${s.accent}` : 'none',
            }}
          />
        ))}
      </div>

      {/* ── Fixed bottom-left: section label ── */}
      <div className="fixed bottom-8 left-8 z-50 pointer-events-none transition-all duration-500">
        <p
          className="font-orbitron text-[10px] tracking-[4px] transition-all duration-700"
          style={{ color: theme.accent }}
        >
          {theme.label}
        </p>
        <div className="mt-2 h-px w-24 overflow-hidden bg-white/10">
          <div
            className="h-full transition-all duration-300"
            style={{ width: `${scrollProgress * 100}%`, background: theme.accent }}
          />
        </div>
      </div>

      {/* ── Scrollable sections container ── */}
      <div className="relative z-10">
        <HeroSection accent={theme.accent} active={activeSection === 0} />
        <View360Section />
        <VideoShowcase />
        <PerformanceSection active={activeSection === 1} />
        <ConfigureYoursSection active={activeSection === 2} />
        <ModelsSection active={activeSection === 3} />
        <TechSection active={activeSection === 4} />
        <HeritageSection active={activeSection === 5} />
        <FooterSection active={activeSection === 6} />
      </div>

      <Navbar activeSection={activeSection} theme={theme} />
    </main>
  )
}
