import { useState } from 'react'
import { useCleanster } from '../../context/CleansterContext'
import { X, Star, Check } from 'lucide-react'

const issueOptions = [
  'Poor cleaning',
  'Supplies problems',
  'Cleaner not polite',
  "Didn't follow checklist",
  'Late arrival',
  'More issues',
]

export default function ReviewModal() {
  const { isReviewModalOpen, setIsReviewModalOpen, activeBooking, submitReview } = useCleanster()
  const [rating, setRating] = useState(5)
  const [selectedIssues, setSelectedIssues] = useState([])
  const [tip, setTip] = useState(15) // $15 tip default
  const [showTipPicker, setShowTipPicker] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (!isReviewModalOpen) return null

  function toggleIssue(issue) {
    if (selectedIssues.includes(issue)) {
      setSelectedIssues(selectedIssues.filter(i => i !== issue))
    } else {
      if (selectedIssues.length < 5) {
        setSelectedIssues([...selectedIssues, issue])
      }
    }
  }

  function handleSubmit() {
    setSubmitted(true)
    setTimeout(() => {
      submitReview(rating, selectedIssues, tip)
      setSubmitted(false)
    }, 1200)
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
        onClick={() => setIsReviewModalOpen(false)}
        style={{ flex: 1, width: '100%' }}
      />

      {/* Sheet Content (Matching Image 6) */}
      <div style={{
        background: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: '12px 20px 24px',
        boxSizing: 'border-box',
        maxHeight: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 -10px 30px rgba(0,0,0,0.15)',
        textAlign: 'center',
      }}>
        {/* Drag Handle Bar */}
        <div style={{
          width: 36,
          height: 4,
          borderRadius: 2,
          background: '#CBD5E1',
          marginBottom: 12,
        }} />

        {/* Title */}
        <h2 style={{
          fontSize: 16,
          fontWeight: 700,
          color: '#111827',
          margin: '0 0 14px 0',
        }}>
          Review
        </h2>

        {/* Cleaner Avatar */}
        <div style={{ position: 'relative', marginBottom: 10 }}>
          <img
            src={activeBooking?.cleaner?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt="Cleaner"
            style={{
              width: 58,
              height: 58,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #F1F5F9',
            }}
          />
        </div>

        {/* Rate Prompt */}
        <h3 style={{
          fontSize: 16,
          fontWeight: 800,
          color: '#0F172A',
          margin: '0 0 3px 0',
        }}>
          Rate your cleaning
        </h3>
        <p style={{
          fontSize: 12,
          color: '#64748B',
          margin: '0 0 14px 0',
        }}>
          {activeBooking?.dateFormatted || 'Fri, Nov 20, 2026'}
        </p>

        {/* 5 Interactive Golden Stars (Image 6) */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              onClick={() => setRating(star)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 2,
              }}
            >
              <Star
                size={28}
                fill={star <= rating ? '#F59E0B' : '#E2E8F0'}
                color={star <= rating ? '#F59E0B' : '#CBD5E1'}
              />
            </button>
          ))}
        </div>

        {/* Select an Issue Section (Image 6) */}
        <div style={{ width: '100%', marginBottom: 20 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#111827', display: 'block' }}>
            Select an issue
          </span>
          <span style={{ fontSize: 11, color: '#94A3B8', display: 'block', marginBottom: 10 }}>
            Choose up to 5 issues
          </span>

          {/* Issue Pills */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 8,
          }}>
            {issueOptions.map(issue => {
              const isSelected = selectedIssues.includes(issue)
              return (
                <button
                  key={issue}
                  onClick={() => toggleIssue(issue)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 20,
                    border: isSelected ? '1.5px solid #FA2A70' : '1px solid #E2E8F0',
                    background: isSelected ? '#FFF0F5' : '#FFFFFF',
                    color: isSelected ? '#FA2A70' : '#475569',
                    fontSize: 11,
                    fontWeight: isSelected ? 600 : 500,
                    cursor: 'pointer',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {issue}
                </button>
              )
            })}
          </div>
        </div>

        {/* Tip Picker Row if toggled */}
        {showTipPicker && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginBottom: 16,
          }}>
            {[5, 10, 15, 20].map(amt => (
              <button
                key={amt}
                onClick={() => setTip(amt)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 14,
                  border: tip === amt ? '1.5px solid #FA2A70' : '1px solid #E2E8F0',
                  background: tip === amt ? '#FFF0F5' : '#FFFFFF',
                  color: tip === amt ? '#FA2A70' : '#475569',
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                ${amt}
              </button>
            ))}
          </div>
        )}

        {/* Actions (Image 6) */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Add Tips Button */}
          <button
            onClick={() => setShowTipPicker(!showTipPicker)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 12,
              background: '#FFFFFF',
              color: '#0F172A',
              border: '1.5px solid #E2E8F0',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {tip > 0 ? `Tip Added: $${tip}.00` : 'Add tips'}
          </button>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: '13px',
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
            {submitted ? (
              <>
                <Check size={18} strokeWidth={2.5} /> Submitted!
              </>
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
