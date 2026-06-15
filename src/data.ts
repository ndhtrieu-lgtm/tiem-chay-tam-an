import { FoodItem, ShopItem, BlogPost, TikTokVideo } from './types';

export const INITIAL_FOOD_ITEMS: FoodItem[] = [
  {
    id: 'food_1',
    name: 'Mì Quảng',
    price: 30000,
    category: 'mon_nuoc',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60',
    description: 'Sợi mì vàng nghệ mềm mại cùng nước lèo chay ngọt thanh, điểm xuyết chả nấm, phù trúc và đậu rang giòn tan.',
    isSpecial: true,
    ingredients: ['Mì Quảng nghệ', 'Chả nấm', 'Phù trúc', 'Đậu rang', 'Hành baro'],
    calories: 410
  },
  {
    id: 'food_2',
    name: 'Bún Thái',
    price: 35000,
    category: 'mon_nuoc',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&auto=format&fit=crop&q=60',
    description: 'Bún sợi mảnh nước dùng đậm đà chua cay thanh, chả chay, nấm và rau sống tươi ngon.',
    isSpecial: true,
    ingredients: ['Bún tươi', 'Nấm đông cô', 'Chả chay', 'Sả', 'Ớt xiêm'],
    calories: 430
  },
  {
    id: 'food_3',
    name: 'Bún Thịt Nướng',
    price: 30000,
    category: 'mon_nuoc',
    image: 'https://images.unsplash.com/photo-1542444459-db0c471f0c28?w=500&auto=format&fit=crop&q=60',
    description: 'Bún tươi ăn kèm thịt nướng chay thơm lừng, chả giò nhỏ và nước mắm chay đặc biệt.',
    isSpecial: false,
    ingredients: ['Bún tươi', 'Thịt nướng chay', 'Chả giò', 'Rau sống', 'Nước mắm chay'],
    calories: 420
  },
  {
    id: 'food_4',
    name: 'Bún Mắm Nêm',
    price: 30000,
    category: 'mon_nuoc',
    image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=500&auto=format&fit=crop&q=60',
    description: 'Bún mắm nêm chay đậm vị, cá thác lác chay dai giòn, rau thơm và đậu phụ chiên vàng.',
    isSpecial: false,
    ingredients: ['Bún tươi', 'Mắm nêm chay', 'Cá chay', 'Đậu phụ', 'Rau thơm'],
    calories: 400
  },
  {
    id: 'food_5',
    name: 'Mì Tiềm',
    price: 38000,
    category: 'mon_nuoc',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60',
    description: 'Mì đặc biệt hầm nhẹ vị thuốc bắc, nấm và đậu hũ, đem lại hơi ấm dịu nhẹ từ từ.',
    isSpecial: false,
    ingredients: ['Mì tươi', 'Nấm đông cô', 'Đậu hũ', 'Thuốc bắc', 'Hành sả'],
    calories: 420
  },
  {
    id: 'food_6',
    name: 'Miến Xào',
    price: 32000,
    category: 'mon_nuoc',
    image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=500&auto=format&fit=crop&q=60',
    description: 'Miến chay xào thơm lừng với nấm đùi gà và rau củ giòn ngọt.',
    isSpecial: false,
    ingredients: ['Miến dong', 'Nấm đùi gà', 'Cà rốt', 'Rau cải', 'Tỏi phi'],
    calories: 360
  },
  {
    id: 'food_7',
    name: 'Mì Vàng Xào Nấm',
    price: 34000,
    category: 'mon_nuoc',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&auto=format&fit=crop&q=60',
    description: 'Mì vàng giòn xào cùng nấm tươi và sốt dầu hào chay, vẫn giữ độ giòn ngon mà không ngấy.',
    isSpecial: false,
    ingredients: ['Mì vàng', 'Nấm đông cô', 'Nấm kim châm', 'Sốt dầu hào', 'Hành lá'],
    calories: 390
  },
  {
    id: 'food_8',
    name: 'Mì Xào Giòn',
    price: 34000,
    category: 'mon_nuoc',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60',
    description: 'Mì giòn xào thấm sốt chua ngọt, ăn cùng rau củ và nấm dai béo rất hợp vị.',
    isSpecial: false,
    ingredients: ['Mì giòn', 'Ớt chuông', 'Nấm bào ngư', 'Đậu que', 'Sốt chua ngọt'],
    calories: 395
  },
  {
    id: 'food_9',
    name: 'Bánh Phở Xào',
    price: 32000,
    category: 'mon_nuoc',
    image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=500&auto=format&fit=crop&q=60',
    description: 'Bánh phở xào giòn cạnh, nấm và rau tươi hòa cùng nước tương chay thơm ngọt.',
    isSpecial: false,
    ingredients: ['Bánh phở', 'Nấm rơm', 'Hành tây', 'Rau cải', 'Dầu mè'],
    calories: 380
  },
  {
    id: 'food_10',
    name: 'Mì Cay',
    price: 40000,
    category: 'mon_nuoc',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60',
    description: 'Mì chay cay thơm nồng với ớt sả, nấm và nước dùng đỏ tươi tự nhiên.',
    isSpecial: true,
    ingredients: ['Mì tươi', 'Ớt bột', 'Sả', 'Nấm đùi gà', 'Cải ngọt'],
    calories: 440
  },
  {
    id: 'food_11',
    name: 'Cơm Chiên Mắm Ruốc',
    price: 40000,
    category: 'com_chien',
    image: 'https://images.unsplash.com/photo-1512058564366-c9e0e7f3d2b8?w=500&auto=format&fit=crop&q=60',
    description: 'Cơm chiên dẻo tơi, dậy mùi mắm ruốc chay, hành phi và hạt sen giòn thơm.',
    isSpecial: false,
    ingredients: ['Cơm gạo thơm', 'Mắm ruốc chay', 'Hạt sen', 'Đậu phụ', 'Hành phi'],
    calories: 500
  },
  {
    id: 'food_12',
    name: 'Cơm Chiên Dương Châu',
    price: 40000,
    category: 'com_chien',
    image: 'https://images.unsplash.com/photo-1589879666062-107a9dc88a31?w=500&auto=format&fit=crop&q=60',
    description: 'Cơm chiên vàng ươm, thơm vị dầu mè, nấm, đậu hũ và hạt sen ngọt bùi.',
    isSpecial: false,
    ingredients: ['Cơm gạo', 'Nấm', 'Đậu hũ', 'Hạt sen', 'Hành tây'],
    calories: 480
  },
  {
    id: 'food_13',
    name: 'Cơm Chiên Hạt Sen',
    price: 45000,
    category: 'com_chien',
    image: 'https://images.unsplash.com/photo-1533777324565-a040eb52fac2?w=500&auto=format&fit=crop&q=60',
    description: 'Cơm chiên ngọt bùi với hạt sen Huế, nấm và hành khô thơm ngây ngất.',
    isSpecial: true,
    ingredients: ['Cơm gạo thơm', 'Hạt sen', 'Nấm đông cô', 'Hành khô', 'Nước tương'],
    calories: 520
  },
  {
    id: 'food_14',
    name: 'Cơm Trắng',
    price: 15000,
    category: 'mon_dung_com',
    image: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=500&auto=format&fit=crop&q=60',
    description: 'Cơm trắng dẻo thơm, nấu từ gạo hữu cơ chọn lọc.',
    isSpecial: false,
    ingredients: ['Gạo hữu cơ', 'Nước tinh khiết'],
    calories: 260
  },
  {
    id: 'food_15',
    name: 'Lẩu Thái',
    price: 175000,
    originalPrice: 200000,
    category: 'lau',
    image: 'https://images.unsplash.com/photo-1547592166-1f6b6e0f52c7?w=500&auto=format&fit=crop&q=60',
    description: 'Lẩu Thái chay với nước dùng chua cay đậm đà, nấm, bắp cải và rau muống tươi.',
    isSpecial: true,
    ingredients: ['Nấm đùi gà', 'Rau muống', 'Đậu hũ', 'Sả', 'Lá chanh'],
    calories: 760
  },
  {
    id: 'food_16',
    name: 'Lẩu Khoai Môn',
    price: 175000,
    originalPrice: 200000,
    category: 'lau',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60',
    description: 'Lẩu khoai môn béo bùi, hòa quyện nước cốt dừa nhạt và nấm hương thơm ấm.',
    isSpecial: false,
    ingredients: ['Khoai môn', 'Nấm hương', 'Đậu hũ', 'Cà chua', 'Sả'],
    calories: 720
  },
  {
    id: 'food_17',
    name: 'Đậu Hủ Kho Cà Thơm',
    price: 40000,
    category: 'mon_dung_com',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=500&auto=format&fit=crop&q=60',
    description: 'Đậu hũ phối cà thơm chín mềm, nước sốt sánh vàng ngọt nhẹ, ăn kèm cơm trắng nóng.',
    isSpecial: false,
    ingredients: ['Đậu hũ', 'Cà thơm', 'Nước tương', 'Tiêu', 'Hành lá'],
    calories: 330
  },
  {
    id: 'food_18',
    name: 'Chả Kho Nấm',
    price: 45000,
    category: 'mon_dung_com',
    image: 'https://images.unsplash.com/photo-1528871478786-99e40f7a671d?w=500&auto=format&fit=crop&q=60',
    description: 'Chả kho nấm thượng phẩm mềm mượt, màu nâu cánh gián và vị umami đậm đà.',
    isSpecial: false,
    ingredients: ['Chả chay', 'Nấm đông cô', 'Nước tương', 'Đường thốt nốt', 'Tỏi'],
    calories: 380
  },
  {
    id: 'food_19',
    name: 'Cải Thìa Xào Nấm Đông Cô',
    price: 45000,
    category: 'mon_dung_com',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60',
    description: 'Cải thìa giòn ngọt xào cùng nấm đông cô thơm và dầu hào chay bóng mượt.',
    isSpecial: false,
    ingredients: ['Cải thìa', 'Nấm đông cô', 'Tỏi', 'Dầu hào chay', 'Hạt tiêu'],
    calories: 180
  },
  {
    id: 'food_20',
    name: 'Nấm Đùi Gà Xào Sả Ớt',
    price: 45000,
    category: 'mon_dung_com',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&auto=format&fit=crop&q=60',
    description: 'Nấm đùi gà xào sả ớt là vị cay nồng quyện ấm, ăn cùng cơm nóng tỏa vị nhẹ nhàng.',
    isSpecial: false,
    ingredients: ['Nấm đùi gà', 'Sả', 'Ớt', 'Nước tương', 'Hành lá'],
    calories: 220
  },
  {
    id: 'food_21',
    name: 'Cải Chua Xào Nấm',
    price: 45000,
    category: 'mon_dung_com',
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=500&auto=format&fit=crop&q=60',
    description: 'Cải chua giòn, thơm quyện nấm xào thanh mát, thích hợp ăn kèm cơm và bún.',
    isSpecial: false,
    ingredients: ['Cải chua', 'Nấm', 'Tỏi', 'Nước tương', 'Đường thốt nốt'],
    calories: 170
  },
  {
    id: 'food_22',
    name: 'Canh Rong Biển Hạt Sen',
    price: 45000,
    category: 'mon_dung_com',
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=500&auto=format&fit=crop&q=60',
    description: 'Canh rong biển thanh mát kết hợp hạt sen bùi béo, giúp thanh lọc và giải nhiệt.',
    isSpecial: false,
    ingredients: ['Rong biển', 'Hạt sen', 'Cà rốt', 'Hành lá', 'Nước dùng nấm'],
    calories: 110
  },
  {
    id: 'food_23',
    name: 'Canh Chua',
    price: 45000,
    category: 'mon_dung_com',
    image: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=500&auto=format&fit=crop&q=60',
    description: 'Canh chua chay với me, bông so đũa và cà chua, hậu vị thanh nhẹ dễ chịu.',
    isSpecial: false,
    ingredients: ['Me chua', 'Bông so đũa', 'Cà chua', 'Rau om', 'Hành ngò'],
    calories: 130
  },
  {
    id: 'food_24',
    name: 'Gỏi Ngó Sen',
    price: 50000,
    category: 'mon_goi',
    image: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=500&auto=format&fit=crop&q=60',
    description: 'Gỏi ngó sen tươi trong với giòn sen, cà rốt, đậu phộng rang và nước mắm chua ngọt chay.',
    isSpecial: false,
    ingredients: ['Ngó sen', 'Cà rốt', 'Đậu phộng', 'Ớt', 'Rau thơm'],
    calories: 200
  },
  {
    id: 'food_25',
    name: 'Gỏi Rong Biển',
    price: 50000,
    category: 'mon_goi',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60',
    description: 'Gỏi rong biển mát lạnh, giòn sực, hòa quyện sốt mè dầm ngọt thanh.',
    isSpecial: false,
    ingredients: ['Rong biển', 'Xà lách', 'Hạt mè', 'Nước sốt mè', 'Cà rốt'],
    calories: 180
  },
  {
    id: 'food_26',
    name: 'Gỏi Khoai Môn',
    price: 50000,
    category: 'mon_goi',
    image: 'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=500&auto=format&fit=crop&q=60',
    description: 'Gỏi khoai môn mềm dẻo, trộn cùng rau thơm và nước sốt thanh chua ngọt.',
    isSpecial: false,
    ingredients: ['Khoai môn', 'Xà lách', 'Rau thơm', 'Sốt chua ngọt', 'Đậu phộng'],
    calories: 240
  },
  {
    id: 'food_27',
    name: 'Chả Giò Chiên Giòn',
    price: 40000,
    category: 'mon_an_vat',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60',
    description: 'Chả giò chay giòn rụm, nhân nấm và rau củ thơm ngọt, chấm tương ớt chua cay.',
    isSpecial: false,
    ingredients: ['Bánh tráng', 'Nấm', 'Cà rốt', 'Miến', 'Rau thơm'],
    calories: 310
  },
  {
    id: 'food_28',
    name: 'Chả Giò Phô Mai',
    price: 45000,
    category: 'mon_an_vat',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&auto=format&fit=crop&q=60',
    description: 'Chả giò chay nhân phô mai tan chảy, vỏ giòn vàng bắt mắt.',
    isSpecial: false,
    ingredients: ['Bánh tráng', 'Phô mai chay', 'Nấm', 'Miến', 'Rau thơm'],
    calories: 340
  },
  {
    id: 'food_29',
    name: 'Pizza Thập Cẩm',
    price: 80000,
    category: 'mon_an_vat',
    image: 'https://images.unsplash.com/photo-1548365328-3abe86c78b22?w=500&auto=format&fit=crop&q=60',
    description: 'Pizza chay thập cẩm phủ phô mai chay, nấm, ớt và rau củ caramel.',
    isSpecial: false,
    ingredients: ['Đế pizza', 'Phô mai chay', 'Nấm', 'Ớt chuông', 'Basil'],
    calories: 540
  },
  {
    id: 'food_30',
    name: 'Xúc Xích',
    price: 30000,
    category: 'mon_an_vat',
    image: 'https://images.unsplash.com/photo-1584270354949-4eb2240c0aa6?w=500&auto=format&fit=crop&q=60',
    description: 'Xúc xích chay màu nâu vàng, ăn kèm tương ớt và rau mầm tươi.',
    isSpecial: false,
    ingredients: ['Xúc xích chay', 'Tương ớt', 'Bánh mì', 'Rau mầm', 'Hạt tiêu'],
    calories: 350
  },
  {
    id: 'food_31',
    name: 'Mẹt Bún Đậu',
    price: 80000,
    category: 'mon_an_vat',
    image: 'https://images.unsplash.com/photo-1527576825862-6b97d56d7c1b?w=500&auto=format&fit=crop&q=60',
    description: 'Mẹt bún đậu chay với đậu hũ rán, chả cốm, rau sống và mắm chay đặc trưng.',
    isSpecial: false,
    ingredients: ['Bún tươi', 'Đậu hũ', 'Chả cốm chay', 'Rau sống', 'Mắm chay'],
    calories: 520
  },
  {
    id: 'food_32',
    name: 'Mì Ý Sốt Cà',
    price: 40000,
    category: 'mon_an_vat',
    image: 'https://images.unsplash.com/photo-1512058564366-c9e0e7f3d2b8?w=500&auto=format&fit=crop&q=60',
    description: 'Mì Ý chay sốt cà chua tươi, trang trí lá húng quế và phô mai chay.',
    isSpecial: false,
    ingredients: ['Mì Ý', 'Sốt cà chua', 'Húng quế', 'Phô mai chay', 'Ớt bột'],
    calories: 450
  },
  {
    id: 'food_33',
    name: 'Mì Ý Đút Lò',
    price: 50000,
    category: 'mon_an_vat',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&auto=format&fit=crop&q=60',
    description: 'Mì Ý xốt béo ngậy, đút lò cùng phô mai chay và nấm xé sợi.',
    isSpecial: false,
    ingredients: ['Mì Ý', 'Phô mai chay', 'Nấm', 'Bơ chay', 'Hành tím'],
    calories: 520
  },
  {
    id: 'food_34',
    name: 'Trà Tắc',
    price: 20000,
    category: 'do_uong',
    image: 'https://images.unsplash.com/photo-1484981138541-3d074aa97716?w=500&auto=format&fit=crop&q=60',
    description: 'Trà tắc chua ngọt mát lạnh, thanh lọc và giải nhiệt ngay tức thì.',
    isSpecial: false,
    ingredients: ['Trà đen', 'Tắc', 'Đường phèn', 'Lá bạc hà'],
    calories: 80
  },
  {
    id: 'food_35',
    name: 'Pessi',
    price: 15000,
    category: 'do_uong',
    image: 'https://images.unsplash.com/photo-1522210884636-273fd5bc5d7f?w=500&auto=format&fit=crop&q=60',
    description: 'Nước giải khát Pessi mát lạnh phục vụ cùng bữa chay nhẹ nhàng.',
    isSpecial: false,
    ingredients: ['Nước có gas', 'Hương cola'],
    calories: 140
  },
  {
    id: 'food_36',
    name: 'Nước Khoáng',
    price: 10000,
    category: 'do_uong',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=60',
    description: 'Nước khoáng tinh khiết lạnh sạch để giải khát nhanh và an toàn.',
    isSpecial: false,
    ingredients: ['Nước khoáng'],
    calories: 0
  }
];

