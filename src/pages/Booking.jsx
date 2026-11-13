import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ArrowLeft, CalendarDays, Clock, MapPin, CheckCircle } from 'lucide-react'
import { services } from '../data/services'
import ServiceIcon from '../components/ServiceIcon'

const timeSlots = ['8:00 AM','9:00 AM','10:00 AM','11:00 AM','1:00 PM','2:00 PM','3:00 PM','4:00 PM']

function getNext7Days() {
  const days = [], n = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  const m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  for (let i = 0; i < 7; i++) {
    const d = new Date(); d.setDate(d.getDate() + i)
    days.push({ label: i === 0 ? 'Today' : n[d.getDay()], date: d.getDate(), month: m[d.getMonth()], full: d.toISOString().slice(0,10) })
  }
  return days
}

export default function Booking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const service = services.find((s) => s.id === id)

  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const days = getNext7Days()

  if (!service) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 12, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ fontSize: 40 }}>🤷</div>
      <Link to="/services" style={{ color: '#2196C9', fontSize: 13 }}>← Back to Services</Link>
    </div>
  )

  function validate() {
    const e = {}
    if (!selectedDate) e.date = 'Select a date'
    if (!selectedTime) e.time = 'Select a time'
    if (!address.trim()) e.address = 'Enter your address'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const ev = validate()
    if (Object.keys(ev).length) { setErrors(ev); return }
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    bookings.push({ id: Date.now(), serviceId: service.id, serviceTitle: service.title, price: service.price, iconName: service.iconName, iconColor: service.iconColor, iconBg: service.iconBg, date: selectedDate, time: selectedTime, address, notes, status: 'Confirmed', createdAt: new Date().toISOString() })
    localStorage.setItem('bookings', JSON.stringify(bookings))
    setSubmitted(true)
  }

  if (submitted) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '0 24px', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ width: 72, height: 72, background: '#E8F8EE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <CheckCircle size={36} color="#34C759" />
      </div>
      <p style={{ fontSize: 20, fontWeight: 800, color: '#111', marginBottom: 6 }}>Booking Confirmed!</p>
      <p style={{ fontSize: 12, color: '#8a9bb0', lineHeight: 1.6, marginBottom: 24 }}>
        {service.title} on <b>{selectedDate}</b> at <b>{selectedTime}</b>.<br />We'll be there!
      </p>
      <Link to="/my-bookings" style={{ width: '100%', background: '#2196C9', color: '#fff', borderRadius: 14, padding: '13px', fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'block', marginBottom: 10 }}>
        View My Bookings
      </Link>
      <Link to="/" style={{ width: '100%', background: '#F0F4F8', color: '#555', borderRadius: 14, padding: '13px', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'block' }}>
        Back to Home
      </Link>
    </div>
  )

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', paddingBottom: 16 }}>
      {/* Header */}
      <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, background: '#fff', borderBottom: '1px solid #f0f4f8' }}>
        <button onClick={() => navigate(-1)} style={{ width: 34, height: 34, borderRadius: 10, background: '#F0F4F8', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ArrowLeft size={16} color="#333" />
        </button>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>Book Service</span>
      </div>

      <div style={{ padding: '12px 16px' }}>
        {/* Service chip */}
        <div style={{ background: '#2196C9', borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <ServiceIcon iconName={service.iconName} iconColor={service.iconColor} iconBg="rgba(255,255,255,0.2)" size={44} iconSize={22} radius={12} />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{service.title}</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>{service.duration}</p>
          </div>
          <p style={{ fontSize: 17, fontWeight: 800, color: '#fff' }}>${service.price}</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Date */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <CalendarDays size={14} color="#2196C9" />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>Select Date</span>
            </div>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }} className="scrollbar-hide">
              {days.map((d) => (
                <button type="button" key={d.full} onClick={() => { setSelectedDate(d.full); setErrors(p => ({ ...p, date: '' })) }}
                  style={{ flexShrink: 0, padding: '8px 12px', borderRadius: 12, border: 'none', cursor: 'pointer', textAlign: 'center', fontFamily: 'Inter, sans-serif',
                    background: selectedDate === d.full ? '#2196C9' : '#F0F4F8',
                    color: selectedDate === d.full ? '#fff' : '#555',
                  }}>
                  <div style={{ fontSize: 9, opacity: 0.8, marginBottom: 2 }}>{d.label}</div>
                  <div style={{ fontSize: 16, fontWeight: 800 }}>{d.date}</div>
                  <div style={{ fontSize: 9, opacity: 0.8 }}>{d.month}</div>
                </button>
              ))}
            </div>
            {errors.date && <p style={{ fontSize: 10, color: '#ff5a5f', marginTop: 4 }}>{errors.date}</p>}
          </div>

          {/* Time */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <Clock size={14} color="#2196C9" />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>Select Time</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 6 }}>
              {timeSlots.map((slot) => (
                <button type="button" key={slot} onClick={() => { setSelectedTime(slot); setErrors(p => ({ ...p, time: '' })) }}
                  style={{ padding: '8px 4px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: selectedTime === slot ? 700 : 400, fontFamily: 'Inter, sans-serif',
                    background: selectedTime === slot ? '#2196C9' : '#F0F4F8',
                    color: selectedTime === slot ? '#fff' : '#555',
                  }}>
                  {slot}
                </button>
              ))}
            </div>
            {errors.time && <p style={{ fontSize: 10, color: '#ff5a5f', marginTop: 4 }}>{errors.time}</p>}
          </div>

          {/* Address */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <MapPin size={14} color="#2196C9" />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>Address</span>
            </div>
            <input type="text" placeholder="123 Main St, Beverly, MA" value={address}
              onChange={(e) => { setAddress(e.target.value); setErrors(p => ({ ...p, address: '' })) }}
              style={{ width: '100%', padding: '11px 12px', borderRadius: 12, border: `1px solid ${errors.address ? '#ff5a5f' : '#e8edf2'}`, fontSize: 13, color: '#333', fontFamily: 'Inter, sans-serif', outline: 'none', boxSizing: 'border-box', background: '#fff' }}
            />
            {errors.address && <p style={{ fontSize: 10, color: '#ff5a5f', marginTop: 4 }}>{errors.address}</p>}
          </div>

          {/* Notes */}
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#111', display: 'block', marginBottom: 8 }}>Notes <span style={{ fontWeight: 400, color: '#a0aab8' }}>(optional)</span></span>
            <textarea rows={2} placeholder="Special instructions..." value={notes} onChange={(e) => setNotes(e.target.value)}
              style={{ width: '100%', padding: '11px 12px', borderRadius: 12, border: '1px solid #e8edf2', fontSize: 13, color: '#333', fontFamily: 'Inter, sans-serif', outline: 'none', resize: 'none', boxSizing: 'border-box', background: '#fff' }}
            />
          </div>

          {/* Summary */}
          {selectedDate && selectedTime && (
            <div style={{ background: '#EBF5FB', borderRadius: 14, padding: '12px', marginBottom: 14 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#111', marginBottom: 8 }}>Summary</p>
              {[['Service', service.title], ['Date & Time', `${selectedDate} · ${selectedTime}`], ['Duration', service.duration]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: '#8a9bb0' }}>{k}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#333' }}>{v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #d0e8f4', paddingTop: 8, marginTop: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#111' }}>Total</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: '#2196C9' }}>from ${service.price}</span>
              </div>
            </div>
          )}

          <button type="submit" style={{ width: '100%', background: '#2196C9', color: '#fff', border: 'none', borderRadius: 14, padding: '14px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  )
}
