import { User } from '../Models/index.js'
import Service from './Service.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  })
}

export default class AuthService extends Service {
  static async register(req) {
    try {
      const { password } = req.body

      const hashedPassword = await AuthService.hashPassword(password)

      const savedUser = await User.create({
        ...req.body,
        password: hashedPassword,
      })

      const token = createToken(savedUser.id)

      return this.return(true, 'User registered successfully', { token })
    } catch (error) {
      return this.return(false, 'Error registering user', error)
    }
  }
}
