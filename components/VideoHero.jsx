'use client'

import { useEffect, useRef } from 'react'

export default function VideoHero() {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.playbackRate = 0.8
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/cars/car2.mp4" type="video/mp4" />
        <source src="/cars/Cars1.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/30" />
      
      {/* Additional dark overlay */}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  )
}
