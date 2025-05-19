import './CreditsDisplay.css'
import { useSelector } from 'react-redux'

const CreditsDisplay = () => {
  const user = useSelector((state) => state.user)
  const credits = user?.credits || 0

  return (
    <div className='credits-display'>
      <span className='credits-value'>{credits} Credits</span>
    </div>
  )
}

export default CreditsDisplay
