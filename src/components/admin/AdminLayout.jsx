import { useState } from 'react'
import { useIdentity } from '../../context/IdentityContext'
import useViewport from '../../hooks/useViewport'
import AdminSchedule from '../../pages/admin/AdminSchedule'
import AdminLiveDispatch from '../../pages/admin/AdminLiveDispatch'
import AdminMediaAudit from '../../pages/admin/AdminMediaAudit'
import AdminProfile from '../../pages/admin/AdminProfile'
import { Calendar, Users, Camera, Shield, ArrowLeftRight } from 'lucide-react'

export default function AdminLayout() {
  const { resetIdentity } = useIdentity()
  const { isNative } = useViewport()
  const [activeTab, setActiveTab] = useState('schedule')

  const tabs = [
    { id: 'schedule', label: 'Calendar', Icon: Calendar },
    { id: 'dispatch', label: 'Live Ops',  Icon: Users },
    { id: 'media',    label: 'Audit',     Icon: Camera },
    { id: 'profile',  label: 'Settings',  Icon: Shield },
  ]

  function renderContent() {
    switch (activeTab) {
      case 'schedule': return <AdminSchedule />
      case 'dispatch': return <AdminLiveDispatch />
      case 'media':    return <AdminMediaAudit />
      case 'profile':  return <AdminProfile />
      default:         return <AdminSchedule />
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#F7F9FC',
      fontFamily: 'Inter, sans-serif',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Unified Header */}
      <div style={{
        padding: '10px 16px',
        background: '#FFFFFF',
        borderBottom: '1px solid #EEF2F6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img
            src="/logo_ (1).png"
            alt="North Shore Clean"
            style={{ height: 28, width: 'auto', objectFit: 'contain' }}
          />
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            background: '#EEF2FF',
            color: '#4F46E5',
            padding: '2px 6px',
            borderRadius: 6,
            textTransform: 'uppercase',
            letterSpacing: '0.4px',
          }}>
            Admin
          </span>
        </div>

        {/* Identity Switcher */}
        <button
          onClick={resetIdentity}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            padding: '5px 10px',
            borderRadius: 20,
            background: '#F0F7FC',
            border: '1px solid #D0E7F5',
            fontSize: 11,
            fontWeight: 600,
            color: '#2196C9',
            cursor: 'pointer',
          }}
        >
          <ArrowLeftRight size={12} />
          <span>Switch Role</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          minHeight: 0,
          paddingBottom: isNative ? 64 : 0,
        }}
        className="scrollbar-hide"
      >
        {renderContent()}
      </div>

      {/* Bottom Nav */}
      <div style={{
        height: 64,
        background: '#FFFFFF',
        borderTop: '1px solid #F0F0F0',
        display: 'flex',
        alignItems: 'stretch',
        flexShrink: 0,
        ...(isNative ? {
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          paddingBottom: 'env(safe-area-inset-bottom)',
        } : {}),
      }}>
        {tabs.map(({ id, label, Icon }) => {
          const isActive = activeTab === id
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                background: 'none',
                border: 'none',
                outline: 'none',
                WebkitTapHighlightColor: 'transparent',
                cursor: 'pointer',
                color: isActive ? '#4F46E5' : '#9AABBC',
                position: 'relative',
              }}
            >
              <div style={{
                width: 38,
                height: 28,
                borderRadius: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isActive ? '#EEF2FF' : 'transparent',
                transition: 'all 0.15s ease',
              }}>
                <Icon size={20} strokeWidth={isActive ? 2.4 : 1.8} />
              </div>
              <span style={{ fontSize: 10, fontWeight: isActive ? 600 : 500 }}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
