import { Admin } from '../Models/index.js'
import Service from './Service.js'

export default class AdminService extends Service {
  static async all() {
    try {
      const all_admins = await Admin.findAll({ order: [['id', 'DESC']] })
      return this.return(true, 'all admins', all_admins)
    } catch (error) {
      this.handleError(error, 'Error getting all admins')
    }
  }
  static async byId(id) {
    try {
      const adminData = await Admin.findByPk(id)
      return this.return(true, 'Admin retrieve successfuly', adminData)
    } catch (error) {
      this.handleError(error, 'Error getting admin by id')
    }
  }
  static async delete(id) {
    try {
      await Admin.destroy({ where: { id } })

      return this.return(true, 'Admin deleted successfuly')
    } catch (error) {
      this.handleError(error, 'Error deleting')
    }
  }
  static async update(id, allAdminData = {}) {
    try {
      const { password } = allAdminData

      if (password) {
        const hashed = await AdminService.hashPassword(password)
        allAdminData.password = hashed
      }

      await Admin.update(allAdminData, { where: { id } })
      const admin = await Admin.findByPk(id)

      return this.return(true, 'Updated admin Data', admin)
    } catch (error) {
      this.handleError(error, 'Error updating admin')
    }
  }
}
