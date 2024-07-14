import axios from 'axios';

const urlBase = 'https://rickandmortyapi.com/api/character';

type QueryParameter = { [key: string]: string };

function createQueryString(obj: QueryParameter): string {
  const queryString: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    if (value) {
      queryString.push(`${key}=${encodeURIComponent(value)}`);
    }
  }

  return '?' + queryString.join("&");
}
export const getCharactersFromApi = async (args: any = {}) => {
    try {
            let characterURL = urlBase;
            if(args.id) {
                characterURL = characterURL + `/${args.id}`;
                const {
                    id,
                    name,
                    status,
                    species,
                    type,
                    gender,
                    origin,
                    location ,
                    image
                } = (await axios.get(characterURL)).data;
                return [{
                    id,
                    name,
                    status,
                    species,
                    type,
                    gender,
                    origin: origin.name,
                    location: location.name,
                    image
                }]
            }
            else if(Object.keys(args).length){
                console.log("entra")
            characterURL = characterURL + createQueryString(args)
            }
            console.log(characterURL)
            
            const response = await axios.get(characterURL);
            return response.data.results.map((character: any) => ({
                id: character.id,
                name: character.name,
                status: character.status,
                species: character.species,
                type: character.type,
                gender: character.gender,
                origin: character.origin.name,
                location: character.location.name,
                image: character.image,
            })) as any[];
        
      } catch (error: any) {
        console.error('Error quering Api:', error);
        throw new Error(`Error quering Api: ${ error.message}`)
      }
}
