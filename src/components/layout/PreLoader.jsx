// src/components/layout/PreLoader.jsx
'use client';

import { useState, useEffect, useRef } from 'react';

export default function PreLoader() {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fadeAnim, setFadeAnim] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 1.67;
      video.play().catch((err) => {
        console.log("Autoplay prevented or failed:", err);
      });
    }

    const timer = setTimeout(() => {
      setFadeAnim(true);
      const removeTimer = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(removeTimer);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  if (!isMounted || !loading) return null;

  return (
    <div 
      className={`position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-white ${fadeAnim ? 'opacity-0' : 'opacity-100'}`}
      style={{ 
        zIndex: 9999999, 
        transition: 'opacity 0.5s ease-in-out',
        pointerEvents: fadeAnim ? 'none' : 'auto'
      }}
    >
      <div className="text-center px-3 d-flex flex-column align-items-center justify-content-center bg-white">
        <video 
          ref={videoRef}
          src="/intro.mp4" 
          autoPlay 
          muted 
          playsInline
          onEnded={() => {
            setFadeAnim(true);
            setTimeout(() => setLoading(false), 500);
          }}
          style={{ 
            width: '200px',
            maxWidth: '100%', 
            height: 'auto',
            objectFit: 'contain',
            background: '#ffffff'
          }} 
        />
        
        {/* Loading text with animated dots */}
        <div className="mt-3 fw-bold text-dark small tracking-widest d-flex align-items-center gap-1" style={{ fontSize: '0.85rem', letterSpacing: '2px' }}>
          <span>LOADING</span>
          <span className="dot-anim-1">.</span>
          <span className="dot-anim-2">.</span>
          <span className="dot-anim-3">.</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes dotBlink {
          0% { opacity: 0.2; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-3px); }
          100% { opacity: 0.2; transform: translateY(0); }
        }
        .dot-anim-1 { animation: dotBlink 1.4s infinite ease-in-out 0s; }
        .dot-anim-2 { animation: dotBlink 1.4s infinite ease-in-out 0.2s; }
        .dot-anim-3 { animation: dotBlink 1.4s infinite ease-in-out 0.4s; }
      `}</style>
    </div>
  );
}