export const INITIAL_SHOP_ITEMS: ShopItem[] = [
  {
    id: 'item_1',
    name: 'Hạt Nêm Ngưu Bàng Tâm An',
    price: 75000,
    originalPrice: 90000,
    category: 'gia-vi',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60',
    description: 'Hạt nêm thuần chay bào chế từ rễ cây ngưu bàng Nhật Bản, nấm hương rừng và rau củ hữu cơ. Không mì chính, không chất bảo quản.',
    rating: 4.9,
    salesCount: 1420,
    stock: 120,
    isNew: true
  },
  {
    id: 'item_2',
    name: 'Nước Tương Nấm Đùi Gà Organic',
    price: 45000,
    category: 'gia-vi',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=60',
    description: 'Lên men hoàn toàn tự nhiên từ đậu nành non hữu cơ và tinh chất nấm đùi gà ngọt thanh nhẹ, mùi vị mộc mạc thơm dịu bổ dưỡng.',
    rating: 4.8,
    salesCount: 890,
    stock: 85
  },
  {
    id: 'item_3',
    name: 'Chả Lụa Chay Hạt Sen Lam Điền',
    price: 95000,
    originalPrice: 110000,
    category: 'do-dong-lanh',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=60',
    description: 'Làm từ protein lúa mì cao cấp quyện củ nén thanh tao và hạt sen Huế bùi dẻo thơm nồng, gói lá chuối hấp nhiệt khép kín chất lượng cao.',
    rating: 4.7,
    salesCount: 610,
    stock: 50,
    isNew: true
  },
  {
    id: 'item_4',
    name: 'Sườn Non Lúa Mạch Sấy Khô',
    price: 65000,
    category: 'do-kho',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&auto=format&fit=crop&q=60',
    description: 'Sườn lát chay nguyên liệu đạm đậu nành béo mềm và protein lúa mạch organic dẻo dai. Dùng để làm xá xíu chay, kho tàu hoặc nướng sả.',
    rating: 4.9,
    salesCount: 1210,
    stock: 200
  },
  {
    id: 'item_5',
    name: 'Bột Dinh Dưỡng Hợp Xướng Ngũ Cốc',
    price: 180000,
    category: 'dinh-duong',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=500&auto=format&fit=crop&q=60',
    description: 'Bột đạm thực vật toàn phần chiết xuất từ mầm gạo lứt dẻo, hạt diêm mạch đỏ, tảo xoắn Spirulina và kỷ tử rừng bổ sung đạm dồi dào cho người ăn chay trường.',
    rating: 4.9,
    salesCount: 380,
    stock: 45,
    isNew: true
  },
  {
    id: 'item_6',
    name: 'Sa Tế Tôm Sả Tiêu Chay',
    price: 35000,
    category: 'gia-vi',
    image: 'https://images.unsplash.com/photo-1618414241390-9ec1f5522111?w=500&auto=format&fit=crop&q=60',
    description: 'Hỗn hợp dầu điều đỏ ươm, sả băm vàng rụm, ớt nướng cay nồng và váng hành baro dẻo quánh, thách thức mọi tín đồ ăn lẩu nước cay nồng.',
    rating: 4.6,
    salesCount: 1980,
    stock: 140
  },
  {
    id: 'item_7',
    name: 'Nui Chuối Thuần Chay Glutent-Free',
    price: 52000,
    category: 'do-kho',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&auto=format&fit=crop&q=60',
    description: 'Được chế tác từ chuối sứ xanh hữu cơ và tinh bột khoai mì dẻo dai giúp tăng sinh lợi khuẩn đường ruột thích hợp cho người nhạy cảm với gluten.',
    rating: 4.7,
    salesCount: 420,
    stock: 75
  },
  {
    id: 'item_8',
    name: 'Mọc Chay Nấm Hương Đặc Biệt',
    price: 85000,
    category: 'do-dong-lanh',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&auto=format&fit=crop&q=60',
    description: 'Viên thả lẩu hoặc rán làm từ giò sống chay ngấm đều nấm đông cô dai thơm và nấm tai mèo xắt hạt lựu đem lại kết cấu sần sật mọng nước.',
    rating: 4.8,
    salesCount: 740,
    stock: 40
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog_1',
    title: 'Xu Hướng Ăn Chay Trường Cho Gia Đình Hiện Đại',
    summary: 'Lợi ích bất ngờ của chế độ dinh dưỡng thuần thực vật và cách chuẩn bị bữa cơm chay cân bằng vi chất chỉ trong vòng 30 phút.',
    content: `Ăn chay ngày nay không còn gói gọn trong các khái niệm tôn giáo hay các ngày rằm, mùng một âm lịch mà đã vươn lên thành triết lý sống khỏe, sống bền vững của thế hệ trẻ và gia đình hiện đại.

### 1. Tại sao Ăn Chay Trường lại lên ngôi?
Nhiều nghiên cứu y học chứng minh rằng, ăn chay khoa học giúp:
- Giảm cholesterol xấu trong máu hiệu quả tới 25%.
- Ổn định huyết áp và bảo vệ chức năng tim mạch một cách dồi dào.
- Ngăn ngừa tình trạng kháng insulin, đẩy lùi nguy cơ tiểu đường loại 2.
- Bảo vệ tài nguyên trái đất và giảm thải khí nhà kính bảo vệ biến đổi khí hậu toàn cầu.

### 2. Thiết kế đĩa ăn dinh dưỡng Chay hoàn hảo
Để cơ thể phát triển dồi dào, sinh lực tràn trề, bữa ăn chay tối ưu cần đáp ứng "Quy tắc 4 nhóm dinh dưỡng":
- **50% Đĩa ăn**: Rau xanh nhiều xơ và trái cây tươi dồi dào (súp lơ, cải xôi, cà rốt).
- **25% Đĩa ăn**: Đạm thực vật lành mạnh từ các loại đậu (đậu hũ, đậu chickpea, sườn non đậu nành hạt sen).
- **20% Đĩa ăn**: Carbohydrate phức hợp giúp no lâu (Gạo lứt đỏ, diêm mạch, khoai lang ngọt).
- **5% Đĩa ăn**: Chất béo tốt từ quả bơ chín, hạt óc chó, dầu olive nguyên chất hoặc mè rang thơm.

Hãy ghé qua Tiệm Chay Tâm An để trải nghiệm các mâm cơm chay định lượng khoa học hoặc đặt mua gia vị ngưu bàng, tảo xoắn để tự nêm nếm tại gia!`,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60',
    author: 'Lương Y Minh Tâm',
    date: '10 Tháng 6, 2026',
    tags: ['Sức Khỏe', 'Ăn Chay Hiện Đại', 'Dinh Dưỡng'],
    readTime: '5 phút đọc'
  },
  {
    id: 'blog_2',
    title: 'Bí Quyết Hầm Nước Dùng Chay Ngọt Đậm Đà Không Cần Mì Chính',
    summary: 'Khám phá bí mật đằng sau nước cốt Phở Chay và Lẩu Nấm Trường Thọ làm mê mẩn thực khách tại Tiệm Chay Tâm An.',
    content: `Nhiều người e ngại món chay luộc nhạt nhẽo hoặc nước súp chay không mọng nước như xương hầm. Hôm nay, Bếp Trưởng Tâm An xin bật mí nghệ thuật "hầm hơi nước tự nhiên" từ rau quả rừng mang lại vị ngọt sâu "Umami" thanh lịch tự nhiên.

### Sự kỳ diệu của củ Ngưu Bàng và Sá Sùng Chay
- **Rễ ngưu bàng**: Được ví như nhân sâm dưới đất, chứa nhiều Inulin và khoáng chất, đun sôi 45 phút tỏa ra mộc hương thơm lừng và vị ngọt lịm đặc trưng.
- **Lá dứa rừng & Đường phèn kết tinh**: Làm dịu hậu vị của củ cải đường, tạo nên một kết cấu nước mỏng trong như pha lê nhưng đọng vị lưu luyến nơi đầu lưỡi.
- **Nấm đông cô khô chưng tiêu**: Tiết ra acid glutamic tự nhiên – chiếc chìa khóa tăng khẩu vị kích thích vị giác một cách lành mạnh bộc phá nhất.

### Quy trình hầm 3 giai đoạn:
1. Giai đoạn 1: Áp chảo nướng các loại hành tây, sả tươi và củ dền để giải phóng đường caramel thơm bóng bẩy.
2. Giai đoạn 2: Cho rễ ngưu bàng, su hào và mía lau hầm nhỏ lửa liu riu trong 2.5 tiếng. Không sùng sục trào bọt để nước lèo ngọt trong veo.
3. Giai đoạn 3: Nêm nếm bằng muối hồng Himalaya và Hạt nêm ngưu bàng Tâm An trước khi đem lọc xơ tơi.

Áp dụng ngay mẹo nhỏ này tại nhà để cả gia đình húp trọn bát canh chay thơm ngậy nhé!`,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=500&auto=format&fit=crop&q=60',
    author: 'Chef Lê Anh',
    date: '04 Tháng 6, 2026',
    tags: ['Bí Quyết Nấu Ăn', 'Bếp Chay', 'Ăn Sạch'],
    readTime: '4 phút đọc'
  },
  {
    id: 'blog_3',
    title: 'Lắng Nghe Cơ Thể: Thanh Lọc "Depuration" 3 Ngày Cùng Chế Độ Chay Thiền',
    summary: 'Cách làm dịu tâm trí, giải độc hệ thống bài tiết, xua tan căng thẳng thông qua sự kết hợp giản đơn giữa các món ăn chưng nấm nhẹ nhàng.',
    content: `Thời gian làm việc cường độ cao liên tục khiến cơ quan nội dưỡng của bạn chịu nhiều stress tích tụ độc tố. Chế độ Chay Thiền "Mindful Eating" trong vòng 3 ngày ngắn ngủi sẽ đóng vai trò như chiếc nút "Khởi động lại hoàn hảo".

### Ngày 1: Đánh thức vị giác giản đơn
Bắt đầu ngày mới bằng ly nước ấm chanh ngâm hạt chia. Bữa trưa sảng khoái với Gỏi Cuốn Ngũ Sắc Sốt Lạc béo thanh và cháo gạo lứt hoa sen nhạt muối.

### Ngày 2: Chuyển hóa chuyển năng lượng sâu
Hấp thu toàn bộ vi chất của Lẩu Nấm Trường Thọ với độ cô đặc của các loại nấm đùi gà dồi dào dinh dưỡng, kết hợp nằm gác chân xông tinh dầu vỏ bưởi ấm áp.

### Ngày 3: Tái tạo sinh lực bền bỉ
Bổ sung sinh lượng bền bỉ từ Protein lúa mạch và các loại ngũ cốc nguyên cám khô chưng nấm dầm tiêu của Tâm An shop để chuẩn bị tinh thần sáng khoái quay lại tuần làm việc tràn đầy xung thiên.

Chú ý tập trung nhai chậm 30 lần mỗi muỗng để thấu cảm rõ vị ngọt ngào từ thực vật ban tặng nhé thực khách!`,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&auto=format&fit=crop&q=60',
    author: 'Thiền Sư Tâm Thức',
    date: '28 Tháng 5, 2026',
    tags: ['Thanh Lọc', 'Thiền', 'Chữa Lành'],
    readTime: '6 phút đọc'
  }
];

