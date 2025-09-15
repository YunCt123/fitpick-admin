import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber, Button, Row, Col, Switch, Spin } from 'antd';
import { toast } from 'react-toastify';
import { mealService } from '../../services/meal.service';
import type { Meal, UpdateMealRequest } from '../../models/MealModel';

const { TextArea } = Input;
const { Option } = Select;

interface UpdateMealProps {
  meal: Meal | null;
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const UpdateMeal: React.FC<UpdateMealProps> = ({ meal, visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);

  useEffect(() => {
    if (visible && meal) {
      setInitialLoading(true);
      // Pre-fill form with meal data
      form.setFieldsValue({
        name: meal.name,
        description: meal.description,
        calories: meal.calories,
        cookingtime: meal.cookingtime,
        categoryId: meal.categoryId,
        diettype: meal.diettype,
        price: meal.price,
        isPremium: meal.isPremium,
        statusId: meal.statusId
      });
      setInitialLoading(false);
    }
  }, [visible, meal, form]);

  const handleSubmit = async (values: any) => {
    if (!meal) return;

    try {
      setLoading(true);
      
      const updateData: UpdateMealRequest = {
        mealid: meal.mealid,
        name: values.name.trim(),
        description: values.description.trim(),
        calories: values.calories,
        cookingtime: values.cookingtime,
        categoryId: values.categoryId,
        diettype: values.diettype,
        price: values.price,
        isPremium: values.isPremium || false,
        statusId: values.statusId
      };

      console.log('Updating meal with data:', updateData);
      
      const response = await mealService.updateMeal(meal.mealid, updateData);
      
      if (response.success) {
        toast.success('Meal updated successfully!');
        onSuccess();
        onClose();
      } else {
        toast.error(response.message || 'Failed to update meal');
      }
    } catch (error: any) {
      console.error('Error updating meal:', error);
      const errorMessage = error?.response?.data?.message || error.message || 'Failed to update meal';
      toast.error(errorMessage);
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
        <div style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center', color: '#faad14' }}>
          Update Meal: {meal?.name}
        </div>
      }
      open={visible}
      onCancel={handleClose}
      footer={null}
      width={800}
      destroyOnClose
    >
      {initialLoading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Spin size="large" />
          <div style={{ marginTop: '16px' }}>Loading meal data...</div>
        </div>
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
          style={{ marginTop: '20px' }}
        >
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="name"
                label="Meal Name"
                rules={[
                  { required: true, message: 'Please enter meal name' },
                  { min: 2, message: 'Name must be at least 2 characters' },
                  { max: 100, message: 'Name must not exceed 100 characters' }
                ]}
              >
                <Input 
                  placeholder="Enter meal name"
                  size="large"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="categoryId"
                label="Category"
                rules={[{ required: true, message: 'Please select a category' }]}
              >
                <Select placeholder="Select category" size="large">
                  <Option value={1}>Breakfast</Option>
                  <Option value={2}>Lunch</Option>
                  <Option value={3}>Dinner</Option>
                  <Option value={4}>Snacks</Option>
                  <Option value={5}>Drinks</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: 'Please enter meal description' },
              { min: 10, message: 'Description must be at least 10 characters' },
              { max: 500, message: 'Description must not exceed 500 characters' }
            ]}
          >
            <TextArea 
              rows={3}
              placeholder="Enter meal description"
              size="large"
            />
          </Form.Item>

          <Row gutter={[16, 0]}>
            <Col xs={24} sm={8}>
              <Form.Item
                name="calories"
                label="Calories"
                rules={[
                  { required: true, message: 'Please enter calories' },
                  { type: 'number', min: 1, message: 'Calories must be greater than 0' },
                  { type: 'number', max: 5000, message: 'Calories must not exceed 5000' }
                ]}
              >
                <InputNumber 
                  placeholder="Enter calories"
                  size="large"
                  style={{ width: '100%' }}
                  min={1}
                  max={5000}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={8}>
              <Form.Item
                name="cookingtime"
                label="Cooking Time (minutes)"
                rules={[
                  { required: true, message: 'Please enter cooking time' },
                  { type: 'number', min: 1, message: 'Cooking time must be greater than 0' },
                  { type: 'number', max: 480, message: 'Cooking time must not exceed 480 minutes' }
                ]}
              >
                <InputNumber 
                  placeholder="Enter cooking time"
                  size="large"
                  style={{ width: '100%' }}
                  min={1}
                  max={480}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={8}>
              <Form.Item
                name="price"
                label="Price (VND)"
                rules={[
                  { required: true, message: 'Please enter price' },
                  { type: 'number', min: 1000, message: 'Price must be at least 1,000 VND' },
                  { type: 'number', max: 1000000, message: 'Price must not exceed 1,000,000 VND' }
                ]}
              >
                <InputNumber 
                  placeholder="Enter price"
                  size="large"
                  style={{ width: '100%' }}
                  min={1000}
                  max={1000000}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col xs={24} sm={8}>
              <Form.Item
                name="diettype"
                label="Diet Type"
                rules={[{ required: true, message: 'Please select diet type' }]}
              >
                <Select placeholder="Select diet type" size="large">
                  <Option value="Non-Vegetarian">Non-Vegetarian</Option>
                  <Option value="Vegetarian">Vegetarian</Option>
                  <Option value="Vegan">Vegan</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={8}>
              <Form.Item
                name="isPremium"
                label="Premium Meal"
                valuePropName="checked"
              >
                <div style={{ marginTop: '8px' }}>
                  <Switch 
                    checkedChildren="Premium" 
                    unCheckedChildren="Regular"
                  />
                  <div style={{ marginTop: '4px', color: '#666', fontSize: '12px' }}>
                    Premium meals require subscription
                  </div>
                </div>
              </Form.Item>
            </Col>

            <Col xs={24} sm={8}>
              <Form.Item
                name="statusId"
                label="Status"
                rules={[{ required: true, message: 'Please select status' }]}
              >
                <Select placeholder="Select status" size="large">
                  <Option value={1}>
                    <span style={{ color: '#52c41a' }}>● Active</span>
                  </Option>
                  <Option value={0}>
                    <span style={{ color: '#f5222d' }}>● Inactive</span>
                  </Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ marginBottom: 0, marginTop: '24px' }}>
            <Row justify="end" gutter={[8, 0]}>
              <Col>
                <Button 
                  onClick={handleClose}
                  size="large"
                >
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  size="large"
                >
                  Update Meal
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default UpdateMeal;
