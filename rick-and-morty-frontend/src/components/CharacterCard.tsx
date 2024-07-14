import React from 'react';
import { Link } from 'react-router-dom';

interface CharacterCardProps {
  character: {
    id: string;
    name: string;
    image: string;
    species: string;
  };
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <div className="bg-white rounded shadow p-4">
      <Link to={`/character/${character.id}`}>
        <img src={character.image} alt={character.name} className="w-full h-64 object-cover rounded mb-4" />
        <h2 className="text-xl font-bold mb-2">{character.name}</h2>
        <p className="text-gray-700">{character.species}</p>
      </Link>
    </div>
  );
};

export default CharacterCard;
