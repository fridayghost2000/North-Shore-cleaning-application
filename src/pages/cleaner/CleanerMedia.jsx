import { useState } from 'react'
import { useOps } from '../../context/DemoOpsContext'
import { Camera, Sparkles, Share2, Upload, Check } from 'lucide-react'

export default function CleanerMedia() {
  const { currentJob, addMedia } = useOps()
  const [subTab, setSubTab] = useState('slider') // 'slider' | 'before' | 'after'
  const [sliderPos, setSliderPos] = useState(50)
  const [shared, setShared] = useState(false)

  if (!currentJob) return null

  const beforeMedia = currentJob.beforeMedia || []
  const afterMedia = currentJob.afterMedia || []

  const beforeImg = currentJob.beforeMedia?.[0]?.url || '/kitchen-before.jpg'
  const afterImg = currentJob.afterMedia?.[0]?.url || '/kitchen-after.jpg'

  function handleCapture(e, category) {
    const file = e.target.files?.[0]
    if (!file) return

    const objectUrl = URL.createObjectURL(file)
    const isVideo = file.type.startsWith('video/')
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    addMedia(currentJob.id, category, {
      id: `media-${Date.now()}`,
      type: isVideo ? 'video' : 'image',
      url: objectUrl,
      caption: isVideo ? 'Video Walkthrough' : `${category === 'before' ? 'Before' : 'After'} Clean Capture`,
      timestamp: now,
    })
  }

  function handleShare() {
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }

  return (
    <div style={{ padding: '14px 16px 28px', fontFamily: 'Inter, sans-serif' }}>
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 800, color: '#111827', margin: '0 0 2px 0' }}>
            Job Media Proof
          </h1>
          <p style={{ fontSize: 11, color: '#8A9BB0', margin: 0 }}>
            {currentJob.title} · {currentJob.locationShort}
          </p>
        </div>

        <button
          onClick={handleShare}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '6px 12px',
            borderRadius: 8,
            background: '#00A99D',
            color: '#FFFFFF',
            border: 'none',
            fontSize: 11,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {shared ? <Check size={12} /> : <Share2 size={12} />}
          <span>{shared ? 'Copied' : 'Share'}</span>
        </button>
      </div>

      {/* Segmented Controller (iOS modern pill style) */}
      <div style={{
        display: 'flex',
        background: '#F1F5F9',
        padding: '3px',
        borderRadius: 12,
        marginBottom: 16,
        border: '1px solid #E2E8F0',
      }}>
        {[
          { id: 'slider', label: 'Comparison', count: null },
          { id: 'before', label: 'Before', count: beforeMedia.length },
          { id: 'after', label: 'After', count: afterMedia.length },
        ].map(t => {
          const isActive = subTab === t.id
          return (
            <button
              key={t.id}
              onClick={() => setSubTab(t.id)}
              style={{
                flex: 1,
                padding: '7px 4px',
                borderRadius: 9,
                border: 'none',
                outline: 'none',
                WebkitTapHighlightColor: 'transparent',
                background: isActive ? '#FFFFFF' : 'transparent',
                color: isActive ? '#00A99D' : '#64748B',
                fontWeight: isActive ? 700 : 500,
                fontSize: 12,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                whiteSpace: 'nowrap',
                boxShadow: isActive ? '0 2px 6px rgba(0, 0, 0, 0.08)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <span>{t.label}</span>
              {t.count !== null && (
                <span style={{
                  fontSize: 10,
                  fontWeight: 600,
                  padding: '1px 6px',
                  borderRadius: 10,
                  background: isActive ? '#E0F7F6' : '#E2E8F0',
                  color: isActive ? '#00A99D' : '#64748B',
                }}>
                  {t.count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Slider View */}
      {subTab === 'slider' && (
        <div style={{
          background: '#FFFFFF',
          borderRadius: 16,
          border: '1px solid #EEF2F6',
          padding: '14px',
          marginBottom: 14,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#111827' }}>
              Interactive Transformation
            </span>
            <span style={{ fontSize: 10, color: '#8A9BB0' }}>
              Drag slider left/right
            </span>
          </div>

          <div style={{
            position: 'relative',
            width: '100%',
            height: 220,
            borderRadius: 12,
            overflow: 'hidden',
          }}>
            {/* After (Clean) */}
            <img
              src={afterImg}
              alt="After"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute', top: 8, right: 8, padding: '3px 8px', borderRadius: 4,
              background: 'rgba(0, 169, 157, 0.85)', color: '#FFFFFF', fontSize: 9, fontWeight: 700,
            }}>
              AFTER
            </div>

            {/* Before (Dirty) */}
            <div style={{
              position: 'absolute', top: 0, left: 0, width: `${sliderPos}%`, height: '100%',
              overflow: 'hidden', borderRight: '2px solid #FFFFFF',
            }}>
              <img
                src={beforeImg}
                alt="Before"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', minWidth: 320, height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute', top: 8, left: 8, padding: '3px 8px', borderRadius: 4,
                background: 'rgba(17, 24, 39, 0.75)', color: '#FFFFFF', fontSize: 9, fontWeight: 700,
              }}>
                BEFORE
              </div>
            </div>

            {/* Range overlay */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={e => setSliderPos(Number(e.target.value))}
              style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                opacity: 0, cursor: 'ew-resize', zIndex: 10, margin: 0,
              }}
            />

            {/* Thumb Marker */}
            <div style={{
              position: 'absolute', top: '50%', left: `${sliderPos}%`,
              transform: 'translate(-50%, -50%)',
              width: 28, height: 28, borderRadius: '50%', background: '#FFFFFF',
              boxShadow: '0 2px 6px rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', pointerEvents: 'none', zIndex: 5,
            }}>
              <span style={{ fontSize: 11, color: '#00A99D', fontWeight: 800 }}>↔</span>
            </div>
          </div>
        </div>
      )}

      {/* Capture Actions */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: 16,
        border: '1px solid #EEF2F6',
        padding: '14px',
        marginBottom: 14,
      }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#111827', display: 'block', marginBottom: 8 }}>
          Take Job Photos & Videos
        </span>

        <div style={{ display: 'flex', gap: 8 }}>
          <label style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            padding: '12px 8px', borderRadius: 12, border: '1px dashed #00A99D',
            background: '#E0F7F6', cursor: 'pointer',
          }}>
            <input
              type="file"
              accept="image/*,video/*"
              capture="environment"
              onChange={e => handleCapture(e, 'before')}
              style={{ display: 'none' }}
            />
            <Camera size={18} color="#00A99D" />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#00A99D' }}>
              Add Before Photo
            </span>
            <span style={{ fontSize: 9, color: '#6B7280' }}>Camera / Gallery</span>
          </label>

          <label style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            padding: '12px 8px', borderRadius: 12, border: '1px dashed #2196C9',
            background: '#EBF5FB', cursor: 'pointer',
          }}>
            <input
              type="file"
              accept="image/*,video/*"
              capture="environment"
              onChange={e => handleCapture(e, 'after')}
              style={{ display: 'none' }}
            />
            <Sparkles size={18} color="#2196C9" />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#2196C9' }}>
              Add After Photo
            </span>
            <span style={{ fontSize: 9, color: '#6B7280' }}>Camera / Gallery</span>
          </label>
        </div>
      </div>

      {/* Media Thumbnails */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: 16,
        border: '1px solid #EEF2F6',
        padding: '14px',
      }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#111827', display: 'block', marginBottom: 10 }}>
          {subTab === 'after' ? 'After Clean Media' : 'Before Clean Media'}
        </span>

        {((subTab === 'after' ? afterMedia : beforeMedia).length === 0) ? (
          <p style={{ fontSize: 11, color: '#9CA3AF', textAlign: 'center', padding: '16px 0', margin: 0 }}>
            No media captured in this tab yet.
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {(subTab === 'after' ? afterMedia : beforeMedia).map(item => (
              <div
                key={item.id}
                style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #EEF2F6', background: '#F9FAFB' }}
              >
                {item.type === 'video' ? (
                  <video src={item.url} controls style={{ width: '100%', height: 110, objectFit: 'cover' }} />
                ) : (
                  <img src={item.url} alt={item.caption} style={{ width: '100%', height: 110, objectFit: 'cover' }} />
                )}
                <div style={{ padding: '6px 8px' }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#111827', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.caption}
                  </p>
                  <span style={{ fontSize: 9, color: '#9CA3AF' }}>{item.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
