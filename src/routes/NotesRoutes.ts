import { Router } from 'express'
import NotesController from '../controllers/NotesController'

const router = Router()

router.post('/postNewNote', NotesController.postNewNote)
router.patch('/edit/:id', NotesController.editNote)
router.delete('/delete/:id', NotesController.deleteNote)
router.get('/getAllNotes', NotesController.getAllNotes)

export default router