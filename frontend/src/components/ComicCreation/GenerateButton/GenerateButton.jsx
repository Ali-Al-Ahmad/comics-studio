import { Icon } from '@iconify-icon/react'
import PropTypes from 'prop-types'
import Spinner from '../../../components/Spinner/Spinner'
import './GenerateButton.css'

const GenerateButton = ({ loading, isGenerating, prompt, onGenerate }) => {
  return (
    <div className='generate-btn-container'>
      <button
        className='generate-btn'
        onClick={onGenerate}
        disabled={loading || isGenerating || !prompt.trim()}
      >

      </button>
    </div>
  )
}



export default GenerateButton
