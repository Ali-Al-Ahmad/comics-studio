import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/slices/userSlice'
import { persistor } from '../redux/store'

export const useLogout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      localStorage.clear()
      await persistor.purge()
      dispatch(logout())
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return handleLogout
}
