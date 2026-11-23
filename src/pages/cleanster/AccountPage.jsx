import { useState } from 'react'
import { useCleanster } from '../../context/CleansterContext'
import {
  Home, AlertTriangle, Rocket,
  CreditCard, Bell, Gift,
  HelpCircle, LogOut, ChevronRight, Phone, X, Check
} from 'lucide-react'
import { northShoreCompany } from '../../data/cleansterData'

export default function AccountPage() {
  const { setActiveTab } = useCleanster()
  const [activeModal, setActiveModal] = useState(null)
  const [toastMsg, setToastMsg] = useState(null)

  // Profile data matching user reference image
  const [profile, setProfile] = useState({
    name: 'akash k',
    email: 'friday.ghost2000@gmail.com',
    phone: '+91 919990919453',
  })
  const [editForm, setEditForm] = useState({ ...profile })

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
          onClick={() => {
            setEditForm({ ...profile })
            setActiveModal('edit-profile')
          }}
          style={{
            background: 'none',
            border: 'none',
            color: '#FA2A70', // Cleanster pink Edit button
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            padding: 0,
          }}
        >
          Edit
        </button>
      </div>

      {/* ── Centered Profile Area (Matching Image) ── */}
      <div style={{
        background: '#FFFFFF',
        padding: '28px 16px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: 14,
        borderBottom: '1px solid #F1F5F9',
      }}>
        {/* Solid Blue Circle Avatar */}
        <div style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: '#1976D2',
          marginBottom: 14,
        }} />

        {/* User Name */}
        <h2 style={{
          fontSize: 16,
          fontWeight: 600,
          color: '#0F172A',
          margin: '0 0 5px 0',
          letterSpacing: '-0.2px',
        }}>
          {profile.name}
        </h2>

        {/* User Email */}
        <p style={{
          fontSize: 13,
          color: '#475569',
          margin: '0 0 3px 0',
          fontWeight: 400,
        }}>
          {profile.email}
        </p>

        {/* User Phone */}
        <p style={{
          fontSize: 13,
          color: '#475569',
          margin: 0,
          fontWeight: 400,
        }}>
          {profile.phone}
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
                {activeModal === 'edit-profile' && 'Edit Account Profile'}
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
            {activeModal === 'edit-profile' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 4 }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 10,
                      border: '1px solid #CBD5E1',
                      fontSize: 13,
                      boxSizing: 'border-box',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 4 }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 10,
                      border: '1px solid #CBD5E1',
                      fontSize: 13,
                      boxSizing: 'border-box',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 4 }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 10,
                      border: '1px solid #CBD5E1',
                      fontSize: 13,
                      boxSizing: 'border-box',
                      outline: 'none',
                    }}
                  />
                </div>

                <button
                  onClick={() => {
                    setProfile({ ...editForm })
                    setActiveModal(null)
                    showToast('Profile updated successfully!')
                  }}
                  style={{
                    padding: '12px',
                    borderRadius: 12,
                    background: '#0B4A8F',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: 'pointer',
                    marginTop: 4,
                  }}
                >
                  Save Changes
                </button>
              </div>
            )}

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
