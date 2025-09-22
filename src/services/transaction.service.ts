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
	}, config = {}): Promise<ApiResponse<PaymentResponse[]>> => {
		const response = await apiUtils.get<ApiResponse<PaymentResponse[]>>(TRANSACTIONS, params, config);
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

	// Xóa transaction (nếu có permission)
	deleteTransaction: async (id: string | number, config = {}): Promise<ApiResponse<null>> => {
		const response = await apiUtils.delete<ApiResponse<null>>(`${TRANSACTIONS}/${id}`, config);
		return response.data;
	},

	// Thống kê transaction theo status
	getTransactionStats: async (config = {}): Promise<ApiResponse<{
		total: number;
		completed: number;
		pending: number;
		failed: number;
		totalAmount: number;
	}>> => {
		const response = await apiUtils.get<ApiResponse<any>>(`${TRANSACTIONS}/stats`, {}, config);
		return response.data;
	},
};