import Iphone15Pro from './Iphone15Pro'
import useViewport from '../hooks/useViewport'

/**
 * On desktop (>1024px): renders the iPhone mockup centred on dark background.
 * On mobile/tablet (≤1024px): renders children filling the full viewport —
 *   exactly like a real native app installed on the device.
 */
export default function PhoneShell({ children }) {
  const { isNative } = useViewport()

  /* ── Native mode: full-viewport app, no frame ── */
  if (isNative) {
    return (
      <div style={{
        width: '100%',
        height: '100dvh',   // dynamic viewport height (handles mobile browser chrome)
        display: 'flex',
        flexDirection: 'column',
        background: '#F7F9FC',
        overflow: 'hidden',
      }}>
        {children}
      </div>
    )
  }

  /* ── Desktop mode: phone mockup on dark background ── */
  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(ellipse at 55% 35%, #0d1b35 0%, #050c1c 55%, #000000 100%)',
      padding: '24px 16px',
      boxSizing: 'border-box',
      overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(33,150,201,0.18) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
      }} />

      <Iphone15Pro style={{ width: 360, height: 760, flexShrink: 0, position: 'relative', zIndex: 1 }}>
        {children}
      </Iphone15Pro>
    </div>
  )
}
