// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import UserNavbar from "../../inc/UserNavbar";
// import "./News.css"; // Import external CSS

// function News() {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let isMounted = true;

//     const fetchNews = async () => {
//       try {
//         const apiKey = 'd8d353717712431cb00eb171b6b42020';
//         const response = await axios.get(
//           `https://newsapi.org/v2/everything?q=PM-Kisan+OR+weather&apiKey=${apiKey}`
//         );
//         if (isMounted) {
//           setArticles(response.data.articles || []);
//         }
//       } catch (err) {
//         if (isMounted) setError("Failed to load news.");
//         console.error(err);
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     };

//     fetchNews();
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   if (loading) {
//     return (
//       <div>
//         <UserNavbar />
//         <div className="loader-container">
//           <div className="spinner"></div>
//           <p>Loading agricultural news…</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div>
//         <UserNavbar />
//         <p className="error-message">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <UserNavbar />
//       <div className="news-container">
//         {articles.map((article, index) => (
//           <a
//             key={index}
//             href={article.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="news-card"
//           >
//             {article.urlToImage ? (
//               <img src={article.urlToImage} alt={article.title} className="news-image" />
//             ) : (
//               <div className="news-placeholder">No Image</div>
//             )}
//             <div className="news-content">
//               <h2 className="news-title">{article.title}</h2>
//               <p className="news-description">{article.description}</p>
//               <p className="news-meta">
//                 {new Date(article.publishedAt).toLocaleDateString()} &middot;{" "}
//                 {article.source.name}
//               </p>
//             </div>
//           </a>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default News;
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../../inc/UserNavbar";
import "./News.css";

function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchNews = async () => {
      try {
        const apiKey = 'd8d353717712431cb00eb171b6b42020';
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=PM-Kisan+OR+weather&apiKey=${apiKey}`
        );
        if (isMounted) {
          setArticles(response.data.articles || []);
        }
      } catch (err) {
        if (isMounted) setError("Failed to load news.");
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchNews();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div>
        <UserNavbar />
        <div className="news-container">
          <div className="skeleton-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <div className="skeleton-card loading-skeleton" key={index}>
                <div className="skeleton-image"></div>
                <div className="skeleton-text-large"></div>
                <div className="skeleton-text-small"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <UserNavbar />
        <div className="news-container">
          <p className="no-results-text">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <UserNavbar />
      <div className="news-container">
        <div className="news-header">
          <h1 className="news-title">Latest Agricultural News</h1>
          <p className="news-subtitle">Stay updated with PM-Kisan, weather, and more.</p>
        </div>
        <div className="news-grid">
          {articles.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="news-card"
            >
              {article.urlToImage ? (
                <img src={article.urlToImage} alt={article.title} className="news-card-image" />
              ) : (
                <div className="news-card-image" style={{ 
                  display: "flex", 
                  justifyContent: "center", 
                  alignItems: "center", 
                  backgroundColor: "#f3f4f6", 
                  color: "#6b7280" 
                }}>
                  No Image
                </div>
              )}
              <div className="news-card-content">
                <div className="news-card-badges">
                  <span className="news-category-badge">{article.source.name}</span>
                </div>
                <h2 className="news-card-title">{article.title}</h2>
                <p className="news-card-summary">{article.description}</p>
                <div className="news-card-footer">
                  <div className="news-card-meta">
                    <svg className="news-meta-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6 2a1 1 0 011 1v1h6V3a1 1 0 112 0v1a1 1 0 011 1v2H3V5a1 1 0 011-1V3a1 1 0 112 0v1h6V3a1 1 0 112 0v1zM3 9h14v8a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    </svg>
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </div>
                  <div className="news-read-button">
                    Read More
                    <svg className="news-external-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.293 15.707a1 1 0 001.414 0L19 8.414V13a1 1 0 102 0V5a1 1 0 00-1-1h-8a1 1 0 100 2h4.586l-7.293 7.293a1 1 0 000 1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default News;
