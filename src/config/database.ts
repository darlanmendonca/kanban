import { Sequelize } from 'sequelize'
import { up as seedDefaultUser } from '../user/user.seed'

const sequelize = new Sequelize('sqlite::memory:')

export const initializeDatabase = async () => {  
  await sequelize.sync()
  
  await seedDefaultUser(sequelize.getQueryInterface())
}

export default sequelize
