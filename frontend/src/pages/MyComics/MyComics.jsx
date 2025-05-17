import { useState, useEffect, useMemo } from 'react'
import './MyComics.css'
import axiosInstance from '../../utils/axiosInstance'
import Spinner from '../../components/Spinner/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from '../../redux/slices/toastSlice'
import { Icon } from '@iconify-icon/react'
import ComicCard from '../../components/Gallery/ComicCard/ComicCard'
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

        const finalComics = comicsData.length > 0 ? comicsData : []
        setComics(finalComics)
        setFilteredComics(finalComics)

        setLoading(false)
      } catch (error) {
        console.error('Error fetching comics:', error)

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

  return (
    <div className='mycomics-container'>
      <div className='mycomics-header'>
        <div className='gallery-header-container'>
          <div className='filter-buttons'>
            <button
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterClick('all')}
            >
              <Icon
                icon='mdi:view-grid'
                width='18'
                height='18'
                className='filter-btn-icon'
              />
              <span className='filter-btn-text'>All Books</span>
            </button>
            <button
              className={`filter-btn ${
                activeFilter === 'recent' ? 'active' : ''
              }`}
              onClick={() => handleFilterClick('recent')}
            >
              <Icon
                icon='mdi:history'
                width='18'
                height='18'
                className='filter-btn-icon'
              />
              <span className='filter-btn-text'>Recently Viewed</span>
            </button>
          </div>

          <div className='credits-display'>
            <span className='credits-value'>{credits} Credits</span>
          </div>
        </div>

        <div className='mycomics-search-controls'>
          <div className='search-container'>
            <input
              type='text'
              placeholder='Search comics...'
              value={searchTerm}
              onChange={handleSearch}
              className='search-input'
            />
          </div>
          <button
            onClick={() => navigate('/createcomic')}
            className='create-comic-btn'
          >
            <Icon
              icon='mdi:plus'
              width='20'
              height='20'
              className='create-icon'
            />
            <span className='create-text'>Create Comic</span>
          </button>
        </div>
      </div>
      {loading ? (
        <div className='comics-loading'>
          <Spinner />
          <p>Loading comics...</p>
        </div>
      ) : (
        <>
          {filteredComics.length === 0 ? (
            <div className='no-comics comics-grid-appear'>
              <div className='empty-state-content'>
                <div className='icon-container'>
                  <Icon
                    icon={
                      activeFilter === 'recent'
                        ? 'mdi:history'
                        : 'mdi:book-open-page-variant'
                    }
                    width='48'
                    height='48'
                    className='empty-state-icon'
                  />
                </div>
                <p>
                  {searchTerm
                    ? `No comics found matching "${searchTerm}". Try a different search term.`
                    : activeFilter === 'recent'
                    ? 'No recently viewed comics. Browse the gallery to see comics here.'
                    : 'No comics found. Create your first comic!'}
                </p>
                {activeFilter === 'all' && !searchTerm && (
                  <button
                    onClick={() => navigate('/createcomic')}
                    className='create-comic-btn'
                    style={{ marginTop: '1rem' }}
                  >
                    <Icon
                      icon='mdi:plus'
                      width='20'
                      height='20'
                      className='create-icon'
                    />
                    <span className='create-text'>Create Comic</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className='mycomics-comics-grid comics-grid-appear'>
              {filteredComics.map((comic) => (
                <ComicCard
                  key={comic.id}
                  comic={comic}
                  onEdit={() => handleOpenComicModal(comic)}
                  onDelete={() => handleDeleteClick(comic)}
                  isUserComic={true}
                  current={true}
                />
              ))}
            </div>
          )}
        </>
      )}

      {showComicModal && (
        <BookFormModal
          isOpen={showComicModal}
          comic={currentComic}
          onSave={handleSaveComic}
          onClose={handleCloseComicModal}
          isSidebarCollapsed={isCollapsed}
          title={currentComic ? 'Edit Comic' : 'Create Comic'}
        />
      )}

      {showDeleteConfirm && comicToDelete && (
        <ConfirmDialog
          isOpen={showDeleteConfirm}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          title='Delete Comic'
          message={`Are you sure you want to delete "${comicToDelete.title}"? This action cannot be undone.`}
          confirmText='Delete'
          cancelText='Cancel'
          type='danger'
        />
      )}
    </div>
  )
}

export default MyComics
