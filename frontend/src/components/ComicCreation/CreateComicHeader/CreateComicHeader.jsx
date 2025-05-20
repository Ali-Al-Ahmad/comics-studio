import PropTypes from 'prop-types'
import './CreateComicHeader.css'

const CreateComicHeader = ({ credits }) => {
  return (
    <div className='create-comic-header'>
      <h1>Create Comic</h1>
      <div className='credits-display'>
        <span className='credits-value'>{credits} Credits</span>
      </div>
    </div>
  )
}

CreateComicHeader.propTypes = {
  credits: PropTypes.number.isRequired,
}

export default CreateComicHeader
