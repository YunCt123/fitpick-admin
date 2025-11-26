import { apiUtils } from '../api/axios';
import { TRANSACTIONS } from '../constants/authURL.tsx';
import type { ApiResponse } from '../models/ApiResponse.tsx';
import type { PaymentResponse } from '../models/TransactionModel.tsx';

export const transactionService = {
	// Lấy danh sách tất cả transactions/payments
	getTransactions: async (params?: {
		page?: number;
		pageSize?: number;
		search?: string;
		sortBy?: string;
		sortDesc?: boolean;
		status?: string;
		userId?: number;
		dateRange?: string;
		startDate?: string;
		endDate?: string;
	}, config = {}): Promise<ApiResponse<any>> => {
		// Map frontend params to backend params
		const backendParams: any = {
			page: params?.page || 1,
			pageSize: params?.pageSize || 10,
			search: params?.search,
			status: params?.status,
			userId: params?.userId
		};
		
		// Remove undefined values
		Object.keys(backendParams).forEach(key => 
			backendParams[key] === undefined && delete backendParams[key]
		);

		const response = await apiUtils.get<any>(TRANSACTIONS, backendParams, config);
		
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

	// Lấy chi tiết transaction theo id
	getTransactionById: async (id: string | number, config = {}): Promise<ApiResponse<PaymentResponse>> => {
		const response = await apiUtils.get<ApiResponse<PaymentResponse>>(`${TRANSACTIONS}/${id}`, {}, config);
		return response.data;
	},

	// Lấy transactions theo user id
	getTransactionsByUserId: async (userId: string | number, params?: {
		page?: number;
		pageSize?: number;
		status?: string;
	}, config = {}): Promise<ApiResponse<PaymentResponse[]>> => {
		const response = await apiUtils.get<ApiResponse<PaymentResponse[]>>(
			`${TRANSACTIONS}/user/${userId}`, 
			params, 
			config
		);
		return response.data;
	},

	// Cập nhật trạng thái transaction
	updateTransactionStatus: async (id: string | number, status: 'PENDING' | 'PAID', config = {}): Promise<ApiResponse<PaymentResponse>> => {
		const response = await apiUtils.put<ApiResponse<PaymentResponse>>(
			`${TRANSACTIONS}/${id}/status`, 
			{ status: status.toUpperCase() }, 
			config
		);
		return response.data;
	},

	// Xóa transaction (nếu có permission)
	deleteTransaction: async (id: string | number, config = {}): Promise<ApiResponse<null>> => {
		const response = await apiUtils.delete<ApiResponse<null>>(`${TRANSACTIONS}/${id}`, config);
		return response.data;
	},

	// Lấy thống kê transactions
	getTransactionStats: async (params?: {
		status?: string;
		userId?: number;
		dateRange?: string;
	}, config = {}): Promise<ApiResponse<{
		total: number;
		completed: number;
		pending: number;
		failed: number;
		totalAmount: number;
	}>> => {
		// Fetch all transactions and calculate stats
		const allTransactions = await transactionService.getTransactions({
			page: 1,
			pageSize: 9999, // Get all transactions
			...params
		}, config);

		let transactions: PaymentResponse[] = [];
		if (allTransactions.data?.items) {
			transactions = allTransactions.data.items;
		} else if (Array.isArray(allTransactions.data)) {
			transactions = allTransactions.data;
		}

		const total = transactions.length;
		const completed = transactions.filter(t => t.status?.toUpperCase() === 'PAID').length;
		const pending = transactions.filter(t => t.status?.toUpperCase() === 'PENDING').length;
		const failed = 0;
		const totalAmount = transactions
			.filter(t => t.status?.toUpperCase() === 'PAID')
			.reduce((sum, t) => sum + (t.amount || 0), 0);

		return {
			success: true,
			data: { total, completed, pending, failed, totalAmount },
			message: 'Stats calculated from transactions'
		};
	},
};