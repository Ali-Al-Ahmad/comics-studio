import { Routes, Route } from 'react-router-dom'

import LayoutWithSidebar from '../layouts/LayoutWithSidebar/LayoutWithSidebar'
import LayoutWithoutSidebar from '../layouts/LayoutWithoutSidebar/LayoutWithoutSidebar'

import ProtectedRoute from './ProtectedRoute'

import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Gallery from '../pages/Gallery/Gallery'
import Profile from '../pages/Profile/Profile'
import MyComics from '../pages/MyComics/MyComics'
import Characters from '../pages/Characters/Characters'
import CreateComic from '../pages/CreateComic/CreateComic'
import Register from '../pages/RegisterPage/RegisterPage'

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
          <Route
            path='/mycomics'
            element={<MyComics />}
          />
          <Route
            path='/characters'
            element={<Characters />}
          />
          <Route
            path='/createcomic'
            element={<CreateComic />}
          />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes
