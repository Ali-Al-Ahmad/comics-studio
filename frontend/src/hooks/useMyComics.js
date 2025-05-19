import { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from '../redux/slices/toastSlice'
import axiosInstance from '../utils/axiosInstance'

export const useMyComics = () => {
  const [comics, setComics] = useState([])
  const [filteredComics, setFilteredComics] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showComicModal, setShowComicModal] = useState(false)
  const [currentComic, setCurrentComic] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [comicToDelete, setComicToDelete] = useState(null)
  const dispatch = useDispatch()
  const { isCollapsed } = useSelector((state) => state.sidebar)
  const { comicIds: recentlyViewedIds } = useSelector(
    (state) => state.recentlyViewed
  )
  useEffect(() => {
    fetchComics()
  }, [])

  const memoizedFilteredComics = useMemo(() => {
    let results = [...comics]

    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase().trim()

      results = results.filter((comic) => {
        const titleMatch = comic.title
          ? comic.title.toLowerCase().includes(searchTermLower)
          : false

        const descriptionMatch = comic.description
          ? comic.description.toLowerCase().includes(searchTermLower)
          : false

        return titleMatch || descriptionMatch
      })
    }

    if (activeFilter === 'recent') {
      if (recentlyViewedIds && recentlyViewedIds.length > 0) {
        results = results.filter((comic) => {
          const comicId = Number(comic.id)
          return recentlyViewedIds.includes(comicId)
        })

        results.sort((a, b) => {
          return (
            recentlyViewedIds.indexOf(Number(a.id)) -
            recentlyViewedIds.indexOf(Number(b.id))
          )
        })
      } else {
        results = []
      }
    }

    return results
  }, [comics, searchTerm, activeFilter, recentlyViewedIds])

  useEffect(() => {
    setFilteredComics(memoizedFilteredComics)
  }, [memoizedFilteredComics])
  useEffect(() => {
    const contentContainer =
      document.querySelector('.mycomics-comics-grid') ||
      document.querySelector('.no-comics')

    if (contentContainer) {
      contentContainer.classList.add('content-transitioning-out')

      contentContainer.style.opacity = '0'
      contentContainer.style.transform = 'translateY(15px) scale(0.98)'
      contentContainer.style.filter = 'blur(2px)'

      setTimeout(() => {
        requestAnimationFrame(() => {
          const updatedContainer =
            document.querySelector('.mycomics-comics-grid') ||
            document.querySelector('.no-comics')
          if (updatedContainer) {
            updatedContainer.classList.remove('content-transitioning-out')
            updatedContainer.classList.add('content-transitioning-in')
            updatedContainer.classList.add('comics-grid-appear')

            updatedContainer.style.opacity = '0'
            updatedContainer.style.transform = 'translateY(15px) scale(0.98)'
            updatedContainer.style.filter = 'blur(2px)'

            void updatedContainer.offsetWidth

            requestAnimationFrame(() => {
              updatedContainer.style.opacity = '1'
              updatedContainer.style.transform = 'translateY(0) scale(1)'
              updatedContainer.style.filter = 'blur(0)'
            })
          }
        })
      }, 150)
    }
  }, [activeFilter])

  const fetchComics = async () => {
    try {
      setLoading(true)

      const response = await axiosInstance.get('/users/userbooks')
      const comicsData = response.data.data || []

      const finalComics = comicsData.length > 0 ? comicsData : []
      setComics(finalComics)
      setFilteredComics(finalComics)
    } catch (error) {
      console.error('Error fetching comics:', error)

      dispatch(
        showToast({
          type: 'warning',
          message: 'Failed to load comics. Using demo data instead.',
        })
      )
    } finally {
      setLoading(false)
    }
  }

  const handleFilterClick = (filter) => {
    if (filter === activeFilter) return
    setActiveFilter(filter)
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
  }

  const handleOpenComicModal = (comic = null) => {
    setCurrentComic(comic)
    setShowComicModal(true)
  }

  const handleCloseComicModal = () => {
    setShowComicModal(false)
    setCurrentComic(null)
  }

  const handleSaveComic = async (comicData) => {
    try {
      const formData = new FormData()

      Object.keys(comicData).forEach((key) => {
        if (key === 'image' && comicData[key]) {
          formData.append('image_url', comicData[key])
        } else if (comicData[key] !== null && comicData[key] !== undefined) {
          formData.append(key, comicData[key])
        }
      })

      let response

      if (currentComic) {
        response = await axiosInstance.put(
          `/books/${currentComic.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )

        setComics((prevComics) =>
          prevComics.map((c) =>
            c.id === currentComic.id ? response.data.data : c
          )
        )

        dispatch(
          showToast({
            message: 'Comic updated successfully!',
            type: 'success',
          })
        )
      } else {
        response = await axiosInstance.post('/books', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        setComics((prevComics) => [response.data.data, ...prevComics])

        dispatch(
          showToast({
            message: 'Comic created successfully!',
            type: 'success',
          })
        )
      }

      handleCloseComicModal()
    } catch (error) {
      console.error('Failed to save comic:', error)

      dispatch(
        showToast({
          message: 'Failed to save comic. Please try again.',
          type: 'error',
        })
      )
    }
  }

  const handleDeleteClick = (comic) => {
    setComicToDelete(comic)
    setShowDeleteConfirm(true)
  }

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false)
    setComicToDelete(null)
  }

  const handleConfirmDelete = async () => {
    if (!comicToDelete) return

    try {
      await axiosInstance.delete(`/books/${comicToDelete.id}`)

      setComics((prevComics) =>
        prevComics.filter((c) => c.id !== comicToDelete.id)
      )

      dispatch(
        showToast({
          message: 'Comic deleted successfully!',
          type: 'success',
        })
      )

      setShowDeleteConfirm(false)
      setComicToDelete(null)
    } catch (error) {
      console.error('Failed to delete comic:', error)

      dispatch(
        showToast({
          message: 'Failed to delete comic. Please try again.',
          type: 'error',
        })
      )
    }
  }

  return {
    comics,
    filteredComics,
    loading,
    activeFilter,
    searchTerm,
    showComicModal,
    currentComic,
    showDeleteConfirm,
    comicToDelete,
    isCollapsed,
    handleFilterClick,
    handleSearch,
    handleOpenComicModal,
    handleCloseComicModal,
    handleSaveComic,
    handleDeleteClick,
    handleCancelDelete,
    handleConfirmDelete,
  }
}

export default useMyComics
