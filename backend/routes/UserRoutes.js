import express from 'express'

import UserController from '../app/Http/Controllers/UserController.js'
import { validateRequest } from '../app/Middlewares/validateRequest.js'
import { UserByIdRequest } from '../app/Http/Requests/User/UserByIdRequest.js'
import { UpdateUserRequest } from '../app/Http/Requests/User/UserUpdateRequest.js'
import upload from '../app/Middlewares/uploadWithMulter.js'

const router = express.Router()

router.get('/', UserController.getAllUsers)

router.get('/:id', UserByIdRequest, validateRequest, UserController.getUserById)

router.put(
  '/:id',
  upload.single('profile_picture'),
  UpdateUserRequest,
  validateRequest,
  UserController.updateUser
)

router.delete('/:id', UserByIdRequest, validateRequest, UserController.deleteUser)

export default router
