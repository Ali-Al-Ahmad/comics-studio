import Controller from './Controller.js'
import AuthService from '../../Services/AuthService.js'

class AuthController extends Controller {
  static async registerUser(req, res) {
    try {
      const result = await AuthService.register(req)

      return AuthController.returnResponse(
        res,
        result.success,
        result.message,
        result.data
      )
    } catch (error) {
      return AuthController.returnResponse(
        res,
        false,
        'Error registering user',
        error
      )
    }
  }
}

export default AuthController
