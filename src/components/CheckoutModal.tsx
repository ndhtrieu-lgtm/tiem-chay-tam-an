import React from 'react';
import { Order } from '../types';
import { Check, Copy, CheckCircle, Smartphone, Clock, ShieldCheck, RefreshCw } from 'lucide-react';

interface CheckoutModalProps {
  order: Order | null;
  onClose: () => void;
  onPaymentSuccess: (orderId: string) => void;
}

export default function CheckoutModal({
  order,
  onClose,
  onPaymentSuccess
}: CheckoutModalProps) {
  const [copiedAccount, setCopiedAccount] = React.useState(false);
  const [copiedInfo, setCopiedInfo] = React.useState(false);
  const [step, setStep] = React.useState<'review' | 'polling' | 'success'>('review');
  const [timerCount, setTimerCount] = React.useState(20);
  const [customerNameLocal, setCustomerNameLocal] = React.useState(order?.customerName || '');
  const [phoneLocal, setPhoneLocal] = React.useState(order?.phone || '');
  const [addressLocal, setAddressLocal] = React.useState(order?.address || '');

  React.useEffect(() => {
    if (!order) return;
    // Keep local editable copies in sync when order changes
    setCustomerNameLocal(order.customerName || '');
    setPhoneLocal(order.phone || '');
    setAddressLocal(order.address || '');
  }, [order]);

  // Start mock polling only when user moves to the QR polling step
  React.useEffect(() => {
    if (!order) return;
    if (step !== 'polling') return;

    setTimerCount(20);
    const interval = setInterval(() => {
      setTimerCount(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setStep('success');
          onPaymentSuccess(order.id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [order, step]);

  if (!order) return null;

  const handleCopyText = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate VietQR dynamic code
  const qrUrl = `https://img.vietqr.io/image/MB-0989123456789-compact2.png?amount=${order.totalAmount}&addInfo=${order.addInfoCode}&accountName=TIEM%20CHAY%20TAM%20AN`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-8 backdrop-blur-md">
      
      <div 
        className="w-full max-w-md bg-[#080d0a] border border-emerald-500/25 rounded-2xl overflow-hidden shadow-2xl glass-panel text-center relative p-6 space-y-6 fade-in-up"
        id="vietqr-checkout-card"
      >
        
        {/* Polling/Scanning state view */}
        {step === 'polling' ? (
          <>
            <div>
              <span className="text-[10px] font-bold text-[#eab308] tracking-widest uppercase">THANH TOÁN TIỆM CHAY TÂM AN</span>
              <h2 className="font-serif text-xl font-bold text-white leading-snug mt-1">Cổng Chuyển Khoản Trực Tuyến VietQR</h2>
              <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                Mở ứng dụng ngân hàng trên điện thoại và quét mã QR bên dưới. Hoặc dùng thao tác chuyển khoản theo thông tin phía dưới.
              </p>
            </div>

            {/* Generated dynamic QR code frame */}
            <div className="relative mx-auto w-56 h-56 bg-white p-2 rounded-xl flex items-center justify-center border-2 border-[#eab308]/40 shadow-inner">
              <img
                src={qrUrl}
                alt="Mã thanh toán VietQR chuyển khoản Tiệm Chay Tâm An"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
              
              {/* Spinning overlay accent of loading */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#070c09] border border-emerald-800 text-emerald-400 py-1 px-3 rounded-full text-[10px] font-mono flex items-center gap-1">
                <RefreshCw className="h-3 w-3 animate-spin text-[#eab308]" />
                Lắng nghe: {timerCount}s...
              </div>
            </div>

            {/* Account credit details lists with Copy actions */}
            <div className="bg-[#0c1410] rounded-xl border border-emerald-950 p-4 space-y-3.5 text-xs text-left text-gray-300">
              
              <div className="flex items-center justify-between">
                <span>Ngân hàng thụ hưởng:</span>
                <strong className="text-white text-right">MBBank — Ngân hàng Quân Đội</strong>
              </div>

              <div className="flex items-center justify-between">
                <span>Số tài khoản thụ hưởng:</span>
                <div className="flex items-center gap-1.5">
                  <strong className="text-white font-mono">0989123456789</strong>
                  <button 
                    onClick={() => handleCopyText('0989123456789', setCopiedAccount)}
                    className="p-1 hover:bg-emerald-950 rounded text-emerald-400 transition"
                  >
                    {copiedAccount ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>Tên chủ tài khoản:</span>
                <strong className="text-[#eab358] uppercase">TIEM CHAY TAM AN</strong>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-emerald-950/50">
                <span>Số tiền chuyển khoản:</span>
                <strong className="text-emerald-400 font-serif text-sm">
                  {order.totalAmount.toLocaleString('vi-VN')} đ
                </strong>
              </div>

              <div className="flex items-center justify-between">
                <span>Nội dung bắt buộc:</span>
                <div className="flex items-center gap-1.5">
                  <strong className="text-amber-400 font-mono uppercase text-sm">
                    {order.addInfoCode}
                  </strong>
                  <button 
                    onClick={() => handleCopyText(order.addInfoCode, setCopiedInfo)}
                    className="p-1 hover:bg-emerald-950 rounded text-[#eab358] transition"
                  >
                    {copiedInfo ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

            </div>

            <div className="flex items-center gap-2 justify-center text-[10px] text-gray-500">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Giao dịch mã hóa SSL an toàn đạt tiêu chuẩn NAPAS VietQR</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setStep('review')}
                className="w-full py-3 bg-[#0b120f] hover:bg-emerald-900/40 text-white/80 rounded-xl text-xs font-bold transition border border-emerald-950"
              >
                Quay lại Đơn hàng
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 bg-emerald-900/60 hover:bg-emerald-805 text-white/90 rounded-xl text-xs font-bold transition"
              >
                Đóng
              </button>
            </div>
          </>
        ) : step === 'success' ? (
          /* Payment Approved success visual checkmark screen */
          <div className="space-y-6 py-6 fade-in-up">
            <div className="mx-auto h-20 w-20 rounded-full bg-emerald-950 flex items-center justify-center border-4 border-emerald-500 animate-pulse">
              <CheckCircle className="h-12 w-12 text-emerald-400" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold tracking-widest text-[#eab308] uppercase">THANH TOÁN THÀNH CÔNG</span>
              <h2 className="font-serif text-2xl font-bold text-white">Cảm Ơn Quý Khách Đã Gọi Món!</h2>
              <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
                Tâm An đã nhận được khoản đặt cọc <strong className="text-emerald-400">{order.totalAmount.toLocaleString('vi-VN')}đ</strong>. Hệ thống bếp chính đang khơi lửa chuẩn vị thảo mộc giao ngay sau 30-40 phút.
              </p>
            </div>

            <div className="bg-[#0c1410] border border-emerald-950 p-4 rounded-xl text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-gray-500">Mã đơn gọi:</span>
                <span className="font-mono text-gray-300 font-bold">{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Đọc giả:</span>
                <span className="text-gray-300 font-bold">{order.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Nội dung nộp:</span>
                <span className="font-mono text-amber-300 uppercase">{order.addInfoCode}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs tracking-wider uppercase font-serif transition shadow-lg cursor-pointer animate-bounce"
            >
              Trở về Trang Chủ Thưởng Thức
            </button>
          </div>
        ) : (
          /* REVIEW / CUSTOMER INFO / ORDER SUMMARY */
          <div className="space-y-4 text-left">
            <div>
              <span className="text-[10px] font-bold text-[#eab308] tracking-widest uppercase">Xác nhận đơn hàng</span>
              <h3 className="font-serif text-lg font-bold text-white mt-1">Thông tin khách hàng & tóm tắt đơn</h3>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setStep('polling'); }} className="space-y-3">
              <div className="grid grid-cols-1 gap-2">
                <input
                  type="text"
                  placeholder="Họ và tên"
                  value={customerNameLocal}
                  onChange={(e) => setCustomerNameLocal(e.target.value)}
                  className="w-full rounded-xl bg-[#070c09] border border-emerald-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  required
                />
                <input
                  type="tel"
                  placeholder="Số điện thoại"
                  value={phoneLocal}
                  onChange={(e) => setPhoneLocal(e.target.value)}
                  className="w-full rounded-xl bg-[#070c09] border border-emerald-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  required
                />
                <input
                  type="text"
                  placeholder="Địa chỉ nhận hàng (tùy chọn)"
                  value={addressLocal}
                  onChange={(e) => setAddressLocal(e.target.value)}
                  className="w-full rounded-xl bg-[#070c09] border border-emerald-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="bg-[#0c1410] border border-emerald-950 p-3 rounded-xl text-xs space-y-2">
                <div className="flex justify-between text-gray-400">
                  <span>Họ Tên</span>
                  <strong className="text-white">{customerNameLocal || order.customerName}</strong>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Số điện thoại</span>
                  <strong className="text-white">{phoneLocal || order.phone}</strong>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Địa chỉ</span>
                  <strong className="text-white">{addressLocal || order.address || '—'}</strong>
                </div>
                <div className="pt-2 border-t border-emerald-950/40">
                  <span className="block text-xs text-gray-400">Tóm tắt món</span>
                  {order.items.map((it) => (
                    <div key={it.name} className="flex justify-between text-sm text-gray-200 mt-1">
                      <span className="truncate">{it.name} x {it.quantity}</span>
                      <span className="font-mono">{(it.price * it.quantity).toLocaleString('vi-VN')}đ</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-emerald-950/50">
                    <span>Tổng cần thanh toán</span>
                    <span className="font-serif text-[#eab308]">{order.totalAmount.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 bg-[#0b120f] hover:bg-emerald-900/40 text-white/80 rounded-xl text-xs font-bold transition border border-emerald-950"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black rounded-xl text-xs font-bold transition shadow"
                >
                  Thanh toán bằng VietQR
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
