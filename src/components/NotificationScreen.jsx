import { useState } from 'react'
import { ArrowLeft, CalendarCheck, Tag, CheckCheck, Bell } from 'lucide-react'
import { useApp } from '../context/AppContext'
import useViewport from '../hooks/useViewport'

const initialNotifs = [
  {
    id: 1,
    Icon: CalendarCheck,
    iconColor: '#2196C9',
    iconBg: '#EBF5FB',
    title: 'Booking Confirmed',
    desc: 'Your residential cleaning is set for tomorrow at 10:00 AM.',
    time: '2m ago',
    unread: true,
  },
  {
    id: 2,
    Icon: Tag,
    iconColor: '#7C3AED',
    iconBg: '#F3EEFF',
    title: 'New Offer Available',
    desc: 'Use code DEEP15 for 15% off your next deep clean.',
    time: '1h ago',
    unread: true,
  },
  {
    id: 3,
    Icon: CheckCheck,
    iconColor: '#16A34A',
    iconBg: '#ECFDF5',
    title: 'Cleaning Completed',
    desc: 'Your office cleaning was completed successfully. Rate your experience.',
    time: '3h ago',
    unread: false,
  },
  {
    id: 4,
    Icon: Tag,
    iconColor: '#EA7B2C',
    iconBg: '#FEF3E8',
    title: 'Weekend Deal',
    desc: 'Book any service this weekend and save $20 with code REFER10.',
    time: 'Yesterday',
    unread: false,
  },
]

export default function NotificationScreen() {
  const { setShowNotif } = useApp()
  const { isNative } = useViewport()
  const [notifs, setNotifs] = useState(initialNotifs)

  const unreadCount = notifs.filter(n => n.unread).length

  function markAllRead() {
    setNotifs(notifs.map(n => ({ ...n, unread: false })))
  }

  function markRead(id) {
    setNotifs(notifs.map(n => n.id === id ? { ...n, unread: false } : n))
  }

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: '#F7F9FC',
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Inter, sans-serif',
    }}>

      {/* ── Header ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px',
        background: '#fff',
        borderBottom: '1px solid #f0f4f8',
        flexShrink: 0,
      }}>
        <button
          onClick={() => setShowNotif(false)}
          style={{ width: 34, height: 34, borderRadius: 10, background: '#F0F4F8', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <ArrowLeft size={16} color="#333" />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#111' }}>Notifications</span>
          {unreadCount > 0 && (
            <div style={{ background: '#2196C9', borderRadius: 20, minWidth: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5px' }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: '#fff' }}>{unreadCount}</span>
            </div>
          )}
        </div>

        {unreadCount > 0 ? (
          <button
            onClick={markAllRead}
            style={{ fontSize: 11, color: '#2196C9', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', padding: 0 }}
          >
            Mark all read
          </button>
        ) : (
          <div style={{ width: 34 }} />
        )}
      </div>

      {/* ── List ── */}
      <div style={{ flex: 1, overflowY: 'auto' }} className="scrollbar-hide">

        {notifs.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 10, color: '#b0bac8' }}>
            <div style={{ width: 56, height: 56, background: '#F0F4F8', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bell size={24} color="#c0ccd8" />
            </div>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#555' }}>No notifications</p>
            <p style={{ fontSize: 11, color: '#a0aab8' }}>You're all caught up!</p>
          </div>
        ) : (
          <div style={{ padding: '10px 0' }}>
            {notifs.map((n, i) => {
              const Icon = n.Icon
              return (
                <div
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12,
                    padding: '13px 16px',
                    background: n.unread ? '#fff' : 'transparent',
                    borderBottom: i < notifs.length - 1 ? '1px solid #f0f4f8' : 'none',
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                >
                  {/* Icon */}
                  <div style={{ width: 40, height: 40, background: n.iconBg, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={18} color={n.iconColor} strokeWidth={1.8} />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 3 }}>
                      <p style={{ fontSize: 13, fontWeight: n.unread ? 700 : 600, color: '#111', lineHeight: 1.3 }}>{n.title}</p>
                      <span style={{ fontSize: 10, color: '#b0bac8', whiteSpace: 'nowrap', marginTop: 1, flexShrink: 0 }}>{n.time}</span>
                    </div>
                    <p style={{ fontSize: 11, color: '#6b7280', lineHeight: 1.5 }}>{n.desc}</p>
                  </div>

                  {/* Unread dot */}
                  {n.unread && (
                    <div style={{ width: 7, height: 7, background: '#2196C9', borderRadius: '50%', flexShrink: 0, marginTop: 5 }} />
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
