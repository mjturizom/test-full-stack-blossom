import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface CharacterAttributes {
  id: number;
  name: string;
  status: string;
  species: string;
  type?: string;
  gender: string;
  origin: string;
  location: string;
  image: string;
}

interface CharacterCreationAttributes extends Optional<CharacterAttributes, 'id' | 'type'> {}

class Character extends Model<CharacterAttributes, CharacterCreationAttributes> implements CharacterAttributes {
  public id!: number;
  public name!: string;
  public status!: string;
  public species!: string;
  public type!: string;
  public gender!: string;
  public origin!: string;
  public location!: string;
  public image!: string;
}

Character.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  species: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  origin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Character',
});

export default Character;
