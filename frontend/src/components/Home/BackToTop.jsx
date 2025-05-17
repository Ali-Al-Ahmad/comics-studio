import { useState, useEffect } from 'react'
import { Icon } from '@iconify-icon/react'
import './BackToTop.css'

const BackToTop = () => {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      className={`back-to-top-btn ${showBackToTop ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label='Back to top'
    >
      <Icon
        icon='mdi:arrow-up'
        className='back-to-top-icon'
      />
    </button>
  )
}

export default BackToTop
