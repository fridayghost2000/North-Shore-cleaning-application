import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import PhoneShell from './components/PhoneShell'
import AppLayout from './components/AppLayout'
import Home from './pages/Home'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Booking from './pages/Booking'
import Bookings from './pages/Bookings'
import Profile from './pages/Profile'

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <PhoneShell>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="services" element={<Services />} />
              <Route path="services/:id" element={<ServiceDetail />} />
              <Route path="book/:id" element={<Booking />} />
              <Route path="my-bookings" element={<Bookings />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </PhoneShell>
      </AppProvider>
    </BrowserRouter>
  )
}
