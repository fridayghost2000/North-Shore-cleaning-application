import { useOps } from '../../context/DemoOpsContext'
import { Calendar, Clock, Camera, Users, Shield, CheckCircle2 } from 'lucide-react'

export default function OpsBottomNav() {
  const { role, activeTab, setActiveTab, jobs } = useOps()

  // Check if any job is currently in progress
  const hasActiveJob = jobs.some(j => j.status === 'In Progress')

  // Tabs for Cleaner vs Admin
  const cleanerTabs = [
    { id: 'schedule', label: 'Schedule', Icon: Calendar },
    { id: 'job', label: 'Active Job', Icon: Clock, badge: hasActiveJob },
    { id: 'media', label: 'Before/After', Icon: Camera },
    { id: 'profile', label: 'Profile', Icon: Users },
  ]

  const adminTabs = [
    { id: 'schedule', label: 'Team Calendar', Icon: Calendar },
    { id: 'dispatch', label: 'Live Ops', Icon: Users, badge: true },
    { id: 'media', label: 'Media Audit', Icon: Camera },
    { id: 'profile', label: 'Settings', Icon: Shield },
  ]

  const tabs = role === 'admin' ? adminTabs : cleanerTabs

  return (
    <div style={{
      background: '#FFFFFF',
      borderTop: '1px solid #EEF2F6',
      height: 62,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '0 8px',
      position: 'relative',
      zIndex: 20,
    }}>
      {tabs.map(tab => {
        const isSelected = activeTab === tab.id
        const IconComponent = tab.Icon

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              height: '100%',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              position: 'relative',
              transition: 'color 0.15s ease',
            }}
          >
            <div style={{ position: 'relative' }}>
              <IconComponent
                size={18}
                color={isSelected ? '#0F172A' : '#94A3B8'}
                strokeWidth={isSelected ? 2.3 : 1.8}
              />
              {tab.badge && (
                <span style={{
                  position: 'absolute',
                  top: -2,
                  right: -3,
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#0D9488',
                  border: '1.5px solid #FFFFFF',
                }} />
              )}
            </div>
            <span style={{
              fontSize: 10,
              fontWeight: isSelected ? 600 : 500,
              color: isSelected ? '#0F172A' : '#94A3B8',
              letterSpacing: '-0.1px',
            }}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
