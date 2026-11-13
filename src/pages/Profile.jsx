import { Link } from 'react-router-dom'
import { User, MapPin, Phone, Mail, ChevronRight, Shield, Bell, HelpCircle, Star } from 'lucide-react'

const menuItems = [
  { icon: MapPin,     label: 'Saved Addresses',    color: '#EBF5FB', ic: '#2196C9' },
  { icon: Star,       label: 'Favourite Services',  color: '#FFF8E1', ic: '#F9A825' },
  { icon: Bell,       label: 'Notifications',       color: '#F3E5F5', ic: '#8E24AA' },
  { icon: Shield,     label: 'Privacy & Security',  color: '#E8F5E9', ic: '#43A047' },
  { icon: HelpCircle, label: 'Help & Support',      color: '#FBE9E7', ic: '#E64A19' },
]

export default function Profile() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', paddingBottom: 8 }}>
      {/* Header */}
      <div style={{ padding: '12px 16px 16px', background: '#fff', borderBottom: '1px solid #f0f4f8' }}>
        <p style={{ fontSize: 18, fontWeight: 800, color: '#111', marginBottom: 14, letterSpacing: '-0.4px' }}>Profile</p>

        {/* Avatar card */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'linear-gradient(135deg, #1a7fb0, #2196C9)', borderRadius: 18, padding: '16px' }}>
          <div style={{ width: 54, height: 54, background: 'rgba(255,255,255,0.25)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={26} color="#fff" />
          </div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Guest User</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>North Shore, MA</p>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 10, padding: '6px 12px' }}>
              <span style={{ fontSize: 11, color: '#fff', fontWeight: 600 }}>Edit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ padding: '12px 16px' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: '14px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', border: '1px solid #f0f4f8', marginBottom: 14 }}>
          {[{ v: '0', l: 'Bookings' }, { v: '0', l: 'Completed' }, { v: '0', l: 'Saved' }].map(({ v, l }, i) => (
            <div key={l} style={{ textAlign: 'center', borderRight: i < 2 ? '1px solid #f0f4f8' : 'none', padding: '0 8px' }}>
              <p style={{ fontSize: 18, fontWeight: 800, color: '#2196C9', marginBottom: 2 }}>{v}</p>
              <p style={{ fontSize: 10, color: '#8a9bb0' }}>{l}</p>
            </div>
          ))}
        </div>

        {/* Menu items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
          {menuItems.map(({ icon: Icon, label, color, ic }) => (
            <div key={label} style={{ background: '#fff', borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, border: '1px solid #f0f4f8', cursor: 'pointer' }}>
              <div style={{ width: 36, height: 36, background: color, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={16} color={ic} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: '#222', flex: 1 }}>{label}</span>
              <ChevronRight size={15} color="#c0ccd8" />
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '14px', border: '1px solid #f0f4f8', marginBottom: 14 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#111', marginBottom: 10 }}>Contact North Shore Clean</p>
          {[
            { Icon: Phone, text: '(978) 555-0123', href: 'tel:+19785550123' },
            { Icon: Mail,  text: 'hello@northshoreclean.com', href: 'mailto:hello@northshoreclean.com' },
          ].map(({ Icon, text, href }) => (
            <a key={text} href={href} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', textDecoration: 'none', borderBottom: '1px solid #f5f7fa' }}>
              <div style={{ width: 30, height: 30, background: '#EBF5FB', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={13} color="#2196C9" />
              </div>
              <span style={{ fontSize: 12, color: '#333' }}>{text}</span>
            </a>
          ))}
        </div>

        <p style={{ fontSize: 10, color: '#c0ccd8', textAlign: 'center' }}>North Shore Clean v1.0 · Beverly, MA</p>
      </div>
    </div>
  )
}
