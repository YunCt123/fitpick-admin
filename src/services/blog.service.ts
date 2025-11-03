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
  pageNumber?: number;
  limit?: number;
  pageSize?: number;
  search?: string;
  category?: number;
  categoryId?: number;
  status?: boolean;
  sortBy?: 'createdat' | 'updatedat' | 'title';
  sortOrder?: 'asc' | 'desc';
  sortDesc?: boolean;
}

export const blogService = {
  // Get all blogs with pagination and filters
  getAllBlogs: async (params?: BlogQueryParams): Promise<BlogListResponse> => {
    // Map frontend params to backend params
    const backendParams: any = {
      pageNumber: params?.pageNumber || params?.page || 1,
      pageSize: params?.pageSize || params?.limit || 10,
      search: params?.search,
      categoryId: params?.categoryId || params?.category,
      sortBy: params?.sortBy || 'createdat',
      sortDesc: params?.sortDesc !== undefined ? params.sortDesc : (params?.sortOrder === 'desc' || true)
    };
    
    // Remove undefined values
    Object.keys(backendParams).forEach(key => 
      backendParams[key] === undefined && delete backendParams[key]
    );

    const response = await api.get(BLOG, { params: backendParams });
    
    // Transform backend response to frontend format
    if (response.data.success && response.data.data) {
      const backendData = response.data.data;
      return {
        success: true,
        message: response.data.message || '',
        data: {
          items: backendData.items || backendData.data || [],
          totalItems: backendData.totalItems || backendData.totalCount || 0,
          totalPages: backendData.totalPages || 0,
          pageSize: backendData.pageSize || backendParams.pageSize || 10,
          pageNumber: backendData.pageNumber || backendData.page || backendParams.pageNumber || 1
        },
        error: null
      };
    }
    return response.data;
  },

  // Get single blog by ID
  getBlogById: async (id: number): Promise<ApiResponse<BlogPost>> => {
    const response = await api.get<ApiResponse<BlogPost>>(`${BLOG}/${id}`);
    return response.data;
  },

  // Create new blog
  createBlog: async (data: BlogCreateRequest): Promise<ApiResponse<Blog>> => {
    // Backend expects FormData for multipart/form-data
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('categoryId', String(data.categoryid));
    formData.append('status', String(data.status ?? true));
    
    // Handle files if present
    if (data.medias && Array.isArray(data.medias)) {
      data.medias.forEach((media) => {
        if (typeof media.mediaUrl === 'object' && media.mediaUrl !== null) {
          formData.append('files', media.mediaUrl as any);
        }
      });
    }
    
    const response = await api.post<ApiResponse<Blog>>(BLOG, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // Update existing blog
  updateBlog: async (id: number, data: BlogUpdateRequest): Promise<ApiResponse<Blog>> => {
    // Backend expects FormData for multipart/form-data
    const formData = new FormData();
    formData.append('title', data.title || '');
    formData.append('content', data.content || '');
    formData.append('categoryId', String(data.categoryid || ''));
    formData.append('status', String(data.status ?? true));
    
    // Handle files if present (assuming medias contains file URLs or File objects)
    if (data.medias && Array.isArray(data.medias)) {
      // If medias are files, append them
      // This is a simplified version - you may need to adjust based on actual media handling
      data.medias.forEach((media) => {
        if (typeof media.mediaUrl === 'object' && media.mediaUrl !== null) {
          formData.append('files', media.mediaUrl as any);
        }
      });
    }
    
    const response = await api.put<ApiResponse<Blog>>(`${BLOG}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
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
