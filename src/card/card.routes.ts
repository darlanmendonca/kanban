import { Router } from 'express'
import { StatusCodes as StatusCode, ReasonPhrases as Status } from 'http-status-codes'
import Card from './card.model'
import { NewCard, EditigCard } from './card.validation'
import validate from '../validation/validation.middleware'
// import log from '../logger/logger.middleware'
import logger from '../logger/logger'

import type { Request, Response } from 'express'

const router = Router()

router.get('/', async (_: Request, res: Response) => {
  const cards = await Card.findAll()

  res.json(cards)
})

router.post('/', validate(NewCard), async (req: Request, res: Response) => {
  const card = await Card.create(req.body)
  res.json(card)
})

router.put('/:id', 
  validate(EditigCard), 
  // log('Card {id} - {title} - Changed'), 
  async (req: Request, res: Response) => {
    const card = await Card.findOne({ where: { id: req.params.id } })
    const [updated] = await Card.update(req.body, {
      where: { id: req.params.id }
    })

    if (!updated)
      return res.status(StatusCode.NOT_FOUND).send(Status.NOT_FOUND)

    logger.info(`Card ${req.params.id} - ${card?.toJSON().title} - Changed`)
    res.json(req.body)
  }
)

router.delete('/:id', 
  // log('Card {id} - {title} - Removed'), 
  async (req: Request, res: Response) => {
    const card = await Card.findOne({ where: { id: req.params.id } })
    const deleted = await Card.destroy({
      where: { id: req.params.id }
    })

    if (!deleted)
      return res.status(StatusCode.NOT_FOUND).send(Status.NOT_FOUND)

    logger.info(`Card ${req.params.id} - ${card?.toJSON().title} - Removed`)
    const cards = await Card.findAll()
    res.json(cards)
  }
)

export default router
