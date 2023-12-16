import { v4 as uuid } from 'uuid'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

import type { QueryInterface } from 'sequelize'

const envFile = process.env.NODE_ENV === 'production' 
  ? '.env.production' 
  : '.env.development'

dotenv.config({ path: envFile })

const username = process.env.DEFAULT_USERNAME as string
const password = process.env.DEFAULT_PASSWORD as string

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.bulkInsert('Users', [
    {
      id: uuid(),
      username,
      password: bcrypt.hashSync(password, 10),
    },
  ])
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.bulkDelete('Users', { username })
}
