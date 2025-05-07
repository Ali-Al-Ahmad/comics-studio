import './App.css'
import { Route, Routes } from 'react-router'
import Register from './pages/register/Register'
import Home from './pages/Home/Home'

function App() {
  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={<Home />}
        ></Route>

        <Route
          path='/register'
          element={<Register />}
        ></Route>
      </Routes>
    </div>
  )
}

export default App
