import { useState, useEffect } from 'react'

export default function useViewport() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return {
    width,
    isMobile: width <= 480,
    isTablet: width > 480 && width <= 1200,
    isDesktop: width > 1200,
    isNative: width <= 1200, // everything up to large desktop = native app mode
  }
}
