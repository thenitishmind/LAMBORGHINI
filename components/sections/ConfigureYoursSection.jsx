'use client'

import { useEffect, useRef, useState } from 'react'

const COLORS = [
  { id: 'all', name: 'All', hex: '#FEA700' },
  { id: '020201', name: 'Charcoal Black', hex: '#020201' },
  { id: '5d0101', name: 'Deep Red', hex: '#5d0101' },
  { id: '72400c', name: 'Burnt Orange', hex: '#72400c' },
  { id: '000721', name: 'Midnight Blue', hex: '#000721' },
  { id: '9513dd', name: 'Royal Purple', hex: '#9513dd' },
  { id: '030201', name: 'Obsidian Black', hex: '#030201' },
  { id: 'a8464e', name: 'Crimson Red', hex: '#a8464e' },
]

const CONFIGURE_IMAGES = [
  { id: 1, name: 'image 01.png', label: 'Charcoal Black', colorCode: '020201', color: '020201' },
  { id: 2, name: 'image 02.png', label: 'Deep Red', colorCode: '5d0101', color: '5d0101' },
  { id: 3, name: 'image 03.png', label: 'Burnt Orange', colorCode: '72400c', color: '72400c' },
  { id: 4, name: 'image 04.png', label: 'Midnight Blue', colorCode: '000721', color: '000721' },
  { id: 5, name: 'image 05.png', label: 'Royal Purple', colorCode: '9513dd', color: '9513dd' },
  { id: 6, name: 'image 06.png', label: 'Obsidian Black', colorCode: '030201', color: '030201' },
  { id: 7, name: 'image 06.png', label: 'Crimson Red', colorCode: 'a8464e', color: 'a8464e' },
]

