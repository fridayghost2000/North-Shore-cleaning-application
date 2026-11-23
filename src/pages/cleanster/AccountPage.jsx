import { useState } from 'react'
import { useCleanster } from '../../context/CleansterContext'
import {
  Home, AlertTriangle, Rocket,
  CreditCard, Bell, Gift,
  HelpCircle, LogOut, ChevronRight, MessageCircle, Phone, X, Check
} from 'lucide-react'
import { northShoreCompany } from '../../data/cleansterData'

export default function AccountPage() {
  const { setActiveTab } = useCleanster()
  const [activeModal, setActiveModal] = useState(null)
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
          action: () => setActiveModal('properties'),
        },
        {
          id: 'problems',
          label: 'Property Problems',
          icon: AlertTriangle,
          action: () => setActiveModal('problems'),
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
          action: () => setActiveModal('cleaners'),
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
          action: () => setActiveModal('billing'),
        },
        {
          id: 'notifications',
          label: 'Notification',
          icon: Bell,
          action: () => setActiveModal('notifications'),
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
          action: () => setActiveModal('help'),
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
          action: () => setActiveModal('logout'),
        },
      ],
    },
  ]

  return (
    <div style={{
      fontFamily: 'Inter, sans-serif',
      background: '#F8FAFC',
      minHeight: '100%',
      boxSizing: 'border-box',
      position: 'relative',
      paddingBottom: 76,
    }}>
      {/* ── Top Navigation Bar ── */}
      <div style={{
        padding: '14px 16px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <h1 style={{
          fontSize: 20,
          fontWeight: 800,
          color: '#0F172A',
          margin: 0,
          letterSpacing: '-0.4px',
        }}>
          Account
        </h1>

        {/* 24/7 Hotline Pill (Single line, perfectly proportioned) */}
        <a
          href={`tel:${northShoreCompany.phone}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 12px',
            borderRadius: 20,
            background: '#EEF5FC',
            border: '1px solid #D0E3F5',
            color: '#0B4A8F',
            fontSize: 11.5,
            fontWeight: 700,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            boxShadow: '0 1px 3px rgba(11, 74, 143, 0.08)',
          }}
        >
          <Phone size={12} strokeWidth={2.4} />
          <span>24/7 Hotline</span>
        </a>
      </div>

      {/* ── Professional Profile Card ── */}
      <div style={{ padding: '0 16px 14px' }}>
        <div style={{
          background: '#FFFFFF',
          borderRadius: 16,
          padding: '14px 16px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
              alt="David Sterling"
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1.5px solid #EEF2F6',
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 1,
              right: 1,
              width: 11,
              height: 11,
              borderRadius: '50%',
              background: '#10B981',
              border: '2px solid #FFFFFF',
            }} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <h2 style={{
                fontSize: 15,
                fontWeight: 700,
                color: '#0F172A',
                margin: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                David Sterling
              </h2>
              <span style={{
                fontSize: 9.5,
                fontWeight: 700,
                color: '#0B4A8F',
                background: '#EEF5FC',
                border: '1px solid #D0E3F5',
                padding: '1px 6px',
                borderRadius: 6,
                letterSpacing: '0.3px',
                flexShrink: 0,
              }}>
                VIP
              </span>
            </div>
            <p style={{
              fontSize: 11.5,
              color: '#64748B',
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              North Shore Cleaning Systems
            </p>
            <p style={{
              fontSize: 10.5,
              color: '#94A3B8',
              margin: '2px 0 0 0',
            }}>
              Beverly, MA · Client #NS-4820
            </p>
          </div>

          <ChevronRight size={18} color="#CBD5E1" style={{ flexShrink: 0 }} />
        </div>
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

      {/* ── Floating Live Concierge Chat Button (Screenshot Bottom-Right) ── */}
      <button
        onClick={() => setActiveTab('messages')}
        title="Chat with North Shore Clean Support"
        style={{
          position: 'sticky',
          bottom: 16,
          marginLeft: 'auto',
          marginRight: 16,
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: '#0B4A8F', // North Shore primary blue
          color: '#FFFFFF',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(11, 74, 143, 0.4)',
          cursor: 'pointer',
          zIndex: 35,
          transition: 'transform 0.15s ease',
        }}
      >
        <MessageCircle size={22} fill="#FFFFFF" color="#0B4A8F" />
      </button>

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

      {/* ── Simple Interactive Dialog Modals for Menu Items ── */}
      {activeModal && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.45)',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(2px)',
        }}>
          <div
            onClick={() => setActiveModal(null)}
            style={{ flex: 1, width: '100%' }}
          />

          <div style={{
            background: '#FFFFFF',
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
            padding: '18px 20px 28px',
            boxSizing: 'border-box',
            maxHeight: '75%',
            overflowY: 'auto',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', margin: 0 }}>
                {activeModal === 'properties' && 'Managed Properties'}
                {activeModal === 'problems' && 'Report Property Problem'}
                {activeModal === 'cleaners' && 'Assigned Cleaners'}
                {activeModal === 'billing' && 'Payment & Billing'}
                {activeModal === 'notifications' && 'Notification Settings'}
                {activeModal === 'help' && 'North Shore Clean Help Center'}
                {activeModal === 'logout' && 'Confirm Sign Out'}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#64748B' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body Content */}
            {activeModal === 'properties' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ padding: 12, borderRadius: 12, border: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', display: 'block' }}>
                    100 Cummings Center, Suite 425C
                  </span>
                  <span style={{ fontSize: 11, color: '#64748B' }}>
                    Beverly, MA 01915 · Commercial Headquarters
                  </span>
                </div>
                <div style={{ padding: 12, borderRadius: 12, border: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', display: 'block' }}>
                    84 Cabot Street, Apt 3B
                  </span>
                  <span style={{ fontSize: 11, color: '#64748B' }}>
                    Beverly, MA 01915 · Short-term Rental
                  </span>
                </div>
              </div>
            )}

            {activeModal === 'problems' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p style={{ fontSize: 12, color: '#64748B', margin: 0 }}>
                  Report broken fixtures, missing supplies, or deep stains directly to the dispatch desk:
                </p>
                <textarea
                  rows={3}
                  placeholder="Describe the issue at your property..."
                  style={{
                    width: '100%',
                    padding: 10,
                    borderRadius: 10,
                    border: '1px solid #CBD5E1',
                    fontSize: 12,
                    fontFamily: 'Inter, sans-serif',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
                <button
                  onClick={() => { setActiveModal(null); showToast('Problem report submitted to ops!') }}
                  style={{
                    padding: '12px',
                    borderRadius: 10,
                    background: '#0B4A8F',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  Submit Issue Report
                </button>
              </div>
            )}

            {activeModal === 'cleaners' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 12, background: '#F8FAFC' }}>
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                    alt="William N."
                    style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: 13, fontWeight: 700, margin: 0, color: '#0F172A' }}>William N.</h4>
                    <span style={{ fontSize: 11, color: '#64748B' }}>Lead Janitorial Specialist · ★ 4.9</span>
                  </div>
                  <button
                    onClick={() => { setActiveModal(null); setActiveTab('messages') }}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 14,
                      background: '#0B4A8F',
                      color: '#FFFFFF',
                      border: 'none',
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Chat
                  </button>
                </div>
              </div>
            )}

            {activeModal === 'billing' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ padding: 12, borderRadius: 12, border: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', display: 'block' }}>
                    Payment Method
                  </span>
                  <span style={{ fontSize: 11, color: '#64748B' }}>
                    Visa •••• 4242 (Default auto-pay)
                  </span>
                </div>
                <div style={{ padding: 12, borderRadius: 12, border: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', display: 'block' }}>
                    Billing Address
                  </span>
                  <span style={{ fontSize: 11, color: '#64748B' }}>
                    100 Cummings Center, Suite 425C, Beverly MA 01915
                  </span>
                </div>
              </div>
            )}

            {activeModal === 'help' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a
                  href={`tel:${northShoreCompany.phone}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 12,
                    borderRadius: 12,
                    background: '#0B4A8F',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  <span>24/7 Hotline: {northShoreCompany.phone}</span>
                  <span>Call Now →</span>
                </a>
                <p style={{ fontSize: 11, color: '#64748B', margin: 0, lineHeight: 1.4 }}>
                  Office hours: Monday–Friday 7am–7pm. Emergency 24/7 on-call service across Essex County, MA.
                </p>
              </div>
            )}

            {activeModal === 'logout' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <p style={{ fontSize: 12, color: '#64748B', margin: 0 }}>
                  Are you sure you want to sign out of your North Shore Cleanster account?
                </p>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    onClick={() => setActiveModal(null)}
                    style={{
                      flex: 1,
                      padding: 12,
                      borderRadius: 10,
                      border: '1px solid #CBD5E1',
                      background: '#FFFFFF',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => { setActiveModal(null); showToast('Signed out successfully!') }}
                    style={{
                      flex: 1,
                      padding: 12,
                      borderRadius: 10,
                      background: '#DC2626',
                      color: '#FFFFFF',
                      border: 'none',
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}

            {activeModal === 'notifications' && (
              <div style={{ textAlign: 'center', padding: '16px 0', color: '#64748B', fontSize: 12 }}>
                <p style={{ margin: '0 0 12px 0' }}>Connected to North Shore Clean Enterprise Suite.</p>
                <button
                  onClick={() => setActiveModal(null)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: 16,
                    background: '#0B4A8F',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
