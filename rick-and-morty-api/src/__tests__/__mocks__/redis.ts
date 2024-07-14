export const redisClient = {
    connect: jest.fn(() => Promise.resolve()),
    on: ()=>({}),
    get: jest.fn((key) => {
      if (key === JSON.stringify({ status: "Alive" })) {
        return Promise.resolve(
          JSON.stringify([
            {
              id: '1',
              name: 'Rick Sanchez',
              status: 'Alive',
              species: 'Human',
              gender: 'Male',
              origin: 'Earth',
              location: 'Earth',
              image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            },
            {
              id: '2',
              name: 'Morty Smith',
              status: 'Alive',
              species: 'Human',
              gender: 'Male',
              origin: 'Earth',
              location: 'Earth',
              image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
            },
          ])
        );
      }
      return Promise.resolve(null);
    }),
    set: jest.fn(() => Promise.resolve()),
    quit: jest.fn(() => Promise.resolve()),
  };

