import { useOps } from '../../context/DemoOpsContext'
import { User, Shield, ArrowLeftRight, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react'

export default function OpsProfile() {
  const { role, switchRole, currentCleaner, mockAdmin } = useOps()

  const activePersona = role === 'admin' ? mockAdmin : currentCleaner

  return (
    <div style={{ padding: '16px 14px 28px', fontFamily: 'Inter, sans-serif' }}>
      {/* Title */}
      <div style={{ marginBottom: 14 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.4px', margin: 0 }}>
          Account & Operations
        </h1>
        <p style={{ fontSize: 12, color: '#64748B', marginTop: 2, margin: 0 }}>
          Staff profile and demo role configuration
        </p>
      </div>

      {/* User Card */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: 14,
        border: '1px solid #EEF2F6',
        padding: '16px',
        marginBottom: 16,
        textAlign: 'center',
      }}>
        <img
          src={activePersona.avatar}
          alt={activePersona.name}
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            objectFit: 'cover',
            margin: '0 auto 10px auto',
            border: '2px solid #EEF2F6',
          }}
        />
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', margin: '0 0 2px 0' }}>
          {activePersona.name}
        </h3>
        <p style={{ fontSize: 12, color: '#64748B', margin: '0 0 10px 0' }}>
          {activePersona.role} · North Shore Operations
        </p>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          padding: '3px 10px',
          borderRadius: 20,
          background: role === 'admin' ? '#F1F5F9' : '#ECFDF5',
          color: role === 'admin' ? '#475569' : '#047857',
          fontSize: 11,
          fontWeight: 600,
        }}>
          <CheckCircle2 size={12} /> {role === 'admin' ? 'Manager Access' : 'Verified Cleaner'}
        </span>
      </div>

      {/* Demo Persona Switcher (Client Presentation Feature) */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: 14,
        border: '1px solid #EEF2F6',
        padding: '16px',
        marginBottom: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <ArrowLeftRight size={14} color="#0D9488" />
          <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>
            Demo Role Switcher
          </span>
        </div>
        <p style={{ fontSize: 11, color: '#64748B', margin: '0 0 12px 0' }}>
          Tap below to switch views during your client walkthrough:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button
            onClick={() => switchRole('cleaner')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 12px',
              borderRadius: 10,
              border: role === 'cleaner' ? '1.5px solid #0D9488' : '1px solid #E2E8F0',
              background: role === 'cleaner' ? '#F0FDFA' : '#FFFFFF',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', display: 'block' }}>
                Field Cleaner (Sarah Jenkins)
              </span>
              <span style={{ fontSize: 10, color: '#64748B' }}>
                See personal daily schedule, check-in timer & camera capture
              </span>
            </div>
            {role === 'cleaner' && <CheckCircle2 size={16} color="#0D9488" />}
          </button>

          <button
            onClick={() => switchRole('admin')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 12px',
              borderRadius: 10,
              border: role === 'admin' ? '1.5px solid #0F172A' : '1px solid #E2E8F0',
              background: role === 'admin' ? '#F8FAFC' : '#FFFFFF',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', display: 'block' }}>
                Operations Manager (Elena Rostova)
              </span>
              <span style={{ fontSize: 10, color: '#64748B' }}>
                See all staff schedules, live locations & photo audit
              </span>
            </div>
            {role === 'admin' && <CheckCircle2 size={16} color="#0F172A" />}
          </button>
        </div>
      </div>

      {/* App Info Footer */}
      <div style={{ textAlign: 'center', color: '#94A3B8', fontSize: 10, paddingTop: 6 }}>
        North Shore Clean Operations App · Version 2.0 (Minimalist Edition)
      </div>
    </div>
  )
}
