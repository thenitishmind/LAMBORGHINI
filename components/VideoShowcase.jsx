'use client'

import { useState, useRef } from 'react'

const VIDEOS = [
  {
    src: '/cars/Cars1.mp4',
    title: 'Performance Unleashed',
    subtitle: 'Raw Power, Pure Speed',
    accent: '#39FF14',
  },
  {
    src: '/cars/car2.mp4',
    title: 'Dynamic Precision',
    subtitle: 'Engineering Perfection',
    accent: '#00FF88',
  },
  {
    src: '/cars/black beauty.mp4',
    title: 'Black Beauty',
    subtitle: 'Elegance and Power',
    accent: '#AAFF00',
  },
]

const CAR_GALLERY = [
  {
    image: '/cars/yellow.png',
    title: 'Signature Yellow',
    desc: 'The iconic Lamborghini yellow represents luxury, power, and Italian passion.',
    specs: ['2.8s 0-100', '355 km/h', '800+ HP'],
  },
  {
    image: '/cars/red.png',
    title: 'Racing Red',
    desc: 'Scarlet passion meets cutting-edge performance in this stunning vision.',
    specs: ['2.9s 0-100', '350 km/h', '830 HP'],
  },
  {
    image: '/cars/orange.png',
    title: 'Vivid Orange',
    desc: 'Fiery energy and supreme agility combined in a blazing superlative machine.',
    specs: ['2.7s 0-100', '360 km/h', '850+ HP'],
  },
]

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState(0)
  const videoRef = useRef(null)
  const [activeGallery, setActiveGallery] = useState(0)

  return (
    <>
      {/* Video Section */}
      <section className="relative py-24 min-h-screen flex flex-col justify-center bg-gradient-to-b from-black to-black/80">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: 'linear-gradient(90deg, white 1px, transparent 1px), linear-gradient(white 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="relative z-10 px-16">
          {/* Header */}
          <div className="mb-12">
            <div
              className="font-orbitron text-[10px] tracking-[5px] uppercase mb-4"
              style={{ color: VIDEOS[activeVideo].accent }}
            >
              Video Gallery
            </div>
            <h2 className="font-orbitron font-black text-5xl mb-2">
              CINEMATIC EXCELLENCE
            </h2>
            <p className="text-white/60 font-rajdhani">
              Experience the power through stunning visuals and premium content
            </p>
          </div>

          {/* Main video player */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Primary video */}
            <div className="lg:col-span-2">
              <div className="relative rounded-lg overflow-hidden border-2" style={{ borderColor: `${VIDEOS[activeVideo].accent}40` }}>
                <video
                  ref={videoRef}
                  className="w-full aspect-video object-cover"
                  controls
                  autoPlay
                  muted
                  key={activeVideo}
                >
                  <source src={VIDEOS[activeVideo].src} type="video/mp4" />
                </video>
                
                {/* Overlay info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8">
                  <h3 className="font-orbitron text-2xl font-bold mb-2">
                    {VIDEOS[activeVideo].title}
                  </h3>
                  <p className="text-white/70 font-rajdhani">
                    {VIDEOS[activeVideo].subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Video list */}
            <div className="flex flex-col gap-3">
              {VIDEOS.map((video, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveVideo(idx)}
                  className={`relative rounded-lg overflow-hidden border-2 transition-all duration-300 aspect-video cursor-pointer ${
                    activeVideo === idx
                      ? 'scale-105'
                      : 'hover:border-white/40'
                  }`}
                  style={{
                    borderColor: activeVideo === idx ? VIDEOS[idx].accent : 'rgba(255,255,255,0.2)',
                  }}
                >
                  <video className="w-full h-full object-cover" muted>
                    <source src={video.src} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-2 border-white/80 flex items-center justify-center">
                      <div className="w-0 h-0 border-l-6 border-r-0 border-t-4 border-b-4 border-l-white border-t-transparent border-b-transparent ml-1" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Car Gallery Section */}
      <section className="relative py-24 min-h-screen flex flex-col justify-center bg-black">
        <div className="relative z-10 px-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div
              className="font-orbitron text-[10px] tracking-[5px] uppercase mb-4 inline-block"
              style={{ color: '#39FF14' }}
            >
              Premium Collection
            </div>
            <h2 className="font-orbitron font-black text-5xl mb-4">
              ICONIC DESIGNS
            </h2>
            <p className="text-white/60 font-rajdhani max-w-2xl mx-auto">
              Explore our stunning collection of Lamborghini models, each a masterpiece of engineering and design.
            </p>
          </div>

          {/* Main gallery display */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Image */}
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden border-2 border-white/10">
                <img
                  src={CAR_GALLERY[activeGallery].image}
                  alt={CAR_GALLERY[activeGallery].title}
                  className="w-full h-96 object-contain bg-gradient-to-br from-black/80 to-black p-12"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
              </div>
              {/* Shine effect */}
              <div className="absolute -inset-4 rounded-lg border border-white/5 pointer-events-none" />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="font-orbitron font-black text-4xl mb-3" style={{ color: '#39FF14' }}>
                  {CAR_GALLERY[activeGallery].title}
                </h3>
                <p className="font-rajdhani text-white/70 text-lg leading-relaxed mb-6">
                  {CAR_GALLERY[activeGallery].desc}
                </p>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-4">
                {CAR_GALLERY[activeGallery].specs.map((spec, i) => (
                  <div key={i} className="border border-white/10 rounded p-4 text-center">
                    <div className="font-orbitron font-bold text-lg" style={{ color: '#39FF14' }}>
                      {spec.split(' ')[0]}
                    </div>
                    <div className="text-white/50 text-xs mt-1">{spec.split(' ').slice(1).join(' ')}</div>
                  </div>
                ))}
              </div>

              {/* Gallery selector */}
              <div className="flex gap-3 mt-4 flex-wrap">
                {CAR_GALLERY.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveGallery(idx)}
                    className="flex-1 py-3 rounded transition-all duration-300 font-orbitron text-sm tracking-wider"
                    style={{
                      background: activeGallery === idx ? '#39FF14' : 'rgba(57,255,20,0.1)',
                      color: activeGallery === idx ? '#000' : '#39FF14',
                      border: `1px solid ${activeGallery === idx ? '#39FF14' : 'rgba(57,255,20,0.3)'}`,
                    }}
                  >
                    {CAR_GALLERY[idx].title.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
