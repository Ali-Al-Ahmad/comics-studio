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

  static async login(req) {
    try {
      const { password, email } = req.body

      const user = await User.findOne({ where: { email } })

      if (!user) {
        return this.return(false, 'Wrong email or password')
      }

      const passwordMatch = await bcrypt.compare(password, user.password)

      if (!passwordMatch) {
        return this.return(false, 'Wrong email or password')
      }

      const token = createToken(user.id)

      return this.return(true, 'User Login successfully', { token })
    } catch (error) {
      return this.return(false, 'Error login user', error)
    }
  }
}
