import { useState, useEffect } from 'react'
import { Icon } from '@iconify-icon/react'
import PropTypes from 'prop-types'
import { validateProfileData } from '../../utils/formUtils'
import './ProfileDetails.css'

const ProfileDetails = ({ user, isLoading, onSubmit, originalData }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  })
  const [hasChanges, setHasChanges] = useState(false)
  const [formValid, setFormValid] = useState(true)
  const [validationErrors, setValidationErrors] = useState({
    phone: '',
    email: '',
  })

  useEffect(() => {
    if (user) {
      const userData = {
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
      }

      setFormData(userData)
      validateFormData(userData)
    }
  }, [user])

  const validateFormData = (data) => {
    const { isValid, errors } = validateProfileData(data)

    setValidationErrors(errors)
    setFormValid(isValid)
    return isValid
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value }

      const hasFormChanges =
        JSON.stringify(updatedFormData) !== JSON.stringify(originalData)
      setHasChanges(hasFormChanges)

      validateFormData(updatedFormData)
      return updatedFormData
    })
  }

  const getSaveButtonTitle = () => {
    if (!formValid) {
      if (validationErrors.phone) return validationErrors.phone
      if (validationErrors.email) return validationErrors.email
      return 'First name and last name cannot be empty'
    }
    if (!hasChanges) return 'No changes to save'
    return 'Save changes to your profile'
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formValid && hasChanges) {
      onSubmit(formData)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='profile-details-form'
    >
      <h3 className='form-section-title'>Account Details</h3>
      <div className='form-row'>
        <div className='form-group'>
          <label htmlFor='first_name'>
            First Name <span className='required-mark'>*</span>
          </label>
          <div className='input-container'>
            <Icon
              icon='mdi:user'
              className='input-icon'
            />
            <input
              type='text'
              id='first_name'
              name='first_name'
              value={formData.first_name}
              onChange={handleChange}
              placeholder='Enter your first name'
              required
              autoComplete='given-name'
            />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='last_name'>
            Last Name <span className='required-mark'>*</span>
          </label>
          <div className='input-container'>
            <Icon
              icon='mdi:user'
              className='input-icon'
            />
            <input
              type='text'
              id='last_name'
              name='last_name'
              value={formData.last_name}
              onChange={handleChange}
              placeholder='Enter your last name'
              required
              autoComplete='family-name'
            />
          </div>
        </div>
      </div>
      <div className='form-row'>
        <div className='form-group'>
          <label htmlFor='email'>
            Email <span className='required-mark'>*</span>
          </label>
          <div className='input-container disabled'>
            <Icon
              icon='mdi:email'
              className='input-icon'
            />
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              readOnly
              disabled
              placeholder='Your email address'
              autoComplete='email'
            />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='phone'>Phone</label>
          <div className='input-container'>
            <Icon
              icon='mdi:phone'
              className='input-icon'
            />
            <input
              type='tel'
              id='phone'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              placeholder='e.g., +1234567890'
              autoComplete='tel'
            />
          </div>
          {validationErrors.phone && (
            <div className='input-error-message'>{validationErrors.phone}</div>
          )}
        </div>
      </div>
      <button
        type='submit'
        className='button-primary form-submit-button'
        disabled={!hasChanges || !formValid || isLoading}
        title={getSaveButtonTitle()}
      >
        {isLoading ? (
          <>
            <span className='spinner-icon'></span> Saving...
          </>
        ) : (
          'Save Changes'
        )}
      </button>
    </form>
  )
}

ProfileDetails.propTypes = {
  user: PropTypes.object,
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  originalData: PropTypes.object,
}

export default ProfileDetails
