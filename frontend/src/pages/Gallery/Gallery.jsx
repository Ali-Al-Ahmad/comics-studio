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

  return (
    <div
      className={`gallery-container ${
        isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
      }`}
    ></div>
  )
}

export default Gallery
