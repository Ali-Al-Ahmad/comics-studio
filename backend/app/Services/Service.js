import bcrypt from 'bcrypt'

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
      const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS))
      const hashedPassword = await bcrypt.hash(password, salt)
      return hashedPassword
    } catch (error) {
      throw error
    }
  }
}
