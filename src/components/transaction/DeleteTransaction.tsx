import React, { useState } from 'react';
import { Modal, Button, Input, Alert, Row, Col } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { CreditCard } from "lucide-react";
import type { PaymentResponse } from "../../models/TransactionModel";

interface DeleteTransactionProps {
  transaction: PaymentResponse | null;
  isVisible: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteTransaction: React.FC<DeleteTransactionProps> = ({ 
  transaction, 
  isVisible, 
  loading = false, 
  onClose, 
  onConfirm 
}) => {
  const [confirmText, setConfirmText] = useState('');

  if (!transaction) return null;

  const handleClose = () => {
    setConfirmText('');
    onClose();
  };

  const handleConfirm = () => {
    if (confirmText === 'DELETE') {
      onConfirm();
      setConfirmText('');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const isConfirmValid = confirmText === 'DELETE';

  return (
    <Modal
      title={
        <div style={{ color: '#dc2626', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>
          <DeleteOutlined style={{ marginRight: '8px' }} />
          Delete Transaction
        </div>
      }
      open={isVisible}
      onCancel={handleClose}
      footer={null}
      width={600}
      destroyOnClose
    >
      {/* Warning Alert */}
      <Alert
        message="Warning: This action cannot be undone"
        description="Deleting this transaction will permanently remove it from the system. This action is irreversible."
        type="warning"
        showIcon
        icon={<ExclamationCircleOutlined />}
        style={{ marginBottom: '16px' }}
      />

      {/* Transaction Info */}
      <div style={{ 
        background: '#f8f9fa', 
        padding: '16px', 
        borderRadius: '8px', 
        border: '1px solid #e9ecef',
        marginBottom: '16px'
      }}>
        <Row gutter={16}>
          <Col span={24} style={{ textAlign: 'center', marginBottom: '12px' }}>
            <CreditCard size={32} style={{ color: '#dc2626' }} />
          </Col>
          <Col span={12}>
            <strong>Payment ID:</strong>
            <div>#{transaction.paymentid}</div>
          </Col>
          <Col span={12}>
            <strong>Order Code:</strong>
            <div>{transaction.orderCode}</div>
          </Col>
          <Col span={12} style={{ marginTop: '8px' }}>
            <strong>User:</strong>
            <div>{transaction.user?.fullname || `User ${transaction.userid}`}</div>
          </Col>
          <Col span={12} style={{ marginTop: '8px' }}>
            <strong>Amount:</strong>
            <div style={{ color: '#dc2626', fontWeight: 'bold' }}>
              {formatCurrency(transaction.amount)}
            </div>
          </Col>
        </Row>
      </div>

      {/* Confirmation Input */}
      <div style={{ marginBottom: '16px' }}>
        <p style={{ marginBottom: '8px', color: '#374151' }}>
          To confirm deletion, please type <strong style={{ color: '#dc2626' }}>DELETE</strong> below:
        </p>
        <Input
          placeholder="Type DELETE to confirm"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          style={{ borderColor: isConfirmValid ? '#10b981' : '#d1d5db' }}
        />
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          type="primary"
          danger
          onClick={handleConfirm}
          disabled={!isConfirmValid || loading}
          loading={loading}
        >
          {loading ? 'Deleting...' : 'Delete Transaction'}
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteTransaction;