import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useLayoutEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import {
  toggleSidebar,
  setSidebarCollapsed,
} from '../../redux/slices/sidebarSlice'
import './LayoutWithSidebar.css'

const SIDEBAR_COLLAPSE_BREAKPOINT = 768

const isMobileViewport = () => {
  return window.innerWidth <= SIDEBAR_COLLAPSE_BREAKPOINT
}

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

const LayoutWithSidebar = () => {
  const dispatch = useDispatch()
  const { isCollapsed } = useSelector((state) => state.sidebar)

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar())
  }
  useIsomorphicLayoutEffect(() => {
    dispatch(setSidebarCollapsed(isMobileViewport()))
  }, [dispatch])
  useEffect(() => {
    function handleResize() {
      requestAnimationFrame(handleSidebarState)
    }

    function handleSidebarState() {
      const windowWidth = window.innerWidth

      if (windowWidth <= SIDEBAR_COLLAPSE_BREAKPOINT) {
        dispatch(setSidebarCollapsed(true))
      } else {
        dispatch(setSidebarCollapsed(false))
      }
    }

    if (document.readyState === 'complete') {
      handleSidebarState()
    } else {
      window.addEventListener('load', handleSidebarState, { once: true })
    }

    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [dispatch])

  const mainContentClassNames = `main-content ${
    isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
  }`

  return (
    <div className='layout-with-sidebar'>
      <Sidebar
        isCollapsed={isCollapsed}
        toggleSidebar={handleToggleSidebar}
      />
      <main className={mainContentClassNames}>
        <Outlet />
      </main>
    </div>
  )
}

export default LayoutWithSidebar
