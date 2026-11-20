import { useState } from 'react'
import { useCleanster } from '../../context/CleansterContext'
import { X, Calendar, Clock, MapPin, Check, Sparkles } from 'lucide-react'

export default function NewBookingModal() {
  const { isNewBookingModalOpen, setIsNewBookingModalOpen, selectedService, createNewBooking } = useCleanster()
  const [date, setDate] = useState('Today · 2:00 PM')
  const [address, setAddress] = useState('100 Cummings Center, Suite 425C, Beverly, MA')
  const [notes, setNotes] = useState('')

  if (!isNewBookingModalOpen || !selectedService) return null

  function handleSubmit(e) {
    e.preventDefault()
    createNewBooking({
      date: 'Sat 28 Nov 2026',
      time: '10:00 AM – 1:00 PM',
      address,
      notes,
    })
  }

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.45)',
      zIndex: 55,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      backdropFilter: 'blur(3px)',
    }}>
      <div
        onClick={() => setIsNewBookingModalOpen(false)}
        style={{ flex: 1, width: '100%' }}
      />

      <div style={{
        background: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: '16px 20px 24px',
        boxSizing: 'border-box',
        maxHeight: '90%',
        overflowY: 'auto',
        boxShadow: '0 -10px 30px rgba(0,0,0,0.15)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: '0 0 2px 0' }}>
              Book {selectedService.title}
            </h2>
            <p style={{ fontSize: 11, color: '#64748B', margin: 0 }}>
              North Shore Cleaning Systems · Beverly, MA
            </p>
          </div>

          <button
            onClick={() => setIsNewBookingModalOpen(false)}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: '#F1F5F9',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748B',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Price & Specs Strip */}
        <div style={{
          background: '#FFF0F5',
          borderRadius: 14,
          padding: '12px 14px',
          border: '1px solid #FCE7F3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}>
          <div>
            <span style={{ fontSize: 11, color: '#9D174D', fontWeight: 600, display: 'block' }}>
              Estimated Price
            </span>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#FA2A70' }}>
              ${selectedService.basePrice}.00
            </span>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: 11, color: '#9D174D', fontWeight: 600, display: 'block' }}>
              Estimated Time
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#831843' }}>
              {selectedService.duration}
            </span>
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Address */}
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 4 }}>
              Service Address (North Shore, MA)
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: 10,
              padding: '10px 12px',
            }}>
              <MapPin size={15} color="#FA2A70" style={{ flexShrink: 0 }} />
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  width: '100%',
                  fontSize: 12,
                  color: '#0F172A',
                  outline: 'none',
                  fontFamily: 'Inter, sans-serif',
                }}
              />
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 4 }}>
              Special Instructions / Lockbox Code
            </label>
            <input
              type="text"
              placeholder="e.g. Keypad #4820, golden retriever in back"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: 10,
                padding: '10px 12px',
                fontSize: 12,
                color: '#0F172A',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
              }}
            />
          </div>

          {/* Confirm Button */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 12,
              background: '#FA2A70',
              color: '#FFFFFF',
              border: 'none',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: 8,
              boxShadow: '0 4px 14px rgba(250, 42, 112, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            Confirm & Schedule Clean
          </button>
        </form>
      </div>
    </div>
  )
}
