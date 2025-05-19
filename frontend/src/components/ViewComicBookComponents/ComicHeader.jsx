import { Icon } from '@iconify-icon/react'
import PropTypes from 'prop-types'
import './ComicHeader.css'

const ComicHeader = ({ user, onBack }) => {
  return (
    <div className='view-comic-header'>
      <div className='view-comic-navigation'>
        <button
          className='back-button'
          onClick={onBack}
        >
          <Icon
            icon='mdi:arrow-left'
            width='20'
            height='20'
          />
          All comics
        </button>
      </div>
      {user && (
        <div className='credits-display'>
          <span className='credits-value'>{user.credits || 50} Credits</span>
        </div>
      )}
    </div>
  )
}

ComicHeader.propTypes = {
  user: PropTypes.object,
  onBack: PropTypes.func.isRequired,
}

export default ComicHeader
