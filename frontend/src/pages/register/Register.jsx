import { useState } from 'react'
import './Register.css'
import axiosInstance from '../../utils/axiosInstance'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/slices/userSlice'

const Register = () => {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axiosInstance.post('/auth/user/register', formData)
      const { token, user } = res.data.data
      localStorage.setItem('token', token)
      dispatch(login(user))
    } catch (err) {
      console.error(err.response?.data || err.message)
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
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
