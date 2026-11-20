import { useState } from 'react'
import { useOps } from '../../context/DemoOpsContext'
import { Clock, MapPin, CheckCircle2, ChevronRight, Navigation, Sparkles } from 'lucide-react'

const weekDays = [
  { dayName: 'Mon', date: '17', isToday: false },
  { dayName: 'Tue', date: '18', isToday: false },
  { dayName: 'Wed', date: '19', isToday: false },
  { dayName: 'Thu', date: '20', isToday: true },
  { dayName: 'Fri', date: '21', isToday: false },
  { dayName: 'Sat', date: '22', isToday: false },
  { dayName: 'Sun', date: '23', isToday: false },
]

export default function CleanerSchedule({ onSelectJob }) {
  const { jobs, setSelectedJobId, currentCleaner } = useOps()
  const [selectedDate, setSelectedDate] = useState('20')

  // Sarah's assigned jobs
  const myJobs = jobs.filter(j => j.assignedTo.includes(currentCleaner.id))

  function handleOpenJob(jobId) {
    setSelectedJobId(jobId)
    onSelectJob()
  }

  return (
    <div style={{ padding: '14px 16px 24px', fontFamily: 'Inter, sans-serif' }}>
      {/* Header Info */}
      <div style={{ marginBottom: 14 }}>
        <h1 style={{ fontSize: 18, fontWeight: 800, color: '#111827', letterSpacing: '-0.4px', margin: '0 0 2px 0' }}>
          My Shifts & Schedule
        </h1>
        <p style={{ fontSize: 11, color: '#8A9BB0', margin: 0 }}>
          Assigned cleaning routes for {currentCleaner.name}
        </p>
      </div>

      {/* Week Calendar Strip (Customer-matching pill buttons) */}
      <div style={{
        display: 'flex',
        gap: 6,
        marginBottom: 16,
        background: '#FFFFFF',
        padding: '8px',
        borderRadius: 14,
        border: '1px solid #EEF2F6',
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
                background: isSelected ? '#00A99D' : 'transparent',
                color: isSelected ? '#FFFFFF' : '#4B5563',
                padding: '8px 2px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                transition: 'all 0.15s ease',
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 500, opacity: isSelected ? 0.9 : 0.6 }}>
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
                  background: isSelected ? '#FFFFFF' : '#00A99D',
                  marginTop: 1,
                }} />
              )}
            </button>
          )
        })}
      </div>

      {/* Job Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {myJobs.map(job => {
          const isInProgress = job.status === 'In Progress'
          const isCompleted = job.status === 'Completed'

          return (
            <div
              key={job.id}
              onClick={() => handleOpenJob(job.id)}
              style={{
                background: '#FFFFFF',
                borderRadius: 16,
                border: isInProgress ? '1.5px solid #00A99D' : '1px solid #EEF2F6',
                padding: '16px',
                cursor: 'pointer',
                boxShadow: isInProgress
                  ? '0 4px 16px rgba(0, 169, 157, 0.12)'
                  : '0 2px 8px rgba(0, 0, 0, 0.03)',
                transition: 'transform 0.1s ease',
              }}
            >
              {/* Card Header: Status & Time */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: 6,
                  background: isInProgress ? '#E0F7F6' : isCompleted ? '#F3F4F6' : '#EBF5FB',
                  color: isInProgress ? '#00A99D' : isCompleted ? '#4B5563' : '#2196C9',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}>
                  {isInProgress && (
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#00A99D' }} />
                  )}
                  {isCompleted && <CheckCircle2 size={11} />}
                  {job.status}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: '#111827' }}>
                  <Clock size={12} color="#8A9BB0" />
                  <span>{job.startTime} – {job.endTime}</span>
                </div>
              </div>

              {/* Title & Client Name */}
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: '0 0 2px 0' }}>
                {job.title}
              </h3>
              <p style={{ fontSize: 12, color: '#6B7280', margin: '0 0 8px 0' }}>
                {job.clientName}
              </p>

              {/* Address */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                fontSize: 11,
                color: '#4B5563',
                marginBottom: 12,
              }}>
                <MapPin size={12} color="#00A99D" style={{ flexShrink: 0 }} />
                <span>{job.address}</span>
              </div>

              {/* Footer */}
              <div style={{
                borderTop: '1px solid #F3F4F6',
                paddingTop: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: 11, color: '#8A9BB0' }}>
                  Est. duration: {job.durationEst}
                </span>
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  fontSize: 11,
                  fontWeight: 600,
                  color: isInProgress ? '#00A99D' : '#2196C9',
                }}>
                  {isInProgress ? 'Resume Job' : 'View Details'} <ChevronRight size={13} />
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
