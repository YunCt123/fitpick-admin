import { useState, useEffect, useCallback } from 'react';
import { blogService } from '../services/blog.service';
import type { Blog, BlogPost } from '../models/BlogModel';

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

interface UseBlogManagementReturn {
  // State
  blogs: Blog[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  totalBlogs: number;
  
  // Blog management
  fetchBlogs: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: number;
    status?: boolean;
  }) => Promise<void>;
  
  getBlog: (id: number) => Promise<BlogPost | null>;
  createBlog: (data: BlogFormData) => Promise<boolean>;
  updateBlog: (id: number, data: Partial<BlogFormData>) => Promise<boolean>;
  deleteBlog: (id: number) => Promise<boolean>;
  toggleBlogStatus: (id: number, status: boolean) => Promise<boolean>;
  
  // Search and filters
  searchBlogs: (query: string) => Promise<void>;
  filterByCategory: (categoryId: number | null) => void;
  filterByStatus: (status: boolean | null) => void;
  
  // Pagination
  setPage: (page: number) => void;
  
  // UI helpers
  clearError: () => void;
  refreshBlogs: () => Promise<void>;
}

interface BlogFilters {
  search: string;
  category: number | null;
  status: boolean | null;
  page: number;
  limit: number;
}

export const useBlogManagement = (): UseBlogManagementReturn => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalBlogs, setTotalBlogs] = useState(0);
  
  const [filters, setFilters] = useState<BlogFilters>({
    search: '',
    category: null,
    status: null,
    page: 1,
    limit: 10
  });

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const fetchBlogs = useCallback(async (params?: Partial<BlogFilters>) => {
    setLoading(true);
    setError(null);
    
    try {
      const queryParams = { 
        ...filters, 
        ...params,
        // Convert null values to undefined for API
        category: (params?.category !== undefined ? params.category : filters.category) || undefined,
        status: (params?.status !== undefined ? params.status : filters.status) ?? undefined
      };

      const response = await blogService.getAllBlogs(queryParams);
      
      if (response.success) {
        setBlogs(response.data.items);
        setTotalPages(Math.ceil(response.data.totalItems / response.data.pageSize));
        setTotalBlogs(response.data.totalItems);
        
        // Update filters state if new params provided
        if (params) {
          setFilters(prev => ({ ...prev, ...params }));
        }
      } else {
        throw new Error(response.message || 'Không thể tải danh sách blog');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải blog';
      setError(errorMessage);
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const getBlog = useCallback(async (id: number): Promise<BlogPost | null> => {
    try {
      const response = await blogService.getBlogById(id);
      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.message || 'Không thể tải blog');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải blog';
      setError(errorMessage);
      console.error('Error fetching blog:', err);
      return null;
    }
  }, []);

  const createBlog = useCallback(async (data: BlogFormData): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await blogService.createBlog(data);
      if (response.success) {
        await fetchBlogs(); // Refresh list
        return true;
      } else {
        throw new Error(response.message || 'Không thể tạo blog');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tạo blog';
      setError(errorMessage);
      console.error('Error creating blog:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchBlogs]);

  const updateBlog = useCallback(async (id: number, data: Partial<BlogFormData>): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await blogService.updateBlog(id, data);
      if (response.success) {
        await fetchBlogs(); // Refresh list
        return true;
      } else {
        throw new Error(response.message || 'Không thể cập nhật blog');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi cập nhật blog';
      setError(errorMessage);
      console.error('Error updating blog:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchBlogs]);

  const deleteBlog = useCallback(async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await blogService.deleteBlog(id);
      if (response.success) {
        await fetchBlogs(); // Refresh list
        return true;
      } else {
        throw new Error(response.message || 'Không thể xóa blog');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi xóa blog';
      setError(errorMessage);
      console.error('Error deleting blog:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchBlogs]);

  const toggleBlogStatus = useCallback(async (id: number, status: boolean): Promise<boolean> => {
    try {
      const response = await blogService.toggleBlogStatus(id, status);
      if (response.success) {
        await fetchBlogs(); // Refresh list
        return true;
      } else {
        throw new Error(response.message || 'Không thể thay đổi trạng thái blog');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi thay đổi trạng thái';
      setError(errorMessage);
      console.error('Error toggling blog status:', err);
      return false;
    }
  }, [fetchBlogs]);

  const searchBlogs = useCallback(async (query: string) => {
    await fetchBlogs({ search: query, page: 1 });
  }, [fetchBlogs]);

  const filterByCategory = useCallback((categoryId: number | null) => {
    setFilters(prev => ({ ...prev, category: categoryId, page: 1 }));
  }, []);

  const filterByStatus = useCallback((status: boolean | null) => {
    setFilters(prev => ({ ...prev, status, page: 1 }));
  }, []);

  const setPage = useCallback((page: number) => {
    setFilters(prev => ({ ...prev, page }));
  }, []);

  const refreshBlogs = useCallback(async () => {
    await fetchBlogs();
  }, [fetchBlogs]);

  // Auto-fetch when filters change
  useEffect(() => {
    fetchBlogs();
  }, [filters.page, filters.category, filters.status]);

  return {
    // State
    blogs,
    loading,
    error,
    totalPages,
    currentPage: filters.page,
    totalBlogs,
    
    // Methods
    fetchBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    toggleBlogStatus,
    searchBlogs,
    filterByCategory,
    filterByStatus,
    setPage,
    clearError,
    refreshBlogs
  };
};

export default useBlogManagement;