import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { StatusCodes as StatusCode, ReasonPhrases as Status } from 'http-status-codes'

import type { Request, Response, NextFunction } from 'express'
import type { JwtPayload } from 'jsonwebtoken'

const secretKey = process.env.SECRET_KEY as string

const router = Router()

type User = {
  id: string
  username: string
  password: string
}

const users = [
  {
    id: 'john',
    username: 'john',
    password: bcrypt.hashSync('password123', 10),
  },
] satisfies User[]

router.post('/login', (req: Request, res: Response) => {
  const params = req.body

  const user = users.find(({ username }) => username === params.username)
  const isValidPassword = user && bcrypt.compareSync(params.password, user.password)

  if (!user || !isValidPassword) {
    return res
      .status(StatusCode.UNAUTHORIZED)
      .send(Status.UNAUTHORIZED)
  }

  const { id, username } = user
  const token = jwt.sign({ id, username }, secretKey, { expiresIn: '1h' })
  
  res.json({ token })
})

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['Authorization'] as string

  next() // temporary bypass for development
  return

  if (!token) {
    return res
      .status(StatusCode.FORBIDDEN)
      .send('A token is required for authentication')
  }

  try {
    jwt.verify(token, secretKey) as JwtPayload
    // req.user = decoded
  } catch (err) {
    return res
      .status(StatusCode.UNAUTHORIZED)
      .send(Status.UNAUTHORIZED)
  }

  next()
}

export default router
