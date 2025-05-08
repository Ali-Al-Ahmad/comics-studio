import './Spinner.css'

const Spinner = ({ spinnerOnly = false }) => {
  return <div className={`spinner ${spinnerOnly ? 'spinner-only' : ''}`}></div>
}

export default Spinner
