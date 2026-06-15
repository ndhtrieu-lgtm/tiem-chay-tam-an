import React from 'react';
import { MessageSquare, Send, Sparkles, X, ChevronRight, Minimize2, Trash2 } from 'lucide-react';

interface ChefAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function ChefAssistant({
  isOpen,
  onClose,
  onOpen
}: ChefAssistantProps) {
  const [messages, setMessages] = React.useState<Array<{ role: 'user' | 'chef'; content: string }>>([
    { role: 'chef', content: 'Kính chào quý khách! Con là Trợ lý thảo mộc kiêm Đầu bếp Tâm An. Quý khách cần khơi nguồn sức khỏe, làm mát tỳ vị hay tìm món ăn an giấc nồng hôm nay ạ?' }
  ]);
  const [userInput, setUserInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const chatBottomRef = React.useRef<HTMLDivElement | null>(null);

  const samplePrompts = [
    { text: 'Mất ngủ nên ăn món gì?', desc: 'Tư vấn an thần ngủ ngon' },
    { text: 'Bí quyết nước dùng ngọt trong veo?', desc: 'Bếp trưởng mách nước' },
    { text: 'Tập gym ăn gì giàu đạm?', desc: 'Công thức bổ sung cơ bắp' }
  ];

  const scrollChatToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    if (isOpen) {
      scrollChatToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Append user message
    const updatedMessages = [...messages, { role: 'user' as const, content: textToSend }];
    setMessages(updatedMessages);
    setUserInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'chef', content: data.text }]);
      } else {
        setMessages(prev => [...prev, { role: 'chef', content: data.error || 'Tâm An đang bận chuẩn bị gia vị lẩu nấm một chút, quý khách hỏi lại sau nhé.' }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'chef', content: 'Kết nối mạng yếu, Tâm An chúc quý khách vạn sự kiết tường. Xin vui lòng thử lại.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      { role: 'chef', content: 'Đã thiết lập lại trạng thái ban đầu. Hãy cùng Tâm An đàm đạo về thế giới ẩm thực thuần thực vật hữu cơ nào.' }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* 1. MINIMIZED FLOATING BUBBLE ACCENT */}
      {!isOpen && (
        <button
          onClick={onOpen}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl hover:bg-emerald-500 hover:scale-105 border border-emerald-400/30 transition relative group animate-bounce cursor-pointer"
        >
          <MessageSquare className="h-6 w-6 stroke-[2]" />
          <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[9px] font-extrabold text-[#070c09] tracking-tighter">
            AI
          </span>
          {/* hovering label */}
          <span className="absolute right-16 scale-0 bg-emerald-950 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap group-hover:scale-100 transition duration-250 opacity-90">
            Hỏi Đầu Bếp AI 🌿
          </span>
        </button>
      )}

      {/* 2. EXPANDED BEAUTIFUL CONSOLE CHAT PANEL */}
      {isOpen && (
        <div 
          className="w-[320px] sm:w-[380px] h-[480px] rounded-2xl bg-[#080d0a] border border-emerald-500/20 overflow-hidden shadow-2xl glass-panel flex flex-col justify-between fade-in-up"
          id="chef-chatbot-box"
        >
          {/* Chat Header */}
          <div className="bg-emerald-950/50 px-4 py-3.5 border-b border-emerald-950 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center border border-emerald-400/20">
                <Sparkles className="h-4 w-4 text-amber-400 animate-spin" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-white">Đầu Bếp AI Tâm An</h4>
                <span className="text-[9.5px] text-emerald-400 font-semibold uppercase tracking-wider block">Trực tuyến 24/7 • Gemini 3.5</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearHistory}
                className="text-gray-500 hover:text-red-400 transition"
                title="Xóa lịch sử hội thoại"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition"
              >
                <Minimize2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Chat History Panel */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans bg-black/20 scrollbar-none">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* avatar thumbnail */}
                {msg.role === 'chef' && (
                  <div className="h-6 w-6 rounded-full bg-emerald-900 border border-emerald-500/30 flex items-center justify-center font-serif text-[10px] font-bold text-emerald-400 shrink-0">
                    TA
                  </div>
                )}
                
                <div 
                  className={`p-3 rounded-2xl text-[11.5px] leading-relaxed max-w-[80%] ${
                    msg.role === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none'
                      : 'bg-emerald-950/45 text-gray-200 border border-emerald-900/40 rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* AI thinking state indicator */}
            {isTyping && (
              <div className="flex gap-2.5">
                <div className="h-6 w-6 rounded-full bg-emerald-905 border border-emerald-500/20 flex items-center justify-center font-serif text-[10px] font-bold text-emerald-400 shrink-0">
                  TA
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-900/30 rounded-bl-none">
                  <div className="flex gap-1 items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce" />
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce delay-100" />
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}

            {/* anchor to keep screen scrolled down */}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick clickable samples triggers (Only if messages is 1 or empty) */}
          {messages.length === 1 && (
            <div className="px-4 py-2 bg-emerald-950/15 border-t border-emerald-950 flex flex-col gap-1.5">
              <span className="text-[9.5px] font-bold text-[#eab308] uppercase tracking-wider">CHỌN NHANH CHỦ ĐỀ TÌM KIẾM</span>
              <div className="flex flex-col gap-1">
                {samplePrompts.map((p, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(p.text)}
                    className="w-full text-left px-2.5 py-1.5 bg-emerald-950/50 hover:bg-emerald-900/40 border border-emerald-500/10 rounded-lg text-[10px] text-gray-350 flex items-center justify-between transition cursor-pointer"
                  >
                    <span>{p.desc}</span>
                    <ChevronRight className="h-3.5 w-3.5 text-[#eab308]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Typing form footer inputs */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(userInput); }} 
            className="p-3 border-t border-emerald-950/60 bg-emerald-950/20 flex gap-2"
          >
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Hỏi về nấm thảo dược, thanh độc tố..."
              className="flex-1 rounded-xl bg-black border border-emerald-950/80 px-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-0"
            />
            <button
              type="submit"
              className="h-9 w-9 shrink-0 flex items-center justify-center bg-amber-400 hover:bg-amber-300 text-[#070c09] rounded-xl transition cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
