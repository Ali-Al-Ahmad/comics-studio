import { useState } from 'react'
import { Icon } from '@iconify-icon/react'
import PropTypes from 'prop-types'
import Spinner from '../../../components/Spinner/Spinner'
import './CharacterSelector.css'

const CharacterSelector = ({
  characters,
  selectedCharacter,
  onCharacterSelect,
  loading,
  disabled,
}) => {
  const [characterSearchQuery, setCharacterSearchQuery] = useState('')

  const filteredCharacters =
    characterSearchQuery.trim() === ''
      ? characters
      : characters.filter((character) =>
          character.name
            .toLowerCase()
            .includes(characterSearchQuery.toLowerCase())
        )

  const handleCharacterSearch = (e) => {
    setCharacterSearchQuery(e.target.value)
  }

  return (
    <div className='character-selection-container'>
      <h3>Use a character (optional):</h3>
      <div className='character-search-box'>
        <Icon
          icon='mdi:magnify'
          width='20'
          height='20'
        />
        <input
          type='text'
          placeholder='Search characters...'
          value={characterSearchQuery}
          onChange={handleCharacterSearch}
          disabled={disabled}
        />
        {characterSearchQuery && (
          <button
            className='clear-search-btn'
            onClick={() => setCharacterSearchQuery('')}
          >
            <Icon
              icon='mdi:close'
              width='16'
              height='16'
            />
          </button>
        )}
      </div>
      <div className='characters-list'>
        {loading ? (
          <div className='characters-loading'>
            <Spinner size='small' />
            <p>Loading characters...</p>
          </div>
        ) : characters.length === 0 ? (
          <p className='no-characters'>
            No characters found. Create characters in the Characters section.
          </p>
        ) : filteredCharacters.length === 0 ? (
          <p className='no-characters'>No characters match your search.</p>
        ) : (
          <div className='character-cards'>
            {filteredCharacters.map((character) => (
              <div
                key={character.id}
                className={`character-select-card ${
                  selectedCharacter?.id === character.id ? 'selected' : ''
                }`}
                onClick={() => onCharacterSelect(character)}
              >
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}/${
                    character.image_url
                  }`}
                  alt={character.name}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src =
                      'https://variety.com/wp-content/uploads/2023/07/radcliffe-harry-potter-2.jpg'
                  }}
                />
                <p>{character.name}</p>
                {selectedCharacter?.id === character.id && (
                  <div className='character-selected-indicator'>
                    <Icon
                      icon='mdi:check-circle'
                      width='24'
                      height='24'
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedCharacter && (
        <div className='selected-character-info'>
          Using character: <strong>{selectedCharacter.name}</strong>
          <button
            className='clear-character-btn'
            onClick={() => onCharacterSelect(null)}
          >
            <Icon
              icon='mdi:close'
              width='16'
              height='16'
            />
          </button>
        </div>
      )}
    </div>
  )
}

CharacterSelector.propTypes = {
  characters: PropTypes.array.isRequired,
  selectedCharacter: PropTypes.object,
  onCharacterSelect: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
}

export default CharacterSelector
