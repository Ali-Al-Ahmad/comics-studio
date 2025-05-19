import PropTypes from 'prop-types'
import Spinner from '../Spinner/Spinner'
import './LoadingState.css'

const LoadingState = ({ message }) => {
  return (
    <div className='comic-loading'>
      <Spinner size='large' />
      <p>{message || 'Loading comic book...'}</p>
    </div>
  )
}

export default LoadingState
