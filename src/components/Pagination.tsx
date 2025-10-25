import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  const buttonClasses = "disabled:opacity-40 cursor-pointer transition hover:scale-105";

  return (
    <nav
      aria-label="Pagination Navigation"
      className="flex items-center justify-center gap-4 text-[#756D6D] mt-6"
    >
      <button
        onClick={() => canPrev && onPageChange(currentPage - 1)}
        disabled={!canPrev}
        aria-label="Previous Page"
        className={buttonClasses}
      >
        <img
          src="/arrow-left.svg"
          alt="Previous"
          className="w-6 h-6"
        />
      </button>

      <span className="text-lg font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => canNext && onPageChange(currentPage + 1)}
        disabled={!canNext}
        aria-label="Next Page"
        className={buttonClasses}
      >
        <img
          src="/arrow-right.svg"
          alt="Next"
          className="w-6 h-6"
        />
      </button>
    </nav>
  );
};

export default Pagination;
