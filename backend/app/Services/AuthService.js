import { User, Admin } from '../Models/index.js'
import Service from './Service.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import dotenv from 'dotenv'
dotenv.config()

const createToken = (data, isAdmin) => {
  return jwt.sign({ ...data, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  })
}

export default class AuthService extends Service {
  static async register(req, isAdmin = false) {
    try {
      const { password } = req.body

      const hashedPassword = await AuthService.hashPassword(password)

      let savedUser
      if (isAdmin) {
        savedUser = await Admin.create({
          ...req.body,
          password: hashedPassword,
        })
      } else {
        savedUser = await User.create({
          ...req.body,
          password: hashedPassword,
        })
      }

      const token = createToken(
        {
          id: savedUser.id,
          plan_id: savedUser.plan_id,
        },
        isAdmin
      )

      return this.return(true, 'registered successfully', { user: savedUser,token })
    } catch (error) {
      console.log(error);
      return this.return(false, 'Error registering', error)
    }
  }

  static async login(req, isAdmin = false) {
    try {
      const { password, email } = req.body

      let user
      if (isAdmin) {
        user = await Admin.findOne({ where: { email } })
      } else {
        user = await User.findOne({ where: { email } })
      }

      if (!user) {
        return this.return(false, 'Wrong email or password')
      }

      const passwordMatch = await bcrypt.compare(password, user.password)

      if (!passwordMatch) {
        return this.return(false, 'Wrong email or password')
      }

      const token = createToken({ id: user.id, plan_id: user.plan_id }, isAdmin)

      return this.return(true, 'Login successfully', { user, token })
    } catch (error) {
      console.log(error)
      return this.return(false, 'Error login', error)
    }
  }
}
