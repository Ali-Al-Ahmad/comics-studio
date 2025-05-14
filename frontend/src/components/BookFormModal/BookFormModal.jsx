import { useState, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import '../CharacterFormModal/CharacterFormModal.css'
import { useDispatch } from 'react-redux'
import { showToast } from '../../redux/slices/toastSlice'
import Spinner from '../Spinner/Spinner'
import { Icon } from '@iconify-icon/react'

const BookFormModal = ({
  isOpen,
  onClose,
  onSave,
  comic = null,
  title = 'Create Comic',
  isSidebarCollapsed = false,
}) => {
  const [comicName, setComicName] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [activeTab, setActiveTab] = useState('info')
  const [formErrors, setFormErrors] = useState({})
  const dispatch = useDispatch()
  const isEditing = !!comic

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const modalContentRef = useRef(null)

  const handleTabChange = (tab) => {
    setFormErrors({})
    setActiveTab(tab)
  }

  const handleCancel = useCallback(() => {
    setComicName('')
    setSelectedFile(null)
    setImagePreviewUrl('')
    setFormErrors({})
    setActiveTab('info')
    onClose()
  }, [onClose])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
      dispatch(
        showToast({
          message: 'Please select a JPG or PNG image file',
          type: 'error',
        })
      )
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      dispatch(
        showToast({
          message: 'File size should not exceed 5MB',
          type: 'error',
        })
      )
      return
    }

    setSelectedFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const validateForm = () => {
    const errors = {}

    if (!comicName.trim()) {
      errors.name = 'Comic name is required'
    }

    if (!imagePreviewUrl && !isEditing) {
      errors.image = 'Comic image is required'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsUploading(true)

    try {
      const comicData = {
        title: comicName.trim(),
        image: selectedFile,
      }

      await onSave(comicData)
      handleCancel()
    } catch (error) {
      console.error('Error saving comic:', error)
      dispatch(
        showToast({
          message: `Failed to ${
            isEditing ? 'update' : 'create'
          } comic. Please try again.`,
          type: 'error',
        })
      )
    } finally {
      setIsUploading(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target)
      ) {
        handleCancel()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, handleCancel])

  useEffect(() => {
    if (isOpen && modalContentRef.current) {
      modalContentRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      document.body.classList.add('modal-open')
      document.body.classList.add(isMobile ? 'mobile-screen' : 'desktop-screen')

      return () => {
        document.body.style.overflow = originalOverflow
        document.body.classList.remove('modal-open')
        document.body.classList.remove('mobile-screen', 'desktop-screen')
      }
    }
  }, [isOpen, isMobile])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        handleCancel()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleCancel])
  useEffect(() => {
    if (comic) {
      setComicName(comic.title || '')
      if (comic.image_url) {
        if (comic.image_url.startsWith('http')) {
          setImagePreviewUrl(comic.image_url)
        } else {
          setImagePreviewUrl(
            `${import.meta.env.VITE_API_BASE_URL}/${comic.image_url}`
          )
        }
      }
    } else {
      setComicName('')
      setSelectedFile(null)
      setImagePreviewUrl('')
      setFormErrors({})
    }
  }, [comic])

  if (!isOpen) return null

  const overlayClassNames = `character-modal-overlay ${
    isSidebarCollapsed ? 'sidebar-collapsed' : ''
  } ${isMobile ? 'mobile-screen' : 'desktop-screen'}`

  return (
    <dialog
      className={overlayClassNames}
      open
      data-modal='comic-form'
      role='dialog'
      aria-modal='true'
      aria-labelledby='comic-modal-title'
    >
      <div
        className='character-modal-content'
        ref={modalContentRef}
        tabIndex='-1'
        role='dialog'
        onKeyDown={(e) => {
          if (e.key === 'Escape') handleCancel()
        }}
      >
        <div className='character-modal-header'>
          <h2 id='comic-modal-title'>
            {isEditing ? `Edit ${comicName}` : title}
          </h2>
          <button
            type='button'
            className='character-modal-close'
            onClick={handleCancel}
            aria-label='Close modal'
          >
            <Icon
              icon='mdi:close'
              width='24'
              height='24'
              aria-hidden='true'
            />
          </button>
        </div>
        <div className='character-modal-tabs'>
          <button
            className={`character-tab ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => handleTabChange('info')}
          >
            <Icon
              icon='mdi:information-outline'
              className='tab-icon'
              aria-hidden='true'
            />
            Comic Info
          </button>
          <button
            className={`character-tab ${activeTab === 'image' ? 'active' : ''}`}
            onClick={() => handleTabChange('image')}
          >
            <Icon
              icon='mdi:image-outline'
              className='tab-icon'
              aria-hidden='true'
            />
            Comic Image
          </button>
        </div>
        <div className='character-modal-body'>
          <form
            className='character-form-container'
            onSubmit={handleSubmit}
          >
            {activeTab === 'info' && (
              <div className='character-info-tab'>
                <div className='character-form-group'>
                  <label htmlFor='comic-name'>Comic Name</label>
                  <input
                    id='comic-name'
                    type='text'
                    value={comicName}
                    onChange={(e) => setComicName(e.target.value)}
                    placeholder='Enter a name for your comic'
                    className={formErrors.name ? 'input-error' : ''}
                  />
                  {formErrors.name && (
                    <div className='error-message'>{formErrors.name}</div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'image' && (
              <div className='character-image-tab'>
                <div className='image-upload-container'>
                  {imagePreviewUrl ? (
                    <div className='image-preview-container'>
                      <img
                        src={imagePreviewUrl}
                        alt='Comic Preview'
                        className='character-image-preview'
                      />
                      <button
                        type='button'
                        className='change-image-btn'
                        onClick={() =>
                          document.getElementById('comic-image-upload').click()
                        }
                      >
                        <Icon
                          icon='mdi:camera-flip-outline'
                          width='18'
                          height='18'
                        />
                        Change Image
                      </button>
                    </div>
                  ) : (
                    <div className='image-upload-placeholder'>
                      <Icon
                        icon='mdi:cloud-upload-outline'
                        className='upload-icon'
                        width='48'
                        height='48'
                      />
                      <p>Drag and drop or click to select an image</p>
                      <button
                        type='button'
                        className='browse-image-btn'
                        onClick={() =>
                          document.getElementById('comic-image-upload').click()
                        }
                      >
                        <Icon
                          icon='mdi:file-image-outline'
                          width='18'
                          height='18'
                        />
                        Select Image
                      </button>
                      {formErrors.image && (
                        <div className='error-message'>{formErrors.image}</div>
                      )}
                    </div>
                  )}
                  <input
                    type='file'
                    id='comic-image-upload'
                    accept='image/jpeg,image/png'
                    onChange={handleFileChange}
                    className='hidden-file-input'
                  />
                </div>
              </div>
            )}

            <div className='character-modal-actions'>
              {activeTab === 'info' ? (
                <div className='button-group'>
                  <button
                    type='button'
                    className='secondary-btn'
                    onClick={handleCancel}
                  >
                    <Icon
                      icon='mdi:close'
                      width='18'
                      height='18'
                    />
                    Cancel
                  </button>
                  <button
                    type='button'
                    className='primary-btn'
                    onClick={() => handleTabChange('image')}
                  >
                    <Icon
                      icon='mdi:content-save'
                      width='18'
                      height='18'
                    />
                    Save
                  </button>
                </div>
              ) : (
                <div className='button-group'>
                  <button
                    type='button'
                    className='secondary-btn'
                    onClick={() => handleTabChange('info')}
                  >
                    <Icon
                      icon='mdi:arrow-left'
                      width='18'
                      height='18'
                    />
                    Back
                  </button>
                  <button
                    type='submit'
                    className='submit-btn'
                    disabled={
                      isUploading || !comicName.trim() || !imagePreviewUrl
                    }
                  >
                    {isUploading ? (
                      <>
                        <Spinner size='small' />
                        {isEditing ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      <>
                        <Icon
                          icon={
                            isEditing ? 'mdi:content-save' : 'mdi:plus-circle'
                          }
                          width='18'
                          height='18'
                        />
                        {isEditing ? 'Update Comic' : 'Create Comic'}
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </dialog>
  )
}

BookFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  comic: PropTypes.object,
  title: PropTypes.string,
  isSidebarCollapsed: PropTypes.bool,
}

export default BookFormModal
