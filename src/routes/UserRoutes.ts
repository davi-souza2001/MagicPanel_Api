import { Router } from 'express'
const UserController = require('../controllers/UserController')

const router = Router()

router.get('/register', UserController.register)

export default router