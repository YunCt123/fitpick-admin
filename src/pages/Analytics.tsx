import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Users, Eye } from 'lucide-react';
import { analyticsService, type AnalyticsData } from '../services/analytics.service';

// Color mappings for dynamic colors
const dietColors = ['bg-orange-500', 'bg-green-500', 'bg-emerald-500', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-yellow-500'];
const ageColors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500'];

const Analytics: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  
  // Time period filters
  const [userPeriod, setUserPeriod] = useState<'month' | 'quarter' | 'year'>('month');
  const [dietPeriod, setDietPeriod] = useState<'month' | 'quarter' | 'year'>('month');
  const [mealPeriod, setMealPeriod] = useState<'week' | 'month' | 'quarter'>('week');

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await analyticsService.getAnalytics({
        userPeriod,
        dietPeriod,
        mealPeriod
      });
      
      if (response.success && response.data) {
        setAnalytics(response.data);
      } else {
        setError('Không thể tải dữ liệu analytics');
      }
    } catch (err: any) {
      console.error('Error fetching analytics:', err);
      setError(err.message || 'Có lỗi xảy ra khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [userPeriod, dietPeriod, mealPeriod]);

  // Format number with commas
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-3 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="min-h-screen bg-gray-50 p-3">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
          <p>{error || 'Không thể tải dữ liệu analytics'}</p>
        </div>
      </div>
    );
  }

  // Build KPI data
  const kpiData = [
    {
      title: 'Tổng người dùng',
      value: formatNumber(analytics.kpi.totalUsers),
      color: 'bg-gradient-to-r from-blue-400 to-blue-600',
      icon: Users,
      isPercentage: false
    },
    {
      title: 'DAU (Hoạt động hàng ngày)',
      value: formatNumber(analytics.kpi.dau),
      color: 'bg-gradient-to-r from-green-400 to-green-600',
      icon: Eye,
      isPercentage: false
    },
    {
      title: 'MAU (Hoạt động hàng tháng)', 
      value: formatNumber(analytics.kpi.mau),
      color: 'bg-gradient-to-r from-purple-400 to-purple-600',
      icon: TrendingUp,
      isPercentage: false
    },
    {
      title: 'Tăng trưởng tuần',
      value: `${analytics.kpi.weeklyGrowth >= 0 ? '+' : ''}${analytics.kpi.weeklyGrowth.toFixed(1)}%`,
      color: 'bg-gradient-to-r from-orange-400 to-orange-600',
      icon: TrendingUp,
      isPercentage: true
    }
  ];

  // Map diet plans with colors
  const dietData = analytics.dietPlans.map((diet, index) => ({
    ...diet,
    color: dietColors[index % dietColors.length]
  }));

  const genderData = analytics.gender;
  
  // Map age groups with colors and descriptions
  const ageGroups = analytics.ageGroups.map((group, index) => ({
    ...group,
    color: ageColors[index % ageColors.length]
  }));

  const popularMeals = analytics.popularMeals || [];

  return (
    <div className="min-h-screen bg-gray-50 p-3 overflow-y-auto">
      <h1 className="text-xl font-bold text-gray-800 mb-3">Bảng điều khiển phân tích FitPick</h1>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-3 mb-3">
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <div className={`w-6 h-6 rounded-full ${kpi.color} flex items-center justify-center`}>
                <kpi.icon className="w-3 h-3 text-white" />
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800">{kpi.value}</p>
                <p className="text-xs text-gray-500">{kpi.title}</p>
              </div>
            </div>
            <div className={`w-full h-1 ${kpi.color} rounded-full opacity-20`}>
              <div className={`h-1 ${kpi.color} rounded-full`} style={{ width: kpi.isPercentage ? kpi.value : '75%' }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section - Top */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {/* Gender & Age Demographics - Expanded */}
        <div className="bg-white rounded-lg shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Phân nhóm người dùng</h3>
            <select 
              value={userPeriod}
              onChange={(e) => setUserPeriod(e.target.value as 'month' | 'quarter' | 'year')}
              className="text-sm border border-gray-200 rounded px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="month">Tháng này</option>
              <option value="quarter">Quý này</option>
              <option value="year">Năm nay</option>
            </select>
          </div>

          {/* Gender Chart with Absolute Info */}
          <div className="relative mb-5">
            {/* Gender Chart - Centered */}
            <div className="relative w-56 h-56 mx-auto">
              <div className="w-full h-full rounded-full relative overflow-hidden">
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(#3b82f6 0% ${genderData.malePercentage}%, #ec4899 ${genderData.malePercentage}% ${genderData.malePercentage + genderData.femalePercentage}%, #8b5cf6 ${genderData.malePercentage + genderData.femalePercentage}% 100%)`
                  }}
                ></div>
                <div className="absolute inset-6 bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-sm font-bold text-gray-700">Giới tính</div>
                    <div className="text-xs text-gray-500">{(genderData.male + genderData.female + genderData.other).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Absolute Positioned Gender Info - Right Side */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-700">Nam</span>
                <span className="text-sm font-bold text-gray-800">{genderData.malePercentage}%</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                <span className="text-sm text-gray-700">Nữ</span>
                <span className="text-sm font-bold text-gray-800">{genderData.femalePercentage}%</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-sm text-gray-700">Khác</span>
                <span className="text-sm font-bold text-gray-800">{genderData.otherPercentage}%</span>
              </div>
            </div>
          </div>

          {/* Age Groups Section */}
            <h4 className="text-sm font-semibold text-gray-700 mb-4">Phân bố theo thế hệ:</h4>
            <div className="space-y-3">
              {ageGroups.length > 0 ? (
                ageGroups.map((group, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded-full ${group.color}`}></div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">{group.name}</span>
                        <p className="text-xs text-gray-500">{group.description}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-800">{group.percentage}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className={`h-2 rounded-full ${group.color}`}
                        style={{ width: `${group.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 min-w-fit">{formatNumber(group.count)} người</span>
                  </div>
                </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Chưa có dữ liệu nhóm tuổi
                </div>
              )}
            </div>

          {/* Summary Stats */}
          <div className="mt-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-sm text-gray-600">Nhóm tuổi phổ biến nhất</div>
              <div className="text-lg font-bold text-green-600">
                {ageGroups.length > 0 && ageGroups[0] ? `${ageGroups[0].name.split(' ')[0]} (${ageGroups[0].percentage}%)` : 'N/A'}
              </div>
            </div>
          </div>
        </div>

        {/* Diet Preferences - Expanded */}
        <div className="bg-white rounded-lg shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Xu hướng chế độ ăn</h3>
            <select 
              value={dietPeriod}
              onChange={(e) => setDietPeriod(e.target.value as 'month' | 'quarter' | 'year')}
              className="text-sm border border-gray-200 rounded px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="month">Tháng này</option>
              <option value="quarter">Quý này</option>
              <option value="year">Năm nay</option>
            </select>
          </div>

          {/* Pie Chart representation - Larger */}
          {(() => {
            // Build conic gradient dynamically
            let currentPercent = 0;
            const gradientStops = dietData.map((diet, _index) => {
              const startPercent = currentPercent;
              const endPercent = currentPercent + diet.percentage;
              currentPercent = endPercent;
              
              // Map to actual hex colors
              const colorMap: { [key: string]: string } = {
                'bg-orange-500': '#f97316',
                'bg-green-500': '#10b981',
                'bg-emerald-500': '#059669',
                'bg-blue-500': '#3b82f6',
                'bg-purple-500': '#8b5cf6',
                'bg-pink-500': '#ec4899',
                'bg-yellow-500': '#eab308'
              };
              
              const color = colorMap[diet.color] || '#6b7280';
              return `${color} ${startPercent}% ${endPercent}%`;
            }).join(', ');
            
            const totalDiet = dietData.reduce((sum, diet) => sum + diet.value, 0);
            
            return (
              <div className="relative w-60 h-60 mx-auto mb-5">
                <div className="w-full h-full rounded-full relative overflow-hidden">
                  {dietData.length > 0 && (
                    <div 
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(${gradientStops})`
                      }}
                    ></div>
                  )}
                  <div className="absolute inset-8 bg-white rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-sm font-bold text-gray-700">Diet</div>
                      <div className="text-xs text-gray-500">{formatNumber(totalDiet)}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Enhanced Diet Data Display */}
          <div className="space-y-4">
            {dietData.length > 0 ? (
              dietData.map((diet, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full ${diet.color}`}></div>
                    <span className="text-sm font-medium text-gray-700">{diet.name}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-800">{diet.percentage}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className={`h-2 rounded-full ${diet.color}`}
                      style={{ width: `${diet.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 min-w-fit">{formatNumber(diet.value)} người</span>
                </div>
              </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                Chưa có dữ liệu chế độ ăn
              </div>
            )}
          </div>

          {/* Summary Stats */}
          <div className="mt-5 pt-4 border-t">
            <div className="text-center">
              <div className="text-sm text-gray-600">Chế độ ăn phổ biến nhất</div>
              <div className="text-lg font-bold text-orange-600">
                {dietData.length > 0 ? `${dietData[0].name} (${dietData[0].percentage}%)` : 'N/A'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section - Bottom */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Top món ăn phổ biến</h3>
          <select 
            value={mealPeriod}
            onChange={(e) => setMealPeriod(e.target.value as 'week' | 'month' | 'quarter')}
            className="text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">Tuần này</option>
            <option value="month">Tháng này</option>
            <option value="quarter">Quý này</option>
          </select>
        </div>

        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-gray-800">{formatNumber(analytics.totalMealOrders)}</div>
          <div className="text-sm text-gray-500">
            Tổng lượt đặt món {mealPeriod === 'week' ? 'trong tuần' : mealPeriod === 'month' ? 'trong tháng' : 'trong quý'}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-2 text-gray-600 font-semibold">#</th>
                <th className="text-left py-3 px-2 text-gray-600 font-semibold">Tên món</th>
                <th className="text-right py-3 px-2 text-gray-600 font-semibold">Đơn hàng</th>
                <th className="text-right py-3 px-2 text-gray-600 font-semibold">Tỷ lệ</th>
                <th className="text-right py-3 px-2 text-gray-600 font-semibold">Xu hướng</th>
              </tr>
            </thead>
            <tbody>
              {popularMeals.length > 0 ? (
                popularMeals.map((meal) => (
                  <tr key={meal.rank} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-2 font-semibold text-gray-500 text-lg">{meal.rank}</td>
                    <td className="py-3 px-2 text-gray-700 font-medium">{meal.name}</td>
                    <td className="py-3 px-2 text-right text-gray-600 font-semibold">{formatNumber(meal.orders)}</td>
                    <td className="py-3 px-2 text-right text-gray-600 font-semibold">{meal.percentage}%</td>
                    <td className="py-3 px-2 text-right">
                      {meal.trend === 'up' ? (
                        <TrendingUp className="w-5 h-5 text-green-500 inline" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-500 inline" />
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    Chưa có dữ liệu món ăn trong tuần này
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>


    </div>
  );
};

export default Analytics;