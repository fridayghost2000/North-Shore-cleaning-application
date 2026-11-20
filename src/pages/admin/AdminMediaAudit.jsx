import { useState } from 'react'
import { useOps } from '../../context/DemoOpsContext'
import { Sparkles, Eye } from 'lucide-react'

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
      <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #EEF2F6', padding: '14px' }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#111827', display: 'block', marginBottom: 10 }}>
          Recent Job Submissions
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {jobs.map(j => (
            <div
              key={j.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 10px',
                borderRadius: 10,
                background: '#F9FAFB',
              }}
            >
              <div>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#111827', display: 'block' }}>
                  {j.title}
                </span>
                <span style={{ fontSize: 10, color: '#8A9BB0' }}>
                  {j.clientName} · {j.beforeMedia.length} Before / {j.afterMedia.length} After
                </span>
              </div>
              <span style={{
                fontSize: 10,
                fontWeight: 600,
                color: j.afterMedia.length > 0 ? '#00A99D' : '#9CA3AF',
              }}>
                {j.afterMedia.length > 0 ? 'Verified' : 'Pending After'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
