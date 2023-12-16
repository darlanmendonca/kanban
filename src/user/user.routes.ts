import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { StatusCodes as StatusCode, ReasonPhrases as Status } from 'http-status-codes'
import validate from '../validation/validation.middleware'
import { UserLogin } from './user.validation'
import User from './user.model'

import type { Request, Response } from 'express'

const router = Router()

const secretKey = process.env.SECRET_KEY as string

router.post('/login', validate(UserLogin), async (req: Request, res: Response) => {
  const { username, password } = req.body

  const user = await User.findOne({ where: { username }})
  const isValidPassword = user && bcrypt.compareSync(password, user.toJSON().password)

  if (!user || !isValidPassword) {
    return res
      .status(StatusCode.UNAUTHORIZED)
      .send(Status.UNAUTHORIZED)
  }

  const token = jwt.sign({ id: user.id, username }, secretKey, { expiresIn: '1h' })
  
  res.json({ token })
})

export default router
