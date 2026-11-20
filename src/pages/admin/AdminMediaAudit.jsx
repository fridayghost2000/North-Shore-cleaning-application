import { useState } from 'react'
import { useOps } from '../../context/DemoOpsContext'
import { Sparkles, Eye, CheckCircle2, Clock, Camera } from 'lucide-react'

export default function AdminMediaAudit() {
  const { jobs } = useOps()
  const [sliderPos, setSliderPos] = useState(50)

  // Default matching comparison (Exact same kitchen before & after)
  const sampleBefore = '/kitchen-before.jpg'
  const sampleAfter = '/kitchen-after.jpg'

  return (
    <div style={{ padding: '14px 16px 28px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ marginBottom: 14 }}>
        <h1 style={{ fontSize: 18, fontWeight: 800, color: '#111827', margin: '0 0 2px 0' }}>
          Quality & Photo Audit
        </h1>
        <p style={{ fontSize: 11, color: '#8A9BB0', margin: 0 }}>
          Review Before & After proof uploaded across all jobs
        </p>
      </div>

      {/* Main Inspection Slider */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: 16,
        border: '1px solid #EEF2F6',
        padding: '14px',
        marginBottom: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#111827' }}>
            Job: 14 Harbor View Ave (Harrison Residence)
          </span>
          <span style={{ fontSize: 10, color: '#8A9BB0' }}>
            Audited
          </span>
        </div>

        <div style={{ position: 'relative', width: '100%', height: 210, borderRadius: 12, overflow: 'hidden' }}>
          <img src={sampleAfter} alt="After Clean" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: 8, right: 8, padding: '3px 8px', borderRadius: 4, background: 'rgba(79, 70, 229, 0.9)', color: '#FFFFFF', fontSize: 9, fontWeight: 700 }}>
            AFTER
          </div>

          <div style={{
            position: 'absolute', top: 0, left: 0, width: `${sliderPos}%`, height: '100%',
            overflow: 'hidden', borderRight: '2px solid #FFFFFF',
          }}>
            <img src={sampleBefore} alt="Before Clean" style={{ position: 'absolute', top: 0, left: 0, width: '100%', minWidth: 320, height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', top: 8, left: 8, padding: '3px 8px', borderRadius: 4, background: 'rgba(17, 24, 39, 0.8)', color: '#FFFFFF', fontSize: 9, fontWeight: 700 }}>
              BEFORE
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={e => setSliderPos(Number(e.target.value))}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'ew-resize', zIndex: 10, margin: 0 }}
          />

          <div style={{
            position: 'absolute', top: '50%', left: `${sliderPos}%`, transform: 'translate(-50%, -50%)',
            width: 28, height: 28, borderRadius: '50%', background: '#FFFFFF', boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 5,
          }}>
            <span style={{ fontSize: 11, color: '#4F46E5', fontWeight: 800 }}>↔</span>
          </div>
        </div>
      </div>

      {/* Submissions by Jobs */}
      <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #EEF2F6', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>
            Recent Job Submissions
          </span>
          <span style={{ fontSize: 11, color: '#8A9BB0' }}>
            {jobs.length} Jobs Logged
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {jobs.map(j => {
            const hasAfter = (j.afterMedia && j.afterMedia.length > 0)
            const isVerified = hasAfter

            return (
              <div
                key={j.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  padding: '12px 14px',
                  borderRadius: 12,
                  background: '#F8FAFC',
                  border: '1px solid #EEF2F6',
                  transition: 'background 0.15s ease',
                }}
              >
                {/* Top Row: Title + Status Pill */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>
                    {j.title}
                  </span>

                  <span style={{
                    fontSize: 10,
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: 20,
                    background: isVerified ? '#ECFDF5' : '#FFFBEB',
                    color: isVerified ? '#047857' : '#B45309',
                    border: `1px solid ${isVerified ? '#A7F3D0' : '#FDE68A'}`,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 3,
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}>
                    {isVerified ? (
                      <>
                        <CheckCircle2 size={11} /> Verified
                      </>
                    ) : (
                      <>
                        <Clock size={11} /> Pending
                      </>
                    )}
                  </span>
                </div>

                {/* Bottom Row: Client info & Photos count chip */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, color: '#64748B' }}>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '60%' }}>
                    {j.clientName}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#FFFFFF', padding: '2px 8px', borderRadius: 6, border: '1px solid #E2E8F0', fontSize: 10, color: '#475569', fontWeight: 600 }}>
                    <Camera size={10} color="#64748B" />
                    <span>{j.beforeMedia?.length || 0} Before · {j.afterMedia?.length || 0} After</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
