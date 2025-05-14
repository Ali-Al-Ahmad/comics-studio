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
