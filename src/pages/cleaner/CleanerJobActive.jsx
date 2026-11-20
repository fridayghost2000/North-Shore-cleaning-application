import { useState } from 'react'
import { useOps } from '../../context/DemoOpsContext'
import {
  Clock, MapPin, CheckCircle2, Circle, Camera, Key,
  Navigation, Share2, Sparkles, AlertCircle
} from 'lucide-react'

export default function CleanerJobActive({ onOpenMedia }) {
  const {
    currentJob,
    activeTimerSeconds,
    formatTimer,
    checkIn,
    checkOut,
    toggleChecklist,
  } = useOps()

  const [confirmModal, setConfirmModal] = useState(false)

  if (!currentJob) return null

  const isInProgress = currentJob.status === 'In Progress'
  const isCompleted = currentJob.status === 'Completed'
  const isScheduled = currentJob.status === 'Scheduled'

  const completedTasks = currentJob.checklist.filter(t => t.completed).length
  const totalTasks = currentJob.checklist.length

  function handleCheckOut() {
    checkOut(currentJob.id)
    setConfirmModal(false)
  }

  return (
    <div style={{ padding: '14px 16px 28px', fontFamily: 'Inter, sans-serif' }}>
      {/* Job Card Hero */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: 16,
        border: '1px solid #EEF2F6',
        padding: '16px',
        marginBottom: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: '#111827', margin: '0 0 2px 0' }}>
              {currentJob.title}
            </h2>
            <p style={{ fontSize: 12, color: '#6B7280', margin: 0 }}>
              {currentJob.clientName}
            </p>
          </div>
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            padding: '3px 8px',
            borderRadius: 6,
            background: isInProgress ? '#E0F7F6' : isCompleted ? '#F3F4F6' : '#EBF5FB',
            color: isInProgress ? '#00A99D' : isCompleted ? '#4B5563' : '#2196C9',
          }}>
            {currentJob.status}
          </span>
        </div>

        {/* Address and Map Link */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 12,
          padding: '8px 10px',
          background: '#F9FAFB',
          borderRadius: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#4B5563' }}>
            <MapPin size={13} color="#00A99D" style={{ flexShrink: 0 }} />
            <span>{currentJob.address}</span>
          </div>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(currentJob.address)}`}
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: 11, fontWeight: 600, color: '#2196C9', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 2 }}
          >
            Maps <Navigation size={10} />
          </a>
        </div>

        {/* Access Notes */}
        {currentJob.accessNotes && (
          <div style={{
            marginTop: 10,
            padding: '8px 10px',
            background: '#FFFBEB',
            borderRadius: 8,
            border: '1px solid #FEF3C7',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 6,
            fontSize: 11,
            color: '#92400E',
          }}>
            <Key size={13} color="#D97706" style={{ flexShrink: 0, marginTop: 1 }} />
            <span><strong>Access Code:</strong> {currentJob.accessNotes}</span>
          </div>
        )}
      </div>

      {/* Check-In / Check-Out Station (Cleanest Check-In/Out) */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: 16,
        border: '1px solid #EEF2F6',
        padding: '16px',
        marginBottom: 12,
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      }}>
        {isInProgress ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#00A99D' }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#00A99D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Active Job In Progress
              </span>
            </div>

            <div style={{
              fontSize: 32,
              fontWeight: 800,
              color: '#111827',
              letterSpacing: '-1px',
              margin: '6px 0 2px 0',
              fontVariantNumeric: 'tabular-nums',
            }}>
              {formatTimer(activeTimerSeconds)}
            </div>
            <p style={{ fontSize: 11, color: '#8A9BB0', margin: '0 0 14px 0' }}>
              Checked in at {currentJob.checkInTime} · GPS Verified
            </p>

            <button
              onClick={() => setConfirmModal(true)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 12,
                background: '#111827',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <CheckCircle2 size={16} /> Complete & Check Out
            </button>
          </div>
        ) : isScheduled ? (
          <div>
            <p style={{ fontSize: 12, color: '#6B7280', margin: '0 0 12px 0' }}>
              You are scheduled for this site. Ready to begin?
            </p>
            <button
              onClick={() => checkIn(currentJob.id)}
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: 12,
                background: '#00A99D',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                boxShadow: '0 4px 14px rgba(0, 169, 157, 0.3)',
              }}
            >
              <Clock size={16} /> Tap to Check In ({currentJob.startTime})
            </button>
          </div>
        ) : (
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 14px',
              borderRadius: 20,
              background: '#F3F4F6',
              color: '#374151',
              fontSize: 12,
              fontWeight: 600,
            }}>
              <CheckCircle2 size={14} color="#00A99D" /> Completed {currentJob.checkInTime} – {currentJob.checkOutTime}
            </div>
          </div>
        )}
      </div>

      {/* Media Shortcut */}
      <div
        onClick={onOpenMedia}
        style={{
          background: '#FFFFFF',
          borderRadius: 16,
          border: '1px solid #EEF2F6',
          padding: '12px 14px',
          marginBottom: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: '#E0F7F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Camera size={16} color="#00A99D" />
          </div>
          <div>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#111827', display: 'block' }}>
              Before & After Media Proof
            </span>
            <span style={{ fontSize: 11, color: '#8A9BB0' }}>
              {currentJob.beforeMedia.length} Before · {currentJob.afterMedia.length} After
            </span>
          </div>
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#00A99D' }}>
          Open Hub →
        </span>
      </div>

      {/* Interactive Room Checklist */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: 16,
        border: '1px solid #EEF2F6',
        padding: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>
            Job Checklist
          </span>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#6B7280' }}>
            {completedTasks} of {totalTasks} Completed
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {currentJob.checklist.map((item, idx) => (
            <div
              key={idx}
              onClick={() => toggleChecklist(currentJob.id, idx)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                cursor: 'pointer',
                padding: '6px 0',
              }}
            >
              {item.completed ? (
                <CheckCircle2 size={16} color="#00A99D" style={{ flexShrink: 0, marginTop: 1 }} />
              ) : (
                <Circle size={16} color="#D1D5DB" style={{ flexShrink: 0, marginTop: 1 }} />
              )}
              <span style={{
                fontSize: 12,
                color: item.completed ? '#9CA3AF' : '#374151',
                textDecoration: item.completed ? 'line-through' : 'none',
                lineHeight: 1.4,
              }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: 18,
            padding: '20px',
            maxWidth: 320,
            width: '100%',
            textAlign: 'center',
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#111827', margin: '0 0 6px 0' }}>
              Confirm Check-Out
            </h3>
            <p style={{ fontSize: 12, color: '#6B7280', margin: '0 0 16px 0' }}>
              Have you verified all checklist items and captured the required After photos?
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setConfirmModal(false)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: 10,
                  background: '#F3F4F6',
                  color: '#4B5563',
                  border: 'none',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleCheckOut}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: 10,
                  background: '#00A99D',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Yes, Check Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
