import React, { useState } from 'react';
import { Modal, Form, Input, Select, InputNumber, Button, Row, Col } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { userService } from '../../services/user.service';
import { ValidationRules, FormOptions } from '../../constants/validation';

// API request interface matching backend swagger spec

interface CreateUserProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateUser: React.FC<CreateUserProps> = ({ visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);



  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      
      // Validate all required fields before sending (based on swagger API spec)
      const requiredFields = {
        FullName: values.fullName,
        Email: values.email,
        Password: values.password,
        Country: values.country,
        City: values.city,
        RoleId: values.role
      };
      
      // Check if any required field is empty
      const missingFields = Object.entries(requiredFields)
        .filter(([, value]) => !value || (typeof value === 'string' && value.trim() === ''))
        .map(([key]) => key);
      
      if (missingFields.length > 0) {
        toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
        setLoading(false);
        return;
      }
      
      console.log('Form values received:', values);
      
      // Prepare JSON body instead of FormData (backend expects application/json)
      // Only include numeric / optional fields if user provided them
      const userData: Record<string, any> = {
        fullName: values.fullName?.trim(),
        email: values.email?.trim(),
        password: values.password,
        country: values.country?.trim(),
        city: values.city?.trim(),
        roleId: values.role,
      };

      // Append optional numeric fields if defined (avoid sending undefined)
      const optionalNumericFields = ['gender', 'age', 'height', 'weight'] as const;
      optionalNumericFields.forEach((field) => {
        const keyMap: Record<string, string> = {
          gender: 'genderId',
          age: 'age',
          height: 'height',
          weight: 'weight'
        };
        const val = values[field];
        if (val !== undefined && val !== null && val !== '') {
          userData[keyMap[field]] = Number(val);
        }
      });

      console.log('User JSON payload to send:', userData);
      await userService.createUser(userData);
      
      toast.success('User created successfully!');
      form.resetFields();
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Error creating user:', error);
      
      // Handle different types of errors
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error('Failed to create user. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };



  return (
    <Modal
      title={
        <div style={{ color: '#7C3AED', fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
          Create New User
        </div>
      }
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={500}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        scrollToFirstError
        validateTrigger={['onBlur', 'onChange']}
        style={{ marginTop: '8px' }}
      >
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              label={<span style={{ color: '#000', fontSize: 12 }}>Full Name <span style={{ color: 'red' }}>*</span></span>}
              name="fullName"
              rules={ValidationRules.fullName}
            >
              <Input placeholder="Full name" size="middle" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<span style={{ color: '#000', fontSize: 12 }}>Email <span style={{ color: 'red' }}>*</span></span>}
              name="email"
              rules={ValidationRules.email}
            >
              <Input type="email" placeholder="Email" size="middle" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={<span style={{ color: '#000' }}>Password <span style={{ color: 'red' }}>*</span></span>}
              name="password"
              rules={ValidationRules.password}
            >
              <Input.Password
                placeholder="Enter password"
                size="large"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<span style={{ color: '#000' }}>Confirm Password <span style={{ color: 'red' }}>*</span></span>}
              name="confirmPassword"
              rules={ValidationRules.confirmPassword(form)}
            >
              <Input.Password
                placeholder="Confirm password"
                size="large"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              label={<span style={{ color: '#000', fontSize: 12 }}>Country <span style={{ color: 'red' }}>*</span></span>}
              name="country"
              rules={ValidationRules.location}
            >
              <Input placeholder="Country" size="middle" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<span style={{ color: '#000', fontSize: 12 }}>City <span style={{ color: 'red' }}>*</span></span>}
              name="city"
              rules={ValidationRules.location}
            >
              <Input placeholder="City" size="middle" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              label={<span style={{ color: '#000', fontSize: 12 }}>Role <span style={{ color: 'red' }}>*</span></span>}
              name="role"
              rules={[ValidationRules.required('Please select role!')]}
            >
              <Select
                placeholder="Role"
                size="middle"
                options={FormOptions.role}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<span style={{ color: '#000', fontSize: 12 }}>Gender</span>}
              name="gender"
            >
              <Select
                placeholder="Gender"
                size="middle"
                options={FormOptions.gender}
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              label={<span style={{ color: '#000', fontSize: 12 }}>Age</span>}
              name="age"
              rules={ValidationRules.age}
            >
              <InputNumber
                placeholder="Age"
                size="middle"
                style={{ width: '100%' }}
                min={1}
                max={150}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<span style={{ color: '#000', fontSize: 12 }}>Image URL</span>}
              name="imageUrl"
              rules={ValidationRules.url}
            >
              <Input placeholder="Image URL" size="middle" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={<span style={{ color: '#000' }}>Height (cm)</span>}
              name="height"
              rules={ValidationRules.height}
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
          <Col span={12}>
            <Form.Item
              label={<span style={{ color: '#000' }}>Weight (kg)</span>}
              name="weight"
              rules={ValidationRules.weight}
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

        <Row gutter={12} style={{ marginTop: '6px' }}>
          <Col span={12}>
            <Button
              block
              size="middle"
              onClick={handleCancel}
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
              size="middle"
              loading={loading}
              style={{
                backgroundColor: '#7C3AED',
                borderColor: '#1890ff'
              }}
            >
              Create User
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateUser;