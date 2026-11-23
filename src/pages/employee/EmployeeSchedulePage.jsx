import { useState } from 'react'
import { useEmployee } from '../../context/EmployeeContext'
import { Clock, MapPin, CheckCircle2, ChevronRight, CalendarCheck2 } from 'lucide-react'

const weekDays = [
  { dayName: 'Mon', date: '24', isToday: true },
  { dayName: 'Tue', date: '25', isToday: false },
  { dayName: 'Wed', date: '26', isToday: false },
  { dayName: 'Thu', date: '27', isToday: false },
  { dayName: 'Fri', date: '28', isToday: false },
  { dayName: 'Sat', date: '29', isToday: false },
  { dayName: 'Sun', date: '30', isToday: false },
]

export default function EmployeeSchedulePage() {
  const { jobs, profile, setActiveJobId, setEmployeeTab } = useEmployee()
  const [selectedDate, setSelectedDate] = useState('24')

  const hasShifts = selectedDate === '24'

  function handleSelectJob(jobId) {
    setActiveJobId(jobId)
    setEmployeeTab('job')
  }

  return (
    <div style={{ padding: '16px 16px 28px', fontFamily: 'Inter, sans-serif' }}>
      {/* ── Employee Top Header Bar ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
      }}>
        {/* North Shore Clean Logo */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/logo_ (1).png"
            alt="North Shore Clean"
            style={{ height: 26, width: 'auto', objectFit: 'contain' }}
          />
        </div>

        {/* Shift Number */}
        <span style={{
          fontSize: 11.5,
          fontWeight: 600,
          color: '#0B4A8F',
          background: 'rgba(11, 74, 143, 0.08)',
          padding: '4px 10px',
          borderRadius: 12,
        }}>
          {hasShifts ? `${jobs.length} Shifts` : '0 Shifts'}
        </span>
      </div>

      {/* ── Week Calendar Strip (Minimalist) ── */}
      <div style={{
        display: 'flex',
        gap: 6,
        marginBottom: 18,
        background: '#FFFFFF',
        padding: '7px 6px',
        borderRadius: 14,
        border: '1px solid #F1F5F9',
      }}>
        {weekDays.map(item => {
          const isSelected = selectedDate === item.date
          return (
            <button
              key={item.date}
              onClick={() => setSelectedDate(item.date)}
              style={{
                flex: 1,
                border: 'none',
                borderRadius: 10,
                background: isSelected ? '#0B4A8F' : 'transparent',
                color: isSelected ? '#FFFFFF' : '#64748B',
                padding: '7px 0',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                transition: 'background 0.15s ease',
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 500, opacity: isSelected ? 0.9 : 0.7 }}>
                {item.dayName}
              </span>
              <span style={{ fontSize: 13, fontWeight: isSelected ? 700 : 600 }}>
                {item.date}
              </span>
              {item.isToday && !isSelected && (
                <span style={{
                  width: 3.5,
                  height: 3.5,
                  borderRadius: '50%',
                  background: '#0B4A8F',
                  marginTop: 1,
                }} />
              )}
            </button>
          )
        })}
      </div>

      {/* ── Assigned Shifts Header ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
      }}>
        <h2 style={{ fontSize: 13.5, fontWeight: 600, color: '#0F172A', margin: 0 }}>
          Assigned Shifts
        </h2>
        <span style={{ fontSize: 11, color: '#64748B' }}>
          Est. payout <strong style={{ color: '#0F172A', fontWeight: 600 }}>{hasShifts ? `$${profile.todayEarnings}` : '$0'}</strong>
        </span>
      </div>

      {/* ── Minimalist Job Cards List or Empty State ── */}
      {hasShifts ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {jobs.map(job => {
            const isInProgress = job.status === 'In Progress'
            const isCompleted = job.status === 'Completed'
            const completedCount = job.checklist.filter(c => c.done).length

            return (
              <div
                key={job.id}
                onClick={() => handleSelectJob(job.id)}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 14,
                  border: '1px solid #F1F5F9',
                  borderLeft: isInProgress ? '3px solid #0B4A8F' : '1px solid #F1F5F9',
                  padding: '14px 15px',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                  transition: 'border 0.15s ease',
                }}
              >
                {/* Card Top: Status & Time */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: isInProgress ? '#10B981' : isCompleted ? '#64748B' : '#94A3B8',
                    }} />
                    <span style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: isInProgress ? '#0F172A' : '#64748B',
                    }}>
                      {job.status}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11.5, color: '#64748B', fontWeight: 500 }}>
                    <Clock size={12} color="#94A3B8" />
                    <span>{job.startTime} – {job.endTime}</span>
                  </div>
                </div>

                {/* Title & Client */}
                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', margin: '0 0 2px 0' }}>
                  {job.title}
                </h3>
                <p style={{ fontSize: 11.5, color: '#64748B', margin: '0 0 9px 0' }}>
                  {job.clientName} · {job.serviceType}
                </p>

                {/* Address */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  fontSize: 11.5,
                  color: '#64748B',
                  marginBottom: (job.urgentNote && isInProgress) ? 9 : 11,
                }}>
                  <MapPin size={12} color="#94A3B8" style={{ flexShrink: 0 }} />
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {job.address}
                  </span>
                </div>

                {/* Minimal Note */}
                {job.urgentNote && isInProgress && (
                  <div style={{
                    background: '#F8FAFC',
                    borderRadius: 8,
                    padding: '7px 9px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 5,
                    fontSize: 11,
                    color: '#475569',
                    marginBottom: 10,
                    border: '1px solid #F1F5F9',
                  }}>
                    <span style={{ fontWeight: 600, color: '#0B4A8F', flexShrink: 0 }}>Note:</span>
                    <span>{job.urgentNote}</span>
                  </div>
                )}

                {/* Card Footer */}
                <div style={{
                  borderTop: '1px solid #F8FAFC',
                  paddingTop: 9,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <span style={{ fontSize: 11, color: '#94A3B8' }}>
                    Checklist {completedCount}/{job.checklist.length}
                  </span>

                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    fontSize: 11.5,
                    fontWeight: 600,
                    color: isInProgress ? '#0B4A8F' : '#64748B',
                  }}>
                    {isInProgress ? 'Resume Job' : 'Details'} <ChevronRight size={13} />
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div style={{
          background: '#FFFFFF',
          borderRadius: 16,
          padding: '38px 20px',
          textAlign: 'center',
          border: '1px solid #F1F5F9',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 6,
        }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: '#F1F5F9',
            color: '#0B4A8F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
            <CalendarCheck2 size={22} />
          </div>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', margin: '0 0 4px 0' }}>
            No shift for this day
          </h3>
          <p style={{ fontSize: 11.5, color: '#64748B', margin: 0 }}>
            You have no assigned shifts on this date.
          </p>
        </div>
      )}
    </div>
  )
}
