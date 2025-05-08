import { useState } from 'react'
import './Login.css'
import axiosInstance from '../../utils/axiosInstance'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/slices/userSlice'
import { showToast } from '../../redux/slices/toastSlice'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../../components/Spinner/Spinner'
import emailIcon from '../../assets/icons/email-address-black.svg'
import passwordIcon from '../../assets/icons/password-black.svg'
import eyeOpenIcon from '../../assets/icons/eye-open.svg'
import eyeClosedIcon from '../../assets/icons/eye-closed.svg'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })

    setEmailError('')
    setPasswordError('')
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return <div className='login-page'></div>
}

const handleSubmit = async (e) => {
  e.preventDefault()

  if (formData.password.length < 6) {
    setPasswordError('Password must be at least 6 characters')
    dispatch(
      showToast({
        type: 'error',
        message: 'Password must be at least 6 characters',
      })
    )
    return
  }

  setLoading(true)

  try {
    const res = await axiosInstance.post('/auth/user/login', formData)
    if (res.data.success) {
      const { token, user } = res.data.data
      localStorage.setItem('token', token)
      dispatch(login(user))
      dispatch(
        showToast({
          type: 'success',
          message: 'Login successful! Welcome back.',
        })
      )
      navigate('/home')
      return
    }
  } catch (err) {
    console.error(err.response?.data?.message || err.message)
    const errorMessage =
      err.response?.data?.message ||
      'Login failed. Please check your credentials and try again.'

    if (errorMessage.toLowerCase().includes('password')) {
      setPasswordError(errorMessage)
    }

    if (
      errorMessage.toLowerCase().includes('email') ||
      errorMessage.toLowerCase().includes('not found')
    ) {
      setEmailError(errorMessage)
    }

    dispatch(
      showToast({
        type: 'error',
        message: errorMessage,
      })
    )
  } finally {
    setLoading(false)
  }
}


export default Login
