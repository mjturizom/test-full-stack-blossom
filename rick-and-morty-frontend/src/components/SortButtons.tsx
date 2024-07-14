import React from 'react';

interface SortButtonsProps {
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
}

const SortButtons: React.FC<SortButtonsProps> = ({ sortOrder, setSortOrder }) => {
  return (
    <div className="flex w-full justify-end">
      <button
        onClick={() => setSortOrder('asc')}
        className={`px-4 py-2 mr-2 ${sortOrder === 'asc' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
      >
        A-Z
      </button>
      <button
        onClick={() => setSortOrder('desc')}
        className={`px-4 py-2 ${sortOrder === 'desc' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
      >
        Z-A
      </button>
    </div>
  );
};

export default SortButtons;
