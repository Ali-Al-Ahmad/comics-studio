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
