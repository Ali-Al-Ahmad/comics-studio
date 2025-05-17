import Spinner from '../Spinner/Spinner'
import './LoadingState.css'

const LoadingState = () => {
  return (
    <div className='characters-loading'>
      <Spinner />
      <p>Loading characters...</p>
    </div>
  )
}

export default LoadingState
