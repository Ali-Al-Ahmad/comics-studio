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

export const useDownloadComic = (dispatch) => {
  const handleDownloadComic = async (bookElement, comic) => {
    try {
      if (!bookElement) {
        throw new Error('Comic book element not found')
      }

      if (typeof window.html2canvas === 'undefined') {
        if (dispatch) {
          dispatch(
            showToast({
              message: 'Preparing download functionality...',
              type: 'info',
            })
          )
        }

        const script = document.createElement('script')
        script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js'
        script.async = true

        await new Promise((resolve, reject) => {
          script.onload = resolve
          script.onerror = () => reject(new Error('Failed to load html2canvas'))
          document.head.appendChild(script)
        })
      }

      if (dispatch) {
        dispatch(
          showToast({
            message: 'Generating comic image...',
            type: 'info',
          })
        )
      }

      const canvas = await window.html2canvas(bookElement, {
        allowTaint: true,
        useCORS: true,
        scale: 2,
        backgroundColor: '#ffffff',
      })

      const dataUrl = canvas.toDataURL('image/png')

      const link = document.createElement('a')
      link.href = dataUrl
      link.download = `${comic.prompt
        .slice(0, 20)
        .replace(/\s+/g, '_')}_comic.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      if (dispatch) {
        dispatch(
          showToast({
            message: 'Comic successfully downloaded!',
            type: 'success',
          })
        )
      }
    } catch (error) {
      console.error('Error downloading comic:', error)
      if (dispatch) {
        dispatch(
          showToast({
            message: 'Failed to download comic. Please try again.',
            type: 'error',
          })
        )
      }
      if (typeof window.html2canvas === 'undefined' && dispatch) {
        dispatch(
          showToast({
            message:
              'Please try installing html2canvas or take a screenshot instead.',
            type: 'info',
          })
        )
      }
    }
  }



  return { handleDownloadComic, handleDownloadPDF }
}