export const INITIAL_TIKTOK_VIDEOS: TikTokVideo[] = [
  {
    id: 'tok_1',
    title: 'Hướng dẫn nấu Phở Chay Đại Cát nước dùng ngọt trong veo cực thơm 🍜✨ #anchay #xuhuong #monchayngon',
    author: 'tiemchaytaman.official',
    music: 'Tiệm Chay Tâm An - Âm thanh mộc cầm thư thái',
    likes: 12400,
    comments: 358,
    shares: 1250,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-kitchen-utensils-and-vegetables-on-a-table-40432-large.mp4',
    coverImage: 'https://images.unsplash.com/photo-1547928576-a4a33237eb35?w=512&auto=format&fit=crop&q=80',
    recipeAssociated: 'food_1'
  },
  {
    id: 'tok_2',
    title: 'Cách làm Gỏi Cuốn Ngũ Sắc kèm Sốt Lạc bùi béo ăn hoài không chán 🥬🥑 #cooking #trending #veganrecipe',
    author: 'anchaycung_chefLe',
    music: 'Linh Hồn Thực Vật - Nhạc thiền tĩnh tâm',
    likes: 8900,
    comments: 204,
    shares: 980,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-vegetables-being-sliced-on-a-wooden-board-40436-large.mp4',
    coverImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=512&auto=format&fit=crop&q=80',
    recipeAssociated: 'food_6'
  },
  {
    id: 'tok_3',
    title: 'Khui hộp Đậu Hũ Kho Tộ tiêu xanh niêu đất sôi sùng sục thơm điếc mũi! 😋🔥 #reviewmonngon #mantu #chay',
    author: 'tiemchaytaman.official',
    music: 'Nhịp điệu Sông Quê - Acoustic sáo trúc',
    likes: 21500,
    comments: 670,
    shares: 3400,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cooking-fresh-pasta-in-a-pan-34533-large.mp4',
    coverImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=512&auto=format&fit=crop&q=80',
    recipeAssociated: 'food_3'
  }
];
