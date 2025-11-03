import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

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

  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchInput);
      setPage(1); // Återställ till sida 1 när man söker nytt
    }, 500);

    return () => clearTimeout(handler);
  }, [searchInput]);

     const fetchFeed = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: String(page),
        ...(debouncedSearchTerm ? { title: debouncedSearchTerm } : {}),
      });

      const res = await fetch(`http://localhost:4000/api/feed?${query.toString()}`);
      const data = await res.json();

      setFeed(data.feed);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Error fetching feed:", err);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearchTerm]);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchFeed();
    }, 300);
    return () => clearTimeout(delay);
  }, [page, setSearchTerm, fetchFeed]);

  if (loading)
    return <p className="text-center mt-10 text-gray-700">Loading...</p>;

  function setSearchTerm(value: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex flex-col flex-1 w-full px-4 pt-34 max-w-360 mx-auto">
        <div className="flex justify-between mb-12  gap-4">
          <h1 className="text-5xl font-bold text-gray-900">
            See what's new on Inspora
          </h1> 
              <SearchBar onChange={setSearchTerm} />
        </div>

   <div className="flex flex-col items-center flex-wrap m-1 font-poppins h-1300">
   {feed.length > 0 ? (
            feed.map((post) => (
    <article key={post.id} className="m-1">
      <img
        src={post.imageUrl}
        alt={post.title || "Feed image"}

      />
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
