import { useState } from 'react'
import { CleansterProvider } from './context/CleansterContext'
import PhoneShell from './components/PhoneShell'
import SplashScreen from './components/SplashScreen'
import RoleSelector from './components/RoleSelector'
import CleansterAppLayout from './components/cleanster/CleansterAppLayout'
import EmployeeAppLayout from './components/employee/EmployeeAppLayout'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [currentRole, setCurrentRole] = useState(null) // Reset on page refresh so role is asked again

  function handleSelectRole(role) {
    setCurrentRole(role)
  }

  function handleLogout() {
    setCurrentRole(null)
  }

  return (
    <CleansterProvider>
      <PhoneShell>
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: 'var(--app-ambient-bg)' }}>
          {/* Main App Content by Selected Role */}
          {currentRole === 'customer' && (
            <CleansterAppLayout />
          )}

          {currentRole === 'employee' && (
            <EmployeeAppLayout onLogout={handleLogout} />
          )}

          {/* Role Selection Screen (Shown right after splash if not yet selected) */}
          {!showSplash && !currentRole && (
            <RoleSelector onSelectRole={handleSelectRole} />
          )}

          {/* Initial Splash Screen */}
          {showSplash && (
            <SplashScreen onFinish={() => setShowSplash(false)} />
          )}
        </div>
      </PhoneShell>
    </CleansterProvider>
  )
}
