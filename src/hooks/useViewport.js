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
    isTablet: width > 480 && width <= 1024,
    isDesktop: width > 1024,
    isNative: width <= 1024, // mobile + tablet = show as real app (no phone frame)
  }
}
