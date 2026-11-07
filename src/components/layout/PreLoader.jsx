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

    const maxTimer = setTimeout(() => {
      triggerFadeOut();
    }, 3000);

    function triggerFadeOut() {
      setFadeAnim(true);
      setTimeout(() => {
        setLoading(false);
      }, 400);
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
        background: '#000000', // Pure pitch black background
        overflow: 'hidden',
      }}
    >
      {/* Subtle background ring for minimal premium look without boxes */}
      <div className="preloader-bg-3d">
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
          className="preloader-video"
          style={{
            height: 'auto',
            objectFit: 'contain',
            borderRadius: '16px',
            background: '#000000', // Ensures video element itself has black base
            filter: 'drop-shadow(0 0 25px rgba(255, 0, 0, 0.2))', 
          }}
        />

        {/* Loading text */}
        <div
          className="mt-4 fw-bold tracking-widest d-flex align-items-center gap-1 preloader-text"
          style={{ letterSpacing: '3px', color: '#777777' }}
        >
          <span>LOADING LUXURY EXPERIENCE</span>
        </div>
      </div>

      <style jsx>{`
        /* Thoda bada size mobile ke liye */
        .preloader-video {
          width: 340px;
          max-width: 90vw;
        }
        .preloader-text {
          font-size: 0.85rem;
        }

        /* PC / Desktop screens ke liye aur bada size */
        @media (min-width: 992px) {
          .preloader-video {
            width: 540px; /* Yahan se aap PC ka size aur chota/bda kar sakte hain */
          }
          .preloader-text {
            font-size: 1rem;
          }
          .ring {
            width: 800px !important;
            height: 800px !important;
            margin: -400px 0 0 -400px !important;
          }
        }

        .preloader-bg-3d {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .ring {
          position: absolute;
          top: 50%; left: 50%;
          width: 500px; height: 500px;
          margin: -250px 0 0 -250px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.05); /* Extremely subtle ring */
          animation: ringSpin 20s linear infinite;
        }

        @keyframes ringSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
