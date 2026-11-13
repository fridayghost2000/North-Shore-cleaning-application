/**
 * iPhone 15 Pro mockup — pure CSS/div.
 * Pass width + height via style prop. Children render inside the screen.
 */
export default function Iphone15Pro({ children, style }) {
  const width  = style?.width  || 360
  const height = style?.height || 760

  // Inner screen dims (subtract the outer padding of 12px each side)
  const pad = 12

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        flexShrink: 0,
        // Outer titanium body
        background: 'linear-gradient(150deg, #48484a 0%, #1c1c1e 45%, #111 100%)',
        borderRadius: 54,
        padding: pad,
        boxSizing: 'border-box',
        boxShadow: `
          0 0 0 1.5px rgba(255,255,255,0.13),
          inset 0 0 0 1px rgba(255,255,255,0.05),
          0 40px 80px rgba(0,0,0,0.85),
          0 8px 24px rgba(0,0,0,0.6),
          0 0 60px rgba(33,150,201,0.1)
        `,
        userSelect: 'none',
      }}
    >
      {/* Left buttons */}
      <div style={{ position: 'absolute', left: -3.5, top: 130, width: 3.5, height: 22, background: '#3a3a3c', borderRadius: '2px 0 0 2px', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)' }} />
      <div style={{ position: 'absolute', left: -3.5, top: 165, width: 3.5, height: 46, background: '#3a3a3c', borderRadius: '2px 0 0 2px', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)' }} />
      <div style={{ position: 'absolute', left: -3.5, top: 222, width: 3.5, height: 46, background: '#3a3a3c', borderRadius: '2px 0 0 2px', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)' }} />
      {/* Right power button */}
      <div style={{ position: 'absolute', right: -3.5, top: 174, width: 3.5, height: 68, background: '#3a3a3c', borderRadius: '0 2px 2px 0', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)' }} />

      {/* Screen bezel container */}
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 44,
          overflow: 'hidden',
          background: '#000',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Dynamic Island */}
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 112,
            height: 32,
            background: '#000',
            borderRadius: 18,
            zIndex: 30,
            border: '2px solid #1a1a1a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: 10,
          }}
        >
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#1c1c1e', border: '1.5px solid #2c2c2e' }} />
        </div>

        {/* ── App screen ── */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            background: '#F7F9FC',
            overflow: 'hidden',
            minHeight: 0,
          }}
        >
          {/* Island spacer — keeps content below the floating island pill */}
          <div style={{ height: 48, flexShrink: 0, background: '#F7F9FC', zIndex: 1 }} />
          {/* Actual app fills remaining height */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
            {children}
          </div>
        </div>

        {/* Home indicator */}
        <div
          style={{
            height: 22,
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <div style={{ width: 110, height: 5, background: '#c8c8cc', borderRadius: 3 }} />
        </div>
      </div>
    </div>
  )
}
