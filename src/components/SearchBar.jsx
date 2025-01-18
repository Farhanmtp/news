import React from 'react';
import { useSearch } from './SearchProvider';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex items-center bg-lightgray300 dark:bg-darkgray400 text-lightgray400 rounded-lg px-5 py-3 md:w-[680px] max-w-xl">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
        />
      </svg>
      <input
        type="text"
        placeholder="Search for topics, locations & sources"
        className="flex-grow bg-transparent border-none outline-none dark:text-white text-lightgray500 placeholder-lightgray400 px-4"
        value={searchTerm}  
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
