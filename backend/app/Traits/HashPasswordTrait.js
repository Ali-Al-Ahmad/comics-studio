import bcrypt from 'bcrypt'

class HashPasswordTrait {
  static async hashPassword(pass) {
    try {
      const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS))
      const hashedPassword = await bcrypt.hash(password, salt)
      return hashedPassword
    } catch (error) {
      throw error
    }
  }
}

export default HashPasswordTrait
