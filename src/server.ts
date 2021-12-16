import express from 'express'
import cors from 'cors'

import UserRoutes from './routes/UserRoutes'
import NotesRoutes from './routes/NotesRoutes'

const app: express.Application = express()

app.use(express.json())

app.use(cors())

app.use('/users', UserRoutes)
app.use('/notes', NotesRoutes)

app.listen(5000)