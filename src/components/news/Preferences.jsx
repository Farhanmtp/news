import React, { useState, useEffect } from "react";

const predefinedTags = {
  categories: ["Pakistan", "World", "Local", "Business", "Technology", "Entertainment", "Sports", "Science", "Health"],
  authors: ["Author1", "Author2", "Author3", "Author4", "Author5"],
  sources: ["BBC", "Guardian", "NYTimes"],
};

function Preferences() {
  // State for preferences and modal visibility
  const [preferences, setPreferences] = useState(() => {
    // Load initial preferences from localStorage
    const savedPreferences = localStorage.getItem("userPreferences");
    return savedPreferences ? JSON.parse(savedPreferences) : { categories: [], authors: [], sources: [] };
  });

  const [modal, setModal] = useState({ isOpen: false, section: "" });

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
  }, [preferences]);

  // Toggle modal visibility
  const handleOpenModal = (section) => {
    setModal({ isOpen: true, section });
  };

  const handleCloseModal = () => {
    setModal({ isOpen: false, section: "" });
  };  

  // Add or remove a tag in real-time
  const handleTagClick = (section, tag) => {
    setPreferences((prev) => {
      const isTagSelected = prev[section].includes(tag);
      const updatedSection = isTagSelected
        ? prev[section].filter((item) => item !== tag) 
        : [...prev[section], tag]; 
      return { ...prev, [section]: updatedSection };
    });
  };

  // Check if the user has no preferences selected
  const hasNoPreferences = preferences
    ? preferences.categories.length === 0 &&
      preferences.authors.length === 0 &&
      preferences.sources.length === 0
    : true;

  const renderTags = (section) => (
    <div className="flex flex-wrap gap-2 mt-3">
      {preferences[section].map((tag, index) => (
        <div
          key={`${section}-${index}`}
          className="flex items-center bg-darkgray200 dark:bg-darkgray500 text-lightgray700 dark:text-lightgray200 px-3 py-1 rounded-lg text-sm dark:text-lightgray400"
        >
          {tag}
          <button
            className="ml-2 text-lightgray400 dark:text-lightgray400 hover:text-red-500"
            aria-label={`Remove ${tag}`}
            onClick={() => handleTagClick(section, tag)}
          >
            ✕
          </button>
        </div>
      ))}
      <button
        className="flex items-center justify-center w-8 h-8 bg-darkgray300 dark:bg-muttedpurple text-lightgray500 dark:text-lightgray400 rounded-lg text-[24px]"
        aria-label="Add Tag"
        onClick={() => handleOpenModal(section)}
      >
        +
      </button>
    </div>
  );

  const renderPreferences = (section) => {
    return (
      <div>
        <div className="space-y-2 mt-4">
          {predefinedTags[section].map((tag, index) => (
            <button
              key={`${tag}-${index}`}
              className={`px-3 py-2 mr-2 rounded-lg ${
                preferences[section] && preferences[section].includes(tag)
                  ? "bg-lightgray700 text-lightgray400"
                  : "bg-gray-200 dark:bg-bordermutted dark:text-lightgray400"
              }`}
              onClick={() => handleTagClick(section, tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    );
  };   

  return (
    <>
    {hasNoPreferences ? (
            <section className="text-center space-y-5">
              <h2 className="dark:text-white text-title font-medium leading-6">
                Select Your Interests
              </h2>
              <p className="dark:text-lightgray400 mt-3">Choose your preferred categories, authors and sources for your news feed</p>
              <div className="grid items-center justify-items-center justify-center">
                <div className="bg-white dark:bg-darkgray600 p-6 rounded-lg md:w-3/4 text-center">
                  {["categories", "authors", "sources"].map((section,index) => (
                    <div key={section} className={`${index !== 2 ? "border-b-[1px] border-bordermutted":""} py-4`}>
                      <h4 className="dark:text-white">{section.charAt(0).toUpperCase() + section.slice(1)}</h4>
                      {renderPreferences(section)}
                    </div>
                  ))}
                </div>
                <button
                  className="mt-6 px-5 bg-blue-500 text-white py-2 rounded-lg w-fit"
                  onClick={handleCloseModal}
                >
                  Done
                </button>
              </div>
            </section>
          ) : (
          <div className="col-span-2 dark:bg-darkgray600 bg-white my-5 rounded-lg h-fit p-5 space-y-4 sticky top-32">
            <h2 className="dark:text-white text-heading font-medium leading-6">
              Your Preferences
            </h2>
      
            {/* Categories Section */}
            <div className="border-b-[1px] border-bordermutted pb-3">
              <h6 className="text-regular dark:text-lightgray400">Categories</h6>
              {renderTags("categories")}
            </div>
      
            {/* Authors Section */}
            <div className="border-b-[1px] border-bordermutted pb-3">
              <h6 className="text-regular dark:text-lightgray400">Authors</h6>
              {renderTags("authors")}
            </div>
      
            {/* Sources Section */}
            <div className="pb-3">
              <h6 className="text-regular dark:text-lightgray400">Sources</h6>
              {renderTags("sources")}
            </div>
      
            {/* Modal for selecting tags */}
            {modal.isOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white dark:bg-darkgray600 p-6 rounded-lg w-96">
                  <h4 className="text-lg font-medium dark:text-white">
                    Select {modal.section}
                  </h4>
                  <div className="space-y-2 mt-4">
                    {predefinedTags[modal.section].map((tag, index) => (
                      <button
                        key={`${modal.section}-${index}`}
                        className={`px-3 py-2 mr-2 rounded-lg ${
                          preferences[modal.section].includes(tag)
                            ? "bg-lightgray700 text-lightgray400"
                            : "bg-gray-200 dark:bg-bordermutted dark:text-lightgray400"
                        }`}
                        onClick={() => handleTagClick(modal.section, tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  <button
                    className="mt-6 px-5 bg-blue-500 text-white py-2 rounded-lg"
                    onClick={handleCloseModal}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
      )}
    
    </>
  );
}

export default Preferences;
