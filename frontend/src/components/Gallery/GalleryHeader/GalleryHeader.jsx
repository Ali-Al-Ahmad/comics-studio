import './GalleryHeader.css'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const GalleryHeader = ({ activeFilter, handleFilterClick }) => {
  const user = useSelector((state) => state.user)
  const credits = user?.credits || 0

  return <div className='gallery-header-container'></div>
}

export default GalleryHeader
