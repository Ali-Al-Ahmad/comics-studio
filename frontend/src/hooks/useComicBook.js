import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { showToast } from '../redux/slices/toastSlice'
import axiosInstance from '../utils/axiosInstance'

export const useComicBook = (bookId, dispatch) => {
  const [comic, setComic] = useState({
    prompt: '',
    panels: [],
    captions: [],
    viewMode: 'grid',
    isEditing: false,
    currentEditPanel: null,
    isUserOwnedBook: false,
  })
  const [loading, setLoading] = useState(true)
  const user = useSelector((state) => state.user)

  const handleChangeViewMode = (mode) => {
    setComic((prev) => ({ ...prev, viewMode: mode }))
  }

  const handleEditPanel = () => {
    return
  }

  const handleRegeneratePanel = () => {
    return
  }

  const handleCaptionChange = () => {
    return
  }

  const handlePublishStatusChange = (newStatus) => {
    setComic((prev) => ({ ...prev, is_public: newStatus }))
  }
}
