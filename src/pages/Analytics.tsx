import React from 'react';
import { TrendingUp, TrendingDown, Users, Eye } from 'lucide-react';

const Analytics: React.FC = () => {
  // Sample data for the analytics - User Overview
  const kpiData = [
    {
      title: 'Tổng người dùng',
      value: '12,543',
      color: 'bg-gradient-to-r from-blue-400 to-blue-600',
      icon: Users,
      isPercentage: false
    },
    {
      title: 'DAU (Hoạt động hàng ngày)',
      value: '3,205',
      color: 'bg-gradient-to-r from-green-400 to-green-600',
      icon: Eye,
      isPercentage: false
    },
    {
      title: 'MAU (Hoạt động hàng tháng)', 
      value: '8,932',
      color: 'bg-gradient-to-r from-purple-400 to-purple-600',
      icon: TrendingUp,
      isPercentage: false
    },
    {
      title: 'Tăng trưởng tuần',
      value: '12.5%',
      color: 'bg-gradient-to-r from-orange-400 to-orange-600',
      icon: TrendingUp,
      isPercentage: true
    }
  ];

  const dietData = [
    { name: 'Keto', value: 3542, percentage: 28, color: 'bg-orange-500' },
    { name: 'Eat Clean', value: 2814, percentage: 23, color: 'bg-green-500' },
    { name: 'Chay/Thuần chay', value: 2156, percentage: 17, color: 'bg-emerald-500' },
    { name: 'Không gluten', value: 1654, percentage: 13, color: 'bg-blue-500' },
    { name: 'Khác', value: 2377, percentage: 19, color: 'bg-purple-500' }
  ];

  const genderData = {
    male: 6543,
    female: 5234,
    other: 766,
    malePercentage: 52,
    femalePercentage: 42,
    otherPercentage: 6
  };

  const ageGroups = [
    { 
      name: 'Gen Z (18-25)', 
      count: 4521, 
      percentage: 36, 
      color: 'bg-blue-500',
      description: 'Thế hệ số hóa, yêu thích công nghệ'
    },
    { 
      name: 'Millennials (26-35)', 
      count: 5234, 
      percentage: 42, 
      color: 'bg-green-500',
      description: 'Thế hệ Y, quan tâm sức khỏe'
    },
    { 
      name: 'Gen X (36-45)', 
      count: 2134, 
      percentage: 17, 
      color: 'bg-purple-500',
      description: 'Thế hệ X, có thu nhập ổn định'
    },
    { 
      name: 'Boomers (>45)', 
      count: 654, 
      percentage: 5, 
      color: 'bg-orange-500',
      description: 'Thế hệ trưởng thành, quan tâm dinh dưỡng'
    }
  ];



  const popularMeals = [
    { name: 'Salad bơ', orders: 1523, percentage: 18.5, trend: 'up' },
    { name: 'Gà nướng kiểu Địa Trung Hải', orders: 1342, percentage: 16.3, trend: 'up' },
    { name: 'Cơm quinoa với rau củ', orders: 1156, percentage: 14.0, trend: 'up' },
    { name: 'Smoothie xanh detox', orders: 987, percentage: 12.0, trend: 'down' },
    { name: 'Cá hồi nướng', orders: 834, percentage: 10.1, trend: 'up' },
    { name: 'Bánh yến mạch', orders: 723, percentage: 8.8, trend: 'up' },
    { name: 'Súp lơ xanh', orders: 612, percentage: 7.4, trend: 'down' },
    { name: 'Yogurt Hy Lạp', orders: 445, percentage: 5.4, trend: 'up' }
  ];

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
            <select className="text-sm border border-gray-200 rounded px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>Tháng này</option>
              <option>Quý này</option>
              <option>Năm nay</option>
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
              {ageGroups.map((group, index) => (
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
                    <span className="text-xs text-gray-600 min-w-fit">{group.count.toLocaleString()} người</span>
                  </div>
                </div>
              ))}
            </div>

          {/* Summary Stats */}
          <div className="mt-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-sm text-gray-600">Nhóm tuổi phổ biến nhất</div>
              <div className="text-lg font-bold text-green-600">Millennials (42%)</div>
            </div>
          </div>
        </div>

        {/* Diet Preferences - Expanded */}
        <div className="bg-white rounded-lg shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Xu hướng chế độ ăn</h3>
            <select className="text-sm border border-gray-200 rounded px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>Tháng này</option>
              <option>Quý này</option>
              <option>Năm nay</option>
            </select>
          </div>

          {/* Pie Chart representation - Larger */}
          <div className="relative w-60 h-60 mx-auto mb-5">
            <div className="w-full h-full rounded-full relative overflow-hidden">
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(
                    #f97316 0% 28%, 
                    #10b981 28% 51%, 
                    #059669 51% 68%, 
                    #3b82f6 68% 81%, 
                    #8b5cf6 81% 100%
                  )`
                }}
              ></div>
              <div className="absolute inset-8 bg-white rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-sm font-bold text-gray-700">Diet</div>
                  <div className="text-xs text-gray-500">{dietData.reduce((sum, diet) => sum + diet.value, 0).toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Diet Data Display */}
          <div className="space-y-4">
            {dietData.map((diet, index) => (
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
                  <span className="text-xs text-gray-600 min-w-fit">{diet.value.toLocaleString()} người</span>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="mt-5 pt-4 border-t">
            <div className="text-center">
              <div className="text-sm text-gray-600">Chế độ ăn phổ biến nhất</div>
              <div className="text-lg font-bold text-orange-600">Keto (28%)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section - Bottom */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Top món ăn phổ biến</h3>
          <select className="text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Tuần này</option>
            <option>Tháng này</option>
            <option>Quý này</option>
          </select>
        </div>

        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-gray-800">8,622</div>
          <div className="text-sm text-gray-500">Tổng lượt đặt món trong tuần</div>
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
              {popularMeals.map((meal, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-2 font-semibold text-gray-500 text-lg">{index + 1}</td>
                  <td className="py-3 px-2 text-gray-700 font-medium">{meal.name}</td>
                  <td className="py-3 px-2 text-right text-gray-600 font-semibold">{meal.orders.toLocaleString()}</td>
                  <td className="py-3 px-2 text-right text-gray-600 font-semibold">{meal.percentage}%</td>
                  <td className="py-3 px-2 text-right">
                    {meal.trend === 'up' ? (
                      <TrendingUp className="w-5 h-5 text-green-500 inline" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-500 inline" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


    </div>
  );
};

export default Analytics;