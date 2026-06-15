import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const portArgIndex = process.argv.indexOf('--port');
const portFromArg = portArgIndex !== -1 ? Number(process.argv[portArgIndex + 1]) : NaN;
const PORT = Number.isInteger(portFromArg)
  ? portFromArg
  : Number(process.env.PORT ?? 3000);

app.use(express.json());

// In-memory Database for demonstration & real-time responsiveness
const orders: any[] = [
  {
    id: 'DH-1049',
    customerName: 'Nguyễn Hồng Đăng',
    phone: '0912345678',
    address: '128 Lê Lợi, Phường Bến Thành, Quận 1, TP. HCM',
    items: [
      { name: 'Phở Chay Đại Cát', quantity: 2, price: 65000 },
      { name: 'Gỏi Cuốn Ngũ Sắc Sốt Lạc', quantity: 1, price: 48000 }
    ],
    totalAmount: 178000,
    status: 'completed',
    paymentMethod: 'vietqr',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(), // 3 hours ago
    addInfoCode: 'TAMAN1049'
  },
  {
    id: 'DH-1050',
    customerName: 'Trần Thị Mai',
    phone: '0987654321',
    address: 'Vinhomes Grand Park, Quận 9, TP. HCM',
    items: [
      { name: 'Lẩu Nấm Trường Thọ', quantity: 1, price: 280000 },
      { name: 'Chè Sen Long Nhãn Thượng Hạng', quantity: 2, price: 35000 }
    ],
    totalAmount: 350000,
    status: 'paid',
    paymentMethod: 'vietqr',
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(), // 1 hour ago
    addInfoCode: 'TAMAN1050'
  }
];

// In-memory reviews API
const feedback = [
  { name: 'Minh Tuấn', rating: 5, comment: 'Đậu hũ kho tộ tuyệt hảo, béo mọng nước cắn một phát ngập hành baro rất đã.' },
  { name: 'Khánh Linh', rating: 5, comment: 'Phở chay ngọt thanh đúng vị thảo mộc thiên nhiên, không gắt bột ngọt.' }
];

