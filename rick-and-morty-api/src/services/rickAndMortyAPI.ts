import axios from 'axios';
import Character from '../models/character';
import { getCharactersFromApi } from './getCharactersFromApi';

const initializeDatabase = async () => {
  try {
    const response = await getCharactersFromApi();
    const characters: any[] = response.slice(0, 15);

    for (const character of characters) {
      await Character.upsert({
        id: character.id,
        name: character.name,
        status: character.status,
        species: character.species,
        type: character.type,
        gender: character.gender,
        origin: character.origin,
        location: character.location,
        image: character.image,
      });
    }
  } catch (error) {
    console.error('Error initializing database: ', error);
  }
};

export default initializeDatabase;
