import { useState } from 'react'
import { Home, Briefcase, ChevronRight } from 'lucide-react'

export default function RoleSelector({ onSelectRole }) {
  const [hoveredId, setHoveredId] = useState(null)

  const roles = [
    {
      id: 'customer',
      title: 'Customer',
      subtitle: 'Book & manage cleaning services',
      icon: Home,
      iconBg: '#EEF5FC',
      iconColor: '#0B4A8F',
      borderColor: '#0B4A8F',
    },
    {
      id: 'employee',
      title: 'Cleaner',
      subtitle: 'View shifts, task checklists & job timers',
      icon: Briefcase,
      iconBg: '#ECFDF5',
      iconColor: '#059669',
      borderColor: '#059669',
    },
  ]

  function handleSelect(roleId) {
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
        background: 'var(--app-ambient-bg)',
        fontFamily: 'Inter, sans-serif',
        padding: '36px 20px 24px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Top Brand Identity */}
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 60,
          height: 60,
          borderRadius: 18,
          background: '#FFFFFF',
          boxShadow: '0 8px 20px rgba(11, 74, 143, 0.08)',
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
          fontSize: 19,
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
          fontWeight: 400,
        }}>
          Choose your portal to continue
        </p>
      </div>

      {/* Minimalist Role Cards */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        width: '100%',
        margin: 'auto 0',
      }}>
        {roles.map((r) => {
          const IconComp = r.icon
          const isHovered = hoveredId === r.id

          return (
            <div
              key={r.id}
              onClick={() => handleSelect(r.id)}
              onMouseEnter={() => setHoveredId(r.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: '#FFFFFF',
                borderRadius: 16,
                border: isHovered ? `1.5px solid ${r.borderColor}` : '1.5px solid #E2E8F0',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: isHovered
                  ? '0 6px 16px rgba(11, 74, 143, 0.08)'
                  : '0 1px 3px rgba(0, 0, 0, 0.02)',
                transition: 'all 0.15s ease',
              }}
            >
              {/* Left: Icon + Titles */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 13,
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
                    fontSize: 15,
                    fontWeight: 700,
                    color: '#0F172A',
                    margin: '0 0 2px 0',
                    letterSpacing: '-0.2px',
                  }}>
                    {r.title}
                  </h2>
                  <p style={{
                    fontSize: 11.5,
                    color: '#64748B',
                    margin: 0,
                    fontWeight: 400,
                  }}>
                    {r.subtitle}
                  </p>
                </div>
              </div>

              {/* Right: Chevron */}
              <ChevronRight
                size={18}
                color={isHovered ? r.borderColor : '#CBD5E1'}
                style={{ transition: 'color 0.15s ease', flexShrink: 0 }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
