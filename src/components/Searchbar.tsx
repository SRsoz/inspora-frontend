import React from "react";

type Props = {
  value?: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
};

const SearchBar: React.FC<Props> = ({
  value = "",
  onChange,
  onSubmit,
  placeholder = "Search...",
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSubmit?.();
          }
        }}
        placeholder={placeholder}
        className="w-64 px-3 py-2 border rounded"
        aria-label="Search"
      />
    </form>
  );
};

export default SearchBar;
