import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://3.75.191.5:4000/api/v1',
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      delete config.headers.Authorization
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default axiosInstance
