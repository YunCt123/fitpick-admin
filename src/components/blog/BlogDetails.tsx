import React from 'react';
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
  if (!isOpen || !blog) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Chi tiết blog</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>

          {/* Blog Header */}
          <div className="border-b pb-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{blog.title}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                blog.status
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {blog.status ? '✓ Đã xuất bản' : '⏳ Bản nháp'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">Tác giả:</span> {blog.author.userName}
              </div>
              <div>
                <span className="font-medium">Danh mục:</span> ID {blog.categoryid}
              </div>
              <div>
                <span className="font-medium">ID Blog:</span> {blog.postid}
              </div>
              <div>
                <span className="font-medium">Ngày tạo:</span> {formatDate(blog.createdat)}
              </div>
              <div>
                <span className="font-medium">Cập nhật lần cuối:</span> {formatDate(blog.updatedat)}
              </div>
            </div>
          </div>

          {/* Blog Media */}
          {blog.medias && blog.medias.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Hình ảnh</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {blog.medias.map((media, index) => (
                  <div key={media.mediaId || index} className="relative">
                    <img
                      src={media.mediaUrl}
                      alt={`Blog media ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg shadow-sm"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Không+thể+tải+ảnh';
                      }}
                    />
                    <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                      {index + 1}
                    </div>
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">
                        Loại: {media.mediaType} | Thứ tự: {media.orderIndex}
                      </p>
                      <a
                        href={media.mediaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:text-blue-700 break-all"
                      >
                        {media.mediaUrl}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blog Content */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Nội dung</h3>
            <div className="prose max-w-none">
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                  {blog.content}
                </pre>
              </div>
            </div>
          </div>

          {/* Blog Statistics (if available) */}
          <div className="border-t pt-4">
            <h4 className="text-md font-semibold text-gray-900 mb-3">Thông tin khác</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-blue-600 font-medium">Số media</div>
                <div className="text-xl font-bold text-blue-900">
                  {blog.medias ? blog.medias.length : 0}
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-green-600 font-medium">Trạng thái</div>
                <div className="text-xl font-bold text-green-900">
                  {blog.status ? 'Công khai' : 'Riêng tư'}
                </div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="text-purple-600 font-medium">Tác giả ID</div>
                <div className="text-xl font-bold text-purple-900">
                  {blog.author.userId}
                </div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="text-orange-600 font-medium">Danh mục ID</div>
                <div className="text-xl font-bold text-orange-900">
                  {blog.categoryid}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end mt-6 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;