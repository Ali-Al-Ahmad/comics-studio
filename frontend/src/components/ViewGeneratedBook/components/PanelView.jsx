import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@iconify-icon/react'
import './PanelView.css'

const PanelView = ({
  panel,
  index,
  viewMode,
  loading,
  viewOnly,
  onEditPanel,
  setRef,
}) => {
  return (
    <div
      className='book-page'
      ref={(el) => setRef(index + 1, el)}
    ></div>
  )
}

export default PanelView
