import { useOps } from '../../context/DemoOpsContext'
import { useIdentity } from '../../context/IdentityContext'
import { Shield, ArrowLeftRight, CheckCircle2 } from 'lucide-react'

export default function AdminProfile() {
  const { mockAdmin } = useOps()
  const { resetIdentity } = useIdentity()

  return (
    <div style={{ padding: '14px 16px 28px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ marginBottom: 14 }}>
        <h1 style={{ fontSize: 18, fontWeight: 800, color: '#111827', margin: '0 0 2px 0' }}>
          Operations Console
        </h1>
        <p style={{ fontSize: 11, color: '#8A9BB0', margin: 0 }}>
          Manager credentials & team preferences
        </p>
      </div>

      {/* Admin Card */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: 16,
        border: '1px solid #EEF2F6',
        padding: '20px',
        marginBottom: 14,
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      }}>
        <img
          src={mockAdmin.avatar}
          alt={mockAdmin.name}
          style={{ width: 68, height: 68, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 10px auto', border: '2px solid #EEF2FF' }}
        />
        <h2 style={{ fontSize: 16, fontWeight: 800, color: '#111827', margin: '0 0 2px 0' }}>
          {mockAdmin.name}
        </h2>
        <p style={{ fontSize: 12, color: '#6B7280', margin: '0 0 10px 0' }}>
          {mockAdmin.role} · North Shore Headquarters
        </p>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          padding: '3px 10px',
          borderRadius: 20,
          background: '#EEF2FF',
          color: '#4F46E5',
          fontSize: 11,
          fontWeight: 700,
        }}>
          <Shield size={12} /> Master Admin Access
        </span>
      </div>

      {/* Switch Identity Section */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: 16,
        border: '1px solid #EEF2F6',
        padding: '16px',
        marginBottom: 14,
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <ArrowLeftRight size={14} color="#4F46E5" />
          <span style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>
            Switch Persona
          </span>
        </div>
        <p style={{ fontSize: 11, color: '#6B7280', margin: '0 0 12px 0' }}>
          Want to test the app as a Customer or Field Cleaner?
        </p>

        <button
          onClick={resetIdentity}
          style={{
            width: '100%',
            padding: '11px',
            borderRadius: 12,
            background: '#F0F7FC',
            border: '1px solid #D0E7F5',
            color: '#2196C9',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          <ArrowLeftRight size={14} /> Change Identity
        </button>
      </div>
    </div>
  )
}
