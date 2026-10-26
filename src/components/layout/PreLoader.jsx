// src/components/layout/PreLoader.jsx
'use client';
import { useState, useEffect } from 'react';

export default function PreLoader() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fadeAnim, setFadeAnim] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 2.5 seconds premium animation display
    const timer = setTimeout(() => {
      setFadeAnim(true);
      setTimeout(() => setLoading(false), 700);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !loading) return null;

  return (
    <div
      className={`position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center px-3 ${fadeAnim ? 'opacity-0 scale-out' : 'opacity-100'}`}
      style={{
        zIndex: 9999999,
        transition: 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: fadeAnim ? 'none' : 'auto',
        background: 'radial-gradient(circle at center, #0a0000 0%, #000000 70%, #000000 100%)',
        overflow: 'hidden',
        perspective: '1000px'
      }}
    >
      {/* 3D Rotating Glowing Rings */}
      <div className="preloader-3d-scene">
        <div className="ring ring-outer"></div>
        <div className="ring ring-inner"></div>
        <div className="center-glow"></div>
      </div>

      {/* Main Content */}
      <div className="position-relative text-center w-100 max-w-content d-flex flex-column align-items-center justify-content-center px-2" style={{ zIndex: 2 }}>
        
        {/* Cinematic Brand Reveal */}
        <div className="brand-reveal w-100">
          <h1 className="preloader-brand mb-1">
            <span className="text-white">GERMAN </span>
            <span className="text-danger">AUTO </span>
            <span className="text-white">EXPERT</span>
          </h1>
          <div className="brand-line"></div>
        </div>

        {/* Subtitle */}
        <div className="preloader-subtitle mt-2">
          <span className="text-white-50 small subtitle-text">
            AUTO SERVICE CENTER
          </span>
        </div>

        {/* Premium Loading Progress Line */}
        <div className="loading-bar-container mt-4">
          <div className="loading-bar-fill"></div>
        </div>
        
        {/* Loading Text */}
        <div className="mt-3 fw-bold loading-text">
          INITIALIZING...
        </div>
      </div>

      <style jsx>{`
        .max-w-content {
          max-width: 320px; /* 모바일 원 크기에 맞게 내용 최대 너비 제한 */
        }

        .scale-out {
          transform: scale(1.05);
        }

        .preloader-3d-scene {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 100%; height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 1;
        }

        .ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid transparent;
          will-change: transform;
        }

        .ring-outer {
          width: clamp(280px, 85vw, 380px);
          height: clamp(280px, 85vw, 380px);
          border-top: 2px solid #e11d48;
          border-left: 1px solid rgba(225, 29, 72, 0.2);
          animation: spin3D 4.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          box-shadow: 0 0 35px rgba(225, 29, 72, 0.15);
        }

        .ring-inner {
          width: clamp(220px, 70vw, 300px);
          height: clamp(220px, 70vw, 300px);
          border-bottom: 2px solid #ff4d4d;
          border-right: 1px solid rgba(255, 77, 77, 0.2);
          animation: spin3DReverse 3.5s linear infinite;
        }

        .center-glow {
          position: absolute;
          width: clamp(140px, 45vw, 180px);
          height: clamp(140px, 45vw, 180px);
          background: rgba(225, 29, 72, 0.25);
          border-radius: 50%;
          filter: blur(40px);
          animation: pulseGlow 2.5s ease-in-out infinite alternate;
          will-change: transform, opacity;
        }

        .brand-reveal {
          animation: revealBrand 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          transform: translateY(20px) scale(0.95);
          will-change: transform, opacity;
        }

        .preloader-brand {
          font-size: clamp(1.15rem, 4.8vw, 2.5rem); /* 모바일에서 글자가 넘치지 않도록 크기 축소 */
          font-weight: 900;
          letter-spacing: clamp(1px, 0.3vw, 2px);
          margin: 0;
          text-transform: uppercase;
          text-shadow: 0 4px 25px rgba(0,0,0,0.9);
          white-space: nowrap; /* 줄바꿈 방지 */
        }

        .brand-line {
          width: 0%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #e11d48, transparent);
          margin: 8px auto 0;
          animation: expandLine 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
        }

        .preloader-subtitle {
          animation: slideUpFade 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards;
          opacity: 0;
        }

        .subtitle-text {
          font-size: 0.6rem;
          letter-spacing: clamp(3px, 1vw, 6px);
          font-weight: 300;
          display: inline-block;
          padding-left: 4px;
        }

        .loading-bar-container {
          width: clamp(120px, 40vw, 160px);
          height: 2px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          overflow: hidden;
          animation: slideUpFade 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards;
          opacity: 0;
        }

        .loading-bar-fill {
          width: 0%;
          height: 100%;
          background: linear-gradient(90deg, #ff4d4d, #e11d48);
          animation: fillBar 1.6s cubic-bezier(0.4, 0, 0.2, 1) 0.6s forwards;
          box-shadow: 0 0 12px #e11d48;
        }

        .loading-text {
          font-size: 0.55rem;
          letter-spacing: 4px;
          color: #e11d48;
          text-shadow: 0 0 12px rgba(225, 29, 72, 0.6);
          padding-left: 4px;
        }

        @keyframes spin3D {
          0% { transform: rotateX(20deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(20deg) rotateY(0deg) rotateZ(360deg); }
        }

        @keyframes spin3DReverse {
          0% { transform: rotateX(15deg) rotateY(0deg) rotateZ(360deg); }
          100% { transform: rotateX(15deg) rotateY(0deg) rotateZ(0deg); }
        }

        @keyframes pulseGlow {
          0% { transform: scale(0.85); opacity: 0.4; }
          100% { transform: scale(1.15); opacity: 0.8; }
        }

        @keyframes revealBrand {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes expandLine {
          to { width: 100%; }
        }

        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fillBar {
          0% { width: 0%; }
          40% { width: 45%; }
          80% { width: 85%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}