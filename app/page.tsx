"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface NewsResponse {
  totalArticles: number;
  articles: Article[];
}

interface Article {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: Source;
}

interface Source {
  name: string;
  url: string;
}

export default function NewsCards() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [fetchUrl, setFetchUrl] = useState<string>(`/api/search?query=example`); // Default query

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await fetch(fetchUrl);
        const data: NewsResponse = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [fetchUrl]);

  const handleSearch = () => {
    setFetchUrl(`/api/search?query=${encodeURIComponent(searchTerm)}`);
  };

  if (loading) {
    return <div className="text-center py-20 text-lg">Loading...</div>;
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-black border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <a href="/" className="flex-shrink-0 text-2xl font-bold text-black dark:text-white">
                Acowale News
              </a>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="border-b-2 border-transparent text-black hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Home
                </a>
                <a href="#" className="border-b-2 border-transparent text-black hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 text-sm font-medium">
                  World
                </a>
                <a href="#" className="border-b-2 border-transparent text-black hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Technology
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
              />
              <button onClick={handleSearch} className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-md">Search</button>
            </div>
          </div>
        </div>
      </nav>

      {/* News Cards */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <h1 className="text-3xl font-extrabold text-black dark:text-white mb-8 text-center">Latest News</h1>
        <div className="grid lg:grid-cols-2 lg:gap-y-16 gap-10">
          {articles.map((article, index) => (
            <a key={index} className="group block rounded-xl overflow-hidden focus:outline-none" href={article.url} target="_blank" rel="noopener noreferrer">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                <div className="shrink-0 relative rounded-xl overflow-hidden w-full sm:w-56 h-44">
                  <Image
                    className="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out absolute top-0 start-0 object-cover rounded-xl"
                    src={article.image}
                    alt={article.title}
                    width={320}
                    height={180}
                    layout="responsive"
                  />
                </div>
                <div className="grow">
                  <h3 className="text-xl font-semibold text-gray-600 group-hover:text-black">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-black dark:text-neutral-400">
                    {article.description}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 group-hover:underline group-focus:underline font-medium dark:text-blue-500">
                    Read more
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
