import { useCleanster } from '../../context/CleansterContext'
import { CalendarDays, MessageSquare, ClipboardCheck, UserRound, Plus } from 'lucide-react'

export default function CleansterBottomNav() {
  const { activeTab, setActiveTab, setIsServiceModalOpen } = useCleanster()

  const tabs = [
    { id: 'bookings',  label: 'Booking',   Icon: CalendarDays },
    { id: 'messages',  label: 'Messages',  Icon: MessageSquare },
    { id: 'book_now',  label: 'Book Now',  Icon: Plus, isAction: true },
    { id: 'checklist', label: 'Checklist', Icon: ClipboardCheck },
    { id: 'account',   label: 'Account',   Icon: UserRound },
  ]

  return (
    <div style={{
      height: 60,
      background: 'rgba(255, 255, 255, 0.94)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderTop: '1px solid rgba(226, 232, 240, 0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      position: 'relative',
      zIndex: 30,
      flexShrink: 0,
      padding: '0 4px',
      boxShadow: '0 -2px 10px rgba(15, 23, 42, 0.02)',
    }}>
      {tabs.map(tab => {
        const isSelected = activeTab === tab.id
        const IconComponent = tab.Icon

        // Center Floating "+" Book Now Button
        if (tab.isAction) {
          return (
            <div
              key={tab.id}
              onClick={() => setIsServiceModalOpen(true)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                top: -10,
              }}
            >
              <div style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                background: '#0B4A8F',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                boxShadow: 'none',
                transition: 'transform 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
              }}>
                <Plus size={22} strokeWidth={2.8} />
              </div>
              <span style={{ fontSize: 9.5, color: '#64748B', fontWeight: 600, marginTop: 3 }}>
                Book Now
              </span>
            </div>
          )
        }

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              height: '100%',
              background: 'none',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              padding: '4px 0',
              transition: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3px 12px',
                borderRadius: 14,
                background: isSelected ? 'rgba(11, 74, 143, 0.08)' : 'transparent',
                transition: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isSelected ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <IconComponent
                size={19}
                strokeWidth={isSelected ? 2.3 : 1.7}
                color={isSelected ? '#0B4A8F' : '#94A3B8'}
              />
            </div>
            <span
              style={{
                fontSize: 10,
                fontWeight: isSelected ? 600 : 500,
                color: isSelected ? '#0B4A8F' : '#94A3B8',
                letterSpacing: '-0.1px',
                transition: 'color 0.15s ease',
              }}
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
