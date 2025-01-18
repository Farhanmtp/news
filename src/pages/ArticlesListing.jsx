import React, { useState, useEffect } from 'react';
import CardListStyle from '../components/CardListStyle';
import SeeMore from '../components/SeeMore';
import Filter from '../components/Filter';
import { fetchAllNews } from '../../utils/fetchNews';
import { useSearch } from '../components/SearchProvider';

const ArticlesListing = () => {
  const { searchTerm } = useSearch();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedSources, setSelectedSources] = useState({
    BBC: false,
    Guardian: false,
    NYTimes: false,
  });
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [isProgressVisible, setIsProgressVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingProgress, setLoadingProgress] = useState(0); 
  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsProgressVisible(true);
        setLoadingProgress(0); 

        const news = await fetchAllNews(currentPage, {
          sources: selectedSources,
          date: selectedDate,
          author: selectedAuthor,
        });

        setArticles((prevArticles) => [...prevArticles, ...news]);
        setFilteredArticles((prevArticles) => [...prevArticles, ...news]);

        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          if (progress >= 100) {
            clearInterval(interval);
          }
          setLoadingProgress(progress);
        }, 100);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setIsProgressVisible(false);
        setLoadingProgress(100); 
      }
    };

    fetchArticles();
  }, [currentPage, selectedSources, selectedDate, selectedAuthor]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = articles;

      // Filter by sources
      const activeSources = Object.keys(selectedSources).filter((key) => selectedSources[key]);
      if (activeSources.length > 0) {
        filtered = filtered.filter((article) =>
          activeSources.includes(article.source)
        );
      }

      // Filter by date
      if (selectedDate) {
        filtered = filtered.filter(
          (article) =>
            new Date(article.date).toDateString() ===
            new Date(selectedDate).toDateString()
        );
      }

      // Filter by author
      if (selectedAuthor) {
        filtered = filtered.filter((article) =>
          article.author.toLowerCase().includes(selectedAuthor.toLowerCase())
        );
      }

      // Filter by search term
      if (searchTerm) {
        filtered = filtered.filter(
          (article) =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.content?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredArticles(filtered);
    };

    applyFilters();
  }, [articles, searchTerm, selectedSources, selectedDate, selectedAuthor]);

  return (
    <section className="container mx-auto px-5 py-10">
      {/* Loading Bar */}
      {isProgressVisible && (
        <div className="w-full h-1 bg-gray-200 fixed top-0 left-0 z-50">
          <div
            className="dark:bg-darkblue bg-lightblue h-full animate-grow"
            style={{
              width: `${loadingProgress}%`,
            }}
          />
        </div>
      )}

      <Filter
        selectedSources={selectedSources}
        setSelectedSources={setSelectedSources}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedAuthor={selectedAuthor}
        setSelectedAuthor={setSelectedAuthor}
      />
      {searchTerm && (
        <h1 className="text-title dark:text-white light:text-daygray mb-2">
          Search: <b>{searchTerm}</b>
        </h1>
      )}
      <div className="mx-auto xl:w-[80%] w-[100%]">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article, index) => (
            <CardListStyle key={index} article={article} />
          ))
        ) : (
          <p className="text-heading dark:text-white text-center py-10">No articles found.</p>
        )}
      </div>
      <SeeMore text="Want to see more?" button="Load more" onClick={() => setCurrentPage((prev) => prev + 1)} />
    </section>
  );
};

export default ArticlesListing;
