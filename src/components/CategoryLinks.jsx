import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const CategoriesLinks = ({ categories, links }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeLink, setActiveLink] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar visibility
  const navigate = useNavigate();
  const location = useLocation();

  // Set the active link based on the current pathname
  useEffect(() => {
    const currentLink = links.find(link => link.path === location.pathname);
    if (currentLink) {
      setActiveLink(currentLink.name);
    }
  }, [location.pathname, links]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);

    // URL with the selected category parameter
    const params = new URLSearchParams(location.search);
    params.set("category", category);
    navigate(`?${params.toString()}`);
    setIsSidebarOpen(false); // Close sidebar after selecting a category
  };

  return (
    <>
      {/* Burger Button (visible only on screens smaller than lg) */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="xl:hidden p-2 text-gray-300 hover:text-white focus:outline-none"
        style={{ margin: 0 }}
      >
        {!isSidebarOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        ):(
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </button>

      {/* Categories (visible for lg screens and above) */}
      <div className="hidden xl:flex text-gray-300 px-2 space-x-3">
        {links.map((link) => (
          <Link
            className={`px-4 pb-2 whitespace-nowrap border-b-4 ${
              activeLink === link.name
                ? "dark:text-darkblue text-lightblue rounded-b-sm dark:border-darkblue border-lightblue"
                : "dark:hover:text-white hover:text-lightgray600 text-lightgray500 dark:text-darkgray300 dark:border-darkgray600 border-white"
            } transition-all`}
            onClick={() => {
              setActiveLink(link.name);
              setActiveCategory(null);
            }}
            key={link.name}
            to={link.path}
          >
            {link.name}
          </Link>
        ))}

        {/* Conditionally show categories only on the Articles page */}
        {location.pathname === '/articles' && (
          <>
            <span className="dark:text-darkgray400 text-lightgray300">|</span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 pb-2 whitespace-nowrap border-b-4 ${
                  activeCategory === category
                    ? "dark:text-darkblue text-lightblue rounded-b-sm dark:border-darkblue border-lightblue"
                    : "dark:hover:text-white hover:text-lightgray600 text-lightgray500 dark:text-darkgray300 dark:border-darkgray600 border-white"
                } transition-all`}
              >
                {category}
              </button>
            ))}
          </>
        )}
      </div>

      {/* Sidebar for smaller screens */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-darkgray600 text-white transform transition-transform top-11  ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Links visible in sidebar */}
        <div className="p-4 space-y-2 border-y border-gray-700">
          {links.map((link) => (
            <Link
              key={link.name}
              onClick={() => {setActiveLink(link.name);setIsSidebarOpen(false);setActiveCategory(null);}}
              className={`block w-full text-left px-4 py-2 rounded-lg ${
                activeLink === link.name
                  ? "bg-darkblue text-white"
                  : "dark:hover:text-white"
              } transition`}
              to={link.path}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Conditionally show categories only on the Articles page */}
        {location.pathname === '/articles' && (
          <div className="p-4 space-y-2">
            <h2 className="text-lg font-bold text-left px-4">Categories</h2>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`block w-full text-left px-4 py-2 rounded-lg ${
                  activeCategory === category
                    ? "bg-darkblue text-white"
                    : "dark:hover:text-white"
                } transition`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CategoriesLinks;
