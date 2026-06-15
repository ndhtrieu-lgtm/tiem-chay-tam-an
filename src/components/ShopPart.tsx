import React from 'react';
import { Search, ShoppingCart, Star, Box, Sparkles, Filter, Tag } from 'lucide-react';
import { ShopItem } from '../types';

interface ShopPartProps {
  shopItems: ShopItem[];
  addToCart: (item: any, type: 'food' | 'shop') => void;
}

export default function ShopPart({
  shopItems,
  addToCart
}: ShopPartProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [sortBy, setSortBy] = React.useState<string>('sales');

  const categories = [
    { id: 'all', label: 'Tất cả sản phẩm' },
    { id: 'gia-vi', label: 'Gia vị Thuần Chay' },
    { id: 'do-kho', label: 'Đồ Khô Organic' },
    { id: 'do-dong-lanh', label: 'Thực Phẩm Đông Lạnh' },
    { id: 'dinh-duong', label: 'Đạm & Bột Dinh Dưỡng' }
  ];

  const filteredItems = shopItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.salesCount - a.salesCount; // Default Sales count
  });

  return (
    <div className="space-y-12 pb-20">
      
      {/* Shop Category header banner */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold tracking-widest text-[#eab308] uppercase">TÂM AN VEGAN SUPERMARKET</span>
        <h1 className="font-serif text-3xl font-bold text-white sm:text-5xl">Gia Vị & Đồ Chay Đóng Gói</h1>
        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
          Đem hương vị tinh túy của bành nấm, rễ ngưu bàng về chính căn bếp của bạn. Sản xuất theo công nghệ sấy thăng hoa tiên tiến, bảo toàn dinh dưỡng và thơm ngon.
        </p>
      </section>

      {/* Grid: Search - Sort - Filter bar, and products */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Horizontal filters control strip */}
        <div className="glass-panel p-4 rounded-2xl border border-emerald-500/15 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left search */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Tìm hạt nêm, nước tương, chả lụa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-[#070c09] border border-emerald-950 pl-10 pr-4 py-2.5 text-xs text-white focus:border-[#eab308] focus:outline-none"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          </div>

          {/* Center Category pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide transition cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-400 text-[#070c09]'
                    : 'bg-emerald-950/40 text-gray-400 border border-emerald-500/10 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Right Sort filter */}
          <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-between md:justify-end">
            <span className="text-xs text-gray-400 flex items-center gap-1.5 whitespace-nowrap">
              <Filter className="h-3 w-3 text-[#eab308]" /> Sắp xếp:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl bg-[#070c09] border border-emerald-950 px-3 py-2 text-xs text-white focus:border-[#eab308] focus:outline-none cursor-pointer"
            >
              <option value="sales">Bán chạy nhất</option>
              <option value="price-low">Giá: Thấp tới Cao</option>
              <option value="price-high">Giá: Cao xuống Thấp</option>
              <option value="rating">Được đánh giá tốt nhất</option>
            </select>
          </div>

        </div>

        {/* Count result */}
        <p className="text-xs text-gray-400">
          Có <strong className="text-emerald-400">{sortedItems.length}</strong> mặt hàng thực phẩm hữu cơ xuất hiện.
        </p>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedItems.map(item => (
            <div 
              key={item.id} 
              className="glass-panel rounded-2xl overflow-hidden border border-emerald-500/10 flex flex-col justify-between hover:border-emerald-500/25 transition duration-300 group"
              id={`shop-item-${item.id}`}
            >
              
              {/* Product thumb */}
              <div className="relative overflow-hidden h-[200px] shrink-0 bg-[#0c1410]">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                
                {/* Float highlights */}
                {item.isNew && (
                  <div className="absolute top-3 left-3 bg-[#eab308] text-black text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    NEW MỚI
                  </div>
                )}

                {item.stock <= 5 && item.stock > 0 && (
                  <div className="absolute top-3 right-3 bg-red-650/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
                    Sắp hết hàng ({item.stock})
                  </div>
                )}
                {item.stock === 0 && (
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px] flex items-center justify-center text-xs text-white font-bold">
                    TẠM HẾT HÀNG
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="uppercase text-[9px] tracking-widest text-[#eab308] font-bold">
                      {item.category === 'gia-vi' && 'Gia vị'}
                      {item.category === 'do-kho' && 'Hàng khô'}
                      {item.category === 'do-dong-lanh' && 'Đông lạnh'}
                      {item.category === 'dinh-duong' && 'Dinh dưỡng'}
                    </span>
                    <div className="flex items-center gap-0.5 text-[#eab308]">
                      <Star className="h-3 w-3 fill-amber-400 stroke-none" />
                      <span className="text-[11px] font-bold">{item.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-base font-bold text-white group-hover:text-emerald-400 transition leading-snug">
                    {item.name}
                  </h3>

                  <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="space-y-3.5 pt-2 border-t border-emerald-950/40">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block font-serif text-base font-bold text-emerald-400">
                        {item.price.toLocaleString('vi-VN')}đ
                      </span>
                      {item.originalPrice && (
                        <span className="text-[10px] text-gray-500 line-through">
                          {item.originalPrice.toLocaleString('vi-VN')}đ
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-gray-500">
                      Bán được {item.salesCount} sản phẩm
                    </span>
                  </div>

                  <button
                    disabled={item.stock === 0}
                    onClick={() => addToCart(item, 'shop')}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition duration-200 cursor-pointer ${
                      item.stock === 0
                        ? 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/40'
                    }`}
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    Bỏ Vào Giỏ Mua Sắm
                  </button>
                </div>

              </div>

            </div>
          ))}

          {sortedItems.length === 0 && (
            <div className="col-span-4 text-center py-20 bg-emerald-950/10 border border-emerald-950/40 rounded-2xl p-6">
              <Box className="h-10 w-10 text-gray-500 mx-auto mb-4" />
              <h4 className="font-serif text-lg font-bold text-white">Chưa Đạt Sản Phẩm Phù Hợp</h4>
              <p className="text-xs text-gray-400 max-w-sm mx-auto mt-2 leading-relaxed">
                Chúng tôi sẽ sớm bổ sung các mặt hàng khô nhập khẩu cao cấp. Hãy thử thay đổi từ khóa nhé!
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
