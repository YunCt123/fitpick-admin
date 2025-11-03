import React, { useState } from 'react';
import { Modal, Button, Input, Alert, Row, Col } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { ingredientService } from '../../services/ingredient.service';
import type { Ingredient } from '../../models/IngredientModel';
import { toast } from 'react-toastify';

interface DeleteIngredientProps {
  ingredient: Ingredient | null;
  isVisible: boolean;
  onClose: () => void;
  onIngredientDeleted: () => void;
}

const DeleteIngredient: React.FC<DeleteIngredientProps> = ({ 
  ingredient, 
  isVisible, 
  onClose, 
  onIngredientDeleted 
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmText, setConfirmText] = useState('');

  const handleDelete = async () => {
    if (!ingredient || confirmText !== 'DELETE') {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await ingredientService.deleteIngredient(ingredient.ingredientid);
      toast.success(`Ingredient "${ingredient.name}" has been deleted successfully!`);
      onIngredientDeleted();
      handleClose();
    } catch (err: any) {
      console.error('Error deleting ingredient:', err);
      const errorMessage = err?.response?.data?.message || 'Failed to delete ingredient';
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

  const isConfirmValid = confirmText === 'DELETE';

  return (
    <Modal
      title={
        <div style={{ color: '#dc2626', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>
          <DeleteOutlined style={{ marginRight: '8px' }} />
          Delete Ingredient
        </div>
      }
      open={isVisible}
      onCancel={handleClose}
      footer={null}
      width={600}
      destroyOnClose
    >
      {error && (
        <Alert
          message="Delete Error"
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: '16px' }}
        />
      )}

      <Alert
        message="Warning: This action cannot be undone"
        description={
          <div>
            <p>You are about to permanently delete this ingredient and all associated data.</p>
            <p><strong>This action is irreversible!</strong></p>
          </div>
        }
        type="warning"
        showIcon
        icon={<ExclamationCircleOutlined />}
        style={{ marginBottom: '20px' }}
      />

      {ingredient && (
        <>
          <div style={{ 
            background: '#f8f9fa', 
            border: '1px solid #dee2e6', 
            borderRadius: '8px', 
            padding: '16px', 
            marginBottom: '20px' 
          }}>
            <Row gutter={16}>
              <Col span={24}>
                <h3 style={{ margin: '0 0 12px 0', color: '#333' }}>Ingredient Information</h3>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <p><strong>ID:</strong> #{ingredient.ingredientid}</p>
                <p><strong>Name:</strong> {ingredient.name}</p>
                <p><strong>Type:</strong> {ingredient.type || 'N/A'}</p>
              </Col>
              <Col span={12}>
                <p><strong>Unit:</strong> {ingredient.unit || 'N/A'}</p>
                <p><strong>Status:</strong> 
                  <span style={{ 
                    color: ingredient.status ? '#52c41a' : '#f5222d',
                    fontWeight: 'bold',
                    marginLeft: '8px'
                  }}>
                    {ingredient.status ? 'Active' : 'Inactive'}
                  </span>
                </p>
              </Col>
            </Row>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <p style={{ marginBottom: '8px', fontWeight: 'bold' }}>
              Please type <strong style={{ color: '#dc2626' }}>DELETE</strong> to confirm:
            </p>
            <Input
              placeholder="Type DELETE to confirm"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              style={{ fontSize: '16px' }}
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button
              onClick={handleClose}
              size="large"
              style={{ marginRight: '12px', minWidth: '100px' }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              danger
              onClick={handleDelete}
              loading={loading}
              disabled={!isConfirmValid}
              size="large"
              style={{ minWidth: '100px' }}
              icon={<DeleteOutlined />}
            >
              {loading ? 'Deleting...' : 'Delete Ingredient'}
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default DeleteIngredient;

