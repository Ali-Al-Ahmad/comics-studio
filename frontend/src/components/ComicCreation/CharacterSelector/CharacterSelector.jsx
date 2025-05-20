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
          
      </div>
    </div>
  )
}


export default CharacterSelector
