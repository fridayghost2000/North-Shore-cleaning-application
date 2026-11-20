import { useState } from 'react'
import { useCleanster } from '../../context/CleansterContext'
import { X, Play, Share2, Download, Check } from 'lucide-react'

export default function PhotosModal() {
  const { isPhotosModalOpen, setIsPhotosModalOpen, activeBooking } = useCleanster()
  const [photoTab, setPhotoTab] = useState('before') // 'before' | 'after'
  const [downloadSuccess, setDownloadSuccess] = useState(false)
  const [shared, setShared] = useState(false)

  if (!isPhotosModalOpen) return null

  const photos = photoTab === 'before'
    ? (activeBooking?.beforePhotos || [])
    : (activeBooking?.afterPhotos || [])

  function handleDownloadAll() {
    setDownloadSuccess(true)
    setTimeout(() => setDownloadSuccess(false), 2000)
  }

  function handleShare() {
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.45)',
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      backdropFilter: 'blur(3px)',
    }}>
      <div
        onClick={() => setIsPhotosModalOpen(false)}
        style={{ flex: 1, width: '100%' }}
      />

      {/* Sheet Content (Matching Image 3) */}
      <div style={{
        background: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: '12px 16px 24px',
        boxSizing: 'border-box',
        maxHeight: '88%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 -10px 30px rgba(0,0,0,0.15)',
      }}>
        {/* Drag Handle Bar */}
        <div style={{
          width: 36,
          height: 4,
          borderRadius: 2,
          background: '#CBD5E1',
          margin: '0 auto 14px auto',
        }} />

        {/* Header Tabs: Before / After (Matching Image 3) */}
        <div style={{
          display: 'flex',
          gap: 10,
          marginBottom: 16,
        }}>
          <button
            onClick={() => setPhotoTab('before')}
            style={{
              flex: 1,
              padding: '9px 0',
              borderRadius: 10,
              border: photoTab === 'before' ? '1.5px solid #FA2A70' : '1px solid #E2E8F0',
              background: photoTab === 'before' ? '#FFFFFF' : '#F8FAFC',
              color: photoTab === 'before' ? '#FA2A70' : '#64748B',
              fontWeight: photoTab === 'before' ? 700 : 500,
              fontSize: 13,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            Before
          </button>

          <button
            onClick={() => setPhotoTab('after')}
            style={{
              flex: 1,
              padding: '9px 0',
              borderRadius: 10,
              border: photoTab === 'after' ? '1.5px solid #FA2A70' : '1px solid #E2E8F0',
              background: photoTab === 'after' ? '#FFFFFF' : '#F8FAFC',
              color: photoTab === 'after' ? '#FA2A70' : '#64748B',
              fontWeight: photoTab === 'after' ? 700 : 500,
              fontSize: 13,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            After
          </button>
        </div>

        {/* 3x3 Media Grid (Matching Image 3) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 6,
          marginBottom: 20,
          maxHeight: 320,
          overflowY: 'auto',
        }} className="scrollbar-hide">
          {photos.map(item => (
            <div
              key={item.id}
              style={{
                position: 'relative',
                paddingTop: '100%',
                borderRadius: 8,
                overflow: 'hidden',
                background: '#F1F5F9',
              }}
            >
              <img
                src={item.url}
                alt={item.caption}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />

              {/* Video Play Button Icon if video */}
              {item.type === 'video' && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.85)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Play size={14} color="#111827" fill="#111827" style={{ marginLeft: 2 }} />
                </div>
              )}
            </div>
          ))}

          {/* Placeholders if fewer items */}
          {Array.from({ length: Math.max(0, 9 - photos.length) }).map((_, i) => (
            <div
              key={`empty-${i}`}
              style={{
                paddingTop: '100%',
                borderRadius: 8,
                background: '#F8FAFC',
                border: '1px dashed #E2E8F0',
              }}
            />
          ))}
        </div>

        {/* Share Link Text */}
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <button
            onClick={handleShare}
            style={{
              background: 'none',
              border: 'none',
              color: '#FA2A70',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {shared ? 'Link Copied to Clipboard ✓' : 'Share'}
          </button>
        </div>

        {/* Big Solid Pink Action Button (Matching Image 3) */}
        <button
          onClick={handleDownloadAll}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: 12,
            background: '#FA2A70', // Cleanster hot pink
            color: '#FFFFFF',
            border: 'none',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(250, 42, 112, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          {downloadSuccess ? (
            <>
              <Check size={18} strokeWidth={2.5} /> Downloaded All Files
            </>
          ) : (
            'Download all Photos & Videos'
          )}
        </button>
      </div>
    </div>
  )
}
