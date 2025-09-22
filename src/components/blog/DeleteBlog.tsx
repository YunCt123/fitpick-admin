import React, { useState } from 'react';
import { Modal, Button, Input, Alert, Row, Col } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { blogService } from '../../services/blog.service';
import type { Blog } from '../../models/BlogModel';
import { toast } from 'react-toastify';

interface DeleteBlogProps {
  blog: Blog | null;
  isVisible: boolean;
  onClose: () => void;
  onBlogDeleted: () => void;
}

const DeleteBlog: React.FC<DeleteBlogProps> = ({ blog, isVisible, onClose, onBlogDeleted }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmText, setConfirmText] = useState('');

  const handleDelete = async () => {
    if (!blog || confirmText !== 'DELETE') {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await blogService.deleteBlog(blog.postid);
      toast.success(`Blog "${blog.title}" has been deleted successfully!`);
      onBlogDeleted();
      handleClose();
    } catch (err: any) {
      console.error('Error deleting blog:', err);
      const errorMessage = err?.response?.data?.message || 'Failed to delete blog';
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

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
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
          Delete Blog
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
            <p>You are about to permanently delete this blog post and all associated data.</p>
            <p><strong>This action is irreversible!</strong></p>
          </div>
        }
        type="warning"
        showIcon
        icon={<ExclamationCircleOutlined />}
        style={{ marginBottom: '20px' }}
      />

      {blog && (
        <>
          {/* Blog Details */}
          <div style={{ 
            background: '#f8f9fa', 
            border: '1px solid #dee2e6', 
            borderRadius: '8px', 
            padding: '16px', 
            marginBottom: '20px' 
          }}>
            <Row gutter={16}>
              <Col span={24}>
                <h3 style={{ margin: '0 0 12px 0', color: '#333' }}>Blog Information</h3>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <p><strong>Title:</strong> {blog.title}</p>
                <p><strong>Author:</strong> {blog.author.userName}</p>
                <p><strong>Category:</strong> Category {blog.categoryid}</p>
              </Col>
              <Col span={12}>
                <p><strong>Status:</strong> 
                  <span style={{ 
                    color: blog.status ? '#52c41a' : '#f5222d',
                    fontWeight: 'bold',
                    marginLeft: '8px'
                  }}>
                    {blog.status ? 'Published' : 'Draft'}
                  </span>
                </p>
                <p><strong>Created:</strong> {formatDate(blog.createdat)}</p>
                <p><strong>Media Files:</strong> {blog.medias?.length || 0}</p>
              </Col>
            </Row>
          </div>

          {/* Confirmation Input */}
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

          {/* Action Buttons */}
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
              {loading ? 'Deleting...' : 'Delete Blog'}
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default DeleteBlog;