import api from '../api/axios';
import { BLOG } from '../constants/authURL';
import type { BlogListResponse, Blog, BlogPost } from '../models/BlogModel';
import type { ApiResponse } from '../models/ApiResponse';

interface BlogCreateRequest {
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

interface BlogUpdateRequest {
  title?: string;
  content?: string;
  categoryid?: number;
  status?: boolean;
  medias?: {
    mediaUrl: string;
    mediaType: string;
    orderIndex: number;
  }[];
}

interface BlogQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: number;
  status?: boolean;
  sortBy?: 'createdat' | 'updatedat' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export const blogService = {
  // Get all blogs with pagination and filters
  getAllBlogs: async (params?: BlogQueryParams): Promise<BlogListResponse> => {
    const response = await api.get<BlogListResponse>(BLOG, { params });
    return response.data;
  },

  // Get single blog by ID
  getBlogById: async (id: number): Promise<ApiResponse<BlogPost>> => {
    const response = await api.get<ApiResponse<BlogPost>>(`${BLOG}/${id}`);
    return response.data;
  },

  // Create new blog
  createBlog: async (data: BlogCreateRequest): Promise<ApiResponse<Blog>> => {
    const response = await api.post<ApiResponse<Blog>>(BLOG, data);
    return response.data;
  },

  // Update existing blog
  updateBlog: async (id: number, data: BlogUpdateRequest): Promise<ApiResponse<Blog>> => {
    const response = await api.put<ApiResponse<Blog>>(`${BLOG}/${id}`, data);
    return response.data;
  },

  // Delete blog
  deleteBlog: async (id: number): Promise<ApiResponse<null>> => {
    const response = await api.delete<ApiResponse<null>>(`${BLOG}/${id}`);
    return response.data;
  },

  // Toggle blog status (publish/unpublish)
  toggleBlogStatus: async (id: number, status: boolean): Promise<ApiResponse<Blog>> => {
    const response = await api.patch<ApiResponse<Blog>>(`${BLOG}/${id}/status`, { status });
    return response.data;
  },

  // Get blog categories (if needed)
  getCategories: async (): Promise<ApiResponse<{ categoryid: number; categoryName: string }[]>> => {
    const response = await api.get<ApiResponse<{ categoryid: number; categoryName: string }[]>>(`${BLOG}/categories`);
    return response.data;
  },

  // Search blogs
  searchBlogs: async (query: string, filters?: Omit<BlogQueryParams, 'search'>): Promise<BlogListResponse> => {
    const params = { ...filters, search: query };
    const response = await api.get<BlogListResponse>(`${BLOG}/search`, { params });
    return response.data;
  },

  // Get blog stats (if needed for dashboard)
  getBlogStats: async (): Promise<ApiResponse<{
    total: number;
    published: number;
    draft: number;
    totalViews: number;
  }>> => {
    const response = await api.get<ApiResponse<{
      total: number;
      published: number;
      draft: number;
      totalViews: number;
    }>>(`${BLOG}/stats`);
    return response.data;
  }
};

export default blogService;
