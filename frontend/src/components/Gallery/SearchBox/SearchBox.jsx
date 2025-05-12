import './SearchBox.css'
import PropTypes from 'prop-types'

const SearchBox = ({ searchTerm, handleSearch }) => {
  return (
    <div className='search-container'>
      <label htmlFor='search'>Search Comics:</label>{' '}
      <input
        type='text'
        id='search'
        placeholder='Search by title or author...'
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  )
}

export default SearchBox
