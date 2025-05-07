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
      </div>
    </div>
  )
}

export default Register
