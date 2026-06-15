import React from 'react';
import { Leaf, ShoppingCart, User, LayoutDashboard, Menu, X, HelpCircle } from 'lucide-react';
import { UserSession } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  toggleCart: () => void;
  user: UserSession;
  toggleAuth: () => void;
  cartPulse?: boolean;
}

export default function Header({
  activeTab,
  setActiveTab,
  cartCount,
  toggleCart,
  user,
  toggleAuth
  , cartPulse
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Trang Chủ' },
    { id: 'menu', label: 'MónĂn Chay' },
    { id: 'shop', label: 'Cửa Hàng Khô' },
    { id: 'tiktok', label: 'TikTok Tâm An' },
    { id: 'blog', label: 'Blog Cẩm Nang' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-950/40 bg-[#070c09]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div 
          onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
          className="flex cursor-pointer items-center gap-2 group"
          id="header-logo-container"
        >
          <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-emerald-950/60 border border-emerald-500/30 group-hover:border-amber-400/50 transition">
            <Leaf className="h-6 w-6 text-emerald-400 group-hover:text-amber-400 transition" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-amber-400 animate-ping"></span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-base sm:text-lg font-bold tracking-wider text-emerald-400 group-hover:text-amber-300 transition uppercase">
              Tâm An
            </span>
            <span className="font-sans text-[10px] sm:text-[9px] tracking-[0.25em] text-amber-400 uppercase">
              Tiệm Chay Tinh Hoa
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative py-2 px-2 text-sm font-medium tracking-wide transition ${
                activeTab === item.id 
                  ? 'text-amber-400' 
                  : 'text-gray-300 hover:text-emerald-400'
              }`}
            >
              {item.label}
              {activeTab === item.id && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-emerald-500" />
              )}
            </button>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Admin Fast Switch */}
          <button
            onClick={() => setActiveTab(activeTab === 'admin' ? 'home' : 'admin')}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-wider transition ${
              activeTab === 'admin'
                ? 'bg-amber-400 text-[#070c09] border-amber-400'
                : 'bg-emerald-950/40 text-emerald-400 border-emerald-500/20 hover:border-emerald-500/40'
            }`}
            title="Dashboard Quản trị"
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            Admin
          </button>

          {/* Cart Icon */}
          <button
            onClick={toggleCart}
            className={`relative p-3 rounded-lg text-gray-300 hover:text-amber-400 transition touch-target ${cartPulse ? 'cart-buzz' : ''}`}
            id="header-cart-btn"
            aria-label="Giỏ hàng"
          >
            <ShoppingCart className="h-6 w-6 stroke-[2]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 font-sans text-[11px] font-bold text-[#070c09] animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* User auth badge */}
          <button
            onClick={toggleAuth}
            className={`flex items-center gap-2 p-2 rounded-full transition ${
              user.isLoggedIn 
                ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3' 
                : 'text-gray-300 hover:text-amber-400'
            } touch-target`}
            aria-label="Tài khoản"
          >
            <User className="h-5 w-5" />
            {user.isLoggedIn && (
              <span className="hidden lg:inline text-xs font-medium max-w-[80px] truncate">
                {user.fullName}
              </span>
            )}
          </button>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-300 hover:text-amber-400 md:hidden transition touch-target"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-emerald-950/50 bg-[#070c09] px-4 py-4 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-medium transition ${
                activeTab === item.id 
                  ? 'bg-emerald-950/80 text-amber-400 border-l-4 border-amber-400' 
                  : 'text-gray-300 hover:bg-emerald-950/30'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-emerald-950/50 flex flex-wrap gap-2">
            <button
              onClick={() => {
                setActiveTab('admin');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 w-full justify-center rounded-lg border text-sm font-semibold ${
                activeTab === 'admin'
                  ? 'bg-amber-400 text-[#070c09] border-amber-400'
                  : 'bg-emerald-950/40 text-emerald-400 border-emerald-500/20'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Bàn Quản Trị (Admin)
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
