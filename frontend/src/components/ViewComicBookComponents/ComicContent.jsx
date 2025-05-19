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
  return (
    <div className='view-comic-content'>
      <div className='book-header'>
        {comic.isUserOwnedBook && (
          <BookStatusIndicator isPublic={comic.is_public} />
        )}
      </div>
      <ViewGeneratedBook
        comic={comic}
        loading={loading}
        onChangeViewMode={onChangeViewMode}
        onEditPanel={onEditPanel}
        onRegeneratePanel={onRegeneratePanel}
        onCaptionChange={onCaptionChange}
        onPublishStatusChange={onPublishStatusChange}
        dispatch={dispatch}
        viewOnly={!comic.isUserOwnedBook}
      />
    </div>
  )
}


export default ComicContent
