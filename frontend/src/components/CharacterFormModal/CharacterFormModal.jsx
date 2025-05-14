import { useState, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import './CharacterFormModal.css'
import { useDispatch } from 'react-redux'
import { showToast } from '../../redux/slices/toastSlice'
import Spinner from '../Spinner/Spinner'
import { Icon } from '@iconify-icon/react'

const CharacterFormModal = ({
  isOpen,
  onClose,
  onSave,
  character = null,
  title = 'Create Character',
  isSidebarCollapsed = false,
}) => {
  const [characterName, setCharacterName] = useState('')
  const [characterDescription, setCharacterDescription] = useState('')

  const [selectedFile, setSelectedFile] = useState(null) 
  const [imagePreviewUrl, setImagePreviewUrl] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [activeTab, setActiveTab] = useState('info')
  const [formErrors, setFormErrors] = useState({})
  const dispatch = useDispatch()
  const isEditing = !!character

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const modalContentRef = useRef(null)

  const handleTabChange = (tab) => {
    setFormErrors({})
    setActiveTab(tab)
  }

  const handleCancel = useCallback(() => {
    setCharacterName('')
    setCharacterDescription('')
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

    if (!characterName.trim()) {
      errors.name = 'Character name is required'
    }

    if (!characterDescription.trim()) {
      errors.description = 'Character description is required'
    }

    if (!imagePreviewUrl && !isEditing) {
      errors.image = 'Character image is required'
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
      if (
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1'
      ) {
        setTimeout(() => {
          onSave({
            name: characterName.trim(),
            description: characterDescription.trim(),
            image_url: imagePreviewUrl,
          })
          setIsUploading(false)
          onClose()
        }, 800)
        return
      }
    } catch (error) {
      console.error('Error processing character:', error)
      dispatch(
        showToast({
          message: `Failed to ${
            isEditing ? 'update' : 'create'
          } character. Please try again.`,
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
    if (character) {
      setCharacterName(character.name || '')
      setCharacterDescription(character.description || '')
      setImagePreviewUrl(character.image_url || '')
    } else {
      setCharacterName('')
      setCharacterDescription('')
      setSelectedFile(null)
      setImagePreviewUrl('')
      setFormErrors({})
    }
  }, [character])

  if (!isOpen) return null

  const overlayClassNames = `character-modal-overlay ${
    isSidebarCollapsed ? 'sidebar-collapsed' : ''
  } ${isMobile ? 'mobile-screen' : 'desktop-screen'}`

  return (
    <dialog
      className={overlayClassNames}
      open
      data-modal='character-form'
      role='dialog'
      aria-modal='true'
      aria-labelledby='character-modal-title'
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
          <h2 id='character-modal-title'>
            {isEditing ? `Edit ${characterName}` : title}
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
              icon='mdi:account-details'
              className='tab-icon'
              aria-hidden='true'
            />
            Character Info
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
            Character Image
          </button>{' '}
        </div>
        <div className='character-modal-body'>
          <form
            className='character-form-container'
            onSubmit={handleSubmit}
          >
            {activeTab === 'info' && (
              <div className='character-info-tab'>
                <div className='character-form-group'>
                  <label htmlFor='character-name'>Character Name</label>
                  <input
                    id='character-name'
                    type='text'
                    value={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                    placeholder='Enter a name for your character'
                    className={formErrors.name ? 'input-error' : ''}
                  />
                  {formErrors.name && (
                    <div className='error-message'>{formErrors.name}</div>
                  )}
                </div>

                <div className='character-form-group'>
                  <label htmlFor='character-description'>
                    Character Description
                  </label>
                  <textarea
                    id='character-description'
                    value={characterDescription}
                    onChange={(e) => setCharacterDescription(e.target.value)}
                    placeholder="Describe your character's personality, abilities, and backstory"
                    rows={6}
                    className={formErrors.description ? 'input-error' : ''}
                  />
                  {formErrors.description && (
                    <div className='error-message'>
                      {formErrors.description}
                    </div>
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
                        alt='Character Preview'
                        className='character-image-preview'
                      />
                      <button
                        type='button'
                        className='change-image-btn'
                        onClick={() =>
                          document
                            .getElementById('character-image-upload')
                            .click()
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
                          document
                            .getElementById('character-image-upload')
                            .click()
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
                    id='character-image-upload'
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
                    Next
                    <Icon
                      icon='mdi:arrow-right'
                      width='18'
                      height='18'
                    />
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
                    type='button'
                    className='submit-btn'
                    onClick={handleSubmit}
                    disabled={
                      isUploading ||
                      !characterName.trim() ||
                      !characterDescription.trim() ||
                      !imagePreviewUrl
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
                        {isEditing ? 'Update Character' : 'Create Character'}
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


export default CharacterFormModal
