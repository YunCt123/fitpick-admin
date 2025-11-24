import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber, Button, Row, Col, Avatar } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import { userService } from '../../services/user.service';
import type { User as UserType } from '../../models/UserModel';
import { toast } from 'react-toastify';
import { getRoleName, getRoleOptions } from '../../utils/roleUtils';

interface UpdateUserProps {
  user: UserType | null;
  isVisible: boolean;
  onClose: () => void;
  onUserUpdated: () => void;
}

const UpdateUser: React.FC<UpdateUserProps> = ({ user, isVisible, onClose, onUserUpdated }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Initialize form when user changes
  useEffect(() => {
    if (user && isVisible) {
      form.setFieldsValue({
        fullName: user.fullname || '',
        email: user.email || '',
        roleId: user.roleId || 3,
        genderId: user.genderId || 1,
        age: user.age,
        height: user.height,
        weight: user.weight,
        country: user.country,
        city: '', // User model doesn't have city field
      });
    }
  }, [user, isVisible, form]);

  const handleSubmit = async (values: any) => {
    if (!user) return;

    setLoading(true);
    try {
      // Prepare FormData similar to CreateUser
      const userData = new FormData();

      // Add required fields
      userData.append("fullName", values.fullName);
      userData.append("email", values.email);
      userData.append("roleId", values.roleId.toString());
      
      // Add optional fields only if they have values
      if (values.genderId !== null && values.genderId !== undefined) {
        userData.append("genderId", values.genderId.toString());
      }
      
      if (values.age !== null && values.age !== undefined) {
        userData.append("age", values.age.toString());
      }
      
      if (values.height !== null && values.height !== undefined) {
        userData.append("height", values.height.toString());
      }
      
      if (values.weight !== null && values.weight !== undefined) {
        userData.append("weight", values.weight.toString());
      }
      
      if (values.country) {
        userData.append("country", values.country);
      }
      
      if (values.city) {
        userData.append("city", values.city);
      }

      await userService.updateUser(user.userid.toString(), userData);
      
      toast.success('User updated successfully!');
      onUserUpdated();
      onClose();
    } catch (error: any) {
      console.error('Error updating user:', error);
      toast.error(error?.response?.data?.message || 'Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={
        <div style={{ color: '#7C3AED', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>
          <EditOutlined style={{ marginRight: '8px' }} />
          Update User
        </div>
      }
      open={isVisible}
      onCancel={handleClose}
      footer={null}
      width={650}
      destroyOnClose
    >
      {/* User Info Display */}
      <div style={{ 
        marginBottom: '24px', 
        padding: '16px', 
        backgroundColor: '#f8faff', 
        borderRadius: '8px',
        border: '1px solid #e6f3ff'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar
            size={48}
            src={user?.avatarUrl}
            icon={<UserOutlined />}
            style={{ border: '2px solid #7C3AED' }}
          />
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600', color: '#1a1a1a' }}>
              Editing: {user?.fullname}
            </h4>
            <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#666' }}>
              <span>ID: {user?.userid}</span>
              <span>Role: {user?.roleId ? getRoleName(user.roleId) : 'Unknown'}</span>
              <span>Created: {user ? new Date(user.createdat).toLocaleDateString() : ''}</span>
              <span style={{
                padding: '2px 8px',
                borderRadius: '12px',
                backgroundColor: user?.status ? '#d4edda' : '#f8d7da',
                color: user?.status ? '#155724' : '#721c24'
              }}>
                {user?.status ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        scrollToFirstError
        validateTrigger={['onBlur', 'onChange']}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={<span style={{ color: '#000' }}>Full Name <span style={{ color: 'red' }}>*</span></span>}
              name="fullName"
              rules={[{ required: true, message: 'Please enter full name!' }]}
            >
              <Input placeholder="Enter full name" size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<span style={{ color: '#000' }}>Email <span style={{ color: 'red' }}>*</span></span>}
              name="email"
              rules={[
                { required: true, message: 'Please enter email!' },
                { type: 'email', message: 'Invalid email format!' }
              ]}
            >
              <Input placeholder="Enter email address" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label={<span style={{ color: '#000' }}>Age</span>}
              name="age"
            >
              <InputNumber
                placeholder="Enter age"
                size="large"
                style={{ width: '100%' }}
                min={1}
                max={150}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={<span style={{ color: '#000' }}>Height (cm)</span>}
              name="height"
            >
              <InputNumber
                placeholder="Enter height"
                size="large"
                style={{ width: '100%' }}
                min={50}
                max={300}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={<span style={{ color: '#000' }}>Weight (kg)</span>}
              name="weight"
            >
              <InputNumber
                placeholder="Enter weight"
                size="large"
                style={{ width: '100%' }}
                min={1}
                max={1000}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={<span style={{ color: '#000' }}>Country</span>}
              name="country"
            >
              <Input placeholder="Enter country" size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<span style={{ color: '#000' }}>City</span>}
              name="city"
            >
              <Input placeholder="Enter city" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={<span style={{ color: '#000' }}>Role</span>}
              name="roleId"
            >
              <Select
                placeholder="Select role"
                size="large"
                options={getRoleOptions()}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<span style={{ color: '#000' }}>Gender</span>}
              name="genderId"
            >
              <Select
                placeholder="Select gender"
                size="large"
                options={[
                  { value: 1, label: 'Male' },
                  { value: 2, label: 'Female' }
                ]}
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: '10px' }}>
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
              htmlType="submit"
              block
              size="large"
              loading={loading}
              style={{
                backgroundColor: '#7C3AED',
                borderColor: '#7C3AED'
              }}
            >
              Update User
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UpdateUser;