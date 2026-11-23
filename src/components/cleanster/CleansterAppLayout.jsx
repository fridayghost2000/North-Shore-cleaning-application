import { useCleanster } from '../../context/CleansterContext'
import { MessageCircle } from 'lucide-react'
import BookingsPage from '../../pages/cleanster/BookingsPage'
import MessagesPage from '../../pages/cleanster/MessagesPage'
import ChecklistPage from '../../pages/cleanster/ChecklistPage'
import AccountPage from '../../pages/cleanster/AccountPage'
import CleansterBottomNav from './CleansterBottomNav'
import ChooseServiceModal from './ChooseServiceModal'
import PhotosModal from './PhotosModal'
import ReviewModal from './ReviewModal'
import NewBookingModal from './NewBookingModal'
import AccountModal from './AccountModal'

export default function CleansterAppLayout({ onSwitchRole }) {
  const { activeTab, setActiveTab } = useCleanster()

  function renderPage() {
    switch (activeTab) {
      case 'bookings':
        return <BookingsPage />
      case 'messages':
        return <MessagesPage />
      case 'checklist':
        return <ChecklistPage />
      case 'account':
        return <AccountPage onSwitchRole={onSwitchRole} />
      default:
        return <BookingsPage />
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#F8FAFC',
      overflow: 'hidden',
      position: 'relative',
      fontFamily: 'Inter, sans-serif',
    }}>
      {/* Scrollable View Area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          minHeight: 0,
        }}
        className="scrollbar-hide"
      >
        {renderPage()}
      </div>

      {/* 5-Tab Cleanster Bottom Navigation (Images 1 & 5) */}
      <CleansterBottomNav />

      {/* Floating Concierge Chat Bubble on Account Screen (does not add scroll space) */}
      {activeTab === 'account' && (
        <button
          onClick={() => setActiveTab('messages')}
          title="Chat with North Shore Clean Support"
          style={{
            position: 'absolute',
            bottom: 76,
            right: 16,
            width: 46,
            height: 46,
            borderRadius: '50%',
            background: '#0B4A8F',
            color: '#FFFFFF',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(11, 74, 143, 0.4)',
            cursor: 'pointer',
            zIndex: 32,
            transition: 'transform 0.15s ease',
          }}
        >
          <MessageCircle size={22} fill="#FFFFFF" color="#0B4A8F" />
        </button>
      )}

      {/* Modals & Bottom Sheets (Images 2, 3, 6) */}
      <ChooseServiceModal />
      <PhotosModal />
      <ReviewModal />
      <NewBookingModal />
      <AccountModal />
    </div>
  )
}
