import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { persistor, RESET_APP } from '../redux/store'

export const useLogout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      localStorage.clear()

      dispatch({ type: RESET_APP })

      await persistor.purge()

      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return handleLogout
}
