import { Outlet } from 'react-router-dom'
import AppBottomNav from './AppBottomNav'
import AppStatusBar from './AppStatusBar'
import NotificationScreen from './NotificationScreen'
import { useApp } from '../context/AppContext'
import useViewport from '../hooks/useViewport'

export default function AppLayout() {
  const { showNotif } = useApp()
  const { isNative } = useViewport()

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#F7F9FC',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Status bar — only inside phone mockup on desktop */}
      {!isNative && <AppStatusBar />}

      {/* Page content */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          minHeight: 0,
          // On native, add bottom padding so content doesn't hide behind fixed nav
          paddingBottom: isNative ? 64 : 0,
        }}
        className="scrollbar-hide"
      >
        <Outlet />
      </div>

      {/* Bottom nav */}
      <AppBottomNav />

      {/* Notification overlay */}
      {showNotif && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 50 }}>
          <NotificationScreen />
        </div>
      )}
    </div>
  )
}
