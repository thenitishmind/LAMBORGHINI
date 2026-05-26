'use client'

import { useEffect, useRef, useState } from 'react'

const CONFIGURE_IMAGES = [
  { id: 1, name: 'image 01.png', label: 'Red Passion' },
  { id: 2, name: 'image 02.png', label: 'Power' },
  { id: 3, name: 'image 03.png', label: 'Speed' },
  { id: 4, name: 'image 04.png', label: 'Elegance' },
  { id: 5, name: 'image 05.png', label: 'Design' },
  { id: 6, name: 'image 06.png', label: 'Perfection' },
]

export default function ConfigureYoursSection({ active }) {
  const ref = useRef(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [rotations, setRotations] = useState({})

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([e]) => e.target.classList.toggle('visible', e.isIntersecting),
      { threshold: 0.2 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const handleMouseMove = (e, imageId) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    const rotateX = (y - 50) * 0.5
    const rotateY = (x - 50) * -0.5

    setRotations(prev => ({
      ...prev,
      [imageId]: { rotateX, rotateY }
    }))
  }

  const handleMouseLeave = (imageId) => {
    setRotations(prev => ({
      ...prev,
      [imageId]: { rotateX: 0, rotateY: 0 }
    }))
  }

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center py-20 px-6"
      style={{ background: 'rgba(0,0,0,0.2)' }}
    >
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="font-orbitron text-4xl md:text-6xl font-black tracking-wider mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#C10001] to-[#FEA700]">
          CONFIGURE YOURS
        </h2>
        <p className="font-rajdhani text-gray-400 text-lg tracking-widest">
          SELECT YOUR ULTIMATE LAMBORGHINI
        </p>
      </div>

      {/* 3D Gallery Grid */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {CONFIGURE_IMAGES.map((image) => {
          const rotation = rotations[image.id] || { rotateX: 0, rotateY: 0 }
          
          return (
            <div
              key={image.id}
              onMouseMove={(e) => handleMouseMove(e, image.id)}
              onMouseLeave={() => handleMouseLeave(image.id)}
              onClick={() => setSelectedImage(image)}
              className="h-80 cursor-pointer group"
              style={{
                perspective: '1000px',
              }}
            >
              <div
                className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-[0_0_30px_rgba(193,0,1,0.6)]"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg) scale(${selectedImage?.id === image.id ? 1.05 : 1})`,
                }}
              >
                {/* Image */}
                <img
                  src={`/configure/${image.name}`}
                  alt={image.label}
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                  <div>
                    <p className="font-orbitron text-[#FEA700] text-sm tracking-widest mb-2">
                      {image.label}
                    </p>
                    <p className="font-rajdhani text-white text-xs text-gray-400">
                      Click to view details
                    </p>
                  </div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)',
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Selected Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-black rounded-xl overflow-hidden"
            style={{
              boxShadow: '0 0 50px rgba(193, 0, 1, 0.8)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[#C10001] hover:bg-[#8B0000] transition-colors"
            >
              <span className="text-2xl text-white">×</span>
            </button>

            {/* Image with 3D effect */}
            <div
              className="relative overflow-hidden bg-black"
              style={{
                perspective: '1200px',
              }}
            >
              <img
                src={`/configure/${selectedImage.name}`}
                alt={selectedImage.label}
                className="w-full h-auto"
              />
            </div>

            {/* Info */}
            <div className="p-8 border-t border-[#C10001]/30">
              <h3 className="font-orbitron text-2xl text-[#FEA700] tracking-wider mb-2">
                {selectedImage.label}
              </h3>
              <p className="font-rajdhani text-gray-400 mb-4">
                Experience the ultimate Lamborghini configuration
              </p>
              <button
                onClick={() => setSelectedImage(null)}
                className="font-orbitron text-sm tracking-widest px-6 py-3 rounded-lg"
                style={{
                  border: '1px solid #C10001',
                  color: '#FEA700',
                  background: '#C1000122',
                  boxShadow: '0 0 20px #C1000144',
                }}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="text-center mt-12">
        <p className="font-rajdhani text-gray-500 text-sm tracking-widest mb-4">
          READY TO BUILD YOUR DREAM?
        </p>
        <button
          className="font-orbitron text-xs tracking-widest px-8 py-3 rounded-lg transition-all duration-500 hover:scale-110"
          style={{
            border: '2px solid #FEA700',
            color: '#000',
            background: '#FEA700',
            boxShadow: '0 0 30px #FEA70088',
          }}
        >
          START CONFIGURING
        </button>
      </div>
    </section>
  )
}
