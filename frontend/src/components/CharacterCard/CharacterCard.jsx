import { useState } from 'react'
import PropTypes from 'prop-types'
import './CharacterCard.css'
import { Icon } from '@iconify-icon/react'

const CharacterCard = ({
  character,
  onEdit,
  onDelete,
  onFavorite,
  isFavorite = false,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    onEdit(character)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    onDelete(character)
  }
  const handleFavorite = (e) => {
    e.stopPropagation()
    onFavorite(character.id)
  }

  return (
    <div
      className='character-card'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onEdit(character)}
    >
      <div className='character-card-image-container'>
        {' '}
        <img
          src={character.image_url}
          alt={character.name}
          className='character-card-image'
          onError={(e) => {
            e.target.onerror = null
            e.target.src = `https://placehold.co/300x400/3498db/FFFFFF?text=${encodeURIComponent(
              character.name
            )}`
          }}
        />
        <div className='character-card-overlay-bottom'>
          <h3 className='character-card-name'>{character.name}</h3>
        </div>
        {isHovered && (
          <>
            {' '}
            <button
              className='character-card-favorite-btn'
              onClick={handleFavorite}
              aria-label={
                isFavorite ? 'Remove from favorites' : 'Add to favorites'
              }
            >
              {' '}
              <Icon
                icon={isFavorite ? 'mdi:star' : 'mdi:star-outline'}
                width='24'
                height='24'
                className={
                  isFavorite ? 'favorite-icon active' : 'favorite-icon'
                }
              />
            </button>
            <div className='character-card-actions'>
              <button
                className='character-card-action-btn edit-btn'
                onClick={handleEdit}
                aria-label='Edit'
              >
                <Icon
                  icon='mdi:pencil'
                  width='20'
                  height='20'
                />
              </button>

              <button
                className='character-card-action-btn delete-btn'
                onClick={handleDelete}
                aria-label='Delete'
              >
                <Icon
                  icon='mdi:delete'
                  width='20'
                  height='20'
                />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

CharacterCard.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    image_url: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool,
}

export default CharacterCard
