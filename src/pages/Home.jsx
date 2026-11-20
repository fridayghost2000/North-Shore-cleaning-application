import { Link } from 'react-router-dom'
import { Bell, Star, ChevronRight, ArrowRight, Home as HomeIcon, Building2, Sparkles, Truck, ArrowLeftRight } from 'lucide-react'
import { services } from '../data/services'
import ServiceIcon from '../components/ServiceIcon'
import { useApp } from '../context/AppContext'
import { useIdentity } from '../context/IdentityContext'

const quickCategories = [
  { id: 'residential',   label: 'Home',    Icon: HomeIcon,   iconColor: '#2196C9', iconBg: '#EBF5FB' },
  { id: 'commercial',    label: 'Office',  Icon: Building2,  iconColor: '#00A99D', iconBg: '#E0F7F6' },
  { id: 'deep-cleaning', label: 'Deep',    Icon: Sparkles,   iconColor: '#7C3AED', iconBg: '#F3EEFF' },
  { id: 'move-in-out',   label: 'Move',    Icon: Truck,      iconColor: '#EA7B2C', iconBg: '#FEF3E8' },
]

function SectionHeader({ title, to }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', marginBottom: 12 }}>
      <span style={{ fontSize: 15, fontWeight: 700, color: '#111', fontFamily: 'Inter, sans-serif' }}>{title}</span>
      {to && (
        <Link to={to} style={{ fontSize: 12, color: '#2196C9', fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 2 }}>
          See all <ChevronRight size={13} />
        </Link>
      )}
    </div>
  )
}

