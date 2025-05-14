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
    ></div>
  )
}

export default ConfirmDialog
