export const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^(\+\d{1,3})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
}

export const isValidEmail = (email) => {
  return email.trim() === '' || patterns.email.test(email)
}

export const isValidPhone = (phone) => {
  return phone.trim() === '' || patterns.phone.test(phone)
}

export const validateProfileData = (data) => {
  const isEmailValid = isValidEmail(data.email)
  const isPhoneValid = isValidPhone(data.phone)

  const errors = {
    phone:
      !isPhoneValid && data.phone.trim() !== ''
        ? 'Please enter a valid phone number'
        : '',
    email:
      !isEmailValid && data.email.trim() !== ''
        ? 'Please enter a valid email address'
        : '',
  }

  const isValid =
    data.first_name.trim() !== '' &&
    data.last_name.trim() !== '' &&
    data.email.trim() !== '' &&
    isEmailValid &&
    isPhoneValid

  return {
    isValid,
    errors,
  }
}
