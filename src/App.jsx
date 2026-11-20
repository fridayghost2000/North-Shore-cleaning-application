import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { DemoOpsProvider } from './context/DemoOpsContext'
import { IdentityProvider, useIdentity } from './context/IdentityContext'
import PhoneShell from './components/PhoneShell'
import SplashScreen from './components/SplashScreen'
import IdentitySelector from './pages/IdentitySelector'
import AppLayout from './components/AppLayout'
import CleanerLayout from './components/cleaner/CleanerLayout'
import AdminLayout from './components/admin/AdminLayout'
import Home from './pages/Home'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Booking from './pages/Booking'
import Bookings from './pages/Bookings'
import Profile from './pages/Profile'

function IdentityRouter() {
  const { identity } = useIdentity()

  // 1. Initial State: Ask "Describe your identity" / Portal Selector
  if (!identity) {
    return <IdentitySelector />
  }

  // 2. Field Cleaner Persona
  if (identity === 'cleaner') {
    return <CleanerLayout />
  }

  // 3. Operations Admin Persona
  if (identity === 'admin') {
    return <AdminLayout />
  }

  // 4. Customer / Homeowner Persona (Original UI & Routes)
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:id" element={<ServiceDetail />} />
        <Route path="book/:id" element={<Booking />} />
        <Route path="my-bookings" element={<Bookings />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <BrowserRouter>
      <IdentityProvider>
        <AppProvider>
          <DemoOpsProvider>
            <PhoneShell>
              <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                <IdentityRouter />
                {showSplash && (
                  <SplashScreen onFinish={() => setShowSplash(false)} />
                )}
              </div>
            </PhoneShell>
          </DemoOpsProvider>
        </AppProvider>
      </IdentityProvider>
    </BrowserRouter>
  )
}
