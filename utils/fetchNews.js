import axios from "axios";
import { standardizeCategory } from "./categoryUtils";

/**
 * News articles from the Guardian API with pagination.
 * @param {number} page The current page number for pagination.
 * @returns {Promise<Array>} An array of news articles with selected fields.
 */
export const fetchGuardianNews = async (page = 1, searchTerm = '') => {
  const apiUrl = `https://content.guardianapis.com/search?api-key=7d530b1f-e7b9-491c-a3d7-bcb19536749f&show-fields=thumbnail&show-references=author&show-tags=contributor&page=${page}&q=${searchTerm}`;

  try {
    const response = await axios.get(apiUrl);
    const articles = response.data.response.results;

    return articles.map((article) => ({
      title: article.webTitle,
      link: article.webUrl,
      thumbnail: article.fields?.thumbnail || null,
      authors: article.tags.map((tag) => tag.webTitle).join(", "),
      category: standardizeCategory(article.pillarName),
      pubDate: article.webPublicationDate,
      source: "Guardian",
    }));
  } catch (error) {
    console.error("Error fetching Guardian news:", error);
    return [];
  }
};


/**
 * News articles from the New York Times API with pagination.
 * @param {number} page The current page number for pagination.
 * @returns {Promise<Array>} An array of news articles with selected fields.
 */
export const fetchNYTimesNews = async (page = 1, searchTerm = '') => {
  const apiUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=PoiPgTFMBn3wXsa0eOZelvvkpFkTK4GG&page=${page}&q=${searchTerm}`;

  try {
    const response = await axios.get(apiUrl);
    const articles = response.data.response.docs;

    const filteredArticles = articles.filter(
      (article) => article.document_type === "article"
    );

    return filteredArticles.map((article) => ({
      title: article.abstract,
      link: article.web_url,
      description: article.lead_paragraph,
      thumbnail: article.multimedia.find(
        (media) => media.subtype === "xlarge"
      )?.url
        ? `https://www.nytimes.com/${article.multimedia.find(
            (media) => media.subtype === "xlarge"
          ).url}`
        : null,
      pubDate: article.pub_date,
      documentType: article.document_type,
      authors: article.byline?.original || "Unknown",
      category: standardizeCategory(article.section_name || "General"),
      source: "NYTimes",
    }));
  } catch (error) {
    console.error("Error fetching New York Times news:", error);
    return [];
  }
};


/**
 * News articles from the BBC News API with pagination.
 * @param {number} page The current page number for pagination.
 * @returns {Promise<Array>} An array of news articles with selected fields.
 */
export const fetchBBCNews = async (page = 1, searchTerm = '') => {
  const apiUrl = `https://newsapi.org/v2/top-headlines?apiKey=aac0163644fb4c79987b8e003103aaa3&sources=bbc-news&page=${page}&q=${searchTerm}`;

  try {
    const response = await axios.get(apiUrl);
    const articles = response.data.articles;

    return articles.map((article) => ({
      title: article.title,
      link: article.url,
      thumbnail: article.urlToImage || null,
      authors: article.author || "BBC News",
      category: "General", // BBC News doesn't provide categories
      pubDate: article.publishedAt,
      description: article.description,
      source: "BBC",
    }));
  } catch (error) {
    console.error("Error fetching BBC news:", error);
    return [];
  }
};


/**
 * Filter valid news articles, excluding web stories or unwanted content.
 * @param {Array} articles The array of articles to filter.
 * @returns {Array} Filtered and valid news articles.
 */
const filterValidArticles = (articles) => {
  return articles.filter((article) => {
    const isWebStory = article.title && article.title.toLowerCase().includes("web story");
    return !isWebStory; 
  });
};

/**
 * Shuffle an array randomly using the Fisher-Yates algorithm.
 * @param {Array} array The array to shuffle.
 * @returns {Array} A new shuffled array.
 */
const shuffleArray = (array) => {
  const shuffled = [...array]; 
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Fetch and merge articles from selected sources with pagination.
 * If no filters are selected, fetch from all sources and return merged and shuffled results.
 * 
 * @param {number} page The current page number for pagination.
 * @param {Object} filters The active filters including sources, date, and author.
 * @returns {Promise<Array>} Combined, filtered, and shuffled news articles.
 */
export const fetchAllNews = async (page = 1, filters = {}) => {
  const { searchTerm, sources = {}, date, author } = filters;

  const sourceFetchers = [];
  if (Object.values(sources).every((isSelected) => !isSelected)) {
    sourceFetchers.push(fetchBBCNews(page, searchTerm), fetchGuardianNews(page, searchTerm), fetchNYTimesNews(page, searchTerm));
  } else {
    if (sources.BBC) sourceFetchers.push(fetchBBCNews(page, searchTerm));
    if (sources.Guardian) sourceFetchers.push(fetchGuardianNews(page, searchTerm));
    if (sources.NYTimes) sourceFetchers.push(fetchNYTimesNews(page, searchTerm));
  }

  try {
    const results = await Promise.all(sourceFetchers);
    const filteredResults = results
      .map(filterValidArticles) 
      .flat(); 

    const finalFilteredResults = filteredResults.filter((article) => {
      const matchesDate = date ? new Date(article.pubDate).toISOString().startsWith(date) : true;
      const matchesAuthor = author ? article.authors.toLowerCase().includes(author.toLowerCase()) : true;
      return matchesDate && matchesAuthor;
    });

    return shuffleArray(finalFilteredResults);
  } catch (error) {
    console.error("Error fetching news from selected sources:", error);
    return [];
  }
};
