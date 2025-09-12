import React, { useState } from 'react';
import { Modal, Button, Input, Avatar, Alert, Row, Col } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';
import { userService } from '../../services/user.service';
import type { User } from '../../models/UserModel';
import { toast } from 'react-toastify';

interface DeleteUserProps {
  user: User | null;
  isVisible: boolean;
  onClose: () => void;
  onUserDeleted: () => void;
}

const DeleteUser: React.FC<DeleteUserProps> = ({ user, isVisible, onClose, onUserDeleted }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmText, setConfirmText] = useState('');

  const handleDelete = async () => {
    if (!user || confirmText !== 'DELETE') {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await userService.deleteUser(user.userid.toString());
      toast.success(`User "${user.fullname}" has been deleted successfully!`);
      onUserDeleted();
      handleClose();
    } catch (err: any) {
      console.error('Error deleting user:', err);
      const errorMessage = err?.response?.data?.message || 'Failed to delete user';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setConfirmText('');
    setError(null);
    onClose();
  };

  const getRoleName = (roleId: number): string => {
    switch (roleId) {
      case 1: return 'Guest';
      case 2: return 'User';
      case 3: return 'Premium';
      case 4: return 'Admin';
      default: return 'Unknown';
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const isAdmin = user?.roleId === 1; // Admin role ID is 1
  const isConfirmValid = confirmText === 'DELETE';

  return (
    <Modal
      title={
        <div style={{ color: '#dc2626', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>
          <DeleteOutlined style={{ marginRight: '8px' }} />
          Delete User
        </div>
      }
      open={isVisible}
      onCancel={handleClose}
      footer={null}
      width={600}
      destroyOnClose
    >
      {/* Error Alert */}
      {error && (
        <Alert
          message="Delete Error"
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: '16px' }}
        />
      )}

      {/* Warning Alert */}
      <Alert
        message="Warning: This action cannot be undone"
        description={
          <div>
            <p style={{ marginBottom: '8px' }}>
              Deleting this user will permanently remove all their data, including:
            </p>
            <ul style={{ paddingLeft: '16px', margin: 0 }}>
              <li>User profile and settings</li>
              <li>All blog posts and content</li>
              <li>Notifications and activity history</li>
              <li>Spending logs and analytics</li>
            </ul>
          </div>
        }
        type="error"
        showIcon
        icon={<ExclamationCircleOutlined />}
        style={{ marginBottom: '16px' }}
      />

      {/* Admin Protection Alert */}
      {isAdmin && (
        <Alert
          message="Admin Account Protection"
          description="This is an admin account. Deleting admin accounts requires extra caution as it may affect system administration capabilities."
          type="warning"
          showIcon
          style={{ marginBottom: '16px' }}
        />
      )}

      {/* User Info Card */}
      <div style={{ 
        marginBottom: '24px', 
        padding: '16px', 
        backgroundColor: '#f9f9f9', 
        borderRadius: '8px',
        border: '1px solid #e0e0e0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <Avatar
            size={48}
            src={user?.avatarUrl}
            icon={<UserOutlined />}
            style={{ marginRight: '12px' }}
          />
          <div>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600' }}>
              {user?.fullname}
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
              {user?.email}
            </p>
          </div>
        </div>
        
        <Row gutter={[16, 8]} style={{ fontSize: '14px' }}>
          <Col span={12}>
            <span style={{ color: '#666' }}>User ID:</span>
            <span style={{ marginLeft: '8px', fontWeight: '500' }}>{user?.userid}</span>
          </Col>
          <Col span={12}>
            <span style={{ color: '#666' }}>Role:</span>
            <span style={{ marginLeft: '8px', fontWeight: '500' }}>{getRoleName(user?.roleId || 0)}</span>
          </Col>
          <Col span={12}>
            <span style={{ color: '#666' }}>Status:</span>
            <span style={{ 
              marginLeft: '8px', 
              padding: '2px 8px', 
              borderRadius: '12px',
              fontSize: '12px',
              backgroundColor: user?.status ? '#d4edda' : '#f8d7da',
              color: user?.status ? '#155724' : '#721c24'
            }}>
              {user?.status ? 'Active' : 'Inactive'}
            </span>
          </Col>
          <Col span={12}>
            <span style={{ color: '#666' }}>Created:</span>
            <span style={{ marginLeft: '8px', fontWeight: '500' }}>
              {user ? formatDate(user.createdat) : ''}
            </span>
          </Col>
          <Col span={12}>
            <span style={{ color: '#666' }}>Blog Posts:</span>
            <span style={{ marginLeft: '8px', fontWeight: '500' }}>{user?.blogposts?.length || 0}</span>
          </Col>
          <Col span={12}>
            <span style={{ color: '#666' }}>Notifications:</span>
            <span style={{ marginLeft: '8px', fontWeight: '500' }}>{user?.notifications?.length || 0}</span>
          </Col>
        </Row>
      </div>

      {/* Confirmation Input */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
          To confirm deletion, type <span style={{ fontFamily: 'monospace', color: '#dc2626', fontWeight: 'bold' }}>DELETE</span> in the box below:
        </label>
        <Input
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="Type DELETE to confirm"
          size="large"
          status={confirmText && !isConfirmValid ? 'error' : undefined}
          autoComplete="off"
        />
        {confirmText && !isConfirmValid && (
          <div style={{ marginTop: '4px', fontSize: '12px', color: '#dc2626' }}>
            Please type "DELETE" exactly as shown
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <Row gutter={16}>
        <Col span={12}>
          <Button
            block
            size="large"
            onClick={handleClose}
            style={{
              backgroundColor: '#f5f5f5',
              borderColor: '#d9d9d9',
              color: '#000'
            }}
          >
            Cancel
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="primary"
            danger
            block
            size="large"
            loading={loading}
            disabled={!isConfirmValid}
            onClick={handleDelete}
            icon={<DeleteOutlined />}
          >
            {loading ? 'Deleting...' : 'Delete User'}
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

export default DeleteUser;