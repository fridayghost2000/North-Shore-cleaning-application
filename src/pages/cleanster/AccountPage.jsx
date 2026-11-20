import { useState } from 'react'
import { useCleanster } from '../../context/CleansterContext'
import {
  Home, Package, AlertTriangle, UserCheck, Rocket,
  CreditCard, Handshake, LayoutGrid, Bell, Gift,
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

  // Exact 12 Menu Items from Cleanster Screenshot
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
          id: 'inventory',
          label: 'Inventory',
          icon: Package,
          badge: 'Coming Soon',
          action: () => showToast('Inventory tracking is coming soon!'),
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
      id: 'team-group',
      items: [
        {
          id: 'teammates',
          label: 'Teammates',
          icon: UserCheck,
          action: () => setActiveModal('teammates'),
        },
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
          id: 'partners',
          label: 'Partners',
          icon: Handshake,
          highlight: true,
          action: () => setActiveModal('partners'),
        },
        {
          id: 'integrations',
          label: 'Integrations',
          icon: LayoutGrid,
          action: () => setActiveModal('integrations'),
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
      background: '#FFFFFF',
      minHeight: '100%',
      boxSizing: 'border-box',
      position: 'relative',
      paddingBottom: 70,
    }}>
      {/* ── Top Header & Profile Strip ── */}
      <div style={{
        padding: '14px 16px 12px',
        borderBottom: '1px solid #F1F5F9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#FFFFFF',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
            alt="David Sterling"
            style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', margin: 0 }}>
              David Sterling
            </h2>
            <p style={{ fontSize: 11, color: '#64748B', margin: 0 }}>
              {northShoreCompany.name}
            </p>
          </div>
        </div>

        {/* 24/7 Hotline Call Pill */}
        <a
          href={`tel:${northShoreCompany.phone}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '6px 10px',
            borderRadius: 16,
            background: '#EEF5FC',
            color: '#0B4A8F',
            fontSize: 11,
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          <Phone size={12} />
          <span>24/7 Hotline</span>
        </a>
      </div>

      {/* ── Exact Cleanster Account Menu List (Image Matching) ── */}
      <div style={{ width: '100%' }}>
        {menuGroups.map((group, groupIndex) => (
          <div key={group.id}>
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
                    padding: '13px 16px',
                    borderBottom: isLastInGroup ? 'none' : '1px solid #F8FAFC',
                    cursor: 'pointer',
                    background: item.highlight ? '#F8FAFC' : '#FFFFFF',
                    transition: 'background 0.15s ease',
                  }}
                >
                  {/* Left: Rounded Square Icon + Label */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: '#F1F5F9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: item.badge ? '#94A3B8' : '#475569',
                      flexShrink: 0,
                    }}>
                      <IconComp size={18} strokeWidth={1.9} />
                    </div>

                    <span style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: item.isLogout ? '#DC2626' : '#1E293B',
                      letterSpacing: '-0.1px',
                    }}>
                      {item.label}
                    </span>
                  </div>

                  {/* Right: Chevron or "Coming Soon" */}
                  <div>
                    {item.badge ? (
                      <span style={{
                        fontSize: 12,
                        color: '#94A3B8',
                        fontWeight: 400,
                      }}>
                        {item.badge}
                      </span>
                    ) : item.isLogout ? null : (
                      <ChevronRight size={17} color="#94A3B8" />
                    )}
                  </div>
                </div>
              )
            })}

            {/* Separator Divider between groups (as in screenshot) */}
            {groupIndex < menuGroups.length - 1 && (
              <div style={{ height: 1, background: '#EEF2F6', width: '100%' }} />
            )}
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
                {activeModal === 'teammates' && 'Team & Property Access'}
                {activeModal === 'cleaners' && 'Assigned Cleaners'}
                {activeModal === 'billing' && 'Payment & Billing'}
                {activeModal === 'partners' && 'North Shore Cleaning Partners'}
                {activeModal === 'integrations' && 'Platform Integrations'}
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

            {['teammates', 'partners', 'integrations', 'notifications'].includes(activeModal) && (
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
