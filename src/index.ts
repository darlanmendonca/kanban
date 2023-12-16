import express from 'express'
import dotenv from 'dotenv'
import { initializeDatabase } from './config/database'
import bodyParser from 'body-parser'
import users from './user/user.routes'
import auth from './auth/auth.middleware'
import cards from './card/card.routes'

const envFile = process.env.NODE_ENV === 'production' 
  ? '.env.production' 
  : '.env.development'

  
const { error } = dotenv.config({ path: envFile })

if (!error)
  console.log(`Loaded ${envFile}`)

if (!process.env.PORT 
  || !process.env.SECRET_KEY
  || !process.env.DEFAULT_USERNAME
  || !process.env.DEFAULT_PASSWORD
) {
  console.error('Error: missing variables on .env file')
  console.log(`Check if .env.${process.env.NODE_ENV} is set, you can use .env.example to begin`)
  process.exit(1)
}

const app = express()

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/', users)
  .use(auth)
  .use('/cards', cards)

initializeDatabase().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${process.env.PORT}`)
  })
})
