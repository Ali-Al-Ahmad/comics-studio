import PropTypes from 'prop-types'
import { Icon } from '@iconify-icon/react'
import './BookStatusIndicator.css'

const BookStatusIndicator = ({ isPublic }) => {
  return (
    <div className='book-status-indicator'>
      <Icon
        icon={isPublic ? 'mdi:eye' : 'mdi:eye-off'}
        width='18'
        height='18'
      />
      <span>{isPublic ? 'Public' : 'Private'}</span>
    </div>
  )
}

BookStatusIndicator.propTypes = {
  isPublic: PropTypes.bool.isRequired,
}

export default BookStatusIndicator
