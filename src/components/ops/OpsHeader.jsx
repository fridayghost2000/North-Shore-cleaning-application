import { useOps } from '../../context/DemoOpsContext'
import { Bell, ArrowLeftRight, CheckCircle2 } from 'lucide-react'

export default function OpsHeader() {
  const { role, switchRole, currentCleaner, mockAdmin } = useOps()

  return (
    <div style={{
      background: '#FFFFFF',
      borderBottom: '1px solid #EEF2F6',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 20,
    }}>
      {/* Brand & Persona Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 34,
          height: 34,
          borderRadius: 9,
          background: '#0F172A',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: 14,
          letterSpacing: '-0.5px',
        }}>
          NS
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.2px' }}>
              North Shore Ops
            </span>
            <span style={{
              fontSize: 9,
              fontWeight: 600,
              padding: '2px 6px',
              borderRadius: 4,
              background: role === 'admin' ? '#F1F5F9' : '#ECFDF5',
              color: role === 'admin' ? '#475569' : '#047857',
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
            }}>
              {role === 'admin' ? 'Manager' : 'Staff'}
            </span>
          </div>
          <p style={{ fontSize: 11, color: '#64748B', marginTop: 1 }}>
            {role === 'admin' ? mockAdmin.name : currentCleaner.name}
          </p>
        </div>
      </div>

      {/* Role Switcher Pill (Minimalist 1-Tap Toggle) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          onClick={() => switchRole(role === 'admin' ? 'cleaner' : 'admin')}
          title="Switch Demo Role"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            padding: '5px 10px',
            borderRadius: 20,
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            cursor: 'pointer',
            fontSize: 11,
            fontWeight: 600,
            color: '#334155',
            transition: 'all 0.15s ease',
          }}
        >
          <ArrowLeftRight size={12} color="#64748B" />
          <span>Switch to {role === 'admin' ? 'Staff' : 'Admin'}</span>
        </button>

        <div style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          <Bell size={14} color="#64748B" />
          <span style={{
            position: 'absolute',
            top: 6,
            right: 6,
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#0D9488',
          }} />
        </div>
      </div>
    </div>
  )
}
