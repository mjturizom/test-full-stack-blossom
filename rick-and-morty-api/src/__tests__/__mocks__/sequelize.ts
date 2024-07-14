const SequelizeMock = require('sequelize-mock');

export const dbMock = new SequelizeMock();

export const CharacterMock = dbMock.define('Character', {
  id: '1',
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  origin: 'Earth',
  location: 'Earth',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
});

CharacterMock.$queueResult([
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
]);