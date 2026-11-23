import { useState } from 'react'
import { useEmployee } from '../../context/EmployeeContext'
import { Clock, MapPin, CheckCircle2, ChevronRight, Navigation, Sparkles, AlertCircle, ArrowLeftRight } from 'lucide-react'

const weekDays = [
  { dayName: 'Mon', date: '24', isToday: true },
  { dayName: 'Tue', date: '25', isToday: false },
  { dayName: 'Wed', date: '26', isToday: false },
  { dayName: 'Thu', date: '27', isToday: false },
  { dayName: 'Fri', date: '28', isToday: false },
  { dayName: 'Sat', date: '29', isToday: false },
  { dayName: 'Sun', date: '30', isToday: false },
]

export default function EmployeeSchedulePage({ onSwitchRole }) {
  const { jobs, profile, setActiveJobId, setEmployeeTab } = useEmployee()
  const [selectedDate, setSelectedDate] = useState('24')

  function handleSelectJob(jobId) {
    setActiveJobId(jobId)
    setEmployeeTab('job')
  }

  return (
    <div style={{ padding: '14px 16px 24px', fontFamily: 'Inter, sans-serif' }}>
      {/* Employee Top Header Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img
            src={profile.avatar}
            alt={profile.name}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #0B4A8F',
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <h1 style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', margin: 0 }}>
                {profile.name}
              </h1>
              <span style={{
                fontSize: 9.5,
                fontWeight: 700,
                color: '#059669',
                background: '#ECFDF5',
                padding: '1px 6px',
                borderRadius: 8,
              }}>
                On Shift
              </span>
            </div>
            <p style={{ fontSize: 11, color: '#64748B', margin: '2px 0 0 0' }}>
              {profile.role}
            </p>
          </div>
        </div>

        {/* Switch Role Button */}
        {onSwitchRole && (
          <button
            onClick={onSwitchRole}
            title="Switch Portal"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              padding: '6px 10px',
              borderRadius: 14,
              background: '#EEF5FC',
              border: '1px solid #D0E3F5',
              color: '#0B4A8F',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <ArrowLeftRight size={12} />
            <span>Switch Portal</span>
          </button>
        )}
      </div>

      {/* Week Calendar Strip */}
      <div style={{
        display: 'flex',
        gap: 6,
        marginBottom: 16,
        background: '#FFFFFF',
        padding: '8px',
        borderRadius: 16,
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
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
                color: isSelected ? '#FFFFFF' : '#475569',
                padding: '8px 2px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                transition: 'all 0.12s ease',
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 500, opacity: isSelected ? 0.9 : 0.7 }}>
                {item.dayName}
              </span>
              <span style={{ fontSize: 13, fontWeight: 700 }}>
                {item.date}
              </span>
              {item.isToday && (
                <span style={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: isSelected ? '#FFFFFF' : '#0B4A8F',
                  marginTop: 1,
                }} />
              )}
            </button>
          )
        })}
      </div>

      {/* Today's Shifts Header & Metrics */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
      }}>
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', margin: 0 }}>
            Today's Assigned Jobs
          </h2>
          <span style={{ fontSize: 11, color: '#64748B' }}>
            3 shifts scheduled · Est. 7.5 hrs
          </span>
        </div>

        <span style={{
          fontSize: 11.5,
          fontWeight: 700,
          color: '#059669',
          background: '#DCFCE7',
          padding: '3px 8px',
          borderRadius: 10,
        }}>
          Est. ${profile.todayEarnings}
        </span>
      </div>

      {/* Job Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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
                borderRadius: 18,
                border: isInProgress ? '2px solid #0B4A8F' : '1px solid #E2E8F0',
                padding: '16px',
                cursor: 'pointer',
                boxShadow: isInProgress
                  ? '0 6px 18px rgba(11, 74, 143, 0.12)'
                  : '0 2px 8px rgba(0,0,0,0.02)',
                transition: 'all 0.15s ease',
              }}
            >
              {/* Card Top: Status & Time */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: 8,
                  background: isInProgress ? '#EFF6FF' : isCompleted ? '#F1F5F9' : '#F8FAFC',
                  color: isInProgress ? '#0B4A8F' : isCompleted ? '#475569' : '#0284C7',
                  border: isInProgress ? '1px solid #BFDBFE' : '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                }}>
                  {isInProgress && (
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                  )}
                  {isCompleted && <CheckCircle2 size={12} />}
                  {job.status}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: '#0F172A' }}>
                  <Clock size={13} color="#64748B" />
                  <span>{job.startTime} – {job.endTime}</span>
                </div>
              </div>

              {/* Title & Client */}
              <h3 style={{ fontSize: 14.5, fontWeight: 700, color: '#0F172A', margin: '0 0 2px 0' }}>
                {job.title}
              </h3>
              <p style={{ fontSize: 12, color: '#64748B', margin: '0 0 10px 0' }}>
                {job.clientName} · <span style={{ color: '#0B4A8F', fontWeight: 600 }}>{job.serviceType}</span>
              </p>

              {/* Address */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 11.5,
                color: '#334155',
                marginBottom: 12,
              }}>
                <MapPin size={13} color="#0B4A8F" style={{ flexShrink: 0 }} />
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {job.address}
                </span>
              </div>

              {/* Urgent Note Badge if exists */}
              {job.urgentNote && isInProgress && (
                <div style={{
                  background: '#FEF3C7',
                  borderRadius: 10,
                  padding: '8px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 11,
                  color: '#92400E',
                  marginBottom: 12,
                }}>
                  <AlertCircle size={14} color="#D97706" style={{ flexShrink: 0 }} />
                  <span>{job.urgentNote}</span>
                </div>
              )}

              {/* Card Footer: Checklist Progress & CTA */}
              <div style={{
                borderTop: '1px solid #F1F5F9',
                paddingTop: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: 11, color: '#64748B' }}>
                  Checklist: <strong style={{ color: '#0F172A' }}>{completedCount}/{job.checklist.length} done</strong>
                </span>

                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: isInProgress ? '#0B4A8F' : '#64748B',
                }}>
                  {isInProgress ? 'Resume Job' : 'Open Details'} <ChevronRight size={14} />
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
