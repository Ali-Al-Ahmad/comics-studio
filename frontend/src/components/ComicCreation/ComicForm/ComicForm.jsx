import PropTypes from 'prop-types'
import './ComicForm.css'

const ComicForm = ({ comic, loading, onPromptChange, onStyleChange }) => {
  const styles = [
    { value: 'No style', label: '(No style)' },
    { value: 'Japanese Anime', label: 'Japanese Anime' },
    { value: 'Cinematic', label: 'Cinematic' },
    { value: 'Disney Character', label: 'Disney Character' },
    { value: 'Photographic', label: 'Photographic' },
    { value: 'Comic book', label: 'Comic book' },
    { value: 'Line art', label: 'Line art' },
  ]

  return (
    <div className='prompt-input-container'>

    </div>
  )
}


export default ComicForm
