import { useState } from 'react'
import { useEmployee } from '../../context/EmployeeContext'
import { Camera, Plus, CheckCircle2, Image as ImageIcon, Sparkles } from 'lucide-react'

export default function EmployeeMediaPage() {
  const { currentJob, addJobPhoto } = useEmployee()
  const [activeMediaTab, setActiveMediaTab] = useState('before') // 'before' | 'after'
  const [uploadToast, setUploadToast] = useState(null)

  const photos = activeMediaTab === 'before' ? currentJob.beforePhotos : currentJob.afterPhotos

  function handleSimulateUpload() {
    // High quality cleaning sample photo
    const samplePhotos = [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80',
    ]
    const randomPic = samplePhotos[Math.floor(Math.random() * samplePhotos.length)]
    addJobPhoto(currentJob.id, activeMediaTab, randomPic)
    setUploadToast(`New ${activeMediaTab === 'before' ? 'Before' : 'After'} photo logged!`)
    setTimeout(() => setUploadToast(null), 2500)
  }

  return (
    <div style={{ padding: '14px 16px 28px', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: 14 }}>
        <h1 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: '0 0 2px 0' }}>
          Media Proof & Inspections
        </h1>
        <p style={{ fontSize: 11, color: '#64748B', margin: 0 }}>
          Job #{currentJob.jobCode} · {currentJob.title}
        </p>
      </div>

      {/* Segmented Controller (Before vs After) */}
      <div style={{
        display: 'flex',
        background: '#F1F5F9',
        borderRadius: 14,
        padding: 4,
        marginBottom: 16,
      }}>
        <button
          onClick={() => setActiveMediaTab('before')}
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: 10,
            border: 'none',
            background: activeMediaTab === 'before' ? '#FFFFFF' : 'transparent',
            color: activeMediaTab === 'before' ? '#0F172A' : '#64748B',
            fontWeight: activeMediaTab === 'before' ? 700 : 500,
            fontSize: 12.5,
            cursor: 'pointer',
            boxShadow: activeMediaTab === 'before' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
            transition: 'all 0.12s ease',
          }}
        >
          Before Clean ({currentJob.beforePhotos.length})
        </button>

        <button
          onClick={() => setActiveMediaTab('after')}
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: 10,
            border: 'none',
            background: activeMediaTab === 'after' ? '#FFFFFF' : 'transparent',
            color: activeMediaTab === 'after' ? '#0F172A' : '#64748B',
            fontWeight: activeMediaTab === 'after' ? 700 : 500,
            fontSize: 12.5,
            cursor: 'pointer',
            boxShadow: activeMediaTab === 'after' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
            transition: 'all 0.12s ease',
          }}
        >
          After Clean ({currentJob.afterPhotos.length})
        </button>
      </div>

      {/* Upload Toast */}
      {uploadToast && (
        <div style={{
          background: '#0B4A8F',
          color: '#FFFFFF',
          padding: '8px 14px',
          borderRadius: 10,
          fontSize: 12,
          fontWeight: 600,
          textAlign: 'center',
          marginBottom: 12,
          animation: 'fadeIn 0.2s ease',
        }}>
          {uploadToast}
        </div>
      )}

      {/* Photos Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 12,
        marginBottom: 16,
      }}>
        {/* Upload Trigger Button */}
        <div
          onClick={handleSimulateUpload}
          style={{
            aspectRatio: '1',
            borderRadius: 16,
            border: '2px dashed #CBD5E1',
            background: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            cursor: 'pointer',
            transition: 'all 0.12s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#0B4A8F'}
          onMouseLeave={e => e.currentTarget.style.borderColor = '#CBD5E1'}
        >
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#EEF5FC',
            color: '#0B4A8F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Plus size={20} strokeWidth={2.5} />
          </div>
          <span style={{ fontSize: 11.5, fontWeight: 700, color: '#0B4A8F' }}>
            Take Photo
          </span>
          <span style={{ fontSize: 10, color: '#94A3B8' }}>
            Camera / Library
          </span>
        </div>

        {/* Existing Photos */}
        {photos.map((src, index) => (
          <div
            key={index}
            style={{
              aspectRatio: '1',
              borderRadius: 16,
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              border: '1px solid #E2E8F0',
            }}
          >
            <img
              src={src}
              alt={`${activeMediaTab} proof ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <span style={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              background: 'rgba(15, 23, 42, 0.75)',
              color: '#FFFFFF',
              fontSize: 10,
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: 6,
              backdropFilter: 'blur(2px)',
            }}>
              #{index + 1} · {activeMediaTab.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      {/* Media Guidelines Note */}
      <div style={{
        background: '#F8FAFC',
        borderRadius: 14,
        padding: '12px 14px',
        border: '1px solid #E2E8F0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <Sparkles size={14} color="#0B4A8F" />
          <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>
            North Shore Media Standards
          </span>
        </div>
        <p style={{ fontSize: 11, color: '#64748B', margin: 0, lineHeight: 1.4 }}>
          Take clear, well-lit photos of kitchen sinks, bathroom showers, and polished conference surfaces. Uploaded photos are verified by dispatch and forwarded to the property manager.
        </p>
      </div>
    </div>
  )
}
