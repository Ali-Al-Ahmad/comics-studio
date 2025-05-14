import './SearchBox.css'
import PropTypes from 'prop-types'

const SearchBox = ({ searchTerm, handleSearch }) => {
  return (
    <div className='search-container'>
      <input
        type='text'
        id='search'
        className='search-input'
        placeholder='Search by title or author...'
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  )
}

SearchBox.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
}

export default SearchBox
