import React from 'react';
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

function Pagination({ currentPage, totalPages, handlePrev, handleNext }) {
  return (
    <div className="flex justify-between items-center mt-4 px-2 md:hidden">
      <span className="text-sm text-[#434652]">
        Page {currentPage} of {totalPages || 1}
      </span>
      <div className="flex gap-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-3 py-1 border border-[#C3C6D4] rounded hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <FaArrowLeftLong />
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-3 py-1 border border-[#C3C6D4] rounded hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <FaArrowRightLong />
        </button>
      </div>
    </div>
  );
}

export default Pagination;