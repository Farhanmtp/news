import React from 'react';
import { Link } from 'react-router-dom';

const CardListStyle = ({ article }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-GB', options);  
  };
  return (
    <Link to={`${article.link}`} target='_blank'>
      <div className="rounded-lg dark:bg-darkgray600 bg-white p-6 md:space-x-4 space-y-3 hover:shadow-xl transition-all md:flex my-5">
        {/* Image section with fallback if imageUrl is not available */}
        {article.thumbnail ? (
          <div
          className="bg-cover bg-norepeat bg-center md:w-[30%] min-h-[200px] rounded-lg"
          style={{
            backgroundImage: `url(${article.thumbnail || 'default-image-url.jpg'})`,
          }}
        ></div>
        ):(<div></div>)}

        <div className="md:w-[70%] space-y-3">
          <p className="text-regular dark:text-lightgray400">
            {formatDate(article.pubDate)} {" · "+article.authors || ''}
          </p>
          <div className="text-white flex gap-2 items-center">
            <img
              src={`/sources/${article.source.toLowerCase().replace(" ", "")}-logo.png`} 
              alt={`${article.source} logo`}
              className="h-4"
            />|
            <p className="text-regular dark:text-lightgray400">
              {article.category || ''}
            </p>
          </div>
          <h2 className="dark:text-white text-heading font-medium leading-6">
            {article.title}
          </h2>
          <p className="text-regular dark:text-lightgray400">
            {article.description || ''}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CardListStyle;
