import { useState, useRef, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from '@iconify-icon/react'
import axiosInstance from '../../utils/axiosInstance'
import { showToast } from '../../redux/slices/toastSlice'
import useClickOutside from '../../hooks/useClickOutside'
import './ImageUploadModal.css'

const ImageUploadModal = ({
  isOpen,
  onClose,
  modalTitle,
  currentImageSrc,
  imagePreviewPlaceholderIcon,
  uploadEndpointUrl,
  imageFieldName,
  onUploadSuccess,
  submitButtonText,
  chooseButtonText,
}) => {
  const dispatch = useDispatch()
  const [imageFile, setImageFile] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef(null)
  const closeButtonRef = useRef(null)

  const handleClose = useCallback(() => {
    setImageFile(null)
    setPreviewImage(null)
    onClose()
  }, [onClose])

  const modalContentRef = useClickOutside(() => {
    if (isOpen && !isLoading) {
      handleClose()
    }
  })

  useEffect(() => {
    if (isOpen) {
      if (currentImageSrc && !currentImageSrc.startsWith('blob:')) {
        setPreviewImage(
          currentImageSrc.startsWith('http')
            ? currentImageSrc
            : `${import.meta.env.VITE_API_BASE_URL}/${currentImageSrc}`
        )
      } else {
        setPreviewImage(currentImageSrc)
      }

      setTimeout(() => {
        if (closeButtonRef.current) {
          closeButtonRef.current.focus()
        }
      }, 100)
    } else {
      setImageFile(null)
      setPreviewImage(null)
    }
  }, [currentImageSrc, isOpen])

  const { isCollapsed } = useSelector((state) => state.sidebar)
  const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobileScreen(window.innerWidth <= 768)
    }

    window.addEventListener('resize', checkScreenWidth)
    checkScreenWidth()

    return () => window.removeEventListener('resize', checkScreenWidth)
  }, [])

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      document.body.classList.add('modal-open')
      document.body.classList.add(
        isMobileScreen ? 'modal-mobile-view' : 'modal-desktop-view'
      )

      return () => {
        document.body.style.overflow = originalOverflow
        document.body.classList.remove('modal-open')
        document.body.classList.remove(
          'modal-mobile-view',
          'modal-desktop-view'
        )
      }
    }
  }, [isOpen, isMobileScreen])

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setImageFile(file)
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleImageUpload = async () => {
    if (!imageFile) {
      dispatch(
        showToast({ type: 'info', message: 'Please select an image first.' })
      )
      return
    }
    if (!uploadEndpointUrl) {
      dispatch(
        showToast({
          type: 'error',
          message: 'Upload endpoint is not configured.',
        })
      )
      console.error('Upload endpoint URL is missing.')
      return
    }

    setIsLoading(true)
    const uploadFormData = new FormData()
    uploadFormData.append(imageFieldName, imageFile)

    const headers = {
      'Content-Type': 'multipart/form-data',
    }

    try {
      const response = await axiosInstance.put(
        uploadEndpointUrl,
        uploadFormData,
        { headers }
      )

      if (response.data?.success) {
        if (onUploadSuccess) {
          onUploadSuccess(response.data)
        }
        dispatch(
          showToast({
            type: 'success',
            message: response.data.message || 'Image uploaded successfully!',
          })
        )
        handleClose()
      } else {
        dispatch(
          showToast({
            type: 'error',
            message: response.data?.message || 'Failed to upload image.',
          })
        )
      }
    } catch (error) {
      dispatch(
        showToast({
          type: 'error',
          message: 'An error occurred while uploading the image.',
        })
      )
      console.error('Image upload error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleClose])

  const overlayClassNames = `image-upload-modal-overlay ${
    isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
  } ${isMobileScreen ? 'mobile-screen' : 'desktop-screen'}`
  return (
    isOpen && (
      <dialog
        className={overlayClassNames}
        open
        data-modal='image-upload'
      ></dialog>
    )
  )
}

ImageUploadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  modalTitle: PropTypes.string.isRequired,
  currentImageSrc: PropTypes.string,
  imagePreviewPlaceholderIcon: PropTypes.string.isRequired,
  uploadEndpointUrl: PropTypes.string.isRequired,
  imageFieldName: PropTypes.string.isRequired,
  onUploadSuccess: PropTypes.func,
  submitButtonText: PropTypes.string.isRequired,
  chooseButtonText: PropTypes.string.isRequired,
}

ImageUploadModal.defaultProps = {
  currentImageSrc: null,
  onUploadSuccess: () => {},
}

export default ImageUploadModal
