import { Outlet } from 'react-router-dom'

const LayoutWithoutSidebar = () => {
  return (
    <main>
      <Outlet />
    </main>
  )
}

export default LayoutWithoutSidebar
