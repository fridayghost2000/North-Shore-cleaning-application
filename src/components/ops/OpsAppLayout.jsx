import OpsHeader from './OpsHeader'
import OpsBottomNav from './OpsBottomNav'
import OpsSchedule from '../../pages/ops/OpsSchedule'
import OpsJobActive from '../../pages/ops/OpsJobActive'
import OpsMediaCapture from '../../pages/ops/OpsMediaCapture'
import OpsLiveDispatch from '../../pages/ops/OpsLiveDispatch'
import OpsProfile from '../../pages/ops/OpsProfile'
import { useOps } from '../../context/DemoOpsContext'
import useViewport from '../../hooks/useViewport'

export default function OpsAppLayout() {
  const { activeTab, role } = useOps()
  const { isNative } = useViewport()

  // Render view based on active navigation tab
  function renderView() {
    switch (activeTab) {
      case 'schedule':
        return <OpsSchedule />
      case 'job':
        return <OpsJobActive />
      case 'media':
        return <OpsMediaCapture />
      case 'dispatch':
        return <OpsLiveDispatch />
      case 'profile':
        return <OpsProfile />
      default:
        return <OpsSchedule />
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
    }}>
      {/* Top Header */}
      <OpsHeader />

      {/* Scrollable Main Content */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          minHeight: 0,
          paddingBottom: isNative ? 64 : 10,
        }}
        className="scrollbar-hide"
      >
        {renderView()}
      </div>

      {/* Bottom Floating Navigation */}
      <OpsBottomNav />
    </div>
  )
}
