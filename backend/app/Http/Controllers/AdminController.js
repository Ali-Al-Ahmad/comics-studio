import Controller from './Controller.js'
import AdminService from '../../Services/AdminService.js'

class AdminController extends Controller {
  static async getAllAdmins(req, res) {
    try {
      const result = await AdminService.all()
      return AdminController.returnResponse(
        res,
        result.success,
        result.message,
        result.data
      )
    } catch (error) {
      return AdminController.returnResponse(
        res,
        false,
        'Error in All Admins Controller',
        error
      )
    }
  }

  static async getAdminById(req, res) {
    try {
      const result = await AdminService.byId(req.params.id)
      return AdminController.returnResponse(
        res,
        result.success,
        result.message,
        result.data
      )
    } catch (error) {
      return AdminController.returnResponse(
        res,
        false,
        'Error in Admin By Id Controller',
        error
      )
    }
  }

  static async deleteAdmin(req, res) {
    try {
      const result = await AdminService.delete(req.params.id)
      return AdminController.returnResponse(
        res,
        result.success,
        result.message,
        result.data
      )
    } catch (error) {
      return AdminController.returnResponse(
        res,
        false,
        'Error in Delete Admin Controller',
        error
      )
    }
  }
}

export default AdminController
