import Controller from './Controller.js'
import CharacterService from '../../Services/CharacterService.js'

class CharacterController extends Controller {
  static async getAllCharacters(req, res) {
    try {
      const result = await CharacterService.all()
      return CharacterController.returnResponse(
        res,
        result.success,
        result.message,
        result.data
      )
    } catch (error) {
      return CharacterController.returnResponse(
        res,
        false,
        'Error in All Characters Controller',
        error
      )
    }
  }

  static async getCharacterById(req, res) {
    try {
      const result = await CharacterService.byId(req.params.id)
      return CharacterController.returnResponse(
        res,
        result.success,
        result.message,
        result.data
      )
    } catch (error) {
      return CharacterController.returnResponse(
        res,
        false,
        'Error in Character By Id Controller',
        error
      )
    }
  }

  static async addCharacter(req, res) {
    try {
      const result = await CharacterService.add(req)
      return CharacterController.returnResponse(
        res,
        result.success,
        result.message,
        result.data
      )
    } catch (error) {
      return CharacterController.returnResponse(
        res,
        false,
        'Error in Add Character Controller',
        error
      )
    }
  }

  static async deleteCharacter(req, res) {
    try {
      const result = await CharacterService.delete(req.params.id)
      return CharacterController.returnResponse(
        res,
        result.success,
        result.message,
        result.data
      )
    } catch (error) {
      return CharacterController.returnResponse(
        res,
        false,
        'Error in Delete Character Controller',
        error
      )
    }
  }

  static async updateCharacter(req, res) {
    try {
      const result = await CharacterService.update(req)
      return CharacterController.returnResponse(
        res,
        result.success,
        result.message,
        result.data
      )
    } catch (error) {
      return CharacterController.returnResponse(
        res,
        false,
        'Error in Update Character Controller',
        error
      )
    }
  }
}

export default CharacterController
