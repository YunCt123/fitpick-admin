import React, { useState } from 'react';
import { Modal, Button, Input, Alert, Row, Col, Typography, Divider } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { mealService } from '../../services/meal.service';
import type { Meal } from '../../models/MealModel';
import { toast } from 'react-toastify';

const { Text, Title } = Typography;

interface DeleteMealProps {
  meal: Meal | null;
  isVisible: boolean;
  onClose: () => void;
  onMealDeleted: () => void;
}

const DeleteMeal: React.FC<DeleteMealProps> = ({ meal, isVisible, onClose, onMealDeleted }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmText, setConfirmText] = useState('');

  const handleDelete = async () => {
    if (!meal || confirmText !== 'DELETE') {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await mealService.deleteMeal(meal.mealid);
      if (response.success) {
        toast.success(`Meal "${meal.name}" has been deleted successfully!`);
        onMealDeleted();
        handleClose();
      } else {
        const errorMessage = response.message || 'Failed to delete meal';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err: any) {
      console.error('Error deleting meal:', err);
      const errorMessage = err?.response?.data?.message || 'Failed to delete meal';
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

  const getDietTypeColor = (dietType: string): string => {
    switch (dietType) {
      case 'Vegetarian': return '#52c41a';
      case 'Vegan': return '#13c2c2';
      case 'Non-Vegetarian': return '#fa541c';
      default: return '#8c8c8c';
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

  const isConfirmValid = confirmText === 'DELETE';

  return (
    <Modal
      title={
        <div style={{ color: '#dc2626', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>
          <DeleteOutlined style={{ marginRight: '8px' }} />
          Delete Meal
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
            <ExclamationCircleOutlined style={{ color: '#faad14', marginRight: '8px' }} />
            You are about to permanently delete this meal. All related data will be lost.
          </div>
        }
        type="warning"
        showIcon
        style={{ marginBottom: '24px' }}
      />

      {meal && (
        <>
          {/* Meal Information */}
          <div style={{ 
            backgroundColor: '#f9f9f9', 
            padding: '20px', 
            borderRadius: '8px', 
            marginBottom: '24px',
            border: '1px solid #d9d9d9'
          }}>
            <Title level={4} style={{ margin: '0 0 16px 0', color: '#1890ff' }}>
              {meal.name}
              {meal.isPremium && (
                <span style={{ 
                  marginLeft: '8px',
                  backgroundColor: '#faad14',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'normal'
                }}>
                  PREMIUM
                </span>
              )}
            </Title>
            
            <Text type="secondary" style={{ fontSize: '14px', lineHeight: '1.5' }}>
              {meal.description}
            </Text>

            <Divider style={{ margin: '16px 0' }} />

            <Row gutter={[24, 12]}>
              <Col span={12}>
                <div>
                  <Text strong>Category ID: </Text>
                  <Text>{meal.categoryId}</Text>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <Text strong>Diet Type: </Text>
                  <span style={{ 
                    color: getDietTypeColor(meal.diettype),
                    fontWeight: 'bold'
                  }}>
                    {meal.diettype}
                  </span>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <ClockCircleOutlined style={{ marginRight: '6px', color: '#1890ff' }} />
                  <Text strong>Cooking Time: </Text>
                  <Text>{meal.cookingtime} minutes</Text>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <Text strong>Calories: </Text>
                  <Text>{meal.calories} kcal</Text>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <Text strong>Status: </Text>
                  <span style={{ 
                    color: meal.statusId === 1 ? '#52c41a' : '#f5222d',
                    fontWeight: 'bold'
                  }}>
                    {meal.statusId === 1 ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </Col>
              <Col span={24}>
                <div>
                  <Text strong>Created: </Text>
                  <Text type="secondary">{formatDate(meal.createdat)} by User ID {meal.createdby}</Text>
                </div>
              </Col>
            </Row>
          </div>

          {/* Confirmation Section */}
          <div style={{ marginBottom: '24px' }}>
            <Text strong style={{ fontSize: '16px', color: '#dc2626' }}>
              Type "DELETE" to confirm deletion:
            </Text>
            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type DELETE here"
              size="large"
              style={{ 
                marginTop: '8px',
                borderColor: confirmText === 'DELETE' ? '#52c41a' : '#d9d9d9'
              }}
            />
            {confirmText && confirmText !== 'DELETE' && (
              <Text type="danger" style={{ fontSize: '12px' }}>
                Please type "DELETE" exactly to enable deletion
              </Text>
            )}
          </div>

          {/* Action Buttons */}
          <Row justify="end" gutter={[8, 0]}>
            <Col>
              <Button 
                size="large" 
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                danger
                size="large"
                loading={loading}
                disabled={!isConfirmValid}
                onClick={handleDelete}
                icon={<DeleteOutlined />}
              >
                Delete Meal
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Modal>
  );
};

export default DeleteMeal;
