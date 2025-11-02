import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Row, Col, Switch } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { ingredientService } from '../../services/ingredient.service';
import type { Ingredient, UpdateIngredientRequest } from '../../models/IngredientModel';

interface UpdateIngredientProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  ingredient: Ingredient | null;
  loading?: boolean;
}

export const UpdateIngredient: React.FC<UpdateIngredientProps> = ({
  isOpen,
  onClose,
  onSuccess,
  ingredient,
  loading = false
}) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (ingredient && isOpen) {
      form.setFieldsValue({
        name: ingredient.name,
        type: ingredient.type || '',
        unit: ingredient.unit || '',
        status: ingredient.status ?? true
      });
    }
  }, [ingredient, isOpen, form]);

  const handleSubmit = async (values: any) => {
    if (!ingredient) return;

    setSubmitting(true);
    try {
      const data: UpdateIngredientRequest = {
        name: values.name.trim(),
        type: values.type?.trim() || undefined,
        unit: values.unit?.trim() || undefined,
        status: values.status ?? true,
      };

      const response = await ingredientService.updateIngredient(ingredient.ingredientid, data);
      if (response.success) {
        toast.success('Ingredient updated successfully!');
        form.resetFields();
        onSuccess();
        onClose();
      } else {
        toast.error(response.message || 'Failed to update ingredient');
      }
    } catch (error: any) {
      console.error('Error updating ingredient:', error);
      const errorMessage = error?.response?.data?.message || error.message || 'Failed to update ingredient';
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
        <div style={{ color: '#faad14', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>
          <EditOutlined style={{ marginRight: '8px' }} />
          Update Ingredient: {ingredient?.name}
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

        <Form.Item
          name="status"
          label="Status"
          valuePropName="checked"
        >
          <div style={{ marginTop: '8px' }}>
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </div>
        </Form.Item>

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
                icon={<EditOutlined />}
              >
                Update Ingredient
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};

