import bcrypt from 'bcrypt'
import HashPasswordTrait from '../Traits/HashPasswordTrait.js'

export default class Service {
  static return(success, message, data = null) {
    return {
      success,
      message,
      data,
    }
  }

  static async hashPassword(password) {
    try {
      return await HashPasswordTrait.hashPassword(password)
    } catch (error) {
      throw error
    }
  }
}
