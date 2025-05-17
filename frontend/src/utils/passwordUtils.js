export const evaluatePasswordStrength = (password) => {
  if (!password) {
    return {
      hasMinLength: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasNumber: false,
      hasSpecialChar: false,
    }
  }

  return {
    hasMinLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }
}

export const isStrongPassword = (strengthState) => {
  return (
    strengthState.hasMinLength &&
    strengthState.hasUpperCase &&
    strengthState.hasLowerCase &&
    strengthState.hasNumber &&
    strengthState.hasSpecialChar
  )
}
