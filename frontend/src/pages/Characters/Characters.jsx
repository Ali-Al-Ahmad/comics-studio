import './Characters.css'
import { useSelector } from 'react-redux'
import { useCharacters } from '../../hooks/useCharacters'

import CharactersHeader from '../../components/Characters/CharactersHeader'
import CharactersControls from '../../components/Characters/CharactersControls'
import CharactersGrid from '../../components/Characters/CharactersGrid'
import EmptyState from '../../components/Characters/EmptyState'
import LoadingState from '../../components/Characters/LoadingState'
import CharacterModals from '../../components/Characters/CharacterModals'

const Characters = () => {
  const { isCollapsed } = useSelector((state) => state.sidebar)

  const {
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
  } = useCharacters()

  return (
    <div className='characters-container'>
      <CharactersHeader
        activeFilter={activeFilter}
        handleFilterClick={handleFilterClick}
      />

      <CharactersControls
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        handleOpenCharacterModal={handleOpenCharacterModal}
      />

      {loading ? (
        <LoadingState />
      ) : (
        <>
          {filteredCharacters.length === 0 ? (
            <EmptyState
              searchTerm={searchTerm}
              activeFilter={activeFilter}
            />
          ) : (
            <CharactersGrid
              characters={filteredCharacters}
              handleEditCharacter={handleEditCharacter}
              confirmDeleteCharacter={confirmDeleteCharacter}
              toggleFavorite={toggleFavorite}
              apiBaseUrl={import.meta.env.VITE_API_BASE_URL}
            />
          )}
        </>
      )}

      <CharacterModals
        showCharacterModal={showCharacterModal}
        handleCloseCharacterModal={handleCloseCharacterModal}
        handleSaveCharacter={handleSaveCharacter}
        currentCharacter={currentCharacter}
        isCollapsed={isCollapsed}
        showDeleteConfirm={showDeleteConfirm}
        setShowDeleteConfirm={setShowDeleteConfirm}
        handleDeleteCharacter={handleDeleteCharacter}
        characterToDelete={characterToDelete}
      />
    </div>
  )
}

export default Characters
