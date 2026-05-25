'use client'

import { useEffect, useRef, useState } from 'react';

export default function View360({ scrollProgress }) {
  const videoRef = useRef(null);
  const [currentView, setCurrentView] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const views360 = [
    { src: '/cars/360view.mp4', label: 'Exterior', color: '#00D9FF' },
    { src: '/cars/360.mp4', label: 'Performance', color: '#FF006E' },
  ];

  useEffect(() => {
    if (videoRef.current) {
      // Create smooth rotation effect based on scroll
      const rotationIndex = Math.floor(scrollProgress * views360.length) % views360.length;
      setCurrentView(rotationIndex);
    }
  }, [scrollProgress]);

  return (
    <div className="fixed inset-0 z-0 w-full h-full overflow-hidden">
      {/* 360 Video Background */}
      {mounted && (
        <div className="relative w-full h-full">
        {views360.map((view, idx) => (
          <video
            key={idx}
            ref={idx === currentView ? videoRef : null}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              idx === currentView ? 'opacity-100' : 'opacity-0'
            }`}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={view.src} type="video/mp4" />
          </video>
        ))}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-black/20 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black z-10" />

        {/* 360 View Indicator */}
        <div className="absolute bottom-10 left-10 z-20">
          <div className="flex items-center gap-3">
            <div className="text-white font-orbitron text-sm font-bold">360° VIEW</div>
            <div className="flex gap-2">
              {views360.map((view, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentView
                      ? 'w-6 bg-white scale-125'
                      : 'bg-white/40 hover:bg-white/70'
                  }`}
                  onClick={() => setCurrentView(idx)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* View Label */}
        <div className="absolute top-20 right-10 z-20">
          <div
            className="text-white font-orbitron font-bold text-xl transition-all duration-500"
            style={{ color: views360[currentView].color }}
          >
            {views360[currentView].label}
          </div>
          <div className="w-12 h-1 mt-2 transition-all duration-500" style={{ backgroundColor: views360[currentView].color }} />
        </div>
      </div>
      )}
    </div>
  );
}
