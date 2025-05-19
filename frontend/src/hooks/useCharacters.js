import { useState, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { showToast } from '../redux/slices/toastSlice'
import axiosInstance from '../utils/axiosInstance'

export const useCharacters = () => {
  const [characters, setCharacters] = useState([])
  const [filteredCharacters, setFilteredCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showCharacterModal, setShowCharacterModal] = useState(false)
  const [currentCharacter, setCurrentCharacter] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [characterToDelete, setCharacterToDelete] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchCharacters()
  }, [])

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
      results = results.filter((character) => character.is_favorite === true)
    }

    return results
  }, [characters, searchTerm, activeFilter])

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
  const fetchCharacters = async () => {
    try {
      setLoading(true)

      const response = await axiosInstance.get('/characters/usercharacters')
      const apiCharactersData = response.data.data || []

      const finalCharacters =
        apiCharactersData.length > 0 ? apiCharactersData : []
      setCharacters(finalCharacters)
      setFilteredCharacters(finalCharacters)
    } catch (error) {
      console.error('Failed to fetch characters:', error)

      dispatch(
        showToast({
          message: 'Failed to load characters from API',
          type: 'warning',
        })
      )
    } finally {
      setLoading(false)
    }
  }

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
        }
      }

      handleCloseCharacterModal()
    } catch (error) {
      console.error('Failed to save character:', error)
      dispatch(
        showToast({
          message: 'Failed to save character. Please try again.',
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

    try {
      await axiosInstance.delete(`/characters/${characterToDelete.id}`)

      setCharacters((prev) =>
        prev.filter((char) => char.id !== characterToDelete.id)
      )

      dispatch(
        showToast({
          message: 'Character deleted successfully!',
          type: 'success',
        })
      )
    } catch (error) {
      console.error('Failed to delete character:', error)
      dispatch(
        showToast({
          message: 'Failed to delete character. Please try again.',
          type: 'error',
        })
      )
    } finally {
      setShowDeleteConfirm(false)
      setCharacterToDelete(null)
    }
  }
  const toggleFavorite = async (characterId) => {
    try {
      const characterToToggle = characters.find(
        (char) => char.id === characterId
      )
      if (!characterToToggle) return

      const isCurrentlyFavorite = characterToToggle.is_favorite === true
      const newFavoriteStatus = !isCurrentlyFavorite

      setCharacters((prev) =>
        prev.map((char) =>
          char.id === characterId
            ? { ...char, is_favorite: newFavoriteStatus }
            : char
        )
      )

      await axiosInstance.put(`/characters/${characterId}/favorite`, {
        is_favorite: newFavoriteStatus,
      })

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

      setCharacters((prev) =>
        prev.map((char) =>
          char.id === characterId
            ? { ...char, is_favorite: !char.is_favorite }
            : char
        )
      )

      dispatch(
        showToast({
          message: 'Failed to update favorite status. Please try again.',
          type: 'error',
        })
      )
    }
  }
  return {
    characters,
    filteredCharacters,
    loading,
    searchTerm,
    showCharacterModal,
    currentCharacter,
    activeFilter,
    showDeleteConfirm,
    characterToDelete,
    handleSearch,
    handleFilterClick,
    handleOpenCharacterModal,
    handleCloseCharacterModal,
    handleEditCharacter,
    handleSaveCharacter,
    confirmDeleteCharacter,
    handleDeleteCharacter,
    toggleFavorite,
    setShowDeleteConfirm,
  }
}
