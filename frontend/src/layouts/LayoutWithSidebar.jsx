import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar'

const LayoutWithSidebar = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    window.innerWidth < 768
  )

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(true)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />
      <main
        style={{
          flexGrow: 1,
          padding: '20px',
          marginLeft: isSidebarCollapsed ? '80px' : '290px',
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Outlet />
      </main>
    </div>
  )
}

export default LayoutWithSidebar
