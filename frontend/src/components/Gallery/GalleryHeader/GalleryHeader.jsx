import './GalleryHeader.css'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

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
          All Projects
        </button>
        <button
          className={`filter-btn ${activeFilter === 'recent' ? 'active' : ''}`}
          onClick={() => handleFilterClick('recent')}
        >
          Recently Viewed
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
