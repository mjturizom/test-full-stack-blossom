import characterRepository from '../repositories/characterRepository';
import { getCharactersFromApi } from './getCharactersFromApi';

class CharacterService {
  async getCharactersFromDB(args: any) {
    return await characterRepository.findAll(args);
  }
  async getCharactersFromApi(args: any) {
    console.log(args)
    return await getCharactersFromApi(args);
  }
}

export default new CharacterService();
