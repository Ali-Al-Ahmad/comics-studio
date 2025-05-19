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

  const fetchComicBook = async () => {
    try {
      setLoading(true)

      if (!bookId) {
        dispatch(
          showToast({
            message: 'Book ID is required',
            type: 'error',
          })
        )
        setLoading(false)
        return
      }

      const response = await axiosInstance.get(`/books/bookcomics/${bookId}`)

      if (response.data.success) {
        const bookData = response.data.data.book || {}
        const comics = response.data.data.comics || []
        const isUserOwnedBook = user && bookData.user_id === user.id

        const newPanels = comics.map((comic) => ({
          id: comic.id,
          image: comic.image_url,
          caption: comic.caption || '',
          book_id: bookId,
        }))

        setComic((prev) => ({
          ...prev,
          prompt: bookData.title || 'Comic Book',
          panels: newPanels,
          bookId: parseInt(bookId),
          is_public: bookData.is_public || false,
          user_id: bookData.user_id,
          isUserOwnedBook,
        }))

        dispatch(
          showToast({
            message: 'Comic book loaded successfully',
            type: 'success',
          })
        )
      } else {
        throw new Error('Failed to load comic book')
      }
    } catch (error) {
      console.error('Error loading comic book:', error)
      dispatch(
        showToast({
          message: 'Failed to load comic book. Please try again.',
          type: 'error',
        })
      )
    } finally {
      setLoading(false)
    }
  }


}
