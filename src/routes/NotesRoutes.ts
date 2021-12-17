import { Router } from 'express'
import NotesController from '../controllers/NotesController'

const router = Router()

router.post('/postNewNote', NotesController.postNewNote)
router.get('/getAllNotes', NotesController.getAllNotes)
router.patch('/edit/:id', NotesController.editNote)

export default router