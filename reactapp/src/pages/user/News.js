import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "lucide-react";

function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchNews = async () => {
      try {
        const apiKey = process.env.REACT_APP_NEWS_API_KEY;
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=agriculture OR farming OR crop&language=en&sortBy=publishedAt&pageSize=12&apiKey=${apiKey}`
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
    return () => (isMounted = false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader className="animate-spin mr-2" />
        <span>Loading agricultural news…</span>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600 text-center">{error}</p>;
  }

  return (
    <div className="p-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, idx) => (
        <a
          key={idx}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow"
        >
          {article.urlToImage ? (
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}

          <div className="p-4 space-y-2">
            <h2 className="font-semibold text-base">{article.title}</h2>
            <p className="text-sm text-gray-700 line-clamp-3">{article.description}</p>
            <p className="text-xs text-gray-500">
              {new Date(article.publishedAt).toLocaleDateString()} &middot;{" "}
              {article.source.name}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}

export default News;
