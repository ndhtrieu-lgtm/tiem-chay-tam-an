import React from 'react';
import { Leaf, Phone, MapPin, Clock, ShieldCheck, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-emerald-950 bg-[#040806] pt-16 pb-8 text-gray-400">
      <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-emerald-950/10 blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-amber-950/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          
          {/* Brand/Slogan Column */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-emerald-400" />
              <span className="font-serif text-xl font-bold tracking-wider text-emerald-400 uppercase">
                Tâm An Chay
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              "Ăn lành - Lắng nhẹ - Sống bình an". Tiệm chay Tâm An chắt lọc tinh hoa thảo mộc ngự thiện đem đến sinh lý dồi dào, thân thể sạch khỏe cho gia đình Việt.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 text-xs">
                FB
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 text-xs">
                TT
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 text-xs">
                YT
              </span>
            </div>
          </div>

          {/* Opening hours & Hotlines */}
          <div className="space-y-4">
            <h3 className="font-serif text-base font-bold text-emerald-400 tracking-wider">Liên Hệ & Gọi Món</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Thứ 2 - Chủ nhật: 08:00 - 21:30</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Hotline: 0927.116.161 / 0935.982.298</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-400 shrink-0" />
                <span>39/29 Từ Văn Tư, Phan Thiết - Lâm Đồng</span>
              </div>
              <a
                href="https://zalo.me/0927116161"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-4 py-2 text-xs font-bold uppercase text-[#070c09] hover:bg-amber-300 transition"
              >
                Đặt món Zalo
              </a>
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="font-serif text-base font-bold text-emerald-400 tracking-wider">Hệ Thống Tiệm Chay</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>CS1: 12 Chùa Bộc, Quận Đống Đa, Hà Nội</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>CS2: 128 Lê Lợi, Phường Bến Thành, Quận 1, TP. HCM</span>
              </div>
            </div>
          </div>

          {/* Certifications and trust badge */}
          <div className="space-y-4">
            <h3 className="font-serif text-base font-bold text-emerald-400 tracking-wider">Tâm An Cam Kết</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-amber-400 shrink-0" />
                <span>100% Nguyên liệu hữu cơ VietGAP</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Tất cả bao bì sản phẩm khô phục vụ từ dưa, tương nấm đều đạt chuẩn HACCP & ISO 22000, không sử dụng chất hàn the hay bột ngọt hóa tổng hợp.
              </p>
              <div className="inline-flex items-center justify-center rounded bg-emerald-950/40 px-3 py-1 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                ĐÃ THÔNG BÁO BỘ CÔNG THƯƠNG
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 border-t border-emerald-950/60 pt-8 text-center text-xs">
          <p>© 2026 Tiệm Chay Tâm An. Bản quyền đã được bảo hộ. Thiết kế thông tin chuẩn SEO cho Google Bot.</p>
          <div className="mt-2 flex justify-center gap-4 text-gray-600">
            <span>Chính sách bảo mật</span>
            <span>•</span>
            <span>Chính sách giao nhận thanh toán</span>
            <span>•</span>
            <span>Điều khoản sử dụng</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
