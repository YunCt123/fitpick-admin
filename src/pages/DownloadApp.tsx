import { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import FitPickAppQR from "../assets/FitPick_App.png";

const DownloadApp = () => {
  const [copied, setCopied] = useState(false);

  // Link Expo để tải ứng dụng
  const expoUrl = "https://drive.google.com/drive/u/1/folders/1wY-JGGuBU_uOm51d_a_xIjb_72MQW61_"; // Có thể cập nhật sau với link thực tế

  const handleCopyLink = () => {
    navigator.clipboard.writeText(expoUrl);   
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Navigation />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Tải Ứng Dụng <span className="text-purple-600">FitPick</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Tải ứng dụng di động FitPick và bắt đầu hành trình dinh dưỡng được cá nhân hóa ngay hôm nay. 
            Hiện tại có sẵn qua Expo Go cho thiết bị Android.
          </p>
        </div>
      </div>

      {/* QR Code Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg inline-block max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Quét Mã QR Để Tải Ứng Dụng
            </h2>
            
            {/* QR Code từ ảnh có sẵn */}
            <div className="w-64 h-64 bg-white border-4 border-gray-200 rounded-lg mx-auto mb-6 flex items-center justify-center p-4">
              <img 
                src={FitPickAppQR} 
                alt="FitPick App QR Code"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>

            <p className="text-gray-600 mb-4">
              Hướng camera của bạn vào mã QR này để tải ứng dụng ngay lập tức
            </p>
            <p className="text-sm text-gray-500 mb-6">
              * Cần cài đặt ứng dụng Expo Go trên điện thoại của bạn
            </p>
            
            <button
              onClick={handleCopyLink}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 mx-auto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="https://drive.google.com/drive/u/1/folders/1wY-JGGuBU_uOm51d_a_xIjb_72MQW61_" />
              </svg>
              {copied ? "Đã sao chép!" : "Sao chép link tải"}
            </button>
          </div>

          {/* App Info */}
          <div className="mt-12 p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tính Năng Ứng Dụng:</h3>
            <ul className="space-y-2 text-gray-700 text-left">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Lập kế hoạch ăn uống cá nhân hóa
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Tìm kiếm món ăn thông minh với bộ lọc đa dạng
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Quản lý thực đơn hàng ngày và theo tuần
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Theo dõi thống kê dinh dưỡng (calo, protein, carbs, fat)
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Lưu món ăn yêu thích và đánh giá món ăn
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* System Requirements */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Yêu Cầu Hệ Thống
            </h2>
            <p className="text-lg text-gray-600">
              Đảm bảo thiết bị của bạn đáp ứng các yêu cầu tối thiểu
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1518-.5972.416.416 0 00-.5972.1518l-2.0223 3.5059C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4438a.4161.4161 0 00-.5972-.1518.416.416 0 00-.1518.5972L6.0889 9.3214C2.8375 11.168.8877 14.5443.8877 18.7091h22.2246c0-4.1648-1.9498-7.5411-5.2012-9.3877z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Yêu Cầu Hệ Thống</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Ứng dụng Expo Go đã được cài đặt</li>
                <li>• Android 7.0 (API level 24) trở lên</li>
                <li>• RAM 2GB trở lên</li>
                <li>• 100 MB dung lượng trống</li>
                <li>• Kết nối internet cần thiết</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Câu Hỏi Thường Gặp
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Ứng dụng FitPick có miễn phí không?</h3>
            <p className="text-gray-600">
              Có, FitPick cung cấp phiên bản miễn phí với các tính năng cơ bản. Các tính năng nâng cao có sẵn với gói đăng ký premium.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tôi có cần tạo tài khoản không?</h3>
            <p className="text-gray-600">
              Có, việc tạo tài khoản cho phép bạn lưu tiến độ, đồng bộ trên nhiều thiết bị và nhận gợi ý cá nhân hóa.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tôi có thể sử dụng ứng dụng khi không có mạng?</h3>
            <p className="text-gray-600">
              Một số tính năng có thể sử dụng offline, nhưng kết nối internet cần thiết để đồng bộ dữ liệu và truy cập nội dung mới.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Làm sao để được hỗ trợ?</h3>
              <p className="text-gray-600">
              Bạn có thể liên hệ đội hỗ trợ qua phần trợ giúp trong ứng dụng hoặc email tới fitpick25.app@gmail.com.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Bắt Đầu Hành Trình Dinh Dưỡng Ngay Hôm Nay
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Tải ứng dụng FitPick ngay bây giờ và tham gia cùng gần 100 người dùng đang quản lý dinh dưỡng hàng ngày.
          </p>
          <button
            onClick={handleCopyLink}
            className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors inline-block"
          >
            {copied ? "Đã sao chép link!" : "Sao chép link tải"}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DownloadApp;