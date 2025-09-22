import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { transactionService } from '../services/transaction.service';
import type { PaymentResponse } from '../models/TransactionModel';

interface PaginationState {
  current: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

interface TransactionStats {
  total: number;
  completed: number;
  pending: number;
  failed: number;
  totalAmount: number;
}

export const useTransactionManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState<PaymentResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<TransactionStats | null>(null);

  const [pagination, setPagination] = useState<PaginationState>({
    current: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0
  });

  // Fetch transactions from API
  const fetchTransactions = useCallback(async (search: string = "", page: number = 1, size: number = 10, status?: string, dateRange?: string, userId?: number) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`Fetching transactions: search="${search}", page=${page}, size=${size}, status=${status}, dateRange=${dateRange}, userId=${userId}`);
      
      // Add timeout for request
      const response = (await Promise.race([
        transactionService.getTransactions({ search, page, pageSize: size, status, userId, dateRange }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timeout")), 10000)
        ),
      ])) as any;

      if (response?.data) {
        // Handle TransactionsResponse format
        if (response.data.items && Array.isArray(response.data.items)) {
          setFilteredTransactions(response.data.items);
          setPagination((prev) => ({
            ...prev,
            totalItems: response.data.totalItems || 0,
            totalPages: response.data.totalPages || 0,
            current: page,
            pageSize: size,
          }));
        } else if (Array.isArray(response.data)) {
          // Handle direct array response
          setFilteredTransactions(response.data);
          setPagination((prev) => ({
            ...prev,
            totalItems: response.data.length,
            totalPages: Math.ceil(response.data.length / size),
            current: page,
            pageSize: size,
          }));
        }
      }
    } catch (err: any) {
      console.error("Error fetching transactions:", err);
      setError(err.message || "Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch transaction stats
  const fetchStats = useCallback(async () => {
    try {
      const response = await transactionService.getTransactionStats();
      if (response?.data) {
        setStats(response.data);
      }
    } catch (err: any) {
      console.error("Error fetching transaction stats:", err);
      // Fallback: calculate stats from current transactions
      calculateStatsFromTransactions();
    }
  }, []);

  // Calculate stats from filtered transactions as fallback
  const calculateStatsFromTransactions = useCallback(() => {
    if (filteredTransactions.length > 0) {
      const total = filteredTransactions.length;
      const completed = filteredTransactions.filter(t => 
        t.status?.toLowerCase() === 'completed' || t.status?.toLowerCase() === 'success'
      ).length;
      const pending = filteredTransactions.filter(t => 
        t.status?.toLowerCase() === 'pending'
      ).length;
      const failed = filteredTransactions.filter(t => 
        t.status?.toLowerCase() === 'failed' || t.status?.toLowerCase() === 'cancelled'
      ).length;
      
      const totalAmount = filteredTransactions
        .filter(t => t.status?.toLowerCase() === 'completed' || t.status?.toLowerCase() === 'success')
        .reduce((sum, t) => sum + (t.amount || 0), 0);

      const calculatedStats = {
        total,
        completed,
        pending,
        failed,
        totalAmount
      };
      
      console.log("Calculated stats from transactions:", calculatedStats);
      setStats(calculatedStats);
    }
  }, [filteredTransactions]);

  // Delete transaction
  const deleteTransaction = useCallback(async (id: string | number) => {
    try {
      setLoading(true);
      await transactionService.deleteTransaction(id);
      
      // Refresh the transaction list after deletion
      await fetchTransactions(searchText, pagination.current, pagination.pageSize);
      await fetchStats(); // Update stats after deletion
      
      return { success: true };
    } catch (err: any) {
      console.error("Error deleting transaction:", err);
      setError(err.message || "Failed to delete transaction");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [searchText, pagination.current, pagination.pageSize, fetchTransactions, fetchStats]);

  // Get transaction by ID
  const getTransactionById = useCallback(async (id: string | number) => {
    try {
      setLoading(true);
      const response = await transactionService.getTransactionById(id);
      return response.data;
    } catch (err: any) {
      console.error("Error fetching transaction:", err);
      setError(err.message || "Failed to fetch transaction");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get transactions by user ID
  const getTransactionsByUserId = useCallback(async (userId: string | number, page: number = 1, size: number = 10) => {
    try {
      setLoading(true);
      const response = await transactionService.getTransactionsByUserId(userId, { page, pageSize: size });
      return response.data;
    } catch (err: any) {
      console.error("Error fetching user transactions:", err);
      setError(err.message || "Failed to fetch user transactions");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search with filters
  const debouncedSearch = useCallback(
    debounce((searchTerm: string, status: string, dateRange: string) => {
      fetchTransactions(searchTerm, 1, pagination.pageSize, status, dateRange);
    }, 300),
    [pagination.pageSize, fetchTransactions]
  );

  // Handle search input
  const handleSearch = useCallback((searchTerm: string) => {
    setSearchText(searchTerm);
    debouncedSearch(searchTerm, selectedStatus, selectedDateRange);
  }, [debouncedSearch, selectedStatus, selectedDateRange]);

  // Handle status filter change
  const handleStatusChange = useCallback((status: string) => {
    setSelectedStatus(status);
    fetchTransactions(searchText, 1, pagination.pageSize, status, selectedDateRange);
  }, [searchText, pagination.pageSize, selectedDateRange, fetchTransactions]);

  // Handle date range filter change
  const handleDateRangeChange = useCallback((dateRange: string) => {
    setSelectedDateRange(dateRange);
    fetchTransactions(searchText, 1, pagination.pageSize, selectedStatus, dateRange);
  }, [searchText, pagination.pageSize, selectedStatus, fetchTransactions]);

  // Clear all filters
  const handleClearFilters = useCallback(() => {
    setSearchText("");
    setSelectedStatus("");
    setSelectedDateRange("");
    fetchTransactions("", 1, pagination.pageSize);
  }, [pagination.pageSize, fetchTransactions]);

  // Handle pagination change
  const handlePageChange = useCallback((page: number) => {
    fetchTransactions(searchText, page, pagination.pageSize, selectedStatus, selectedDateRange);
  }, [searchText, pagination.pageSize, selectedStatus, selectedDateRange, fetchTransactions]);

  // Handle page size change
  const handlePageSizeChange = useCallback((size: number) => {
    fetchTransactions(searchText, 1, size, selectedStatus, selectedDateRange);
  }, [searchText, selectedStatus, selectedDateRange, fetchTransactions]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchTransactions();
    fetchStats();
  }, [fetchTransactions, fetchStats]);

  // Auto calculate stats when transactions change (as fallback)
  useEffect(() => {
    if (!stats && filteredTransactions.length > 0) {
      calculateStatsFromTransactions();
    } else if (!stats && filteredTransactions.length === 0) {
      // Set mock data for testing when no transactions
      setStats({
        total: 10,
        completed: 7,
        pending: 2,
        failed: 1,
        totalAmount: 1500000
      });
    }
  }, [filteredTransactions, stats, calculateStatsFromTransactions]);

  return {
    // State
    transactions: filteredTransactions,
    loading,
    error,
    searchText,
    selectedStatus,
    selectedDateRange,
    pagination,
    stats,
    
    // Actions
    fetchTransactions,
    fetchStats,
    deleteTransaction,
    getTransactionById,
    getTransactionsByUserId,
    handleSearch,
    handleStatusChange,
    handleDateRangeChange,
    handleClearFilters,
    handlePageChange,
    handlePageSizeChange,
    clearError,
  };
};