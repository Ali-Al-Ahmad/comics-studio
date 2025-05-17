import { useState } from 'react'
import { Icon } from '@iconify-icon/react'
import PropTypes from 'prop-types'
import PasswordStrength from '../PasswordStrength/PasswordStrength'
import {
  evaluatePasswordStrength,
  isStrongPassword,
} from '../../utils/passwordUtils'
import './PasswordChangeForm.css'

const PasswordChangeForm = ({ isLoading, onSubmit }) => {
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_new_password: '',
  })
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordsValid, setPasswordsValid] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    passwordsMatch: false,
  })

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => {
      const updatedData = { ...prev, [name]: value }

      const strengthState = evaluatePasswordStrength(updatedData.new_password)

      const passwordsMatch =
        updatedData.new_password === updatedData.confirm_new_password

      const updatedStrengthState = {
        ...strengthState,
        passwordsMatch,
      }

      setPasswordStrength(updatedStrengthState)

      const isValid =
        updatedData.current_password?.trim() !== '' &&
        updatedData.new_password?.trim() !== '' &&
        updatedData.confirm_new_password?.trim() !== '' &&
        passwordsMatch &&
        isStrongPassword(strengthState)

      setPasswordsValid(isValid)
      return updatedData
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (passwordsValid) {
      onSubmit(passwordData)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='password-change-form'
    >
      <div className='form-group full-width-group'>
        <label htmlFor='current_password'>
          Current Password <span className='required-mark'>*</span>
        </label>
        <div className='input-container'>
          <Icon
            icon='mdi:lock'
            className='input-icon'
          />
          <input
            type={showCurrentPassword ? 'text' : 'password'}
            id='current_password'
            name='current_password'
            value={passwordData.current_password}
            onChange={handlePasswordChange}
            placeholder='Enter your current password'
            required
            autoComplete='current-password'
          />
          <button
            type='button'
            className='toggle-password-btn'
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            <Icon
              icon={showCurrentPassword ? 'mdi:eye-off' : 'mdi:eye'}
              style={{ fontSize: '24px' }}
            />
          </button>
        </div>
      </div>
      <div className='form-row'>
        <div className='form-group'>
          <label htmlFor='new_password'>
            New Password <span className='required-mark'>*</span>
          </label>
          <div className='input-container'>
            <Icon
              icon='mdi:lock'
              className='input-icon'
            />
            <input
              type={showNewPassword ? 'text' : 'password'}
              id='new_password'
              name='new_password'
              value={passwordData.new_password}
              onChange={handlePasswordChange}
              placeholder='Enter new password'
              required
              autoComplete='new-password'
            />
            <button
              type='button'
              className='toggle-password-btn'
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              <Icon
                icon={showNewPassword ? 'mdi:eye-off' : 'mdi:eye'}
                style={{ fontSize: '24px' }}
              />
            </button>
          </div>
          <PasswordStrength
            password={passwordData.new_password}
            strengthState={passwordStrength}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='confirm_new_password'>
            Confirm New Password <span className='required-mark'>*</span>
          </label>
          <div className='input-container'>
            <Icon
              icon='mdi:lock'
              className='input-icon'
            />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id='confirm_new_password'
              name='confirm_new_password'
              value={passwordData.confirm_new_password}
              onChange={handlePasswordChange}
              placeholder='Confirm new password'
              required
              autoComplete='new-password'
            />
            <button
              type='button'
              className='toggle-password-btn'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Icon
                icon={showConfirmPassword ? 'mdi:eye-off' : 'mdi:eye'}
                style={{ fontSize: '24px' }}
              />
            </button>
          </div>
          {passwordData.confirm_new_password &&
            !passwordStrength.passwordsMatch && (
              <div className='input-error-message'>Passwords do not match</div>
            )}
        </div>
      </div>
      <button
        type='submit'
        className='button-primary form-submit-button'
        disabled={!passwordsValid || isLoading}
      >
        {isLoading ? (
          <>
            <span className='spinner-icon'></span> Updating...
          </>
        ) : (
          'Update Password'
        )}
      </button>
    </form>
  )
}

PasswordChangeForm.propTypes = {
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
}

export default PasswordChangeForm
