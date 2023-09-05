import * as dotenv from 'dotenv'
import express from 'express'
import gamesRouter from './routes/games'
import { pool } from './config/db'

dotenv.config()

const app = express()

app.use(express.json())

app.use((req: any, res, next) => {
  req.db = pool
  next()
})

app.use('/games', gamesRouter)

const port = process.env.APP_PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
