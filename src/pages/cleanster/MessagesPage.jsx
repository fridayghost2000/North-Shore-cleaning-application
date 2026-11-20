import { useState } from 'react'
import { useCleanster } from '../../context/CleansterContext'
import {
  ArrowLeft, Home, ChevronRight, Paperclip, Camera,
  Mic, Send, CheckCircle2, Languages
} from 'lucide-react'

export default function MessagesPage() {
  const { messages, sendMessage, payExpense, setActiveTab, activeBooking } = useCleanster()
  const [inputText, setInputText] = useState('')

  function handleSend(e) {
    e.preventDefault()
    if (!inputText.trim()) return
    sendMessage(inputText)
    setInputText('')
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#F8FAFC',
      fontFamily: 'Inter, sans-serif',
      boxSizing: 'border-box',
    }}>
      {/* ── Top Header with Back Arrow & Cleaner Name (Image 4) ── */}
      <div style={{
        padding: '12px 16px',
        background: '#FFFFFF',
        borderBottom: '1px solid #EEF2F6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
      }}>
        <button
          onClick={() => setActiveTab('bookings')}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            color: '#0F172A',
          }}
        >
          <ArrowLeft size={18} />
        </button>

        <h2 style={{
          fontSize: 15,
          fontWeight: 700,
          color: '#0F172A',
          margin: 0,
        }}>
          {activeBooking?.cleaner?.name || 'William N.'}
        </h2>

        <div style={{ width: 18 }} />
      </div>

      {/* ── Property Context Bar (Matching Image 4) ── */}
      <div style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #EEF2F6',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            background: '#F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748B',
          }}>
            <Home size={15} />
          </div>
          <div>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', display: 'block' }}>
              100 Cummings Center, Beverly
            </span>
            <span style={{ fontSize: 10.5, color: '#64748B' }}>
              Today at 11:00 AM – $185.00
            </span>
          </div>
        </div>

        <ChevronRight size={16} color="#94A3B8" />
      </div>

      {/* ── Chat Messages Scroll Area (Image 4) ── */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }} className="scrollbar-hide">
        {messages.map(msg => {
          // In-Chat Expense Payment Request Card (Image 4)
          if (msg.type === 'expense_request') {
            return (
              <div
                key={msg.id}
                style={{
                  alignSelf: 'flex-start',
                  background: '#FFFFFF',
                  borderRadius: 16,
                  border: '1px solid #EEF2F6',
                  padding: '16px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                  width: '80%',
                  boxSizing: 'border-box',
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
                  {msg.title}
                </span>

                <div style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: '#10B981', // Cleanster green
                  margin: '4px 0 12px 0',
                }}>
                  ${msg.amount.toFixed(2)}
                </div>

                <button
                  onClick={() => payExpense(msg.id)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 10,
                    background: msg.paid ? '#ECFDF5' : '#10B981',
                    color: msg.paid ? '#059669' : '#FFFFFF',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  {msg.paid ? (
                    <>
                      <CheckCircle2 size={16} /> Paid
                    </>
                  ) : (
                    'Pay Now'
                  )}
                </button>
                <span style={{ fontSize: 9.5, color: '#94A3B8', display: 'block', textAlign: 'right', marginTop: 6 }}>
                  {msg.time}
                </span>
              </div>
            )
          }

          const isUser = msg.sender === 'user'
          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: 8,
                alignSelf: isUser ? 'flex-end' : 'flex-start',
                maxWidth: '82%',
              }}
            >
              {!isUser && (
                <img
                  src={activeBooking?.cleaner?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt="Cleaner"
                  style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover' }}
                />
              )}

              <div>
                <div style={{
                  padding: '10px 14px',
                  borderRadius: 16,
                  background: isUser ? '#334155' : '#FFFFFF', // Cleanster dark bubble for user, white for cleaner
                  color: isUser ? '#FFFFFF' : '#0F172A',
                  fontSize: 12.5,
                  lineHeight: 1.4,
                  boxShadow: isUser ? 'none' : '0 1px 4px rgba(0,0,0,0.03)',
                  border: isUser ? 'none' : '1px solid #EEF2F6',
                }}>
                  {msg.text}
                </div>
                <span style={{
                  fontSize: 9.5,
                  color: '#94A3B8',
                  marginTop: 3,
                  display: 'block',
                  textAlign: isUser ? 'right' : 'left',
                }}>
                  {msg.time}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Google Translate Toggle (Image 4) ── */}
      <div style={{
        padding: '6px 14px',
        background: '#F1F5F9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        fontSize: 10,
        color: '#64748B',
      }}>
        <Languages size={12} color="#64748B" />
        <span>Translate conversation to English · translated by Google</span>
      </div>

      {/* ── Chat Input Bar (Matching Image 4) ── */}
      <form
        onSubmit={handleSend}
        style={{
          padding: '10px 14px',
          background: '#FFFFFF',
          borderTop: '1px solid #EEF2F6',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <button
          type="button"
          style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: 0 }}
        >
          <Paperclip size={18} />
        </button>

        <input
          type="text"
          placeholder="Type something..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          style={{
            flex: 1,
            border: 'none',
            background: '#F8FAFC',
            borderRadius: 20,
            padding: '9px 14px',
            fontSize: 12,
            color: '#0F172A',
            outline: 'none',
            fontFamily: 'Inter, sans-serif',
          }}
        />

        <button
          type="button"
          style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: 0 }}
        >
          <Camera size={18} />
        </button>

        <button
          type="button"
          style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: 0 }}
        >
          <Mic size={18} />
        </button>

        {/* North Shore Blue Send Button */}
        <button
          type="submit"
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: '#0B4A8F', // North Shore brand blue
            color: '#FFFFFF',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            boxShadow: '0 2px 8px rgba(11, 74, 143, 0.35)',
          }}
        >
          <Send size={15} style={{ marginLeft: 2 }} />
        </button>
      </form>
    </div>
  )
}
