import { useState } from 'react'
import { useEmployee } from '../../context/EmployeeContext'
import {
  Clock, MapPin, Key, CheckCircle2, Circle, Camera,
  Play, Pause, Check, ShieldCheck, Navigation, AlertCircle, LogIn, LogOut
} from 'lucide-react'

export default function EmployeeActiveJobPage() {
  const {
    currentJob,
    timerSeconds,
    setTimerSeconds,
    isTimerRunning,
    setIsTimerRunning,
    formatTimer,
    toggleJobChecklist,
    updateJobStatus,
    setEmployeeTab,
  } = useEmployee()

  const [copiedKey, setCopiedKey] = useState(false)
  const [completeAlert, setCompleteAlert] = useState(false)
  const [checkInAlert, setCheckInAlert] = useState(false)

  if (!currentJob) return null

  const completedCount = currentJob.checklist.filter(c => c.done).length
  const totalCount = currentJob.checklist.length
  const progressPercent = Math.round((completedCount / totalCount) * 100)

  function copyCode() {
    navigator.clipboard?.writeText(currentJob.accessCode)
    setCopiedKey(true)
    setTimeout(() => setCopiedKey(false), 2000)
  }

  function handleCheckIn() {
    setTimerSeconds(0)
    setIsTimerRunning(true)
    updateJobStatus(currentJob.id, 'In Progress')
    setCheckInAlert(true)
    setTimeout(() => setCheckInAlert(false), 2500)
  }

  function handleCompleteJob() {
    updateJobStatus(currentJob.id, 'Completed')
    setIsTimerRunning(false)
    setCompleteAlert(true)
    setTimeout(() => setCompleteAlert(false), 3000)
  }

  return (
    <div style={{ padding: '14px 16px 28px', fontFamily: 'Inter, sans-serif' }}>
      {/* ── Active Timer & Job Header Card ── */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: 16,
        border: '1px solid #E2E8F0',
        padding: '16px',
        marginBottom: 14,
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
      }}>
        {/* Top Badges */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{
            fontSize: 10.5,
            fontWeight: 700,
            background: '#EFF6FF',
            color: '#0B4A8F',
            padding: '3px 8px',
            borderRadius: 8,
          }}>
            Job #{currentJob.jobCode}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: isTimerRunning ? '#10B981' : '#F59E0B',
              animation: isTimerRunning ? 'pulse 1.5s infinite' : 'none',
            }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: isTimerRunning ? '#059669' : '#D97706' }}>
              {isTimerRunning ? 'Timer Active' : 'Paused'}
            </span>
          </div>
        </div>

        {/* Live Timer Display with inside Pause/Resume control */}
        <div style={{
          textAlign: 'center',
          background: '#F8FAFC',
          borderRadius: 14,
          padding: '14px 10px',
          border: '1px solid #E2E8F0',
          marginBottom: 14,
        }}>
          <span style={{ fontSize: 11, color: '#64748B', fontWeight: 600, display: 'block', marginBottom: 2 }}>
            ELAPSED ON-SITE TIME
          </span>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <span style={{
              fontSize: 32,
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '1px',
              fontVariantNumeric: 'tabular-nums',
            }}>
              {formatTimer(timerSeconds)}
            </span>

            {/* Small Pause / Play Button inside Timer Section */}
            <button
              type="button"
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              title={isTimerRunning ? 'Pause Timer' : 'Resume Timer'}
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: isTimerRunning ? '#F1F5F9' : '#0B4A8F',
                color: isTimerRunning ? '#475569' : '#FFFFFF',
                border: isTimerRunning ? '1px solid #CBD5E1' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {isTimerRunning ? <Pause size={12} /> : <Play size={12} style={{ marginLeft: 1 }} />}
            </button>
          </div>

          <span style={{ fontSize: 11, color: '#94A3B8' }}>
            Scheduled Window: {currentJob.startTime} – {currentJob.endTime}
          </span>
        </div>

        {/* Action Buttons: Check In & Checkout */}
        <div style={{ display: 'flex', gap: 10 }}>
          {/* Check In Button (starts timer from 0) */}
          <button
            onClick={handleCheckIn}
            style={{
              flex: 1,
              padding: '11px 10px',
              borderRadius: 12,
              background: '#EFF6FF',
              color: '#0B4A8F',
              border: '1px solid #BFDBFE',
              fontWeight: 700,
              fontSize: 12.5,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <LogIn size={15} />
            <span>Check In</span>
          </button>

          {/* Checkout Button */}
          <button
            onClick={handleCompleteJob}
            style={{
              flex: 1.2,
              padding: '11px 10px',
              borderRadius: 12,
              background: '#0B4A8F',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 700,
              fontSize: 12.5,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              boxShadow: '0 3px 10px rgba(11, 74, 143, 0.22)',
            }}
          >
            <LogOut size={15} />
            <span>Checkout</span>
          </button>
        </div>
      </div>

      {/* Check In Toast Alert */}
      {checkInAlert && (
        <div style={{
          background: '#0B4A8F',
          color: '#FFFFFF',
          padding: '10px 16px',
          borderRadius: 12,
          fontSize: 12.5,
          fontWeight: 600,
          textAlign: 'center',
          marginBottom: 14,
          animation: 'fadeIn 0.2s ease',
        }}>
          ✓ Checked in successfully! Timer started from 00:00.
        </div>
      )}

      {/* Checkout Toast Alert */}
      {completeAlert && (
        <div style={{
          background: '#059669',
          color: '#FFFFFF',
          padding: '10px 16px',
          borderRadius: 12,
          fontSize: 12.5,
          fontWeight: 600,
          textAlign: 'center',
          marginBottom: 14,
          animation: 'fadeIn 0.2s ease',
        }}>
          ✓ Shift checked out & completed! Logged to dispatch.
        </div>
      )}

      {/* ── Location & Lockbox Access Card ── */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: 18,
        border: '1px solid #E2E8F0',
        padding: '14px 16px',
        marginBottom: 14,
      }}>
        <h3 style={{ fontSize: 13.5, fontWeight: 700, color: '#0F172A', margin: '0 0 10px 0' }}>
          Property Location & Key Access
        </h3>

        {/* Address */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
          <MapPin size={15} color="#0B4A8F" style={{ marginTop: 2, flexShrink: 0 }} />
          <div>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: '#0F172A', display: 'block' }}>
              {currentJob.address}
            </span>
            <span style={{ fontSize: 11, color: '#64748B' }}>
              {currentJob.clientName}
            </span>
          </div>
        </div>

        {/* Access Code Box */}
        <div style={{
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: 12,
          padding: '10px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Key size={15} color="#D97706" />
            <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>
              {currentJob.accessCode}
            </span>
          </div>
          <button
            onClick={copyCode}
            style={{
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              padding: '4px 8px',
              borderRadius: 6,
              fontSize: 10.5,
              fontWeight: 600,
              cursor: 'pointer',
              color: copiedKey ? '#059669' : '#0B4A8F',
            }}
          >
            {copiedKey ? 'Copied!' : 'Copy Code'}
          </button>
        </div>

        <p style={{ fontSize: 11, color: '#64748B', margin: '8px 0 0 0', lineHeight: 1.35 }}>
          {currentJob.accessNotes}
        </p>
      </div>

      {/* ── Interactive Task Checklist Card ── */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: 18,
        border: '1px solid #E2E8F0',
        padding: '16px',
        marginBottom: 14,
      }}>
        {/* Checklist Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', margin: 0 }}>
              Cleaning Checklist
            </h3>
            <span style={{ fontSize: 11, color: '#64748B' }}>
              Tap items as you complete each task
            </span>
          </div>
          <span style={{
            fontSize: 12,
            fontWeight: 800,
            color: progressPercent === 100 ? '#059669' : '#0B4A8F',
          }}>
            {completedCount}/{totalCount} ({progressPercent}%)
          </span>
        </div>

        {/* Progress Bar */}
        <div style={{
          width: '100%',
          height: 6,
          borderRadius: 3,
          background: '#F1F5F9',
          overflow: 'hidden',
          marginBottom: 14,
        }}>
          <div style={{
            height: '100%',
            width: `${progressPercent}%`,
            background: progressPercent === 100 ? '#059669' : '#0B4A8F',
            borderRadius: 3,
            transition: 'width 0.25s ease',
          }} />
        </div>

        {/* Task Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {currentJob.checklist.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleJobChecklist(currentJob.id, item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 10px',
                borderRadius: 10,
                background: item.done ? '#F8FAFC' : '#FFFFFF',
                border: item.done ? '1px solid #E2E8F0' : '1px solid #CBD5E1',
                cursor: 'pointer',
                transition: 'all 0.12s ease',
              }}
            >
              <div style={{
                width: 20,
                height: 20,
                borderRadius: 6,
                background: item.done ? '#0B4A8F' : 'transparent',
                border: item.done ? 'none' : '2px solid #94A3B8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                flexShrink: 0,
              }}>
                {item.done && <Check size={13} strokeWidth={3} />}
              </div>

              <span style={{
                flex: 1,
                fontSize: 12,
                color: '#0F172A',
                fontWeight: 500,
              }}>
                {item.task}
              </span>

              <span style={{
                fontSize: 9.5,
                fontWeight: 600,
                color: '#64748B',
                background: '#F1F5F9',
                padding: '2px 6px',
                borderRadius: 6,
              }}>
                {item.area}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Media Proof Shortcut Card ── */}
      <button
        onClick={() => setEmployeeTab('media')}
        style={{
          width: '100%',
          padding: '14px 16px',
          borderRadius: 16,
          background: '#FFFFFF',
          border: '1.5px dashed #0B4A8F',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: '#EEF5FC',
            color: '#0B4A8F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Camera size={18} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', display: 'block' }}>
              Before & After Photo Proofs
            </span>
            <span style={{ fontSize: 11, color: '#64748B' }}>
              {currentJob.beforePhotos.length} Before · {currentJob.afterPhotos.length} After uploaded
            </span>
          </div>
        </div>

        <span style={{ fontSize: 12, fontWeight: 700, color: '#0B4A8F' }}>
          Open Media →
        </span>
      </button>
    </div>
  )
}
