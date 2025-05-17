import { Icon } from '@iconify-icon/react'
import PropTypes from 'prop-types'
import './ProfileImage.css'

const ProfileImage = ({ profileImage, onImageClick }) => {
  return (
    <button
      type='button'
      className='profile-image-wrapper'
      onClick={onImageClick}
    >
      {profileImage ? (
        <img
          src={profileImage}
          alt='Profile'
          className='profile-image'
        />
      ) : (
        <div className='profile-image-placeholder'>
          <Icon
            icon='mdi:account-circle'
            style={{ fontSize: '160px' }}
          />
        </div>
      )}
      <div className='profile-image-edit-overlay'>
        <Icon
          icon='mdi:camera-plus'
          className='icon'
        />
        <span>Change Photo</span>
      </div>
    </button>
  )
}

ProfileImage.propTypes = {
  profileImage: PropTypes.string,
  onImageClick: PropTypes.func.isRequired,
}

export default ProfileImage
