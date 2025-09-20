import React, { useState } from 'react';

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
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: '',
    categoryid: 1,
    status: false,
    medias: []
  });

  const [mediaUrls, setMediaUrls] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleMediaUrlsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMediaUrls(e.target.value);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Tiêu đề không được để trống';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Nội dung không được để trống';
    }

    if (formData.categoryid < 1) {
      newErrors.categoryid = 'Vui lòng chọn danh mục';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Process media URLs
    const mediaList = mediaUrls
      .split('\n')
      .map(url => url.trim())
      .filter(url => url)
      .map((url, index) => ({
        mediaUrl: url,
        mediaType: 'image',
        orderIndex: index
      }));

    const submitData = {
      ...formData,
      medias: mediaList.length > 0 ? mediaList : undefined
    };

    const success = await onSubmit(submitData);
    if (success) {
      handleReset();
      onClose();
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      content: '',
      categoryid: 1,
      status: false,
      medias: []
    });
    setMediaUrls('');
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Tạo blog mới</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              disabled={loading}
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Tiêu đề *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Nhập tiêu đề blog"
                disabled={loading}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Nội dung *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={8}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.content ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Nhập nội dung blog"
                disabled={loading}
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="categoryid" className="block text-sm font-medium text-gray-700 mb-2">
                Danh mục *
              </label>
              <select
                id="categoryid"
                name="categoryid"
                value={formData.categoryid}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.categoryid ? 'border-red-300' : 'border-gray-300'
                }`}
                disabled={loading}
              >
                <option value={1}>Dinh dưỡng</option>
                <option value={2}>Tập luyện</option>
                <option value={3}>Sức khỏe</option>
                <option value={4}>Công thức</option>
                <option value={5}>Lifestyle</option>
              </select>
              {errors.categoryid && (
                <p className="text-red-500 text-sm mt-1">{errors.categoryid}</p>
              )}
            </div>

            {/* Media URLs */}
            <div>
              <label htmlFor="mediaUrls" className="block text-sm font-medium text-gray-700 mb-2">
                URL hình ảnh (mỗi dòng một URL)
              </label>
              <textarea
                id="mediaUrls"
                value={mediaUrls}
                onChange={handleMediaUrlsChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                disabled={loading}
              />
              <p className="text-gray-500 text-sm mt-1">
                Nhập mỗi URL hình ảnh trên một dòng riêng biệt
              </p>
            </div>

            {/* Status */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="status"
                name="status"
                checked={formData.status}
                onChange={handleInputChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                disabled={loading}
              />
              <label htmlFor="status" className="ml-2 block text-sm text-gray-700">
                Xuất bản ngay
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={loading}
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={loading}
              >
                Đặt lại
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Đang tạo...' : 'Tạo blog'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;