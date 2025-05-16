import { useState, useEffect, useMemo } from 'react'
import './Characters.css'
import axiosInstance from '../../utils/axiosInstance'
import Spinner from '../../components/Spinner/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from '../../redux/slices/toastSlice'

import CharacterFormModal from '../../components/CharacterFormModal/CharacterFormModal'
import CharacterCard from '../../components/CharacterCard/CharacterCard'
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog'
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
          apiCharactersData.length > 0 ? apiCharactersData : []
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleOpenCharacterModal = () => {
    setShowCharacterModal(true)
    setCurrentCharacter(null)
  }

  const handleCloseCharacterModal = () => {
    setShowCharacterModal(false)
    setCurrentCharacter(null)
  }

  const handleEditCharacter = (character) => {
    setCurrentCharacter(character)
    setShowCharacterModal(true)
  }
  const handleSaveCharacter = async (characterData) => {
    try {
      const isEditing = !!currentCharacter

      const formData = new FormData()
      formData.append('name', characterData.name)
      formData.append('description', characterData.description)

      if (
        characterData.image_url &&
        characterData.image_url.startsWith('data:')
      ) {
        const response = await fetch(characterData.image_url)
        const blob = await response.blob()
        const file = new File([blob], 'character-image.jpg', {
          type: 'image/jpeg',
        })
        formData.append('image_url', file)
      } else if (characterData.image_file) {
        formData.append('image_url', characterData.image_file)
      }

      if (isEditing) {
        const response = await axiosInstance.put(
          `/characters/${currentCharacter.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )

        const updatedCharacter = response.data.data || {
          ...currentCharacter,
          name: characterData.name,
          description: characterData.description,
          image_url: characterData.image_url,
          updated_at: new Date().toISOString(),
        }

        setCharacters((prev) =>
          prev.map((char) =>
            char.id === currentCharacter.id ? updatedCharacter : char
          )
        )

        dispatch(
          showToast({
            message: 'Character updated successfully!',
            type: 'success',
          })
        )
      } else {
        const response = await axiosInstance.post('/characters', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        const newCharacter = response.data.data

        if (newCharacter) {
          setCharacters((prev) => [newCharacter, ...prev])

          dispatch(
            showToast({
              message: 'Character created successfully!',
              type: 'success',
            })
          )
        } else {
          throw new Error('Failed to create character, API returned no data')
        }
      }

      setShowCharacterModal(false)
    } catch (error) {
      console.error('Failed to process character:', error)
      dispatch(
        showToast({
          message: `Failed to ${
            currentCharacter ? 'update' : 'create'
          } character. Please try again.`,
          type: 'error',
        })
      )
    }
  }
  const confirmDeleteCharacter = (character) => {
    setCharacterToDelete(character)
    setShowDeleteConfirm(true)
  }
  const handleDeleteCharacter = async () => {
    if (!characterToDelete) return

    setShowDeleteConfirm(false)

    try {
      const characterId = characterToDelete.id

      await axiosInstance.delete(`/characters/${characterId}`)

      setCharacters((prev) =>
        prev.filter((character) => character.id !== characterId)
      )

      if (favoriteCharacters.includes(characterId)) {
        const updatedFavorites = favoriteCharacters.filter(
          (id) => id !== characterId
        )
        setFavoriteCharacters(updatedFavorites)
        localStorage.setItem(
          'favoriteCharacters',
          JSON.stringify(updatedFavorites)
        )
      }

      dispatch(
        showToast({
          message: 'Character deleted successfully!',
          type: 'success',
        })
      )

      setCharacterToDelete(null)
    } catch (error) {
      console.error('Failed to delete character:', error)
      dispatch(
        showToast({
          message: 'Failed to delete character from API. Please try again.',
          type: 'error',
        })
      )
    }
  }
  const toggleFavorite = async (characterId) => {
    try {
      const characterToUpdate = characters.find(
        (char) => char.id === characterId
      )
      if (!characterToUpdate) return

      const newFavoriteStatus = !favoriteCharacters.includes(characterId)

      const formData = new FormData()
      formData.append('is_favorite', newFavoriteStatus)

      await axiosInstance.put(`/characters/${characterId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      let updatedFavorites
      if (favoriteCharacters.includes(characterId)) {
        updatedFavorites = favoriteCharacters.filter((id) => id !== characterId)
      } else {
        updatedFavorites = [...favoriteCharacters, characterId]
      }

      setFavoriteCharacters(updatedFavorites)
      localStorage.setItem(
        'favoriteCharacters',
        JSON.stringify(updatedFavorites)
      )

      setCharacters((prev) =>
        prev.map((char) =>
          char.id === characterId
            ? { ...char, is_favorite: newFavoriteStatus }
            : char
        )
      )

      dispatch(
        showToast({
          message: newFavoriteStatus
            ? 'Character added to favorites!'
            : 'Character removed from favorites!',
          type: 'success',
        })
      )
    } catch (error) {
      console.error('Failed to update favorite status:', error)
      dispatch(
        showToast({
          message: 'Failed to update favorite status. Please try again.',
          type: 'error',
        })
      )
    }
  }

  return (
    <div
      className={`characters-container ${
        isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
      }`}
    >
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
            <span className='filter-btn-text'>All Characters</span>
          </button>
          <button
            className={`filter-btn ${
              activeFilter === 'favorites' ? 'active' : ''
            }`}
            onClick={() => handleFilterClick('favorites')}
          >
            <Icon
              icon='mdi:star'
              width='18'
              height='18'
              className='filter-btn-icon'
            />
            <span className='filter-btn-text'>Favorites</span>
          </button>
        </div>

        <div className='credits-display'>
          <span className='credits-value'>{credits} Credits</span>
        </div>
      </div>
      <div className='characters-controls'>
        <div className='search-container'>
          <input
            type='text'
            placeholder='Search characters...'
            value={searchTerm}
            onChange={handleSearch}
            className='search-input'
          />
        </div>{' '}
        <button
          onClick={handleOpenCharacterModal}
          className='create-character-btn'
        >
          {' '}
          <Icon
            icon='mdi:plus'
            width='20'
            height='20'
            className='create-icon'
          />
          <span className='create-text'>Create Character</span>
        </button>
      </div>
      {loading ? (
        <div className='characters-loading'>
          <Spinner />
          <p>Loading characters...</p>
        </div>
      ) : (
        <>
          {' '}
          {filteredCharacters.length === 0 ? (
            <div className='no-characters characters-grid-appear'>
              {' '}
              <div className='empty-state-content'>
                <div className='icon-container'>
                  <Icon
                    icon={
                      activeFilter === 'favorites'
                        ? 'mdi:star'
                        : 'mdi:view-grid'
                    }
                    width='48'
                    height='48'
                    className='empty-state-icon'
                  />
                </div>
                <p>
                  {searchTerm
                    ? `No characters found matching "${searchTerm}". Try a different search term.`
                    : activeFilter === 'favorites'
                    ? 'No favorite characters yet. Click the star icon on any character to mark it as favorite.'
                    : 'No characters found. Create your first character!'}
                </p>
              </div>
            </div>
          ) : (
            <div className='characters-grid characters-grid-appear'>
              {filteredCharacters.map((character, index) => {
                let imageUrl = character.image_url

                if (
                  imageUrl &&
                  !imageUrl.startsWith('data:') &&
                  !imageUrl.includes('placehold.co')
                ) {
                  imageUrl = `${import.meta.env.VITE_API_BASE_URL}/${imageUrl}`
                } else if (!imageUrl) {
                  imageUrl = `https://placehold.co/300x400/3498db/FFFFFF?text=${encodeURIComponent(
                    character.name
                  )}`
                }

                const animationDelay = {
                  animationDelay: `${Math.min(index * 0.05, 0.5)}s`,
                  opacity: 0,
                  animation: 'fadeInGrid 0.3s forwards',
                }
                return (
                  <div
                    key={character.id}
                    style={animationDelay}
                    className='character-card-wrapper'
                    tabIndex={0}
                    role='article'
                    aria-label={`Character: ${character.name}`}
                  >
                    <CharacterCard
                      character={{
                        ...character,
                        image_url: imageUrl,
                      }}
                      onEdit={handleEditCharacter}
                      onDelete={() => confirmDeleteCharacter(character)}
                      onFavorite={() => toggleFavorite(character.id)}
                      isFavorite={
                        character.is_favorite ||
                        favoriteCharacters.includes(character.id)
                      }
                    />
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}{' '}
      <CharacterFormModal
        isOpen={showCharacterModal}
        onClose={handleCloseCharacterModal}
        onSave={handleSaveCharacter}
        character={currentCharacter}
        title={currentCharacter ? 'Edit Character' : 'Create Character'}
        isSidebarCollapsed={isCollapsed}
      />{' '}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteCharacter}
        title='Delete Character'
        message={
          characterToDelete
            ? `Are you sure you want to delete ${characterToDelete.name}? This action cannot be undone.`
            : 'Are you sure you want to delete this character? This action cannot be undone.'
        }
        confirmText='Delete'
        type='danger'
      />
    </div>
  )
}

export default Characters
