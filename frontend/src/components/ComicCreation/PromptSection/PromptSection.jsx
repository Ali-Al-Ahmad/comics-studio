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


    </div>
  )
}



export default PromptSection
