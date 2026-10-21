// src/components/layout/PreLoader.jsx
'use client';

import { useState, useEffect, useRef } from 'react';

export default function PreLoader() {
  const [loading, setLoading] = useState(true);
  const [fadeAnim, setFadeAnim] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 1.8;
      video.play().catch((err) => {
        console.log("Autoplay prevented or failed:", err);
      });
    }

    // Har fresh load ya refresh par loader chalega aur max 3 seconds me ya video khatam hone par band hoga
    const maxTimer = setTimeout(() => {
      triggerFadeOut();
    }, 3000); // 3 seconds max time

    function triggerFadeOut() {
      setFadeAnim(true);
      setTimeout(() => {
        setLoading(false);
      }, 400); // Smooth fade out duration
    }

    return () => clearTimeout(maxTimer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center ${fadeAnim ? 'opacity-0' : 'opacity-100'}`}
      style={{
        zIndex: 9999999,
        transition: 'opacity 0.4s ease-in-out',
        pointerEvents: fadeAnim ? 'none' : 'auto',
        background: '#050510',
        overflow: 'hidden',
      }}
    >
      {/* Background Layers */}
      <div className="preloader-bg-3d">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="ring ring-1" />
      </div>

      {/* Content */}
      <div className="position-relative text-center px-3 d-flex flex-column align-items-center justify-content-center" style={{ zIndex: 2 }}>
        <video
          ref={videoRef}
          src="/intro.mp4"
          autoPlay
          muted
          playsInline
          onEnded={() => {
            setFadeAnim(true);
            setTimeout(() => setLoading(false), 400);
          }}
          style={{
            width: '280px',
            maxWidth: '85vw',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: '16px',
            filter: 'drop-shadow(0 0 30px rgba(0, 200, 255, 0.3))',
          }}
        />

        {/* Loading text */}
        <div
          className="mt-4 fw-bold small tracking-widest d-flex align-items-center gap-1"
          style={{ fontSize: '0.8rem', letterSpacing: '3px', color: '#a5c8ff' }}
        >
          <span>LOADING LUXURY EXPERIENCE</span>
        </div>
      </div>

      <style jsx>{`
        .preloader-bg-3d {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(50px);
          opacity: 0.4;
        }
        .orb-1 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #00c8ff 0%, transparent 70%);
          top: -10%; left: -5%;
        }
        .orb-2 {
          width: 350px; height: 350px;
          background: radial-gradient(circle, #7a00ff 0%, transparent 70%);
          bottom: -15%; right: -10%;
        }

        .ring {
          position: absolute;
          top: 50%; left: 50%;
          width: 500px; height: 500px;
          margin: -250px 0 0 -250px;
          border-radius: 50%;
          border: 1px solid rgba(0, 200, 255, 0.15);
          animation: ringSpin 15s linear infinite;
        }

        @keyframes ringSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(365deg); }
        }
      `}</style>
    </div>
  );
}