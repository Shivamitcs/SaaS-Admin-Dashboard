import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Find the scrollable main container
    const mainElement = document.querySelector('main.overflow-y-auto')
    
    if (mainElement) {
      // Scroll the main container to top
      mainElement.scrollTo({
        top: 0,
        behavior: 'instant' as ScrollBehavior,
      })
    } else {
      // Fallback: scroll window to top
      window.scrollTo({
        top: 0,
        behavior: 'instant' as ScrollBehavior,
      })
    }
  }, [pathname])

  return null
}

