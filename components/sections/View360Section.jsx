'use client'

import { useRef, useState, useEffect } from 'react'

const VIEW_360_VIDEOS = [
  {
    src: '/cars/video.mp4',
    label: 'Exterior Beauty',
    desc: 'Experience the sculpted perfection of every angle',
    color: '#FEA700',
  },
  {
    src: '/cars/360.mp4',
    label: 'Performance Essence',
    desc: 'Witness the engineering excellence from all sides',
    color: '#C10001',
  },
]

export default function View360Section() {
  const [activeView, setActiveView] = useState(0)
  const videoRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 bg-black overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'linear-gradient(90deg, white 1px, transparent 1px), linear-gradient(white 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full border border-white/5 pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="font-orbitron text-[10px] tracking-[5px] uppercase mb-4 inline-block"
            style={{ color: VIEW_360_VIDEOS[activeView].color }}
          >
            360° Immersive View
          </div>
          <h2 className="font-orbitron font-black text-5xl mb-4">
            EXPERIENCE
            <br />
            <span style={{ color: VIEW_360_VIDEOS[activeView].color }}>
              THE COMPLETE PERSPECTIVE
            </span>
          </h2>
          <p className="text-white/60 font-rajdhani max-w-2xl mx-auto text-lg">
            Rotate and explore every curve, every detail, every engineering marvel from every possible angle.
          </p>
        </div>

        {/* Main 360 viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Left - Controls */}
          <div className="flex flex-col justify-between gap-6">
            {/* View selector buttons */}
            <div className="space-y-3">
              {VIEW_360_VIDEOS.map((view, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveView(idx)}
                  className={`w-full p-4 rounded-lg transition-all duration-500 text-left group cursor-pointer border-2 ${
                    activeView === idx
                      ? 'border-white/40'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                  style={{
                    background: activeView === idx ? `${VIEW_360_VIDEOS[idx].color}15` : 'rgba(255,255,255,0.02)',
                  }}
                >
                  <div
                    className="font-orbitron font-bold text-sm tracking-wider mb-2 transition-all duration-300"
                    style={{ color: VIEW_360_VIDEOS[idx].color }}
                  >
                    {view.label}
                  </div>
                  <div className="text-white/50 font-rajdhani text-xs leading-relaxed">
                    {view.desc}
                  </div>
                  <div className="mt-3 h-1 bg-white/10 rounded overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        activeView === idx ? 'w-full' : 'w-0'
                      }`}
                      style={{ background: VIEW_360_VIDEOS[idx].color }}
                    />
                  </div>
                </button>
              ))}
            </div>

            {/* Info card */}
            <div className="border border-white/10 rounded-lg p-6 bg-white/[0.02]">
              <div className="font-orbitron text-[10px] tracking-[3px] uppercase text-white/40 mb-2">
                Pro Tip
              </div>
              <p className="text-white/70 font-rajdhani text-sm leading-relaxed">
                Drag your mouse or use your device to rotate the 360° view. Explore every millimeter of automotive perfection.
              </p>
            </div>
          </div>

          {/* Center/Right - Main video display */}
          <div className="lg:col-span-2">
            <div className="relative rounded-xl overflow-hidden border-2" style={{ borderColor: `${VIEW_360_VIDEOS[activeView].color}40` }}>
              {/* Video container */}
              <div className="relative aspect-video bg-gradient-to-br from-black via-black/80 to-black">
                <video
                  ref={videoRef}
                  key={`video-${activeView}`}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={VIEW_360_VIDEOS[activeView].src} type="video/mp4" />
                </video>

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-20 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none" />

                {/* 360° badge */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/30 bg-black/40 backdrop-blur">
                    <div className="text-white font-orbitron text-xs font-bold">360°</div>
                    <div className="w-2 h-2 rounded-full" style={{ background: VIEW_360_VIDEOS[activeView].color }} />
                  </div>
                </div>

                {/* Active view label */}
                <div className="absolute bottom-4 left-4 z-20">
                  <div className="font-orbitron text-xs tracking-wider uppercase text-white/80 mb-1">
                    Current View
                  </div>
                  <div
                    className="font-orbitron font-bold text-xl transition-all duration-500"
                    style={{ color: VIEW_360_VIDEOS[activeView].color }}
                  >
                    {VIEW_360_VIDEOS[activeView].label}
                  </div>
                </div>
              </div>

              {/* Bottom info bar */}
              <div
                className="p-4 border-t"
                style={{ borderColor: `${VIEW_360_VIDEOS[activeView].color}20`, background: `${VIEW_360_VIDEOS[activeView].color}08` }}
              >
                <p className="font-rajdhani text-white/70 text-sm">
                  {VIEW_360_VIDEOS[activeView].desc}
                </p>
              </div>
            </div>

            {/* Indicator dots */}
            <div className="flex gap-2 justify-center mt-6">
              {VIEW_360_VIDEOS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveView(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    activeView === idx
                      ? 'w-8 h-2'
                      : 'w-2 h-2 hover:w-4'
                  }`}
                  style={{
                    background:
                      activeView === idx
                        ? VIEW_360_VIDEOS[idx].color
                        : `${VIEW_360_VIDEOS[idx].color}40`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>


      </div>
    </section>
  )
}
