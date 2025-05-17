import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@iconify-icon/react'
import { evaluatePasswordStrength } from '../../utils/passwordUtils'
import './PasswordStrength.css'

const PasswordStrength = ({ password, strengthState = null }) => {
  const actualStrengthState =
    strengthState || evaluatePasswordStrength(password)

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
        actualStrengthState.hasMinLength &&
        actualStrengthState.hasUpperCase &&
        actualStrengthState.hasLowerCase &&
        actualStrengthState.hasNumber &&
        actualStrengthState.hasSpecialChar
      ) {
        return 'Very Strong'
      }

      if (
        actualStrengthState.hasMinLength &&
        ((actualStrengthState.hasUpperCase &&
          actualStrengthState.hasLowerCase) ||
          (actualStrengthState.hasNumber && actualStrengthState.hasSpecialChar))
      ) {
        return 'Strong'
      }

      if (actualStrengthState.hasMinLength) {
        return 'Medium'
      }

      if (password.length > 3) {
        return 'Weak'
      }

      return 'Very Weak'
    }

    const getStrengthPercentage = () => {
      let score = 0
      if (actualStrengthState.hasMinLength) score += 20
      if (actualStrengthState.hasUpperCase) score += 20
      if (actualStrengthState.hasLowerCase) score += 20
      if (actualStrengthState.hasNumber) score += 20
      if (actualStrengthState.hasSpecialChar) score += 20
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
  }, [password, actualStrengthState])

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
          className={`requirement ${
            actualStrengthState.hasMinLength ? 'met' : ''
          }`}
        >
          <Icon
            icon={
              actualStrengthState.hasMinLength
                ? 'mdi:check-circle'
                : 'mdi:close-circle'
            }
            className='requirement-icon'
          />
          <span>At least 8 characters</span>
        </div>

        <div
          className={`requirement ${
            actualStrengthState.hasUpperCase ? 'met' : ''
          }`}
        >
          <Icon
            icon={
              actualStrengthState.hasUpperCase
                ? 'mdi:check-circle'
                : 'mdi:close-circle'
            }
            className='requirement-icon'
          />
          <span>Uppercase letter</span>
        </div>

        <div
          className={`requirement ${
            actualStrengthState.hasLowerCase ? 'met' : ''
          }`}
        >
          <Icon
            icon={
              actualStrengthState.hasLowerCase
                ? 'mdi:check-circle'
                : 'mdi:close-circle'
            }
            className='requirement-icon'
          />
          <span>Lowercase letter</span>
        </div>

        <div
          className={`requirement ${
            actualStrengthState.hasNumber ? 'met' : ''
          }`}
        >
          <Icon
            icon={
              actualStrengthState.hasNumber
                ? 'mdi:check-circle'
                : 'mdi:close-circle'
            }
            className='requirement-icon'
          />
          <span>Number</span>
        </div>

        <div
          className={`requirement ${
            actualStrengthState.hasSpecialChar ? 'met' : ''
          }`}
        >
          <Icon
            icon={
              actualStrengthState.hasSpecialChar
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
    hasMinLength: PropTypes.bool,
    hasUpperCase: PropTypes.bool,
    hasLowerCase: PropTypes.bool,
    hasNumber: PropTypes.bool,
    hasSpecialChar: PropTypes.bool,
    passwordsMatch: PropTypes.bool,
  }),
}

export default PasswordStrength