export default function ConfigureYoursSection({ active }) {
  const ref = useRef(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedColor, setSelectedColor] = useState('all')
  const [currentIndex, setCurrentIndex] = useState(0)

  const filteredImages = CONFIGURE_IMAGES.filter(img => selectedColor === 'all' || img.color === selectedColor)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([e]) => e.target.classList.toggle('visible', e.isIntersecting),
      { threshold: 0.2 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  // Reset index when color changes
  useEffect(() => {
    setCurrentIndex(0)
  }, [selectedColor])

  const handlePrev = () => {
    setCurrentIndex(prev => prev === 0 ? filteredImages.length - 1 : prev - 1)
  }

  const handleNext = () => {
    setCurrentIndex(prev => prev === filteredImages.length - 1 ? 0 : prev + 1)
  }

  const handleDotClick = (index) => {
    setCurrentIndex(index)
  }

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center py-20 px-6"
      style={{ background: 'rgba(0,0,0,0.2)' }}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="font-orbitron text-4xl md:text-6xl font-black tracking-wider mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#C10001] to-[#FEA700]">
          CONFIGURE YOURS
        </h2>
        <p className="font-rajdhani text-gray-400 text-lg tracking-widest">
          SELECT YOUR ULTIMATE LAMBORGHINI
        </p>
      </div>

      {/* Color Selection Swatches */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
        {COLORS.map((color) => (
          <button
            key={color.id}
            onClick={() => setSelectedColor(color.id)}
            className="relative group transition-all duration-300"
            title={color.name}
          >
            <div
              className="w-12 h-12 rounded-full border-2 transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-110"
              style={{
                background: color.hex,
                borderColor: selectedColor === color.id ? '#FEA700' : 'rgba(255,255,255,0.2)',
                boxShadow: selectedColor === color.id ? `0 0 20px ${color.hex}, 0 0 40px ${color.hex}88` : 'none',
                transform: selectedColor === color.id ? 'scale(1.15)' : 'scale(1)',
              }}
            >
              {selectedColor === color.id && (
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              )}
            </div>
            <label className="font-rajdhani text-xs text-gray-400 block mt-2 text-center">
              {color.name}
            </label>
          </button>
        ))}
      </div>

      {/* 3D Slider Section */}
      <div className="w-full max-w-6xl mx-auto mb-12">
        {filteredImages.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-rajdhani text-gray-500 text-lg">No vehicles in this color</p>
          </div>
        ) : (
          <div className="relative">
            {/* Slider Container */}
            <div className="relative h-96 overflow-hidden rounded-xl bg-black">
              <div
                className="flex transition-all duration-700 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {filteredImages.map((image, idx) => {
                  const isActive = idx === currentIndex

                  return (
                    <div
                      key={image.id}
                      className="w-full flex-shrink-0 flex items-center justify-center px-4"
                    >
                      <div
                        className="relative w-full h-96 rounded-xl overflow-hidden shadow-2xl cursor-pointer group transition-all duration-300"
                        onClick={() => setSelectedImage(image)}
                        style={{
                          boxShadow: isActive ? '0 0 40px rgba(254,167,0,0.3)' : '0 0 10px rgba(0,0,0,0.5)',
                        }}
                      >
                        {/* Image */}
                        <img
                          src={`/configure/${image.name}`}
                          alt={image.label}
                          className="w-full h-full object-cover"
                        />

                        {/* Color Swatch Overlay */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                          style={{
                            background: `#${image.colorCode}`,
                          }}
                        />

                        {/* Info Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-end justify-end p-6">
                          <p className="font-orbitron text-[#FEA700] text-sm tracking-widest">
                            Click to View
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Navigation Arrows */}
              {filteredImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{
                      background: '#C10001',
                      color: '#FEA700',
                      boxShadow: '0 0 20px #C1000166',
                    }}
                  >
                    <span className="text-2xl">←</span>
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{
                      background: '#C10001',
                      color: '#FEA700',
                      boxShadow: '0 0 20px #C1000166',
                    }}
                  >
                    <span className="text-2xl">→</span>
                  </button>
                </>
              )}
            </div>

            {/* Color Info Card */}
            {filteredImages.length > 0 && (
              <div
                className="mt-8 p-6 rounded-xl border-2 transition-all duration-300"
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  borderColor: `#${filteredImages[currentIndex].colorCode}`,
                }}
              >
                <div className="flex items-center gap-6">
                  {/* Color Swatch */}
                  <div
                    className="w-20 h-20 rounded-lg shadow-lg border-2"
                    style={{
                      background: `#${filteredImages[currentIndex].colorCode}`,
                      borderColor: '#FEA700',
                    }}
                  />
                  
                  {/* Color Details */}
                  <div className="flex-1">
                    <h3 className="font-orbitron text-2xl text-[#FEA700] tracking-wider">
                      {filteredImages[currentIndex].label}
                    </h3>
                    <p className="font-rajdhani text-gray-400 text-sm mt-1">
                      Exclusive Lamborghini Color Variant
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Dot Indicators */}
            {filteredImages.length > 1 && (
              <div className="flex items-center justify-center gap-3 mt-8">
                {filteredImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDotClick(idx)}
                    className="transition-all duration-300"
                    style={{
                      width: idx === currentIndex ? '32px' : '12px',
                      height: '12px',
                      borderRadius: '6px',
                      background: idx === currentIndex ? '#FEA700' : 'rgba(255,255,255,0.2)',
                      border: idx === currentIndex ? '2px solid #C10001' : 'none',
                      boxShadow: idx === currentIndex ? '0 0 15px #FEA70088' : 'none',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>
            )}

            {/* Slider Counter */}
            <div className="text-center mt-6">
              <p className="font-rajdhani text-gray-400 text-sm tracking-widest">
                {currentIndex + 1} / {filteredImages.length}
              </p>
            </div>
          </div>
        )}
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
              <h3 className="font-orbitron text-3xl text-[#FEA700] tracking-wider mb-3">
                {selectedImage.label}
              </h3>
              
              {/* Color Display */}
              <div className="flex flex-col gap-6 mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-lg border-2 border-[#FEA700] shadow-lg"
                    style={{
                      background: `#${selectedImage.colorCode}`,
                      boxShadow: `0 0 20px #${selectedImage.colorCode}88`,
                    }}
                  />
                </div>
                
                <p className="font-rajdhani text-gray-400 text-sm leading-relaxed">
                  Experience the ultimate Lamborghini in this exclusive {selectedImage.label} finish. A perfect combination of performance and elegance.
                </p>
              </div>

              <button
                onClick={() => setSelectedImage(null)}
                className="font-orbitron text-sm tracking-widest px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
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
