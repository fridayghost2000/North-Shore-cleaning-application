import { useCleanster } from '../../context/CleansterContext'
import {
  X, ChevronRight, BedDouble, Building, Home,
  Briefcase, Sparkles, Armchair
} from 'lucide-react'

const iconMap = {
  BedDouble,
  Building,
  Home,
  Briefcase,
  Sparkles,
  Armchair,
}

export default function ChooseServiceModal() {
  const { isServiceModalOpen, setIsServiceModalOpen, cleansterServices, openServiceBooking } = useCleanster()

  if (!isServiceModalOpen) return null

  return (
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
      backdropFilter: 'blur(3px)',
      overflow: 'hidden',
    }}>
      {/* ── Top Space Hero Image (Spotless modern interior as in reference) ── */}
      <div
        onClick={() => setIsServiceModalOpen(false)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '28%',
          cursor: 'pointer',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&auto=format&fit=crop&q=80"
          onError={(e) => { e.currentTarget.src = '/kitchen-after.jpg' }}
          alt="Pristine Clean Living Space"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 35%',
            display: 'block',
          }}
        />
        {/* Subtle dark gradient overlay at top edge */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 36,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.25), transparent)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Click outside backdrop */}
      <div
        onClick={() => setIsServiceModalOpen(false)}
        style={{ flex: 1, width: '100%', zIndex: 1 }}
      />

      {/* Bottom Sheet Card (74% height with clean rounded top corners) */}
      <div style={{
        background: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        height: '74%',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        boxShadow: '0 -10px 32px rgba(0,0,0,0.18)',
        animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* iOS Drag Handle Pill (as in reference 2nd image) */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 8,
          paddingBottom: 2,
          flexShrink: 0,
        }}>
          <div style={{
            width: 36,
            height: 4,
            borderRadius: 2,
            background: '#CBD5E1',
          }} />
        </div>

        {/* Top Header with Close X */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 18px 12px',
          borderBottom: '1px solid #F1F5F9',
          flexShrink: 0,
          position: 'relative',
        }}>
          <button
            onClick={() => setIsServiceModalOpen(false)}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: '#F1F5F9',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748B',
            }}
          >
            <X size={18} />
          </button>

          <h2 style={{
            fontSize: 15,
            fontWeight: 700,
            color: '#111827',
            margin: 0,
            position: 'absolute',
            left: 0,
            right: 0,
            textAlign: 'center',
            pointerEvents: 'none',
          }}>
            Choose a cleaning service
          </h2>

          <div style={{ width: 32 }} />
        </div>

        {/* List of Services (Fitted evenly into 75% sheet with NO scrollbar) */}
        <div
          className="scrollbar-hide"
          style={{
            flex: 1,
            overflowY: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            padding: '6px 16px 14px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
          }}
        >
          {cleansterServices.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Home
            const isLast = index === cleansterServices.length - 1

            return (
              <div
                key={service.id}
                onClick={() => openServiceBooking(service)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 10px',
                  borderRadius: 12,
                  cursor: 'pointer',
                  borderBottom: isLast ? 'none' : '1px solid #F8FAFC',
                  transition: 'background 0.12s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {/* Left Icon + Text */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: 11,
                    background: service.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <IconComponent size={19} color={service.color} />
                  </div>

                  <div>
                    <h3 style={{
                      fontSize: 13.5,
                      fontWeight: 700,
                      color: '#0F172A',
                      margin: '0 0 1px 0',
                    }}>
                      {service.title}
                    </h3>
                    <p style={{
                      fontSize: 11,
                      color: '#64748B',
                      margin: 0,
                      lineHeight: 1.25,
                    }}>
                      {service.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right Chevron */}
                <ChevronRight size={17} color="#CBD5E1" />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
