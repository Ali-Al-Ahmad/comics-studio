import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@iconify-icon/react'
import './PasswordStrength.css'

const PasswordStrength = ({ password, strengthState }) => {
  const { strengthLabel, strengthPercentage, strengthColor } = useMemo(() => {
    if (!password) {
      return {
        strengthLabel: '',
        strengthPercentage: 0,
        strengthColor: '',
      }
    }

    const getStrengthLabel = () => {
      if (
        strengthState.hasMinLength &&
        strengthState.hasUpperCase &&
        strengthState.hasLowerCase &&
        strengthState.hasNumber &&
        strengthState.hasSpecialChar
      )
        return 'Very Strong'
      if (
        strengthState.hasMinLength &&
        ((strengthState.hasUpperCase && strengthState.hasLowerCase) ||
          (strengthState.hasNumber && strengthState.hasSpecialChar))
      )
        return 'Strong'
      if (strengthState.hasMinLength) return 'Medium'
      if (password.length > 3) return 'Weak'
      return 'Very Weak'
    }

    const getStrengthPercentage = () => {
      let score = 0
      if (strengthState.hasMinLength) score += 20
      if (strengthState.hasUpperCase) score += 20
      if (strengthState.hasLowerCase) score += 20
      if (strengthState.hasNumber) score += 20
      if (strengthState.hasSpecialChar) score += 20
      return score
    }

    const getStrengthColor = () => {
      const percentage = getStrengthPercentage()
      if (percentage <= 20) return '#ff4d4f'
      if (percentage <= 40) return '#faad14'
      if (percentage <= 60) return '#fadb14'
      if (percentage <= 80) return '#52c41a'
      return '#389e0d'
    }

    return {
      strengthLabel: getStrengthLabel(),
      strengthPercentage: getStrengthPercentage(),
      strengthColor: getStrengthColor(),
    }
  }, [password, strengthState])

  if (!password) {
    return null
  }

  return (
    <div className='password-strength-container'>
      <div className='password-strength-header'>
        <span>Password Strength</span>
        <span>{strengthLabel}</span>
      </div>

      <div className='password-strength-meter'>
        <div
          className='password-strength-meter-fill'
          style={{
            width: `${strengthPercentage}%`,
            backgroundColor: strengthColor,
          }}
        ></div>
      </div>

      <div className='password-strength-requirements'>
        <div
          className={`requirement ${strengthState.hasMinLength ? 'met' : ''}`}
        >
          <Icon
            icon={
              strengthState.hasMinLength
                ? 'mdi:check-circle'
                : 'mdi:close-circle'
            }
            className='requirement-icon'
          />
          <span>At least 8 characters</span>
        </div>

        <div
          className={`requirement ${strengthState.hasUpperCase ? 'met' : ''}`}
        >
          <Icon
            icon={
              strengthState.hasUpperCase
                ? 'mdi:check-circle'
                : 'mdi:close-circle'
            }
            className='requirement-icon'
          />
          <span>Uppercase letter</span>
        </div>

        <div
          className={`requirement ${strengthState.hasLowerCase ? 'met' : ''}`}
        >
          <Icon
            icon={
              strengthState.hasLowerCase
                ? 'mdi:check-circle'
                : 'mdi:close-circle'
            }
            className='requirement-icon'
          />
          <span>Lowercase letter</span>
        </div>

        <div className={`requirement ${strengthState.hasNumber ? 'met' : ''}`}>
          <Icon
            icon={
              strengthState.hasNumber ? 'mdi:check-circle' : 'mdi:close-circle'
            }
            className='requirement-icon'
          />
          <span>Number</span>
        </div>

        <div
          className={`requirement ${strengthState.hasSpecialChar ? 'met' : ''}`}
        >
          <Icon
            icon={
              strengthState.hasSpecialChar
                ? 'mdi:check-circle'
                : 'mdi:close-circle'
            }
            className='requirement-icon'
          />
          <span>Special character</span>
        </div>
      </div>
    </div>
  )
}

PasswordStrength.propTypes = {
  password: PropTypes.string,
  strengthState: PropTypes.shape({
    hasMinLength: PropTypes.bool.isRequired,
    hasUpperCase: PropTypes.bool.isRequired,
    hasLowerCase: PropTypes.bool.isRequired,
    hasNumber: PropTypes.bool.isRequired,
    hasSpecialChar: PropTypes.bool.isRequired,
    passwordsMatch: PropTypes.bool,
  }).isRequired,
}

export default PasswordStrength
