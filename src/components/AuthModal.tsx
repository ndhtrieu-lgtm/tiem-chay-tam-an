import React from 'react';
import { UserSession } from '../types';
import { X, User, Lock, Mail, Sparkles, LogOut, CheckCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserSession;
  loginUser: (session: UserSession) => void;
  logoutUser: () => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  user,
  loginUser,
  logoutUser
}: AuthModalProps) {
  const [authMode, setAuthMode] = React.useState<'signin' | 'signup'>('signin');
  const [usernameInput, setUsernameInput] = React.useState('');
  const [passwordInput, setPasswordInput] = React.useState('');
  const [fullNameInput, setFullNameInput] = React.useState('');
  const [emailInput, setEmailInput] = React.useState('');

  if (!isOpen) return null;

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (authMode === 'signin') {
      if (usernameInput.trim().toLowerCase() === 'admin') {
        const adminSession: UserSession = {
          username: 'admin',
          isLoggedIn: true,
          fullName: 'Bếp Trưởng Tâm An',
          role: 'admin',
          email: 'admin@tiemchaytaman.vn'
        };
        loginUser(adminSession);
        alert('Chào mừng Bếp Trưởng Tâm An quay lại bàn quản trị!');
        onClose();
        return;
      }

      // Default member login
      const clientSession: UserSession = {
        username: usernameInput || 'khach_chay_tam_an',
        isLoggedIn: true,
        fullName: fullNameInput || 'Thiện Nam Tín Nữ',
        role: 'user',
        email: emailInput || 'nguoidung@gmail.com'
      };
      loginUser(clientSession);
      alert('Đăng nhập thành viên Tiệm Chay Tâm An thành công!');
      onClose();
    } else {
      // signup flow
      const registeredSession: UserSession = {
        username: usernameInput || 'user_new',
        isLoggedIn: true,
        fullName: fullNameInput || 'Khách Chay Hân Hoan',
        role: 'user',
        email: emailInput || 'taikhoanmoi@gmail.com'
      };
      loginUser(registeredSession);
      alert('Đồng bộ đăng ký thẻ tịnh viên Tâm An thành công!');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm px-4">
      
      <div 
        className="w-full max-w-sm bg-[#080d0a] border border-emerald-500/20 rounded-2xl overflow-hidden shadow-2xl glass-panel relative p-6 space-y-6 fade-in-up"
        id="auth-dialog-body"
      >
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          ✕
        </button>

        {/* LOGGED IN VIEW WITH PROFILE CARD */}
        {user.isLoggedIn ? (
          <div className="space-y-6 text-center py-4">
            <div className="mx-auto h-16 w-16 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <User className="h-8 w-8" />
            </div>
            
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#eab308] tracking-widest uppercase">TỊNH VIÊN TÂM AN</span>
              <h3 className="font-serif text-xl font-bold text-white">{user.fullName}</h3>
              <span className="text-xs text-emerald-400 font-mono">Vai trò: {user.role === 'admin' ? 'Bếp Trưởng Quản trị' : 'Thành viên Đồng hành'}</span>
            </div>

            <div className="bg-[#0c1410] border border-emerald-950 p-4 rounded-xl text-left text-xs space-y-2.5 text-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-500">Email thẻ:</span>
                <span>{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Hội viên số:</span>
                <span className="font-mono text-emerald-400">#TA-1289053</span>
              </div>
            </div>

            <button
              onClick={() => {
                logoutUser();
                alert('Đã đăng xuất tài khoản thẻ tịnh viên.');
              }}
              className="w-full py-3.5 bg-red-950/50 hover:bg-red-900 border border-red-500/10 hover:border-red-500 text-red-400 rounded-xl text-xs font-bold font-serif uppercase tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <LogOut className="h-4 w-4" /> Đăng Xuất Khỏi Thẻ
            </button>
          </div>
        ) : (
          /* AUTH FORM SUBMIT FLOW */
          <>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=100&auto=format&fit=crop&q=60"
                alt="Tiệm Chay Tâm An Thảo dược thiền"
                loading="lazy"
                decoding="async"
                className="w-12 h-12 rounded-full mx-auto object-cover border border-[#eab308]/40 mb-3"
              />
              <span className="text-[10px] font-bold text-emerald-400 tracking-widest uppercase">TIỆM CHAY TÂM AN</span>
              <h2 className="font-serif text-xl font-bold text-white leading-snug mt-1">
                {authMode === 'signin' ? 'Đăng Nhập Thôi Thấm' : 'Thành Viên Ăn Chay Trường'}
              </h2>
            </div>

            {/* Fast Dev admin demo notice */}
            {authMode === 'signin' && (
              <div className="bg-emerald-950/25 border border-emerald-500/10 p-3 rounded-lg text-[10px] text-emerald-400 text-left leading-relaxed">
                <Sparkles className="h-3 w-3 text-amber-400 inline mr-1 animate-pulse" />
                Để thử bàn Quản trị (Admin), quý khách nhập tên <strong>admin</strong> và mật khẩu bất kì để truy cập lập tức!
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4 text-left">
              
              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 font-semibold uppercase">Tên tài khoản (hoặc 'admin')</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="Mời nhập tên..."
                    className="w-full rounded-xl bg-[#070c09] border border-emerald-950 pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                  <User className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" />
                </div>
              </div>

              {authMode === 'signup' && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 font-semibold uppercase">Họ và Tên thính giả</label>
                    <input
                      type="text"
                      required
                      value={fullNameInput}
                      onChange={(e) => setFullNameInput(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Văn Hải"
                      className="w-full rounded-xl bg-[#070c09] border border-emerald-950 px-3.5 py-3 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 font-semibold uppercase">Địa chỉ email</label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="taman@gmail.com"
                        className="w-full rounded-xl bg-[#070c09] border border-emerald-950 pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                      <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 font-semibold uppercase">Mật Khẩu Xác Thực</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Nhập bất kì để chạy thử..."
                    className="w-full rounded-xl bg-[#070c09] border border-emerald-950 pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                  <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white font-serif uppercase tracking-wider transition cursor-pointer"
              >
                {authMode === 'signin' ? 'Tiếp Tục Đăng Nhập' : 'Tạo Thẻ Hội Viên Chay'}
              </button>

            </form>

            {/* Switch signin/signup toggles */}
            <div className="text-center text-xs text-gray-500 pt-2">
              {authMode === 'signin' ? (
                <p>
                  Chưa có thẻ hội viên tịnh tâm?{' '}
                  <button 
                    onClick={() => setAuthMode('signup')}
                    className="text-[#eab308] hover:underline font-semibold"
                  >
                    Đăng ký ngay
                  </button>
                </p>
              ) : (
                <p>
                  Đã sở hữu phong thái Tâm An?{' '}
                  <button 
                    onClick={() => setAuthMode('signin')}
                    className="text-[#eab308] hover:underline font-semibold"
                  >
                    Trở về Đăng nhập
                  </button>
                </p>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
