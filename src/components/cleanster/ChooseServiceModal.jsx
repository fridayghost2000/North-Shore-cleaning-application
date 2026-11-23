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
    }}>
      {/* Click outside backdrop to close */}
      <div
        onClick={() => setIsServiceModalOpen(false)}
        style={{ flex: 1, width: '100%' }}
      />

      {/* Bottom Sheet Card (Exactly 75% - 3/4th of screen height) */}
      <div style={{
        background: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        height: '75%',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        boxShadow: '0 -10px 30px rgba(0,0,0,0.15)',
        animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden',
      }}>
        {/* Top Header with Close X */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px 14px',
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
