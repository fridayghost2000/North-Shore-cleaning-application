import { EmployeeProvider, useEmployee } from '../../context/EmployeeContext'
import EmployeeBottomNav from './EmployeeBottomNav'
import EmployeeSchedulePage from '../../pages/employee/EmployeeSchedulePage'
import EmployeeActiveJobPage from '../../pages/employee/EmployeeActiveJobPage'
import EmployeeMediaPage from '../../pages/employee/EmployeeMediaPage'
import EmployeeProfilePage from '../../pages/employee/EmployeeProfilePage'

function EmployeeLayoutContent({ onSwitchRole }) {
  const { employeeTab } = useEmployee()

  function renderPage() {
    switch (employeeTab) {
      case 'schedule':
        return <EmployeeSchedulePage onSwitchRole={onSwitchRole} />
      case 'job':
        return <EmployeeActiveJobPage />
      case 'media':
        return <EmployeeMediaPage />
      case 'profile':
        return <EmployeeProfilePage onSwitchRole={onSwitchRole} />
      default:
        return <EmployeeSchedulePage onSwitchRole={onSwitchRole} />
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#F8FAFC',
      overflow: 'hidden',
      position: 'relative',
      fontFamily: 'Inter, sans-serif',
    }}>
      {/* Scrollable View Area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          minHeight: 0,
        }}
        className="scrollbar-hide"
      >
        {renderPage()}
      </div>

      {/* 4-Tab Employee Bottom Navigation */}
      <EmployeeBottomNav />
    </div>
  )
}

export default function EmployeeAppLayout({ onSwitchRole }) {
  return (
    <EmployeeProvider>
      <EmployeeLayoutContent onSwitchRole={onSwitchRole} />
    </EmployeeProvider>
  )
}
