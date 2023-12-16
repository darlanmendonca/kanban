import Validation from 'joi'

export const UserLogin = Validation.object({
  username: Validation.string().required(),
  password: Validation.string().required(),
})