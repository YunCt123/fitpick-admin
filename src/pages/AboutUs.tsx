import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Navigation />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Về <span className="text-purple-600">FitPick</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Chúng tôi có sứ mệnh làm cho fitness trở nên dễ tiếp cận, được cá nhân hóa và thú vị cho mọi người. 
            Tìm hiểu thêm về câu chuyện, giá trị và đội ngũ đằng sau FitPick.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Sứ Mệnh Của Chúng Tôi
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Tại FitPick, chúng tôi tin rằng mọi người đều xứng đáng được tiếp cận với hướng dẫn fitness và dinh dưỡng được cá nhân hóa. 
              Sứ mệnh của chúng tôi là dân chủ hóa sức khỏe và thể chất bằng cách cung cấp các giải pháp thông minh, dựa trên dữ liệu 
              thích ứng với nhu cầu và lối sống độc đáo của từng cá nhân.
            </p>
            <p className="text-lg text-gray-600">
              Chúng tôi kết hợp công nghệ tiên tiến với khoa học dinh dưỡng dựa trên bằng chứng để tạo ra các kế hoạch ăn uống 
              và chương trình fitness thực sự hoạt động cho những người thực với cuộc sống thực.
            </p>
          </div>
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-8 rounded-lg">
            <div className="text-center">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Trao Quyền Cho Cuộc Sống Khỏe Mạnh</h3>
              <p className="text-gray-600">
                Hơn 10,000+ người dùng đã thay đổi cuộc sống của họ với phương pháp fitness và dinh dưỡng được cá nhân hóa của FitPick.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Giá Trị Cốt Lõi
            </h2>
            <p className="text-lg text-gray-600">
              Những nguyên tắc hướng dẫn mọi hoạt động của chúng tôi tại FitPick
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Đổi Mới</h3>
              <p className="text-gray-600">
                Chúng tôi không ngừng mở rộng ranh giới của những gì có thể làm được trong công nghệ fitness, 
                mang đến cho bạn những tiến bộ mới nhất trong các giải pháp sức khỏe cá nhân hóa.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Chân Thực</h3>
              <p className="text-gray-600">
                Chúng tôi cung cấp những khuyến nghị trung thực, dựa trên bằng chứng mà không có mánh khóe hay lời hứa sai lệch. 
                Hành trình sức khỏe của bạn xứng đáng có được sự thật.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Cộng Đồng</h3>
              <p className="text-gray-600">
                Chúng tôi tin vào sức mạnh của sự hỗ trợ cộng đồng. Cùng nhau, chúng ta có thể đạt được nhiều hơn bất cứ điều gì một mình có thể làm được.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Gặp Gỡ Đội Ngũ Của Chúng Tôi
          </h2>
          <p className="text-lg text-gray-600">
            Những cá nhân đầy nhiệt huyết đằng sau thành công của FitPick
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">H</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Huynh Ngoc Ky</h3>
            <p className="text-purple-600 mb-3">Trưởng nhóm</p>
            <p className="text-gray-600">
              Lãnh đạo dự án với tầm nhìn chiến lược và kinh nghiệm quản lý sản phẩm công nghệ sức khỏe.
            </p>
          </div>

          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">H</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Huynh Ngoc Khanh Nguyen</h3>
            <p className="text-purple-600 mb-3">Thành viên</p>
            <p className="text-gray-600">
              Chuyên gia phát triển ứng dụng mobile với đam mê tạo ra trải nghiệm người dùng tuyệt vời.
            </p>
          </div>

          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">P</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Phan Lam Khanh</h3>
            <p className="text-purple-600 mb-3">Thành viên</p>
            <p className="text-gray-600">
              Chuyên gia UI/UX với kỹ năng thiết kế giao diện người dùng trực quan và thân thiện.
            </p>
          </div>

          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">T</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Trinh Duc Anh</h3>
            <p className="text-purple-600 mb-3">Thành viên</p>
            <p className="text-gray-600">
              Lập trình viên backend với chuyên môn về xây dựng hệ thống và tối ưu hiệu suất ứng dụng.
            </p>
          </div>

          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">N</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nguyen Cao Thanh Ngan</h3>
            <p className="text-purple-600 mb-3">Thành viên</p>
            <p className="text-gray-600">
              Chuyên gia phân tích dữ liệu và AI, tập trung vào việc phát triển thuật toán cá nhân hóa dinh dưỡng.
            </p>
          </div>

          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-r from-red-400 to-red-600 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">T</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Tran Thi Thanh Trang</h3>
            <p className="text-purple-600 mb-3">Thành viên</p>
            <p className="text-gray-600">
              Chuyên gia kiểm thử chất lượng và đảm bảo trải nghiệm người dùng ổn định và mượt mà.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-purple-200">Người Dùng Hoạt Động</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-purple-200">Bữa Ăn Được Lập Kế Hoạch</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-purple-200">Sự Hài Lòng Của Người Dùng</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-purple-200">Hỗ Trợ Có Sẵn</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Liên Hệ Với Chúng Tôi
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Có câu hỏi hoặc muốn tìm hiểu thêm? Chúng tôi rất muốn nghe từ bạn.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">support@fitpick.com</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Điện Thoại</h3>
              <p className="text-gray-600">+84 123 456 789</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Địa Chỉ</h3>
              <p className="text-gray-600">Thành phố Hồ Chí Minh, Việt Nam</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sẵn Sàng Bắt Đầu Hành Trình?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Tham gia cùng hàng nghìn người dùng đã thay đổi cuộc sống của họ với FitPick.
          </p>
          <Link
            to="/download"
            className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-purple-700 transition-colors inline-block"
          >
            Tải Ứng Dụng
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;