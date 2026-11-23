import { useState } from 'react'
import { useCleanster } from '../../context/CleansterContext'
import { X, Calendar, Clock, MapPin, Check, Sparkles, ShieldCheck } from 'lucide-react'

export default function NewBookingModal() {
  const { isNewBookingModalOpen, setIsNewBookingModalOpen, selectedService, createNewBooking } = useCleanster()
  const [selectedDate, setSelectedDate] = useState('Tomorrow, Nov 24')
  const [selectedTime, setSelectedTime] = useState('Morning (8:00 AM – 11:00 AM)')
  const [frequency, setFrequency] = useState('One-Time Clean')
  const [address, setAddress] = useState('100 Cummings Center, Suite 425C, Beverly, MA')
  const [notes, setNotes] = useState('')

  if (!isNewBookingModalOpen || !selectedService) return null

  function handleSubmit(e) {
    e.preventDefault()
    createNewBooking({
      date: selectedDate,
      time: selectedTime,
      frequency,
      address,
      notes,
    })
  }

  const dateOptions = [
    'Tomorrow, Nov 24',
    'Wed, Nov 25',
    'Thu, Nov 26',
    'Fri, Nov 27',
  ]

  const timeOptions = [
    'Morning (8:00 AM – 11:00 AM)',
    'Afternoon (12:00 PM – 3:00 PM)',
    'Evening (3:30 PM – 6:30 PM)',
  ]

  const frequencyOptions = [
    { label: 'One-Time Clean', discount: null },
    { label: 'Weekly', discount: '15% Off' },
    { label: 'Bi-Weekly', discount: '10% Off' },
  ]

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
      {/* Click outside backdrop to close */}
      <div
        onClick={() => setIsNewBookingModalOpen(false)}
        style={{ flex: 1, width: '100%' }}
      />

      {/* Bottom Sheet Card: Exactly 75% (3/4 part) of the screen height */}
      <div style={{
        background: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        height: '75%',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        boxShadow: '0 -10px 30px rgba(0,0,0,0.15)',
        animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden',
      }}>
        {/* Fixed Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px 14px',
          borderBottom: '1px solid #F1F5F9',
          flexShrink: 0,
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

        {/* Scrollable Form Body */}
        <form
          id="booking-form"
          onSubmit={handleSubmit}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            boxSizing: 'border-box',
          }}
        >
          {/* Price & Specs Strip */}
          <div style={{
            background: '#EEF5FC',
            borderRadius: 14,
            padding: '12px 16px',
            border: '1px solid #D0E3F5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <span style={{ fontSize: 11, color: '#0B4A8F', fontWeight: 600, display: 'block' }}>
                Estimated Price
              </span>
              <span style={{ fontSize: 21, fontWeight: 800, color: '#0B4A8F' }}>
                ${selectedService.basePrice}.00
              </span>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 11, color: '#0B4A8F', fontWeight: 600, display: 'block' }}>
                Estimated Time
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>
                {selectedService.duration}
              </span>
            </div>
          </div>

          {/* Schedule Date Selection */}
          <div>
            <label style={{ fontSize: 11.5, fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <Calendar size={13} color="#0B4A8F" />
              <span>Select Date</span>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              {dateOptions.map(d => {
                const isSelected = selectedDate === d
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDate(d)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 10,
                      border: isSelected ? '1.5px solid #0B4A8F' : '1px solid #E2E8F0',
                      background: isSelected ? '#EFF6FF' : '#F8FAFC',
                      color: isSelected ? '#0B4A8F' : '#334155',
                      fontSize: 12,
                      fontWeight: isSelected ? 700 : 500,
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.12s ease',
                    }}
                  >
                    {d}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Arrival Window / Time Selection */}
          <div>
            <label style={{ fontSize: 11.5, fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <Clock size={13} color="#0B4A8F" />
              <span>Arrival Window</span>
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {timeOptions.map(t => {
                const isSelected = selectedTime === t
                return (
                  <div
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: 10,
                      border: isSelected ? '1.5px solid #0B4A8F' : '1px solid #E2E8F0',
                      background: isSelected ? '#EFF6FF' : '#F8FAFC',
                      cursor: 'pointer',
                      transition: 'all 0.12s ease',
                    }}
                  >
                    <span style={{
                      fontSize: 12,
                      fontWeight: isSelected ? 700 : 500,
                      color: isSelected ? '#0B4A8F' : '#334155',
                    }}>
                      {t}
                    </span>
                    <div style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      border: isSelected ? '5px solid #0B4A8F' : '2px solid #CBD5E1',
                      background: '#FFFFFF',
                      boxSizing: 'border-box',
                    }} />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Frequency Options */}
          <div>
            <label style={{ fontSize: 11.5, fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 8 }}>
              Cleaning Frequency
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              {frequencyOptions.map(f => {
                const isSelected = frequency === f.label
                return (
                  <button
                    key={f.label}
                    type="button"
                    onClick={() => setFrequency(f.label)}
                    style={{
                      flex: 1,
                      padding: '9px 8px',
                      borderRadius: 10,
                      border: isSelected ? '1.5px solid #0B4A8F' : '1px solid #E2E8F0',
                      background: isSelected ? '#EFF6FF' : '#F8FAFC',
                      color: isSelected ? '#0B4A8F' : '#334155',
                      cursor: 'pointer',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <span style={{ fontSize: 11.5, fontWeight: isSelected ? 700 : 600 }}>
                      {f.label}
                    </span>
                    {f.discount && (
                      <span style={{
                        fontSize: 9.5,
                        fontWeight: 700,
                        color: '#059669',
                        background: '#DCFCE7',
                        padding: '1px 6px',
                        borderRadius: 6,
                      }}>
                        {f.discount}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Service Address */}
          <div>
            <label style={{ fontSize: 11.5, fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 4 }}>
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
              <MapPin size={15} color="#0B4A8F" style={{ flexShrink: 0 }} />
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
            <label style={{ fontSize: 11.5, fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 4 }}>
              Special Instructions / Lockbox Code
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Keypad #4820, dog will be crated, please focus on kitchen floors"
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
                resize: 'none',
              }}
            />
          </div>

          {/* North Shore Quality Assurance Badges */}
          <div style={{
            background: '#F8FAFC',
            borderRadius: 12,
            padding: '12px 14px',
            border: '1px solid #F1F5F9',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#475569' }}>
              <ShieldCheck size={14} color="#059669" />
              <span>Insured, bonded & background-checked North Shore cleaners</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#475569' }}>
              <Sparkles size={14} color="#0B4A8F" />
              <span>Eco-friendly non-toxic supplies & commercial equipment included</span>
            </div>
          </div>
        </form>

        {/* Fixed Footer with Confirm Button */}
        <div style={{
          padding: '12px 20px 18px',
          borderTop: '1px solid #F1F5F9',
          background: '#FFFFFF',
          flexShrink: 0,
        }}>
          <button
            type="submit"
            form="booking-form"
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 12,
              background: '#0B4A8F',
              color: '#FFFFFF',
              border: 'none',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(11, 74, 143, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              transition: 'opacity 0.15s ease',
            }}
          >
            Confirm & Schedule Clean
          </button>
        </div>
      </div>
    </div>
  )
}
