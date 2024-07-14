import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLSchema, GraphQLID } from 'graphql';
import { measureTime } from '../decorators/measureTime';
import redisClient from '../services/redisCache';
import characterService from '../services/characterService';



const CharacterType = new GraphQLObjectType({
  name: 'Character',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    status: { type: GraphQLString },
    species: { type: GraphQLString },
    type: { type: GraphQLString },
    gender: { type: GraphQLString },
    origin: { type: GraphQLString },
    location: { type: GraphQLString },
    image: { type: GraphQLString },
  }),
});


class CharacterResolver {
    @measureTime
    async getCharacters(args: any) {
      console.log({args})
      console.log(args.keys)
      const key = Object.keys(args) ?  JSON.stringify(args) : "all";
      console.log({key})
      const cacheValue = await redisClient.get(key);
      if (cacheValue) {
        return JSON.parse(cacheValue);
      }
      
      const characters = await characterService.getCharactersFromApi(args);
      
      await redisClient.set(key, JSON.stringify(characters), { EX: 3600 });
      return characters;
    }
  }
  
  const characterResolver = new CharacterResolver();

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    characters: {
      type: new GraphQLList(CharacterType),
      args: {
        id: { type: GraphQLID },
        status: { type: GraphQLString },
        species: { type: GraphQLString },
        gender: { type: GraphQLString },
        name: { type: GraphQLString },
        origin: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return characterResolver.getCharacters(args);
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
