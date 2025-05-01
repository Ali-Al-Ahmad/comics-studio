import { User } from '../Models/index.js'
import Service from './Service.js'

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
}
