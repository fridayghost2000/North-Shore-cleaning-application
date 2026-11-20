import { useCleanster } from '../../context/CleansterContext'
import BookingsPage from '../../pages/cleanster/BookingsPage'
import MessagesPage from '../../pages/cleanster/MessagesPage'
import ChecklistPage from '../../pages/cleanster/ChecklistPage'
import AccountPage from '../../pages/cleanster/AccountPage'
import CleansterBottomNav from './CleansterBottomNav'
import ChooseServiceModal from './ChooseServiceModal'
import PhotosModal from './PhotosModal'
import ReviewModal from './ReviewModal'
import NewBookingModal from './NewBookingModal'

export default function CleansterAppLayout() {
  const { activeTab } = useCleanster()

  function renderPage() {
    switch (activeTab) {
      case 'bookings':
        return <BookingsPage />
      case 'messages':
        return <MessagesPage />
      case 'checklist':
        return <ChecklistPage />
      case 'account':
        return <AccountPage />
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

      {/* Modals & Bottom Sheets (Images 2, 3, 6) */}
      <ChooseServiceModal />
      <PhotosModal />
      <ReviewModal />
      <NewBookingModal />
    </div>
  )
}
