import { useState } from 'react'
import { ChevronLeft, ChevronRight, X, Calendar as CalendarIcon } from 'lucide-react'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const WEEKDAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

// Sample booked appointments per Year-Month key
const APPOINTMENT_MAP = {
  '2026-9':  [14, 21, 28],             // October 2026
  '2026-10': [24, 27, 28],             // November 2026
  '2026-11': [2, 5, 12, 18, 23, 29],   // December 2026
  '2027-0':  [4, 9, 15, 21, 28],       // January 2027
  '2027-1':  [3, 10, 17, 24],          // February 2027
  '2027-2':  [2, 8, 16, 23, 30],       // March 2027
}

export default function EmployeeCalendarModal({ isOpen, onClose, selectedDate, onSelectDate }) {
  // Start on November 2026 (0-indexed month: 10)
  const [monthIndex, setMonthIndex] = useState(10)
  const [year, setYear] = useState(2026)

  if (!isOpen) return null

  function handlePrevMonth() {
    if (monthIndex === 0) {
      setMonthIndex(11)
      setYear(prev => prev - 1)
    } else {
      setMonthIndex(prev => prev - 1)
    }
  }

  function handleNextMonth() {
    if (monthIndex === 11) {
      setMonthIndex(0)
      setYear(prev => prev + 1)
    } else {
      setMonthIndex(prev => prev + 1)
    }
  }

  // Dynamic calendar math for current month and year
  const firstDayOfWeek = new Date(year, monthIndex, 1).getDay() // 0 = Sunday
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate() // 28, 29, 30, or 31
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const blanks = Array.from({ length: firstDayOfWeek }, (_, i) => i)

  const monthKey = `${year}-${monthIndex}`
  const appointmentsThisMonth = APPOINTMENT_MAP[monthKey] || [7, 14, 21, 28]

  return (
    <div
      onClick={onClose}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15, 23, 42, 0.45)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        animation: 'fadeIn 0.15s ease',
      }}
    >
      {/* Shadcn-Style Calendar Card */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 328,
          background: '#FFFFFF',
          borderRadius: 20,
          border: '1px solid #E2E8F0',
          boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.22), 0 4px 12px rgba(0, 0, 0, 0.05)',
          padding: '18px 16px 16px',
          fontFamily: 'Inter, sans-serif',
          animation: 'scaleUp 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Card Header: Month Nav & Close */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 14,
          padding: '0 2px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <CalendarIcon size={16} color="#0B4A8F" />
            <span style={{ fontSize: 14.5, fontWeight: 700, color: '#0F172A' }}>
              {MONTH_NAMES[monthIndex]} {year}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {/* Backward month button */}
            <button
              onClick={handlePrevMonth}
              title="Previous month"
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                border: '1px solid #E2E8F0',
                background: '#FFFFFF',
                color: '#64748B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.12s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
              onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}
            >
              <ChevronLeft size={15} />
            </button>

            {/* Forward month button (shows Dec, Jan, etc.) */}
            <button
              onClick={handleNextMonth}
              title="Next month"
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                border: '1px solid #E2E8F0',
                background: '#FFFFFF',
                color: '#64748B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.12s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
              onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}
            >
              <ChevronRight size={15} />
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              title="Close calendar"
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                border: 'none',
                background: '#F1F5F9',
                color: '#64748B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                marginLeft: 4,
                transition: 'background 0.12s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#E2E8F0'}
              onMouseLeave={e => e.currentTarget.style.background = '#F1F5F9'}
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Weekday Column Headers (Shadcn style) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          marginBottom: 8,
          textAlign: 'center',
        }}>
          {WEEKDAY_NAMES.map(day => (
            <span
              key={day}
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: '#94A3B8',
                padding: '4px 0',
              }}
            >
              {day}
            </span>
          ))}
        </div>

        {/* Days Grid (7 columns) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px 3px',
          marginBottom: 14,
          minHeight: 216,
        }}>
          {blanks.map(i => (
            <div key={`blank-${i}`} style={{ height: 36 }} />
          ))}

          {daysArray.map(day => {
            const dayStr = String(day)
            const isSelected = selectedDate === dayStr && monthIndex === 10 && year === 2026
            const hasAppointment = appointmentsThisMonth.includes(day)
            const isToday = day === 24 && monthIndex === 10 && year === 2026

            return (
              <button
                key={day}
                onClick={() => {
                  onSelectDate(dayStr)
                  onClose()
                }}
                style={{
                  height: 36,
                  border: isToday && !isSelected ? '1.5px solid #0B4A8F' : 'none',
                  borderRadius: 10,
                  background: isSelected ? '#0B4A8F' : 'transparent',
                  color: isSelected ? '#FFFFFF' : hasAppointment ? '#0F172A' : '#475569',
                  fontWeight: isSelected || hasAppointment ? 700 : 500,
                  fontSize: 12.5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  padding: 0,
                  outline: 'none',
                  transition: 'all 0.12s ease',
                }}
                onMouseEnter={e => {
                  if (!isSelected) e.currentTarget.style.background = '#F8FAFC'
                }}
                onMouseLeave={e => {
                  if (!isSelected) e.currentTarget.style.background = 'transparent'
                }}
              >
                <span>{day}</span>

                {/* Appointment Dot Indicator (bs dot lga hoga) */}
                {hasAppointment && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 3.5,
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: isSelected ? '#FFFFFF' : '#0B4A8F',
                    }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Legend & View All Booked Shifts Button */}
        <div style={{
          borderTop: '1px solid #F1F5F9',
          paddingTop: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: '#0B4A8F',
              display: 'inline-block',
            }} />
            <span style={{ fontSize: 11, color: '#64748B', fontWeight: 500 }}>
              Shift booked
            </span>
          </div>

          <button
            onClick={() => {
              onSelectDate('all')
              onClose()
            }}
            style={{
              border: 'none',
              background: 'rgba(11, 74, 143, 0.08)',
              color: '#0B4A8F',
              fontSize: 11.5,
              fontWeight: 600,
              padding: '6px 12px',
              borderRadius: 8,
              cursor: 'pointer',
              transition: 'background 0.12s ease',
            }}
          >
            All Booked Shifts
          </button>
        </div>
      </div>
    </div>
  )
}
