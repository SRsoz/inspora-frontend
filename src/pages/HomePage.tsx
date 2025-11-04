import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
const API_URL = import.meta.env.VITE_API_URL! || "http://localhost:4001";
interface FeedItem {
  id: string;
  title: string;
  imageUrl: string;
  user?: string;
  source: "unsplash" | "user";
  photographerName?: string;
}

const Homepage: React.FC = () => {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const fetchFeed = async (term: string) => {
    console.log(API_URL)
    setLoading(true);

    try {
      const query = new URLSearchParams({
        page: String(page),
        ...(term ? { title: term } : {})
      }).toString();
      
      const res = await fetch(`${API_URL}/api/feed${query ? `?${query}` : ''}`);
      const data = await res.json();
      
      setFeed(data.feed || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching feed:", err);
      setFeed([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchFeed(searchTerm);
  }, [page]);
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPage(1);
    fetchFeed(term);
  };
  
  if (loading) {
    return <p className="text-center mt-10 text-gray-700">Loading...</p>;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex flex-col flex-1 w-full px-4 pt-34 max-w-360 mx-auto">
        <div className="flex justify-between flex-col md:flex-row items-center mb-12 gap-4">
          <h1 className="text-5xl font-bold text-gray-900">
            See what's new on Inspora
          </h1>
          <SearchBar onSubmit={handleSearch} />
        </div>

        <div className="flex flex-col items-center flex-wrap m-1 font-poppins h-1300">
          {feed.length > 0 ? (
            feed.map((post) => (
              <article key={post.id} className="m-1">
                <img src={post.imageUrl} alt={post.title || "Feed image"} />
                <div className="p-1">
                  <p className="text-sm font-semibold text-gray-600 w-64">
                    {post.title}
                  </p>
                  <p className="text-xs text-gray-400">
                    {post.source === "unsplash"
                      ? `Photo by ${post.photographerName} on Unsplash`
                      : `By ${post.user}`}
                  </p>
                </div>
              </article>
            ))
          ) : (
            <p className="text-gray-500 mt-8">No results found.</p>
          )}
        </div>

        <div className="mt-8 mb-8 font-poppins">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </main>
    </div>
  );
};

export default Homepage;
