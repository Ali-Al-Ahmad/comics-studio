class ResponseTrait {
  static response(res, success, message, data = null, code = null) {
    if (!code) {
      code = success ? 200 : 500
    }

    return res.status(code).json({
      success,
      message,
      [success ? 'data' : 'error']: data,
    })
  }
}

export default ResponseTrait
