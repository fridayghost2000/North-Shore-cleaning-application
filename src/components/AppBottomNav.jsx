import { Link, useLocation } from 'react-router-dom'
import { Home, Grid3x3, CalendarCheck, User } from 'lucide-react'
import useViewport from '../hooks/useViewport'

const tabs = [
  { to: '/',            label: 'Home',     Icon: Home },
  { to: '/services',    label: 'Services', Icon: Grid3x3 },
  { to: '/my-bookings', label: 'Bookings', Icon: CalendarCheck },
  { to: '/profile',     label: 'Profile',  Icon: User },
]

export default function AppBottomNav() {
  const { pathname } = useLocation()
  const { isNative } = useViewport()

  const navStyle = {
    height: 64,
    background: '#fff',
    borderTop: '1px solid #f0f0f0',
    display: 'flex',
    alignItems: 'stretch',
    flexShrink: 0,
    // On mobile/tablet: fixed to viewport bottom
    // On desktop (inside phone frame): in normal flow
    ...(isNative ? {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 40,
      paddingBottom: 'env(safe-area-inset-bottom)',
    } : {}),
  }

  return (
    <div style={navStyle}>
      {tabs.map(({ to, label, Icon }) => {
        const active = pathname === to
        return (
          <Link
            key={to}
            to={to}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              textDecoration: 'none',
              color: active ? '#2196C9' : '#b0b8c4',
              transition: 'color 0.15s',
            }}
          >
            <div style={{
              width: 36,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              background: active ? 'rgba(33,150,201,0.1)' : 'transparent',
              transition: 'background 0.15s',
            }}>
              <Icon size={18} />
            </div>
            <span style={{ fontSize: 10, fontWeight: active ? 600 : 400, fontFamily: 'Inter, sans-serif' }}>
              {label}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
