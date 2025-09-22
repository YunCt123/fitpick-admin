import React from 'react';
import { Eye, Trash2 } from 'lucide-react';
import type { PaymentResponse } from '../../models/TransactionModel';

interface TransactionActionsProps {
  transaction: PaymentResponse;
  onView: (transaction: PaymentResponse) => void;
  onDelete: (transaction: PaymentResponse) => void;
}

const TransactionActions: React.FC<TransactionActionsProps> = ({ 
  transaction, 
  onView, 
  onDelete,
}) => {
  const isPending = () => {
    return transaction.status?.toLowerCase() === 'pending';
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => onView(transaction)}
        className="text-blue-600 hover:text-blue-900 transition-colors"
        title="View Details"
      >
        <Eye className="w-4 h-4" />
      </button>
      <button
        onClick={() => onDelete(transaction)}
        className="text-red-600 hover:text-red-900 transition-colors"
        title="Delete Transaction"
        disabled={isPending()}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TransactionActions;