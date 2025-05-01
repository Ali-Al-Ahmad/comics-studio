
export default class Service {
  static return(success, message, data = null) {
    return {
      success,
      message,
      data,
    }
  }
}
