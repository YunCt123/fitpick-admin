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

	// Cập nhật trạng thái transaction
	updateTransactionStatus: async (id: string | number, status: 'PENDING' | 'PAID', config = {}): Promise<ApiResponse<PaymentResponse>> => {
		const response = await apiUtils.put<ApiResponse<PaymentResponse>>(
			`${TRANSACTIONS}/${id}/status`, 
			{ status }, 
			config
		);
		return response.data;
	},

	// Xóa transaction (nếu có permission)
	deleteTransaction: async (id: string | number, config = {}): Promise<ApiResponse<null>> => {
		const response = await apiUtils.delete<ApiResponse<null>>(`${TRANSACTIONS}/${id}`, config);
		return response.data;
	},
};