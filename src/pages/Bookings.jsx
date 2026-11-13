import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, Clock, MapPin, Trash2, RotateCcw, ClipboardList } from 'lucide-react'
import ServiceIcon from '../components/ServiceIcon'

const statusStyle = {
  Confirmed: { bg: '#E8F5E9', color: '#2E7D32' },
  Cancelled:  { bg: '#FFEBEE', color: '#C62828' },
  Completed:  { bg: '#F3F4F6', color: '#6B7280' },
}

const filters = ['All', 'Confirmed', 'Completed', 'Cancelled']

export default function Bookings() {
  const [bookings, setBookings] = useState([])
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bookings') || '[]')
    setBookings(stored.reverse())
  }, [])

  function cancel(id) {
    const updated = bookings.map((b) => b.id === id ? { ...b, status: 'Cancelled' } : b)
    setBookings(updated)
    localStorage.setItem('bookings', JSON.stringify([...updated].reverse()))
  }

  const visible = filter === 'All' ? bookings : bookings.filter((b) => b.status === filter)

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', paddingBottom: 8 }}>

      {/* Header */}
      <div style={{ padding: '12px 16px 10px', background: '#fff', borderBottom: '1px solid #f0f4f8' }}>
        <p style={{ fontSize: 18, fontWeight: 800, color: '#111', letterSpacing: '-0.4px' }}>My Bookings</p>
        <p style={{ fontSize: 11, color: '#8a9bb0', marginTop: 2 }}>Track your cleaning appointments</p>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: 8, padding: '10px 16px', overflowX: 'auto', background: '#fff', borderBottom: '1px solid #f0f4f8' }} className="scrollbar-hide">
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={{ flexShrink: 0, padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: filter === f ? 600 : 400, fontFamily: 'Inter, sans-serif', background: filter === f ? '#2196C9' : '#F0F4F8', color: filter === f ? '#fff' : '#667788', transition: 'all 0.15s' }}>
            {f}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {visible.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '50px 0', gap: 10, textAlign: 'center' }}>
            <div style={{ width: 60, height: 60, background: '#F0F4F8', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ClipboardList size={28} color="#b0bac8" />
            </div>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#333' }}>No bookings yet</p>
            <p style={{ fontSize: 11, color: '#a0aab8', maxWidth: 180 }}>
              {filter === 'All' ? "You haven't made any bookings yet." : `No ${filter.toLowerCase()} bookings.`}
            </p>
            <Link to="/services" style={{ background: '#2196C9', color: '#fff', borderRadius: 12, padding: '10px 20px', fontSize: 13, fontWeight: 600, textDecoration: 'none', marginTop: 4 }}>
              Browse Services
            </Link>
          </div>
        ) : visible.map((b) => {
          const st = statusStyle[b.status] || statusStyle.Completed
          return (
            <div key={b.id} style={{ background: '#fff', borderRadius: 16, padding: '14px', border: '1px solid #f0f4f8', boxShadow: '0 2px 8px rgba(33,150,201,0.06)' }}>

              {/* Top row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <ServiceIcon
                    iconName={b.iconName || 'home'}
                    iconColor={b.iconColor || '#2196C9'}
                    iconBg={b.iconBg || '#EBF5FB'}
                    size={42} iconSize={19} radius={12}
                  />
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 2 }}>{b.serviceTitle}</p>
                    <p style={{ fontSize: 11, color: '#8a9bb0' }}>from ${b.price}</p>
                  </div>
                </div>
                <span style={{ fontSize: 10, fontWeight: 600, background: st.bg, color: st.color, padding: '4px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                  {b.status}
                </span>
              </div>

              {/* Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: '10px 0', borderTop: '1px solid #f5f7fa', borderBottom: b.status === 'Confirmed' ? '1px solid #f5f7fa' : 'none', marginBottom: b.status === 'Confirmed' ? 10 : 0 }}>
                {[[CalendarDays, b.date], [Clock, b.time], [MapPin, b.address]].map(([Icon, val]) => (
                  <div key={val} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <Icon size={12} color="#2196C9" />
                    <span style={{ fontSize: 11, color: '#555', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{val}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              {b.status === 'Confirmed' && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <Link to={`/book/${b.serviceId}`} style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#EBF5FB', color: '#2196C9', borderRadius: 10, padding: '7px 12px', fontSize: 11, fontWeight: 600, textDecoration: 'none' }}>
                    <RotateCcw size={11} /> Rebook
                  </Link>
                  <button onClick={() => cancel(b.id)} style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#FFEBEE', color: '#E53935', borderRadius: 10, padding: '7px 12px', fontSize: 11, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginLeft: 'auto' }}>
                    <Trash2 size={11} /> Cancel
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
