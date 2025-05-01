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
}

export default AdminController
