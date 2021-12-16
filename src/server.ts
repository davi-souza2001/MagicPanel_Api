import express from 'express'
import cors from 'cors'
import UserRoutes from './routes/UserRoutes'

const app: express.Application = express()

app.use(express.json())

app.use(cors())

app.use('/users', UserRoutes)

app.listen(5000)