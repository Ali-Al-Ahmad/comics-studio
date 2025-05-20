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

    </div>
  )
}


export default CharacterSelector
