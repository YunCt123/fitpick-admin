import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { userService } from '../services/user.service';
import type { User } from '../models/UserModel';

interface PaginationState {
  current: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export const useUserManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [pagination, setPagination] = useState<PaginationState>({
    current: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0
  });

  // Fetch users from API
  const fetchUsers = useCallback(async (search: string = "", page: number = 1, size: number = 10) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`Fetching users: search="${search}", page=${page}, size=${size}`);
      
      // Add timeout for request
      const response = (await Promise.race([
        userService.getUsers({ search, page, pageSize: size }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timeout")), 10000)
        ),
      ])) as any;

      if (response?.data) {
        // Handle UsersResponse format
        if (response.data.items && Array.isArray(response.data.items)) {
          setFilteredUsers(response.data.items);
          setPagination((prev) => ({
            ...prev,
            totalItems: response.data.totalItems || 0,
            totalPages: response.data.totalPages || 0,
            current: page,
            pageSize: size
          }));
        }
        // Handle direct array format (fallback)
        else if (Array.isArray(response.data)) {
          setFilteredUsers(response.data);
          setPagination((prev) => ({
            ...prev,
            totalItems: response.totalCount || response.data.length,
            totalPages: Math.ceil((response.totalCount || response.data.length) / size),
            current: page,
            pageSize: size
          }));
        }
        setError(null);
      }
    } catch (err: any) {
      console.error("Error fetching users:", err);
      console.error("Error details:", err?.response);

      let errorMessage = "Failed to load users";
      if (err?.message?.includes("timeout")) {
        errorMessage = "Server response timeout";
      } else if (err?.message?.includes("Network Error")) {
        errorMessage = "Cannot connect to server";
      } else if (err?.code === "ERR_NETWORK") {
        errorMessage = "Network error or CORS issue";
      }

      setError(errorMessage);
      setFilteredUsers([]);
      setPagination((prev) => ({
        ...prev,
        totalItems: 0,
        totalPages: 0,
      }));
    } finally {
      setLoading(false);
    }
  }, []);

  // Load users on component mount only
  useEffect(() => {
    fetchUsers(searchText, 1, pagination.pageSize);
  }, []); // Only run on mount

  // Debounced search handler
  const handleSearch = useCallback(
    debounce((query: string) => {
      setSearchText(query);
      // Reset to page 1 when searching and fetch immediately
      fetchUsers(query, 1, pagination.pageSize);
    }, 500),
    [fetchUsers, pagination.pageSize]
  );

  const handleRetryFetch = () => {
    fetchUsers(searchText, pagination.current, pagination.pageSize);
  };

  // Pagination handlers
  const handlePageChange = (page: number) => {
    console.log('handlePageChange called with page:', page);
    console.log('Current pagination state:', pagination);
    if (page >= 1 && page <= pagination.totalPages) {
      // Directly call fetchUsers with new page instead of using useEffect
      fetchUsers(searchText, page, pagination.pageSize);
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    // Reset to page 1 and fetch with new page size
    fetchUsers(searchText, 1, newPageSize);
  };

  // Refresh data after CRUD operations
  const refreshUsers = () => {
    fetchUsers(searchText, pagination.current, pagination.pageSize);
  };

  return {
    // State
    searchText,
    filteredUsers,
    loading,
    error,
    pagination,
    
    // Actions
    handleSearch,
    handleRetryFetch,
    handlePageChange,
    handlePageSizeChange,
    refreshUsers,
    fetchUsers
  };
};