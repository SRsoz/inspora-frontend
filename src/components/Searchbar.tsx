import React, { useState } from "react";


type SearchBarProps = {
  placeholder?: string;
  onChange?: (value: string) => void;
};


const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search for pictures...",
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);


  return (
    <form
      className={`
        flex items-center
        bg-[#EAE8E8]
        rounded-[1.25rem]
        w-full max-w-[42rem]
        h-[3rem]
        px-[1rem]
        cursor-pointer
      `}
      onSubmit={(e) => e.preventDefault()}
    >
      <img
        src="/search.svg"
        alt="Search icon"
        className="w-5 h-5 mr-3 opacity-70"
      />
      <input
        type="text"
        placeholder={isFocused ? "" : placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="
          outline-none  
          cursor-pointer
          placeholder-[#7D7A7A]
        "
      />
    </form>
  );
};


export default SearchBar;
