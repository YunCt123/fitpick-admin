import { TransactionStatus } from '../models/TransactionModel';

/**
 * Get display label for transaction status
 */
export const getStatusLabel = (status: string): string => {
  switch (status?.toUpperCase()) {
    case TransactionStatus.PAID:
      return 'Paid';
    case TransactionStatus.PENDING:
      return 'Pending';
    default:
      return status || 'Unknown';
  }
};

/**
 * Check if transaction status is valid
 */
export const isValidStatus = (status: string): boolean => {
  return Object.values(TransactionStatus).includes(status?.toUpperCase() as any);
};

/**
 * Get CSS classes for status badge
 */
export const getStatusBadgeClasses = (status: string): string => {
  switch (status?.toUpperCase()) {
    case TransactionStatus.PAID:
      return 'bg-green-100 text-green-800 border-green-200';
    case TransactionStatus.PENDING:
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

/**
 * Check if transaction can be deleted
 */
export const canDeleteTransaction = (status: string): boolean => {
  return status?.toUpperCase() === TransactionStatus.PENDING;
};

/**
 * Check if transaction status can be updated
 */
export const canUpdateStatus = (currentStatus: string, newStatus: string): boolean => {
  // Only allow PENDING -> PAID transition
  return currentStatus?.toUpperCase() === TransactionStatus.PENDING && 
         newStatus?.toUpperCase() === TransactionStatus.PAID;
};