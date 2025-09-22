import React, { useState } from 'react';
import { Modal, Button, Row, Col, Tag, Divider } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import type { Blog } from '../../models/BlogModel';

interface BlogDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  blog: Blog | null;
}

export const BlogDetails: React.FC<BlogDetailsProps> = ({
  isOpen,
  onClose,
  blog
}) => {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const handleImageError = (imageUrl: string) => {
    setFailedImages(prev => new Set(prev).add(imageUrl));
  };

  if (!blog) return null;

  return (
    <Modal
      title={
        <div style={{ color: '#7C3AED', fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
          <EyeOutlined style={{ marginRight: '8px' }} />
          Blog Details
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose} size="large" style={{ minWidth: '100px' }}>
          Close
        </Button>
      ]}
      width={800}
      destroyOnClose
    >
      {/* Blog Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h3 style={{ margin: '8px 0', fontSize: '20px', fontWeight: 'bold' }}>
          {blog.title}
        </h3>
        <Tag color={blog.status ? 'green' : 'orange'} style={{ fontSize: '12px', padding: '4px 12px' }}>
          {blog.status ? 'Published' : 'Draft'}
        </Tag>
      </div>

      <Divider />

      {/* Blog Information */}
      <Row gutter={[24, 16]}>
        <Col span={12}>
          <p><strong>Author:</strong> {blog.author.userName}</p>
        </Col>
        <Col span={12}>
          <p><strong>Category ID:</strong> {blog.categoryid}</p>
        </Col>
        <Col span={12}>
          <p><strong>Blog ID:</strong> {blog.postid}</p>
        </Col>
        <Col span={12}>
          <p><strong>Status:</strong> {blog.status ? 'Active' : 'Inactive'}</p>
        </Col>
        <Col span={12}>
          <p><strong>Created Date:</strong> {formatDate(blog.createdat)}</p>
        </Col>
        <Col span={12}>
          <p><strong>Updated Date:</strong> {formatDate(blog.updatedat)}</p>
        </Col>
      </Row>

      <Divider />

      {/* Blog Content */}
      <div style={{ marginBottom: '16px' }}>
        <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Content</h4>
        <div style={{ 
          background: '#f8f9fa', 
          border: '1px solid #dee2e6', 
          borderRadius: '8px', 
          padding: '16px',
          maxHeight: '200px',
          overflowY: 'auto'
        }}>
          <pre style={{ 
            whiteSpace: 'pre-wrap', 
            fontFamily: 'inherit', 
            margin: 0,
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            {blog.content}
          </pre>
        </div>
      </div>

      {/* Blog Media */}
      {blog.medias && blog.medias.length > 0 && (
        <>
          <Divider />
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>
              Media Files ({blog.medias.length})
            </h4>
            <Row gutter={[12, 12]}>
              {blog.medias.map((media, index) => (
                <Col span={8} key={media.mediaId || index}>
                  <div style={{ textAlign: 'center' }}>
                    <img
                      src={failedImages.has(media.mediaUrl) 
                        ? 'https://via.placeholder.com/150x100?text=No+Image' 
                        : media.mediaUrl
                      }
                      alt={`Blog media ${index + 1}`}
                      style={{ 
                        width: '100%', 
                        height: '80px', 
                        objectFit: 'cover', 
                        borderRadius: '4px',
                        border: '1px solid #d9d9d9'
                      }}
                      onError={() => handleImageError(media.mediaUrl)}
                    />
                    <p style={{ fontSize: '12px', margin: '4px 0', color: '#666' }}>
                      {media.mediaType} - Order: {media.orderIndex}
                    </p>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </>
      )}
    </Modal>
  );
};

export default BlogDetails;