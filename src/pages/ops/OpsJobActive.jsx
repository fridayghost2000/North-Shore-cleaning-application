import { useState } from 'react'
import { useOps } from '../../context/DemoOpsContext'
import {
  Clock, MapPin, CheckCircle2, Circle, Camera, ArrowLeft,
  Key, AlertTriangle, Phone, Navigation, Share2
} from 'lucide-react'

export default function OpsJobActive() {
  const {
    currentJob,
    activeTimerSeconds,
    formatTimer,
    checkIn,
    checkOut,
    toggleChecklist,
    setActiveTab,
  } = useOps()

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false)
  const [completionNotes, setCompletionNotes] = useState('')

  if (!currentJob) {
    return (
      <div style={{ padding: 24, textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
        <p style={{ color: '#64748B' }}>No job selected.</p>
        <button
          onClick={() => setActiveTab('schedule')}
          style={{
            marginTop: 10,
            padding: '8px 16px',
            borderRadius: 8,
            background: '#0F172A',
            color: '#fff',
            border: 'none',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          View Schedule
        </button>
      </div>
    )
  }

  const isInProgress = currentJob.status === 'In Progress'
  const isCompleted = currentJob.status === 'Completed'
  const isScheduled = currentJob.status === 'Scheduled'

  const completedCount = currentJob.checklist.filter(c => c.completed).length
  const totalCount = currentJob.checklist.length

  function handleCheckOutConfirm() {
    checkOut(currentJob.id)
    setCheckoutModalOpen(false)
  }

  return (
    <div style={{ padding: '14px 14px 30px', fontFamily: 'Inter, sans-serif' }}>
      {/* Top Breadcrumb & Status */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <button
          onClick={() => setActiveTab('schedule')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 12,
            fontWeight: 600,
            color: '#64748B',
            padding: 0,
          }}
        >
          <ArrowLeft size={14} /> Back to Schedule
        </button>

        <span style={{
          fontSize: 10,
          fontWeight: 700,
          padding: '2px 8px',
          borderRadius: 6,
          background: isInProgress ? '#ECFDF5' : isCompleted ? '#F1F5F9' : '#EFF6FF',
          color: isInProgress ? '#047857' : isCompleted ? '#475569' : '#1D4ED8',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}>
          {isInProgress && (
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981' }} />
          )}
          {currentJob.status}
        </span>
      </div>

      {/* Main Job Hero Card (Minimalist) */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: 14,
        border: '1px solid #EEF2F6',
        padding: '16px',
        marginBottom: 12,
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', margin: '0 0 2px 0' }}>
              {currentJob.title}
            </h1>
            <p style={{ fontSize: 12, color: '#64748B', margin: 0 }}>
              {currentJob.clientName}
            </p>
          </div>
          <div style={{
            fontSize: 12,
            fontWeight: 700,
            color: '#0F172A',
            background: '#F8FAFC',
            padding: '4px 8px',
            borderRadius: 6,
            border: '1px solid #E2E8F0',
          }}>
            {currentJob.startTime}
          </div>
        </div>

        {/* Address & Navigation Quick-Action */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 12,
          padding: '8px 10px',
          background: '#F8FAFC',
          borderRadius: 8,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#475569' }}>
            <MapPin size={13} color="#0D9488" style={{ flexShrink: 0 }} />
            <span style={{ fontWeight: 500 }}>{currentJob.address}</span>
          </div>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(currentJob.address)}`}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#0284C7',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            Map <Navigation size={10} />
          </a>
        </div>

        {/* Access Notes Banner */}
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
            <span><strong>Access:</strong> {currentJob.accessNotes}</span>
          </div>
        )}
      </div>

      {/* Check-In / Check-Out Action Station (Client: "the cleanest check-in and check out") */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: 14,
        border: '1px solid #EEF2F6',
        padding: '16px',
        marginBottom: 12,
        textAlign: 'center',
      }}>
        {isInProgress ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 4 }}>
              <span style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#10B981',
              }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#047857', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Active Job In Progress
              </span>
            </div>

            {/* Live Timer Counter */}
            <div style={{
              fontSize: 32,
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-1px',
              fontVariantNumeric: 'tabular-nums',
              margin: '6px 0 2px 0',
            }}>
              {formatTimer(activeTimerSeconds)}
            </div>
            <p style={{ fontSize: 11, color: '#64748B', margin: '0 0 14px 0' }}>
              Checked in at {currentJob.checkInTime} · GPS verified
            </p>

            {/* Complete & Check Out Button */}
            <button
              onClick={() => setCheckoutModalOpen(true)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 10,
                background: '#0F172A',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                transition: 'background 0.15s ease',
              }}
            >
              <CheckCircle2 size={16} /> Complete & Check Out
            </button>
          </div>
        ) : isScheduled ? (
          <div>
            <p style={{ fontSize: 12, color: '#64748B', margin: '0 0 12px 0' }}>
              You are assigned to this shift. Ready to begin work on site?
            </p>
            <button
              onClick={() => checkIn(currentJob.id)}
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: 10,
                background: '#0D9488',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                boxShadow: '0 2px 6px rgba(13,148,136,0.2)',
              }}
            >
              <Clock size={16} /> Tap to Check In (08:30 AM)
            </button>
          </div>
        ) : (
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 12px',
              borderRadius: 20,
              background: '#F1F5F9',
              color: '#334155',
              fontSize: 12,
              fontWeight: 600,
              marginBottom: 4,
            }}>
              <CheckCircle2 size={14} color="#0D9488" />
              Completed: {currentJob.checkInTime} – {currentJob.checkOutTime}
            </div>
            <p style={{ fontSize: 11, color: '#64748B', margin: '4px 0 0 0' }}>
              All checklist items & after photos logged
            </p>
          </div>
        )}
      </div>

      {/* Before / After Media Shortcut Bar */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: 14,
        border: '1px solid #EEF2F6',
        padding: '12px 14px',
        marginBottom: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: '#F0FDFA',
            border: '1px solid #CCFBF1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Camera size={16} color="#0D9488" />
          </div>
          <div>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>
              Job Media Proof
            </span>
            <p style={{ fontSize: 11, color: '#64748B', margin: 0 }}>
              {currentJob.beforeMedia.length} Before · {currentJob.afterMedia.length} After
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('media')}
          style={{
            padding: '6px 12px',
            borderRadius: 8,
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            fontSize: 11,
            fontWeight: 600,
            color: '#0F172A',
            cursor: 'pointer',
          }}
        >
          Open Media Hub →
        </button>
      </div>

      {/* Interactive Room Checklist */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: 14,
        border: '1px solid #EEF2F6',
        padding: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>
            Job Checklist
          </span>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#64748B' }}>
            {completedCount} of {totalCount} Done
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
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
                <CheckCircle2 size={16} color="#0D9488" style={{ flexShrink: 0, marginTop: 1 }} />
              ) : (
                <Circle size={16} color="#CBD5E1" style={{ flexShrink: 0, marginTop: 1 }} />
              )}
              <span style={{
                fontSize: 12,
                color: item.completed ? '#94A3B8' : '#334155',
                textDecoration: item.completed ? 'line-through' : 'none',
                lineHeight: 1.4,
              }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Modal Confirmation */}
      {checkoutModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15,23,42,0.6)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: 16,
            width: '100%',
            maxWidth: 320,
            padding: '20px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: '#ECFDF5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto',
            }}>
              <CheckCircle2 size={24} />
            </div>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', margin: '0 0 6px 0' }}>
              Confirm Job Check-Out
            </h3>
            <p style={{ fontSize: 12, color: '#64748B', margin: '0 0 16px 0' }}>
              Have you captured the required After photos and locked the client premises?
            </p>

            <textarea
              placeholder="Add completion notes (optional)..."
              value={completionNotes}
              onChange={e => setCompletionNotes(e.target.value)}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                borderRadius: 8,
                border: '1px solid #E2E8F0',
                padding: '8px 10px',
                fontSize: 11,
                fontFamily: 'Inter, sans-serif',
                minHeight: 50,
                marginBottom: 14,
                resize: 'none',
              }}
            />

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setCheckoutModalOpen(false)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: 8,
                  background: '#F1F5F9',
                  color: '#475569',
                  border: 'none',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleCheckOutConfirm}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: 8,
                  background: '#0F172A',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: 12,
                  fontWeight: 600,
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
