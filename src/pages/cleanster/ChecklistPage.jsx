import { useState } from 'react'
import { useCleanster } from '../../context/CleansterContext'
import {
  ArrowLeft, Plus, MoreVertical, CheckCircle2, Circle,
  ChevronDown, ChevronUp
} from 'lucide-react'

export default function ChecklistPage() {
  const { checklists, toggleTask, setActiveTab } = useCleanster()
  const [expandedId, setExpandedId] = useState(null) // All collapsed by default

  function toggleExpand(id) {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div style={{
      padding: '12px 16px 28px',
      fontFamily: 'Inter, sans-serif',
      background: '#F8FAFC',
      minHeight: '100%',
      boxSizing: 'border-box',
    }}>
      {/* ── Top Header with Back Arrow, Title & "+" (Image 5) ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
      }}>
        <button
          onClick={() => setActiveTab('bookings')}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            color: '#0F172A',
          }}
        >
          <ArrowLeft size={18} />
        </button>

        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontSize: 16,
            fontWeight: 700,
            color: '#0F172A',
            margin: '0 0 1px 0',
          }}>
            Checklist - Tasks
          </h1>
          <p style={{ fontSize: 11, color: '#64748B', margin: 0 }}>
            Checklist - North Shore Cleaning
          </p>
        </div>

        <button
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            color: '#0F172A',
          }}
        >
          <Plus size={20} />
        </button>
      </div>

      {/* ── Room by Room / Category Cards (Matching Image 5) ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {checklists.map(cat => {
          const isExpanded = expandedId === cat.id
          const completedCount = cat.tasks.filter(t => t.done).length

          return (
            <div
              key={cat.id}
              style={{
                background: '#FFFFFF',
                borderRadius: 16,
                border: '1px solid #EEF2F6',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                overflow: 'hidden',
                transition: 'all 0.15s ease',
              }}
            >
              {/* Card Header (Image 5) */}
              <div
                onClick={() => toggleExpand(cat.id)}
                style={{
                  padding: '10px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {/* Photo Thumbnail */}
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: 10,
                    overflow: 'hidden',
                    background: '#F1F5F9',
                    flexShrink: 0,
                  }}>
                    <img
                      src={cat.thumbnail}
                      alt={cat.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Title & Subtasks Count */}
                  <div>
                    <h3 style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: '#0F172A',
                      margin: '0 0 2px 0',
                    }}>
                      {cat.title}
                    </h3>
                    <p style={{
                      fontSize: 11,
                      color: '#64748B',
                      margin: 0,
                    }}>
                      {cat.tasks.length} Subtasks · ({completedCount} done)
                    </p>
                  </div>
                </div>

                {/* Right: 3 Dots Menu (Image 5) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#94A3B8' }}>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  <MoreVertical size={16} />
                </div>
              </div>

              {/* Expandable Subtasks Checklist */}
              {isExpanded && (
                <div style={{
                  borderTop: '1px solid #F8FAFC',
                  padding: '10px 14px 14px',
                  background: '#FCFDFE',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}>
                  {cat.tasks.map((task, idx) => (
                    <div
                      key={idx}
                      onClick={() => toggleTask(cat.id, idx)}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                        cursor: 'pointer',
                        padding: '4px 0',
                      }}
                    >
                      {task.done ? (
                        <CheckCircle2 size={16} color="#0B4A8F" style={{ flexShrink: 0, marginTop: 1 }} />
                      ) : (
                        <Circle size={16} color="#CBD5E1" style={{ flexShrink: 0, marginTop: 1 }} />
                      )}
                      <span style={{
                        fontSize: 12,
                        color: task.done ? '#94A3B8' : '#334155',
                        textDecoration: task.done ? 'line-through' : 'none',
                        lineHeight: 1.35,
                      }}>
                        {task.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
