import React, { useEffect, useState } from 'react';
import { dashboardService, type DashboardStats } from '../services/dashboard.service';
import { authService } from '../services/auth.service';

const DashboardHome: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    revenue: 0,
    orders: 0,
    products: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      // Check if user is authenticated before making request
      if (!authService.isAuthenticated()) {
        setError('Bạn cần đăng nhập để xem thống kê');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await dashboardService.getStats();
        
        if (response.success && response.data) {
          setStats(response.data);
        } else {
          setError('Không thể tải dữ liệu thống kê');
        }
      } catch (err: any) {
        console.error('Error fetching dashboard stats:', err);
        // Handle 401 specifically
        if (err.response?.status === 401) {
          setError('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
        } else {
          setError(err.message || 'Có lỗi xảy ra khi tải dữ liệu');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Format number with commas
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US');
  };

  // Format currency
  const formatCurrency = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h1>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Total Users
          </h3>
          {loading ? (
            <div className="h-9 w-24 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <p className="text-3xl font-bold text-blue-600">
              {formatNumber(stats.totalUsers)}
            </p>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Revenue</h3>
          {loading ? (
            <div className="h-9 w-32 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <p className="text-3xl font-bold text-green-600">
              {formatCurrency(stats.revenue)}
            </p>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Orders</h3>
          {loading ? (
            <div className="h-9 w-24 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <p className="text-3xl font-bold text-purple-600">
              {formatNumber(stats.orders)}
            </p>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Meals
          </h3>
          {loading ? (
            <div className="h-9 w-24 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <p className="text-3xl font-bold text-orange-600">
              {formatNumber(stats.products)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;