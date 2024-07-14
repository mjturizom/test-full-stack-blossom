import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const GET_CHARACTER_DETAILS = gql`
  query GetCharacterDetails($id: ID!) {
    characters(id: $id) {
      id
      name
      image
      species
      status
      gender
      origin
      location
    }
  }
`;

const CharacterDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_CHARACTER_DETAILS, { variables: { id } });
  const [isFavorite, setIsFavorite] = useState(false);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(id));

    const storedComments = JSON.parse(localStorage.getItem(`comments-${id}`) || '[]');
    setComments(storedComments);
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorites.includes(id)) {
      localStorage.setItem('favorites', JSON.stringify(favorites.filter((favId: string) => favId !== id)));
      setIsFavorite(false);
    } else {
      favorites.push(id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  const addComment = () => {
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
    setNewComment('');
  };

  const softDeleteCharacter = () => {
    const deletedCharacters = JSON.parse(localStorage.getItem('deletedCharacters') || '[]');
    deletedCharacters.push(id);
    localStorage.setItem('deletedCharacters', JSON.stringify(deletedCharacters));
    navigate('/');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { name, image, species, status, gender, origin, location } = data.characters[0];

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-row gap-4 bg-white rounded shadow p-4">
        <div className="basis-2/3 p-4" >
          <img src={image} alt={name} className="w-full h-auto object-cover rounded" />
        </div>
        <div className='grid grid-cols-1 gap-4 basis-1/2 p-4'>
          <h2 className="text-xl font-bold mb-2">{name}</h2>
          <p className="text-gray-700">Species: {species}</p>
          <p className="text-gray-700">Status: {status}</p>
          <p className="text-gray-700">Gender: {gender}</p>
          <p className="text-gray-700">Origin: {origin}</p>
          <p className="text-gray-700">Location: {location}</p>
          <div className='self-end'>
              <button 
                onClick={toggleFavorite}
                className={`mt-4 px-4 py-2 rounded ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
              <button
                onClick={softDeleteCharacter}
                className="mt-4 ml-4 px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete Character
              </button>
          </div>
        </div>
        
       
      </div>

      <div className="bg-white rounded shadow p-4 mt-4">
        <h3 className="text-lg font-bold mb-2">Comments</h3>
        <div className="mb-4">
          {comments.map((comment, index) => (
            <div key={index} className="bg-gray-100 p-2 rounded mb-2">{comment}</div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded mr-2"
          />
          <button
            onClick={addComment}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
