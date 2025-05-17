import { useState } from 'react'

export const useFormState = (initialState, validateFn) => {
  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(true)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value }

      if (validateFn) {
        const validationResult = validateFn(updatedData)
        setErrors(validationResult.errors || {})
        setIsValid(validationResult.isValid)
      }

      return updatedData
    })
  }

  const resetForm = () => {
    setFormData(initialState)
    setErrors({})
    setIsValid(true)
  }

  const setFormValues = (values) => {
    setFormData(values)

    if (validateFn) {
      const validationResult = validateFn(values)
      setErrors(validationResult.errors || {})
      setIsValid(validationResult.isValid)
    }
  }

  return {
    formData,
    errors,
    isValid,
    handleChange,
    resetForm,
    setFormValues,
  }
}
