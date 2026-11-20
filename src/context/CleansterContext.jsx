import { createContext, useContext, useState, useEffect } from 'react'
import {
  initialActiveBooking,
  initialUpcomingBookings,
  initialPastBookings,
  cleansterChecklists,
  initialMessages,
  cleansterServices,
} from '../data/cleansterData'

const CleansterContext = createContext(null)

export function CleansterProvider({ children }) {
  // Navigation tabs: 'bookings' | 'messages' | 'checklist' | 'account'
  const [activeTab, setActiveTab] = useState('bookings')

  // Top bookings sub-tab: 'Upcoming' | 'Complete'
  const [bookingFilter, setBookingFilter] = useState('Upcoming')
  const [timeFilter, setTimeFilter] = useState('Today')

  // Bookings state
  const [activeBooking, setActiveBooking] = useState(initialActiveBooking)
  const [upcomingBookings, setUpcomingBookings] = useState(initialUpcomingBookings)
  const [pastBookings, setPastBookings] = useState(initialPastBookings)

  // Checklist state
  const [checklists, setChecklists] = useState(cleansterChecklists)

  // Messages state
  const [messages, setMessages] = useState(initialMessages)

  // Modals state (Image 2, Image 3, Image 6)
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)
  const [isPhotosModalOpen, setIsPhotosModalOpen] = useState(false)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(null)

  // Review submitted state
  const [lastReview, setLastReview] = useState(null)

  function toggleTask(checklistId, taskIndex) {
    setChecklists(prev =>
      prev.map(cl => {
        if (cl.id !== checklistId) return cl
        const newTasks = [...cl.tasks]
        newTasks[taskIndex] = { ...newTasks[taskIndex], done: !newTasks[taskIndex].done }
        return { ...cl, tasks: newTasks }
      })
    )
  }

  function sendMessage(text) {
    if (!text.trim()) return
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const newMsg = {
      id: `m-${Date.now()}`,
      sender: 'user',
      text,
      time: now,
    }
    setMessages(prev => [...prev, newMsg])

    // Simulated cleaner reply after 1.5s
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `m-reply-${Date.now()}`,
          sender: 'cleaner',
          text: 'Got it! I am currently taking care of this right now.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    }, 1500)
  }

  function payExpense(msgId) {
    setMessages(prev =>
      prev.map(m => (m.id === msgId ? { ...m, paid: true } : m))
    )
  }

  function submitReview(rating, selectedIssues, tipAmount) {
    setLastReview({ rating, issues: selectedIssues, tip: tipAmount, timestamp: new Date() })
    setIsReviewModalOpen(false)
  }

  function openServiceBooking(service) {
    setSelectedService(service)
    setIsServiceModalOpen(false)
    setIsNewBookingModalOpen(true)
  }

  function createNewBooking(bookingData) {
    const newBooking = {
      id: `bk-${Date.now()}`,
      dateBadge: { day: '28', month: 'NOV' },
      dateString: `${bookingData.date || 'Fri 28 Nov 2026'}`,
      categoryBadge: selectedService?.title.split(' ')[0] || 'Clean',
      price: selectedService?.basePrice || 150,
      status: 'Confirmed',
      statusColor: '#059669',
      timeWindow: `${bookingData.time || '10:00 AM – 1:00 PM'}`,
      address: bookingData.address || '100 Cummings Center, Suite 425C, Beverly, MA 01915',
      serviceTitle: selectedService?.title || 'Residential Cleaning',
    }
    setUpcomingBookings(prev => [newBooking, ...prev])
    setIsNewBookingModalOpen(false)
    setActiveTab('bookings')
  }

  return (
    <CleansterContext.Provider
      value={{
        activeTab,
        setActiveTab,
        bookingFilter,
        setBookingFilter,
        timeFilter,
        setTimeFilter,
        activeBooking,
        upcomingBookings,
        pastBookings,
        checklists,
        toggleTask,
        messages,
        sendMessage,
        payExpense,
        cleansterServices,
        isServiceModalOpen,
        setIsServiceModalOpen,
        isPhotosModalOpen,
        setIsPhotosModalOpen,
        isReviewModalOpen,
        setIsReviewModalOpen,
        isNewBookingModalOpen,
        setIsNewBookingModalOpen,
        selectedService,
        openServiceBooking,
        createNewBooking,
        submitReview,
        lastReview,
      }}
    >
      {children}
    </CleansterContext.Provider>
  )
}

export function useCleanster() {
  const context = useContext(CleansterContext)
  if (!context) throw new Error('useCleanster must be used within CleansterProvider')
  return context
}
