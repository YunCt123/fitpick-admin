import React from 'react';
import { Modal, Row, Col, Typography, Divider, Tag, Button } from 'antd';
import { 
  ClockCircleOutlined, 
  DollarOutlined, 
  CalendarOutlined,
  UserOutlined,
  FireOutlined,
  TagsOutlined,
  EditOutlined
} from '@ant-design/icons';
import type { Meal } from '../../models/MealModel';

const { Text, Title, Paragraph } = Typography;

interface MealDetailsProps {
  meal: Meal | null;
  visible: boolean;
  onClose: () => void;
  onEdit?: () => void;
}

const MealDetails: React.FC<MealDetailsProps> = ({ meal, visible, onClose, onEdit }) => {
  if (!meal) return null;

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryName = (categoryId: number): string => {
    const categories = {
      1: 'Breakfast',
      2: 'Lunch', 
      3: 'Dinner',
      4: 'Snacks',
      5: 'Drinks'
    };
    return categories[categoryId as keyof typeof categories] || `Category ${categoryId}`;
  };

  return (
    <Modal
      title={
        <div style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center', color: '#1890ff' }}>
          Meal Details
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={
        <div style={{ textAlign: 'right' }}>
          {onEdit && (
            <Button 
              type="primary" 
              icon={<EditOutlined />} 
              onClick={onEdit}
              style={{ marginRight: '8px' }}
            >
              Edit Meal
            </Button>
          )}
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      }
      width={700}
      destroyOnClose
    >
      <div style={{ padding: '20px 0' }}>
        {/* Header Section */}
        <div style={{ marginBottom: '24px' }}>
          <Title level={3} style={{ margin: '0 0 8px 0', color: '#1890ff' }}>
            {meal.name}
            {meal.isPremium && (
              <Tag color="gold" style={{ marginLeft: '12px', fontSize: '12px' }}>
                ACTIVE
              </Tag>
            )}
            <Tag 
              color={meal.statusId === 1 ? 'green' : 'red'} 
              style={{ marginLeft: '8px', fontSize: '12px' }}
            >
              {meal.statusId === 1 ? 'ACTIVE' : 'INACTIVE'}
            </Tag>
          </Title>
          
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '0' }}>
            {meal.description}
          </Paragraph>
        </div>

        {/* Meal ID at top */}
        <div style={{ 
          marginBottom: '24px',
          textAlign: 'left'
        }}>
          <Text strong style={{ fontSize: '14px', color: '#666' }}>
            Meal ID
          </Text>
          <br />
          <Text type="secondary" code style={{ fontSize: '13px' }}>
            #{meal.mealid}
          </Text>
        </div>

        {/* Main Information Grid - Equal sized boxes */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12}>
            <div style={{ 
              padding: '16px', 
              backgroundColor: '#f6ffed', 
              borderRadius: '8px',
              border: '1px solid #b7eb8f',
              height: '120px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <TagsOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                <Text strong>Category</Text>
              </div>
              <Text style={{ fontSize: '16px', color: '#52c41a', fontWeight: 'bold' }}>
                {getCategoryName(meal.categoryId)}
              </Text>
            </div>
          </Col>

          <Col xs={24} sm={12}>
            <div style={{ 
              padding: '16px', 
              backgroundColor: '#fff7e6', 
              borderRadius: '8px',
              border: '1px solid #ffd591',
              height: '120px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <TagsOutlined style={{ color: '#fa8c16', marginRight: '8px' }} />
                <Text strong>Diet Type</Text>
              </div>
              <Text style={{ fontSize: '16px', color: '#fa8c16', fontWeight: 'bold' }}>
                {meal.diettype}
              </Text>
            </div>
          </Col>

          <Col xs={24} sm={8}>
            <div style={{ 
              padding: '16px', 
              backgroundColor: '#fff2f0', 
              borderRadius: '8px',
              border: '1px solid #ffccc7',
              height: '120px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                <FireOutlined style={{ color: '#fa541c', marginRight: '8px' }} />
                <Text strong>Calories</Text>
              </div>
              <Text style={{ fontSize: '24px', fontWeight: 'bold', color: '#fa541c' }}>
                {meal.calories}
              </Text>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                kcal
              </Text>
            </div>
          </Col>

          <Col xs={24} sm={8}>
            <div style={{ 
              padding: '16px', 
              backgroundColor: '#e6f7ff', 
              borderRadius: '8px',
              border: '1px solid #91d5ff',
              height: '120px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                <ClockCircleOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
                <Text strong>Cooking Time</Text>
              </div>
              <Text style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
                {meal.cookingtime}
              </Text>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                minutes
              </Text>
            </div>
          </Col>

          <Col xs={24} sm={8}>
            <div style={{ 
              padding: '16px', 
              backgroundColor: '#f6ffed', 
              borderRadius: '8px',
              border: '1px solid #b7eb8f',
              height: '120px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                <DollarOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                <Text strong>Price</Text>
              </div>
              <Text style={{ fontSize: '18px', fontWeight: 'bold', color: '#52c41a' }}>
                {formatPrice(meal.price)}
              </Text>
            </div>
          </Col>
        </Row>

        <Divider />

        {/* Additional Information */}
        <Row gutter={[24, 16]}>
          <Col xs={24} sm={12}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <CalendarOutlined style={{ color: '#722ed1', marginRight: '8px' }} />
                <Text strong>Created Date</Text>
              </div>
              <Text style={{ color: '#722ed1' }}>
                {formatDate(meal.createdat)}
              </Text>
            </div>
          </Col>

          <Col xs={24} sm={12}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <UserOutlined style={{ color: '#13c2c2', marginRight: '8px' }} />
                <Text strong>Created By</Text>
              </div>
              <Text style={{ color: '#13c2c2' }}>
                User ID: {meal.createdby}
              </Text>
            </div>
          </Col>
        </Row>

        {/* Premium Badge */}
        {meal.isPremium && (
          <>
            <Divider />
            <div style={{ 
              textAlign: 'center', 
              padding: '16px', 
              backgroundColor: '#fffbf0',
              borderRadius: '8px',
              border: '2px dashed #faad14'
            }}>
              <Text style={{ fontSize: '16px', color: '#faad14', fontWeight: 'bold' }}>
                ⭐ This is a Premium Meal ⭐
              </Text>
              <br />
              <Text type="secondary">
                Requires active subscription to access
              </Text>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default MealDetails;