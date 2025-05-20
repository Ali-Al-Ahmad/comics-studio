import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@iconify-icon/react'
import './ImageUploader.css'

const ImageUploader = ({ uploadedImage, setUploadedImage, disabled }) => {
  const [uploadedImagePreview, setUploadedImagePreview] = useState(null)

  useEffect(() => {
    if (uploadedImage) {
      const objectUrl = URL.createObjectURL(uploadedImage)
      setUploadedImagePreview(objectUrl)

      return () => URL.revokeObjectURL(objectUrl)
    }
  }, [uploadedImage])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedImage(file)
      const imageUrl = URL.createObjectURL(file)
      setUploadedImagePreview(imageUrl)
    }
  }
  const clearUploadedImage = () => {
    setUploadedImage(null)
    setUploadedImagePreview(null)
  }

  return (
    <div className='create-page-image-upload-container'>
      <h3>Upload an image (optional):</h3>
      <div className='image-upload-area'>
        {uploadedImagePreview ? (
          <div className='uploaded-image-preview'>
            <img
              src={uploadedImagePreview}
              alt='Uploaded character'
            />
            <div className='image-preview-overlay'>
              <button
                className='clear-image-btn'
                onClick={clearUploadedImage}
              >
                <Icon
                  icon='mdi:close'
                  width='28'
                  height='28'
                />
              </button>
            </div>
          </div>
        ) : (
          <label
            className='image-upload-label'
            htmlFor='character-image-upload'
          >
            <div className='cp-image-upload-placeholder'>
              <Icon
                icon='mdi:cloud-upload'
                width='64'
                height='64'
              />
              <p>Click to upload an image</p>
              <small>JPG, PNG or WEBP (max 5MB)</small>
            </div>
            <input
              type='file'
              id='character-image-upload'
              accept='image/jpeg,image/png,image/webp'
              onChange={handleImageUpload}
              disabled={disabled}
              style={{ display: 'none' }}
            />
          </label>
        )}
      </div>
      {uploadedImagePreview && (
        <div className='uploaded-image-info'>
          <span>Using uploaded image</span>
          <button
            className='clear-image-btn'
            onClick={clearUploadedImage}
          >
            <Icon
              icon='mdi:close'
              width='16'
              height='16'
            />
          </button>
        </div>
      )}
    </div>
  )
}

ImageUploader.propTypes = {
  uploadedImage: PropTypes.object,
  setUploadedImage: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

export default ImageUploader
