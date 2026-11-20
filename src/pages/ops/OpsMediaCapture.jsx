import { useState, useRef } from 'react'
import { useOps } from '../../context/DemoOpsContext'
import {
  Camera, Video, Upload, Share2, CheckCircle2,
  ChevronLeft, Sparkles, Eye, Download
} from 'lucide-react'

export default function OpsMediaCapture() {
  const { currentJob, addMedia, role } = useOps()

  // Tabs: 'slider' | 'before' | 'after'
  const [subTab, setSubTab] = useState('slider')
  const [sliderPos, setSliderPos] = useState(50) // 0 to 100%
  const [shareFeedback, setShareFeedback] = useState(false)
  const fileInputRef = useRef(null)

  if (!currentJob) return null

  const beforeMedia = currentJob.beforeMedia || []
  const afterMedia = currentJob.afterMedia || []

  // Default comparison images if present
  const beforeSample = beforeMedia[0]?.url || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80'
  const afterSample = afterMedia[0]?.url || 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80'

  function handleFileChange(e, category) {
    const file = e.target.files?.[0]
    if (!file) return

    const objectUrl = URL.createObjectURL(file)
    const isVideo = file.type.startsWith('video/')
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    addMedia(currentJob.id, category, {
      id: `media-${Date.now()}`,
      type: isVideo ? 'video' : 'image',
      url: objectUrl,
      caption: isVideo ? 'Video Clip Walkthrough' : 'Camera Capture Proof',
      timestamp: now,
    })
  }

  function handleShareReport() {
    setShareFeedback(true)
    setTimeout(() => setShareFeedback(false), 2500)
  }

  return (
    <div style={{ padding: '16px 14px 28px', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.4px', margin: 0 }}>
              Job Media & Proof
            </h1>
            <p style={{ fontSize: 12, color: '#64748B', marginTop: 2, margin: 0 }}>
              {currentJob.title} · {currentJob.locationShort}
            </p>
          </div>

          <button
            onClick={handleShareReport}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              padding: '6px 12px',
              borderRadius: 8,
              background: '#0F172A',
              color: '#FFFFFF',
              border: 'none',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Share2 size={12} /> {shareFeedback ? 'Link Copied!' : 'Share'}
          </button>
        </div>
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
        ].map(tab => {
          const isActive = subTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id)}
              style={{
                flex: 1,
                padding: '7px 4px',
                borderRadius: 9,
                border: 'none',
                outline: 'none',
                WebkitTapHighlightColor: 'transparent',
                background: isActive ? '#FFFFFF' : 'transparent',
                color: isActive ? '#0F172A' : '#64748B',
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
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span style={{
                  fontSize: 10,
                  fontWeight: 600,
                  padding: '1px 6px',
                  borderRadius: 10,
                  background: isActive ? '#E2E8F0' : '#F1F5F9',
                  color: isActive ? '#0F172A' : '#64748B',
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* View 1: Interactive Comparison Slider */}
      {subTab === 'slider' && (
        <div style={{
          background: '#FFFFFF',
          borderRadius: 14,
          border: '1px solid #EEF2F6',
          padding: '14px',
          marginBottom: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>
              Transformation Comparison
            </span>
            <span style={{ fontSize: 11, color: '#64748B' }}>
              Drag slider to compare
            </span>
          </div>

          {/* Slider Container */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: 220,
            borderRadius: 10,
            overflow: 'hidden',
            userSelect: 'none',
          }}>
            {/* After Image (Background) */}
            <img
              src={afterSample}
              alt="After Cleaning"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <div style={{
              position: 'absolute',
              top: 8,
              right: 8,
              padding: '3px 8px',
              borderRadius: 4,
              background: 'rgba(15,23,42,0.7)',
              color: '#FFFFFF',
              fontSize: 10,
              fontWeight: 700,
              backdropFilter: 'blur(4px)',
            }}>
              AFTER
            </div>

            {/* Before Image (Foreground with Clip-path) */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${sliderPos}%`,
              height: '100%',
              overflow: 'hidden',
              borderRight: '2px solid #FFFFFF',
            }}>
              <img
                src={beforeSample}
                alt="Before Cleaning"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  minWidth: 320,
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <div style={{
                position: 'absolute',
                top: 8,
                left: 8,
                padding: '3px 8px',
                borderRadius: 4,
                background: 'rgba(15,23,42,0.7)',
                color: '#FFFFFF',
                fontSize: 10,
                fontWeight: 700,
                backdropFilter: 'blur(4px)',
              }}>
                BEFORE
              </div>
            </div>

            {/* Drag Handle Overlay */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={e => setSliderPos(Number(e.target.value))}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'ew-resize',
                zIndex: 10,
                margin: 0,
              }}
            />

            {/* Visual Handle Marker */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: `${sliderPos}%`,
              transform: 'translate(-50%, -50%)',
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: '#FFFFFF',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              zIndex: 5,
            }}>
              <span style={{ fontSize: 11, color: '#0F172A', fontWeight: 800 }}>↔</span>
            </div>
          </div>
        </div>
      )}

      {/* Capture Action Bar (Minimalist) */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: 14,
        border: '1px solid #EEF2F6',
        padding: '14px',
        marginBottom: 16,
      }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 8 }}>
          Add Photos / Videos To Job
        </span>

        <div style={{ display: 'flex', gap: 8 }}>
          {/* Add Before Media */}
          <label style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            padding: '12px 8px',
            borderRadius: 10,
            border: '1px dashed #CBD5E1',
            background: '#F8FAFC',
            cursor: 'pointer',
          }}>
            <input
              type="file"
              accept="image/*,video/*"
              capture="environment"
              onChange={e => handleFileChange(e, 'before')}
              style={{ display: 'none' }}
            />
            <Camera size={18} color="#0D9488" />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#0F172A' }}>
              Add Before Photo
            </span>
            <span style={{ fontSize: 9, color: '#94A3B8' }}>
              Camera / Library
            </span>
          </label>

          {/* Add After Media */}
          <label style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            padding: '12px 8px',
            borderRadius: 10,
            border: '1px dashed #CBD5E1',
            background: '#F8FAFC',
            cursor: 'pointer',
          }}>
            <input
              type="file"
              accept="image/*,video/*"
              capture="environment"
              onChange={e => handleFileChange(e, 'after')}
              style={{ display: 'none' }}
            />
            <Sparkles size={18} color="#0284C7" />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#0F172A' }}>
              Add After Photo
            </span>
            <span style={{ fontSize: 9, color: '#94A3B8' }}>
              Camera / Library
            </span>
          </label>
        </div>
      </div>

      {/* Media Grid Section */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: 14,
        border: '1px solid #EEF2F6',
        padding: '14px',
      }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 10 }}>
          {subTab === 'after' ? 'After Cleaning Records' : 'Before Cleaning Records'}
        </span>

        {((subTab === 'after' ? afterMedia : beforeMedia).length === 0) ? (
          <p style={{ fontSize: 11, color: '#94A3B8', textAlign: 'center', padding: '16px 0', margin: 0 }}>
            No media captured in this category yet.
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {(subTab === 'after' ? afterMedia : beforeMedia).map(item => (
              <div
                key={item.id}
                style={{
                  borderRadius: 8,
                  overflow: 'hidden',
                  border: '1px solid #EEF2F6',
                  background: '#F8FAFC',
                }}
              >
                {item.type === 'video' ? (
                  <video
                    src={item.url}
                    controls
                    style={{ width: '100%', height: 110, objectFit: 'cover' }}
                  />
                ) : (
                  <img
                    src={item.url}
                    alt={item.caption}
                    style={{ width: '100%', height: 110, objectFit: 'cover' }}
                  />
                )}
                <div style={{ padding: '6px 8px' }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#0F172A', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.caption}
                  </p>
                  <span style={{ fontSize: 9, color: '#94A3B8' }}>
                    {item.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
