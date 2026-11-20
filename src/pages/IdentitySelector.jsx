import { useState } from 'react'
import { useIdentity } from '../context/IdentityContext'
import { Home, Sparkles, Shield, ChevronRight } from 'lucide-react'

const portals = [
  {
    id: 'customer',
    title: "I'm a Customer",
    subtitle: 'Book & manage cleaning services',
    icon: Home,
    iconBg: '#2196C9', // North Shore Brand Blue
    activeBorder: '#2196C9',
  },
  {
    id: 'cleaner',
    title: "I'm a Cleaner",
    subtitle: 'Daily schedule & job check-in',
    icon: Sparkles,
    iconBg: '#00A99D', // Teal
    activeBorder: '#00A99D',
  },
  {
    id: 'admin',
    title: "I'm an Admin",
    subtitle: 'Team calendar & live dispatch',
    icon: Shield,
    iconBg: '#0F172A', // Slate / Navy
    activeBorder: '#0F172A',
  },
]

export default function IdentitySelector() {
  const { chooseIdentity } = useIdentity()
  const [hoveredId, setHoveredId] = useState('customer')

  function handleSelect(roleId) {
    chooseIdentity(roleId)
  }

  return (
    <div
      className="scrollbar-hide"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg, #132238 0%, #0B1524 60%, #050B12 100%)',
        padding: '16px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        fontFamily: 'Inter, sans-serif',
        position: 'relative',
      }}
    >
      {/* Background Soft Ambient Light */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 240,
        height: 240,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(33, 150, 201, 0.22) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />

      {/* Floating White Card (Exact Image 1 Style) */}
      <div style={{
        width: '100%',
        maxWidth: 324,
        background: '#FFFFFF',
        borderRadius: 28,
        padding: '24px 18px 22px',
        boxSizing: 'border-box',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Top App Logo Container */}
        <div style={{
          width: 124,
          height: 54,
          borderRadius: 16,
          background: '#FFFFFF',
          border: '1.5px solid #EEF2F6',
          boxShadow: '0 6px 20px rgba(33, 150, 201, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6px 12px',
          boxSizing: 'border-box',
          marginBottom: 14,
        }}>
          <img
            src="/logo_ (1).png"
            alt="North Shore Clean"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

        {/* Heading */}
        <h1 style={{
          fontSize: 18,
          fontWeight: 800,
          color: '#0F172A',
          letterSpacing: '-0.3px',
          margin: '0 0 4px 0',
          textAlign: 'center',
        }}>
          Welcome to North Shore Clean
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 12,
          color: '#64748B',
          margin: '0 0 20px 0',
          textAlign: 'center',
          fontWeight: 500,
        }}>
          Choose your portal to continue
        </p>

        {/* Portals List (Image 1 Style with Icon Container + Title + Chevron) */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {portals.map(portal => {
            const isHovered = hoveredId === portal.id
            const IconComponent = portal.icon

            return (
              <div
                key={portal.id}
                onClick={() => handleSelect(portal.id)}
                onMouseEnter={() => setHoveredId(portal.id)}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  background: isHovered ? '#FAFCFF' : '#FFFFFF',
                  borderRadius: 18,
                  border: isHovered
                    ? `2px solid ${portal.activeBorder}`
                    : '1.5px solid #E2E8F0',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: isHovered
                    ? `0 4px 14px ${portal.activeBorder}18`
                    : '0 1px 3px rgba(0, 0, 0, 0.02)',
                }}
              >
                {/* Left: Dark Rounded Icon Container + Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 42,
                    height: 42,
                    borderRadius: 13,
                    background: portal.iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    flexShrink: 0,
                  }}>
                    <IconComponent size={20} strokeWidth={2.2} />
                  </div>

                  <div>
                    <span style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: '#0F172A',
                      display: 'block',
                      letterSpacing: '-0.2px',
                    }}>
                      {portal.title}
                    </span>
                    <span style={{
                      fontSize: 10.5,
                      color: '#64748B',
                      display: 'block',
                      marginTop: 1,
                    }}>
                      {portal.subtitle}
                    </span>
                  </div>
                </div>

                {/* Right: Chevron Arrow */}
                <ChevronRight
                  size={18}
                  color={isHovered ? portal.activeBorder : '#94A3B8'}
                  strokeWidth={2.4}
                  style={{ transition: 'color 0.15s ease', flexShrink: 0 }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
