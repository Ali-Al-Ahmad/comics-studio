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
      <CharacterSelector
        characters={characters}
        selectedCharacter={selectedCharacter}
        onCharacterSelect={onCharacterSelect}
        loading={loadingCharacters}
        disabled={loading || isGenerating || !!uploadedImage}
      />
      <ImageUploader
        uploadedImage={uploadedImage}
        setUploadedImage={handleImageUpload}
        disabled={loading || isGenerating || !!selectedCharacter}
      />{' '}
    </div>
  )
}

CharacterImageOptions.propTypes = {
  characters: PropTypes.array.isRequired,
  selectedCharacter: PropTypes.object,
  onCharacterSelect: PropTypes.func.isRequired,
  loadingCharacters: PropTypes.bool.isRequired,
  uploadedImage: PropTypes.object,
  setUploadedImage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  isGenerating: PropTypes.bool.isRequired,
}

export default CharacterImageOptions
