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
        height: 64,
        background: '#FFFFFF',
        borderTop: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'stretch',
        flexShrink: 0,
        position: 'relative',
        zIndex: 30,
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.03)',
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
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: isActive ? '#0B4A8F' : '#64748B',
              position: 'relative',
              padding: 0,
            }}
          >
            <div
              style={{
                width: 40,
                height: 28,
                borderRadius: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isActive ? '#EEF5FC' : 'transparent',
                transition: 'all 0.15s ease',
                position: 'relative',
              }}
            >
              <Icon size={20} strokeWidth={isActive ? 2.4 : 1.9} color={isActive ? '#0B4A8F' : '#64748B'} />

              {/* Pulsing Green Indicator when timer is active on job tab */}
              {hasPulse && (
                <span
                  style={{
                    position: 'absolute',
                    top: 2,
                    right: 6,
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#10B981',
                    border: '1.5px solid #FFFFFF',
                  }}
                />
              )}
            </div>

            <span
              style={{
                fontSize: 10.5,
                fontWeight: isActive ? 700 : 500,
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
