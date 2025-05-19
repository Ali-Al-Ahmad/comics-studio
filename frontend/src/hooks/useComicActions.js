import { useState, useEffect } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { showToast } from '../redux/slices/toastSlice'

export const usePublishStatus = (comic, dispatch, onPublishStatusChange) => {
  const [isPublished, setIsPublished] = useState(comic?.is_public || false)
  const [publishLoading, setPublishLoading] = useState(false)

  useEffect(() => {
    if (comic?.is_public !== undefined) {
      setIsPublished(comic.is_public)
    }
  }, [comic?.is_public])

  const togglePublishStatus = async () => {
    if (!comic.bookId) {
      dispatch(
        showToast({
          message: 'Cannot publish: No book ID found',
          type: 'error',
        })
      )
      return
    }

    try {
      setPublishLoading(true)
      const newStatus = !isPublished

      await axiosInstance.put(`/books/${comic.bookId}`, {
        is_public: newStatus,
      })

      setIsPublished(newStatus)

      if (onPublishStatusChange) {
        onPublishStatusChange(newStatus)
      }

      dispatch(
        showToast({
          message: newStatus
            ? 'Comic published successfully!'
            : 'Comic unpublished',
          type: 'success',
        })
      )
    } catch (error) {
      console.error('Error toggling publish status:', error)
      dispatch(
        showToast({
          message: 'Failed to update publish status',
          type: 'error',
        })
      )
    } finally {
      setPublishLoading(false)
    }
  }

  return { isPublished, publishLoading, togglePublishStatus }
}



