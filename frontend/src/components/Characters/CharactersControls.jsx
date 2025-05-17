import { Icon } from '@iconify-icon/react'
import './CharactersControls.css'

const CharactersControls = ({
  searchTerm,
  handleSearch,
  handleOpenCharacterModal,
}) => {
  return (
    <div className='characters-controls'>
      <div className='search-container'>
        <input
          type='text'
          placeholder='Search characters...'
          value={searchTerm}
          onChange={handleSearch}
          className='search-input'
        />
      </div>
      <button
        onClick={handleOpenCharacterModal}
        className='create-character-btn'
      >
        <Icon
          icon='mdi:plus'
          width='20'
          height='20'
          className='create-icon'
        />
        <span className='create-text'>Create Character</span>
      </button>
    </div>
  )
}

export default CharactersControls
