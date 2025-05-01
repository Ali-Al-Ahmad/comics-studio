import ResponseTrait from "../../Traits/ResponseTrait.js"

export default class Controller {
  static returnResponse(res, success, message, data, code) {
    return ResponseTrait.response(res, success, message, data, code)
  }
}
