import { useCallback } from 'react'
import CharacterSelector from '../CharacterSelector/CharacterSelector'
import ImageUploader from '../ImageUploader/ImageUploader'
import './CharacterImageOptions.css'
import PropTypes from 'prop-types'

const CharacterImageOptions = ({
  characters,
  selectedCharacter,
  onCharacterSelect,
  loadingCharacters,
  uploadedImage,
  setUploadedImage,
  loading,
  isGenerating,
}) => {
  const handleImageUpload = useCallback(
    (file) => {
      if (selectedCharacter) {
        onCharacterSelect(null)
      }
      setUploadedImage(file)
    },
    [selectedCharacter, onCharacterSelect, setUploadedImage]
  )

  return (
    <div className='character-image-options-container'>


    </div>
  )
}

export default CharacterImageOptions
