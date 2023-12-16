import Validation from 'joi'

export const NewCard = Validation.object({
  id: Validation.any().forbidden(),
  title: Validation.string().required(),
  content: Validation.string().required(),
  list: Validation.string().valid('TODO', 'DOING', 'DONE').required(),
})

export const EditigCard = Validation.object({
  id: Validation.string().required(),
  title: Validation.string().required(),
  content: Validation.string().required(),
  list: Validation.string().valid('TODO', 'DOING', 'DONE').required(),
})