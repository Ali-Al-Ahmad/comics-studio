import './GalleryHeader.css'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Icon } from '@iconify-icon/react'

const GalleryHeader = ({ activeFilter, handleFilterClick }) => {
  const user = useSelector((state) => state.user)
  const credits = user?.credits || 0

  return (
    <div className='gallery-header-container'>
      <div className='filter-buttons'>
        <button
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => handleFilterClick('all')}
        >
          {' '}
          <Icon
            icon='mdi:view-grid'
            width='18'
            height='18'
            className='filter-btn-icon'
          />
          <span className='filter-btn-text'>All Projects</span>
        </button>
        <button
          className={`filter-btn ${activeFilter === 'recent' ? 'active' : ''}`}
          onClick={() => handleFilterClick('recent')}
        >
          {' '}
          <Icon
            icon='mdi:history'
            width='18'
            height='18'
            className='filter-btn-icon'
          />
          <span className='filter-btn-text'>Recently Viewed</span>
        </button>
      </div>

      <div className='credits-display'>
        <span className='credits-value'>{credits} Credits</span>
      </div>
    </div>
  )
}

GalleryHeader.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  handleFilterClick: PropTypes.func.isRequired,
}

export default GalleryHeader
