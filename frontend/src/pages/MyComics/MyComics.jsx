import { useState, useEffect, useMemo } from 'react'
import './MyComics.css'
import axiosInstance from '../../utils/axiosInstance'
import Spinner from '../../components/Spinner/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from '../../redux/slices/toastSlice'
import { Icon } from '@iconify-icon/react'
import ComicCard from '../../components/Gallery/ComicCard/ComicCard'
import { fakeComics } from '../../fakeData/comicsData'
import { useNavigate } from 'react-router-dom'
import BookFormModal from '../../components/BookFormModal/BookFormModal'
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog'

const MyComics = () => {
  const [comics, setComics] = useState([])
  const [filteredComics, setFilteredComics] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showComicModal, setShowComicModal] = useState(false)
  const [currentComic, setCurrentComic] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [comicToDelete, setComicToDelete] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isCollapsed } = useSelector((state) => state.sidebar)
  const user = useSelector((state) => state.user)
  const credits = user?.credits || 0
  const { comicIds: recentlyViewedIds } = useSelector(
    (state) => state.recentlyViewed
  )

  useEffect(() => {
    const fetchComics = async () => {
      try {
        setLoading(true)

        const response = await axiosInstance.get('/users/userbooks')
        const comicsData = response.data.data || []

        const finalComics = comicsData.length > 0 ? comicsData : fakeComics

        setComics(finalComics)
        setFilteredComics(finalComics)

        setLoading(false)
      } catch (error) {
        console.error('Error fetching comics:', error)

        setComics(fakeComics)
        setFilteredComics(fakeComics)

        dispatch(
          showToast({
            type: 'warning',
            message: 'Failed to load comics. Using demo data instead.',
          })
        )
        setLoading(false)
      }
    }

    fetchComics()
  }, [dispatch])

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
    const container =
      document.querySelector('.mycomics-comics-grid') ||
      document.querySelector('.no-comics')

    if (container) {
      container.classList.remove('comics-grid-appear')

      void container.offsetWidth

      container.classList.add('comics-grid-appear')
    }
  }, [activeFilter])

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





  return (
    <div
      className={`mycomics-container ${
        isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
      }`}
    ></div>
  )
}

export default MyComics
