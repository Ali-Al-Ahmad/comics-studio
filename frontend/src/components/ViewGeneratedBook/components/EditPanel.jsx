import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@iconify-icon/react'
import Spinner from '../../Spinner/Spinner'
import './EditPanel.css'

const EditPanel = ({
  panel,
  panelIndex,
  loading,
  onCancelEdit,
  onRegeneratePanel,
  onCaptionChange,
}) => {
  return (
    <div className='edit-panel-container'>
      <div className='edit-panel-header'>
        <h3>Editing Panel {panelIndex + 1}</h3>
        <button
          className='cancel-edit-btn'
          onClick={onCancelEdit}
        >
          <Icon
            icon='mdi:close'
            width='20'
            height='20'
          />
        </button>
      </div>
      <div className='edit-panel-content'>
        <div className='edit-panel-image'>
          {panel.image ? (
            <img
              src={panel.image}
              alt={`Panel ${panelIndex + 1}`}
            />
          ) : (
            <div className='empty-panel'>
              <Icon
                icon='mdi:image'
                width='48'
                height='48'
              />
              <p>No Image Yet</p>
            </div>
          )}
          <button
            className='regenerate-panel-btn'
            onClick={() => onRegeneratePanel(panelIndex)}
            disabled={loading || !panel.prompt}
          >
            <Icon
              icon='mdi:refresh'
              width='20'
              height='20'
            />
            Regenerate Panel
          </button>
        </div>
        <div className='edit-panel-caption'>
          <h4>Panel Caption</h4>
          <textarea
            value={panel.caption || ''}
            onChange={(e) => onCaptionChange(panelIndex, e.target.value)}
            placeholder='Enter a caption for this panel...'
            rows={3}
          />
        </div>
      </div>
    </div>
  )
}



export default EditPanel
