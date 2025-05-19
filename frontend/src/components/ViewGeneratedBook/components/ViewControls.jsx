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
    <div
      className={`view-controls ${viewOnly ? 'view-only-controls' : ''}`}
    ></div>
  )
}

export default ViewControls
