import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-4 py-2 mx-1 rounded-md 
            ${i === currentPage ? 'bg-[#b53838] text-white font-semibold' : 'bg-[#fdecec] text-[#b53838]'}
            hover:bg-[#b53838] hover:text-white transition duration-300 ease-in-out`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center my-6">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-1 rounded-md bg-[#fdecec] text-[#b53838] hover:bg-[#b53838] hover:text-white transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      
      {renderPageNumbers()}

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-1 rounded-md bg-[#fdecec] text-[#b53838] hover:bg-[#b53838] hover:text-white transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
