import { useCleanster } from '../../context/CleansterContext'
import {
  User, Phone, Mail, MapPin, Shield, CreditCard,
  ChevronRight, ExternalLink, HelpCircle, Bell
} from 'lucide-react'
import { northShoreCompany } from '../../data/cleansterData'

export default function AccountPage() {
  const { activeBooking, setIsReviewModalOpen } = useCleanster()

  return (
    <div style={{
      padding: '12px 16px 28px',
      fontFamily: 'Inter, sans-serif',
      background: '#F8FAFC',
      minHeight: '100%',
      boxSizing: 'border-box',
    }}>
      {/* ── Top Header ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
      }}>
        <h1 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: 0 }}>
          Account
        </h1>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: '#F1F5F9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Bell size={16} color="#0F172A" />
        </div>
      </div>

      {/* ── Customer Profile Card ── */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: 20,
        padding: '16px',
        border: '1px solid #EEF2F6',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        marginBottom: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
      }}>
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
          alt="Profile"
          style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }}
        />
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: '0 0 2px 0' }}>
            David Sterling
          </h2>
          <p style={{ fontSize: 11, color: '#64748B', margin: 0 }}>
            Member · Beverly, MA
          </p>
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            color: '#0B4A8F',
            background: '#EEF5FC',
            padding: '2px 8px',
            borderRadius: 6,
            marginTop: 4,
            display: 'inline-block',
          }}>
            North Shore VIP
          </span>
        </div>
      </div>

      {/* ── North Shore Clean Support & 24/7 Hotline Strip ── */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: 18,
        border: '1px solid #EEF2F6',
        padding: '16px',
        marginBottom: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
      }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 4 }}>
          North Shore Cleaning Systems, Inc.
        </span>
        <p style={{ fontSize: 11, color: '#64748B', margin: '0 0 12px 0', lineHeight: 1.4 }}>
          Commercial & residential janitorial provider serving Essex County, MA.
        </p>

        {/* 24-Hour Hotline Call Button */}
        <a
          href={`tel:${northShoreCompany.phone}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#0B4A8F', // North Shore brand blue
            color: '#FFFFFF',
            textDecoration: 'none',
            padding: '12px 16px',
            borderRadius: 12,
            fontWeight: 700,
            fontSize: 13,
            boxShadow: '0 4px 12px rgba(11, 74, 143, 0.35)',
            marginBottom: 8,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Phone size={16} />
            <span>24/7 Hotline: {northShoreCompany.phone}</span>
          </div>
          <span style={{ fontSize: 11, opacity: 0.9 }}>Call Now →</span>
        </a>

        {/* Email support */}
        <a
          href={`mailto:${northShoreCompany.email}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 10px',
            color: '#0F172A',
            textDecoration: 'none',
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          <Mail size={14} color="#64748B" />
          <span>{northShoreCompany.email}</span>
        </a>
      </div>

      {/* ── Menu List ── */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: 18,
        border: '1px solid #EEF2F6',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {[
          { label: 'Saved Addresses', sub: '100 Cummings Center, Beverly', icon: MapPin },
          { label: 'Payment Methods', sub: 'Visa ending in 4242', icon: CreditCard },
          { label: 'Review Recent Clean', sub: 'Rate cleaning quality & leave tip', icon: HelpCircle, onClick: () => setIsReviewModalOpen(true) },
          { label: 'Insurance & Guarantees', sub: 'Licensed & bonded in Massachusetts', icon: Shield },
        ].map((item, idx) => {
          const IconComponent = item.icon
          return (
            <div
              key={idx}
              onClick={item.onClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '13px 16px',
                borderBottom: idx < 3 ? '1px solid #F8FAFC' : 'none',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: '#F8FAFC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748B',
                }}>
                  <IconComponent size={16} />
                </div>
                <div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', display: 'block' }}>
                    {item.label}
                  </span>
                  <span style={{ fontSize: 10.5, color: '#94A3B8' }}>
                    {item.sub}
                  </span>
                </div>
              </div>

              <ChevronRight size={16} color="#CBD5E1" />
            </div>
          )
        })}
      </div>

      <div style={{ textAlign: 'center', color: '#CBD5E1', fontSize: 10, marginTop: 16 }}>
        Cleanster App · North Shore Cleaning Systems Edition
      </div>
    </div>
  )
}
