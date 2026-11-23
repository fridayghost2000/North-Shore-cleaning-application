/**
 * iPhone 15 Pro mockup — pure CSS/div.
 * Pass width + height via style prop. Children render inside the screen.
 */
export default function Iphone15Pro({ children, style }) {
  const width  = style?.width  || 360
  const height = style?.height || 760

  // Inner screen dims (slimmer outer bezel padding)
  const pad = 8

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        flexShrink: 0,
        // Outer titanium body
        background: 'linear-gradient(150deg, #48484a 0%, #1c1c1e 45%, #111 100%)',
        borderRadius: 48,
        padding: pad,
        boxSizing: 'border-box',
        boxShadow: `
          0 0 0 1px rgba(0,0,0,0.12),
          inset 0 0 0 1px rgba(255,255,255,0.15),
          0 35px 70px -15px rgba(15, 23, 42, 0.25),
          0 15px 30px -8px rgba(11, 74, 143, 0.14),
          0 2px 8px rgba(0, 0, 0, 0.06)
        `,
        userSelect: 'none',
      }}
    >
      {/* Left buttons */}
      <div style={{ position: 'absolute', left: -2.5, top: 130, width: 2.5, height: 22, background: '#3a3a3c', borderRadius: '2px 0 0 2px', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)' }} />
      <div style={{ position: 'absolute', left: -2.5, top: 165, width: 2.5, height: 46, background: '#3a3a3c', borderRadius: '2px 0 0 2px', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)' }} />
      <div style={{ position: 'absolute', left: -2.5, top: 222, width: 2.5, height: 46, background: '#3a3a3c', borderRadius: '2px 0 0 2px', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)' }} />
      {/* Right power button */}
      <div style={{ position: 'absolute', right: -2.5, top: 174, width: 2.5, height: 68, background: '#3a3a3c', borderRadius: '0 2px 2px 0', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)' }} />

      {/* Screen bezel container */}
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 42,
          overflow: 'hidden',
          background: '#000',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* ── App screen ── */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--app-ambient-bg)',
            overflow: 'hidden',
            minHeight: 0,
          }}
        >
          {/* Actual app fills remaining height */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
