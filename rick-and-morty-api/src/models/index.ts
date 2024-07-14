import sequelize from '../config/database';
import Character from './character';

const db = {
  sequelize,
  Character,
};

export default db;
