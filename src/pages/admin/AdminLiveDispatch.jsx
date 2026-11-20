import { useOps } from '../../context/DemoOpsContext'
import { MapPin, Clock, CheckCircle2, Phone } from 'lucide-react'

export default function AdminLiveDispatch() {
  const { mockCleaners, jobs } = useOps()

  const checkedInCount = mockCleaners.filter(c => c.status === 'Checked In').length
  const completedJobs = jobs.filter(j => j.status === 'Completed').length

  return (
    <div style={{ padding: '14px 16px 28px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ marginBottom: 14 }}>
        <h1 style={{ fontSize: 18, fontWeight: 800, color: '#111827', margin: '0 0 2px 0' }}>
          Live Operations Dispatch
        </h1>
        <p style={{ fontSize: 11, color: '#8A9BB0', margin: 0 }}>
          Real-time cleaner statuses, live check-ins & location tracking
        </p>
      </div>

      {/* KPI Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 8,
        marginBottom: 16,
      }}>
        <div style={{ background: '#FFFFFF', borderRadius: 14, padding: '12px 8px', textAlign: 'center', border: '1px solid #EEF2F6' }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: '#111827', display: 'block' }}>{mockCleaners.length}</span>
          <span style={{ fontSize: 10, color: '#8A9BB0', fontWeight: 600 }}>Active Staff</span>
        </div>
        <div style={{ background: '#FFFFFF', borderRadius: 14, padding: '12px 8px', textAlign: 'center', border: '1px solid #EEF2F6' }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: '#00A99D', display: 'block' }}>{checkedInCount}</span>
          <span style={{ fontSize: 10, color: '#8A9BB0', fontWeight: 600 }}>On Site Now</span>
        </div>
        <div style={{ background: '#FFFFFF', borderRadius: 14, padding: '12px 8px', textAlign: 'center', border: '1px solid #EEF2F6' }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: '#4F46E5', display: 'block' }}>{completedJobs}</span>
          <span style={{ fontSize: 10, color: '#8A9BB0', fontWeight: 600 }}>Completed</span>
        </div>
      </div>

      {/* Staff Roster Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {mockCleaners.map(cleaner => {
          const isCheckedIn = cleaner.status === 'Checked In'
          return (
            <div
              key={cleaner.id}
              style={{
                background: '#FFFFFF',
                borderRadius: 16,
                border: '1px solid #EEF2F6',
                padding: '14px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img
                    src={cleaner.avatar}
                    alt={cleaner.name}
                    style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <h3 style={{ fontSize: 13, fontWeight: 700, color: '#111827', margin: 0 }}>
                      {cleaner.name}
                    </h3>
                    <span style={{ fontSize: 11, color: '#8A9BB0' }}>
                      {cleaner.role}
                    </span>
                  </div>
                </div>

                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: 6,
                  background: isCheckedIn ? '#E0F7F6' : '#F3F4F6',
                  color: isCheckedIn ? '#00A99D' : '#6B7280',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}>
                  {isCheckedIn && <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#00A99D' }} />}
                  {cleaner.status}
                </span>
              </div>

              {/* Location */}
              <div style={{
                background: '#F9FAFB',
                borderRadius: 8,
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 11,
                color: '#374151',
                marginBottom: 8,
              }}>
                <MapPin size={12} color="#4F46E5" style={{ flexShrink: 0 }} />
                <span>{cleaner.currentLocation}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, color: '#8A9BB0' }}>
                <span>{cleaner.jobsToday} assigned jobs today</span>
                <span>{cleaner.phone}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
