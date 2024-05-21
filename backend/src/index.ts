import express, { Application } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { Routes } from '../routes/routes'
import color from 'colorts'

//For env File
dotenv.config()

const app: Application = express()
const port = process.env.PORT || 8000

app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ limit: '20mb', extended: true }))

/* CORS CONFIG */
const allowedOrigins = ['http://localhost:5000', 'http://127.0.0.1:5000']
const options: cors.CorsOptions = {
  origin: allowedOrigins
}

app.use(cors(options))

Routes(app)

app.disable('x-powered-by')
app.use(helmet())
app.use(morgan('dev'))


app.listen(port, () => {
  console.log(color(`--- [SERVER START] Serving on port: ${port}`).bgBlue.bold + "")
})