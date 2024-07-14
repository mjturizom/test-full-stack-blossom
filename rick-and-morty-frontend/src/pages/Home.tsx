import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import CharacterCard from '../components/CharacterCard';
import SortButtons from '../components/SortButtons';

const GET_CHARACTERS = gql`
  query GetCharacters($status: String, $species: String, $gender: String) {
    characters(status: $status, species: $species, gender: $gender) {
      id
      name
      image
      species
    }
  }
`;

const Home: React.FC = () => {
  const [status, setStatus] = useState('');
  const [species, setSpecies] = useState('');
  const [gender, setGender] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const { loading, error, data, refetch  } = useQuery(GET_CHARACTERS, {
    variables: {  }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryValues = { status, species, gender }
    refetch(Object.entries(queryValues).reduce((acc, [key, value]) => {
      if (value) {
        acc[key] = value;
      }
      return acc;
    }, {} as any ));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const sortedCharacters = [...data.characters].sort((a, b) => {
    if (sortOrder === 'asc') return a.name.localeCompare(b.name);
    return b.name.localeCompare(a.name);
  });

  return (
    <div className="container mx-auto p-4">
      <div className='flex gap-10' style={{    
        border: 'solid 1px lightgray',
        borderRadius: '6px',
        padding: '12px',
        marginBottom: '15px',
    }}>
        
      <form onSubmit={handleSearch} className="flex gap-10 items-baseline">
        <div className="flex">
          <input
            type="text"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 border border-gray-300 rounded mr-2"
          />
          <input
            type="text"
            placeholder="Species"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="p-2 border border-gray-300 rounded mr-2"
          />
          <input
            type="text"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </form>
      <SortButtons sortOrder={sortOrder} setSortOrder={setSortOrder} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedCharacters.map((character: any) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
};

export default Home;
