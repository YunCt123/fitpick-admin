import React, { useState } from 'react';
import { Modal, Form, Input, Button, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { ingredientService } from '../../services/ingredient.service';
import type { CreateIngredientRequest } from '../../models/IngredientModel';

interface CreateIngredientProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  loading?: boolean;
}

export const CreateIngredient: React.FC<CreateIngredientProps> = ({
  isOpen,
  onClose,
  onSuccess,
  loading = false
}) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      const data: CreateIngredientRequest = {
        name: values.name.trim(),
        type: values.type?.trim() || undefined,
        unit: values.unit?.trim() || undefined,
      };

      const response = await ingredientService.createIngredient(data);
      if (response.success) {
        toast.success('Ingredient created successfully!');
        form.resetFields();
        onSuccess();
        onClose();
      } else {
        toast.error(response.message || 'Failed to create ingredient');
      }
    } catch (error: any) {
      console.error('Error creating ingredient:', error);
      const errorMessage = error?.response?.data?.message || error.message || 'Failed to create ingredient';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
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
          <PlusOutlined style={{ marginRight: '8px' }} />
          Create New Ingredient
        </div>
      }
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      width={600}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ marginTop: '20px' }}
      >
        <Form.Item
          name="name"
          label="Ingredient Name"
          rules={[
            { required: true, message: 'Please enter ingredient name' },
            { min: 2, message: 'Name must be at least 2 characters' },
            { max: 100, message: 'Name must not exceed 100 characters' }
          ]}
        >
          <Input placeholder="Enter ingredient name" size="large" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="type"
              label="Type"
              rules={[
                { max: 50, message: 'Type must not exceed 50 characters' }
              ]}
            >
              <Input placeholder="e.g., Vegetable, Meat, Spice" size="large" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="unit"
              label="Unit"
              rules={[
                { max: 20, message: 'Unit must not exceed 20 characters' }
              ]}
            >
              <Input placeholder="e.g., kg, g, cup, piece" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ marginBottom: 0, marginTop: '24px' }}>
          <Row justify="end" gutter={[8, 0]}>
            <Col>
              <Button onClick={handleClose} size="large">
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                loading={submitting || loading}
                size="large"
                icon={<PlusOutlined />}
              >
                Create Ingredient
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};

