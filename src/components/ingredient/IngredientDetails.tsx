import React from 'react';
import { Modal, Button, Row, Col, Tag } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import type { Ingredient } from '../../models/IngredientModel';

interface IngredientDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  ingredient: Ingredient | null;
}

export const IngredientDetails: React.FC<IngredientDetailsProps> = ({
  isOpen,
  onClose,
  ingredient
}) => {
  if (!ingredient) return null;

  return (
    <Modal
      title={
        <div style={{ color: '#7C3AED', fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
          <EyeOutlined style={{ marginRight: '8px' }} />
          Ingredient Details
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose} size="large" style={{ minWidth: '100px' }}>
          Close
        </Button>
      ]}
      width={600}
      destroyOnClose
    >
      <div style={{ marginTop: '20px' }}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <div style={{ background: '#f8f9fa', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
              <h3 style={{ margin: '0 0 12px 0', color: '#333', fontSize: '18px', fontWeight: 'bold' }}>
                {ingredient.name}
              </h3>
              <Tag color={ingredient.status ? 'green' : 'red'} style={{ fontSize: '12px', padding: '4px 12px' }}>
                {ingredient.status ? 'Active' : 'Inactive'}
              </Tag>
            </div>
          </Col>
          <Col span={12}>
            <p><strong>Ingredient ID:</strong> #{ingredient.ingredientid}</p>
          </Col>
          <Col span={12}>
            <p><strong>Status:</strong> 
              <Tag color={ingredient.status ? 'green' : 'red'} style={{ marginLeft: '8px' }}>
                {ingredient.status ? 'Active' : 'Inactive'}
              </Tag>
            </p>
          </Col>
          <Col span={12}>
            <p><strong>Type:</strong> {ingredient.type || 'N/A'}</p>
          </Col>
          <Col span={12}>
            <p><strong>Unit:</strong> {ingredient.unit || 'N/A'}</p>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

