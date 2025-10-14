import React, { useState } from 'react';
import { Modal, Button, Select, Alert, Row, Col } from 'antd';
import { EditOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { TransactionStatus } from '../../models/TransactionModel';
import type { PaymentResponse } from '../../models/TransactionModel';

interface UpdateTransactionStatusProps {
  transaction: PaymentResponse | null;
  isVisible: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm: (status: 'PENDING' | 'PAID') => void;
}

const UpdateTransactionStatus: React.FC<UpdateTransactionStatusProps> = ({ 
  transaction, 
  isVisible, 
  loading = false, 
  onClose, 
  onConfirm 
}) => {
  const [selectedStatus, setSelectedStatus] = useState<'PENDING' | 'PAID'>('PAID');

  if (!transaction) return null;

  const handleClose = () => {
    setSelectedStatus('PAID');
    onClose();
  };

  const handleConfirm = () => {
    onConfirm(selectedStatus);
    setSelectedStatus('PAID');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const currentStatus = transaction.status?.toUpperCase();
  const canUpdate = currentStatus === TransactionStatus.PENDING;

  return (
    <Modal
      title={
        <div style={{ color: '#1890ff', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>
          <EditOutlined style={{ marginRight: '8px' }} />
          Update Transaction Status
        </div>
      }
      open={isVisible}
      onCancel={handleClose}
      footer={null}
      width={600}
      destroyOnClose
    >
      {/* Info Alert */}
      <Alert
        message="Update Transaction Status"
        description="You can only update pending transactions to paid status."
        type="info"
        showIcon
        icon={<CheckCircleOutlined />}
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
            <div style={{ color: '#1890ff', fontWeight: 'bold' }}>
              {formatCurrency(transaction.amount)}
            </div>
          </Col>
          <Col span={12} style={{ marginTop: '8px' }}>
            <strong>Current Status:</strong>
            <div>
              <span style={{
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold',
                backgroundColor: currentStatus === 'PAID' ? '#f6ffed' : '#fff7e6',
                color: currentStatus === 'PAID' ? '#52c41a' : '#fa8c16',
                border: currentStatus === 'PAID' ? '1px solid #b7eb8f' : '1px solid #ffd591'
              }}>
                {currentStatus === 'PAID' ? 'Paid' : 'Pending'}
              </span>
            </div>
          </Col>
        </Row>
      </div>

      {canUpdate ? (
        <>
          {/* Status Selection */}
          <div style={{ marginBottom: '16px' }}>
            <strong style={{ display: 'block', marginBottom: '8px' }}>New Status:</strong>
            <Select
              value={selectedStatus}
              onChange={setSelectedStatus}
              style={{ width: '100%' }}
              size="large"
            >
              <Select.Option value="PENDING">Pending</Select.Option>
              <Select.Option value="PAID">Paid</Select.Option>
            </Select>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <Button onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handleConfirm}
              loading={loading}
              disabled={selectedStatus === currentStatus}
            >
              {loading ? 'Updating...' : 'Update Status'}
            </Button>
          </div>
        </>
      ) : (
        <>
          <Alert
            message="Cannot Update Status"
            description="This transaction status cannot be updated. Only pending transactions can be marked as paid."
            type="warning"
            showIcon
            style={{ marginBottom: '16px' }}
          />
          
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleClose}>
              Close
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default UpdateTransactionStatus;