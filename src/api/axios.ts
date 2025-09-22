import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiResponse } from '../models/ApiResponse.tsx';

const apiUrl = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Nếu data là FormData, xóa Content-Type để axios tự set
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  <T>(response: AxiosResponse<ApiResponse<T>>): AxiosResponse<T> => {
    return response as AxiosResponse<T>;
  },
  (error) => {
    // Enhanced error logging
    if (error.response) {
      console.error('API Error Response:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          data: error.config?.data
        }
      });
    } else if (error.request) {
      console.error('API Network Error:', error.request);
    } else {
      console.error('API Setup Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);



// Common API utility functions
export const apiUtils = {
  /**
   * Generic GET request
   * @param url - API endpoint
   * @param params - Query parameters
   * @param config - Additional axios config
   */
  async get<T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const response = await api.get(url, { ...config, params });
    return response as AxiosResponse<T>;
  },

  /**
   * Generic POST request
   * @param url - API endpoint
   * @param data - Request body
   * @param config - Additional axios config
   */
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise< AxiosResponse<T>> {
    const response = await api.post(url, data, config);
    return response as AxiosResponse<T>;
  },

  /**
   * Generic PUT request
   * @param url - API endpoint
   * @param data - Request body
   * @param config - Additional axios config
   */
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise< AxiosResponse<T>>  {
    const response = await api.put(url, data, config);
    return response  as AxiosResponse<T>
  },

  /**
   * Generic DELETE request
   * @param url - API endpoint
   * @param config - Additional axios config
   */
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise< AxiosResponse<T>>  {
    const response = await api.delete(url, config);
    return response as AxiosResponse<T>
  },

  /**
   * Generic PATCH request
   * @param url - API endpoint
   * @param data - Request body
   * @param config - Additional axios config
   */
  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await api.patch(url, data, config);
    return response.data;
  },

  /**
   * Upload file(s)
   * @param url - API endpoint
   * @param files - File or array of files to upload
   * @param config - Additional axios config
   */
  async uploadFiles<T>(url: string, files: File | File[], config?: AxiosRequestConfig): Promise<T> {
    const formData = new FormData();
    
    if (Array.isArray(files)) {
      files.forEach((file, index) => {
        formData.append(`file${index}`, file);
      });
    } else {
      formData.append('file', files);
    }

    const response = await api.post(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};


export default api;