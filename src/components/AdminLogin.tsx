import React from 'react';
import { User } from 'lucide-react';
import { UserSession } from '../types';

interface AdminLoginProps {
  onLogin: (session: UserSession) => void;
  onCancel?: () => void;
}

export default function AdminLogin({ onLogin, onCancel }: AdminLoginProps) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lightweight mock auth: accept admin/taman as credentials, else reject
    if (username.trim().toLowerCase() === 'admin' && password === 'taman') {
      onLogin({ username: 'admin', isLoggedIn: true, fullName: 'Quản Trị Viên', role: 'admin', email: 'admin@tiemchay.local' });
      return;
    }

    setError('Thông tin đăng nhập không hợp lệ. Thử lại hoặc liên hệ quản trị.');
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-[#07110d] border border-emerald-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-full bg-emerald-950/50 flex items-center justify-center border border-emerald-800 text-emerald-400">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-serif text-lg text-white font-bold">Đăng nhập Quản Trị</h3>
            <p className="text-xs text-gray-400">Nhập tài khoản quản trị để quản lý menu, đơn hàng và khách hàng.</p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="text-xs text-gray-400">Tên đăng nhập</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 rounded-xl bg-[#070c09] border border-emerald-950 px-3 py-2 text-sm text-white focus:outline-none"
              placeholder="admin"
              required
            />
          </div>

          <div>
            <label className="text-xs text-gray-400">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 rounded-xl bg-[#070c09] border border-emerald-950 px-3 py-2 text-sm text-white focus:outline-none"
              placeholder="••••••"
              required
            />
          </div>

          {error && <div className="text-sm text-red-400">{error}</div>}

          <div className="flex gap-2">
            <button type="submit" className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold">Đăng nhập</button>
            <button type="button" onClick={onCancel} className="py-2 px-4 rounded-xl bg-[#0b120f] border border-emerald-800 text-gray-300">Hủy</button>
          </div>

          <p className="text-[11px] text-gray-400 mt-2">Gợi ý: thử <strong className="text-amber-300">admin</strong> / <strong className="text-amber-300">taman</strong> (mock)</p>
        </form>
      </div>
    </div>
  );
}
