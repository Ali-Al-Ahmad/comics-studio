import { useState } from 'react'
import { Icon } from '@iconify-icon/react'
import PropTypes from 'prop-types'
import Spinner from '../../../components/Spinner/Spinner'
import './CharacterSelector.css'

const CharacterSelector = ({
  characters,
  selectedCharacter,
  onCharacterSelect,
  loading,
  disabled,
}) => {
  const [characterSearchQuery, setCharacterSearchQuery] = useState('')

  return <div className='character-selection-container'></div>
}

export default CharacterSelector
