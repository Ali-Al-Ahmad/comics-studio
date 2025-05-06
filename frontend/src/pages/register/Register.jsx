import { useState } from 'react'
import axios from 'axios'

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        'http://localhost:4000/api/v1/auth/admin/register',
        formData
      )
      setMessage('Admin registered successfully!')
      console.log(res.data)
    } catch (err) {
      console.error(err.response?.data || err.message)
      setMessage('Registration failed.')
    }
  }
  return (
    <div>
      <h2>Register Admin</h2>
      <form onSubmit={handleSubmit}>
        <input
          name='email'
          type='email'
          placeholder='Email'
          onChange={handleChange}
          required
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          onChange={handleChange}
          required
        />
        <button type='submit'>Register</button>
      </form>
      <p>{message}</p>
    </div>
  )
}

export default Register
