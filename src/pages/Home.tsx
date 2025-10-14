import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import BannerCarousel from "../components/BannerCarousel";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Navigation />

      {/* Banner Carousel */}
      <div className="pt-8">
        <BannerCarousel />
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Chào Mừng Đến Với <span className="text-purple-600">FitPick</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Người bạn đồng hành fitness tuyệt vời với kế hoạch ăn uống cá nhân hóa, theo dõi tập luyện, 
            và đạt được mục tiêu sức khỏe. Tham gia cùng hàng nghìn người dùng trong hành trình fitness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/download"
              className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Tải Ứng Dụng Di Động
            </Link>
            <Link
              to="/about"
              className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-purple-600 hover:text-white transition-colors"
            >
              Tìm Hiểu Thêm
            </Link>
          </div>
        </div>
      </div>

      {/* App Overview Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Về Ứng Dụng FitPick
            </h2>
            <div className="max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed space-y-6">
              <p>
                <strong>FitPick</strong> là một ứng dụng di động đột phá được thiết kế để cách mạng hóa 
                cách bạn tiếp cận dinh dưỡng và sức khỏe. Chúng tôi hiểu rằng mỗi cá nhân có những nhu cầu 
                dinh dưỡng và phong cách sống khác nhau, vì vậy FitPick được xây dựng để cung cấp các gợi ý 
                bữa ăn được cá nhân hóa hoàn toàn phù hợp với bạn.
              </p>
              
              <p>
                Dù bạn là một <strong>vận động viên chuyên nghiệp</strong> đang tìm kiếm chế độ dinh dưỡng 
                tối ưu để nâng cao hiệu suất, một <strong>người cao tuổi</strong> cần chăm sóc sức khỏe đặc biệt, 
                một <strong>trẻ em</strong> đang trong giai đoạn phát triển, hay những người có các 
                <strong>nhu cầu ăn kiêng đặc biệt</strong> như chế độ ăn thuần chay, ketogenic, hoặc 
                không gluten - FitPick đều có giải pháp phù hợp dành cho bạn.
              </p>
              
              <p>
                Sức mạnh thực sự của FitPick nằm ở khả năng <strong>học hỏi và thích nghi</strong> với 
                sở thích, mục tiêu sức khỏe và lối sống của bạn. Thông qua thuật toán AI tiên tiến, 
                ứng dụng không chỉ đề xuất các món ăn ngon mà còn đảm bảo chúng đáp ứng đúng nhu cầu 
                dinh dưỡng cụ thể của bạn, giúp bạn đạt được mục tiêu sức khỏe một cách bền vững và hiệu quả.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Cá Nhân Hóa Hoàn Toàn</h3>
              <p className="text-gray-600">
                Phù hợp với mọi đối tượng từ vận động viên, người cao tuổi, trẻ em đến những người có nhu cầu ăn kiêng đặc biệt
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Thông Minh</h3>
              <p className="text-gray-600">
                Thuật toán AI tiên tiến học hỏi sở thích và thích nghi với mục tiêu sức khỏe của bạn
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Hiệu Quả Bền Vững</h3>
              <p className="text-gray-600">
                Giúp bạn đạt được mục tiêu sức khỏe một cách bền vững và hiệu quả lâu dài
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tại Sao Chọn FitPick?
          </h2>
          <p className="text-lg text-gray-600">
            Khám phá các tính năng giúp FitPick trở thành người bạn đồng hành fitness hoàn hảo
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Kế Hoạch Ăn Cá Nhân Hóa</h3>
            <p className="text-gray-600">
              Nhận kế hoạch dinh dưỡng được thiết kế riêng cho sở thích ăn uống và mục tiêu fitness của bạn.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Theo Dõi Tiến Độ</h3>
            <p className="text-gray-600">
              Giám sát hành trình fitness với phân tích chi tiết và báo cáo tiến độ.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Cộng Đồng Chuyên Gia</h3>
            <p className="text-gray-600">
              Kết nối với các chuyên gia fitness và cộng đồng hỗ trợ để duy trì động lực.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Sẵn Sàng Bắt Đầu Hành Trình Fitness?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Tải ứng dụng di động FitPick và bước đầu tiên hướng tới một bạn khỏe mạnh hơn.
          </p>
          <Link
            to="/download"
            className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors inline-block"
          >
            Tải Ngay
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;