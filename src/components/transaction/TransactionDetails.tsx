import React from 'react';
import { Modal, Descriptions, Tag, Row, Col, Divider } from 'antd';
import { CreditCard, User, Calendar, DollarSign } from 'lucide-react';
import type { PaymentResponse } from "../../models/TransactionModel";

interface TransactionDetailsProps {
  transaction: PaymentResponse | null;
  isVisible: boolean;
  onClose: () => void;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({ 
  transaction, 
  isVisible, 
  onClose 
}) => {
  if (!transaction) return null;

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status color for Tag
  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'PAID':
        return 'success';
      case 'PENDING':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Modal
      title={
        <div style={{ color: '#1f2937', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>
          <CreditCard style={{ marginRight: '8px' }} />
          Transaction Details
        </div>
      }
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width={800}
      destroyOnClose
    >
      <Divider style={{ margin: '16px 0' }} />
      
      {/* Basic Info */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={12}>
          <div style={{ 
            textAlign: 'center', 
            padding: '24px 20px', 
            background: '#f8f9fa', 
            borderRadius: '8px',
            height: '120px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <DollarSign size={32} style={{ color: '#10b981', marginBottom: '12px' }} />
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
              {formatCurrency(transaction.amount)}
            </div>
            <div style={{ color: '#6b7280', fontSize: '14px' }}>
              Transaction Amount
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div style={{ 
            textAlign: 'center', 
            padding: '24px 20px', 
            background: '#f8f9fa', 
            borderRadius: '8px',
            height: '120px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ marginBottom: '12px' }}>
              <Tag color={getStatusColor(transaction.status)} style={{ fontSize: '16px', padding: '8px 16px', margin: 0 }}>
                {transaction.status?.toUpperCase() === 'PAID' ? 'Paid' : 'Pending'}
              </Tag>
            </div>
            <div style={{ color: '#6b7280', fontSize: '14px' }}>
              Payment Status
            </div>
          </div>
        </Col>
      </Row>

      <Descriptions
        title="Transaction Information"
        bordered
        column={2}
        size="small"
        labelStyle={{ fontWeight: 'bold', background: '#f8f9fa' }}
      >
        <Descriptions.Item label={<><CreditCard size={16} style={{ marginRight: '4px' }} />Payment ID</>}>
          #{transaction.paymentid}
        </Descriptions.Item>
        <Descriptions.Item label="Order Code">
          {transaction.orderCode}
        </Descriptions.Item>
        <Descriptions.Item label={<><User size={16} style={{ marginRight: '4px' }} />User</>}>
          {transaction.user?.fullname || `User ${transaction.userid}`}
        </Descriptions.Item>
        <Descriptions.Item label="User Email">
          {transaction.user?.email || 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label={<><Calendar size={16} style={{ marginRight: '4px' }} />Transaction Date</>}>
          {formatDate(transaction.transactionDatetime)}
        </Descriptions.Item>
        <Descriptions.Item label="Payment Link ID">
          <span style={{ wordBreak: 'break-all' }}>{transaction.paymentLinkId}</span>
        </Descriptions.Item>
        <Descriptions.Item label="Description" span={2}>
          {transaction.description || 'No description'}
        </Descriptions.Item>
        {transaction.checkoutUrl && (
          <Descriptions.Item label="Checkout URL" span={2}>
            <a
              href={transaction.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ wordBreak: 'break-all' }}
            >
              {transaction.checkoutUrl}
            </a>
          </Descriptions.Item>
        )}
        <Descriptions.Item label="Created At">
          {formatDate(transaction.createdat)}
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          {formatDate(transaction.updatedat)}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default TransactionDetails;