import jwt from 'jsonwebtoken'
import ResponseTrait from '../Traits/ResponseTrait.js'

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ResponseTrait.response(res, false, 'error',
        { error: 'Access denied. Invalid or missing authorization header.' }, 401)
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
      return ResponseTrait.response(res, false, 'error',
        { error: 'Access denied. Token not found.' },
        401
      )
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded

    next()
  } catch (error) {
    return ResponseTrait.response(res, false, 'error',
      { error: 'Invalid or expired token.' },
      401
    )
  }
}
