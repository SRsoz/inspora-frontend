import React, { useState } from "react";

type Props = {
  onSubmit: (searchTerm: string) => void;
  placeholder?: string;
};

const SearchBar: React.FC<Props> = ({
  onSubmit,
  placeholder = "Search for pictures...",
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center bg-[#EAE8E8] rounded-[1.25rem] w-full max-w-80 h-12 px-4 cursor-pointer">
      <img src="/search.svg" alt="Search icon" className="w-5 h-5 mr-3 opacity-70" />
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="outline-none cursor-pointer placeholder-[#7D7A7A]"
        aria-label="Search"
      />
    </form>
  );
};

export default SearchBar;
