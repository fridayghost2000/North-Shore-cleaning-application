import { createContext, useContext, useState, useEffect } from 'react'

const IdentityContext = createContext(null)

export function IdentityProvider({ children }) {
  // 'customer' | 'cleaner' | 'admin' | null
  const [identity, setIdentity] = useState(() => {
    return localStorage.getItem('ns_active_identity') || null
  })

  function chooseIdentity(newIdentity) {
    setIdentity(newIdentity)
    if (newIdentity) {
      localStorage.setItem('ns_active_identity', newIdentity)
    } else {
      localStorage.removeItem('ns_active_identity')
    }
  }

  function resetIdentity() {
    chooseIdentity(null)
  }

  return (
    <IdentityContext.Provider
      value={{
        identity,
        chooseIdentity,
        resetIdentity,
      }}
    >
      {children}
    </IdentityContext.Provider>
  )
}

export function useIdentity() {
  const context = useContext(IdentityContext)
  if (!context) throw new Error('useIdentity must be used within IdentityProvider')
  return context
}
