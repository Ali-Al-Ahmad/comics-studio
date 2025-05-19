import express from 'express'

import CharacterController from '../app/Http/Controllers/CharacterController.js'
import { validateRequest } from '../app/Middlewares/validateRequest.js'
import { AddCharacterRequest } from '../app/Http/Requests/Character/AddCharacterRequest.js'
import { CharacterByIdRequest } from '../app/Http/Requests/Character/GetCharacterByIdRequest.js'
import { UpdateCharacterRequest } from '../app/Http/Requests/Character/CharacterUpdateRequest.js'
import upload from '../app/Middlewares/uploadWithMulter.js'

const router = express.Router()

router.get('/', CharacterController.getAllCharacters)

router.get('/usercharacters', CharacterController.getUserCharacters)


router.get(
  '/:id',
  CharacterByIdRequest,
  validateRequest,
  CharacterController.getCharacterById
)

router.post(
  '/',
  upload.single('image_url'),
  AddCharacterRequest,
  validateRequest,
  CharacterController.addCharacter
)

router.put(
  '/:id',
  upload.single('image_url'),
  UpdateCharacterRequest,
  validateRequest,
  CharacterController.updateCharacter
)

router.delete(
  '/:id',
  CharacterByIdRequest,
  validateRequest,
  CharacterController.deleteCharacter
)

router.put(
  '/:id/favorite',
  CharacterByIdRequest,
  validateRequest,
  CharacterController.toggleFavorite
)

export default router
