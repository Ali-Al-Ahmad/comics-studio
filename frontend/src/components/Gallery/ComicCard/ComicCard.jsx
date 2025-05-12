import './ComicCard.css'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addToRecentlyViewed } from '../../../redux/slices/recentlyViewedSlice'

const ComicCard = ({ comic }) => {


  return (
    <div
      className='comic-card-component'
      onClick={handleCardClick}
      onKeyDown={handleCardKeyPress}
      tabIndex='0'
      role='button'
      aria-label={`View comic: ${comic.title}`}
    ></div>
  )
}

export default ComicCard
