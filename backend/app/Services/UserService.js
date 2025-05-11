import { User, Book } from '../Models/index.js'
import Service from './Service.js'
import bcrypt from 'bcrypt'

export default class UserService extends Service {
  static async all() {
    try {
      const all_users = await User.findAll({ order: [['id', 'DESC']] })
      return this.return(true, 'all users', all_users)
    } catch (error) {
      return this.return(false, 'Error getting all users', error)
    }
  }

  static async byId(id) {
    try {
      const userData = await User.findByPk(id)
      return this.return(true, 'User retrieve successfuly', userData)
    } catch (error) {
      return this.return(false, 'Error getting user by id', error)
    }
  }

  static async delete(id) {
    try {
      await User.destroy({ where: { id } })

      return this.return(true, 'User deleted successfuly')
    } catch (error) {
      return this.return(false, 'Error deleting', error)
    }
  }

  static async update(req) {
    try {
      const id = req.params?.id
      const allUserData = req.body || {}
      const path = req.file?.path

      const { password } = allUserData

      if (password) {
        const hashed = await UserService.hashPassword(password)
        allUserData.password = hashed
      }

      if (path) {
        allUserData.profile_picture = path
      }

      await User.update(allUserData, { where: { id } })
      const user = await User.findByPk(id)

      return this.return(true, 'Updated user Data', user)
    } catch (error) {
      console.log(error)
      this.return(false, 'Error updating user', error)
    }
  }

  static async userAllBooks(req) {
    try {
      const all_books = await Book.findAll({
        where: { user_id: req.user?.id },
        order: [['id', 'DESC']],
      })
      return this.return(true, 'All User books', all_books)
    } catch (error) {
      return this.return(false, 'Error getting All User books', error)
    }
  }

  static async changePassword(req) {
    try {
      const { current_password, new_password } = req.body

      const user = await User.findByPk(req.user.id)

      const passwordMatch = await bcrypt.compare(
        current_password,
        user.password
      )

      if (!passwordMatch) {
        return this.return(false, 'Current password is incorrect')
      }

      user.password = await this.hashPassword(new_password)
      await user.save()

      return this.return(true, 'Password changed successfully')
    } catch (error) {
      return this.return(false, 'Error changing the password', error)
    }
  }
}
