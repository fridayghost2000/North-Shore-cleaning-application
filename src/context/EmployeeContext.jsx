import { createContext, useContext, useState, useEffect } from 'react'
import { initialEmployeeProfile, initialEmployeeJobs } from '../data/employeeData'

const EmployeeContext = createContext(null)

export function EmployeeProvider({ children }) {
  const [employeeTab, setEmployeeTab] = useState('schedule')
  const [profile, setProfile] = useState(initialEmployeeProfile)
  const [jobs, setJobs] = useState(initialEmployeeJobs)
  const [activeJobId, setActiveJobId] = useState('job-104')

  // Live timer for active job
  const [timerSeconds, setTimerSeconds] = useState(4825) // ~1h 20m elapsed
  const [isTimerRunning, setIsTimerRunning] = useState(true)

  useEffect(() => {
    let interval = null
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning])

  function formatTimer(totalSecs) {
    const hrs = Math.floor(totalSecs / 3600)
    const mins = Math.floor((totalSecs % 3600) / 60)
    const secs = totalSecs % 60
    const pad = n => String(n).padStart(2, '0')
    if (hrs > 0) {
      return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`
    }
    return `${pad(mins)}:${pad(secs)}`
  }

  function toggleJobChecklist(jobId, taskId) {
    setJobs(prev =>
      prev.map(j => {
        if (j.id !== jobId) return j
        const updatedChecklist = j.checklist.map(item =>
          item.id === taskId ? { ...item, done: !item.done } : item
        )
        return { ...j, checklist: updatedChecklist }
      })
    )
  }

  function updateJobStatus(jobId, newStatus) {
    setJobs(prev =>
      prev.map(j => {
        if (j.id !== jobId) return j
        return { ...j, status: newStatus }
      })
    )
  }

  function addJobPhoto(jobId, type, photoUrl) {
    setJobs(prev =>
      prev.map(j => {
        if (j.id !== jobId) return j
        if (type === 'before') {
          return { ...j, beforePhotos: [...j.beforePhotos, photoUrl] }
        }
        return { ...j, afterPhotos: [...j.afterPhotos, photoUrl] }
      })
    )
  }

  const currentJob = jobs.find(j => j.id === activeJobId) || jobs[0]

  return (
    <EmployeeContext.Provider
      value={{
        employeeTab,
        setEmployeeTab,
        profile,
        setProfile,
        jobs,
        setJobs,
        activeJobId,
        setActiveJobId,
        currentJob,
        timerSeconds,
        isTimerRunning,
        setIsTimerRunning,
        formatTimer,
        toggleJobChecklist,
        updateJobStatus,
        addJobPhoto,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  )
}

export function useEmployee() {
  const context = useContext(EmployeeContext)
  if (!context) throw new Error('useEmployee must be used within EmployeeProvider')
  return context
}
