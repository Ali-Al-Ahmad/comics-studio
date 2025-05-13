import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

class HashPasswordTrait {
  static async hashPassword(pass) {
    try {
      const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS || 8))
      const hashedPassword = await bcrypt.hash(pass, salt)
      return hashedPassword
    } catch (error) {
      throw error
    }
  }
}

export default HashPasswordTrait
