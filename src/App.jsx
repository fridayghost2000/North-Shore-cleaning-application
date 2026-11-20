import { useState } from 'react'
import { CleansterProvider } from './context/CleansterContext'
import PhoneShell from './components/PhoneShell'
import SplashScreen from './components/SplashScreen'
import CleansterAppLayout from './components/cleanster/CleansterAppLayout'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <CleansterProvider>
      <PhoneShell>
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
          <CleansterAppLayout />
          {showSplash && (
            <SplashScreen onFinish={() => setShowSplash(false)} />
          )}
        </div>
      </PhoneShell>
    </CleansterProvider>
  )
}
