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

  static async loginUser(req, res) {
    try {
      const result = await AuthService.login(req)

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
        'Error login user',
        error
      )
    }
  }

  static async registerAdmin(req, res) {
    try {
      const result = await AuthService.register(req, true)

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
        'Error registering Admin',
        error
      )
    }
  }
}

export default AuthController
