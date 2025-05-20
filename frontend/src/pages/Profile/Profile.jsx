import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Profile.css'
import ImageUploadModal from '../../components/ImageUpload/ImageUploadModal'
import { updateProfile } from '../../redux/slices/userSlice'
import { showToast } from '../../redux/slices/toastSlice'
import { userService } from '../../utils/userService'
import ProfileImage from '../../components/Profile/ProfileImage'
import ProfileDetails from '../../components/Profile/ProfileDetails'
import PasswordChangeForm from '../../components/Profile/PasswordChangeForm'

const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const [originalUserData, setOriginalUserData] = useState(null)
  const [profileImage, setProfileImage] = useState(null)
  const [showImageUploadModal, setShowImageUploadModal] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user) {
      const userData = {
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
      }

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

  const handleProfileUpdate = async (formData) => {
    setIsLoading(true)

    try {
      const userData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        ...(formData.phone ? { phone: formData.phone } : {}),
      }

      const response = await userService.updateProfile(user?.id, userData)

      if (response.data?.success) {
        dispatch(updateProfile(userData))
        dispatch(
          showToast({
            type: 'success',
            message: 'Profile updated successfully!',
          })
        )

        setOriginalUserData({ ...formData })
      } else {
        dispatch(
          showToast({
            type: 'error',
            message: response.data?.message || 'Failed to update profile.',
          })
        )
      }
    } catch (error) {
      dispatch(
        showToast({
          type: 'error',
          message: userService.formatErrorMessage(error),
        })
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordUpdate = async (passwordData) => {
    setIsLoading(true)

    try {
      const response = await userService.changePassword(passwordData)

      if (response.data?.success) {
        dispatch(
          showToast({
            type: 'success',
            message: 'Password changed successfully!',
          })
        )

        setShowChangePassword(false)
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
          message: userService.formatErrorMessage(error),
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

  return (
    <div className='profile-page-container'>
      <section className='profile-main-content'>
        <div className='profile-identity-section'>
          <ProfileImage
            profileImage={profileImage}
            onImageClick={() => setShowImageUploadModal(true)}
          />
          <div className='profile-name-container'>
            <h2 className='profile-full-name'>{`${user.first_name || ''} ${
              user.last_name || ''
            }`}</h2>
          </div>
        </div>

        <ImageUploadModal
          isOpen={showImageUploadModal}
          onClose={() => setShowImageUploadModal(false)}
          modalTitle='Update Profile Picture'
          currentImageSrc={user?.profile_picture}
          uploadEndpointUrl={`/users/${user?.id}`}
          imageFieldName='profile_picture'
          onUploadSuccess={handleImageUpdateSuccess}
          chooseButtonText='Choose Image'
          submitButtonText='Save Image'
        />

        <ProfileDetails
          user={user}
          isLoading={isLoading}
          onSubmit={handleProfileUpdate}
          originalData={originalUserData}
        />

        <div className='password-management-section'>
          <h3 className='form-section-title'>Password Management</h3>
          <label
            htmlFor='change-password-toggle'
            className='toggle-switch-label'
          >
            <input
              type='checkbox'
              id='change-password-toggle'
              checked={showChangePassword}
              onChange={() => setShowChangePassword(!showChangePassword)}
              className='toggle-switch-checkbox'
            />
            <span className='slider round'></span>
            <span className='toggle-label-text'>
              {showChangePassword
                ? 'Cancel Password Change'
                : 'Change My Password'}
            </span>
          </label>

          {showChangePassword && (
            <PasswordChangeForm
              isLoading={isLoading}
              onSubmit={handlePasswordUpdate}
            />
          )}
        </div>
      </section>
    </div>
  )
}

export default Profile
