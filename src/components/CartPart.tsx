import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingCart, ShieldAlert } from 'lucide-react';

interface CartPartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  updateQuantity: (id: string, type: 'food' | 'shop', amount: number) => void;
  removeFromCart: (id: string, type: 'food' | 'shop') => void;
  clearCart: () => void;
  handleCheckout: (formData: { customerName: string; phone: string; address: string; paymentMethod: 'vietqr' | 'cash' }) => void;
}

export default function CartPart({
  isOpen,
  onClose,
  cartItems,
  updateQuantity,
  removeFromCart,
  clearCart,
  handleCheckout
}: CartPartProps) {
  const [customerName, setCustomerName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState<'vietqr' | 'cash'>('vietqr');

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert('Giỏ hàng rỗng. Vui lòng thêm món trước nhé!');
      return;
    }
    if (!customerName || !phone) {
      alert('Vui lòng cung cấp đầy đủ Tên và Số điện thoại nhận hàng.');
      return;
    }

    handleCheckout({
      customerName,
      phone,
      address,
      paymentMethod
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/85 backdrop-blur-sm">
      {/* Click outside to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />

      {/* Slide frame */}
      <div 
        className="w-full max-w-md bg-[#070c09] border-l border-emerald-950/80 h-full flex flex-col justify-between p-6 overflow-hidden relative animate-slide-in-right"
        id="side-cart-drawer"
      >
        
        {/* Cart Header */}
        <div className="flex items-center justify-between border-b border-emerald-950/60 pb-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-[#eab308]" />
            <h2 className="font-serif text-lg font-bold text-white">Giỏ Bát Tâm An</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-emerald-950/50 hover:bg-emerald-900 border border-emerald-900/30 text-gray-400 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* List of Cart Items */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 scrollbar-none">
          {cartItems.map((item, idx) => (
            <div 
              key={`${item.type}-${item.id}`} 
              className="flex gap-3 bg-emerald-950/20 border border-emerald-500/10 p-3 rounded-xl items-center justify-between transition hover:border-[#eab308]/20"
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                decoding="async"
                className="w-12 h-12 rounded-lg object-cover shrink-0 border border-emerald-900/40"
              />
              
              <div className="flex-1 text-left min-w-0">
                <span className="block text-xs font-bold text-white truncate">{item.name}</span>
                <span className="block text-[10px] text-emerald-400 font-medium">
                  {item.type === 'food' ? '🌿 Đĩa Bếp' : '📦 Đồ Khô'}
                </span>
                <span className="block text-xs font-mono font-semibold text-gray-300">
                  {item.price.toLocaleString('vi-VN')}đ
                </span>
              </div>

              {/* Quantity selectors */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.type, -1)}
                  className="p-1 bg-[#102a1d] hover:bg-emerald-800 text-white rounded transition"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="text-xs font-semibold text-white font-mono w-4 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.type, 1)}
                  className="p-1 bg-[#102a1d] hover:bg-emerald-800 text-white rounded transition"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>

              {/* Trash delete */}
              <button
                onClick={() => removeFromCart(item.id, item.type)}
                className="p-1 text-gray-500 hover:text-red-400 transition ml-1"
                title="Xóa mặt hàng"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}

          {cartItems.length === 0 && (
            <div className="text-center py-20 space-y-3">
              <ShoppingCart className="h-10 w-10 text-gray-600 mx-auto opacity-50" />
              <h4 className="font-serif text-base font-bold text-white">Chưa có món ăn nào</h4>
              <p className="text-xs text-gray-400 max-w-[240px] mx-auto leading-relaxed">
                Quý khách vui lòng chọn thêm đĩa súp hay bột ngưu bàng thơm ngậy vào đĩa nhé!
              </p>
            </div>
          )}
        </div>

        {/* Checkout Data Form fields */}
        {cartItems.length > 0 && (
          <form onSubmit={onSubmit} className="border-t border-emerald-950/60 pt-4 space-y-4">
            
            <div className="space-y-3 text-left">
              <span className="text-[10px] font-bold text-[#eab308] tracking-widest uppercase">ĐỊA CHỈ NHẬN CƠM CHAY</span>
              
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Họ Tên khách..."
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full rounded-xl bg-[#070c09] border border-emerald-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
                <input
                  type="text"
                  required
                  placeholder="Số điện thoại..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl bg-[#070c09] border border-emerald-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <input
                type="text"
                placeholder="Địa chỉ giao cơm (Bỏ trống nếu ăn tại CS1 Chùa Bộc)..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-xl bg-[#070c09] border border-emerald-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />

              {/* Payment Methods toggle */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-semibold text-gray-400">Phương thức thanh toán</label>
                <div className="grid grid-cols-2 gap-2">
                  <label className={`flex items-center justify-center gap-1.5 p-2 rounded-xl text-[11px] font-bold border transition cursor-pointer ${
                    paymentMethod === 'vietqr' 
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400' 
                      : 'border-emerald-950 text-gray-400 hover:text-white'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'vietqr'}
                      onChange={() => setPaymentMethod('vietqr')}
                      className="sr-only"
                    />
                    VietQR Chuyển Khoản
                  </label>
                  <label className={`flex items-center justify-center gap-1.5 p-2 rounded-xl text-[11px] font-bold border transition cursor-pointer ${
                    paymentMethod === 'cash' 
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400' 
                      : 'border-emerald-950 text-gray-400 hover:text-white'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                      className="sr-only"
                    />
                    Tiền Mặt Khi Giao
                  </label>
                </div>
              </div>
            </div>

            {/* Total Display */}
            <div className="bg-emerald-950/30 border border-emerald-950 p-4 rounded-xl space-y-1">
              <div className="flex justify-between text-xs text-gray-400">
                <span>Tạm tính đĩa ăn:</span>
                <span className="font-mono">{totalAmount.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Phí ship dưỡng sinh nội ô:</span>
                <span className="text-emerald-400">Miễn phí ship</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-1 border-t border-emerald-950/50">
                <span>Tổng nộp thanh toán:</span>
                <span className="font-serif text-[#eab308]">{totalAmount.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>

            {/* Submit Trigger button */}
            <button
              type="submit"
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider font-serif transition shadow-lg shadow-emerald-950/60 cursor-pointer"
            >
              Bước Tiếp Theo (Xác Nhận Gọi Món)
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
