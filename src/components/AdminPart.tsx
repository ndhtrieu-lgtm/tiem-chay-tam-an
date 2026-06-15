import React from 'react';
import { Order, FoodItem, ShopItem } from '../types';
import { DollarSign, ShieldCheck, Clock, UserCheck, PlusCircle, CheckCircle, Flame, Server, Sparkles, RefreshCw } from 'lucide-react';

interface AdminPartProps {
  orders: Order[];
  updateOrderStatus: (id: string, status: 'pending' | 'paid' | 'completed' | 'cancelled') => void;
  foodItems: FoodItem[];
  addFoodItem: (item: FoodItem) => void;
  shopItems: ShopItem[];
  addShopItem: (item: ShopItem) => void;
  refreshOrders: () => void;
}

export default function AdminPart({
  orders,
  updateOrderStatus,
  foodItems,
  addFoodItem,
  shopItems,
  addShopItem,
  refreshOrders
}: AdminPartProps) {
  const [activeTab, setActiveTab] = React.useState<'orders' | 'add-food' | 'add-shop'>('orders');

  // Stats calculation
  const totalRevenue = orders
    .filter(o => o.status === 'paid' || o.status === 'completed')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const completedCount = orders.filter(o => o.status === 'completed').length;
  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const paidCount = orders.filter(o => o.status === 'paid').length;

  // Form states for Food
  const [foodName, setFoodName] = React.useState('');
  const [foodPrice, setFoodPrice] = React.useState('');
  const [foodCategory, setFoodCategory] = React.useState<'mon_nuoc' | 'com_chien' | 'lau' | 'mon_dung_com' | 'mon_goi' | 'mon_an_vat' | 'do_uong'>('mon_nuoc');
  const [foodDesc, setFoodDesc] = React.useState('');
  const [foodIngs, setFoodIngs] = React.useState('');
  const [foodCals, setFoodCals] = React.useState('250');

  // Form states for Shop Item
  const [shopName, setShopName] = React.useState('');
  const [shopPrice, setShopPrice] = React.useState('');
  const [shopCategory, setShopCategory] = React.useState<'gia-vi' | 'do-kho' | 'do-dong-lanh' | 'dinh-duong'>('do-kho');
  const [shopDesc, setShopDesc] = React.useState('');

  const handleAddFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodName || !foodPrice) {
      alert('Vui lòng cung cấp Tên và Giá món ăn!');
      return;
    }

    const newItem: FoodItem = {
      id: `food_custom_${Date.now()}`,
      name: foodName,
      price: parseFloat(foodPrice),
      category: foodCategory,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60', // standard fallback placeholder
      description: foodDesc || 'Món ăn thực vật tươi mát mới chưng cất hỏa lực từ bếp Tâm An.',
      isSpecial: false,
      ingredients: foodIngs ? foodIngs.split(',').map(i => i.trim()) : ['Hữu cơ', 'Sạch vi chất'],
      calories: parseInt(foodCals) || 250
    };

    addFoodItem(newItem);
    alert(`Đã thêm món "${foodName}" vào thực đơn thành công.`);
    
    // reset form
    setFoodName('');
    setFoodPrice('');
    setFoodDesc('');
    setFoodIngs('');
  };

  const handleAddShopProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shopName || !shopPrice) {
      alert('Vui lòng cung cấp Tên và Giá sản phẩm khô!');
      return;
    }

    const newItem: ShopItem = {
      id: `shop_custom_${Date.now()}`,
      name: shopName,
      price: parseFloat(shopPrice),
      category: shopCategory,
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60',
      description: shopDesc || 'Thực phẩm dinh dưỡng tinh lọc đóng lon dẻo bùi tốt cho sức khỏe.',
      rating: 5.0,
      salesCount: 0,
      stock: 100,
      isNew: true
    };

    addShopItem(newItem);
    alert(`Đã thêm sản phẩm khô "${shopName}" vào gian hàng thành công.`);
    
    // reset form
    setShopName('');
    setShopPrice('');
    setShopDesc('');
  };

  return (
    <div className="space-y-8 pb-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      
      {/* Admin Title bar */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-emerald-950 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-amber-400">
            <Server className="h-4 w-4 animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase">TÂM AN BACKEND MANAGER</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white">Bàn Điều Hành Quản Trị</h1>
        </div>
        
        {/* Refresh orders button */}
        <button
          onClick={refreshOrders}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border border-emerald-800/40 hover:border-emerald-500 rounded-lg text-emerald-400 transition"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Đồng Bộ Dữ Liệu Gọi
        </button>
      </section>

      {/* Numerical Stats overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="glass-panel p-5 rounded-xl border border-emerald-500/10 text-center space-y-1">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-500/20">
            <DollarSign className="h-5 w-5" />
          </div>
          <span className="text-[10px] text-gray-400 font-semibold block">TỔNG DOANH THU THỰC</span>
          <span className="font-serif text-lg sm:text-xl font-bold text-emerald-400">
            {totalRevenue.toLocaleString('vi-VN')}đ
          </span>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-emerald-500/10 text-center space-y-1">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-950/60 text-[#eab308] border border-amber-500/20">
            <CheckCircle className="h-5 w-5" />
          </div>
          <span className="text-[10px] text-gray-400 font-semibold block">ĐƠN ĐÃ GIAO</span>
          <span className="font-serif text-lg sm:text-xl font-bold text-[#eab308]">
            {completedCount} Đơn
          </span>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-emerald-500/10 text-center space-y-1">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-950/60 text-amber-500 border border-emerald-500/10">
            <Clock className="h-5 w-5 animate-pulse" />
          </div>
          <span className="text-[10px] text-gray-400 font-semibold block">ĐƠN CHỜ KHÁCH CHUYỂN</span>
          <span className="font-serif text-lg sm:text-xl font-bold text-amber-500">
            {pendingCount} Đơn
          </span>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-emerald-500/10 text-center space-y-1">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/20">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <span className="text-[10px] text-gray-400 font-semibold block">ĐƠN ĐÃ NHẬN TIỀN QR</span>
          <span className="font-serif text-lg sm:text-xl font-bold text-emerald-400">
            {paidCount} Đơn
          </span>
        </div>

      </div>

      {/* Internal Tabs controller */}
      <div className="border-b border-emerald-950/50 flex items-center gap-4">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 text-xs font-semibold tracking-wider transition ${
            activeTab === 'orders' ? 'border-b-2 border-emerald-500 text-emerald-400' : 'text-gray-400 hover:text-white'
          }`}
        >
          DANH SÁCH GỌI MÓN ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('add-food')}
          className={`pb-3 text-xs font-semibold tracking-wider transition ${
            activeTab === 'add-food' ? 'border-b-2 border-emerald-500 text-emerald-400' : 'text-gray-400 hover:text-white'
          }`}
        >
          + THÊM MÓN THỰC ĐƠN
        </button>
        <button
          onClick={() => setActiveTab('add-shop')}
          className={`pb-3 text-xs font-semibold tracking-wider transition ${
            activeTab === 'add-shop' ? 'border-b-2 border-emerald-500 text-emerald-400' : 'text-gray-400 hover:text-white'
          }`}
        >
          + THÊM SẢN PHẨM KHÔ
        </button>
      </div>

      {/* Tab Vistas switcher */}
      {activeTab === 'orders' && (
        <div className="glass-panel rounded-2xl overflow-x-auto border border-emerald-500/10">
          <table className="w-full text-left text-xs">
            <thead className="bg-emerald-950/40 text-emerald-400 uppercase font-bold tracking-wide border-b border-emerald-950">
              <tr>
                <th className="p-4">Mã Đơn</th>
                <th className="p-4">Khách Hàng</th>
                <th className="p-4">Nội Dung Đĩa Ăn</th>
                <th className="p-4">Tổng Thanh Toán</th>
                <th className="p-4">QR Tra Cứu</th>
                <th className="p-4">Trạng Thái Giao</th>
                <th className="p-4 text-center">Xử lý hành chính</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-950/30">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-emerald-950/15 transition">
                  {/* order ID */}
                  <td className="p-4 font-mono font-bold text-gray-300">
                    {order.id}
                  </td>
                  {/* Customer name phone info */}
                  <td className="p-4 space-y-1">
                    <strong className="block text-white font-medium">{order.customerName}</strong>
                    <span className="block text-gray-500 text-[10px]">{order.phone}</span>
                    <span className="block text-gray-400 text-[9px] max-w-[150px] truncate">{order.address}</span>
                  </td>
                  {/* Items detail list */}
                  <td className="p-4 space-y-0.5 text-gray-300 max-w-[180px]">
                    {order.items.map((item, id) => (
                      <div key={id} className="flex justify-between gap-2 text-[11px]">
                        <span className="truncate">{item.name}</span>
                        <span className="text-gray-500 shrink-0">x{item.quantity}</span>
                      </div>
                    ))}
                  </td>
                  {/* Price */}
                  <td className="p-4 font-serif font-bold text-emerald-400">
                    {order.totalAmount.toLocaleString('vi-VN')}đ
                  </td>
                  {/* VietQR note code */}
                  <td className="p-4 font-mono text-[10px] text-amber-400 uppercase">
                    {order.addInfoCode}
                  </td>
                  {/* Status pills badges */}
                  <td className="p-4">
                    {order.status === 'pending' && (
                      <span className="inline-block px-2 py-0.5 bg-amber-950 text-amber-400 rounded-full font-bold text-[9px] uppercase border border-amber-500/20">
                        Chờ Chuyển Khoản
                      </span>
                    )}
                    {order.status === 'paid' && (
                      <span className="inline-block px-2 py-0.5 bg-emerald-950 text-emerald-400 rounded-full font-bold text-[9px] uppercase border border-emerald-500/30">
                        ĐÃ NHẬN TIỀN QR
                      </span>
                    )}
                    {order.status === 'completed' && (
                      <span className="inline-block px-2 py-0.5 bg-emerald-900/60 text-white rounded-full font-bold text-[9px] uppercase">
                        Hoàn Thành Giao
                      </span>
                    )}
                    {order.status === 'cancelled' && (
                      <span className="inline-block px-2 py-0.5 bg-red-950 text-red-405 rounded-full font-bold text-[9px] uppercase">
                        Hủy Đơn
                      </span>
                    )}
                  </td>
                  {/* Admin controls actions */}
                  <td className="p-4 text-center">
                    <div className="flex gap-1.5 justify-center">
                      <button
                        onClick={() => updateOrderStatus(order.id, 'paid')}
                        className="px-2 py-1 bg-emerald-950 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white transition rounded text-[10px] font-bold text-emerald-400 cursor-pointer"
                        title="Đánh dấu đã nộp tiền"
                      >
                        Đã đóng tiền
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order.id, 'completed')}
                        className="px-2 py-1 bg-[#152d21] text-[#eab308] border border-[#eab308]/20 hover:bg-[#eab308] hover:text-[#070c09] transition rounded text-[10px] font-bold cursor-pointer"
                        title="Đánh dấu đã giao an toàn"
                      >
                        Đã giao
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order.id, 'cancelled')}
                        className="px-2 py-1 bg-red-950 text-red-400 border border-red-500/10 hover:bg-red-700 hover:text-white transition rounded text-[10px]"
                        title="Huỷ bỏ"
                      >
                        Hủy
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-500">
                    Hệ thống chưa có đơn nộp gọi nào hôm nay.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Food category form */}
      {activeTab === 'add-food' && (
        <form onSubmit={handleAddFood} className="glass-panel p-6 sm:p-8 rounded-2xl border border-emerald-500/15 max-w-2xl mx-auto space-y-6">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <PlusCircle className="h-5 w-5" />
            <h2 className="font-serif text-lg font-bold text-white">Thêm Món Ăn Bếp Chay Tâm An</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-gray-400">Tên món chi tiết</label>
              <input
                type="text"
                required
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                placeholder="Ví dụ: Đậu hũ sốt dầu điều"
                className="w-full rounded-xl bg-[#070c09] border border-emerald-950 px-3.5 py-3 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-gray-400">Giá thành trải nghiệm (VND)</label>
              <input
                type="number"
                required
                value={foodPrice}
                onChange={(e) => setFoodPrice(e.target.value)}
                placeholder="Ví dụ: 45000"
                className="w-full rounded-xl bg-[#070c09] border border-emerald-950 px-3.5 py-3 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-gray-400">Danh mục món chay</label>
              <select
                value={foodCategory}
                onChange={(e: any) => setFoodCategory(e.target.value)}
                className="w-full rounded-xl bg-[#070c09] border border-emerald-950 px-3 py-3 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="mon_nuoc">Món nước (Súp/Bún)</option>
                <option value="com_chien">Cơm chiên & Cơm trắng</option>
                <option value="lau">Lẩu Trị Liệu</option>
                <option value="mon_dung_com">Món dùng với cơm</option>
                <option value="mon_goi">Gỏi Tươi Rau</option>
                <option value="mon_an_vat">Ăn Vặt & Pizza</option>
                <option value="do_uong">Đồ uống</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-gray-400">Hàm lượng Kcal năng lượng</label>
              <input
                type="number"
                value={foodCals}
                onChange={(e) => setFoodCals(e.target.value)}
                placeholder="Mặc định: 250"
                className="w-full rounded-xl bg-[#070c09] border border-emerald-950 px-3.5 py-3 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-gray-400">Thành phần phụ trợ (Ngăn cách bằng dấu phẩy)</label>
            <input
              type="text"
              value={foodIngs}
              onChange={(e) => setFoodIngs(e.target.value)}
              placeholder="Đậu non, nấm đùi gà, hành boa rô, tiêu đen..."
              className="w-full rounded-xl bg-[#070c09] border border-emerald-950 px-3.5 py-3 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-gray-400">Mô tả độ ngon tinh tế</label>
            <textarea
              value={foodDesc}
              onChange={(e) => setFoodDesc(e.target.value)}
              placeholder="Ngọt dồi dào từ ngô ngọt hầm lâu..."
              rows={3}
              className="w-full rounded-xl bg-[#070c09] border border-emerald-950 px-3.5 py-3 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white uppercase tracking-wider transition cursor-pointer font-serif"
          >
            Đưa Món Ăn Mới Lên Kệ Phục Vụ
          </button>
        </form>
      )}

      {/* Add Shop packaging product form */}
      {activeTab === 'add-shop' && (
        <form onSubmit={handleAddShopProduct} className="glass-panel p-6 sm:p-8 rounded-2xl border border-emerald-500/15 max-w-2xl mx-auto space-y-6">
          <div className="flex items-center gap-1.5 text-[#eab308]">
            <PlusCircle className="h-5 w-5" />
            <h2 className="font-serif text-lg font-bold text-white">Thêm Thực Phẩm Khô Tâm An Shop</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-gray-400">Tên hàng hóa đóng chai</label>
              <input
                type="text"
                required
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                placeholder="Ví dụ: Muối vừng rong biển"
                className="w-full rounded-xl bg-[#070c09] border border-emerald-950 px-3.5 py-3 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-gray-400">Giá bán sỉ & lẻ (VND)</label>
              <input
                type="number"
                required
                value={shopPrice}
                onChange={(e) => setShopPrice(e.target.value)}
                placeholder="Ví dụ: 85000"
                className="w-full rounded-xl bg-[#070c09] border border-emerald-950 px-3.5 py-3 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-gray-400">Phân khúc sản phẩm đóng gói</label>
            <select
              value={shopCategory}
              onChange={(e: any) => setShopCategory(e.target.value)}
              className="w-full rounded-xl bg-[#070c09] border border-emerald-950 px-3 py-3 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="gia-vi">Gia vị Thuần Chay</option>
              <option value="do-kho">Hàng khô Organic</option>
              <option value="do-dong-lanh">Thực Phẩm Đông Lạnh</option>
              <option value="dinh-duong">Đạm / Ngũ Cốc</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-gray-400">Nêu thuộc tính mộc mạc hữu cơ</label>
            <textarea
              value={shopDesc}
              onChange={(e) => setShopDesc(e.target.value)}
              placeholder="Chay nguyên cám đóng lon thiếc đạt chuẩn ISO..."
              rows={3}
              className="w-full rounded-xl bg-[#070c09] border border-emerald-950 px-3.5 py-3 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-amber-400 hover:bg-amber-300 font-bold text-xs text-black uppercase tracking-wider transition cursor-pointer font-serif"
          >
            Đưa Sản Phẩm Khô Lên Quầy Bán
          </button>
        </form>
      )}

    </div>
  );
}
