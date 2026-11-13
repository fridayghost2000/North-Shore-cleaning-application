export default function AppStatusBar() {
  const now = new Date()
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })

  return (
    <div style={{
      height: 44,
      background: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      flexShrink: 0,
      position: 'relative',
      zIndex: 10,
    }}>
      {/* Time */}
      <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.3px' }}>
        {time}
      </span>

      {/* Status icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        {/* Signal bars */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="8" width="3" height="4" rx="0.8" fill="#1a1a1a"/>
          <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.8" fill="#1a1a1a"/>
          <rect x="9" y="3" width="3" height="9" rx="0.8" fill="#1a1a1a"/>
          <rect x="13.5" y="0" width="3" height="12" rx="0.8" fill="#1a1a1a"/>
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill="#1a1a1a"/>
          <path d="M3.5 6.5a6.5 6.5 0 019 0" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <path d="M1 4a10 10 0 0114 0" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        </svg>
        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
          <rect x="2" y="2" width="16" height="8" rx="1.5" fill="#1a1a1a"/>
          <path d="M22.5 4v4" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  )
}
