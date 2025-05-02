import express from 'express'

import ComicController from '../app/Http/Controllers/ComicController.js'
import { validateRequest } from '../app/Middlewares/validateRequest.js'
import { AddComicRequest } from '../app/Http/Requests/Comic/AddComicRequest.js'
import { ComicByIdRequest } from '../app/Http/Requests/Comic/GetComicByIdRequest.js'
import { UpdateComicRequest } from '../app/Http/Requests/Comic/ComicUpdateRequest.js'

const router = express.Router()

router.get('/', ComicController.getAllComics)

router.get(
  '/:id',
  ComicByIdRequest,
  validateRequest,
  ComicController.getComicById
)

router.post('/', AddComicRequest, validateRequest, ComicController.addComic)

router.put(
  '/:id',
  UpdateComicRequest,
  validateRequest,
  ComicController.updateComic
)

router.delete(
  '/:id',
  ComicByIdRequest,
  validateRequest,
  ComicController.deleteComic
)

export default router
