import Character from '../models/character';

class CharacterRepository {
  async findAll(args: any) {
    return await Character.findAll({ where: args });
  }
}

export default new CharacterRepository();
