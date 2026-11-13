import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Star, Clock, ChevronRight } from 'lucide-react'
import { services } from '../data/services'
import ServiceIcon from '../components/ServiceIcon'

const filters = ['All', 'Home', 'Commercial', 'Deep', 'Move']

const filterMap = {
  Home:       ['residential'],
  Commercial: ['commercial'],
  Deep:       ['deep-cleaning'],
  Move:       ['move-in-out', 'post-construction'],
}

export default function Services() {
  const [active, setActive] = useState('All')
  const [q, setQ] = useState('')

  const list = services.filter((s) => {
    const matchF = active === 'All' || (filterMap[active] || []).includes(s.id)
    const matchQ = !q || s.title.toLowerCase().includes(q.toLowerCase())
    return matchF && matchQ
  })

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', paddingBottom: 8 }}>

      {/* Header */}
      <div style={{ padding: '12px 16px 10px', background: '#fff', borderBottom: '1px solid #f0f4f8' }}>
        <p style={{ fontSize: 18, fontWeight: 800, color: '#111', marginBottom: 10, letterSpacing: '-0.4px' }}>Services</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F7F9FC', borderRadius: 12, padding: '9px 12px', border: '1px solid #eef1f5' }}>
          <Search size={14} color="#8a9bb0" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search services..."
            style={{ flex: 1, border: 'none', background: 'transparent', fontSize: 13, color: '#333', outline: 'none', fontFamily: 'Inter, sans-serif' }}
          />
        </div>
      </div>

      {/* Filter pills */}
      <div style={{ display: 'flex', gap: 8, padding: '12px 16px', overflowX: 'auto', background: '#fff', borderBottom: '1px solid #f0f4f8' }} className="scrollbar-hide">
        {filters.map((f) => (
          <button key={f} onClick={() => setActive(f)} style={{ flexShrink: 0, padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: active === f ? 600 : 400, background: active === f ? '#2196C9' : '#F0F4F8', color: active === f ? '#fff' : '#667788', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s' }}>
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {list.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#a0aab8' }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>🔍</div>
            <p style={{ fontSize: 13, fontWeight: 500 }}>No services found</p>
          </div>
        ) : list.map((s) => (
          <Link key={s.id} to={`/services/${s.id}`} style={{ textDecoration: 'none' }}>
            <div style={{ background: '#fff', borderRadius: 16, padding: '14px', display: 'flex', alignItems: 'center', gap: 12, border: '1px solid #f0f4f8', boxShadow: '0 2px 8px rgba(33,150,201,0.06)' }}>
              <ServiceIcon iconName={s.iconName} iconColor={s.iconColor} iconBg={s.iconBg} size={50} iconSize={22} radius={14} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 3 }}>{s.title}</p>
                <p style={{ fontSize: 11, color: '#8a9bb0', marginBottom: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.shortDesc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 10, color: '#f5a623' }}>
                    <Star size={10} fill="#f5a623" color="#f5a623" /> {s.rating} ({s.reviews})
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 10, color: '#8a9bb0' }}>
                    <Clock size={10} /> {s.duration}
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <p style={{ fontSize: 15, fontWeight: 800, color: '#2196C9', marginBottom: 4 }}>${s.price}</p>
                <ChevronRight size={15} color="#c0ccd8" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
