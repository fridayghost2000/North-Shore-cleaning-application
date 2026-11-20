import { useOps } from '../../context/DemoOpsContext'
import {
  Users, MapPin, Clock, CheckCircle2, AlertCircle,
  Phone, ArrowUpRight, ShieldCheck
} from 'lucide-react'

export default function OpsLiveDispatch() {
  const { mockCleaners, jobs, setSelectedJobId, setActiveTab } = useOps()

  // Calculate live stats
  const totalStaff = mockCleaners.length
  const checkedInStaff = mockCleaners.filter(c => c.status === 'Checked In').length
  const completedJobs = jobs.filter(j => j.status === 'Completed').length

  function handleViewJob(jobId) {
    setSelectedJobId(jobId)
    setActiveTab('job')
  }

  return (
    <div style={{ padding: '16px 14px 28px', fontFamily: 'Inter, sans-serif' }}>
      {/* Title */}
      <div style={{ marginBottom: 14 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.4px', margin: 0 }}>
          Live Operations Dispatch
        </h1>
        <p style={{ fontSize: 12, color: '#64748B', marginTop: 2, margin: 0 }}>
          Real-time cleaner check-ins, job routes & field status
        </p>
      </div>

      {/* KPI Cards Strip (Minimalist) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 8,
        marginBottom: 16,
      }}>
        <div style={{
          background: '#FFFFFF',
          borderRadius: 12,
          padding: '12px 10px',
          border: '1px solid #EEF2F6',
          textAlign: 'center',
        }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', display: 'block' }}>
            {totalStaff}
          </span>
          <span style={{ fontSize: 10, color: '#64748B', fontWeight: 500 }}>
            Active Staff
          </span>
        </div>

        <div style={{
          background: '#FFFFFF',
          borderRadius: 12,
          padding: '12px 10px',
          border: '1px solid #EEF2F6',
          textAlign: 'center',
        }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#0D9488', display: 'block' }}>
            {checkedInStaff}
          </span>
          <span style={{ fontSize: 10, color: '#64748B', fontWeight: 500 }}>
            On Site Now
          </span>
        </div>

        <div style={{
          background: '#FFFFFF',
          borderRadius: 12,
          padding: '12px 10px',
          border: '1px solid #EEF2F6',
          textAlign: 'center',
        }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#0284C7', display: 'block' }}>
            {completedJobs}
          </span>
          <span style={{ fontSize: 10, color: '#64748B', fontWeight: 500 }}>
            Completed
          </span>
        </div>
      </div>

      {/* Cleaner Status Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Cleaner Field Roster
        </div>

        {mockCleaners.map(cleaner => {
          const isCheckedIn = cleaner.status === 'Checked In'
          const assignedJobs = jobs.filter(j => j.assignedTo.includes(cleaner.id))

          return (
            <div
              key={cleaner.id}
              style={{
                background: '#FFFFFF',
                borderRadius: 14,
                border: '1px solid #EEF2F6',
                padding: '14px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              }}
            >
              {/* Header: Avatar, Name & Live Pill */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img
                    src={cleaner.avatar}
                    alt={cleaner.name}
                    style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', display: 'block' }}>
                      {cleaner.name}
                    </span>
                    <span style={{ fontSize: 11, color: '#64748B' }}>
                      {cleaner.role}
                    </span>
                  </div>
                </div>

                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: 6,
                  background: isCheckedIn ? '#ECFDF5' : '#F1F5F9',
                  color: isCheckedIn ? '#047857' : '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}>
                  {isCheckedIn && (
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981' }} />
                  )}
                  {cleaner.status}
                </span>
              </div>

              {/* Current Location & Activity */}
              <div style={{
                background: '#F8FAFC',
                borderRadius: 8,
                padding: '8px 10px',
                marginBottom: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 11,
                color: '#334155',
              }}>
                <MapPin size={13} color="#0D9488" style={{ flexShrink: 0 }} />
                <span style={{ fontWeight: 500 }}>{cleaner.currentLocation}</span>
              </div>

              {/* Bottom Info & Quick Job View */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 8,
                borderTop: '1px solid #F8FAFC',
              }}>
                <span style={{ fontSize: 11, color: '#64748B' }}>
                  {cleaner.jobsToday} shifts today · {cleaner.phone}
                </span>

                {assignedJobs[0] && (
                  <button
                    onClick={() => handleViewJob(assignedJobs[0].id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#0284C7',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      padding: 0,
                    }}
                  >
                    View Job <ArrowUpRight size={11} />
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
