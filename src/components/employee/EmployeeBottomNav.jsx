import { useEmployee } from '../../context/EmployeeContext'
import { CalendarDays, Timer, Camera, UserRound } from 'lucide-react'

export default function EmployeeBottomNav() {
  const { employeeTab, setEmployeeTab, isTimerRunning } = useEmployee()

  const tabs = [
    { id: 'schedule', label: 'Shifts', icon: CalendarDays },
    { id: 'job', label: 'Active Job', icon: Timer, hasPulse: isTimerRunning },
    { id: 'media', label: 'Media Proof', icon: Camera },
    { id: 'profile', label: 'My Profile', icon: UserRound },
  ]

  return (
    <div
      style={{
        height: 60,
        background: 'rgba(255, 255, 255, 0.94)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderTop: '1px solid rgba(226, 232, 240, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexShrink: 0,
        position: 'relative',
        zIndex: 30,
        boxShadow: '0 -2px 10px rgba(15, 23, 42, 0.02)',
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
              gap: 2,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 0',
              transition: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
              outline: 'none',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3px 12px',
                borderRadius: 14,
                background: isActive ? 'rgba(11, 74, 143, 0.08)' : 'transparent',
                transition: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <Icon
                size={19}
                strokeWidth={isActive ? 2.3 : 1.7}
                color={isActive ? '#0B4A8F' : '#94A3B8'}
              />

              {/* Pulsing indicator when timer is active on job tab */}
              {hasPulse && (
                <span
                  style={{
                    position: 'absolute',
                    top: 1,
                    right: 6,
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#10B981',
                    border: '1.5px solid #FFFFFF',
                    boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.25)',
                  }}
                />
              )}
            </div>

            <span
              style={{
                fontSize: 10,
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#0B4A8F' : '#94A3B8',
                letterSpacing: '-0.1px',
                transition: 'color 0.15s ease',
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
