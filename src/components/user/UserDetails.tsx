import React from 'react';
import { Modal, Descriptions, Avatar, Tag, Row, Col, Divider, Button } from 'antd';
import { User, Mail, MapPin, Calendar, IdCard } from 'lucide-react';
import type { User as UserType } from '../../models/UserModel';

interface UserDetailsProps {
  user: UserType | null;
  visible: boolean;
  onClose: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, visible, onClose }) => {
  if (!user) return null;

  // Helper functions
  const getRoleName = (roleId: number): string => {
    switch (roleId) {
      case 1: return 'Admin';
      case 2: return 'Premium ';
      case 3: return 'User';
      default: return 'Unknown';
    }
  };

  const getGenderName = (genderId: number | null): string => {
    switch (genderId) {
      case 1: return 'Male';
      case 2: return 'Female';
      default: return 'Not specified';
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric'
    });
  };

  const getRoleColor = (roleId: number): string => {
    switch (roleId) {
      case 1: return 'red';      // Admin
      case 2: return 'gold';     // Premium User  
      case 3: return 'blue';     // Basic User
      default: return 'default';
    }
  };

  return (
    <Modal
      title={
        <div style={{ color: '#7C3AED', fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
          User Details
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose} size="large" style={{ minWidth: '100px' }}>
          Close
        </Button>
      ]}
      width={700}
      destroyOnHidden
    >
      {/* User Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <Avatar 
          size={80} 
          src={user.avatarUrl} 
          icon={<User />}
          style={{ marginBottom: '16px' }}
        />
        <h3 style={{ margin: '8px 0', fontSize: '20px', fontWeight: 'bold' }}>
          {user.fullname}
        </h3>
        <Tag color={getRoleColor(user.roleId)} style={{ fontSize: '12px', padding: '4px 12px' }}>
          {getRoleName(user.roleId)}
        </Tag>
        <Tag color={user.status ? 'green' : 'red'} style={{ fontSize: '12px', padding: '4px 12px', marginLeft: '8px' }}>
          {user.status ? 'Active' : 'Inactive'}
        </Tag>
      </div>

      <Divider />

      {/* User Information */}
      <Row gutter={[24, 16]}>
        <Col span={24}>
          <Descriptions column={1} bordered size="middle">
            <Descriptions.Item 
              label={
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={16} /> Email
                </span>
              }
            >
              {user.email}
            </Descriptions.Item>
            
            <Descriptions.Item 
              label={
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IdCard size={16} /> User ID
                </span>
              }
            >
              #{user.userid}
            </Descriptions.Item>

            {user.genderId && (
              <Descriptions.Item 
                label={
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <User size={16} /> Gender
                  </span>
                }
              >
                {getGenderName(user.genderId)}
              </Descriptions.Item>
            )}

            {user.age && (
              <Descriptions.Item 
                label={
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={16} /> Age
                  </span>
                }
              >
                {user.age} years old
              </Descriptions.Item>
            )}

            {user.country && (
              <Descriptions.Item 
                label={
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={16} /> Location
                  </span>
                }
              >
                {user.country}
              </Descriptions.Item>
            )}            {(user.height || user.weight) && (
              <>
                {user.height && (
                  <Descriptions.Item label="Height">
                    {user.height} cm
                  </Descriptions.Item>
                )}
                
                {user.weight && (
                  <Descriptions.Item label="Weight">
                    {user.weight} kg
                  </Descriptions.Item>
                )}
              </>
            )}

            <Descriptions.Item label="Email Verified">
              <Tag color={user.isEmailVerified ? 'green' : 'orange'}>
                {user.isEmailVerified ? 'Verified' : 'Not Verified'}
              </Tag>
            </Descriptions.Item>

            <Descriptions.Item label="Created At">
              {formatDate(user.createdat)}
            </Descriptions.Item>

            <Descriptions.Item label="Last Updated">
              {formatDate(user.updatedat)}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>

      {/* Blog Posts Count */}
      {user.blogposts && user.blogposts.length > 0 && (
        <>
          <Divider />
          <div style={{ textAlign: 'center' }}>
            <h4>Blog Posts</h4>
            <Tag color="blue" style={{ fontSize: '14px', padding: '8px 16px' }}>
              {user.blogposts.length} Published Posts
            </Tag>
          </div>
        </>
      )}
    </Modal>
  );
};

export default UserDetails;
