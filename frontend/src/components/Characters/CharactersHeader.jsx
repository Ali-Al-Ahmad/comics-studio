import { Icon } from '@iconify-icon/react'
import './CharactersHeader.css'

const CharactersHeader = ({ activeFilter, handleFilterClick, credits }) => {
  return (
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
  )
}

export default CharactersHeader
