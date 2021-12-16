import express from 'express'
import cors from 'cors'

const app: express.Application = express()

app.use(express.json())

app.use(cors())

app.get('/', (req, res) => {
    return res.send('Hello World')
})

app.listen(5000)