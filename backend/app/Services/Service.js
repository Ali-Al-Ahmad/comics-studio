import HashPasswordTrait from '../Traits/HashPasswordTrait.js'

export default class Service {
  static return(success, message, data = null) {
    return {
      success,
      message,
      data,
    }
  }

  static handleError(error, message) {
    console.error(`Service error: ${message}`, error)
    throw error
  }

  static async hashPassword(password) {
    try {
      return await HashPasswordTrait.hashPassword(password)
    } catch (error) {
      this.handleError(error, 'Error hashing password')
    }
  }
}
