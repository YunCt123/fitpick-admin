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
            Người bạn đồng hành dinh dưỡng tuyệt vời với kế hoạch ăn uống cá nhân hóa, tìm kiếm món ăn thông minh,
            và quản lý thực đơn hàng ngày. Đã có gần 100 người dùng tin tưởng và sử dụng FitPick.
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
                FitPick cung cấp các tính năng mạnh mẽ để hỗ trợ bạn trong việc quản lý dinh dưỡng hàng ngày. 
                Ứng dụng cho phép bạn <strong>tạo kế hoạch ăn uống cá nhân hóa</strong> dựa trên thông tin sức khỏe 
                và mục tiêu của bạn, <strong>tìm kiếm và lọc món ăn</strong> theo calo, nguyên liệu, thời gian nấu 
                và nhiều tiêu chí khác, <strong>quản lý thực đơn hàng ngày và theo tuần</strong>, 
                và <strong>theo dõi thống kê dinh dưỡng</strong> để đảm bảo bạn đáp ứng đúng nhu cầu dinh dưỡng.
              </p>
              
              <p>
                Với thuật toán <strong>AI thông minh</strong>, FitPick học hỏi từ sở thích và hành vi ăn uống của bạn 
                để đưa ra những gợi ý món ăn phù hợp nhất. Bạn có thể <strong>lưu món ăn yêu thích</strong> và 
                <strong>đánh giá món ăn</strong> để cùng nhau xây dựng thói quen ăn uống lành mạnh. 
                Hơn 50% người dùng đánh giá app phù hợp và hữu ích cho nhu cầu dinh dưỡng của họ.
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Kế Hoạch Ăn Cá Nhân Hóa</h3>
              <p className="text-gray-600">
                Tạo thực đơn hàng ngày và theo tuần dựa trên thông tin sức khỏe và mục tiêu dinh dưỡng của bạn
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tìm Kiếm Thông Minh</h3>
              <p className="text-gray-600">
                Tìm kiếm và lọc món ăn theo nhiều tiêu chí: calo, nguyên liệu, thời gian nấu, loại món
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Theo Dõi Dinh Dưỡng</h3>
              <p className="text-gray-600">
                Theo dõi thống kê calo, protein, carbs, và fat để đảm bảo đáp ứng đúng nhu cầu dinh dưỡng
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
            Khám phá các tính năng giúp FitPick trở thành người bạn đồng hành dinh dưỡng hoàn hảo
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
              Nhận kế hoạch dinh dưỡng được thiết kế riêng cho sở thích ăn uống và mục tiêu sức khỏe của bạn.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quản Lý Yêu Thích</h3>
            <p className="text-gray-600">
              Lưu lại những món ăn yêu thích và dễ dàng truy cập lại bất cứ lúc nào.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Đánh Giá Món Ăn</h3>
            <p className="text-gray-600">
              Đánh giá và chia sẻ trải nghiệm về các món ăn để giúp người dùng khác lựa chọn phù hợp.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Sẵn Sàng Bắt Đầu Hành Trình Dinh Dưỡng?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Tải ứng dụng di động FitPick và bước đầu tiên hướng tới một chế độ ăn uống lành mạnh hơn.
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