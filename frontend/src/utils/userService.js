import axiosInstance from './axiosInstance'

export const userService = {
  updateProfile: async (userId, userData) => {
    return await axiosInstance.put(`/users/${userId}`, userData)
  },

  changePassword: async (passwordData) => {
    return await axiosInstance.put('/users/changepassword', {
      current_password: passwordData.current_password,
      new_password: passwordData.new_password,
    })
  },

  formatErrorMessage: (error) => {
    return (
      error.response?.data?.error?.[0]?.msg ||
      error.response?.data?.message ||
      'An error occurred while processing your request.'
    )
  },
}
