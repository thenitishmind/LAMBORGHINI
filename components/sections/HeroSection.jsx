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

              {/* BORN — word 1, white, delay 0.2s */}
              <div
                className="font-orbitron font-black leading-none block whitespace-nowrap"
                style={{
                  fontSize: 'clamp(52px, 13vw, 130px)',
                  color: '#FFFFFF',
                  animation: 'wordBlast 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s both',
                  textShadow: '0 0 60px rgba(255,255,255,0.6), 0 0 120px rgba(255,255,255,0.3), 0 20px 40px rgba(0,0,0,0.9)',
                  letterSpacing: 'clamp(4px, 1vw, 14px)',
                  fontWeight: '900',
                  fontStyle: 'italic',
                  lineHeight: 1,
                }}
              >
                BORN
              </div>

              {/* TO — word 2, red, delay 1.1s */}
              <div
                className="font-orbitron font-black leading-none block whitespace-nowrap"
                style={{
                  fontSize: 'clamp(36px, 8vw, 80px)',
                  color: '#CC0000',
                  animation: 'wordBlast 0.9s cubic-bezier(0.22,1,0.36,1) 1.1s both',
                  textShadow: '0 0 60px rgba(204,0,0,0.9), 0 0 120px rgba(204,0,0,0.6), 0 20px 40px rgba(0,0,0,0.9)',
                  letterSpacing: 'clamp(8px, 2vw, 24px)',
                  fontWeight: '900',
                  fontStyle: 'italic',
                  lineHeight: 1,
                  margin: '4px 0',
                }}
              >
                TO
              </div>

              {/* DRIFT — word 3, blue, delay 2.0s */}
              <div
                className="font-orbitron font-black leading-none block whitespace-nowrap"
                style={{
                  fontSize: 'clamp(52px, 13vw, 130px)',
                  color: '#1E6FFF',
                  animation: 'wordBlast 0.9s cubic-bezier(0.22,1,0.36,1) 2.0s both',
                  textShadow: '0 0 60px rgba(30,111,255,0.9), 0 0 120px rgba(30,111,255,0.5), 0 20px 40px rgba(0,0,0,0.9)',
                  letterSpacing: 'clamp(4px, 1vw, 14px)',
                  fontWeight: '900',
                  fontStyle: 'italic',
                  lineHeight: 1,
                }}
              >
                DRIFT
              </div>

              {/* Accent line — appears after DRIFT */}
              <div
                style={{
                  height: '3px',
                  background: 'linear-gradient(90deg, transparent, #CC0000, #1E6FFF, transparent)',
                  animation: 'lineGrow 0.8s ease-out 2.9s both',
                  margin: '16px auto',
                  maxWidth: '400px',
                }}
              />

              {/* Tagline — appears last */}
              <p
                className="font-rajdhani font-semibold text-white/80 max-w-sm mx-auto px-4 uppercase"
                style={{
                  fontSize: 'clamp(11px, 1.5vw, 15px)',
                  animation: 'driftTagline 1s ease-out 3.3s both',
                  letterSpacing: '6px',
                }}
              >
                Experience the future of automotive excellence
              </p>
            </div>

            {/* Bottom CTA and controls — reveal after all words appear */}
            <div
              className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex flex-col items-center gap-6 sm:gap-8 pointer-events-auto w-full px-4"
              style={{ animation: 'revealUp 0.8s ease-out 3.6s both' }}
            >
              {/* View selector buttons */}
              <div className="flex gap-2 sm:gap-4 flex-wrap justify-center">
                {ROTATION_VIDEOS.map((video, idx) => {
                  const btnColors = ['rgba(255,255,255,0.15)', 'rgba(204,0,0,0.25)', 'rgba(30,111,255,0.25)']
                  const btnBorders = ['rgba(255,255,255,0.5)', '#CC0000', '#1E6FFF']
                  const btnText = ['#FFFFFF', '#FF3333', '#4D9FFF']
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentVideo(idx)
                        if (idx === 2) {
                          if (audioRef.current) {
                            audioRef.current.currentTime = 0
                            audioRef.current.play()
                            setIsPlaying(true)
                          }
                        } else {
                          if (audioRef.current && isPlaying) {
                            audioRef.current.pause()
                            audioRef.current.currentTime = 0
                            setIsPlaying(false)
                          }
                        }
                      }}
                      className={`px-3 sm:px-6 py-2 sm:py-3 rounded-md font-orbitron text-[10px] sm:text-xs font-bold transition-all duration-300 border-2 backdrop-blur ${
                        currentVideo === idx ? 'scale-105 shadow-lg' : 'opacity-60 hover:opacity-100'
                      }`}
                      style={{
                        borderColor: btnBorders[idx],
                        background: currentVideo === idx ? btnColors[idx] : 'rgba(0,0,0,0.3)',
                        color: btnText[idx],
                        boxShadow: currentVideo === idx ? `0 0 20px ${btnBorders[idx]}55` : 'none',
                      }}
                    >
                      {idx === 2 ? `♪ ${video.label}` : video.label}
                    </button>
                  )
                })}
              </div>

              {/* Main CTA Button */}
              <button
                className="px-6 sm:px-10 py-2.5 sm:py-3 rounded-md font-orbitron text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] uppercase font-bold transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(135deg, #CC0000, #1E6FFF)',
                  color: '#FFFFFF',
                  boxShadow: '0 0 30px rgba(204,0,0,0.5), 0 0 60px rgba(30,111,255,0.3), 0 10px 30px rgba(0,0,0,0.6)',
                  border: '1px solid rgba(255,255,255,0.2)',
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
