import { Router } from 'express'
import NotesController from '../controllers/NotesController'

const router = Router()

router.post('/postNewNote', NotesController.postNewNote)
router.get('/getAllNotes', NotesController.getAllNotes)

export default router