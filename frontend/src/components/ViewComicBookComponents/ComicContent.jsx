import PropTypes from 'prop-types'
import ViewGeneratedBook from '../ViewGeneratedBook/ViewGeneratedBook'
import BookStatusIndicator from './BookStatusIndicator'
import './ComicContent.css'

const ComicContent = ({
  comic,
  loading,
  onChangeViewMode,
  onEditPanel,
  onRegeneratePanel,
  onCaptionChange,
  onPublishStatusChange,
  dispatch,
}) => {
  return <div className='view-comic-content'></div>
}

export default ComicContent