// Initialize Gemini Client safely
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn('GEMINI_API_KEY is not defined in environment variables. Gemini features will run in offline demo mode.');
    }
    aiClient = new GoogleGenAI({
      apiKey: key || 'DEMO_KEY',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// 1. API: Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

// 2. API: Get Orders
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// 3. API: Create Order
app.post('/api/orders', (req, res) => {
  const { customerName, phone, address, items, totalAmount, paymentMethod } = req.body;
  
  if (!customerName || !phone || !items || !totalAmount) {
    return res.status(400).json({ error: 'Thiếu thông tin đơn hàng thiết yếu.' });
  }

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const orderId = `DH-${randomNum}`;
  const addInfoCode = `TAMAN${randomNum}`;

  const newOrder = {
    id: orderId,
    customerName,
    phone,
    address: address || 'Nhận tại cửa hàng (12 Chùa Bộc, Đống Đa, Hà Nội)',
    items,
    totalAmount,
    status: 'pending', // default pending
    paymentMethod,
    createdAt: new Date().toISOString(),
    addInfoCode
  };

  orders.unshift(newOrder); // Add to beginning
  res.status(201).json(newOrder);
});

// 4. API: Update Order Status (for simulated VietQR auto-approval or admin overrides)
app.post('/api/orders/update-status', (req, res) => {
  const { id, status } = req.body;
  const order = orders.find(o => o.id === id);
  if (order) {
    order.status = status;
    return res.json({ success: true, order });
  }
  res.status(404).json({ error: 'Không tìm thấy mã đơn hàng.' });
});

// 5. API: Gemini Chef & Nutritionist Chatbot API
app.post('/api/gemini/chat', async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Nội dung tin nhắn không được trống.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    // Elegant fallback simulation if user has not set Gemini key yet
    const simulatedAnswers = [
      "Chào bạn! Tiệm Chay Tâm An rất hân hạnh được tư vấn. Để có một làn da khỏe và thải độc tố tốt, mình đặc biệt khuyên bạn dùng 'Phở Chay Đại Cát' hầm từ rễ Ngưu Bàng kết hợp cùng đĩa 'Gỏi Cuốn Ngũ Sắc' chứa nhiều vitamin nhóm B và khoáng tố.",
      "Nam mô A Di Đà Phật, về dinh dưỡng ăn chay trường, điều quan trọng nhất là bạn cần cân bằng Đạm thực vật từ sườn non lúa mạch và chất béo bùi từ quả óc chó, hạt sen Huế đang bán tại gian hàng hữu cơ của tiệm.",
      "Tuyệt vời quá! Nếu bạn đang tập gym hoặc cần nạp nhiều cơ bắp chay, hãy bổ sung 'Bột Dinh Dưỡng Hợp Xướng Ngũ Cốc' của cửa hàng Tâm An. Sản phẩm tích hợp tảo xoắn Spirulina chứa tới 65% đạm tinh khiết.",
      "Món 'Lẩu Nấm Trường Thọ' hầm sâm dây chính là bài thuốc quý giúp an thần ngủ ngon, bổ dưỡng sinh khí sau những ngày làm việc vất vả, rất hợp ăn cùng gia đình đông vui ấm cúng!"
    ];
    const answer = simulatedAnswers[Math.floor(Math.random() * simulatedAnswers.length)];
    // Delay to simulate network wait
    await new Promise(resolve => setTimeout(resolve, 600));
    return res.json({ text: answer, demo: true });
  }

  try {
    const ai = getGeminiClient();
    
    // Build context
    const chefPersonaContext = `Bạn là Trợ Lý Chef kiêm Chuyên Gia Dinh Dưỡng Thần Thảo tại "TIỆM CHAY TÂM AN". 
Giọng điệu ấm áp, khiêm cung, hòa nhã, lịch thiệp đậm triết lý thiền chay Việt Nam. 
Bạn thấu biết sâu sắc về các món chay trong thực đơn của tiệm như:
- Phở Chay Đại Cát (65k, nước dùng từ rễ ngưu bàng, sá sùng chay ngọt thanh)
- Bún Bò Huế Chay Tâm An (68k, cay nồng ấm từ sả sate chay bắp chuối)
- Đậu Hũ Kho Tộ Tâm Giao (55k, kho niêu đất thơm tiêu đen đậm đà)
- Chè Sen Long Nhãn Thượng Hạng (35k, nhãn lồng Phố Hiến sáp dẻo hạt sen)
- Lẩu Nấm Trường Thọ (280k, sâm dây, kỷ tử và sâm bổ lượng với 8 loại nấm quý)
- Gỏi Cuốn Ngũ Sắc Sốt Lạc (48k, xoài xanh, cải tím sốt lạc béo thơm)

Cùng các thực phẩm dinh dưỡng khô bán tại cửa hàng:
- Hạt Nêm Ngưu Bàng Tâm An (75k)
- Nước Tương Nấm Đùi Gà Organic (45k)
- Chả Lụa Chay Hạt Sen Lam Điền (95k)
- Sườn Non Lúa Mạch Sấy Khô (65k)
- Bột Dinh Dưỡng Hợp Xướng Ngũ Cốc có tảo xoắn (180k)

Nhiệm vụ của bạn là:
1. Giải đáp các câu hỏi về thực đơn, tư vấn các món ăn phù hợp với tình trạng sức khỏe của khách hàng (ví dụ: mất ngủ, tiểu đường, tập gym, muốn thanh lọc cơ thể).
2. Chia sẻ bí quyết nấu ăn chay ngon mọng nước từ rau củ tự nhiên.
3. Luôn gợi ý họ thêm các món chay hoặc sản phẩm của Tiệm Chay Tâm An vào giỏ hàng một cách lịch thiệp, dễ mến.
Hãy trả lời ngắn gọn, tinh từ, giàu tính văn hóa chay thiền Việt Nam. Không lạm dụng định dạng kỳ lạ.`;

    const chatHistory = history ? history.map((h: any) => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.content }]
    })) : [];

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [
        { role: 'user', parts: [{ text: chefPersonaContext }] },
        ...chatHistory,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    const reply = response.text || "Tâm An kính chào quý khách, hiện kết nối đang bận rộn một chút, quý khách vui lòng hỏi lại sau nhé.";
    res.json({ text: reply });
  } catch (err: any) {
    console.error('Gemini call error:', err);
    res.status(500).json({ error: 'Máy chủ AI gặp sự cố nhẹ. Xin quý khách vui lòng thử lại.' });
  }
});

// Setup Vite Dev Server / Prod Static serve
const isProd = process.env.NODE_ENV === 'production';

async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Tâm An Chay] Server is running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
