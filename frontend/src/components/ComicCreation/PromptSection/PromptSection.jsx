import PropTypes from 'prop-types'
import ComicForm from '../ComicForm/ComicForm'
import CharacterImageOptions from '../CharacterImageOptions/CharacterImageOptions'
import GenerateButton from '../GenerateButton/GenerateButton'
import './PromptSection.css'

const PromptSection = ({
  comic,
  loading,
  characters,
  selectedCharacter,
  loadingCharacters,
  uploadedImage,
  onPromptChange,
  onStyleChange,
  onCharacterSelect,
  setUploadedImage,
  onGenerate,
}) => {
  return (
    <div className='prompt-section'>
      <ComicForm
        comic={comic}
        loading={loading}
        onPromptChange={onPromptChange}
        onStyleChange={onStyleChange}
      />

      <CharacterImageOptions
        characters={characters}
        selectedCharacter={selectedCharacter}
        onCharacterSelect={onCharacterSelect}
        loadingCharacters={loadingCharacters}
        uploadedImage={uploadedImage}
        setUploadedImage={setUploadedImage}
        loading={loading}
        isGenerating={comic.isGenerating}
      />

      <GenerateButton
        loading={loading}
        isGenerating={comic.isGenerating}
        prompt={comic.prompt}
        onGenerate={onGenerate}
      />
    </div>
  )
}

PromptSection.propTypes = {
  comic: PropTypes.shape({
    prompt: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired,
    isGenerating: PropTypes.bool.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  characters: PropTypes.array.isRequired,
  selectedCharacter: PropTypes.object,
  loadingCharacters: PropTypes.bool.isRequired,
  uploadedImage: PropTypes.object,
  onPromptChange: PropTypes.func.isRequired,
  onStyleChange: PropTypes.func.isRequired,
  onCharacterSelect: PropTypes.func.isRequired,
  setUploadedImage: PropTypes.func.isRequired,
  onGenerate: PropTypes.func.isRequired,
}

export default PromptSection
