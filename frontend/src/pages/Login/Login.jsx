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
    email: 'user@gmail.com',
    password: '123456789',
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
        navigate('/gallery')
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
  return (
    <div className='login-page'>
      <div className='login-container'>
        <div className='login-design'>
          <div className='login-pill-triangle'></div>
          <div className='login-pill-main'></div>
          <div className='login-pill-up'></div>
          <div className='login-pill-down'></div>
        </div>

        <div className='login'>
          <form
            className='login-form'
            onSubmit={handleSubmit}
          >
            <h3 className='title'>Welcome Back</h3>
            <p className='subtitle'>Sign in to your account</p>

            <div className='form-input'>
              <label htmlFor='email'>Email Address</label>
              <div className={`textInput ${emailError ? 'error-input' : ''}`}>
                <img
                  src={emailIcon}
                  alt='email icon'
                />
                <input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='tony.stark@gmail.com'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {emailError && <div className='error-message'>{emailError}</div>}
            </div>

            <div className='form-input'>
              <label htmlFor='password'>Password</label>
              <div
                className={`textInput password-input ${
                  passwordError ? 'error-input' : ''
                }`}
              >
                <img
                  src={passwordIcon}
                  alt='lock icon'
                />
                <input
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter 6 characters at least'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type='button'
                  className='toggle-password'
                  onClick={togglePasswordVisibility}
                >
                  <img
                    src={showPassword ? eyeClosedIcon : eyeOpenIcon}
                    alt={showPassword ? 'Hide password' : 'Show password'}
                    className='eye-icon'
                  />
                </button>
              </div>
              {passwordError && (
                <div className='error-message'>{passwordError}</div>
              )}
            </div>

            <button
              className='loginBtn button-with-spinner'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner />
                  <span>Signing In</span>
                </>
              ) : (
                'Sign In'
              )}
            </button>
            <Link
              to={'/register'}
              className='login-forgot'
            >
              Don't have an account? Sign Up
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
