import React, { useState } from "react";
import type { PaymentResponse } from "../models/TransactionModel";
import { useTransactionManagement } from "../hooks/useTransactionManagement";
import { 
  TransactionTable, 
  TransactionDetails, 
  DeleteTransaction,
  UpdateTransactionStatus,
  TransactionStats,
  TransactionFilters
} from "../components/transaction";

const Transactions: React.FC = () => {
  // Modal states
  const [selectedTransaction, setSelectedTransaction] = useState<PaymentResponse | null>(null);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isUpdateStatusModalVisible, setIsUpdateStatusModalVisible] = useState(false);

  // Use custom hook for transaction management logic
  const {
    transactions,
    loading,
    error,
    searchText,
    selectedStatus,
    selectedDateRange,
    pagination,
    stats,
    handleSearch,
    handleStatusChange,
    handleDateRangeChange,
    handleClearFilters,
    handlePageChange,
    updateTransactionStatus,
    deleteTransaction,
    clearError,
  } = useTransactionManagement();

  // Modal handlers
  const handleView = (transaction: PaymentResponse) => {
    setSelectedTransaction(transaction);
    setIsDetailsModalVisible(true);
  };

  const handleEdit = (transaction: PaymentResponse) => {
    setSelectedTransaction(transaction);
    setIsUpdateStatusModalVisible(true);
  };

  const handleDelete = (transaction: PaymentResponse) => {
    setSelectedTransaction(transaction);
    setIsDeleteModalVisible(true);
  };

  const handleUpdateStatusConfirm = async (status: 'PENDING' | 'PAID') => {
    if (selectedTransaction) {
      const result = await updateTransactionStatus(selectedTransaction.paymentid, status);
      if (result.success) {
        setIsUpdateStatusModalVisible(false);
        setSelectedTransaction(null);
      }
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedTransaction) {
      const result = await deleteTransaction(selectedTransaction.paymentid);
      if (result.success) {
        setIsDeleteModalVisible(false);
        setSelectedTransaction(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Transaction Management</h1>
        <p className="text-gray-600">Manage transaction list in the system</p>
      </div>

      {/* Stats Cards */}
      <TransactionStats stats={stats} loading={loading} />

      {/* Filters */}
      <TransactionFilters
        searchText={searchText}
        selectedStatus={selectedStatus}
        selectedDateRange={selectedDateRange}
        onSearchChange={handleSearch}
        onStatusChange={handleStatusChange}
        onDateRangeChange={handleDateRangeChange}
        onClearFilters={handleClearFilters}
      />

      {/* Error display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6">
          <div className="flex justify-between items-center">
            <span className="block sm:inline">{error}</span>
            <button
              onClick={clearError}
              className="text-red-500 hover:text-red-700 text-xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Transaction Table */}
      <TransactionTable
        transactions={transactions}
        loading={loading}
        onView={handleView}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      {transactions.length > 0 && (
        <div className="bg-white px-6 py-4 border-t border-gray-200 rounded-b-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-sm text-gray-700">
                Showing {Math.min((pagination.current - 1) * pagination.pageSize + 1, pagination.totalItems)} to{' '}
                {Math.min(pagination.current * pagination.pageSize, pagination.totalItems)} of{' '}
                {pagination.totalItems} results
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(pagination.current - 1)}
                disabled={pagination.current <= 1}
                className="px-4 py-2 border border-gray-300 text-sm rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
              <span className="text-sm text-gray-700 px-3 py-2">
                Page {pagination.current} of {pagination.totalPages}
              </span>
              <button
                onClick={() => handlePageChange(pagination.current + 1)}
                disabled={pagination.current >= pagination.totalPages}
                className="px-4 py-2 border border-gray-300 text-sm rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transaction Details Modal */}
      <TransactionDetails
        transaction={selectedTransaction}
        isVisible={isDetailsModalVisible}
        onClose={() => {
          setIsDetailsModalVisible(false);
          setSelectedTransaction(null);
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteTransaction
        transaction={selectedTransaction}
        isVisible={isDeleteModalVisible}
        loading={loading}
        onClose={() => {
          setIsDeleteModalVisible(false);
          setSelectedTransaction(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default Transactions;