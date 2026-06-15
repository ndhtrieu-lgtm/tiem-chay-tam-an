import React from 'react';
import { Search, SlidersHorizontal, ShoppingCart, HelpCircle, Flame, Sparkles } from 'lucide-react';
import { FoodItem } from '../types';

interface MenuPartProps {
  foodItems: FoodItem[];
  addToCart: (item: any, type: 'food' | 'shop') => void;
  openChefAI: () => void;
}

export default function MenuPart({
  foodItems,
  addToCart,
  openChefAI
}: MenuPartProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [sortBy, setSortBy] = React.useState<string>('default');
  const [allergensExcluded, setAllergensExcluded] = React.useState<string[]>([]);
  const [selectedFoodDetail, setSelectedFoodDetail] = React.useState<FoodItem | null>(null);

  const categories = [
    { id: 'all', label: 'Tất cả món' },
    { id: 'mon_nuoc', label: 'Món Nước (Súp/Bún)' },
    { id: 'com_chien', label: 'Cơm Chiên & Cơm' },
    { id: 'lau', label: 'Lẩu Thảo Mộc' },
    { id: 'mon_dung_com', label: 'Món Dùng Với Cơm' },
    { id: 'mon_goi', label: 'Món Gỏi' },
    { id: 'mon_an_vat', label: 'Ăn Vặt & Pizza' },
    { id: 'do_uong', label: 'Đồ Uống' }
  ];

  // Common allergens options
  const allergenList = [
    { id: 'Đậu hũ', label: 'Tránh Đậu Hũ / Đậu Nành' },
    { id: 'Đậu phộng', label: 'Tránh Lạc (Đậu Phộng)' },
    { id: 'Ớt', label: 'Tránh Cay (Ớt/Sate)' },
    { id: 'Hạt sen', label: 'Tránh Hạt Sen' }
  ];

  const handleAllergenToggle = (allergen: string) => {
    if (allergensExcluded.includes(allergen)) {
      setAllergensExcluded(allergensExcluded.filter(a => a !== allergen));
    } else {
      setAllergensExcluded([...allergensExcluded, allergen]);
    }
  };

  // Filter & Sort
  const filteredItems = foodItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));

    // Allergen check
    const matchesAllergens = allergensExcluded.every(allergen => {
      // Look for indicators in description or ingredients list
      const textToSearch = (item.name + ' ' + item.description + ' ' + item.ingredients.join(' ')).toLowerCase();
      if (allergen === 'Đậu hũ' && (textToSearch.includes('đậu hũ') || textToSearch.includes('nành'))) return false;
      if (allergen === 'Đậu phộng' && (textToSearch.includes('lạc') || textToSearch.includes('đậu phộng') || textToSearch.includes('sốt lạc'))) return false;
      if (allergen === 'Ớt' && (textToSearch.includes('ớt') || textToSearch.includes('sate') || textToSearch.includes('cay'))) return false;
      if (allergen === 'Hạt sen' && textToSearch.includes('sen')) return false;
      return true;
    });

    return matchesCategory && matchesSearch && matchesAllergens;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'calories') return b.calories - a.calories;
    return 0; // default order
  });

  return (
    <div className="space-y-12 pb-20">
      
      {/* Page Header banner */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">THỰC ĐƠN MÓN CHAY TINH TẾ</span>
        <h1 className="font-serif text-3xl font-bold text-white sm:text-5xl">Món Ngon Dưỡng Thể Tâm An</h1>
        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
          Thực phẩm của cửa hàng là sự giao thoa tinh tế giữa di sản ẩm thực cung tiến vua chúa ngày xưa và tri thức cân bằng vi lượng, vitamin hiện đại. Hoàn toàn organic và thân mến.
        </p>
      </section>

      {/* Main Grid: Filters on Left, Items on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Left Filters Rail */}
        <aside className="lg:col-span-1 space-y-8 glass-panel p-6 rounded-2xl border border-emerald-500/10 h-fit">
          
          <div className="flex items-center gap-2 pb-4 border-b border-emerald-950/40">
            <SlidersHorizontal className="h-4 w-4 text-[#eab308]" />
            <h2 className="font-serif text-base font-bold text-white">Bộ Lọc Tùy Chọn</h2>
          </div>

          {/* Search Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400">Tìm kiếm món ăn</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Phở chay, lẩu, nấm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl bg-[#070c09] border border-emerald-950 pl-10 pr-4 py-3 text-xs text-white focus:border-[#eab308] focus:outline-none"
              />
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
            </div>
          </div>

          {/* Sort selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400">Sắp xếp theo thứ tự</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-xl bg-[#070c09] border border-emerald-950 px-3 py-3 text-xs text-white focus:border-[#eab308] focus:outline-none cursor-pointer"
            >
              <option value="default">Mặc định Tâm An</option>
              <option value="price-low">Giá: Từ thấp đến cao</option>
              <option value="price-high">Giá: Từ cao đến thấp</option>
              <option value="calories">Năng lượng: Lượng Kcal giảm dần</option>
            </select>
          </div>

          {/* Allergy Exclusions (Vietnamese Specific) */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 justify-between">
              <label className="text-xs font-semibold text-gray-400">Lọc dị ứng thực phẩm</label>
              <span className="text-[9px] bg-amber-950/60 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/10 font-bold">AN TOÀN</span>
            </div>
            <div className="space-y-2.5">
              {allergenList.map(allergen => (
                <label key={allergen.id} className="flex items-center gap-2.5 text-xs text-gray-300 cursor-pointer hover:text-white transition">
                  <input
                    type="checkbox"
                    checked={allergensExcluded.includes(allergen.id)}
                    onChange={() => handleAllergenToggle(allergen.id)}
                    className="rounded border-emerald-950 bg-[#070c09] text-emerald-600 focus:ring-0 focus:ring-offset-0 h-4 w-4"
                  />
                  <span>{allergen.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* AI Advisor Promotional banner inside sidebar */}
          <div className="bg-emerald-950/30 border border-emerald-500/20 p-4 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-[#eab308]">
              <Sparkles className="h-4 w-4 animate-spin" />
              <span className="text-xs font-bold font-serif uppercase">BẠN ĐANG MẤT NGỦ?</span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Trò chuyện với Đầu Bếp AI để chọn món làm mát tỳ vị, an giấc nồng dồi dào nguyên khí!
            </p>
            <button
              onClick={openChefAI}
              className="w-full text-center py-2 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-lg transition"
            >
              HỎI TRỢ LÝ AI NGAY
            </button>
          </div>

        </aside>

        {/* Right Menu List */}
        <main className="lg:col-span-3 space-y-8">
          
          {/* Category Tabs inside food listing header */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-950/40 text-gray-400 border border-emerald-500/10 hover:text-white hover:border-emerald-500/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Count search indicator */}
          <p className="text-xs text-gray-400">
            Tìm thấy <strong className="text-emerald-400">{sortedItems.length}</strong> món chay thanh tịnh đáp ứng mong muốn của quý khách.
          </p>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedItems.map(item => (
              <div 
                key={item.id} 
                className="glass-panel rounded-xl overflow-hidden border border-emerald-500/10 flex flex-col sm:flex-row group hover:border-emerald-500/25 transition duration-300 h-full cursor-pointer"
                onClick={() => setSelectedFoodDetail(item)}
              >
                {/* Image thumb */}
                <div className="sm:w-[150px] h-[180px] sm:h-full relative overflow-hidden shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  {item.isSpecial && (
                    <div className="absolute bottom-2 left-2 bg-amber-400 text-black text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Đặc biệt
                    </div>
                  )}
                </div>

                {/* Info block */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-base font-bold text-white group-hover:text-emerald-400 transition leading-snug">
                        {item.name}
                      </h3>
                      <span className="font-serif text-base font-bold text-emerald-400 whitespace-nowrap">
                        {item.price.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Micro list attributes and "Quick Add to Cart" to prevent modal blocking */}
                  <div className="flex items-center justify-between pt-3 border-t border-emerald-950/40">
                    <span className="text-[10px] text-gray-500 font-mono">
                      🔥 {item.calories} Kcal
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // stop triggering detail modal open
                        addToCart(item, 'food');
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-600 hover:text-white transition text-[11px] font-bold"
                      title="Thêm nhanh vào giỏ"
                    >
                      <ShoppingCart className="h-3 w-3" />
                      Yêu Cầu Món
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {sortedItems.length === 0 && (
              <div className="col-span-2 text-center py-20 bg-emerald-950/10 border border-emerald-950/40 rounded-2xl p-6">
                <SlidersHorizontal className="h-10 w-10 text-gray-500 mx-auto mb-4" />
                <h4 className="font-serif text-lg font-bold text-white">Chưa có kết quả tương ứng</h4>
                <p className="text-xs text-gray-400 max-w-sm mx-auto mt-2 leading-relaxed">
                  Quý khách vui lòng điều chỉnh bộ lọc, tắt bớt dị ứng thực phẩm hoặc sửa đổi từ khóa tìm kiếm để thu được nhiều món chay nhé!
                </p>
              </div>
            )}
          </div>

        </main>
      </div>

      {/* 4. EXPANDABLE FOOD DETAIL MODAL */}
      {selectedFoodDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-sm">
          <div 
            className="w-full max-w-2xl bg-[#070c09] border border-emerald-500/20 rounded-2xl overflow-hidden relative glass-panel flex flex-col md:flex-row shadow-2xl"
            id="detail-modal-card"
          >
            {/* Close btn */}
            <button
              onClick={() => setSelectedFoodDetail(null)}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 border border-emerald-800/40 transition"
            >
              ✕
            </button>

            {/* Left Image half */}
            <div className="md:w-1/2 h-[220px] md:h-auto shrink-0 relative">
              <img
                src={selectedFoodDetail.image}
                alt={selectedFoodDetail.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              {selectedFoodDetail.isSpecial && (
                <div className="absolute top-4 left-4 bg-amber-400 text-[#070c09] text-[9.5px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  ĂN LÀNH TUYỆT LIÊN
                </div>
              )}
            </div>

            {/* Right details content half */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-[#eab308] tracking-widest uppercase">CHI TIẾT VỊ GIÁC</span>
                  <h3 className="font-serif text-2xl font-bold text-white leading-snug mt-1">
                    {selectedFoodDetail.name}
                  </h3>
                  <span className="text-xl font-bold font-serif text-emerald-400 block mt-1">
                    {selectedFoodDetail.price.toLocaleString('vi-VN')}đ
                  </span>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">
                  {selectedFoodDetail.description}
                </p>

                {/* Calories count info */}
                <div className="bg-emerald-950/40 border border-emerald-500/10 p-3 rounded-xl flex items-center justify-between text-xs font-semibold">
                  <span className="text-gray-400">Năng lượng dinh dưỡng:</span>
                  <span className="text-emerald-400 font-mono">⚡ {selectedFoodDetail.calories} Kcal</span>
                </div>

                {/* Ingredient details */}
                <div className="space-y-1.5">
                  <span className="text-xs text-gray-400 font-semibold block">Thành phần chi tiết:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedFoodDetail.ingredients.map((ing, idx) => (
                      <span key={idx} className="bg-emerald-950/60 text-emerald-400 border border-emerald-500/20 text-[10px] px-2.5 py-1 rounded-full">
                        🌿 {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Confirm add action */}
              <div className="pt-4 border-t border-emerald-950/40 flex items-center gap-3">
                <button
                  onClick={() => {
                    addToCart(selectedFoodDetail, 'food');
                    setSelectedFoodDetail(null);
                  }}
                  className="flex-1 text-center py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-950/50 cursor-pointer"
                >
                  Thêm Vào Giỏ {selectedFoodDetail.price.toLocaleString('vi-VN')}đ
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