export default function Home() {
  const { setShowNotif } = useApp()
  const { resetIdentity } = useIdentity()

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', paddingBottom: 8 }}>

      {/* ── Header ── */}
      <div style={{ padding: '8px 16px 14px', background: '#fff', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <img src="/logo_ (1).png" alt="North Shore Clean" style={{ height: 32, width: 'auto', objectFit: 'contain' }} />
            </div>
            <p style={{ fontSize: 11, color: '#8a9bb0', marginTop: 2 }}>Beverly, MA · North Shore</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button
              onClick={resetIdentity}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: '5px 8px',
                borderRadius: 20,
                background: '#F0F7FC',
                border: '1px solid #D0E7F5',
                fontSize: 10,
                fontWeight: 600,
                color: '#2196C9',
                cursor: 'pointer',
              }}
            >
              <ArrowLeftRight size={11} />
              <span>Switch Role</span>
            </button>

            <button
              onClick={() => setShowNotif(true)}
              style={{ width: 36, height: 36, borderRadius: 10, background: '#F0F7FC', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
            >
              <Bell size={16} color="#2196C9" />
              <div style={{ width: 7, height: 7, background: '#FF5A5F', borderRadius: '50%', position: 'absolute', top: 7, right: 7, border: '1.5px solid #fff' }} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Hero Banner ── */}
      <div style={{ padding: '10px 16px' }}>
        <div style={{ background: 'linear-gradient(135deg, #1a7fb0 0%, #2196C9 50%, #00C2CB 100%)', borderRadius: 16, padding: '12px 14px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -16, top: -16, width: 80, height: 80, background: 'rgba(255,255,255,0.08)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', right: 14, bottom: -22, width: 60, height: 60, background: 'rgba(255,255,255,0.06)', borderRadius: '50%' }} />
          <p style={{ fontSize: 15, fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 4, letterSpacing: '-0.3px' }}>
            Professional Cleaning Services
          </p>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.72)', marginBottom: 10, lineHeight: 1.4 }}>
            Trusted by 2,400+ homes &amp; offices across the North Shore.
          </p>
          <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#fff', color: '#2196C9', fontSize: 11, fontWeight: 700, borderRadius: 8, padding: '6px 11px', textDecoration: 'none' }}>
            Book Now <ArrowRight size={11} />
          </Link>
        </div>
      </div>

      {/* ── Quick Categories ── */}
      <div style={{ marginBottom: 20 }}>
        <SectionHeader title="Categories" to="/services" />
        <div style={{ display: 'flex', gap: 10, padding: '0 16px', overflowX: 'auto' }} className="scrollbar-hide">
          {quickCategories.map(({ id, label, Icon, iconColor, iconBg }) => (
            <Link key={id} to={`/services/${id}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
              <div style={{ width: 68, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 56, height: 56, background: iconBg, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={24} color={iconColor} strokeWidth={1.8} />
                </div>
                <span style={{ fontSize: 11, color: '#444', fontWeight: 500, textAlign: 'center' }}>{label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div style={{ padding: '0 16px', marginBottom: 20 }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', border: '1px solid #f0f4f8' }}>
          {[{ v: '10+', l: 'Years' }, { v: '2,400+', l: 'Clients' }, { v: '4.9★', l: 'Rating' }].map(({ v, l }, i) => (
            <div key={l} style={{ textAlign: 'center', borderRight: i < 2 ? '1px solid #f0f4f8' : 'none', padding: '0 8px' }}>
              <p style={{ fontSize: 16, fontWeight: 800, color: '#2196C9', marginBottom: 2 }}>{v}</p>
              <p style={{ fontSize: 10, color: '#8a9bb0' }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Popular Services ── */}
      <div style={{ marginBottom: 20 }}>
        <SectionHeader title="Popular Services" to="/services" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 16px' }}>
          {services.slice(0, 4).map((s) => (
            <Link key={s.id} to={`/services/${s.id}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#fff', borderRadius: 16, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, border: '1px solid #f0f4f8', boxShadow: '0 2px 8px rgba(33,150,201,0.06)' }}>
                <ServiceIcon iconName={s.iconName} iconColor={s.iconColor} iconBg={s.iconBg} size={44} iconSize={20} radius={12} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.title}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 10, color: '#f5a623' }}>
                      <Star size={10} fill="#f5a623" color="#f5a623" /> {s.rating}
                    </span>
                    <span style={{ fontSize: 10, color: '#b0bac8' }}>·</span>
                    <span style={{ fontSize: 10, color: '#b0bac8' }}>{s.duration}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#2196C9' }}>from ${s.price}</p>
                  <ChevronRight size={14} color="#c0ccd8" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Coupons ── */}
      <div style={{ marginBottom: 8 }}>
        <SectionHeader title="Offers & Coupons" />
        <div style={{ display: 'flex', gap: 10, padding: '0 16px', overflowX: 'auto' }} className="scrollbar-hide">
          {[
            { code: 'FIRST20',  discount: '20% OFF',  desc: 'First booking',      color1: '#2196C9', color2: '#00C2CB', exp: 'Exp. Dec 31' },
            { code: 'DEEP15',   discount: '15% OFF',  desc: 'Deep clean only',    color1: '#7C3AED', color2: '#A855F7', exp: 'Exp. Jan 15' },
            { code: 'REFER10',  discount: '$10 OFF',  desc: 'Refer a friend',     color1: '#EA7B2C', color2: '#F59E0B', exp: 'No expiry'   },
            { code: 'MOVE25',   discount: '25% OFF',  desc: 'Move in / out',      color1: '#16A34A', color2: '#22C55E', exp: 'Exp. Feb 1'  },
          ].map(({ code, discount, desc, color1, color2, exp }) => (
            <div key={code} style={{ flexShrink: 0, width: 140, borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              {/* Top coloured strip */}
              <div style={{ background: `linear-gradient(135deg, ${color1}, ${color2})`, padding: '9px 11px 8px' }}>
                <p style={{ fontSize: 16, fontWeight: 900, color: '#fff', letterSpacing: '-0.4px', marginBottom: 1 }}>{discount}</p>
                <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.82)', fontWeight: 500 }}>{desc}</p>
              </div>
              {/* Dashed divider */}
              <div style={{ background: '#fff', display: 'flex', alignItems: 'center', position: 'relative', height: 12 }}>
                <div style={{ position: 'absolute', left: -6, width: 12, height: 12, background: '#F7F9FC', borderRadius: '50%' }} />
                <div style={{ flex: 1, borderTop: '1.5px dashed #e0e7ef', margin: '0 8px' }} />
                <div style={{ position: 'absolute', right: -6, width: 12, height: 12, background: '#F7F9FC', borderRadius: '50%' }} />
              </div>
              {/* Bottom */}
              <div style={{ background: '#fff', padding: '6px 11px 9px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 700, color: '#111', letterSpacing: '0.4px' }}>{code}</p>
                  <p style={{ fontSize: 8, color: '#a0aab8', marginTop: 1 }}>{exp}</p>
                </div>
                <div style={{ background: color1, borderRadius: 6, padding: '3px 7px' }}>
                  <span style={{ fontSize: 8, fontWeight: 700, color: '#fff' }}>COPY</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
