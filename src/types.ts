export interface FoodItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category:
    | 'mon_nuoc'
    | 'com_chien'
    | 'lau'
    | 'mon_dung_com'
    | 'mon_goi'
    | 'mon_an_vat'
    | 'do_uong'
    | 'trang_mieng';
  image: string;
  description: string;
  isSpecial: boolean;
  ingredients: string[];
  calories: number;
}

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'gia-vi' | 'do-kho' | 'do-dong-lanh' | 'dinh-duong';
  image: string;
  description: string;
  rating: number;
  salesCount: number;
  stock: number;
  isNew?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  author: string;
  date: string;
  tags: string[];
  readTime: string;
}

export interface TikTokVideo {
  id: string;
  title: string;
  author: string;
  music: string;
  likes: number;
  comments: number;
  shares: number;
  videoUrl: string;
  coverImage: string;
  recipeAssociated?: string; 
}

export interface CartItem {
  type: 'food' | 'shop';
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface UserSession {
  username: string;
  isLoggedIn: boolean;
  fullName: string;
  role: 'admin' | 'user';
  email: string;
  phone?: string;
  address?: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'paid' | 'completed' | 'cancelled';
  paymentMethod: 'vietqr' | 'cash';
  createdAt: string;
  addInfoCode: string;
}
