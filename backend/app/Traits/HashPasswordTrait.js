import bcrypt from 'bcrypt'

class HashPasswordTrait {
  static async hashPassword(pass) {
    try {
      const salt = await bcrypt.genSalt(8)
      const hashedPassword = await bcrypt.hash(pass, salt)
      return hashedPassword
    } catch (error) {
      throw error
    }
  }
}

export default HashPasswordTrait
