import { apiUtils } from '../api/axios';
import { MANAGE_USER } from '../constants/authURL.tsx';
import type { ApiResponse } from '../models/ApiResponse.tsx';
import type { User } from '../models/UserModel.tsx';


export const userService = {
	// Lấy danh sách user (có thể thêm params cho phân trang, tìm kiếm)
	getUsers: async (params?: {
		page?: number;
		pageSize?: number;
		search?: string;
		searchKeyword?: string;
		sortBy?: string;
		sortDesc?: boolean;
		genderId?: number;
		roleId?: number;
		status?: boolean;
	}, config = {}): Promise<ApiResponse<any>> => {
		// Map frontend params to backend params
		const backendParams: any = {
			page: params?.page || 1,
			pageSize: params?.pageSize || 10,
			searchKeyword: params?.searchKeyword || params?.search,
			sortBy: params?.sortBy || "createdat",
			sortDesc: params?.sortDesc ?? true,
			genderId: params?.genderId,
			roleId: params?.roleId,
			status: params?.status
		};
		
		// Remove undefined values
		Object.keys(backendParams).forEach(key => 
			backendParams[key] === undefined && delete backendParams[key]
		);

		const response = await apiUtils.get<any>(MANAGE_USER, backendParams, config);
		
		// Transform response if it's paginated
		if (response.data && response.data.data) {
			const backendData = response.data.data;
			if (backendData.items && Array.isArray(backendData.items)) {
				// It's a paginated response
				return {
					success: response.data.success,
					data: {
						items: backendData.items,
						totalItems: backendData.totalItems || 0,
						totalPages: backendData.totalPages || 0,
						pageSize: backendData.pageSize || params?.pageSize || 10,
						pageNumber: backendData.pageNumber || backendParams.page || 1
					},
					message: response.data.message
				};
			}
		}
		
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

	// Lấy thống kê users
	getUserStats: async (params?: {
		genderId?: number;
		roleId?: number;
		status?: boolean;
	}, config = {}): Promise<ApiResponse<{
		total: number;
		active: number;
		inactive: number;
	}>> => {
		// Fetch all users and calculate stats
		const allUsers = await userService.getUsers({
			page: 1,
			pageSize: 9999, // Get all users
			...params
		}, config);

		let users: User[] = [];
		if (allUsers.data?.items) {
			users = allUsers.data.items;
		} else if (Array.isArray(allUsers.data)) {
			users = allUsers.data;
		}

		const total = users.length;
		const active = users.filter(u => u.status === true).length;
		const inactive = users.filter(u => u.status === false).length;

		return {
			success: true,
			data: { total, active, inactive },
			message: 'Stats calculated from users'
		};
	},
};