import { useEmployee } from '../../context/EmployeeContext'
import { Calendar, Clock, Camera, User } from 'lucide-react'

export default function EmployeeBottomNav() {
  const { employeeTab, setEmployeeTab, isTimerRunning } = useEmployee()

  const tabs = [
    { id: 'schedule', label: 'Shifts', icon: Calendar },
    { id: 'job', label: 'Active Job', icon: Clock, hasPulse: isTimerRunning },
    { id: 'media', label: 'Media Proof', icon: Camera },
    { id: 'profile', label: 'My Profile', icon: User },
  ]

  return (
    <div
      style={{
        height: 62,
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(226, 232, 240, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexShrink: 0,
        position: 'relative',
        zIndex: 30,
      }}
    >
      {tabs.map(({ id, label, icon: Icon, hasPulse }) => {
        const isActive = employeeTab === id

        return (
          <button
            key={id}
            onClick={() => setEmployeeTab(id)}
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: isActive ? '#0B4A8F' : '#94A3B8',
              position: 'relative',
              padding: 0,
              transition: 'color 0.15s ease',
              outline: 'none',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={20} strokeWidth={isActive ? 2.3 : 1.7} />

              {/* Pulsing indicator when timer is active on job tab */}
              {hasPulse && (
                <span
                  style={{
                    position: 'absolute',
                    top: -1,
                    right: -2,
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#10B981',
                    border: '1px solid #FFFFFF',
                  }}
                />
              )}
            </div>

            <span
              style={{
                fontSize: 10,
                fontWeight: isActive ? 600 : 500,
                letterSpacing: '-0.1px',
              }}
            >
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
