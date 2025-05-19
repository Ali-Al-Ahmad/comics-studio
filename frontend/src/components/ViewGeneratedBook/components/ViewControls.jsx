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
      
    </div>
  )
}


export default ViewControls
