import { useState } from 'react'
import { Home, Sparkles, ChevronRight, ShieldCheck, ArrowRight } from 'lucide-react'

export default function RoleSelector({ onSelectRole }) {
  const [selectedRole, setSelectedRole] = useState(null)

  const roles = [
    {
      id: 'customer',
      title: 'I am a Customer',
      badge: 'Client Portal',
      description: 'Book cleanings, track cleaners, view checklists & make payments.',
      icon: Home,
      iconBg: '#EEF5FC',
      iconColor: '#0B4A8F',
      accentColor: '#0B4A8F',
      features: ['Book residential & commercial cleanings', 'Real-time booking status & checklists', 'Direct messaging with cleaners'],
    },
    {
      id: 'employee',
      title: 'I am an Employee',
      badge: 'Field Staff',
      description: 'View assigned shift schedule, live job timers, checklists & upload media proof.',
      icon: Sparkles,
      iconBg: '#ECFDF5',
      iconColor: '#059669',
      accentColor: '#059669',
      features: ['Daily route schedule & address navigation', 'Live shift check-in & job timers', 'Task checklists & Before/After photos'],
    },
  ]

  function handleContinue(roleId) {
    if (onSelectRole) {
      onSelectRole(roleId)
    }
  }

  return (
    <div
      className="scrollbar-hide"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#F8FAFC',
        fontFamily: 'Inter, sans-serif',
        padding: '24px 20px 20px',
        boxSizing: 'border-box',
        overflowY: 'auto',
        position: 'relative',
      }}
    >
      {/* Top Header & Brand Identity */}
      <div style={{ textAlign: 'center', marginTop: 12 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 64,
          height: 64,
          borderRadius: 20,
          background: '#FFFFFF',
          boxShadow: '0 8px 24px rgba(11, 74, 143, 0.12)',
          border: '1px solid #E2E8F0',
          padding: 8,
          marginBottom: 16,
        }}>
          <img
            src="/logo_ (1).png"
            alt="North Shore Clean"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

        <h1 style={{
          fontSize: 20,
          fontWeight: 800,
          color: '#0F172A',
          letterSpacing: '-0.3px',
          margin: '0 0 6px 0',
        }}>
          North Shore Clean
        </h1>

        <p style={{
          fontSize: 13,
          color: '#64748B',
          margin: 0,
          lineHeight: 1.4,
        }}>
          Welcome! Please choose how you would like to continue:
        </p>
      </div>

      {/* Role Option Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: '24px 0' }}>
        {roles.map((r) => {
          const IconComp = r.icon
          const isSelected = selectedRole === r.id

          return (
            <div
              key={r.id}
              onClick={() => {
                setSelectedRole(r.id)
                handleContinue(r.id)
              }}
              style={{
                background: '#FFFFFF',
                borderRadius: 20,
                border: isSelected ? `2px solid ${r.accentColor}` : '1.5px solid #E2E8F0',
                padding: '18px 16px',
                cursor: 'pointer',
                boxShadow: isSelected
                  ? '0 10px 24px rgba(11, 74, 143, 0.12)'
                  : '0 2px 8px rgba(0,0,0,0.03)',
                transition: 'all 0.15s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = isSelected
                  ? '0 10px 24px rgba(11, 74, 143, 0.12)'
                  : '0 2px 8px rgba(0,0,0,0.03)'
              }}
            >
              {/* Header inside card: Icon + Badge + Title */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    background: r.iconBg,
                    color: r.iconColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <IconComp size={22} strokeWidth={2.2} />
                  </div>

                  <div>
                    <h2 style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: '#0F172A',
                      margin: '0 0 2px 0',
                    }}>
                      {r.title}
                    </h2>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: r.iconColor,
                      background: r.iconBg,
                      padding: '2px 8px',
                      borderRadius: 12,
                      letterSpacing: '0.2px',
                    }}>
                      {r.badge}
                    </span>
                  </div>
                </div>

                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: '#F8FAFC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748B',
                }}>
                  <ChevronRight size={18} />
                </div>
              </div>

              {/* Description */}
              <p style={{
                fontSize: 12,
                color: '#64748B',
                margin: '0 0 12px 0',
                lineHeight: 1.45,
              }}>
                {r.description}
              </p>

              {/* Bullet Features */}
              <div style={{
                borderTop: '1px solid #F1F5F9',
                paddingTop: 10,
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
              }}>
                {r.features.map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#475569' }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: r.iconColor }} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom Switch Note */}
      <div style={{ textAlign: 'center', paddingBottom: 6 }}>
        <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>
          You can seamlessly switch roles anytime inside the app settings.
        </p>
      </div>
    </div>
  )
}
