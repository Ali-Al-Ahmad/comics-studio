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

  return <div className='toast-container'></div>
}

export default Toast
