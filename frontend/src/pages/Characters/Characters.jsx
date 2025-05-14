import { useState, useEffect, useMemo } from 'react'
import './Characters.css'
import axiosInstance from '../../utils/axiosInstance'
import Spinner from '../../components/Spinner/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from '../../redux/slices/toastSlice'

import CharacterFormModal from '../../components/CharacterFormModal/CharacterFormModal'
import CharacterCard from '../../components/CharacterCard/CharacterCard'
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog'
import charactersData from '../../fakeData/charactersData'
import { Icon } from '@iconify-icon/react'

const Characters = () => {
  const [characters, setCharacters] = useState([])
  const [filteredCharacters, setFilteredCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showCharacterModal, setShowCharacterModal] = useState(false)
  const [currentCharacter, setCurrentCharacter] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [favoriteCharacters, setFavoriteCharacters] = useState([])
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [characterToDelete, setCharacterToDelete] = useState(null)
  const dispatch = useDispatch()
  const { isCollapsed } = useSelector((state) => state.sidebar)
  const user = useSelector((state) => state.user)
  const credits = user?.credits || 0
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true)

        const response = await axiosInstance.get('/characters/usercharacters')
        const apiCharactersData = response.data.data || []

        const finalCharacters =
          apiCharactersData.length > 0 ? apiCharactersData : charactersData

        setCharacters(finalCharacters)
        setFilteredCharacters(finalCharacters)
        const apiFavorites = finalCharacters
          .filter((character) => character.is_favorite)
          .map((character) => character.id)

        const savedFavorites = localStorage.getItem('favoriteCharacters')
        const localFavorites = savedFavorites ? JSON.parse(savedFavorites) : []

        const mergedFavorites = [
          ...new Set([...apiFavorites, ...localFavorites]),
        ]

        setFavoriteCharacters(mergedFavorites)
        localStorage.setItem(
          'favoriteCharacters',
          JSON.stringify(mergedFavorites)
        )
      } catch (error) {
        console.error('Failed to fetch characters:', error)

        setCharacters(charactersData)
        setFilteredCharacters(charactersData)

        dispatch(
          showToast({
            message:
              'Failed to load characters from API. Using mock data instead.',
            type: 'warning',
          })
        )
      } finally {
        setLoading(false)
      }
    }

    fetchCharacters()
  }, [dispatch])
  const memoizedFilteredCharacters = useMemo(() => {
    let results = [...characters]

    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase()

      results = results.filter((character) => {
        if (!character || !character.name) return false

        const nameMatch = character.name.toLowerCase().includes(searchTermLower)
        const descriptionMatch = character.description
          ? character.description.toLowerCase().includes(searchTermLower)
          : false

        return nameMatch || descriptionMatch
      })
    }

    if (activeFilter === 'favorites') {
      results = results.filter(
        (character) =>
          character.is_favorite || favoriteCharacters.includes(character.id)
      )
    }

    return results
  }, [characters, searchTerm, activeFilter, favoriteCharacters])

  useEffect(() => {
    setFilteredCharacters(memoizedFilteredCharacters)
  }, [memoizedFilteredCharacters])
  useEffect(() => {
    const container =
      document.querySelector('.characters-grid') ||
      document.querySelector('.no-characters')

    if (container) {
      container.classList.remove('characters-grid-appear')

      void container.offsetWidth

      container.classList.add('characters-grid-appear')
    }
  }, [activeFilter])
  const handleFilterClick = (filter) => {
    if (filter === activeFilter) return

    const contentContainer =
      document.querySelector('.characters-grid') ||
      document.querySelector('.no-characters')

    if (contentContainer) {
      contentContainer.classList.add('content-transitioning-out')

      contentContainer.style.opacity = '0'
      contentContainer.style.transform = 'translateY(15px) scale(0.98)'
      contentContainer.style.filter = 'blur(2px)'

      setTimeout(() => {
        setActiveFilter(filter)

        requestAnimationFrame(() => {
          const updatedContainer =
            document.querySelector('.characters-grid') ||
            document.querySelector('.no-characters')
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

              setTimeout(() => {
                updatedContainer.classList.remove('content-transitioning-in')
              }, 400)
            })
          }
        })
      }, 200)
    } else {
      setActiveFilter(filter)
    }
  }






  return (
    <div
      className={`characters-container ${
        isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
      }`}
    ></div>
  )
}

export default Characters
