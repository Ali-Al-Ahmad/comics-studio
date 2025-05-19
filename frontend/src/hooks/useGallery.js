import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from '../redux/slices/toastSlice'
import axiosInstance from '../utils/axiosInstance'

export const useGallery = () => {
  const [comics, setComics] = useState([])
  const [filteredComics, setFilteredComics] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()
  const { comicIds: recentlyViewedIds } = useSelector(
    (state) => state.recentlyViewed
  )

  const fetchComics = async () => {
    try {
      setLoading(true)

      const response = await axiosInstance.get('/books/publicbooks')
      const comicsData = response.data.data

      setComics(comicsData)
      setFilteredComics(comicsData)
    } catch (error) {
      console.error('Error fetching comics:', error)
      dispatch(
        showToast({
          type: 'error',
          message: 'Failed to load comics. Please try again later.',
        })
      )
    } finally {
      setLoading(false)
    }
  }

  const filterComics = useCallback(() => {
    let results = comics

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

    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase().trim()

      results = results.filter((comic) => {
        const titleMatch = comic.title
          ? comic.title.toLowerCase().includes(searchTermLower)
          : false

        const firstNameMatch = comic.user?.first_name
          ? comic.user.first_name.toLowerCase().includes(searchTermLower)
          : false

        const lastNameMatch = comic.user?.last_name
          ? comic.user.last_name.toLowerCase().includes(searchTermLower)
          : false

        const fullNameMatch =
          comic.user?.first_name && comic.user?.last_name
            ? `${comic.user.first_name} ${comic.user.last_name}`
                .toLowerCase()
                .includes(searchTermLower)
            : false

        return titleMatch || firstNameMatch || lastNameMatch || fullNameMatch
      })
    }

    setFilteredComics(results)
  }, [comics, activeFilter, searchTerm, recentlyViewedIds])
  useEffect(() => {
    fetchComics()
  }, [])

  useEffect(() => {
    filterComics()
  }, [filterComics])

  useEffect(() => {
    const contentContainer =
      document.querySelector('.gallery-comics-grid') ||
      document.querySelector('.no-comics')

    if (contentContainer) {
      contentContainer.classList.add('content-transitioning-out')

      contentContainer.style.opacity = '0'
      contentContainer.style.transform = 'translateY(15px) scale(0.98)'
      contentContainer.style.filter = 'blur(2px)'

      setTimeout(() => {
        requestAnimationFrame(() => {
          const updatedContainer =
            document.querySelector('.gallery-comics-grid') ||
            document.querySelector('.no-comics')
          if (updatedContainer) {
            updatedContainer.classList.remove('content-transitioning-out')
            updatedContainer.classList.add('content-transitioning-in')

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

  const handleFilterClick = (filter) => {
    setActiveFilter(filter)
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
  }

  return {
    comics,
    filteredComics,
    loading,
    activeFilter,
    searchTerm,
    handleFilterClick,
    handleSearch,
  }
}

export default useGallery
