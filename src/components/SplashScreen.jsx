import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'

export default function SplashScreen({ onFinish }) {
  const [fadingOut, setFadingOut] = useState(false)
  const [step, setStep] = useState(0) // 0: initial, 1: logo in, 2: text in, 3: progress

  useEffect(() => {
    // Step 1: Logo & glow appear immediately
    const t1 = setTimeout(() => setStep(1), 80)
    // Step 2: Brand title & subtitle slide up
    const t2 = setTimeout(() => setStep(2), 600)
    // Step 3: Loading line active
    const t3 = setTimeout(() => setStep(3), 1100)
    // Step 4: Start fade out
    const t4 = setTimeout(() => setFadingOut(true), 2100)
    // Step 5: Call onFinish to switch to main app
    const t5 = setTimeout(() => {
      if (onFinish) onFinish()
    }, 2600)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
      clearTimeout(t5)
    }
  }, [onFinish])

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        background: 'radial-gradient(ellipse at 50% 35%, #F0F7FF 0%, #D8ECFD 50%, #B9DCFB 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: 'Inter, sans-serif',
        opacity: fadingOut ? 0 : 1,
        transform: fadingOut ? 'scale(1.04)' : 'scale(1)',
        transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: fadingOut ? 'none' : 'auto',
      }}
    >
      {/* Background Animated Pulse Glow */}
      <div
        style={{
          position: 'absolute',
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(33, 150, 201, 0.25) 0%, rgba(11, 74, 143, 0.1) 45%, transparent 70%)',
          filter: 'blur(35px)',
          transform: step >= 1 ? 'scale(1.15)' : 'scale(0.8)',
          opacity: step >= 1 ? 0.9 : 0,
          transition: 'transform 1.4s ease-out, opacity 1.2s ease-out',
          pointerEvents: 'none',
        }}
      />

      {/* Center Brand Icon Container with Shimmer Effect */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: step >= 1 ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.88)',
          opacity: step >= 1 ? 1 : 0,
          transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Logo Card with Reflection */}
        <div
          style={{
            width: 140,
            height: 64,
            borderRadius: 20,
            background: '#FFFFFF',
            boxShadow: '0 12px 30px rgba(11, 74, 143, 0.16), 0 0 0 1px rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px 16px',
            boxSizing: 'border-box',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Shimmer sweep animation */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: step >= 2 ? '150%' : '-100%',
              width: '60%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
              transform: 'skewX(-25deg)',
              transition: 'left 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
              pointerEvents: 'none',
            }}
          />

          <img
            src="/logo_ (1).png"
            alt="North Shore Clean"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Floating Sparkle Badge */}
        <div
          style={{
            position: 'absolute',
            top: -8,
            right: -8,
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00C2CB, #2196C9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0, 194, 203, 0.4)',
            transform: step >= 2 ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-45deg)',
            transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <Sparkles size={13} color="#FFFFFF" />
        </div>
      </div>

      {/* Brand Title & Subtitle */}
      <div
        style={{
          marginTop: 22,
          textAlign: 'center',
          transform: step >= 2 ? 'translateY(0)' : 'translateY(12px)',
          opacity: step >= 2 ? 1 : 0,
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <h2
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: '#0F172A',
            letterSpacing: '-0.4px',
            margin: '0 0 4px 0',
          }}
        >
          North Shore Clean
        </h2>
        <p
          style={{
            fontSize: 12,
            color: '#475569',
            margin: 0,
            fontWeight: 500,
            letterSpacing: '0.2px',
          }}
        >
          Beverly, MA · Cleaning Operations
        </p>
      </div>

      {/* Minimalist Loading Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 48,
          width: 140,
          height: 3,
          borderRadius: 3,
          background: 'rgba(11, 74, 143, 0.12)',
          overflow: 'hidden',
          opacity: step >= 2 ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        <div
          style={{
            height: '100%',
            width: step >= 3 ? '100%' : '15%',
            borderRadius: 3,
            background: 'linear-gradient(90deg, #0B4A8F, #2196C9)',
            transition: 'width 1.2s cubic-bezier(0.25, 1, 0.5, 1)',
            boxShadow: '0 0 8px rgba(33, 150, 201, 0.4)',
          }}
        />
      </div>

      {/* Skip Button (discreet top-right tap) */}
      <button
        onClick={() => {
          setFadingOut(true)
          setTimeout(() => { if (onFinish) onFinish() }, 200)
        }}
        style={{
          position: 'absolute',
          top: 14,
          right: 14,
          background: 'none',
          border: 'none',
          color: 'rgba(15, 23, 42, 0.55)',
          fontSize: 10,
          cursor: 'pointer',
          padding: '6px 10px',
        }}
      >
        Skip
      </button>
    </div>
  )
}
