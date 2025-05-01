import { Admin } from '../Models/index.js'
import Service from './Service.js'

export default class AdminService extends Service {
  static async all() {
    try {
      const all_admins = await Admin.findAll({ order: [['id', 'DESC']] })
      return this.return(true, 'all admins', all_admins)
    } catch (error) {
      return this.return(false, 'Error getting all admins', error)
    }
  }
}
