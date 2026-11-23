import { useState } from 'react'
import { useCleanster } from '../../context/CleansterContext'
import {
  Home, AlertTriangle, Rocket,
  CreditCard, Bell, Gift,
  HelpCircle, LogOut, ChevronRight
} from 'lucide-react'

export default function AccountPage() {
  const { setAccountModal, accountProfile } = useCleanster()
  const [toastMsg, setToastMsg] = useState(null)

  function showToast(msg) {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 2500)
  }

  // Account Menu Items organized into clean iOS Inset Groups
  const menuGroups = [
    {
      id: 'properties-group',
      items: [
        {
          id: 'properties',
          label: 'Properties',
          icon: Home,
          action: () => setAccountModal('properties'),
        },
        {
          id: 'problems',
          label: 'Property Problems',
          icon: AlertTriangle,
          action: () => setAccountModal('problems'),
        },
      ],
    },
    {
      id: 'cleaners-group',
      items: [
        {
          id: 'cleaners',
          label: 'My Cleaners',
          icon: Rocket,
          action: () => setAccountModal('cleaners'),
        },
      ],
    },
    {
      id: 'operations-group',
      items: [
        {
          id: 'billing',
          label: 'Billing',
          icon: CreditCard,
          action: () => setAccountModal('billing'),
        },
        {
          id: 'notifications',
          label: 'Notification',
          icon: Bell,
          action: () => setAccountModal('notifications'),
        },
        {
          id: 'refer',
          label: 'Refer a friend',
          icon: Gift,
          badge: 'Coming Soon',
          action: () => showToast('Referral rewards program launching soon!'),
        },
        {
          id: 'help',
          label: 'Help',
          icon: HelpCircle,
          action: () => setAccountModal('help'),
        },
      ],
    },
    {
      id: 'auth-group',
      items: [
        {
          id: 'logout',
          label: 'Logout',
          icon: LogOut,
          isLogout: true,
          action: () => setAccountModal('logout'),
        },
      ],
    },
  ]

  return (
    <div style={{
      fontFamily: 'Inter, sans-serif',
      background: 'transparent',
      minHeight: '100%',
      boxSizing: 'border-box',
      position: 'relative',
      paddingBottom: 16,
    }}>
      {/* ── Top Navigation Bar (Matching Image) ── */}
      <div style={{
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#FFFFFF',
        borderBottom: '1px solid #F1F5F9',
      }}>
        <div style={{ width: 32 }} /> {/* Balance spacer for center title */}

        <h1 style={{
          fontSize: 16,
          fontWeight: 600,
          color: '#0F172A',
          margin: 0,
        }}>
          Account
        </h1>

        <button
          onClick={() => setAccountModal('edit-profile')}
          style={{
            background: 'none',
            border: 'none',
            color: '#0B4A8F', // North Shore primary brand blue
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            padding: 0,
          }}
        >
          Edit
        </button>
      </div>

      {/* ── Centered Profile Area (Matching Image Layout with User Profile Photo) ── */}
      <div style={{
        background: '#FFFFFF',
        padding: '24px 16px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: 14,
        borderBottom: '1px solid #F1F5F9',
      }}>
        {/* User Profile Avatar with subtle border & shadow */}
        <div style={{ position: 'relative', marginBottom: 12 }}>
          <img
            src={accountProfile?.avatar}
            alt={accountProfile?.name}
            style={{
              width: 76,
              height: 76,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2.5px solid #FFFFFF',
              boxShadow: '0 4px 14px rgba(11, 74, 143, 0.16)',
              display: 'block',
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: 2,
            right: 2,
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: '#10B981',
            border: '2px solid #FFFFFF',
          }} />
        </div>

        {/* User Name */}
        <h2 style={{
          fontSize: 16.5,
          fontWeight: 700,
          color: '#0F172A',
          margin: '0 0 4px 0',
          letterSpacing: '-0.2px',
        }}>
          {accountProfile?.name}
        </h2>

        {/* User Email */}
        <p style={{
          fontSize: 13,
          color: '#475569',
          margin: '0 0 3px 0',
          fontWeight: 400,
        }}>
          {accountProfile?.email}
        </p>

        {/* User Phone */}
        <p style={{
          fontSize: 13,
          color: '#475569',
          margin: 0,
          fontWeight: 400,
        }}>
          {accountProfile?.phone}
        </p>
      </div>

      {/* ── Clean Inset Grouped Menu List (Apple iOS / Cleanster Style) ── */}
      <div style={{
        padding: '0 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}>
        {menuGroups.map((group) => (
          <div
            key={group.id}
            style={{
              background: '#FFFFFF',
              borderRadius: 16,
              border: '1px solid #E2E8F0',
              overflow: 'hidden',
              boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
            }}
          >
            {group.items.map((item, itemIndex) => {
              const IconComp = item.icon
              const isLastInGroup = itemIndex === group.items.length - 1

              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderBottom: isLastInGroup ? 'none' : '1px solid #F1F5F9',
                    cursor: 'pointer',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#FFFFFF'}
                >
                  {/* Left: Rounded Square Icon + Label */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: item.isLogout ? '#FEE2E2' : '#F1F5F9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: item.isLogout ? '#DC2626' : (item.badge ? '#94A3B8' : '#0B4A8F'),
                      flexShrink: 0,
                    }}>
                      <IconComp size={18} strokeWidth={item.isLogout ? 2 : 1.9} />
                    </div>

                    <span style={{
                      fontSize: 13.5,
                      fontWeight: 600,
                      color: item.isLogout ? '#DC2626' : '#0F172A',
                      letterSpacing: '-0.1px',
                    }}>
                      {item.label}
                    </span>
                  </div>

                  {/* Right: Chevron or Badge */}
                  <div>
                    {item.badge ? (
                      <span style={{
                        fontSize: 11,
                        color: '#94A3B8',
                        background: '#F1F5F9',
                        padding: '2px 8px',
                        borderRadius: 10,
                        fontWeight: 500,
                      }}>
                        {item.badge}
                      </span>
                    ) : item.isLogout ? null : (
                      <ChevronRight size={16} color="#CBD5E1" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* ── Toast Notification ── */}
      {toastMsg && (
        <div style={{
          position: 'sticky',
          bottom: 74,
          margin: '0 auto',
          width: 'max-content',
          background: '#0F172A',
          color: '#FFFFFF',
          padding: '8px 16px',
          borderRadius: 20,
          fontSize: 12,
          fontWeight: 600,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          zIndex: 100,
          whiteSpace: 'nowrap',
          animation: 'fadeIn 0.2s ease',
        }}>
          {toastMsg}
        </div>
      )}
    </div>
  )
}
