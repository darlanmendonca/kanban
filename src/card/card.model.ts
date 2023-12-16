import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'

interface CardAttributes {
  id: string
  title: string
  content: string
  list: 'TODO' | 'DOING' | 'DONE'
}

class Card extends Model<CardAttributes> implements CardAttributes {
  public id!: string
  public title!: string
  public content!: string
  public list!: 'TODO' | 'DOING' | 'DONE'
}

Card.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    list: DataTypes.ENUM('TODO', 'DOING', 'DONE'),
  },
  {
    sequelize,
    modelName: 'Card',
    timestamps: false,
  },
)

export default Card
