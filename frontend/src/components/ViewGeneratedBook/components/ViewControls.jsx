import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@iconify-icon/react'
import Spinner from '../../Spinner/Spinner'
import './ViewControls.css'

const ViewControls = ({
  comic,
  viewOnly,
  loading,
  isPublished,
  publishLoading,
  onChangeViewMode,
  onDownloadComic,
  onDownloadPDF,
  onTogglePublish,
  onShareComic,
}) => {
  return (
    <div className={`view-controls ${viewOnly ? 'view-only-controls' : ''}`}>
      <div className='view-options'>
        <button
          className={`view-btn ${comic.viewMode === 'grid' ? 'active' : ''}`}
          onClick={() => onChangeViewMode('grid')}
        >
          <Icon
            icon='mdi:view-grid'
            width='20'
            height='20'
          />
          <span>Grid</span>
        </button>
        <button
          className={`view-btn ${comic.viewMode === 'book' ? 'active' : ''}`}
          onClick={() => onChangeViewMode('book')}
        >
          <Icon
            icon='mdi:book-open-page-variant'
            width='20'
            height='20'
          />
          <span>Book</span>
        </button>
      </div>
      <div className='action-buttons'>
        {comic.viewMode === 'book' && (
          <>
            <button
              className='save-comic-btn image-btn'
              onClick={onDownloadComic}
              disabled={loading || comic.panels.every((panel) => !panel.image)}
              title='Download as PNG image'
            >
              <Icon
                icon='mdi:image'
                width='20'
                height='20'
              />
              Image
            </button>
            <button
              className='save-comic-btn pdf-btn'
              onClick={onDownloadPDF}
              disabled={loading || comic.panels.every((panel) => !panel.image)}
              title='Download as PDF document'
            >
              <Icon
                icon='mdi:file-pdf-box'
                width='20'
                height='20'
              />
              PDF
            </button>
          </>
        )}
        {!viewOnly && comic.bookId && (
          <button
            className={`save-comic-btn ${
              isPublished ? 'unpublish-btn' : 'publish-btn'
            }`}
            onClick={onTogglePublish}
            disabled={publishLoading}
            title={isPublished ? 'Make private' : 'Publish to gallery'}
          >
            <Icon
              icon={isPublished ? 'mdi:eye-off' : 'mdi:eye'}
              width='20'
              height='20'
            />
            {publishLoading ? (
              <Spinner size='small' />
            ) : isPublished ? (
              'Unpublish'
            ) : (
              'Publish'
            )}
          </button>
        )}
        {!viewOnly && (
          <button
            className='share-comic-btn'
            onClick={onShareComic}
            title={
              comic.is_public
                ? 'Share your public comic'
                : 'Share your private comic (only you can view it)'
            }
          >
            <Icon
              icon='mdi:share-variant'
              width='20'
              height='20'
            />
            Share
          </button>
        )}
      </div>
    </div>
  )
}

ViewControls.propTypes = {
  comic: PropTypes.shape({
    viewMode: PropTypes.string.isRequired,
    panels: PropTypes.array.isRequired,
    bookId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    is_public: PropTypes.bool,
  }).isRequired,
  viewOnly: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  isPublished: PropTypes.bool.isRequired,
  publishLoading: PropTypes.bool.isRequired,
  onChangeViewMode: PropTypes.func.isRequired,
  onDownloadComic: PropTypes.func.isRequired,
  onDownloadPDF: PropTypes.func.isRequired,
  onTogglePublish: PropTypes.func.isRequired,
  onShareComic: PropTypes.func.isRequired,
}

export default ViewControls
