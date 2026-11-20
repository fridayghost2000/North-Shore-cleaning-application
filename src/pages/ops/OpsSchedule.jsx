import { useState } from 'react'
import { useOps } from '../../context/DemoOpsContext'
import { Calendar, Clock, MapPin, CheckCircle2, ChevronRight, User, AlertCircle } from 'lucide-react'

const weekDays = [
  { dayName: 'Mon', date: '17', isToday: false },
  { dayName: 'Tue', date: '18', isToday: false },
  { dayName: 'Wed', date: '19', isToday: false },
  { dayName: 'Thu', date: '20', isToday: true },
  { dayName: 'Fri', date: '21', isToday: false },
  { dayName: 'Sat', date: '22', isToday: false },
  { dayName: 'Sun', date: '23', isToday: false },
]

export default function OpsSchedule() {
  const { role, jobs, setSelectedJobId, setActiveTab, mockCleaners, currentCleaner, checkIn } = useOps()
  const [selectedDay, setSelectedDay] = useState('20')
  const [staffFilter, setStaffFilter] = useState('all')

  // Filter jobs based on role & staffFilter
  const filteredJobs = jobs.filter(job => {
    if (role === 'cleaner') {
      return job.assignedTo.includes(currentCleaner.id)
    }
    if (staffFilter === 'all') return true
    return job.assignedTo.includes(staffFilter)
  })

  function handleSelectJob(jobId) {
    setSelectedJobId(jobId)
    setActiveTab('job')
  }

  return (
    <div style={{ padding: '16px 14px 24px', fontFamily: 'Inter, sans-serif' }}>
      {/* Title & View Subtext */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.4px', margin: 0 }}>
              {role === 'admin' ? 'Master Schedule' : 'My Schedule'}
            </h1>
            <p style={{ fontSize: 12, color: '#64748B', marginTop: 2, margin: 0 }}>
              {role === 'admin'
                ? 'All staff assignments, hours & site locations'
                : 'Your assigned cleaning shifts for today'}
            </p>
          </div>
          <span style={{
            fontSize: 11,
            fontWeight: 600,
            padding: '4px 8px',
            borderRadius: 6,
            background: '#F1F5F9',
            color: '#475569',
          }}>
            {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'}
          </span>
        </div>
      </div>

      {/* Week Calendar Strip (Minimalist) */}
      <div style={{
        display: 'flex',
        gap: 6,
        marginBottom: 16,
        background: '#FFFFFF',
        padding: '8px',
        borderRadius: 12,
        border: '1px solid #EEF2F6',
      }}>
        {weekDays.map(item => {
          const isSelected = selectedDay === item.date
          return (
            <button
              key={item.date}
              onClick={() => setSelectedDay(item.date)}
              style={{
                flex: 1,
                border: 'none',
                borderRadius: 8,
                background: isSelected ? '#0F172A' : 'transparent',
                color: isSelected ? '#FFFFFF' : '#475569',
                padding: '8px 4px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                transition: 'all 0.15s ease',
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 500, opacity: isSelected ? 0.8 : 0.6 }}>
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
                  background: isSelected ? '#38BDF8' : '#0D9488',
                  marginTop: 1,
                }} />
              )}
            </button>
          )
        })}
      </div>

      {/* Admin Staff Filter Chips (Client: "I want everybody's schedules visible") */}
      {role === 'admin' && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Filter by Staff Member
          </div>
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }} className="scrollbar-hide">
            <button
              onClick={() => setStaffFilter('all')}
              style={{
                flexShrink: 0,
                padding: '5px 12px',
                borderRadius: 20,
                border: '1px solid',
                borderColor: staffFilter === 'all' ? '#0F172A' : '#E2E8F0',
                background: staffFilter === 'all' ? '#0F172A' : '#FFFFFF',
                color: staffFilter === 'all' ? '#FFFFFF' : '#475569',
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              All Team ({mockCleaners.length})
            </button>
            {mockCleaners.map(cleaner => {
              const isSelected = staffFilter === cleaner.id
              return (
                <button
                  key={cleaner.id}
                  onClick={() => setStaffFilter(cleaner.id)}
                  style={{
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '4px 10px',
                    borderRadius: 20,
                    border: '1px solid',
                    borderColor: isSelected ? cleaner.color : '#E2E8F0',
                    background: isSelected ? `${cleaner.color}15` : '#FFFFFF',
                    color: isSelected ? cleaner.color : '#475569',
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={cleaner.avatar}
                    alt={cleaner.name}
                    style={{ width: 16, height: 16, borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <span>{cleaner.name.split(' ')[0]}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Job Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filteredJobs.length === 0 ? (
          <div style={{
            background: '#FFFFFF',
            borderRadius: 12,
            border: '1px dashed #CBD5E1',
            padding: '36px 16px',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#475569', margin: 0 }}>
              No jobs scheduled for this selection
            </p>
            <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 4, margin: 0 }}>
              Select a different day or staff member.
            </p>
          </div>
        ) : (
          filteredJobs.map(job => {
            const isInProgress = job.status === 'In Progress'
            const isCompleted = job.status === 'Completed'

            return (
              <div
                key={job.id}
                onClick={() => handleSelectJob(job.id)}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 14,
                  border: isInProgress ? '1px solid #0D9488' : '1px solid #EEF2F6',
                  boxShadow: isInProgress
                    ? '0 2px 8px rgba(13,148,136,0.12)'
                    : '0 1px 3px rgba(0,0,0,0.02)',
                  padding: '14px',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.15s ease',
                }}
              >
                {/* Status Bar Indicator */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 6,
                      background: isInProgress ? '#ECFDF5' : isCompleted ? '#F1F5F9' : '#EFF6FF',
                      color: isInProgress ? '#047857' : isCompleted ? '#475569' : '#1D4ED8',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}>
                      {isInProgress && (
                        <span style={{
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          background: '#10B981',
                        }} />
                      )}
                      {isCompleted && <CheckCircle2 size={11} />}
                      {job.status}
                    </span>
                    <span style={{ fontSize: 11, color: '#64748B', fontWeight: 500 }}>
                      {job.durationEst}
                    </span>
                  </div>

                  {/* Time Window */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: '#0F172A' }}>
                    <Clock size={12} color="#64748B" />
                    <span>{job.startTime} – {job.endTime}</span>
                  </div>
                </div>

                {/* Job Title & Client */}
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', margin: '0 0 2px 0' }}>
                  {job.title}
                </h3>
                <p style={{ fontSize: 12, color: '#475569', margin: '0 0 8px 0', fontWeight: 500 }}>
                  {job.clientName}
                </p>

                {/* Location with Icon */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  fontSize: 11,
                  color: '#64748B',
                  marginBottom: 12,
                }}>
                  <MapPin size={12} color="#0D9488" style={{ flexShrink: 0 }} />
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {job.address}
                  </span>
                </div>

                {/* Footer: Assigned Staff & CTA */}
                <div style={{
                  borderTop: '1px solid #F8FAFC',
                  paddingTop: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ display: 'flex', marginLeft: 4 }}>
                      {job.assignedTo.map((cleanerId, idx) => {
                        const cleaner = mockCleaners.find(c => c.id === cleanerId)
                        if (!cleaner) return null
                        return (
                          <img
                            key={cleanerId}
                            src={cleaner.avatar}
                            alt={cleaner.name}
                            title={cleaner.name}
                            style={{
                              width: 22,
                              height: 22,
                              borderRadius: '50%',
                              border: '1.5px solid #FFFFFF',
                              marginLeft: idx > 0 ? -6 : 0,
                              objectFit: 'cover',
                            }}
                          />
                        )
                      })}
                    </div>
                    <span style={{ fontSize: 11, color: '#64748B' }}>
                      {job.assignedTo.map(id => mockCleaners.find(c => c.id === id)?.name.split(' ')[0]).join(', ')}
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    fontSize: 11,
                    fontWeight: 600,
                    color: isInProgress ? '#0D9488' : '#0F172A',
                  }}>
                    <span>{isInProgress ? 'In Progress' : 'View Job'}</span>
                    <ChevronRight size={13} />
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
