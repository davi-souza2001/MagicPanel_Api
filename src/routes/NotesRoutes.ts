import { Router } from 'express'
import NotesController from '../controllers/NotesController'

const router = Router()

router.get('/getAll', NotesController.getAll)

export default router