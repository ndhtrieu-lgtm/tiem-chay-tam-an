import React from 'react';
import { BlogPost } from '../types';
import { Calendar, User, Clock, ChevronLeft, Heart, MessageCircle, Send, BookOpen } from 'lucide-react';

interface BlogPartProps {
  blogPosts: BlogPost[];
}

export default function BlogPart({ blogPosts }: BlogPartProps) {
  const [selectedPost, setSelectedPost] = React.useState<BlogPost | null>(null);
  const [activeTag, setActiveTag] = React.useState<string>('all');
  const [likes, setLikes] = React.useState<Record<string, number>>({});
  const [comments, setComments] = React.useState<Record<string, { author: string; content: string; date: string }[]>>({
    'blog_1': [
      { author: 'Chị Thanh Lam', content: 'Bài viết rất bổ ích, nhờ nêm nếm theo rễ ngưu bàng mà con tôi ăn phở chay khen hết lời.', date: '3 ngày trước' },
      { author: 'Lâm Hoàng', content: 'Cụ rất khoa học và dễ thực hành, cảm khích sư phụ!', date: 'Hôm qua' }
    ]
  });
  const [newCommentName, setNewCommentName] = React.useState('');
  const [newCommentText, setNewCommentText] = React.useState('');

  const allTags = ['all', ...Array.from(new Set(blogPosts.flatMap(post => post.tags)))];

  const filteredPosts = activeTag === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.tags.includes(activeTag));

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleCommentSubmit = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    const newComment = {
      author: newCommentName,
      content: newCommentText,
      date: 'Vừa xong'
    };

    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment]
    }));

    setNewCommentName('');
    setNewCommentText('');
  };

  return (
    <div className="space-y-12 pb-20">
      
      {/* 1. BLOG DETAILED DISPLAY VIEW */}
      {selectedPost ? (
        <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8 fade-in-up">
          {/* Back Action button */}
          <button
            onClick={() => setSelectedPost(null)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-amber-400 transition"
          >
            <ChevronLeft className="h-4 w-4" /> Quay Lại Danh Mục
          </button>

          {/* Title block */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {selectedPost.tags.map((tag, k) => (
                <span key={k} className="bg-emerald-950/60 text-emerald-400 border border-emerald-500/20 text-[10px] uppercase font-bold px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight text-white">
              {selectedPost.title}
            </h1>

            {/* Author dates meta */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-gray-400 border-b border-emerald-950/50 pb-6 pt-2">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-emerald-400" />
                {selectedPost.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-emerald-400" />
                {selectedPost.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#eab308]" />
                {selectedPost.readTime}
              </span>
            </div>

            {/* Feature Hero Image */}
            <div className="rounded-2xl overflow-hidden h-[300px] sm:h-[450px]">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Text - Rich formatted paragraphs */}
            <div className="pt-8 text-gray-300 leading-relaxed text-sm sm:text-base space-y-6 font-sans">
              {selectedPost.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('###')) {
                  return (
                    <h3 key={index} className="font-serif text-xl sm:text-2xl font-bold text-emerald-400 pt-4">
                      {paragraph.replace('###', '').trim()}
                    </h3>
                  );
                }
                if (paragraph.startsWith('-')) {
                  return (
                    <ul key={index} className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-gray-300">
                      {paragraph.split('\n').map((line, k) => (
                        <li key={k}>{line.replace('-', '').trim()}</li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.startsWith('1.') || paragraph.startsWith('2.') || paragraph.startsWith('3.')) {
                  return (
                    <div key={index} className="space-y-2 text-xs sm:text-sm pl-2 border-l-2 border-amber-400/50">
                      {paragraph.split('\n').map((line, k) => (
                        <p key={k} className="leading-relaxed">{line}</p>
                      ))}
                    </div>
                  );
                }
                return <p key={index} className="leading-relaxed">{paragraph}</p>;
              })}
            </div>

            {/* Simulated interactive feedback panel (Like / Share Counter) */}
            <div className="flex items-center gap-6 pt-6 border-y border-emerald-950/40 py-4">
              <button
                onClick={(e) => handleLike(selectedPost.id, e)}
                className="flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-red-400 transition"
              >
                <Heart className={`h-5 w-5 ${likes[selectedPost.id] ? 'fill-red-500 text-red-500' : ''}`} />
                <span>Yêu thích ({182 + (likes[selectedPost.id] || 0)})</span>
              </button>
              <div className="text-xs text-gray-500 font-mono">
                Thành phần bài viết được bảo hộ chuẩn SEO quốc gia
              </div>
            </div>

            {/* Simulated comments section */}
            <div className="space-y-6 pt-8">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-emerald-400" />
                Bình Luận Đọc Giả ({ (comments[selectedPost.id] || []).length })
              </h3>

              <div className="space-y-4">
                {(comments[selectedPost.id] || []).map((comm, k) => (
                  <div key={k} className="bg-emerald-950/20 border border-emerald-500/10 p-4 rounded-xl space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <strong className="text-emerald-400">{comm.author}</strong>
                      <span className="text-gray-500 font-mono text-[10px]">{comm.date}</span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">{comm.content}</p>
                  </div>
                ))}
                {(comments[selectedPost.id] || []).length === 0 && (
                  <p className="text-xs text-gray-400">Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ cảm nhận nhé!</p>
                )}
              </div>

              {/* Submit a comment form */}
              <form onSubmit={(e) => handleCommentSubmit(selectedPost.id, e)} className="glass-panel p-5 rounded-xl border border-emerald-500/15 space-y-4">
                <span className="text-xs font-semibold text-white block">Gửi bình luận của bạn</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Tên của bạn..."
                    value={newCommentName}
                    onChange={(e) => setNewCommentName(e.target.value)}
                    className="sm:col-span-1 rounded-xl bg-[#070c09] border border-emerald-950 px-3 py-2 text-xs text-white placeholder-gray-500 focus:border-[#eab308] focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Cảm nhận của bạn về bí quyết nấu chay..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    className="sm:col-span-2 rounded-xl bg-[#070c09] border border-emerald-950 px-3 py-2 text-xs text-white placeholder-gray-500 focus:border-[#eab308] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-5 rounded-lg text-xs transition cursor-pointer"
                >
                  <Send className="h-3 w-3" /> Gửi phản hồi
                </button>
              </form>
            </div>

          </div>
        </article>
      ) : (
        /* 2. BLOG LISTING VIEW */
        <div className="space-y-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <section className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">CẨM NANG DINH DƯỠNG VEGAN</span>
            <h1 className="font-serif text-3xl font-bold text-white sm:text-5xl">Góc Sức Khỏe & An Nhiên</h1>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Những bài viết học thuật, kinh nghiệm nấu bếp chay thơm ngọt chuẩn Đông y dưỡng sinh từ đội ngũ cố vấn sức khỏe của Tiệm Chay Tâm An.
            </p>

            {/* Tag filtering pills */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs transition capitalize cursor-pointer ${
                    activeTag === tag
                      ? 'bg-amber-400 text-black'
                      : 'bg-emerald-950/40 text-gray-400 border border-emerald-500/10 hover:text-white'
                  }`}
                >
                  {tag === 'all' ? 'Tất cả chủ đề' : tag}
                </button>
              ))}
            </div>
          </section>

          {/* Blogs list grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="glass-panel rounded-2xl overflow-hidden border border-emerald-500/10 hover:border-emerald-500/25 transition duration-300 flex flex-col cursor-pointer group"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-48 bg-[#0c1410] shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-[1px] text-[10px] text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                    👁️ {post.readTime}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5 animate-pulse-once">
                    <span className="text-[9px] font-bold text-[#eab308] tracking-widest uppercase">
                      {post.tags[0]}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#f1f5f1] group-hover:text-emerald-400 transition leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>

                  {/* Meta bottom */}
                  <div className="pt-3 border-t border-emerald-950/40 flex items-center justify-between text-[11px] text-gray-500">
                    <span className="flex items-center gap-1 font-medium">
                      <User className="h-3 w-3 text-emerald-400" /> {post.author}
                    </span>
                    <span className="font-mono">{post.date}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
