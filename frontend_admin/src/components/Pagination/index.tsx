import React from "react";

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
    // Generate an array of page numbers to display
    const getPageNumbersToShow = () => {
        const pagesToShow = [1]; // Always show the first page

        // Show the first page + 1
        if (currentPage > 2) {
            pagesToShow.push(2);
        }

        // Show current page - 1, current page, and current page + 1
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            if (i > 1 && i < totalPages && !pagesToShow.includes(i)) {
                pagesToShow.push(i);
            }
        }

        // Show the last page - 1
        if (currentPage < totalPages - 1) {
            if (!pagesToShow.includes(totalPages - 1)) {
                pagesToShow.push(totalPages - 1);
            }
        }

        // Always show the last page
        if (totalPages > 1 && !pagesToShow.includes(totalPages)) {
            pagesToShow.push(totalPages);
        }

        return pagesToShow;
    };

    const pageNumbersToShow = getPageNumbersToShow();

    return (
        <div className="flex justify-center  item-center space-x-4 mt-4 ">
            {/* Previous Button */}
            <button
                className={`px-4 py-2 ${
                    currentPage === 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-700"
                } text-white rounded`}
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            {/* Page Numbers */}
            {pageNumbersToShow.map((page) => (
                <button
                    key={page}
                    className={`px-4 py-2 ${
                        currentPage === page
                            ? "bg-blue-500 text-white"
                            : "bg-gray-300 hover:bg-blue-700"
                    } rounded`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            {/* Next Button */}
            <button
                className={`px-4 py-2 ${
                    currentPage === totalPages
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-700"
                } text-white rounded`}
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;

