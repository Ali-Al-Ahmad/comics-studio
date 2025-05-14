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

  return (
    <div
      className={`mycomics-container ${
        isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
      }`}
    ></div>
  )
}

export default MyComics
