import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ArticlesListing from './pages/ArticlesListing';
import NewsFeed from './pages/NewsFeed';
import NotFound from './pages/NotFound';
import BackToTop from './components/BackToTop';

function App() {
    return (
      <>
        <Header />
        <Routes>
            <Route path="/" element={<NewsFeed />} />
            <Route path="/articles" element={<ArticlesListing />} />
            <Route path="*" element={<div className="p-4 text-center"><NotFound /></div>} />
        </Routes>
        <BackToTop />
      </> 
    );
}

export default App;
