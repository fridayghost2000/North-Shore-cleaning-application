import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [showNotif, setShowNotif] = useState(false)
  return (
    <AppContext.Provider value={{ showNotif, setShowNotif }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
