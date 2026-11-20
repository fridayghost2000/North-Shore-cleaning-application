import { useState } from 'react'
import { useOps } from '../../context/DemoOpsContext'
import { Clock, MapPin, CheckCircle2, ChevronRight, Users } from 'lucide-react'

const weekDays = [
  { dayName: 'Mon', date: '17', isToday: false },
  { dayName: 'Tue', date: '18', isToday: false },
  { dayName: 'Wed', date: '19', isToday: false },
  { dayName: 'Thu', date: '20', isToday: true },
  { dayName: 'Fri', date: '21', isToday: false },
  { dayName: 'Sat', date: '22', isToday: false },
  { dayName: 'Sun', date: '23', isToday: false },
]

export default function AdminSchedule() {
  const { jobs, mockCleaners } = useOps()
  const [selectedDate, setSelectedDate] = useState('20')
  const [staffFilter, setStaffFilter] = useState('all')

  const visibleJobs = jobs.filter(j => {
    if (staffFilter === 'all') return true
    return j.assignedTo.includes(staffFilter)
  })

  return (
    <div style={{ padding: '14px 16px 28px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ marginBottom: 14 }}>
        <h1 style={{ fontSize: 18, fontWeight: 800, color: '#111827', letterSpacing: '-0.4px', margin: '0 0 2px 0' }}>
          Master Team Calendar
        </h1>
        <p style={{ fontSize: 11, color: '#8A9BB0', margin: 0 }}>
          All cleaners, active shifts, times and site locations
        </p>
      </div>

      {/* Week Calendar */}
      <div style={{
        display: 'flex',
        gap: 6,
        marginBottom: 14,
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
                background: isSelected ? '#4F46E5' : 'transparent',
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
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: isSelected ? '#FFFFFF' : '#4F46E5', marginTop: 1 }} />
              )}
            </button>
          )
        })}
      </div>

      {/* Staff Member Filter Chips */}
      <div style={{ marginBottom: 16 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 6 }}>
          Filter By Cleaner:
        </span>
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }} className="scrollbar-hide">
          <button
            onClick={() => setStaffFilter('all')}
            style={{
              flexShrink: 0,
              padding: '6px 14px',
              borderRadius: 20,
              border: 'none',
              background: staffFilter === 'all' ? '#4F46E5' : '#FFFFFF',
              color: staffFilter === 'all' ? '#FFFFFF' : '#4B5563',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            All Cleaners ({mockCleaners.length})
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
                  padding: '5px 12px',
                  borderRadius: 20,
                  border: isSelected ? '1.5px solid #4F46E5' : '1px solid #E5E7EB',
                  background: isSelected ? '#EEF2FF' : '#FFFFFF',
                  color: isSelected ? '#4F46E5' : '#4B5563',
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <img src={cleaner.avatar} alt={cleaner.name} style={{ width: 18, height: 18, borderRadius: '50%', objectFit: 'cover' }} />
                <span>{cleaner.name.split(' ')[0]}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Jobs List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {visibleJobs.map(job => {
          const isInProgress = job.status === 'In Progress'
          const isCompleted = job.status === 'Completed'

          return (
            <div
              key={job.id}
              style={{
                background: '#FFFFFF',
                borderRadius: 16,
                border: isInProgress ? '1.5px solid #4F46E5' : '1px solid #EEF2F6',
                padding: '16px',
                boxShadow: isInProgress
                  ? '0 4px 16px rgba(79, 70, 229, 0.12)'
                  : '0 2px 8px rgba(0, 0, 0, 0.03)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: 6,
                  background: isInProgress ? '#EEF2FF' : isCompleted ? '#F3F4F6' : '#EBF5FB',
                  color: isInProgress ? '#4F46E5' : isCompleted ? '#4B5563' : '#2196C9',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}>
                  {isInProgress && <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4F46E5' }} />}
                  {isCompleted && <CheckCircle2 size={11} />}
                  {job.status}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: '#111827' }}>
                  <Clock size={12} color="#8A9BB0" />
                  <span>{job.startTime} – {job.endTime}</span>
                </div>
              </div>

              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: '0 0 2px 0' }}>
                {job.title}
              </h3>
              <p style={{ fontSize: 12, color: '#6B7280', margin: '0 0 8px 0' }}>
                {job.clientName}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                fontSize: 11,
                color: '#4B5563',
                marginBottom: 12,
              }}>
                <MapPin size={12} color="#4F46E5" style={{ flexShrink: 0 }} />
                <span>{job.address}</span>
              </div>

              {/* Assigned Cleaners */}
              <div style={{
                borderTop: '1px solid #F3F4F6',
                paddingTop: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ display: 'flex' }}>
                    {job.assignedTo.map((cleanerId, idx) => {
                      const c = mockCleaners.find(cl => cl.id === cleanerId)
                      if (!c) return null
                      return (
                        <img
                          key={cleanerId}
                          src={c.avatar}
                          alt={c.name}
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
                  <span style={{ fontSize: 11, color: '#6B7280' }}>
                    Assigned: {job.assignedTo.map(id => mockCleaners.find(c => c.id === id)?.name.split(' ')[0]).join(', ')}
                  </span>
                </div>

                <span style={{ fontSize: 11, fontWeight: 600, color: '#4F46E5' }}>
                  {job.durationEst}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
