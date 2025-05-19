import './GalleryControls.css'
import SearchBox from '../SearchBox/SearchBox'

const GalleryControls = ({ searchTerm, handleSearch }) => {
  return (
    <div className='gallery-controls'>
      <SearchBox
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />
    </div>
  )
}

import PropTypes from 'prop-types'

GalleryControls.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
}

export default GalleryControls
