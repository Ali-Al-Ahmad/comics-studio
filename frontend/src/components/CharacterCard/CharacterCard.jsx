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
    ></div>
  )
}

export default CharacterCard
