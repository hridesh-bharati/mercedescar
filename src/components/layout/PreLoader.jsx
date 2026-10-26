// src/components/layout/PreLoader.jsx
'use client';
import { useState, useEffect } from 'react';

export default function PreLoader() {
  const [loading, setLoading] = useState(true);
  const [fadeAnim, setFadeAnim] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeAnim(true);
      setTimeout(() => setLoading(false), 600);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`preloader-root position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center ${
        fadeAnim ? 'opacity-0 scale-out' : 'opacity-100'
      }`}
      style={{
        zIndex: 9999999,
        transition: 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out',
        pointerEvents: fadeAnim ? 'none' : 'auto',
        background: 'radial-gradient(circle at center, #1a0505 0%, #000000 100%)',
        overflow: 'hidden',
        perspective: '1000px',
      }}
    >
      {/* 3D Rotating Glowing Rings */}
      <div className="preloader-3d-scene">
        <div className="ring ring-outer"></div>
        <div className="ring ring-inner"></div>
        <div className="center-glow"></div>
      </div>

      {/* Main Content */}
      <div className="preloader-content position-relative text-center px-3 d-flex flex-column align-items-center justify-content-center">
        {/* Cinematic Brand Reveal */}
        <div className="brand-reveal">
          <h1 className="preloader-brand mb-1">
            <span className="text-white">GERMAN </span>
            <span className="text-danger">AUTO </span>
            <span className="text-white">EXPERT</span>
          </h1>
          <div className="brand-line"></div>
        </div>

        {/* Subtitle */}
        <div className="preloader-subtitle mt-3">
          <span className="preloader-subtitle-text text-white-50">
            AUTO SERVICE CENTER
          </span>
        </div>

        {/* Premium Loading Progress Line */}
        <div className="loading-bar-container">
          <div className="loading-bar-fill"></div>
        </div>

        {/* Loading Text */}
        <div className="preloader-loading-text mt-3">
          INITIALIZING...
        </div>
      </div>

      <style jsx>{`
        /* Fade & Scale Out Effect */
        .scale-out {
          transform: scale(1.1);
        }

        .preloader-content {
          z-index: 2;
          width: 100%;
        }

        /* 3D Rings Scene */
        .preloader-3d-scene {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
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
        }

        .ring-outer {
          width: clamp(220px, 70vw, 400px);
          height: clamp(220px, 70vw, 400px);
          border-top: 2px solid #e11d48;
          border-left: 1px solid rgba(225, 29, 72, 0.3);
          animation: spin3D 4s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
          box-shadow: 0 0 30px rgba(225, 29, 72, 0.2);
        }

        .ring-inner {
          width: clamp(170px, 55vw, 320px);
          height: clamp(170px, 55vw, 320px);
          border-bottom: 2px solid #ff4d4d;
          border-right: 1px solid rgba(255, 77, 77, 0.3);
          animation: spin3DReverse 3s linear infinite;
        }

        .center-glow {
          position: absolute;
          width: clamp(120px, 40vw, 200px);
          height: clamp(120px, 40vw, 200px);
          background: rgba(225, 29, 72, 0.4);
          border-radius: 50%;
          filter: blur(60px);
          animation: pulseGlow 2s ease-in-out infinite alternate;
        }

        /* Brand Reveal Animation */
        .brand-reveal {
          animation: revealBrand 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0;
          transform: translateY(30px) scale(0.9);
          width: 100%;
        }

        .preloader-brand {
          font-size: clamp(1.1rem, 5.5vw, 3.5rem);
          font-weight: 900;
          letter-spacing: clamp(1px, 0.5vw, 3px);
          margin: 0;
          text-transform: uppercase;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
          line-height: 1.2;
          white-space: nowrap;
        }

        .brand-line {
          width: 0%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #e11d48, transparent);
          margin: clamp(6px, 1.5vw, 10px) auto 0;
          animation: expandLine 1s ease-out 0.5s forwards;
        }

        .preloader-subtitle {
          animation: slideUpFade 1s ease-out 0.8s forwards;
          opacity: 0;
        }

        .preloader-subtitle-text {
          font-size: clamp(0.5rem, 2.2vw, 0.85rem);
          letter-spacing: clamp(2px, 1.2vw, 8px);
          font-weight: 300;
          margin-left: clamp(2px, 1vw, 8px);
          display: inline-block;
        }

        /* Loading Bar */
        .loading-bar-container {
          width: clamp(140px, 55vw, 200px);
          height: 3px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          overflow: hidden;
          margin-top: clamp(1rem, 4vw, 3rem);
          animation: slideUpFade 1s ease-out 1s forwards;
          opacity: 0;
        }

        .loading-bar-fill {
          width: 0%;
          height: 100%;
          background: linear-gradient(90deg, #ff4d4d, #e11d48);
          animation: fillBar 1.5s ease-in-out 0.8s forwards;
          box-shadow: 0 0 10px #e11d48;
        }

        .preloader-loading-text {
          font-size: clamp(0.5rem, 1.8vw, 0.65rem);
          letter-spacing: clamp(2px, 1vw, 6px);
          font-weight: 700;
          color: #e11d48;
          text-shadow: 0 0 10px rgba(225, 29, 72, 0.5);
          margin-left: clamp(2px, 1vw, 6px);
        }

        /* Keyframes */
        @keyframes spin3D {
          0% { transform: rotateX(20deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(20deg) rotateY(0deg) rotateZ(360deg); }
        }

        @keyframes spin3DReverse {
          0% { transform: rotateX(15deg) rotateY(0deg) rotateZ(360deg); }
          100% { transform: rotateX(15deg) rotateY(0deg) rotateZ(0deg); }
        }

        @keyframes pulseGlow {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.2); opacity: 1; }
        }

        @keyframes revealBrand {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes expandLine {
          to { width: 100%; }
        }

        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fillBar {
          0% { width: 0%; }
          50% { width: 60%; }
          100% { width: 100%; }
        }

        /* Extra small devices refinement */
        @media (max-width: 400px) {
          .preloader-brand {
            font-size: clamp(0.95rem, 5vw, 1.4rem);
            letter-spacing: 1px;
          }
          .preloader-subtitle-text {
            letter-spacing: 2px;
          }
          .preloader-loading-text {
            letter-spacing: 3px;
          }
        }
      `}</style>
    </div>
  );
}