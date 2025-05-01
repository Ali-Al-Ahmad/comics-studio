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
}
