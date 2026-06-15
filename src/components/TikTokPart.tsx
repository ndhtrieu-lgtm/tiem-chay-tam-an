import React from 'react';
import { TikTokVideo, FoodItem } from '../types';
import { Heart, MessageCircle, Share2, Volume2, VolumeX, Play, Pause, ShoppingBag, Music, ChevronUp, ChevronDown } from 'lucide-react';

interface TikTokPartProps {
  videos: TikTokVideo[];
  foodItems: FoodItem[];
  addToCart: (item: any, type: 'food' | 'shop') => void;
}

export default function TikTokPart({
  videos,
  foodItems,
  addToCart
}: TikTokPartProps) {
  const [currentVideoIdx, setCurrentVideoIdx] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);
  const [likedList, setLikedList] = React.useState<Record<string, boolean>>({});
  const [likesCount, setLikesCount] = React.useState<Record<string, number>>({});
  const [showCommentsModal, setShowCommentsModal] = React.useState(false);
  const videoRefs = React.useRef<Record<string, HTMLVideoElement | null>>({});

  const activeVideo = videos[currentVideoIdx];

  // comments database specific to TikTok
  const [tiktokComments, setTiktokComments] = React.useState<Record<string, { user: string; text: string; time: string }[]>>({
    'tok_1': [
      { user: 'phat_tu_tam_tinh', text: 'Thầy chỉ cách nấu bún riêu chay ngọt trong nữa đi ạ!', time: '12h trước' },
      { user: 'diu_hien_foodie', text: 'Nhìn nồi nước dùng hầm rễ ngưu bàng chất lượng quá, cuối tuần phải qua CS1 ăn thử.', time: '2 ngày trước' },
      { user: 'tuan_cooking', text: 'Bí quyết này chuẩn hầm áp suất nhỏ không trào bọt, mình làm thử ở nhà thơm dã man!', time: '5 ngày trước' }
    ],
    'tok_2': [
      { user: 'chay_la_lanh', text: 'Cái sốt chấm lạc béo ngon đỉnh của chóp, mình xay thêm tí mè đen cũng ngon cực.', time: '1 ngày trước' },
      { user: 'phuong_vy_designer', text: 'Thích nhất cải bắp tím và xoài cuốn giòn giòn ăn mùa hè mát lạnh bụng 🍃', time: '1 tuần trước' }
    ],
    'tok_3': [
      { user: 'an_nhien_song', text: 'Kho niêu đất đậu hũ non chiên này đưa cơm đỉnh thực sự.', time: '3h trước' },
      { user: 'chef_minh', text: 'Một chút hành boa rô áp chảo dầu điều làm nổi bật màu sắc, tuyệt hảo.', time: '4 ngày trước' }
    ]
  });

  const [newCommentInput, setNewCommentInput] = React.useState('');

  const handlePlayPause = () => {
    const videoEl = videoRefs.current[activeVideo.id];
    if (videoEl) {
      if (isPlaying) {
        videoEl.pause();
        setIsPlaying(false);
      } else {
        videoEl.play().catch(e => console.log('Autoplay blocked initially', e));
        setIsPlaying(true);
      }
    }
  };

  React.useEffect(() => {
    // Reset play state and play the active video on transition
    setIsPlaying(false);
    // Pause other videos
    (Object.values(videoRefs.current) as (HTMLVideoElement | null)[]).forEach(video => {
      if (video) video.pause();
    });
  }, [currentVideoIdx]);

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    (Object.values(videoRefs.current) as (HTMLVideoElement | null)[]).forEach(video => {
      if (video) video.muted = !isMuted;
    });
  };

  const handleLikeToggle = (videoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedList(prev => ({ ...prev, [videoId]: !prev[videoId] }));
    setLikesCount(prev => ({
      ...prev,
      [videoId]: prev[videoId] 
        ? prev[videoId] + (likedList[videoId] ? -1 : 1)
        : (likedList[videoId] ? -1 : 1)
    }));
  };

  const handleAddTikTokComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentInput.trim()) return;

    const newComment = {
      user: 'an_danh_taman',
      text: newCommentInput,
      time: 'Vừa xong'
    };

    setTiktokComments(prev => ({
      ...prev,
      [activeVideo.id]: [newComment, ...(prev[activeVideo.id] || [])]
    }));
    setNewCommentInput('');
  };

  // Find linked physical plate product
  const linkedDish = foodItems.find(item => item.id === activeVideo.recipeAssociated);

  return (
    <div className="space-y-8 pb-20 max-w-lg mx-auto px-4">
      
      {/* Intro strip */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">TIKTOK LƯU LƯỢNG CAO</span>
        <h1 className="font-serif text-2xl font-bold text-white">Cẩm Nang Video Tâm An</h1>
        <p className="text-[11px] text-gray-400 leading-relaxed">
          Xem các thước phim ngắn chia sẻ công thức chuẩn hữu cơ của các chuyên gia. Vuốt lên/xuống để đổi thước phim.
        </p>
      </div>

      {/* Vertical Container Resembling TikTok view */}
      <div className="relative rounded-3xl overflow-hidden bg-black aspect-[9/16] border border-emerald-950/80 shadow-2xl shadow-emerald-950/20 max-w-[360px] mx-auto group">
        
        {/* Video stream rendering */}
        <div className="w-full h-full relative cursor-pointer" onClick={handlePlayPause}>
          <video
            ref={el => { videoRefs.current[activeVideo.id] = el; }}
            src={activeVideo.videoUrl}
            loop
            muted={isMuted}
            preload="auto"
            playsInline
            poster={activeVideo.coverImage}
            className="w-full h-full object-cover"
          />

          {/* Centered Play Button when paused */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-emerald-600/90 text-white animate-pulse">
                <Play className="h-8 w-8 fill-white ml-1" />
              </div>
            </div>
          )}

          {/* Mute toggle button */}
          <button
            onClick={handleMuteToggle}
            className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white border border-emerald-900/40 rounded-full p-2.5 z-10 transition"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>

          {/* Vertical Reels navigation controls (UP / DOWN arrows) */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10 opacity-0 group-hover:opacity-100 transition duration-300">
            <button
              disabled={currentVideoIdx === 0}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentVideoIdx(prev => prev - 1);
              }}
              className="bg-black/65 text-emerald-400 p-2 rounded-full border border-emerald-900/40 hover:text-white disabled:opacity-40 transition"
              title="Thước phim trước"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
            <button
              disabled={currentVideoIdx === videos.length - 1}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentVideoIdx(prev => prev + 1);
              }}
              className="bg-black/65 text-emerald-400 p-2 rounded-full border border-emerald-900/40 hover:text-white disabled:opacity-40 transition"
              title="Thước phim tiếp theo"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {/* Left bottom Overlay text Info details */}
          <div className="absolute bottom-16 left-4 right-16 text-xs text-white drop-shadow space-y-2 select-none pointer-events-none">
            <strong className="text-emerald-400 font-sans tracking-wide">@{activeVideo.author}</strong>
            <p className="line-clamp-2 text-gray-200 text-[11px] leading-relaxed">
              {activeVideo.title}
            </p>
            <div className="flex items-center gap-1.5 text-gray-300 text-[10px]">
              <Music className="h-3 w-3 text-[#eab308] shrink-0 animate-spin" />
              <div className="w-full truncate font-mono">{activeVideo.music}</div>
            </div>
          </div>

          {/* Bottom Linked Item fast Add banner if exists */}
          {linkedDish && (
            <div className="absolute bottom-3 left-3 right-3 bg-[#070c09]/95 border border-emerald-500/30 p-2.5 rounded-xl z-10 flex items-center justify-between shadow-lg pointer-events-auto">
              <div className="flex items-center gap-2">
                <img
                  src={linkedDish.image}
                  alt={linkedDish.name}
                  loading="lazy"
                  decoding="async"
                  className="w-10 h-10 rounded-lg object-cover shrink-0 border border-emerald-800/40"
                />
                <div className="text-left">
                  <span className="block font-semibold text-[11px] text-white truncate max-w-[120px]">{linkedDish.name}</span>
                  <span className="block text-[#eab308] font-serif text-[11.5px] font-bold">{linkedDish.price.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(linkedDish, 'food');
                  alert(`Đã thêm món "${linkedDish.name}" từ Video nấu ăn vào giỏ của bạn.`);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold bg-[#eab308] hover:bg-amber-300 text-black rounded-lg transition"
              >
                <ShoppingBag className="h-3 w-3 shrink-0" />
                Dùng Thử Món
              </button>
            </div>
          )}

          {/* Right Floating Actions Column (TikTok lookalike layout) */}
          <div className="absolute right-3 bottom-20 flex flex-col items-center gap-5 z-10 select-none">
            
            {/* User channel avatar overlay */}
            <div className="relative border border-amber-400/50 rounded-full bg-emerald-950 p-0.5">
              <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center font-serif font-bold text-xs text-white">
                TA
              </div>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-600 rounded-full h-3.5 w-3.5 flex items-center justify-center text-[8px] text-white font-extrabold">+</span>
            </div>

            {/* Heart Like action */}
            <button
              onClick={(e) => handleLikeToggle(activeVideo.id, e)}
              className="flex flex-col items-center gap-1 group/like pointer-events-auto"
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-[1px] hover:scale-105 transition">
                <Heart className={`h-5 w-5 transition ${likedList[activeVideo.id] ? 'fill-red-650 text-red-500 scale-110' : 'text-white'}`} />
              </div>
              <span className="text-[10px] font-mono text-gray-200">
                {(activeVideo.likes + (likesCount[activeVideo.id] || 0)).toLocaleString()}
              </span>
            </button>

            {/* Message comment trigger */}
            <button
              onClick={(e) => { e.stopPropagation(); setShowCommentsModal(true); }}
              className="flex flex-col items-center gap-1 pointer-events-auto"
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-[1px] hover:scale-105 transition">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <span className="text-[10px] font-mono text-gray-200">
                {(tiktokComments[activeVideo.id] || []).length}
              </span>
            </button>

            {/* Share link mock */}
            <button
              onClick={(e) => { e.stopPropagation(); alert('Đã sao chép liên kết video TikTok Tâm An lên bộ nhớ đệm!'); }}
              className="flex flex-col items-center gap-1 pointer-events-auto"
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-[1px] hover:scale-105 transition">
                <Share2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-[10px] font-mono text-gray-200">
                {activeVideo.shares}
              </span>
            </button>

          </div>

        </div>
      </div>

      {/* 2. OVERLAY TIKTOK COMMENTS PANEL */}
      {showCommentsModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-[1px] px-2 py-4">
          <div className="w-full max-w-sm bg-[#080d0a] border border-emerald-950 rounded-t-2xl px-4 py-5 flex flex-col h-[60vh]">
            
            {/* Header commented list */}
            <div className="flex items-center justify-between pb-3 border-b border-emerald-950/50">
              <span className="text-xs font-bold text-gray-350">Ý Kiến Đọc Giả ({(tiktokComments[activeVideo.id] || []).length})</span>
              <button 
                onClick={() => setShowCommentsModal(false)}
                className="text-xs text-gray-400 hover:text-white"
              >
                ✕ Đóng
              </button>
            </div>

            {/* Scrollable commentators list */}
            <div className="flex-1 overflow-y-auto space-y-3.5 py-4">
              {(tiktokComments[activeVideo.id] || []).map((comm, idx) => (
                <div key={idx} className="text-xs space-y-1">
                  <div className="flex items-center justify-between text-gray-500 text-[10px]">
                    <span className="font-semibold text-emerald-400">@{comm.user}</span>
                    <span>{comm.time}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed bg-emerald-950/15 p-2 rounded-lg border border-emerald-950/30">{comm.text}</p>
                </div>
              ))}
            </div>

            {/* Submit quick comment in bottom drawer overlay */}
            <form onSubmit={handleAddTikTokComment} className="flex gap-2 border-t border-emerald-950/50 pt-3">
              <input
                type="text"
                required
                value={newCommentInput}
                onChange={(e) => setNewCommentInput(e.target.value)}
                placeholder="Thêm bình luận tịnh tâm..."
                className="flex-1 rounded-xl bg-black border border-emerald-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-2 rounded-xl text-xs"
              >
                Gửi
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
