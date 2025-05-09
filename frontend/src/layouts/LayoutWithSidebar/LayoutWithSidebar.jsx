import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import './LayoutWithSidebar.css'

const MOBILE_BREAKPOINT = 768

const LayoutWithSidebar = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    window.innerWidth < MOBILE_BREAKPOINT
  )

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= MOBILE_BREAKPOINT
  )

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth
      if (screenWidth < MOBILE_BREAKPOINT) {
        setIsSidebarCollapsed(true)
      }
      setIsMobile(screenWidth <= MOBILE_BREAKPOINT)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const mainContentClasses = ['main-content']
  mainContentClasses.push(isMobile ? 'padding-mobile' : 'padding-desktop')

  if (isSidebarCollapsed) {
    mainContentClasses.push(
      isMobile ? 'margin-collapsed-mobile' : 'margin-collapsed-desktop'
    )
  } else {
    mainContentClasses.push(
      isMobile ? 'margin-expanded-mobile' : 'margin-expanded-desktop'
    )
  }

  return (
    <div className='layout-with-sidebar'>
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />{' '}
      <main className={mainContentClasses.join(' ')}>
        <Outlet />
      </main>
    </div>
  )
}

export default LayoutWithSidebar
