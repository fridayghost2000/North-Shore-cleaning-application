import { createContext, useContext, useState, useEffect } from 'react'
import { initialJobs, mockCleaners, mockAdmin } from '../data/mockOpsData'

const DemoOpsContext = createContext(null)

export function DemoOpsProvider({ children }) {
  // Role: 'cleaner' (Sarah) or 'admin' (Elena)
  const [role, setRole] = useState(() => localStorage.getItem('ns_ops_role') || 'cleaner')
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('ns_ops_jobs')
    return saved ? JSON.parse(saved) : initialJobs
  })
  
  // Active selected job for detail/check-in
  const [selectedJobId, setSelectedJobId] = useState('job-101')
  
  // Active tab in navigation: 'schedule' | 'job' | 'media' | 'dispatch' | 'profile'
  const [activeTab, setActiveTab] = useState('schedule')

  // Timer for active in-progress job (seconds)
  const [activeTimerSeconds, setActiveTimerSeconds] = useState(5420) // ~1h 30m simulated elapsed

  // Sync jobs to localStorage
  useEffect(() => {
    localStorage.setItem('ns_ops_jobs', JSON.stringify(jobs))
  }, [jobs])

  // Sync role to localStorage
  useEffect(() => {
    localStorage.setItem('ns_ops_role', role)
  }, [role])

  // Timer interval for checked-in job
  useEffect(() => {
    const activeJob = jobs.find(j => j.id === selectedJobId && j.status === 'In Progress')
    if (!activeJob) return

    const interval = setInterval(() => {
      setActiveTimerSeconds(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [selectedJobId, jobs])

  // Helper format seconds to HH:MM:SS
  function formatTimer(secs) {
    const h = Math.floor(secs / 3600).toString().padStart(2, '0')
    const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0')
    const s = (secs % 60).toString().padStart(2, '0')
    return `${h}:${m}:${s}`
  }

  // Check in action
  function checkIn(jobId) {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setJobs(prev =>
      prev.map(j => (j.id === jobId ? { ...j, status: 'In Progress', checkInTime: now } : j))
    )
    setSelectedJobId(jobId)
    setActiveTimerSeconds(1)
  }

  // Check out action
  function checkOut(jobId) {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setJobs(prev =>
      prev.map(j => (j.id === jobId ? { ...j, status: 'Completed', checkOutTime: now } : j))
    )
  }

  // Toggle checklist item
  function toggleChecklist(jobId, index) {
    setJobs(prev =>
      prev.map(j => {
        if (j.id !== jobId) return j
        const updated = [...j.checklist]
        updated[index] = { ...updated[index], completed: !updated[index].completed }
        return { ...j, checklist: updated }
      })
    )
  }

  // Upload/Add media
  function addMedia(jobId, mediaCategory, fileItem) {
    setJobs(prev =>
      prev.map(j => {
        if (j.id !== jobId) return j
        const field = mediaCategory === 'before' ? 'beforeMedia' : 'afterMedia'
        return {
          ...j,
          [field]: [fileItem, ...j[field]],
        }
      })
    )
  }

  // Switch role directly
  function switchRole(newRole) {
    setRole(newRole)
    if (newRole === 'admin') {
      setActiveTab('schedule')
    } else {
      setActiveTab('schedule')
    }
  }

  const currentJob = jobs.find(j => j.id === selectedJobId) || jobs[0]
  const currentCleaner = mockCleaners[0] // Sarah Jenkins

  return (
    <DemoOpsContext.Provider
      value={{
        role,
        switchRole,
        jobs,
        selectedJobId,
        setSelectedJobId,
        currentJob,
        currentCleaner,
        mockCleaners,
        mockAdmin,
        activeTab,
        setActiveTab,
        activeTimerSeconds,
        formatTimer,
        checkIn,
        checkOut,
        toggleChecklist,
        addMedia,
      }}
    >
      {children}
    </DemoOpsContext.Provider>
  )
}

export function useOps() {
  const context = useContext(DemoOpsContext)
  if (!context) throw new Error('useOps must be used within DemoOpsProvider')
  return context
}
