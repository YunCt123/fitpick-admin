import { apiUtils } from '../api/axios';
import { MANAGE_USER } from '../constants/authURL';
import type { ApiResponse } from '../models/ApiResponse';
import type { User } from '../models/UserModel';

export const userService = {
	// Lấy danh sách user (có thể thêm params cho phân trang, tìm kiếm)
	getUsers: async (params?: {
		page?: number;
		pageSize?: number;
		search?: string;
		sortBy?: string;
		sortDesc?: boolean;
		genderId?: number;
		roleId?: number;
		status?: boolean;
	}, config = {}): Promise<ApiResponse<User[]>> => {
		const response = await apiUtils.get<ApiResponse<User[]>>(MANAGE_USER, params, config);
		return response.data;
	},

	// Lấy chi tiết user theo id
	getUserById: async (id: string, config = {}): Promise<ApiResponse<User>> => {
		const response = await apiUtils.get<ApiResponse<User>>(`${MANAGE_USER}/${id}`, {}, config);
		return response.data;
	},

	// Tạo mới user
	createUser: async (userData: any, config = {}): Promise<ApiResponse<User>> => {
    try {
      const response = await apiUtils.post<ApiResponse<User>>(`${MANAGE_USER}`, userData || {}, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

	// Cập nhật user
	updateUser: async (id: string, userData: any, config = {}): Promise<ApiResponse<User>> => {
		const response = await apiUtils.put<ApiResponse<User>>(`${MANAGE_USER}/${id}`, userData, config);
		return response.data;
	},

	// Xóa user
	deleteUser: async (id: string, config = {}): Promise<ApiResponse<null>> => {
		const response = await apiUtils.delete<ApiResponse<null>>(`${MANAGE_USER}/${id}`, config);
		return response.data;
	},

	// Đổi mật khẩu user
	changePassword: async (id: string, newPassword: string, config = {}): Promise<ApiResponse<null>> => {
		const response = await apiUtils.put<ApiResponse<null>>(
			`${MANAGE_USER}/${id}/change-password`,
			{ newPassword },
			config
		);
		return response.data;
	},
};
