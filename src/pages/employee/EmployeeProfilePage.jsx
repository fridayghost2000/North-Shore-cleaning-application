import { useEmployee } from '../../context/EmployeeContext'
import {
  User, Award, Star, Clock, DollarSign, ShieldCheck,
  Phone, ArrowLeftRight, LogOut, ChevronRight, CheckCircle2
} from 'lucide-react'
import { northShoreCompany } from '../../data/cleansterData'

export default function EmployeeProfilePage({ onSwitchRole }) {
  const { profile } = useEmployee()

  return (
    <div style={{ padding: '14px 16px 28px', fontFamily: 'Inter, sans-serif' }}>
      {/* ── Employee Hero Profile Card ── */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: 20,
        border: '1px solid #E2E8F0',
        padding: '20px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      }}>
        <div style={{ position: 'relative', marginBottom: 12 }}>
          <img
            src={profile.avatar}
            alt={profile.name}
            style={{
              width: 76,
              height: 76,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid #0B4A8F',
              boxShadow: '0 4px 14px rgba(11, 74, 143, 0.18)',
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: 2,
            right: 2,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: '#10B981',
            border: '2px solid #FFFFFF',
          }} />
        </div>

        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#0F172A', margin: '0 0 2px 0' }}>
          {profile.name}
        </h2>

        <p style={{ fontSize: 12, color: '#64748B', margin: '0 0 8px 0' }}>
          {profile.role} · {profile.hub}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            background: '#ECFDF5',
            color: '#059669',
            padding: '3px 10px',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}>
            <ShieldCheck size={13} /> {profile.badge}
          </span>

          <span style={{
            fontSize: 11,
            fontWeight: 700,
            background: '#FEF3C7',
            color: '#D97706',
            padding: '3px 10px',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}>
            <Star size={12} fill="#D97706" /> {profile.rating} ({profile.reviewsCount})
          </span>
        </div>
      </div>

      {/* ── Key Performance Metrics ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 10,
        marginBottom: 16,
      }}>
        <div style={{
          background: '#FFFFFF',
          borderRadius: 16,
          padding: '14px 12px',
          border: '1px solid #E2E8F0',
        }}>
          <span style={{ fontSize: 11, color: '#64748B', fontWeight: 500, display: 'block', marginBottom: 2 }}>
            Today's Payout
          </span>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#059669' }}>
            ${profile.todayEarnings}.00
          </span>
          <span style={{ fontSize: 10.5, color: '#94A3B8', display: 'block', marginTop: 2 }}>
            3 shifts completed
          </span>
        </div>

        <div style={{
          background: '#FFFFFF',
          borderRadius: 16,
          padding: '14px 12px',
          border: '1px solid #E2E8F0',
        }}>
          <span style={{ fontSize: 11, color: '#64748B', fontWeight: 500, display: 'block', marginBottom: 2 }}>
            Week Payout
          </span>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#0B4A8F' }}>
            ${profile.weekEarnings}
          </span>
          <span style={{ fontSize: 10.5, color: '#94A3B8', display: 'block', marginTop: 2 }}>
            Direct deposit Fri
          </span>
        </div>

        <div style={{
          background: '#FFFFFF',
          borderRadius: 16,
          padding: '14px 12px',
          border: '1px solid #E2E8F0',
        }}>
          <span style={{ fontSize: 11, color: '#64748B', fontWeight: 500, display: 'block', marginBottom: 2 }}>
            Completed Shifts
          </span>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#0F172A' }}>
            {profile.shiftsCompleted}
          </span>
          <span style={{ fontSize: 10.5, color: '#059669', display: 'block', marginTop: 2 }}>
            ★ Top 5% Team
          </span>
        </div>

        <div style={{
          background: '#FFFFFF',
          borderRadius: 16,
          padding: '14px 12px',
          border: '1px solid #E2E8F0',
        }}>
          <span style={{ fontSize: 11, color: '#64748B', fontWeight: 500, display: 'block', marginBottom: 2 }}>
            On-Time Arrival
          </span>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#0F172A' }}>
            {profile.onTimeRate}
          </span>
          <span style={{ fontSize: 10.5, color: '#64748B', display: 'block', marginTop: 2 }}>
            Last 90 days
          </span>
        </div>
      </div>

      {/* ── Action Menu Group ── */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: 18,
        border: '1px solid #E2E8F0',
        overflow: 'hidden',
        marginBottom: 16,
      }}>
        {/* Switch to Customer Portal */}
        {onSwitchRole && (
          <div
            onClick={onSwitchRole}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '13px 14px',
              borderBottom: '1px solid #F1F5F9',
              cursor: 'pointer',
              background: '#FFFFFF',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: '#EEF5FC',
                color: '#0B4A8F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <ArrowLeftRight size={17} />
              </div>
              <div>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', display: 'block' }}>
                  Switch to Customer Portal
                </span>
                <span style={{ fontSize: 10.5, color: '#64748B' }}>
                  Book services or test customer view
                </span>
              </div>
            </div>
            <ChevronRight size={16} color="#CBD5E1" />
          </div>
        )}

        {/* Dispatch Helpline */}
        <a
          href={`tel:${northShoreCompany.phone}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '13px 14px',
            borderBottom: '1px solid #F1F5F9',
            textDecoration: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: '#F1F5F9',
              color: '#0B4A8F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Phone size={17} />
            </div>
            <div>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', display: 'block' }}>
                Dispatch Support Hotline
              </span>
              <span style={{ fontSize: 10.5, color: '#64748B' }}>
                {northShoreCompany.phone} · Direct field line
              </span>
            </div>
          </div>
          <ChevronRight size={16} color="#CBD5E1" />
        </a>

        {/* Sign Out */}
        <div
          onClick={onSwitchRole}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '13px 14px',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: '#FEE2E2',
              color: '#DC2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <LogOut size={17} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#DC2626' }}>
              Sign Out / Change Role
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
