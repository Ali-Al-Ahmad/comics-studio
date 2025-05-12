import { useState, useEffect } from 'react'
import './Gallery.css'
import axiosInstance from '../../utils/axiosInstance'
import Spinner from '../../components/Spinner/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from '../../redux/slices/toastSlice'
import GalleryHeader from '../../components/Gallery/GalleryHeader/GalleryHeader'
import SearchBox from '../../components/Gallery/SearchBox/SearchBox'
import ComicCard from '../../components/Gallery/ComicCard/ComicCard'
import { fakeComics } from '../../fakeData/comicsData'

const Gallery = () => {
  const [comics, setComics] = useState([])
  const [filteredComics, setFilteredComics] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()
  const { isCollapsed } = useSelector((state) => state.sidebar)
  const { comicIds: recentlyViewedIds } = useSelector(
    (state) => state.recentlyViewed
  )

  useEffect(() => {
    const fetchComics = async () => {
      try {
        setLoading(true)

        const response = await axiosInstance.get('/books/publicbooks')
        const comicsData = response.data.data

        setComics(comicsData)
        setFilteredComics(comicsData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching comics:', error)
        dispatch(
          showToast({
            type: 'error',
            message: 'Failed to load comics. Please try again later.',
          })
        )
        setLoading(false)
      }
    }

    fetchComics()
  }, [dispatch])
  useEffect(() => {
    let results = [...fakeComics, ...comics]

    console.log(
      'All comics:',
      results.map((comic) => ({ id: comic.id, title: comic.title }))
    )
    console.log('Recently viewed IDs:', recentlyViewedIds)

    if (activeFilter === 'recent') {
      if (recentlyViewedIds && recentlyViewedIds.length > 0) {
        results = results.filter((comic) => {
          const comicId = Number(comic.id)
          const isInRecentlyViewed = recentlyViewedIds.includes(comicId)
          console.log(
            `Comic ID ${comicId} (${comic.title}) is in recently viewed: ${isInRecentlyViewed}`
          )
          return isInRecentlyViewed
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

  const handleFilterClick = (filter) => {
    setActiveFilter(filter)
  }
  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
  }
  return (
    <div
      className={`gallery-container ${
        isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
      }`}
    ></div>
  )
}

export default Gallery
