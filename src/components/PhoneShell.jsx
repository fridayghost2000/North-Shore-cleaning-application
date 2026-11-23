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
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--app-ambient-bg)',
        overflow: 'hidden',
        overscrollBehavior: 'none',
      }}>
        {children}
      </div>
    )
  }

  /* ── Desktop mode: phone mockup on light background ── */
  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(ellipse at 50% 30%, #F1F5F9 0%, #E2E8F0 55%, #CBD5E1 100%)',
      padding: '24px 16px',
      boxSizing: 'border-box',
      overflow: 'hidden',
    }}>
      {/* Soft ambient light glow behind the frame */}
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 540, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(11,74,143,0.12) 0%, rgba(33,150,201,0.06) 50%, transparent 70%)',
        filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0,
      }} />

      <Iphone15Pro style={{ width: 360, height: 760, flexShrink: 0, position: 'relative', zIndex: 1 }}>
        {children}
      </Iphone15Pro>
    </div>
  )
}
