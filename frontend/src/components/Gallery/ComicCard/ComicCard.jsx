import './ComicCard.css'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addToRecentlyViewed } from '../../../redux/slices/recentlyViewedSlice'
import { Icon } from '@iconify-icon/react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ComicCard = ({
  comic,
  onEdit,
  onDelete,
  isUserComic = false,
  current = false,
}) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  const userDisplayName = comic.user
    ? `${comic.user.first_name} ${comic.user.last_name}`
    : current
    ? user.first_name + ' ' + user.last_name
    : 'Anonymous'
  const fallbackImageDataURI =
    'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22400%22%20viewBox%3D%220%200%20300%20400%22%3E%3Crect%20fill%3D%22%23e9e9e9%22%20width%3D%22300%22%20height%3D%22400%22%2F%3E%3Ctext%20fill%3D%22%23666666%22%20font-family%3D%22sans-serif%22%20font-size%3D%2224%22%20text-anchor%3D%22middle%22%20x%3D%22150%22%20y%3D%22200%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fsvg%3E'
  
  const getImageSrc = (imageUrl, fallbackImage) => {
    if (!imageUrl) {
      return fallbackImage
    }
    return imageUrl.startsWith('p')
      ? `${import.meta.env.VITE_API_BASE_URL}/${imageUrl}`
      : imageUrl
  }

  const handleCardClick = () => {
    if (comic.id) {
      console.log('Adding comic to recently viewed:', comic.id, comic.title)
      dispatch(addToRecentlyViewed(comic.id))
      // Navigate to the view comic page when card is clicked
      navigate(`/comic/${comic.id}`)
    } else {
      console.warn('Comic clicked has no ID:', comic)
    }
  }

  const handleCardKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleCardClick()
    }
  }

  const handleEditClick = (e) => {
    if (onEdit) {
      e.stopPropagation()
      onEdit(comic)
    }
  }

  const handleDeleteClick = (e) => {
    if (onDelete) {
      e.stopPropagation()
      onDelete(comic)
    }
  }

  const handleViewClick = (e) => {
    e.stopPropagation()
    handleCardClick()
  }

  return (
    <div
      className={`comic-card-component ${isUserComic ? 'user-comic' : ''}`}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyPress}
      tabIndex='0'
      aria-label={`View comic: ${comic.title}`}
    >
      {isUserComic && (
        <div className='comic-actions'>
          <button
            className='action-btn view-btn'
            onClick={handleViewClick}
            aria-label='View comic'
          >
            <Icon
              icon='mdi:eye'
              width='20'
              height='20'
            />
          </button>
          {onEdit && (
            <button
              className='action-btn edit-btn'
              onClick={handleEditClick}
              aria-label='Edit comic'
            >
              <Icon
                icon='mdi:pencil'
                width='20'
                height='20'
              />
            </button>
          )}
          {onDelete && (
            <button
              className='action-btn delete-btn'
              onClick={handleDeleteClick}
              aria-label='Delete comic'
            >
              <Icon
                icon='mdi:delete'
                width='20'
                height='20'
              />
            </button>
          )}
        </div>
      )}
      <div className='comic-image'>
        <img
          src={getImageSrc(comic.image_url, fallbackImageDataURI)}
          alt={comic.title}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = fallbackImageDataURI
          }}
        />
      </div>
      <div className='comic-details'>
        <div>
          <h3 title={comic.title}>{comic.title}</h3>
          <p className='comic-author'>{userDisplayName}</p>
        </div>
        <div className='comic-meta'>
          <span className='comic-date'>
            {new Date(comic.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  )
}

ComicCard.propTypes = {
  comic: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    image_url: PropTypes.string,
    updatedAt: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      email: PropTypes.string,
    }),
  }).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  isUserComic: PropTypes.bool,
  current: PropTypes.bool,
}

ComicCard.defaultProps = {
  onEdit: null,
  onDelete: null,
  isUserComic: false,
  current: false,
}

export default ComicCard