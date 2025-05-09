import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar'

const LayoutWithSidebar = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    window.innerWidth < 768
  )

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar isCollapsed={isSidebarCollapsed} />
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
