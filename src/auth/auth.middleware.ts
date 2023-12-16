import jwt from 'jsonwebtoken'
import { StatusCodes as StatusCode, ReasonPhrases as Status } from 'http-status-codes'

import type { Request, Response, NextFunction } from 'express'
import type { JwtPayload } from 'jsonwebtoken'

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'] as string
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
    .status(StatusCode.FORBIDDEN)
    .send('A token is required for authentication')
  }
  
  try {
    const token = authHeader?.split(' ')[1]
    jwt.verify(token, process.env.SECRET_KEY as string) as JwtPayload
  } catch (err) {
    return res
      .status(StatusCode.UNAUTHORIZED)
      .send(Status.UNAUTHORIZED)
  }

  next()
}

export default auth