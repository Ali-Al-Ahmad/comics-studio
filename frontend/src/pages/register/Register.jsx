import { useState } from 'react'
import './Register.css'
import axiosInstance from '../../utils/axiosInstance'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/slices/userSlice'
import { showToast } from '../../redux/slices/toastSlice'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password.length < 6) {
      dispatch(showToast({
        type: 'error',
        message: 'Password must be at least 6 characters'
      }))
      return
    }

    setLoading(true)

    try {
      const res = await axiosInstance.post('/auth/user/register', formData)
      if (res.data.success) {
        const { token, user } = res.data.data
        localStorage.setItem('token', token)
        dispatch(login(user))
        dispatch(
          showToast({
            type: 'success',
            message: 'Registration successful! Welcome to Comics Studio.',
          })
        )
        setTimeout(() => {
          navigate('/home')
        }, 10)
        return
      }
    } catch (err) {
      console.error(err.response?.data?.error[0]?.msg)
      const errorMessage =
        err.response?.data?.error[0]?.msg ||
        'Registration failed. Please try again.'
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
    <div className='register-page'>
      <div className='register-container'>
        <div className='register-design'>
          <div className='register-pill-triangle'></div>
          <div className='register-pill-main'></div>
          <div className='register-pill-up'></div>
          <div className='register-pill-down'></div>
        </div>

        <div className='register'>
          <form
            className='register-form'
            onSubmit={handleSubmit}
          >
            <h3 className='title'>Welcome</h3>

            <div className='form-input'>
              <label htmlFor='first_name'>First Name</label>
              <div className='textInput'>
                <img
                  src='../../../src/assets/icons/user-black.svg'
                  alt='user icon'
                />
                <input
                  id='first_name'
                  name='first_name'
                  type='text'
                  placeholder='Tony'
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className='form-input'>
              <label htmlFor='last_name'>Last Name</label>
              <div className='textInput'>
                <img
                  src='../../../src/assets/icons/user-black.svg'
                  alt='user icon'
                />
                <input
                  id='last_name'
                  name='last_name'
                  type='text'
                  placeholder='Stark'
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className='form-input'>
              <label htmlFor='email'>Email Address</label>
              <div className='textInput'>
                <img
                  src='../../../src/assets/icons/email-address-black.svg'
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
            </div>

            <div className='form-input'>
              <label htmlFor='password'>Password</label>
              <div className='textInput'>
                <img
                  src='../../../src/assets/icons/password-black.svg'
                  alt='lock icon'
                />
                <input
                  id='password'
                  name='password'
                  type='password'
                  placeholder='Enter 6 characters at least'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button
              className='registerBtn'
              type='submit'
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
            <Link
              to={'/login'}
              className='register-forgot'
            >
              Already have an account? Sign In
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
