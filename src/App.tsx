import React, { useState, useEffect } from 'react';
import { 
  FoodItem, 
  ShopItem, 
  BlogPost, 
  TikTokVideo, 
  CartItem, 
  UserSession, 
  Order 
} from './types';
import { 
  INITIAL_FOOD_ITEMS, 
  INITIAL_SHOP_ITEMS, 
  INITIAL_BLOG_POSTS, 
  INITIAL_TIKTOK_VIDEOS 
} from './data';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import HomePart from './components/HomePart';
import MenuPart from './components/MenuPart';
import ShopPart from './components/ShopPart';
import BlogPart from './components/BlogPart';
import TikTokPart from './components/TikTokPart';
import AdminPart from './components/AdminPart';
import AdminLogin from './components/AdminLogin';
import ChefAssistant from './components/ChefAssistant';
import CartPart from './components/CartPart';
import CheckoutModal from './components/CheckoutModal';
import AuthModal from './components/AuthModal';

import { Sparkles, ShoppingCart, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [foodItems, setFoodItems] = useState<FoodItem[]>(INITIAL_FOOD_ITEMS);
  const [shopItems, setShopItems] = useState<ShopItem[]>(INITIAL_SHOP_ITEMS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Floating chat assistant toggle
  const [chefAssistantOpen, setChefAssistantOpen] = useState(false);
  
  // Modals sliders
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [activeCheckoutOrder, setActiveCheckoutOrder] = useState<Order | null>(null);
  const [cartPulse, setCartPulse] = useState(false);

  // User auth state
  const [user, setUser] = useState<UserSession>({
    username: '',
    isLoggedIn: false,
    fullName: '',
    role: 'user',
    email: ''
  });

  // Dynamic SEO Standard titles based on Active Tab
  useEffect(() => {
    const seoTitles: Record<string, string> = {
      home: 'TIỆM CHAY TÂM AN - Ngon lành từ tâm, An lạc mỗi ngày',
      menu: 'Thực Đơn TIỆM CHAY TÂM AN | Mì Quảng, Bún Thái, Cơm Chiên, Lẩu Chay',
      shop: 'TIỆM CHAY TÂM AN Shop | Gia vị chay, nấm hữu cơ, thực phẩm dinh dưỡng',
      tiktok: 'TikTok TIỆM CHAY TÂM AN | Bí quyết nấu chay lành mạnh',
      blog: 'Blog TIỆM CHAY TÂM AN | Chế độ ăn chay, dinh dưỡng & tinh thần',
      admin: 'Bảng Quản Trị TIỆM CHAY TÂM AN'
    };

    document.title = seoTitles[activeTab] || 'TIỆM CHAY TÂM AN - Ngon lành từ tâm, An lạc mỗi ngày';

    // Add SEO Meta tags programmatically for realistic search spider crawl
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    const descriptions: Record<string, string> = {
      home: 'TIỆM CHAY TÂM AN - Mì Quảng, Bún Thái, cơm chiên, lẩu và món chay lành mạnh tại Phan Thiết. Hotline 0927.116.161.',
      menu: 'Thực đơn chay Tâm An gồm Mì Quảng, Bún Thái, Cơm Chiên Mắm Ruốc, Lẩu Thái, Gỏi Ngó Sen và Đồ Uống giải nhiệt.',
      shop: 'Mua gia vị chay và thực phẩm dinh dưỡng TIỆM CHAY TÂM AN giao nhanh tại Phan Thiết và toàn quốc.',
      tiktok: 'Xem video hướng dẫn nấu món chay lành mạnh, công thức lẩu và bún chay tại TIỆM CHAY TÂM AN.',
      blog: 'Chia sẻ bí quyết ăn chay dưỡng sinh, giải độc cơ thể và cân bằng tâm trí cùng TIỆM CHAY TÂM AN.'
    };
    descMeta.setAttribute('content', descriptions[activeTab] || 'TIỆM CHAY TÂM AN - Nhà hàng chay hiện đại, an lành và responsive mobile.');
  }, [activeTab]);

  // Load orders initially from express back-end database
  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.warn('Backend is booting, falling back to client mock cache.', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Cart operations
  const addToCart = (item: any, type: 'food' | 'shop') => {
    setCartItems(prev => {
      const exists = prev.find(i => i.id === item.id && i.type === type);
      if (exists) {
        return prev.map(i => i.id === item.id && i.type === type ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, {
        type,
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1
      }];
    });
    // Visual cue: trigger a brief cart pulse animation in header
    setCartPulse(true);
    setTimeout(() => setCartPulse(false), 700);
  };

  const updateQuantity = (id: string, type: 'food' | 'shop', amount: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id && item.type === type) {
          const newQ = item.quantity + amount;
          return { ...item, quantity: newQ < 1 ? 1 : newQ };
        }
        return item;
      });
    });
  };

  const removeFromCart = (id: string, type: 'food' | 'shop') => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.type === type)));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Auth operations
  const loginUser = (session: UserSession) => {
    setUser(session);
  };

  const logoutUser = () => {
    setUser({
      username: '',
      isLoggedIn: false,
      fullName: '',
      role: 'user',
      email: ''
    });
  };

  // Checkout handling
  const handleCheckoutSubmit = async (formData: { customerName: string; phone: string; address: string; paymentMethod: 'vietqr' | 'cash' }) => {
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderPayload = {
      customerName: formData.customerName,
      phone: formData.phone,
      address: formData.address,
      items: cartItems.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
      totalAmount,
      paymentMethod: formData.paymentMethod
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      if (res.ok) {
        const newOrder = await res.json();
        // pre-allocate to local view immediately
        setOrders(prev => [newOrder, ...prev]);
        clearCart();
        setCartOpen(false);

        if (formData.paymentMethod === 'vietqr') {
          // Open VietQR payment modal
          setActiveCheckoutOrder(newOrder);
        } else {
          alert(`Chúc mừng! Đơn hàng mã ${newOrder.id} của quý khách đã được đặt cơm tịnh thành công. Hãy chuẩn bị tiền mặt ${totalAmount.toLocaleString('vi-VN')}đ khi shipper giao tới nhé.`);
        }
      } else {
        alert('Có lỗi nhẹ xảy ra khi đồng bộ đặt tiệc, vui lòng gửi lại.');
      }
    } catch (err) {
      console.error(err);
      // Client-only backup fallback if server API is down
      const backupOrder: Order = {
        id: `DH-TEMP-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: formData.customerName,
        phone: formData.phone,
        address: formData.address,
        items: cartItems.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
        totalAmount,
        status: 'pending',
        paymentMethod: formData.paymentMethod,
        createdAt: new Date().toISOString(),
        addInfoCode: `TAMANTMP${Math.floor(100 + Math.random() * 900)}`
      };
      setOrders(prev => [backupOrder, ...prev]);
      clearCart();
      setCartOpen(false);
      if (formData.paymentMethod === 'vietqr') {
        setActiveCheckoutOrder(backupOrder);
      } else {
        alert('Đăng ký bàn ăn thành công (Offline Cache)!');
      }
    }
  };

  // Update order delivery status (used for both Admin panel overrides & simulated VietQR approved payment)
  const handleUpdateOrderStatus = async (id: string, status: 'pending' | 'paid' | 'completed' | 'cancelled') => {
    try {
      const res = await fetch('/api/orders/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      if (res.ok) {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
      }
    } catch (err) {
      console.error('Offline change status fallback', err);
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    }
  };

  // Add customized items from Admin forms
  const handleAddFoodItem = (item: FoodItem) => {
    setFoodItems(prev => [item, ...prev]);
  };

  const handleAddShopItem = (item: ShopItem) => {
    setShopItems(prev => [item, ...prev]);
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col justify-between" id="tiem-chay-app-root">
      
      {/* Dynamic Upper Top Promo ticker alert */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#07130e] to-amber-950 border-b border-emerald-950 text-center py-2 text-[11px] font-semibold text-[#eab308] tracking-widest flex items-center justify-center gap-2">
        <Sparkles className="h-3 w-3 animate-spin shrink-0" />
        CHÀO MỪNG KHAI TRƯƠNG: ƯU ĐÃI SHIP LẮNG ĐỌC NỘI THÀNH HÀ NỘI & TP.HCM KHI ĐẶT TRỰC TUYẾN
      </div>

      {/* Primary header nav */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cartCount={cartCount} 
        toggleCart={() => setCartOpen(!cartOpen)}
        cartPulse={cartPulse}
        user={user}
        toggleAuth={() => setAuthOpen(true)}
      />

      {/* Main viewport sections Router switcher */}
      <main className="flex-1 w-full bg-gradient-to-b from-[#070c09] to-[#040806] pt-8">
        
        {activeTab === 'home' && (
          <HomePart 
            foodItems={foodItems} 
            setActiveTab={setActiveTab} 
            addToCart={addToCart}
            openChefAI={() => setChefAssistantOpen(true)}
          />
        )}

        {activeTab === 'menu' && (
          <MenuPart 
            foodItems={foodItems} 
            addToCart={addToCart}
            openChefAI={() => setChefAssistantOpen(true)}
          />
        )}

        {activeTab === 'shop' && (
          <ShopPart 
            shopItems={shopItems} 
            addToCart={addToCart}
          />
        )}

        {activeTab === 'tiktok' && (
          <TikTokPart 
            videos={INITIAL_TIKTOK_VIDEOS} 
            foodItems={foodItems} 
            addToCart={addToCart}
          />
        )}

        {activeTab === 'blog' && (
          <BlogPart 
            blogPosts={INITIAL_BLOG_POSTS} 
          />
        )}

        {activeTab === 'admin' && (
          user.isLoggedIn && user.role === 'admin' ? (
            <AdminPart 
              orders={orders} 
              updateOrderStatus={handleUpdateOrderStatus}
              foodItems={foodItems}
              addFoodItem={handleAddFoodItem}
              shopItems={shopItems}
              addShopItem={handleAddShopItem}
              refreshOrders={fetchOrders}
            />
          ) : (
            <AdminLogin
              onLogin={(session) => {
                loginUser(session);
                setActiveTab('admin');
              }}
              onCancel={() => setActiveTab('home')}
            />
          )
        )}

      </main>

      {/* Core footer plant layout */}
      <Footer />

      {/* Sliders drawer and overlay components */}
      <ChefAssistant 
        isOpen={chefAssistantOpen}
        onClose={() => setChefAssistantOpen(false)}
        onOpen={() => setChefAssistantOpen(true)}
      />

      <CartPart 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        handleCheckout={handleCheckoutSubmit}
      />

      <CheckoutModal 
        order={activeCheckoutOrder}
        onClose={() => setActiveCheckoutOrder(null)}
        onPaymentSuccess={(id) => handleUpdateOrderStatus(id, 'paid')}
      />

      <AuthModal 
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        user={user}
        loginUser={loginUser}
        logoutUser={logoutUser}
      />

    </div>
  );
}
