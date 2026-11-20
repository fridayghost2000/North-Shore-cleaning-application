import { useCleanster } from '../../context/CleansterContext'
import { Calendar, Send, ClipboardList, User, Plus } from 'lucide-react'

export default function CleansterBottomNav() {
  const { activeTab, setActiveTab, setIsServiceModalOpen } = useCleanster()

  const tabs = [
    { id: 'bookings',  label: 'Booking',   Icon: Calendar },
    { id: 'messages',  label: 'Messages',  Icon: Send },
    { id: 'book_now',  label: 'Book Now',  Icon: Plus, isAction: true },
    { id: 'checklist', label: 'Checklist', Icon: ClipboardList },
    { id: 'account',   label: 'Account',   Icon: User },
  ]

  return (
    <div style={{
      height: 64,
      background: '#FFFFFF',
      borderTop: '1px solid #F0F3F6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      position: 'relative',
      zIndex: 30,
      flexShrink: 0,
      padding: '0 4px',
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
                top: -12,
              }}
            >
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.15s ease',
              }}>
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: '#FA2A70', // Cleanster signature pink
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Plus size={22} strokeWidth={2.8} />
                </div>
              </div>
              <span style={{ fontSize: 9.5, color: '#64748B', fontWeight: 600, marginTop: 2 }}>
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
              gap: 3,
              color: isSelected ? '#FA2A70' : '#94A3B8',
              transition: 'color 0.15s ease',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <IconComponent size={20} strokeWidth={isSelected ? 2.4 : 1.8} />
            <span style={{ fontSize: 10, fontWeight: isSelected ? 600 : 500 }}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
