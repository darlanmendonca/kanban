import logger from './logger'

import type { Request, Response, NextFunction } from 'express'

const log = (entry: string) => (req: Request, res: Response, next: NextFunction) => {
  logger.info(entry)

  next()
}

export default log