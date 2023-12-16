import Validation from 'joi'
import { StatusCodes as StatusCode } from 'http-status-codes'

import type { Request, Response, NextFunction } from 'express'

const validate = (schema: Validation.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body, { abortEarly: false })

  const errors = (error?.details || []).map(error => ({ message: error.message }))

  if (req.body.id && req.params.id && req.body.id !== req.params.id) {
    errors.push({ 
      message: '"id" in body does not match id in params' 
    } as Validation.ValidationErrorItem)
  }
  
  if (errors?.length) {
    return res
      .status(StatusCode.BAD_REQUEST)
      .json(errors)
  }

  next()
}

export default validate