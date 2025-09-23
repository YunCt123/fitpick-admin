import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, Row, Col, Checkbox } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

interface BlogFormData {
  title: string;
  content: string;
  categoryid: number;
  status: boolean;
  medias?: {
    mediaUrl: string;
    mediaType: string;
    orderIndex: number;
  }[];
}

interface CreateBlogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BlogFormData) => Promise<boolean>;
  loading?: boolean;
}

export const CreateBlog: React.FC<CreateBlogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false
}) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      // Process media URLs
      const mediaList = values.mediaUrls
        ? values.mediaUrls
            .split('\n')
            .map((url: string) => url.trim())
            .filter((url: string) => url)
            .map((url: string, index: number) => ({
              mediaUrl: url,
              mediaType: 'image',
              orderIndex: index
            }))
        : [];

      const submitData: BlogFormData = {
        title: values.title,
        content: values.content,
        categoryid: values.categoryid,
        status: values.status || false,
        medias: mediaList.length > 0 ? mediaList : undefined
      };

      const success = await onSubmit(submitData);
      if (success) {
        toast.success('Blog created successfully!');
        form.resetFields();
        onClose();
      } else {
        toast.error('Failed to create blog. Please try again.');
      }
    } catch (error: any) {
      console.error('Error creating blog:', error);
      toast.error(error?.message || 'An unexpected error occurred while creating the blog.');
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
          Create New Blog
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
        initialValues={{
          categoryid: 1,
          status: false
        }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label={<span style={{ color: '#000' }}>Title</span>}
              name="title"
              rules={[{ required: true, message: 'Please enter blog title' }]}
            >
              <Input placeholder="Enter blog title" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label={<span style={{ color: '#000' }}>Content</span>}
              name="content"
              rules={[{ required: true, message: 'Please enter blog content' }]}
            >
              <Input.TextArea 
                placeholder="Enter blog content" 
                rows={6} 
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={<span style={{ color: '#000' }}>Category</span>}
              name="categoryid"
              rules={[{ required: true, message: 'Please select category' }]}
            >
              <Select
                placeholder="Select category"
                size="large"
                options={[
                  { value: 1, label: 'Nutrition' },
                  { value: 2, label: 'Workout' },
                  { value: 3, label: 'Health' },
                  { value: 4, label: 'Recipe' },
                  { value: 5, label: 'Lifestyle' }
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<span style={{ color: '#000' }}>Status</span>}
              name="status"
              valuePropName="checked"
            >
              <Checkbox>Publish immediately</Checkbox>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label={<span style={{ color: '#000' }}>Media URLs (one per line)</span>}
              name="mediaUrls"
            >
              <Input.TextArea 
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                rows={3}
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>

        <div style={{ textAlign: 'right', marginTop: '20px' }}>
          <Button onClick={handleClose} size="large" style={{ marginRight: '12px' }}>
            Cancel
          </Button>
          <Button 
            type="primary" 
            htmlType="submit" 
            size="large" 
            loading={submitting || loading}
            style={{ backgroundColor: '#7C3AED', borderColor: '#7C3AED' }}
          >
            Create Blog
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateBlog;