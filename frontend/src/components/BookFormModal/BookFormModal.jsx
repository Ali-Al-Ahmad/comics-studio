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







  return (
    <dialog
      className={overlayClassNames}
      open
      data-modal='comic-form'
      role='dialog'
      aria-modal='true'
      aria-labelledby='comic-modal-title'
    ></dialog>
  )
}

export default BookFormModal
