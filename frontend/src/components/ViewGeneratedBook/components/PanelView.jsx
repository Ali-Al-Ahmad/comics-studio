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
  if (viewMode === 'grid') {
    return (
      <div
        className='comic-panel'
        ref={(el) => setRef(index, el)}
      >
        <div className='panel-number'>{index + 1}</div>
        {panel.image ? (
          <div className='panel-image-container'>
            <img
              src={panel.image}
              alt={`Panel ${index + 1}`}
            />
            {!viewOnly && (
              <div className='panel-overlay'>
                <button
                  className='edit-panel-btn'
                  onClick={() => onEditPanel(index)}
                >
                  <Icon
                    icon='mdi:pencil'
                    width='20'
                    height='20'
                  />
                </button>
              </div>
            )}
            {panel.caption && (
              <div className='panel-caption'>{panel.caption}</div>
            )}
          </div>
        ) : (
          <div className='empty-panel'>
            <Icon
              icon='mdi:image'
              width='48'
              height='48'
            />
            <p>{loading ? 'Generating...' : 'No Image Yet'}</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className='book-page'
      ref={(el) => setRef(index + 1, el)}
    >


    </div>
  )
}



export default PanelView
