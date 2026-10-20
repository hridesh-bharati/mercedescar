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
      className={`position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center ${fadeAnim ? 'opacity-0' : 'opacity-100'}`}
      style={{
        zIndex: 9999999,
        transition: 'opacity 0.5s ease-in-out',
        pointerEvents: fadeAnim ? 'none' : 'auto',
        background: '#050510',
        overflow: 'hidden',
        perspective: '1200px',
      }}
    >
      {/* 3D Animated Background Layers */}
      <div className="preloader-bg-3d">
        {/* Glowing orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />

        {/* Rotating 3D rings */}
        <div className="ring ring-1" />
        <div className="ring ring-2" />
        <div className="ring ring-3" />

        {/* Grid floor */}
        <div className="grid-floor" />

        {/* Floating particles */}
        <div className="particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 6}s`,
                opacity: 0.3 + Math.random() * 0.5,
              }}
            />
          ))}
        </div>
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
            setTimeout(() => setLoading(false), 500);
          }}
          style={{
            width: '320px',
            maxWidth: '90vw',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: '16px',
            filter: 'drop-shadow(0 0 40px rgba(0, 200, 255, 0.35)) drop-shadow(0 0 80px rgba(120, 0, 255, 0.25))',
          }}
        />

        {/* Loading text with animated dots */}
        <div
          className="mt-4 fw-bold small tracking-widest d-flex align-items-center gap-1"
          style={{ fontSize: '0.85rem', letterSpacing: '3px', color: '#a5c8ff' }}
        >
          <span>LOADING</span>
          <span className="dot-anim-1">.</span>
          <span className="dot-anim-2">.</span>
          <span className="dot-anim-3">.</span>
        </div>
      </div>

      <style jsx>{`
        /* ---------- 3D Background ---------- */
        .preloader-bg-3d {
          position: absolute;
          inset: 0;
          overflow: hidden;
          transform-style: preserve-3d;
        }

        /* Glowing orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.55;
          animation: orbFloat 12s ease-in-out infinite;
        }
        .orb-1 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, #00c8ff 0%, transparent 70%);
          top: -10%; left: -5%;
          animation-delay: 0s;
        }
        .orb-2 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #7a00ff 0%, transparent 70%);
          bottom: -15%; right: -10%;
          animation-delay: -3s;
        }
        .orb-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #ff00c8 0%, transparent 70%);
          top: 40%; right: 10%;
          animation-delay: -6s;
        }
        .orb-4 {
          width: 350px; height: 350px;
          background: radial-gradient(circle, #00ffa3 0%, transparent 70%);
          bottom: 20%; left: 5%;
          animation-delay: -9s;
        }

        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -30px) scale(1.15); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }

        /* Rotating 3D rings */
        .ring {
          position: absolute;
          top: 50%; left: 50%;
          border-radius: 50%;
          border: 1px solid rgba(0, 200, 255, 0.25);
          box-shadow: 0 0 30px rgba(0, 200, 255, 0.15) inset;
          transform-style: preserve-3d;
          animation: ringSpin 20s linear infinite;
        }
        .ring-1 {
          width: 600px; height: 600px;
          margin: -300px 0 0 -300px;
          border-color: rgba(0, 200, 255, 0.3);
          animation-duration: 18s;
        }
        .ring-2 {
          width: 800px; height: 800px;
          margin: -400px 0 0 -400px;
          border-color: rgba(122, 0, 255, 0.25);
          animation-duration: 28s;
          animation-direction: reverse;
        }
        .ring-3 {
          width: 1000px; height: 1000px;
          margin: -500px 0 0 -500px;
          border-color: rgba(255, 0, 200, 0.2);
          animation-duration: 38s;
        }

        @keyframes ringSpin {
          0% { transform: rotateX(70deg) rotateZ(0deg); }
          100% { transform: rotateX(70deg) rotateZ(360deg); }
        }

        /* Grid floor */
        .grid-floor {
          position: absolute;
          bottom: -20%;
          left: -50%;
          width: 200%;
          height: 60%;
          background-image:
            linear-gradient(rgba(0, 200, 255, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 200, 255, 0.15) 1px, transparent 1px);
          background-size: 50px 50px;
          transform: perspective(500px) rotateX(60deg);
          transform-origin: center bottom;
          animation: gridMove 6s linear infinite;
          mask-image: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
        }

        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 0 50px; }
        }

        /* Floating particles */
        .particles {
          position: absolute;
          inset: 0;
        }
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #00c8ff;
          border-radius: 50%;
          box-shadow: 0 0 10px #00c8ff, 0 0 20px #00c8ff;
          animation: particleFloat linear infinite;
        }

        @keyframes particleFloat {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(-120px) scale(0.3); opacity: 0; }
        }

        /* Loading dots */
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