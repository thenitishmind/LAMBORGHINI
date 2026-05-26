'use client'

import { useEffect, useRef, useState } from 'react'

const ROTATION_VIDEOS = [
  { src: '/cars/360view.mp4', label: 'Exterior View' },
  { src: '/cars/360.mp4', label: 'Performance View' },
  { src: '/cars/wow.mp4', label: 'Drift' },
]

const ANIMATED_WORDS = ['BORN', 'TO', 'DRIFT']

export default function HeroSection({ accent, active }) {
  const videoRef = useRef(null)
  const audioRef = useRef(null)
  const [currentVideo, setCurrentVideo] = useState(2)
  const [isPlaying, setIsPlaying] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Auto-play music when Drift video loads
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Playback might be blocked by browser autoplay policy
      })
      setIsPlaying(true)
    }
  }, [])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setCurrentVideo(0)
      } else {
        audioRef.current.play()
        setCurrentVideo(2)
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pointer-events-none select-none overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black pointer-events-none" />

      {mounted && (
        <>
          {/* Main 360 Video Container - Full Screen */}
          <div className="absolute inset-0 w-full h-full z-0 rounded-none">
            <div className="relative w-full h-full rounded-none">
              {/* Rotating 360 video */}
              <div className="relative w-full h-full animate-spin-slow rounded-none">
                {/* Glow effect */}
                <div
                  className="absolute inset-0 blur-3xl opacity-30 animate-pulse"
                  style={{ background: `radial-gradient(circle, ${accent}50, transparent)` }}
                />

                {/* Video - Full Screen No Rounding */}
                <div className="relative w-full h-full overflow-hidden border-0 rounded-none">
                  <video
                    ref={videoRef}
                    key={`360-video-${currentVideo}`}
                    className="w-full h-full object-cover rounded-none"
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ borderRadius: '0' }}
                  >
                    <source src={ROTATION_VIDEOS[currentVideo].src} type="video/mp4" />
                  </video>

                  {/* Overlay gradients for depth */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/50 pointer-events-none" />

                  {/* 360 Badge */}
                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 pointer-events-auto">
                    <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-white/40 bg-black/60 backdrop-blur-md">
                      <div className="text-white font-orbitron text-xs sm:text-sm font-bold">360°</div>
                      <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full animate-pulse" style={{ background: accent }} />
                    </div>
                  </div>

                  {/* View label */}
                  <div className="absolute bottom-12 sm:bottom-20 left-4 sm:left-6 z-20">
                    <div className="font-orbitron text-[10px] sm:text-xs text-white/60 mb-1 sm:mb-2 uppercase tracking-widest">ROTATING VIEW</div>
                    <div className="font-orbitron font-bold text-sm sm:text-lg" style={{ color: accent }}>
                      {ROTATION_VIDEOS[currentVideo].label}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Animated Text Overlay - Centered */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none" style={{ perspective: '1200px' }}>
            <div className="text-center px-4 sm:px-6">
              {/* Animated words - 3D Style */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8" style={{ perspective: '1500px' }}>
                {ANIMATED_WORDS.map((word, idx) => (
                  <div
                    key={idx}
                    className="font-orbitron font-black leading-none whitespace-nowrap"
                    style={{
                      fontSize: 'clamp(40px, 10vw, 100px)',
                      color: idx === 1 ? accent : '#fff',
                      animation: `slideInScale 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.2}s backwards`,
                      textShadow: `
                        0 0 50px ${accent}66,
                        0 0 100px ${accent}44,
                        0 20px 30px rgba(0,0,0,0.9),
                        0 40px 60px rgba(0,0,0,0.7),
                        -2px -2px 5px rgba(255,255,255,0.1),
                        2px 2px 15px ${accent}33
                      `,
                      filter: 'drop-shadow(0 0 10px ' + accent + '77)',
                      transform: `perspective(800px) rotateX(${idx === 1 ? -5 : -2}deg) rotateZ(${idx === 0 ? -2 : idx === 2 ? 2 : 0}deg) scaleZ(1.2)`,
                      transformStyle: 'preserve-3d',
                      letterSpacing: 'clamp(2px, 0.5vw, 8px)',
                      fontWeight: '900',
                      fontStyle: 'italic',
                    }}
                  >
                    {word}
                  </div>
                ))}
              </div>

              {/* Subtitle with fade-in animation */}
              <p
                className="font-rajdhani text-xs sm:text-sm text-white/70 max-w-sm mx-auto px-4"
                style={{
                  animation: `fadeInUp 1s ease-out 0.6s backwards`,
                }}
              >
                Experience the future of automotive excellence
              </p>
            </div>

            {/* Bottom CTA and controls */}
            <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex flex-col items-center gap-6 sm:gap-8 pointer-events-auto w-full px-4">
              {/* View selector buttons */}
              <div className="flex gap-2 sm:gap-4 flex-wrap justify-center">
                {ROTATION_VIDEOS.map((video, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentVideo(idx)
                      if (idx === 2) {
                        // Drift button - restart music from beginning
                        if (audioRef.current) {
                          audioRef.current.currentTime = 0
                          audioRef.current.play()
                          setIsPlaying(true)
                        }
                      } else {
                        // Other buttons - stop music
                        if (audioRef.current && isPlaying) {
                          audioRef.current.pause()
                          audioRef.current.currentTime = 0
                          setIsPlaying(false)
                        }
                      }
                    }}
                    className={`px-3 sm:px-6 py-2 sm:py-3 rounded-md font-orbitron text-[10px] sm:text-xs font-bold transition-all duration-300 border-2 backdrop-blur ${
                      currentVideo === idx
                        ? 'scale-105 shadow-lg'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                    style={{
                      borderColor: accent,
                      background: currentVideo === idx ? `${accent}25` : `${accent}08`,
                      color: accent,
                    }}
                  >
                    {idx === 2 ? `🎵 ${video.label}` : video.label}
                  </button>
                ))}
              </div>

              {/* Main CTA Button */}
              <button
                className="px-6 sm:px-10 py-2.5 sm:py-3 rounded-md font-orbitron text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] uppercase font-bold transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${accent}, #fff2)`,
                  color: '#000',
                  boxShadow: `0 0 30px ${accent}55, 0 10px 30px rgba(0,0,0,0.5)`,
                }}
              >
                EXPLORE NOW →
              </button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20">
            <div className="flex flex-col items-center gap-1 sm:gap-2">
              <span className="font-orbitron text-[9px] sm:text-[10px] text-white/40 uppercase tracking-[1px] sm:tracking-[2px]">Scroll</span>
              <div className="w-0.5 h-4 sm:h-6 bg-gradient-to-b from-white/40 to-transparent animate-bounce" />
            </div>
          </div>
        </>
      )}

      {/* Audio element for drift music */}
      <audio
        ref={audioRef}
        src="/cars/Music.mp3"
        loop
      />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
    </section>
  )
}
