import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Kế Hoạch Ăn Uống Cá Nhân Hóa',
      description: 'Nhận kế hoạch dinh dưỡng được thiết kế riêng cho mục tiêu và sở thích ăn uống của bạn',
      buttonText: 'Khám Phá Ngay',
      buttonLink: '/download',
      bgGradient: 'from-purple-600 to-blue-600',
      image: '🥗'
    },
    {
      id: 2,
      title: 'Tìm Kiếm Món Ăn Thông Minh',
      description: 'Khám phá hàng nghìn món ăn với bộ lọc tiên tiến theo calo, nguyên liệu và thời gian nấu',
      buttonText: 'Tìm Hiểu Thêm',
      buttonLink: '/about',
      bgGradient: 'from-green-600 to-teal-600',
      image: '🔍'
    }
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl mx-4 sm:mx-6 lg:mx-8 mb-16">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className={`h-full bg-gradient-to-r ${slide.bgGradient} flex items-center justify-center`}>
              <div className="max-w-4xl mx-auto px-6 text-center text-white">
                <div className="text-6xl mb-6">{slide.image}</div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                  {slide.description}
                </p>
                <Link
                  to={slide.buttonLink}
                  className="inline-block bg-white text-gray-800 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;