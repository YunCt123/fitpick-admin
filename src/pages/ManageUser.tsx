import React, { useState } from "react";
import { Plus } from "lucide-react";
import type { User } from "../models/UserModel";
import UserDetails from "../components/user/UserDetails";
import CreateUser from "../components/user/CreateUser";
import UpdateUser from "../components/user/UpdateUser";
import DeleteUser from "../components/user/DeleteUser";
import UserSearch from "../components/user/UserSearch";
import UserTable from "../components/user/UserTable";
import UserPagination from "../components/user/UserPagination";
import UserStats from "../components/user/UserStats";
import { useUserManagement } from "../hooks/useUserManagement";

const ManageUser: React.FC = () => {
  // Modal states
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  // Use custom hook for user management logic
  const {
    filteredUsers,
    loading,
    error,
    pagination,
    handleSearch,
    handleRetryFetch,
    handlePageChange,
    handlePageSizeChange,
    refreshUsers
  } = useUserManagement();

  // Modal handlers
  const handleView = (user: User) => {
    setSelectedUser(user);
    setIsDetailsModalVisible(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsUpdateModalVisible(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalVisible(true);
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalVisible(true);
  };

  // Close modal handlers
  const handleCloseDetailsModal = () => {
    setIsDetailsModalVisible(false);
    setSelectedUser(null);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalVisible(false);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalVisible(false);
    setSelectedUser(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setSelectedUser(null);
  };

  // CRUD operation handlers
  const handleUserCreated = () => {
    refreshUsers();
  };

  const handleUserUpdated = () => {
    refreshUsers();
  };

  const handleUserDeleted = () => {
    refreshUsers();
  };

  return (
    <div className="p-4">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          {error && (
            <button
              onClick={handleRetryFetch}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-md text-sm hover:bg-purple-200 transition-colors"
              disabled={loading}
            >
              {loading ? "Đang kết nối..." : "Thử kết nối API"}
            </button>
          )}
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New User</span>
        </button>
      </div>

      {/* User Statistics */}
      <UserStats users={filteredUsers} loading={loading} />

      {/* Search Component */}
      <UserSearch onSearch={handleSearch} loading={loading} />

      {/* Error Display */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <div className="text-red-600 mr-3">⚠️</div>
            <div>
              <h4 className="text-red-800 font-medium">Connection Error</h4>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* User Table */}
      <div className="bg-white rounded-lg shadow">
        <UserTable
          users={filteredUsers}
          loading={loading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Pagination */}
        <UserPagination
          pagination={pagination}
          loading={loading}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>

      {/* Modals */}
      <UserDetails
        user={selectedUser}
        visible={isDetailsModalVisible}
        onClose={handleCloseDetailsModal}
      />

      <CreateUser
        visible={isCreateModalVisible}
        onClose={handleCloseCreateModal}
        onSuccess={handleUserCreated}
      />

      <UpdateUser
        user={selectedUser}
        isVisible={isUpdateModalVisible}
        onClose={handleCloseUpdateModal}
        onUserUpdated={handleUserUpdated}
      />

      <DeleteUser
        user={selectedUser}
        isVisible={isDeleteModalVisible}
        onClose={handleCloseDeleteModal}
        onUserDeleted={handleUserDeleted}
      />
    </div>
  );
};

export default ManageUser;