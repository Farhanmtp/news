import React, { useState, useEffect } from "react";
import CardListStyle from "../components/CardListStyle";
import Preferences from "../components/news/Preferences";
import SeeMore from "../components/SeeMore";

function NewsFeed() {
  const [preferences, setPreferences] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const loadPreferences = () => {
      const savedPreferences = localStorage.getItem("userPreferences");
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
    };

    loadPreferences();

    const fetchArticles = () => {
      const fetchedArticles = [
          {
            "id": 1,
            "imageUrl": "https://example.com/image1.jpg",
            "date": "6 hours ago",
            "author": "Author1",
            "category": "Technology",
            "source": "BBC",
            "title": "Tech Innovations in 2025",
            "description": "Explore the technological advancements expected to change the world in 2025."
          },
          {
            "id": 2,
            "imageUrl": "https://example.com/image2.jpg",
            "date": "1 day ago",
            "author": "Author2",
            "category": "Business",
            "source": "NYTimes",
            "title": "Global Business Trends to Watch",
            "description": "A deep dive into the trends shaping the global business landscape this year."
          },
          {
            "id": 3,
            "imageUrl": "https://example.com/image3.jpg",
            "date": "2 days ago",
            "author": "Author3",
            "category": "Health",
            "source": "Guardian",
            "title": "Mental Health Crisis: Addressing the Need",
            "description": "Mental health issues are on the rise. Learn about the steps needed to address this growing crisis."
          },
          {
            "id": 4,
            "imageUrl": "https://example.com/image4.jpg",
            "date": "3 hours ago",
            "author": "Author4",
            "category": "Entertainment",
            "source": "BBC",
            "title": "Top Movies to Watch This Year",
            "description": "Discover the top movies to look forward to in the entertainment industry this year."
          },
          {
            "id": 5,
            "imageUrl": "https://example.com/image5.jpg",
            "date": "5 hours ago",
            "author": "Author5",
            "category": "Science",
            "source": "NYTimes",
            "title": "The Future of Space Exploration",
            "description": "New developments in space exploration are pushing the boundaries of what we know about the universe."
          },
          {
            "id": 6,
            "imageUrl": "https://example.com/image6.jpg",
            "date": "1 day ago",
            "author": "Author2",
            "category": "Pakistan",
            "source": "BBC",
            "title": "Political Shifts in Pakistan: What You Need to Know",
            "description": "As Pakistan undergoes political shifts, we take a closer look at the implications for the region."
          },
          {
            "id": 7,
            "imageUrl": "https://example.com/image7.jpg",
            "date": "2 days ago",
            "author": "Author3",
            "category": "Sports",
            "source": "Guardian",
            "title": "The Rise of Women in Sports",
            "description": "Women athletes are breaking barriers. This article explores their growing influence in the world of sports."
          },
          {
            "id": 8,
            "imageUrl": "https://example.com/image8.jpg",
            "date": "1 hour ago",
            "author": "Author1",
            "category": "World",
            "source": "BBC",
            "title": "Global Politics and Economic Impact of the Pandemic",
            "description": "A detailed analysis of how the pandemic has reshaped global politics and economics."
          },
          {
            "id": 9,
            "imageUrl": "https://example.com/image9.jpg",
            "date": "4 days ago",
            "author": "Author4",
            "category": "Technology",
            "source": "NYTimes",
            "title": "AI Revolution: The Next Frontier",
            "description": "Artificial Intelligence is revolutionizing industries. Here's how AI is changing the way we live and work."
          },
          {
            "id": 10,
            "imageUrl": "https://example.com/image10.jpg",
            "date": "3 hours ago",
            "author": "Author5",
            "category": "Local",
            "source": "Guardian",
            "title": "Local Communities Leading the Charge for Sustainability",
            "description": "Local communities are at the forefront of sustainability efforts, and this article highlights their innovative solutions."
          }
       
      ];

      setArticles(fetchedArticles);
    };

    // Fetch articles when preferences are loaded
    fetchArticles();

    const handleClick = (event) => {
      if (!event.target.closest(".preferences-container")) {
        loadPreferences();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []); 

  const hasNoPreferences =
    preferences?.categories.length === 0 &&
    preferences?.authors.length === 0 &&
    preferences?.sources.length === 0;

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      preferences?.categories.length === 0 ||
      preferences.categories.includes(article.category);
    const matchesAuthor =
      preferences?.authors.length === 0 || preferences.authors.includes(article.author);
    const matchesSource =
      preferences?.sources.length === 0 || preferences.sources.includes(article.source);

    return matchesCategory && matchesAuthor && matchesSource;
  });

  return (
    <section className="container mx-auto px-5 py-10">
      {hasNoPreferences ? (
        <Preferences />
      ) : (
        <>
          <h1 className="text-title dark:text-white light:text-daygray mb-2">
            News Feed
          </h1>

          <div className="lg:grid grid-cols-6 gap-5">
            <div className="col-span-4">
              {filteredArticles.map((article) => (
                <CardListStyle key={article.id} article={article} />
              ))}
            </div>

            <div className="preferences-container col-span-2 hidden sm:block">
              <Preferences />
            </div>
          </div>

          <SeeMore button="Load more" text="Get more news based on your interests" />
        </>
      )}
    </section>
  );
}

export default NewsFeed;
