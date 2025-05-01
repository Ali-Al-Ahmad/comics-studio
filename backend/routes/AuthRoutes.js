import express from 'express'

import AuthController from '../app/Http/Controllers/AuthController.js'
import { validateRequest } from '../app/Middlewares/validateRequest.js'
import { LoginRequest } from '../app/Http/Requests/Auth/LoginRequest.js'
import { RegisterRequest } from '../app/Http/Requests/Auth/RegisterRequest.js'
import { RegisterAdminRequest } from '../app/Http/Requests/Auth/RegisterAdminRequest.js'

const router = express.Router()

router.post(
  '/user/register',
  RegisterRequest,
  validateRequest,
  AuthController.registerUser
)

router.post(
  '/user/login',
  LoginRequest,
  validateRequest,
  AuthController.loginUser
)

router.post(
  '/admin/register',
  RegisterAdminRequest,
  validateRequest,
  AuthController.registerAdmin
)

router.post(
  '/admin/login',
  LoginRequest,
  validateRequest,
  AuthController.loginAdmin
)

export default router
