import { Routes, Route } from 'react-router-dom'

import LayoutWithSidebar from '../layouts/LayoutWithSidebar'
import LayoutWithoutSidebar from '../layouts/LayoutWithoutSidebar'

import ProtectedRoute from './ProtectedRoute'

import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Gallery from '../pages/Gallery/Gallery'
import Profile from '../pages/Profile/Profile'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<LayoutWithoutSidebar />}>
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/register'
          element={<Register />}
        />
        <Route
          path='/'
          element={<Home />}
        />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<LayoutWithSidebar />}>
          <Route
            path='/profile'
            element={<Profile />}
          />
          <Route
            path='/gallery'
            element={<Gallery />}
          />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes
