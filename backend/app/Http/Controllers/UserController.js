import Controller from './Controller.js'
import UserService from '../../Services/UserService.js'

class UserController extends Controller {
  static async getAllUsers(req, res) {
    try {
      const result = await UserService.all()
      return UserController.returnResponse(
        res,
        result.success,
        result.message,
        result.data
      )
    } catch (error) {
      return UserController.returnResponse(
        res,
        false,
        'Error in All Users Controller',
        error
      )
    }
  }

  static async getUserById(req, res) {
    try {
      const result = await UserService.byId(req.params.id)
      return UserController.returnResponse(
        res,
        result.success,
        result.message,
        result.data
      )
    } catch (error) {
      return UserController.returnResponse(
        res,
        false,
        'Error in User By Id Controller',
        error
      )
    }
  }
}

export default UserController
