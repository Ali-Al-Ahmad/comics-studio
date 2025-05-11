import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Icon } from '@iconify-icon/react'
import './Profile.css'
import PasswordStrength from '../../components/PasswordStrength/PasswordStrength'
import ImageUploadModal from '../../components/ImageUpload/ImageUploadModal'
import { updateProfile } from '../../redux/slices/userSlice'
import { showToast } from '../../redux/slices/toastSlice'
import axiosInstance from '../../utils/axiosInstance'

const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  })
  const [originalUserData, setOriginalUserData] = useState(null)
  const [hasChanges, setHasChanges] = useState(false)
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_new_password: '',
  })
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [showImageUploadModal, setShowImageUploadModal] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordsValid, setPasswordsValid] = useState(false)
  const [formValid, setFormValid] = useState(true)
  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    passwordsMatch: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState({
    phone: '',
    email: '',
  })

  useEffect(() => {
    if (user) {
      const userData = {
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
      }

      setFormData(userData)
      validateFormData(userData)
      setOriginalUserData({ ...userData })
      if (user.profile_picture) {
        setProfileImage(
          `${import.meta.env.VITE_API_BASE_URL}/${user.profile_picture}`
        )
      } else {
        setProfileImage(null)
      }
    }
  }, [user])

  const validateFormData = (data) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const phonePattern =
      /^(\+\d{1,3})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/

    const isEmailValid =
      data.email.trim() === '' || emailPattern.test(data.email)
    const isPhoneValid =
      data.phone.trim() === '' || phonePattern.test(data.phone)

    let errors = {
      phone: '',
      email: '',
    }

    if (!isPhoneValid && data.phone.trim() !== '') {
      errors.phone = 'Please enter a valid phone number'
    }

    if (!isEmailValid && data.email.trim() !== '') {
      errors.email = 'Please enter a valid email address'
    }

    setValidationErrors(errors)

    const isValid =
      data.first_name.trim() !== '' &&
      data.last_name.trim() !== '' &&
      data.email.trim() !== '' &&
      isEmailValid &&
      isPhoneValid

    setFormValid(isValid)
    return isValid
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value }

      const hasFormChanges =
        JSON.stringify(updatedFormData) !== JSON.stringify(originalUserData)
      setHasChanges(hasFormChanges)

      validateFormData(updatedFormData)

      return updatedFormData
    })
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => {
      const updatedData = { ...prev, [name]: value }

      const hasMinLength = updatedData.new_password?.length >= 8
      const hasUpperCase = /[A-Z]/.test(updatedData.new_password)
      const hasLowerCase = /[a-z]/.test(updatedData.new_password)
      const hasNumber = /\d/.test(updatedData.new_password)
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(
        updatedData.new_password
      )
      const passwordsMatch =
        updatedData.new_password === updatedData.confirm_new_password

      const isStrongPassword =
        hasMinLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumber &&
        hasSpecialChar

      setPasswordStrength({
        hasMinLength,
        hasUpperCase,
        hasLowerCase,
        hasNumber,
        hasSpecialChar,
        passwordsMatch,
      })

      const isValid =
        updatedData.current_password?.trim() !== '' &&
        updatedData.new_password?.trim() !== '' &&
        updatedData.confirm_new_password?.trim() !== '' &&
        passwordsMatch &&
        isStrongPassword

      setPasswordsValid(isValid)
      return updatedData
    })
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()

    if (!formValid) {
      dispatch(
        showToast({
          type: 'error',
          message: 'Please complete all required fields correctly.',
        })
      )
      return
    }

    setIsLoading(true)

    try {
      const userData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        ...(formData.phone ? { phone: formData.phone } : {}),
      }
      const response = await axiosInstance.put(`/users/${user?.id}`, userData)

      if (response.data?.success) {
        dispatch(updateProfile(userData))

        dispatch(
          showToast({
            type: 'success',
            message: 'Profile updated successfully!',
          })
        )

        setOriginalUserData({ ...formData })
        setHasChanges(false)
      } else {
        dispatch(
          showToast({
            type: 'error',
            message: response.data?.message || 'Failed to update profile.',
          })
        )
      }
    } catch (error) {
      console.error('Profile update error:', error)

      dispatch(
        showToast({
          type: 'error',
          message:
            error.response?.data?.error?.[0]?.msg ||
            error.response?.data?.message ||
            'Failed to update profile.',
        })
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()

    if (passwordData.new_password !== passwordData.confirm_new_password) {
      dispatch(
        showToast({ type: 'error', message: 'New passwords do not match.' })
      )
      return
    }

    if (
      !passwordStrength.hasMinLength ||
      !passwordStrength.hasUpperCase ||
      !passwordStrength.hasLowerCase ||
      !passwordStrength.hasNumber ||
      !passwordStrength.hasSpecialChar
    ) {
      dispatch(
        showToast({
          type: 'error',
          message: 'Your password must meet all security requirements.',
        })
      )
      return
    }

    setIsLoading(true)

    try {
      const response = await axiosInstance.put(`/users/changepassword`, {
        current_password: passwordData.current_password,
        new_password: passwordData.new_password,
      })

      if (response.data?.success) {
        dispatch(
          showToast({
            type: 'success',
            message: 'Password changed successfully!',
          })
        )

        setPasswordData({
          current_password: '',
          new_password: '',
          confirm_new_password: '',
        })
        setPasswordsValid(false)
        setShowChangePassword(false)
        setPasswordStrength({
          hasMinLength: false,
          hasUpperCase: false,
          hasLowerCase: false,
          hasNumber: false,
          hasSpecialChar: false,
          passwordsMatch: false,
        })
      } else {
        dispatch(
          showToast({
            type: 'error',
            message: response.data?.message || 'Failed to change password.',
          })
        )
      }
    } catch (error) {
      console.error('Password update error:', error)

      dispatch(
        showToast({
          type: 'error',
          message:
            error?.response?.data?.message || 'Failed to update password.',
        })
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpdateSuccess = (responseData) => {
    const profileData = responseData?.data || responseData

    if (profileData?.profile_picture) {
      dispatch(updateProfile(profileData))
      setProfileImage(
        `${import.meta.env.VITE_API_BASE_URL}/${profileData.profile_picture}`
      )
    }

    setShowImageUploadModal(false)
  }

  const getSaveButtonTitle = () => {
    if (!formValid) {
      if (validationErrors.phone) return validationErrors.phone
      if (validationErrors.email) return validationErrors.email
      return 'First name and last name cannot be empty'
    }
    if (!hasChanges) return 'No changes to save'
    return 'Save changes to your profile'
  }

  if (!user) {
    return (
      <div className='profile-page-container'>
        <div className='loading-wrapper'>
          <div className='loading-spinner'></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    )
  }

  return <div className='profile-page-container'></div>
}

export default Profile
