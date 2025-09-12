import React from 'react';
import { TrendingUp, TrendingDown, Users, Eye, MapPin, Download, Star } from 'lucide-react';

const Analytics: React.FC = () => {
  // Sample data for the analytics
  const kpiData = [
    {
      title: 'Phiên mới',
      value: '43.20%',
      color: 'bg-gradient-to-r from-green-400 to-green-600',
      icon: Users,
      isPercentage: true
    },
    {
      title: 'Tỉ lệ thoát',
      value: '55.45%',
      color: 'bg-gradient-to-r from-purple-400 to-purple-600',
      icon: TrendingUp,
      isPercentage: true
    },
    {
      title: 'Trang/Phiên',
      value: '3205',
      color: 'bg-gradient-to-r from-pink-400 to-pink-600',
      icon: Eye,
      isPercentage: false
    },
    {
      title: 'Phiên',
      value: '1502',
      color: 'bg-gradient-to-r from-orange-400 to-orange-600',
      icon: Users,
      isPercentage: false
    }
  ];

  const channelData = [
    { name: 'Tìm kiếm tự nhiên', value: 8422, color: 'bg-orange-500' },
    { name: 'Giới thiệu', value: 3214, color: 'bg-pink-500' },
    { name: 'Khác', value: 923, color: 'bg-blue-500' }
  ];

  const audienceData = {
    sessions: 12342,
    users: 8443,
    sessionsPercentage: 72,
    usersPercentage: 28
  };

  const countryData = [
    { country: 'Mỹ', visits: 4303, percentage: 31.2, trend: 'up' },
    { country: 'Trung Quốc', visits: 2335, percentage: 15.6, trend: 'up' },
    { country: 'Úc', visits: 2107, percentage: 14.7, trend: 'up' },
    { country: 'Đức', visits: 1804, percentage: 12.8, trend: 'down' },
    { country: 'Canada', visits: 968, percentage: 8.4, trend: 'up' }
  ];

  return (
    <div className="h-screen bg-gray-50 p-3 overflow-hidden flex flex-col">
      <h1 className="text-xl font-bold text-gray-800 mb-3">Bảng điều khiển phân tích</h1>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-3 mb-3">
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
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

      <div className="grid grid-cols-3 gap-3 mb-3 flex-1">
        {/* Audience Metrics */}
        <div className="bg-white rounded-lg shadow-sm p-3">
          <h3 className="text-xs font-semibold text-gray-800 mb-2">Thống kê khán giả</h3>
          <p className="text-xs text-gray-600 mb-2">Đã được xác nhận rằng người đọc sẽ bị phân tâm</p>
          
          <div className="relative w-24 h-24 mx-auto mb-2">
            <div className="w-full h-full rounded-full relative overflow-hidden">
              <div 
                className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 to-pink-600"
                style={{
                  background: `conic-gradient(#ec4899 0% ${audienceData.sessionsPercentage}%, #8b5cf6 ${audienceData.sessionsPercentage}% 100%)`
                }}
              ></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-sm font-bold text-pink-500">{audienceData.sessionsPercentage}%</div>
                  <div className="text-sm font-bold text-purple-500">{audienceData.usersPercentage}%</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                <span className="text-xs text-gray-600">Phiên</span>
              </div>
              <span className="text-xs font-semibold text-gray-800">{audienceData.sessions.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="text-xs text-gray-600">Người dùng</span>
              </div>
              <span className="text-xs font-semibold text-gray-800">{audienceData.users.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Sessions by Channel */}
        <div className="bg-white rounded-lg shadow-sm p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-gray-800">Phiên theo kênh</h3>
            <select className="text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>Hàng tuần</option>
              <option>Hàng tháng</option>
              <option>Hàng năm</option>
            </select>
          </div>

          {/* Chart area - simplified representation */}
          <div className="h-24 mb-2 relative">
            <svg className="w-full h-full" viewBox="0 0 400 90">
              {/* Chart lines */}
              <polyline
                fill="none"
                stroke="#f97316"
                strokeWidth="2"
                points="50,70 80,50 120,60 160,40 200,50 240,60 280,45 320,55 350,60"
              />
              <polyline
                fill="none"
                stroke="#ec4899"
                strokeWidth="2"
                points="50,75 80,70 120,65 160,55 200,60 240,50 280,55 320,45 350,50"
              />
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                points="50,80 80,78 120,75 160,73 200,70 240,75 280,73 320,70 350,73"
              />
              
              {/* Days labels */}
              <text x="80" y="87" className="text-xs fill-gray-500">T2</text>
              <text x="120" y="87" className="text-xs fill-gray-500">T3</text>
              <text x="160" y="87" className="text-xs fill-gray-500">T4</text>
              <text x="200" y="87" className="text-xs fill-gray-500">T5</text>
              <text x="240" y="87" className="text-xs fill-gray-500">T6</text>
              <text x="280" y="87" className="text-xs fill-gray-500">T7</text>
              <text x="320" y="87" className="text-xs fill-gray-500">CN</text>
            </svg>
          </div>

          <div className="space-y-1">
            {channelData.map((channel, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${channel.color}`}></div>
                  <span className="text-xs text-gray-600">{channel.name}</span>
                </div>
                <span className="text-xs font-semibold text-gray-800">{channel.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visitor's Locations */}
        <div className="bg-white rounded-lg shadow-sm p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-gray-800">Vị trí khách</h3>
            <select className="text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>Hàng tuần</option>
              <option>Hàng tháng</option>
              <option>Hàng năm</option>
            </select>
          </div>

          {/* World Map Placeholder */}
          <div className="h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded mb-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600 opacity-20"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <MapPin className="w-4 h-4 text-purple-600" />
            </div>
          </div>

          <div className="text-center mb-2">
            <div className="text-sm font-bold text-gray-800">12,883</div>
            <div className="text-xs text-gray-500">Lượt truy cập theo quốc gia</div>
          </div>

          <div className="space-y-1">
            {countryData.map((country, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-gray-700 font-medium">{country.country}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-gray-600">{country.visits.toLocaleString()}</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500">{country.percentage}%</span>
                    {country.trend === 'up' ? (
                      <TrendingUp className="w-3 h-3 text-green-500" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Pictures Card */}
        <div className="bg-white rounded-lg shadow-sm p-3 text-center">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg mx-auto mb-1 flex items-center justify-center">
            <Eye className="w-4 h-4 text-white" />
          </div>
          <div className="text-sm font-bold text-gray-800 mb-1">239 Hình ảnh</div>
          <p className="text-xs text-gray-500 mb-2">Tải xuống bộ sưu tập hoàn tất</p>
          <button className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-3 py-1 rounded text-xs font-medium hover:from-purple-600 hover:to-purple-800 transition-all flex items-center space-x-1 mx-auto">
            <Download className="w-3 h-3" />
            <span>Tải ngay</span>
          </button>
        </div>

        {/* New Followers Card */}
        <div className="bg-white rounded-lg shadow-sm p-3 text-center">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg mx-auto mb-1 flex items-center justify-center">
            <Star className="w-4 h-4 text-white" />
          </div>
          <div className="text-sm font-bold text-gray-800 mb-1">5,453</div>
          <p className="text-xs text-gray-500 mb-2">Người theo dõi mới trên Stack</p>
          <button className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-3 py-1 rounded text-xs font-medium hover:from-purple-600 hover:to-purple-800 transition-all">
            Tìm thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;