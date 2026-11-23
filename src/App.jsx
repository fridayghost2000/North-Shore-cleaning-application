import { useState } from 'react'
import { CleansterProvider } from './context/CleansterContext'
import PhoneShell from './components/PhoneShell'
import SplashScreen from './components/SplashScreen'
import RoleSelector from './components/RoleSelector'
import CleansterAppLayout from './components/cleanster/CleansterAppLayout'
import EmployeeAppLayout from './components/employee/EmployeeAppLayout'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [currentRole, setCurrentRole] = useState(null) // null = RoleSelector, 'customer', 'employee'

  return (
    <CleansterProvider>
      <PhoneShell>
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
          {/* Main App Content by Selected Role */}
          {currentRole === 'customer' && (
            <CleansterAppLayout onSwitchRole={() => setCurrentRole(null)} />
          )}

          {currentRole === 'employee' && (
            <EmployeeAppLayout onSwitchRole={() => setCurrentRole(null)} />
          )}

          {/* Role Selection Screen (Shown right after splash) */}
          {!showSplash && !currentRole && (
            <RoleSelector onSelectRole={(role) => setCurrentRole(role)} />
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
