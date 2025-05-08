import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { hideToast } from '../../redux/slices/toastSlice'
import './Toast.css'
import SuccessIcon from '../../assets/icons/circle-check-solid.svg'
import ErrorIcon from '../../assets/icons/circle-xmark-solid.svg'
import InfoIcon from '../../assets/icons/circle-info-solid.svg'

const Toast = () => {
  const { show, type, message } = useSelector((state) => state.toast)
  const dispatch = useDispatch()

  useEffect(() => {
    let timer
    if (show) {
      timer = setTimeout(() => {
        dispatch(hideToast())
      }, 4000)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [show, dispatch])

  if (!show) return null

  const handleClose = () => {
    dispatch(hideToast())
  }

  const getToastIcon = () => {
    switch (type) {
      case 'success':
        return SuccessIcon
      case 'error':
        return ErrorIcon
      default:
        return InfoIcon
    }
  }

  return (
    <div className='toast-container'>
      <div className={`toast ${type}`}>
        <div className='toast-icon-container'>
          <i className='toast-icon'>
            <img
              src={getToastIcon()}
              alt={`${type} icon`}
            />
          </i>
        </div>
        <div className='toast-content'>
          <p className='toast-title'>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </p>
          <p className='toast-message'>{message}</p>
        </div>
        <button
          className='toast-close-btn'
          onClick={handleClose}
          aria-label='Close toast'
        >
          &times;
        </button>
      </div>
    </div>
  )
}

export default Toast
