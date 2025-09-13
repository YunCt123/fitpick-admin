import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationData {
  current: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

interface UserPaginationProps {
  pagination: PaginationData;
  loading: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const UserPagination: React.FC<UserPaginationProps> = ({
  pagination,
  loading,
  onPageChange,
  onPageSizeChange
}) => {
  const handlePrevPage = () => {
    if (pagination.current > 1) {
      console.log('Going to previous page:', pagination.current - 1);
      onPageChange(pagination.current - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination.current < pagination.totalPages) {
      console.log('Going to next page:', pagination.current + 1);
      onPageChange(pagination.current + 1);
    }
  };

  if (loading || pagination.totalPages <= 0) {
    return null;
  }

  // For single page, show simple total count
  if (pagination.totalPages <= 1 && pagination.totalItems > 0) {
    return (
      <div className="bg-white px-6 py-4 border-t border-gray-200 rounded-b-lg">
        <div className="flex items-center justify-center text-sm text-gray-600">
          <span className="font-medium">
            Total {pagination.totalItems} users
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white px-6 py-4 border-t border-gray-200 rounded-b-lg">
      <div className="flex items-center justify-between">
        {/* Left side - Total count */}
        <div className="flex items-center text-sm text-gray-600">
          <span>
            Total {pagination.totalItems} users
          </span>
        </div>
        
        {/* Right side - Pagination controls */}
        <div className="flex items-center space-x-4">
          {/* Page size selector */}
          <div className="flex items-center space-x-2">
            <select
              value={pagination.pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            >
              <option value={5}>5 / page</option>
              <option value={10}>10 / page</option>
              <option value={20}>20 / page</option>
              <option value={50}>50 / page</option>
            </select>
          </div>

          {/* Page navigation */}
          <div className="flex items-center space-x-1">
            {/* Previous button */}
            <button
              onClick={handlePrevPage}
              disabled={pagination.current <= 1}
              className={`p-2 rounded-md transition-colors ${
                pagination.current <= 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page numbers */}
            {(() => {
              const pages = [];
              const maxVisiblePages = 4;
              let startPage = Math.max(1, pagination.current - Math.floor(maxVisiblePages / 2));
              let endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);
              
              // Adjust start if we're near the end
              if (endPage - startPage < maxVisiblePages - 1) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
              }

              for (let i = startPage; i <= endPage; i++) {
                pages.push(
                  <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      i === pagination.current
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    {i}
                  </button>
                );
              }

              return pages;
            })()}

            {/* Next button */}
            <button
              onClick={handleNextPage}
              disabled={pagination.current >= pagination.totalPages}
              className={`p-2 rounded-md transition-colors ${
                pagination.current >= pagination.totalPages 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Go to page */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Go to</span>
            <input
              type="number"
              min={1}
              max={pagination.totalPages}
              placeholder="1"
              className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const page = parseInt((e.target as HTMLInputElement).value);
                  if (page >= 1 && page <= pagination.totalPages) {
                    onPageChange(page);
                    (e.target as HTMLInputElement).value = '';
                  }
                }
              }}
            />
            <button 
              className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors"
              onClick={(e) => {
                const input = (e.target as HTMLElement).parentElement?.querySelector('input') as HTMLInputElement;
                if (input) {
                  const page = parseInt(input.value);
                  if (page >= 1 && page <= pagination.totalPages) {
                    onPageChange(page);
                    input.value = '';
                  }
                }
              }}
            >
              Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPagination;