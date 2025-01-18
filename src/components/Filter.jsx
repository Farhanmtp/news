import React from 'react';

const Filter = ({ selectedSources, setSelectedSources, selectedDate, setSelectedDate, selectedAuthor, setSelectedAuthor }) => {
  
  // Handle source toggle
  const handleSourceToggle = (source) => {
    setSelectedSources((prevSelected) => {
      const updated = { ...prevSelected, [source]: !prevSelected[source] };
      return updated;
    });
  };

  return (
    <div className="md:flex md:justify-between mb-4 md:space-x-4 md:space-y-0 space-y-4">
      {/* Source Filter */}
      <div className="flex space-x-2">
        {['BBC', 'Guardian', 'NYTimes'].map((source) => (
          <button
            key={source}
            className={`px-5 py-3 rounded-lg ${selectedSources[source] ? 'border-2 text-white' : 'dark:bg-darkgray600'}`}
            onClick={() => handleSourceToggle(source)}
          >
            <img
              src={`/sources/${source.toLowerCase().replace(" ", "")}-logo.png`} 
              alt={`${source} logo`}
              className="h-4"
            />
          </button>
        ))}
      </div>

      <div className="flex space-x-4">
        {/* Date Filter */}
        <div className="relative">
          <select
            className="w-full px-5 py-3 pr-10 rounded-lg dark:bg-darkgray600 text-white appearance-none"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option value="">Select Date</option>
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
            <option value="This Year">This Year</option>
          </select>
          
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>

        <div className="relative">
          {/* Author Filter */}
          <select
            className="w-full px-5 py-3 pr-10 rounded-lg dark:bg-darkgray600 text-white appearance-none"
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
          >
            <option value="">Select Author</option>
            <option value="Jane Smith">Jane Smith</option>
            <option value="John Doe">John Doe</option>
          </select>

          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Filter;
