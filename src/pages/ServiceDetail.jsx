import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Star, Clock, ArrowLeft, Check, Heart } from 'lucide-react'
import { services, testimonials } from '../data/services'
import ServiceIcon from '../components/ServiceIcon'

export default function ServiceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)

  const service = services.find((s) => s.id === id)
  if (!service) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 10, fontFamily: 'Inter, sans-serif' }}>
      <p style={{ fontSize: 13, color: '#888' }}>Service not found</p>
      <Link to="/services" style={{ color: '#2196C9', fontSize: 12 }}>← Back</Link>
    </div>
  )

  const { title, description, price, duration, rating, reviews, iconName, iconColor, iconBg, includes } = service
  const related = testimonials.slice(0, 2)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'Inter, sans-serif', background: '#F7F9FC' }}>

      {/* ── Scroll area ── */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }} className="scrollbar-hide">

        {/* Nav bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: '#F7F9FC' }}>
          <button onClick={() => navigate(-1)} style={{ width: 32, height: 32, borderRadius: 10, background: '#fff', border: '1px solid #eef1f5', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowLeft size={15} color="#333" strokeWidth={2} />
          </button>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#111', letterSpacing: '-0.1px' }}>Service Detail</span>
          <button onClick={() => setSaved(!saved)} style={{ width: 32, height: 32, borderRadius: 10, background: '#fff', border: '1px solid #eef1f5', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Heart size={14} fill={saved ? '#ff5a5f' : 'none'} color={saved ? '#ff5a5f' : '#aaa'} strokeWidth={2} />
          </button>
        </div>

        {/* ── Hero ── */}
        <div style={{ margin: '0 16px 14px' }}>
          <div style={{ background: 'linear-gradient(135deg, #1976b8 0%, #2196C9 60%, #00bcd4 100%)', borderRadius: 18, padding: '14px 16px 13px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: -20, bottom: -20, width: 90, height: 90, background: 'rgba(255,255,255,0.07)', borderRadius: '50%', pointerEvents: 'none' }} />

            {/* Icon */}
            <div style={{ width: 38, height: 38, background: 'rgba(255,255,255,0.18)', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
              <ServiceIcon iconName={iconName} iconColor="#fff" iconBg="transparent" size={38} iconSize={18} radius={11} />
            </div>

            <p style={{ fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px', marginBottom: 4, lineHeight: 1.2 }}>{title}</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.72)', lineHeight: 1.5, marginBottom: 12 }}>{description}</p>

            {/* Badges */}
            <div style={{ display: 'flex', gap: 7 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.14)', borderRadius: 7, padding: '4px 8px' }}>
                <Star size={10} fill="#FFD54F" color="#FFD54F" />
                <span style={{ fontSize: 10, color: '#fff', fontWeight: 600 }}>{rating} ({reviews})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.14)', borderRadius: 7, padding: '4px 8px' }}>
                <Clock size={10} color="rgba(255,255,255,0.8)" strokeWidth={2} />
                <span style={{ fontSize: 10, color: '#fff', fontWeight: 600 }}>{duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── What's included ── */}
        <div style={{ margin: '0 16px 14px', background: '#fff', borderRadius: 16, padding: '14px 16px', border: '1px solid #f0f4f8' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#111', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>What's Included</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {includes.map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 18, height: 18, borderRadius: 6, background: '#EBF5FB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Check size={10} color="#2196C9" strokeWidth={2.5} />
                </div>
                <span style={{ fontSize: 12, color: '#444', lineHeight: 1.3 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Reviews ── */}
        <div style={{ margin: '0 16px 14px' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#111', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Client Reviews</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {related.map((t) => (
              <div key={t.id} style={{ background: '#fff', borderRadius: 14, padding: '12px 14px', border: '1px solid #f0f4f8' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <div style={{ width: 32, height: 32, background: '#2196C9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: 10, color: '#fff', fontWeight: 700 }}>{t.avatar}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 600, color: '#111', lineHeight: 1.2 }}>{t.name}</p>
                      <p style={{ fontSize: 10, color: '#a0aab8', marginTop: 1 }}>{t.location}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 1.5 }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={10} fill={i < t.rating ? '#f5a623' : '#e8edf2'} color={i < t.rating ? '#f5a623' : '#e8edf2'} />
                    ))}
                  </div>
                </div>
                <p style={{ fontSize: 11, color: '#6b7280', lineHeight: 1.55, fontStyle: 'italic' }}>"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Bottom CTA ── */}
      <div style={{ flexShrink: 0, padding: '10px 16px 12px', background: '#fff', borderTop: '1px solid #f0f4f8', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div>
          <p style={{ fontSize: 9, color: '#a0aab8', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 1 }}>Starting from</p>
          <p style={{ fontSize: 22, fontWeight: 800, color: '#111', lineHeight: 1 }}>${price}</p>
        </div>
        <Link
          to={`/book/${id}`}
          style={{ flex: 1, background: '#2196C9', color: '#fff', borderRadius: 14, padding: '13px 0', fontSize: 13, fontWeight: 700, textDecoration: 'none', textAlign: 'center', letterSpacing: '0.1px', boxShadow: '0 4px 16px rgba(33,150,201,0.3)' }}
        >
          Book Now
        </Link>
      </div>

    </div>
  )
}
