import { useState } from 'react'
import PropTypes from 'prop-types'
import './ConfirmDialog.css'
import { Icon } from '@iconify-icon/react'
import { useSelector } from 'react-redux'

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger',
}) => {
  const { isCollapsed } = useSelector((state) => state.sidebar)

  if (!isOpen) return null

  const handleDialogClick = (e) => {
    e.stopPropagation()
  }

  let icon = 'mdi:alert'
  let iconColor = '#e74c3c'

  if (type === 'warning') {
    icon = 'mdi:alert-circle'
    iconColor = '#f39c12'
  } else if (type === 'info') {
    icon = 'mdi:information'
    iconColor = '#3498db'
  }

  return (
    <div
      className={`confirm-dialog-overlay ${
        isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
      }`}
      onClick={onClose}
    >
      <div
        className='confirm-dialog'
        onClick={handleDialogClick}
      >
        <div className='confirm-dialog-header'>
          <Icon
            icon={icon}
            width='32'
            height='32'
            color={iconColor}
            className='dialog-icon'
          />
          <h2>{title}</h2>
          <button
            className='close-button'
            onClick={onClose}
            aria-label='Close'
          >
            <Icon
              icon='mdi:close'
              width='24'
              height='24'
            />
          </button>
        </div>

        <div className='confirm-dialog-content'>
          <p>{message}</p>
        </div>

        <div className='confirm-dialog-actions'>
          <button
            className='cancel-button'
            onClick={onClose}
          >
            <Icon
              icon='mdi:close'
              width='16'
              height='16'
              style={{ marginRight: '6px' }}
            />
            {cancelText}
          </button>
          <button
            className={`confirm-button ${type}-button`}
            onClick={() => {
              onConfirm()
              onClose()
            }}
          >
            {type === 'danger' && (
              <Icon
                icon='mdi:trash-can'
                width='16'
                height='16'
                style={{ marginRight: '6px' }}
              />
            )}
            {type === 'warning' && (
              <Icon
                icon='mdi:alert'
                width='16'
                height='16'
                style={{ marginRight: '6px' }}
              />
            )}
            {type === 'info' && (
              <Icon
                icon='mdi:check'
                width='16'
                height='16'
                style={{ marginRight: '6px' }}
              />
            )}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

ConfirmDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  type: PropTypes.oneOf(['danger', 'warning', 'info']),
}

export default ConfirmDialog
