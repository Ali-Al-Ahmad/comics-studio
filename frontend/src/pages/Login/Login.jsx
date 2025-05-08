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

export default Login
