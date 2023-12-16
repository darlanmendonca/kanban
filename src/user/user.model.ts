import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'
import bcrypt from 'bcryptjs'

interface UserAttributes {
  id: string
  username: string
  password: string
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string
  public username!: string
  public password!: string

  public validPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
  }
}

const hashPassword = async (user: User) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10)
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: false,
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
    },
  },
)

export default User
