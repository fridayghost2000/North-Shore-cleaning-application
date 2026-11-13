import { Link, useLocation } from 'react-router-dom'
import { Home, Grid, CalendarCheck, Info, Phone } from 'lucide-react'

const tabs = [
  { to: '/', label: 'Home', Icon: Home },
  { to: '/services', label: 'Services', Icon: Grid },
  { to: '/my-bookings', label: 'Bookings', Icon: CalendarCheck },
  { to: '/about', label: 'About', Icon: Info },
  { to: '/contact', label: 'Contact', Icon: Phone },
]

export default function BottomNav() {
  const { pathname } = useLocation()

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center justify-around h-16">
        {tabs.map(({ to, label, Icon }) => {
          const active = pathname === to
          return (
            <Link
              key={to}
              to={to}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full"
            >
              <div
                className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all ${
                  active ? 'bg-primary-500 text-white scale-110' : 'text-gray-400'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span
                className={`text-xs font-medium transition-colors ${
                  active ? 'text-primary-500' : 'text-gray-400'
                }`}
              >
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
