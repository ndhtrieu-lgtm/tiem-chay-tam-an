import React, { useState, useEffect } from 'react';
import { Leaf, Utensils, Heart, TrendingUp, ChevronRight, Star } from 'lucide-react';
import { FoodItem } from '../types';
import { INITIAL_FOOD_ITEMS } from '../data';

interface HomePartProps {
  onViewMenu?: () => void;
  onAddToCart?: (item: FoodItem) => void;
  foodItems?: FoodItem[];
  setActiveTab?: (tab: string) => void;
  addToCart?: (item: FoodItem, type?: 'food' | 'shop') => void;
  openChefAI?: () => void;
}

const HomePart: React.FC<HomePartProps> = ({ onViewMenu, onAddToCart, foodItems, setActiveTab, addToCart, openChefAI }) => {
  const [featuredItems, setFeaturedItems] = useState<FoodItem[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Get special items for featured section
    const special = INITIAL_FOOD_ITEMS.filter((item) => item.isSpecial).slice(0, 3);
    setFeaturedItems(special);
    setIsAnimating(true);
  }, []);

  const handleAddToCart = (item: FoodItem): void => {
    if (addToCart) {
      addToCart(item, 'food');
      return;
    }
    if (onAddToCart) {
      onAddToCart(item);
    }
  };

  const handleViewMenu = (): void => {
    if (setActiveTab) {
      setActiveTab('menu');
      return;
    }
    if (onViewMenu) {
      onViewMenu();
    }
  };

  const stats = [
    {
      icon: <Leaf className="w-8 h-8" />,
      label: '100% Chay',
      description: 'Thực phẩm chay nguyên chất',
      color: 'from-emerald-600 to-green-600',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      label: 'Sức Khỏe',
      description: 'Dinh dưỡng cân bằng',
      color: 'from-rose-600 to-red-600',
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      label: 'Đẳng Cấp',
      description: 'Chất lượng cao cấp',
      color: 'from-amber-500 to-orange-600',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      label: 'Phổ Biến',
      description: 'Được yêu thích 1000+',
      color: 'from-purple-600 to-pink-600',
    },
  ];

  const premiumDishes: FoodItem[] = [
    {
      id: 'premium_1',
      name: 'Phở Chay Thập Cẩm',
      price: 89000,
      category: 'mon_nuoc',
      image: 'https://images.unsplash.com/photo-1604908177520-7fef58f0a887?w=700&auto=format&fit=crop&q=80',
      description: 'Phở chay nước dùng thanh ngọt, đậu hũ chiên giòn, nấm đông cô và rau thơm tươi mát.',
      isSpecial: true,
      ingredients: ['Nước dùng rau củ', 'Đậu hũ chiên', 'Nấm đông cô', 'Rau thơm', 'Bánh phở tươi'],
      calories: 420,
    },
    {
      id: 'premium_2',
      name: 'Súp Bào Ngư Chay',
      price: 95000,
      category: 'mon_nuoc',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&auto=format&fit=crop&q=80',
      description: 'Súp bào ngư chay cao cấp, thơm vị nấm, đậu hũ non và tiêu trắng dịu nhẹ.',
      isSpecial: true,
      ingredients: ['Bào ngư chay', 'Đậu hũ non', 'Nấm hương', 'Tiêu trắng', 'Hành ngò'],
      calories: 380,
    },
    {
      id: 'premium_3',
      name: 'Cơm Lam Tôm Chay',
      price: 92000,
      category: 'mon_dung_com',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&auto=format&fit=crop&q=80',
      description: 'Cơm lam nếp dẻo, tôm chay giòn, muối vừng thơm và rau sống xanh mướt.',
      isSpecial: true,
      ingredients: ['Gạo nếp', 'Tôm chay', 'Muối vừng', 'Lá dong', 'Rau sống'],
      calories: 450,
    },
    {
      id: 'premium_4',
      name: 'Bún Quế Cao Cấp',
      price: 87000,
      category: 'mon_nuoc',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=700&auto=format&fit=crop&q=80',
      description: 'Bún quế chay thượng hạng với nước lèo thanh tao, chả cá chay và thảo mộc đặc trưng.',
      isSpecial: false,
      ingredients: ['Bún tươi', 'Chả cá chay', 'Quế', 'Hành ngò', 'Rau thơm'],
      calories: 410,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative px-4 py-16 md:py-28 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/6 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/6 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className={`text-center transform transition-all duration-1000 ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Logo/Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-950/50 border border-emerald-500/30 rounded-full px-4 py-2 mb-6">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-300">Tiệm Chay Tâm An</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              Ẩm Thực Chay Tâm Linh
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Khám phá hương vị tinh tế của ẩm thực chay nguyên chất. Mỗi món ăn được chế biến tỉ mỉ với tình yêu, dinh dưỡng cân bằng cho sức khỏe tối ưu.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleViewMenu}
                className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold rounded-2xl transition duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-lg shadow-slate-950/20"
              >
                Khám Phá Thực Đơn
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => {}}
                className="px-8 py-4 border-2 border-amber-500/50 hover:border-amber-400 text-amber-300 hover:text-amber-200 font-semibold rounded-2xl transition duration-300 hover:bg-amber-500/10"
              >
                Liên Hệ Chúng Tôi
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="group relative p-6 rounded-xl bg-slate-900/50 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:bg-slate-900/70"
              >
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} p-2 mb-4 text-white`}>
                    {stat.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{stat.label}</h3>
                  <p className="text-sm text-slate-400">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="px-4 py-20 md:py-28 bg-slate-950/50">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-emerald-400 mb-4">
              <Star className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Đặc Biệt</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Những Món Ăn Được Yêu Thích
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Những món ăn đặc biệt được chọn lọc kỹ lưỡng, mang đến trải nghiệm ẩm thực tuyệt vời
            </p>
          </div>

          {/* Featured Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-slate-900/50 border border-slate-700/50 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-slate-800">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                  {/* Special Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-slate-950/90 text-amber-300 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 border border-amber-400/20">
                      <Star className="w-4 h-4" />
                      Đặc biệt
                    </div>
                  </div>

                  {/* Calories Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-slate-950/70 backdrop-blur-sm border border-slate-700 text-slate-300 px-3 py-1 rounded-full text-xs font-medium">
                      {item.calories} kcal
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Ingredients Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.ingredients.slice(0, 2).map((ing, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-emerald-950/50 text-emerald-300 border border-emerald-500/30 px-2 py-1 rounded"
                      >
                        {ing}
                      </span>
                    ))}
                    {item.ingredients.length > 2 && (
                      <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded">
                        +{item.ingredients.length - 2} khác
                      </span>
                    )}
                  </div>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-emerald-400">
                        {item.price.toLocaleString()}₫
                      </div>
                      {item.originalPrice && (
                        <div className="text-sm text-slate-500 line-through">
                          {item.originalPrice.toLocaleString()}₫
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="inline-flex min-w-[130px] items-center justify-center rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:bg-emerald-400 shadow-md shadow-slate-950/20"
                      title="Thêm vào giỏ"
                    >
                      <Utensils className="w-5 h-5 mr-2" />
                      Thêm giỏ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Premium Vegetarian Menu Section */}
          <section className="mt-16 px-4 py-20 md:py-24 bg-slate-950 rounded-3xl border border-slate-800/70 shadow-xl shadow-emerald-500/10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-14">
                <p className="text-sm uppercase tracking-[0.25em] text-emerald-400 mb-3">Thực đơn cao cấp</p>
                <h3 className="text-4xl md:text-5xl font-bold text-white">Món Ăn Chay Cao Cấp</h3>
                <p className="text-slate-400 max-w-2xl mx-auto mt-4">
                  Bộ sưu tập các món chay thượng hạng được thiết kế cho trải nghiệm ẩm thực tinh tế và sang trọng tại Tiệm Chay Tâm An.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {premiumDishes.map((dish) => (
                  <article
                    key={dish.id}
                    className="group relative overflow-hidden rounded-[1.75rem] border border-slate-800/70 bg-slate-950 shadow-[0_24px_64px_-32px_rgba(16,185,129,0.2)] transition-transform duration-300 hover:-translate-y-1 hover:border-emerald-500/40"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/35 to-transparent"></div>
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <span className="inline-flex items-center gap-2 rounded-full bg-slate-950/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300 border border-slate-700/70">
                          Cao cấp
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h4 className="text-2xl font-semibold text-white mb-3">{dish.name}</h4>
                      <p className="text-slate-400 text-sm mb-5 leading-relaxed min-h-[84px]">{dish.description}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {dish.ingredients.slice(0, 3).map((ingredient, index) => (
                          <span
                            key={index}
                            className="rounded-full border border-slate-700/60 bg-slate-950/70 px-3 py-1 text-[11px] tracking-[0.08em] text-slate-300"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <div className="text-3xl font-semibold text-emerald-300">{dish.price.toLocaleString()}₫</div>
                          <div className="text-sm text-slate-500">Giá tham khảo</div>
                        </div>
                        <button
                          onClick={() => handleAddToCart(dish)}
                          className="inline-flex min-w-[140px] items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-md shadow-emerald-500/20 transition duration-300 hover:bg-emerald-400"
                        >
                          Thêm giỏ
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* View All Button */}
          <div className="text-center mt-12">
            <button
              onClick={handleViewMenu}
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-emerald-500/50 hover:border-emerald-400 text-emerald-300 hover:text-emerald-200 font-semibold rounded-lg transition-all duration-300 hover:bg-emerald-500/10 group"
            >
              Xem Toàn Bộ Thực Đơn
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              <div className="inline-flex items-center gap-2 text-emerald-400 mb-4">
                <Heart className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">Tại Sao Chọn Chúng Tôi</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Ẩm Thực Chay với Đạo Đức & Sức Khỏe
              </h2>

              <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                Chúng tôi tin rằng ẩm thực chay không chỉ là một lựa chọn ăn uống mà là một lối sống bền vững. Mỗi món ăn được chuẩn bị với tình yêu thương, sử dụng nguyên liệu tươi sạch tốt nhất.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  'Nguyên liệu hữu cơ tự nhiên',
                  'Không sử dụng hóa chất độc hại',
                  'Đầy đủ dinh dưỡng cân bằng',
                  'Chế biến theo phương pháp truyền thống',
                  'Phục vụ nhanh chóng với tình yêu',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-300">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={handleViewMenu}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/50"
              >
                Bắt Đầu Khám Phá
              </button>
            </div>

            {/* Right - Visual */}
            <div className="relative h-96 md:h-full min-h-96 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-600/20 rounded-2xl"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/50">
                    <Leaf className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">100% Chay</h3>
                  <p className="text-slate-300 mt-2">Dinh dưỡng tự nhiên cho cuộc sống</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter/CTA Section */}
      <section className="px-4 py-16 md:py-24 bg-gradient-to-r from-emerald-950/30 via-slate-950 to-green-950/30 border-y border-emerald-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Sẵn Sàng Trải Nghiệm Ẩm Thực Chay Tuyệt Vời?
          </h2>

          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Hãy đặt hàng ngay hôm nay và nhận được hương vị tinh tế, dinh dưỡng cân bằng, cùng dịch vụ tận tâm nhất.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleViewMenu}
              className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/50"
            >
              Xem Thực Đơn
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 border-2 border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-semibold rounded-lg transition-all duration-300 hover:bg-slate-900/50">
              Liên Hệ
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePart;
