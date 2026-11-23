import { useState, useEffect } from 'react'
import { useCleanster } from '../../context/CleansterContext'
import { X, Phone } from 'lucide-react'
import { northShoreCompany } from '../../data/cleansterData'

export default function AccountModal() {
  const {
    accountModal,
    setAccountModal,
    accountProfile,
    setAccountProfile,
    setActiveTab,
  } = useCleanster()

  const [editForm, setEditForm] = useState({ ...accountProfile })
  const [problemText, setProblemText] = useState('')
  const [toastMsg, setToastMsg] = useState(null)

  useEffect(() => {
    if (accountProfile) {
      setEditForm({ ...accountProfile })
    }
  }, [accountProfile, accountModal])

  if (!accountModal) return null

  function showToast(msg) {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 2500)
  }

  function handleSaveProfile() {
    setAccountProfile({ ...editForm })
    setAccountModal(null)
  }

  function handleClose() {
    setAccountModal(null)
  }

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.45)',
      zIndex: 60,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      backdropFilter: 'blur(3px)',
    }}>
      {/* Click outside backdrop to close */}
      <div
        onClick={handleClose}
        style={{ flex: 1, width: '100%' }}
      />

      {/* Bottom Sheet Card (Slides directly up to visible viewport, zero scrolling needed) */}
      <div style={{
        background: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: '18px 20px 28px',
        boxSizing: 'border-box',
        maxHeight: '85%',
        overflowY: 'auto',
        boxShadow: '0 -10px 30px rgba(0,0,0,0.15)',
        animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        {/* Header with Title & Close X */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
          position: 'relative',
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', margin: 0 }}>
            {accountModal === 'properties' && 'Managed Properties'}
            {accountModal === 'problems' && 'Report Property Problem'}
            {accountModal === 'cleaners' && 'Assigned Cleaners'}
            {accountModal === 'billing' && 'Payment & Billing'}
            {accountModal === 'notifications' && 'Notification Settings'}
            {accountModal === 'help' && 'North Shore Clean Help Center'}
            {accountModal === 'logout' && 'Confirm Sign Out'}
            {accountModal === 'edit-profile' && 'Edit Account Profile'}
          </h3>

          <button
            onClick={handleClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: '#F1F5F9',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748B',
            }}
          >
            <X size={17} />
          </button>
        </div>

        {/* Modal Bodies */}
        {accountModal === 'properties' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ padding: 14, borderRadius: 12, border: '1px solid #E2E8F0', background: '#F8FAFC' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', display: 'block' }}>
                100 Cummings Center, Suite 425C
              </span>
              <span style={{ fontSize: 11, color: '#64748B', marginTop: 2, display: 'block' }}>
                Beverly, MA 01915 · Commercial Headquarters
              </span>
            </div>
            <div style={{ padding: 14, borderRadius: 12, border: '1px solid #E2E8F0', background: '#F8FAFC' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', display: 'block' }}>
                84 Cabot Street, Apt 3B
              </span>
              <span style={{ fontSize: 11, color: '#64748B', marginTop: 2, display: 'block' }}>
                Beverly, MA 01915 · Short-term Rental
              </span>
            </div>
          </div>
        )}

        {accountModal === 'problems' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ fontSize: 12, color: '#64748B', margin: 0 }}>
              Report broken fixtures, supplies replenishment, or deep stains directly to operations:
            </p>
            <textarea
              rows={3}
              value={problemText}
              onChange={e => setProblemText(e.target.value)}
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
              onClick={() => {
                handleClose()
              }}
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

        {accountModal === 'cleaners' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 12, background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
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
                onClick={() => {
                  handleClose()
                  setActiveTab('messages')
                }}
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

        {accountModal === 'billing' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ padding: 14, borderRadius: 12, border: '1px solid #E2E8F0', background: '#F8FAFC' }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', display: 'block' }}>
                Primary Payment Card
              </span>
              <span style={{ fontSize: 11, color: '#64748B', marginTop: 2, display: 'block' }}>
                Visa •••• 4242 (Auto-pay enabled)
              </span>
            </div>
            <div style={{ padding: 14, borderRadius: 12, border: '1px solid #E2E8F0', background: '#F8FAFC' }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', display: 'block' }}>
                Billing Address
              </span>
              <span style={{ fontSize: 11, color: '#64748B', marginTop: 2, display: 'block' }}>
                100 Cummings Center, Suite 425C, Beverly MA 01915
              </span>
            </div>
          </div>
        )}

        {accountModal === 'help' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a
              href={`tel:${northShoreCompany.phone}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                borderRadius: 12,
                background: '#0B4A8F',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Phone size={16} />
                <span>24/7 Hotline: {northShoreCompany.phone}</span>
              </div>
              <span>Call Now →</span>
            </a>
            <p style={{ fontSize: 11, color: '#64748B', margin: 0, lineHeight: 1.4 }}>
              Office hours: Monday–Friday 7am–7pm. Emergency 24/7 on-call dispatch across Essex County, MA.
            </p>
          </div>
        )}

        {accountModal === 'logout' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>
              Are you sure you want to sign out of your North Shore Clean account?
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <button
                onClick={handleClose}
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
                onClick={handleClose}
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

        {accountModal === 'notifications' && (
          <div style={{ textAlign: 'center', padding: '16px 0', color: '#64748B', fontSize: 12 }}>
            <p style={{ margin: '0 0 14px 0' }}>Push and SMS notifications are enabled for booking updates.</p>
            <button
              onClick={handleClose}
              style={{
                padding: '8px 24px',
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

        {accountModal === 'edit-profile' && (
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
              onClick={handleSaveProfile}
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
      </div>
    </div>
  )
}
