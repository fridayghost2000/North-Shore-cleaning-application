import { useState } from 'react'
import { useCleanster } from '../../context/CleansterContext'
import {
  Bell, Send, Star, MapPin, Clock,
  Calendar, CheckCircle2, ChevronRight, AlertCircle, FileText
} from 'lucide-react'

export default function BookingsPage() {
  const {
    bookingFilter,
    setBookingFilter,
    timeFilter,
    setTimeFilter,
    activeBooking,
    upcomingBookings,
    pastBookings,
    setActiveTab,
    setIsPhotosModalOpen,
    setIsReviewModalOpen,
    setAccountModal,
  } = useCleanster()

  const [hoursAlert, setHoursAlert] = useState(false)
  const [expenseAlert, setExpenseAlert] = useState(false)

  const isUpcoming = bookingFilter === 'Upcoming'
  const displayBookings = isUpcoming ? upcomingBookings : pastBookings

  return (
    <div style={{
      padding: '12px 16px 24px',
      fontFamily: 'Inter, sans-serif',
      background: 'transparent',
      minHeight: '100%',
      boxSizing: 'border-box',
    }}>
      {/* ── Top Header ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14,
        position: 'relative',
        minHeight: 34,
      }}>
        {/* North Shore Clean Logo */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          background: '#FFFFFF',
          padding: '4px 10px',
          borderRadius: 12,
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
        }}>
          <img
            src="/logo_ (1).png"
            alt="North Shore Clean"
            style={{ height: 22, width: 'auto', objectFit: 'contain', display: 'block' }}
          />
        </div>

        {/* Notification Bell with red dot badge */}
        <div style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          cursor: 'pointer',
        }}>
          <Bell size={18} color="#0F172A" />
          <span style={{
            position: 'absolute',
            top: 5,
            right: 5,
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: '#0B4A8F', // North Shore blue dot
            border: '1.5px solid #FFFFFF',
          }} />
        </div>
      </div>

      {/* ── Segmented Toggle: Upcoming | Complete (Image 1) ── */}
      <div style={{
        display: 'flex',
        background: '#E2E8F0',
        padding: '3px',
        borderRadius: 20,
        marginBottom: 14,
      }}>
        <button
          onClick={() => setBookingFilter('Upcoming')}
          style={{
            flex: 1,
            padding: '7px 0',
            borderRadius: 18,
            border: 'none',
            background: isUpcoming ? '#FFFFFF' : 'transparent',
            color: isUpcoming ? '#0F172A' : '#64748B',
            fontWeight: isUpcoming ? 700 : 500,
            fontSize: 12,
            cursor: 'pointer',
            boxShadow: isUpcoming ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
            transition: 'all 0.15s ease',
          }}
        >
          Upcoming
        </button>

        <button
          onClick={() => setBookingFilter('Complete')}
          style={{
            flex: 1,
            padding: '7px 0',
            borderRadius: 18,
            border: 'none',
            background: !isUpcoming ? '#FFFFFF' : 'transparent',
            color: !isUpcoming ? '#0F172A' : '#64748B',
            fontWeight: !isUpcoming ? 700 : 500,
            fontSize: 12,
            cursor: 'pointer',
            boxShadow: !isUpcoming ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
            transition: 'all 0.15s ease',
          }}
        >
          Complete
        </button>
      </div>

      {/* ── Time Filter Pills: Today | Tomorrow | Week | All (Image 1) ── */}
      <div style={{
        display: 'flex',
        gap: 6,
        marginBottom: 14,
        overflowX: 'auto',
      }} className="scrollbar-hide">
        {['Today', 'Tomorrow', 'Week', 'All'].map(chip => {
          const isActive = timeFilter === chip
          return (
            <button
              key={chip}
              onClick={() => setTimeFilter(chip)}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                border: 'none',
                background: isActive ? '#FFFFFF' : '#F1F5F9',
                color: isActive ? '#0F172A' : '#64748B',
                fontWeight: isActive ? 700 : 500,
                fontSize: 11,
                cursor: 'pointer',
                boxShadow: isActive ? '0 2px 6px rgba(0,0,0,0.05)' : 'none',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              {chip}
            </button>
          )
        })}
      </div>

      {/* ── ACTIVE LIVE TRACKER CARD (Exact Image 1 Layout) ── */}
      {isUpcoming && timeFilter === 'Today' && activeBooking && (
        <div style={{
          background: '#FFFFFF',
          borderRadius: 20,
          border: '1px solid #EEF2F6',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden',
          marginBottom: 16,
        }}>
          {/* 1. Mini Map Route Preview with ETA */}
          <div style={{
            height: 110,
            background: 'linear-gradient(135deg, #EEF4F8 0%, #E2EDF5 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Simulated Map Streets */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.35 }}>
              <path d="M-20 30 Q 100 50 200 20 T 400 60" stroke="#94A3B8" strokeWidth="6" fill="none" />
              <path d="M40 -10 L 120 120 M 180 -10 L 260 120" stroke="#CBD5E1" strokeWidth="4" fill="none" />
            </svg>

            {/* Simulated Route Dashed Line */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
              <path
                d="M 120 70 L 160 45 L 230 40"
                stroke="#0284C7"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                fill="none"
              />
            </svg>

            {/* Origin Pin (Blue Pulse) */}
            <div style={{
              position: 'absolute',
              top: 60,
              left: 112,
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: '#0284C7',
              border: '2px solid #FFFFFF',
              boxShadow: '0 2px 6px rgba(2, 132, 199, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFFFFF' }} />
            </div>

            {/* Destination Pin (Black Marker) */}
            <div style={{
              position: 'absolute',
              top: 30,
              left: 226,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}>
              <div style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: '#0F172A',
                border: '2px solid #FFFFFF',
              }} />
            </div>

            {/* "5 mins" Arrival Badge */}
            <div style={{
              position: 'absolute',
              top: 10,
              right: 12,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(4px)',
              padding: '4px 10px',
              borderRadius: 14,
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 11,
              fontWeight: 700,
              color: '#0F172A',
            }}>
              <Clock size={12} color="#0F172A" />
              <span>{activeBooking.estimatedArrival}</span>
            </div>

            {/* Street Label */}
            <div style={{
              position: 'absolute',
              bottom: 8,
              left: 12,
              fontSize: 10,
              color: '#64748B',
              fontWeight: 600,
            }}>
              Cummings Center · Beverly, MA
            </div>
          </div>

          {/* 2. Progress Line: Arrived & Badge */}
          <div style={{ padding: '12px 14px 4px' }}>
            <div style={{
              height: 4,
              background: '#F1F5F9',
              borderRadius: 2,
              position: 'relative',
              marginBottom: 8,
            }}>
              {/* Brand Blue Progress Line */}
              <div style={{
                width: '65%',
                height: '100%',
                background: '#0B4A8F',
                borderRadius: 2,
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  right: -4,
                  top: -3,
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: '#0B4A8F',
                  border: '2px solid #FFFFFF',
                }} />
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#0B4A8F' }}>
                Arrived on Site
              </span>
            </div>

            {/* 3. Cleaner Profile Row: Avatar, Name, Rating & Message Button */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 14,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img
                  src={activeBooking.cleaner.avatar}
                  alt={activeBooking.cleaner.name}
                  style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', margin: 0 }}>
                    {activeBooking.cleaner.name}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 1 }}>
                    <Star size={11} fill="#F59E0B" color="#F59E0B" />
                    <span style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>
                      {activeBooking.cleaner.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Brand Blue "Message >" Button */}
              <button
                onClick={() => setActiveTab('messages')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '6px 12px',
                  borderRadius: 20,
                  background: '#EEF5FC',
                  border: '1px solid #D0E3F5',
                  color: '#0B4A8F',
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                <span>Message</span>
                <Send size={11} />
              </button>
            </div>

            {/* 4. Quick Action Pills (Expenses, Photos, Hours, Checklist) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 6,
              marginBottom: 12,
            }}>
              <button
                onClick={() => { setExpenseAlert(true); setTimeout(() => setExpenseAlert(false), 2000) }}
                style={{
                  padding: '7px 2px',
                  borderRadius: 12,
                  border: '1px solid #EEF2F6',
                  background: '#FFFFFF',
                  color: '#0B4A8F',
                  fontSize: 10.5,
                  fontWeight: 700,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  cursor: 'pointer',
                }}
              >
                {expenseAlert ? '$70 Req' : 'Expenses'}
              </button>

              <button
                onClick={() => setIsPhotosModalOpen(true)}
                style={{
                  padding: '7px 2px',
                  borderRadius: 12,
                  border: '1px solid #EEF2F6',
                  background: '#FFFFFF',
                  color: '#0B4A8F',
                  fontSize: 10.5,
                  fontWeight: 700,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  cursor: 'pointer',
                }}
              >
                Photos
              </button>

              <button
                onClick={() => { setHoursAlert(true); setTimeout(() => setHoursAlert(false), 2000) }}
                style={{
                  padding: '7px 2px',
                  borderRadius: 12,
                  border: '1px solid #EEF2F6',
                  background: '#FFFFFF',
                  color: '#0B4A8F',
                  fontSize: 10.5,
                  fontWeight: 700,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  cursor: 'pointer',
                }}
              >
                {hoursAlert ? '1h 45m' : 'Hours'}
              </button>

              <button
                onClick={() => setActiveTab('checklist')}
                style={{
                  padding: '7px 2px',
                  borderRadius: 12,
                  border: '1px solid #EEF2F6',
                  background: '#FFFFFF',
                  color: '#0B4A8F',
                  fontSize: 10.5,
                  fontWeight: 700,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  cursor: 'pointer',
                }}
              >
                Checklist
              </button>
            </div>

            {/* 5. Sub-tabs bar (Receipt, Problems, Inventory, Help) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              padding: '10px 0 6px',
              borderTop: '1px solid #F8FAFC',
              fontSize: 11,
              fontWeight: 600,
              color: '#64748B',
            }}>
              <span style={{ cursor: 'pointer' }}>Receipt</span>
              <span style={{ cursor: 'pointer' }} onClick={() => setIsReviewModalOpen(true)}>Problems</span>
              <span style={{ cursor: 'pointer' }}>Inventory</span>
              <span onClick={() => setAccountModal('help')} style={{ cursor: 'pointer' }}>Help</span>
            </div>
          </div>
        </div>
      )}

      {/* ── UPCOMING / COMPLETE BOOKINGS CARDS (Image 1 Style) ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {displayBookings.map(b => (
          <div
            key={b.id}
            style={{
              background: '#FFFFFF',
              borderRadius: 18,
              border: '1px solid #EEF2F6',
              padding: '14px 16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              position: 'relative',
            }}
          >
            {/* Top row: Date Circle Badge + Title + Price + Status */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* Brand Blue Date Circle Badge */}
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: '#0B4A8F', // North Shore brand blue circle
                  color: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  lineHeight: 1.1,
                  boxShadow: '0 2px 6px rgba(11, 74, 143, 0.25)',
                }}>
                  <span style={{ fontSize: 13, fontWeight: 800 }}>{b.dateBadge.day}</span>
                  <span style={{ fontSize: 8.5, fontWeight: 700 }}>{b.dateBadge.month}</span>
                </div>

                <div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', display: 'block' }}>
                    {b.dateString}
                  </span>
                  <span style={{ fontSize: 11, color: '#64748B', marginTop: 1, display: 'block' }}>
                    {b.serviceTitle}
                  </span>
                </div>
              </div>

              {/* Price & Status */}
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', display: 'block' }}>
                  ${b.price.toFixed(2)}
                </span>
                <span style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: b.statusColor || '#D97706',
                }}>
                  {b.status}
                </span>
              </div>
            </div>

            {/* Time Window */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 11,
              color: '#64748B',
              marginBottom: 4,
            }}>
              <Clock size={12} color="#94A3B8" />
              <span>{b.timeWindow}</span>
            </div>

            {/* Address */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 11,
              color: '#64748B',
            }}>
              <MapPin size={12} color="#94A3B8" style={{ flexShrink: 0 }} />
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {b.address}
              </span>
            </div>

            {/* Review button if Complete */}
            {!isUpcoming && (
              <div style={{ marginTop: 10, paddingTop: 8, borderTop: '1px solid #F8FAFC', textAlign: 'right' }}>
                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  style={{
                    background: '#EEF5FC',
                    border: '1px solid #D0E3F5',
                    color: '#0B4A8F',
                    padding: '4px 12px',
                    borderRadius: 14,
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Rate & Review Clean
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
