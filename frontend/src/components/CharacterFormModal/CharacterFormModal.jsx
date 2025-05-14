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
    ></dialog>
  )
}

export default CharacterFormModal
