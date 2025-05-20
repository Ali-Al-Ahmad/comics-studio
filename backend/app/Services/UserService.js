import { User, Book } from '../Models/index.js'
import Service from './Service.js'
import bcrypt from 'bcrypt'

export default class UserService extends Service {
  static async all() {
    try {
      const all_users = await User.findAll({ order: [['id', 'DESC']] })
      return this.return(true, 'all users', all_users)
    } catch (error) {
      this.handleError(error, 'Error getting all users')
    }
  }
  static async byId(id) {
    try {
      const userData = await User.findByPk(id)
      return this.return(true, 'User retrieve successfuly', userData)
    } catch (error) {
      this.handleError(error, 'Error getting user by id')
    }
  }
  static async delete(id) {
    try {
      await User.destroy({ where: { id } })

      return this.return(true, 'User deleted successfuly')
    } catch (error) {
      this.handleError(error, 'Error deleting')
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
      this.handleError(error, 'Error updating user')
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
      this.handleError(error, 'Error getting All User books')
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
      this.handleError(error, 'Error changing the password')
    }
  }
}
