import React, { useState } from 'react';
import { useBlogManagement } from '../hooks/useBlogManagement';
import { BlogTable, CreateBlog, UpdateBlog, BlogDetails } from '../components/blog';
import type { Blog } from '../models/BlogModel';

interface BlogFormData {
  title: string;
  content: string;
  categoryid: number;
  status: boolean;
  medias?: {
    mediaUrl: string;
    mediaType: string;
    orderIndex: number;
  }[];
}

const BlogsNew: React.FC = () => {
  // Hook for blog management
  const {
    blogs,
    loading,
    error,
    totalPages,
    currentPage,
    totalBlogs,
    fetchBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    toggleBlogStatus,
    searchBlogs,
    filterByCategory,
    filterByStatus,
    setPage,
    clearError
  } = useBlogManagement();

  // UI State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Modal States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  // Categories for filter
  const categories = [
    { id: 1, name: 'Dinh dưỡng' },
    { id: 2, name: 'Tập luyện' },
    { id: 3, name: 'Sức khỏe' },
    { id: 4, name: 'Công thức' },
    { id: 5, name: 'Lifestyle' }
  ];

  // Stats for status filter
  const statuses = [
    { value: 'all', label: 'Tất cả', count: totalBlogs },
    { value: 'published', label: 'Đã xuất bản', count: blogs.filter(b => b.status === true).length },
    { value: 'draft', label: 'Bản nháp', count: blogs.filter(b => b.status === false).length }
  ];

  // Handlers
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchBlogs(searchTerm);
    } else {
      fetchBlogs();
    }
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    if (status === 'all') {
      filterByStatus(null);
    } else {
      filterByStatus(status === 'published');
    }
  };

  const handleCategoryFilter = (categoryId: string) => {
    setCategoryFilter(categoryId);
    if (categoryId === 'all') {
      filterByCategory(null);
    } else {
      filterByCategory(parseInt(categoryId));
    }
  };

  const handleCreateBlog = async (data: BlogFormData) => {
    return await createBlog(data);
  };

  const handleUpdateBlog = async (id: number, data: Partial<BlogFormData>) => {
    return await updateBlog(id, data);
  };

  const handleDeleteBlog = async (id: number) => {
    return await deleteBlog(id);
  };

  const handleToggleStatus = async (id: number, status: boolean) => {
    return await toggleBlogStatus(id, status);
  };

  const handleViewBlog = (blog: Blog) => {
    setSelectedBlog(blog);
    setShowDetailsModal(true);
  };

  const handleEditBlog = (blog: Blog) => {
    setSelectedBlog(blog);
    setShowUpdateModal(true);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm('');
    fetchBlogs();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý Blog</h1>
          <p className="text-gray-600 mt-2">
            Quản lý các bài viết blog của hệ thống
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
        >
          <span className="mr-2">+</span>
          Tạo blog mới
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <div className="flex">
            <div className="flex-1">
              <p className="text-red-800">{error}</p>
            </div>
            <button
              onClick={clearError}
              className="text-red-800 hover:text-red-900 ml-4"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {statuses.map((status) => (
          <div
            key={status.value}
            className={`bg-white p-6 rounded-lg shadow cursor-pointer transition-colors ${
              statusFilter === status.value ? 'ring-2 ring-indigo-500' : 'hover:shadow-md'
            }`}
            onClick={() => handleStatusFilter(status.value)}
          >
            <h3 className="text-lg font-semibold text-gray-900">{status.label}</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-2">{status.count}</p>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="flex">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm blog theo tiêu đề hoặc nội dung..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700"
              >
                🔍
              </button>
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="px-3 py-2 bg-gray-300 text-gray-700 rounded-md ml-2 hover:bg-gray-400"
                >
                  ✕
                </button>
              )}
            </div>
          </form>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Danh mục:</label>
            <select
              value={categoryFilter}
              onChange={(e) => handleCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Tất cả danh mục</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id.toString()}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Blog Table */}
      <BlogTable
        blogs={blogs}
        loading={loading}
        onEdit={handleEditBlog}
        onDelete={handleDeleteBlog}
        onView={handleViewBlog}
        onToggleStatus={handleToggleStatus}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage <= 1}
              className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              « Trước
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-2 border border-gray-300 rounded-md ${
                  currentPage === i + 1
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Sau »
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <CreateBlog
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateBlog}
        loading={loading}
      />

      <UpdateBlog
        isOpen={showUpdateModal}
        onClose={() => {
          setShowUpdateModal(false);
          setSelectedBlog(null);
        }}
        onSubmit={handleUpdateBlog}
        blog={selectedBlog}
        loading={loading}
      />

      <BlogDetails
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedBlog(null);
        }}
        blog={selectedBlog}
      />
    </div>
  );
};

export default BlogsNew;