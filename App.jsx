import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Wallet, Coins, Video, Radio, PlusCircle, Gift, User, X } from 'lucide-react';

export default function TikTokApp() {
  // --- الحالات العامة (Global State) ---
  const [activeTab, setActiveTab] = useState('feed'); // feed, live, wallet
  const [userCoins, setUserCoins] = useState(120);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // بيانات افتراضية للفيديوهات
  const [videos, setVideos] = useState([
    {
      id: 1,
      user: 'ahmed_dev',
      desc: 'بناء تطبيق تيك توك باستخدام React 🚀 #programming #react',
      song: 'الصوت الأصلي - أحمد',
      likes: 1240,
      comments: 89,
      liked: false,
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-vertical-shot-of-a-woman-with-a-laptop-40932-large.mp4'
    },
    {
      id: 2,
      user: 'sara_vlogs',
      desc: 'جولة في شوارع المدينة اليوم ☕✨',
      song: 'موسيقى هادئة - سارة',
      likes: 3500,
      comments: 210,
      liked: false,
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-vertical-shot-of-a-city-at-night-40936-large.mp4'
    }
  ]);

  // قائمة الهدايا المتاحة
  const gifts = [
    { name: 'وردة 🌹', price: 10 },
    { name: 'قهوة ☕', price: 50 },
    { name: 'سيارة 🏎️', price: 200 },
    { name: 'أسد 🦁', price: 500 }
  ];

  // --- التفاعلات (Handlers) ---
  const handleLike = (id) => {
    setVideos(videos.map(v => {
      if (v.id === id) {
        return {
          ...v,
          liked: !v.liked,
          likes: v.liked ? v.likes - 1 : v.likes + 1
        };
      }
      return v;
    }));
  };

  const handleSendGift = (gift) => {
    if (userCoins < gift.price) {
      alert('رصيدك غير كافٍ! قم بشحن العملات أولاً.');
      return;
    }
    setUserCoins(prev => prev - gift.price);
    alert(`تم إرسال ${gift.name} بنجاح! 🎁`);
  };

  const handleRecharge = (amount) => {
    setUserCoins(prev => prev + amount);
    alert(`تم شحن ${amount} عملة بنجاح!`);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-neutral-900 text-white font-sans dir-rtl">
      {/* إطار الهاتف المحمول */}
      <div className="relative w-full max-w-[400px] h-[100vh] sm:h-[840px] bg-black sm:rounded-3xl overflow-hidden border border-neutral-800 flex flex-col shadow-2xl">
        
        {/* الشريط العلوي */}
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-4 bg-gradient-to-b from-black/80 to-transparent">
          <button onClick={() => setActiveTab('wallet')} className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs font-bold text-yellow-400">
            <Coins size={14} />
            <span>{userCoins}</span>
          </button>
          
          <div className="flex gap-4 text-sm font-bold">
            <button onClick={() => setActiveTab('live')} className={`${activeTab === 'live' ? 'text-white border-b-2 border-red-500' : 'text-gray-400'} pb-1`}>بث مباشر</button>
            <button onClick={() => setActiveTab('feed')} className={`${activeTab === 'feed' ? 'text-white border-b-2 border-red-500' : 'text-gray-400'} pb-1`}>لك</button>
          </div>

          <button onClick={() => setShowUploadModal(true)} className="text-white hover:text-red-500 transition">
            <PlusCircle size={22} />
          </button>
        </div>

        {/* --- 1. واجهة الفيديوهات (Feed) --- */}
        {activeTab === 'feed' && (
          <div className="flex-1 overflow-y-scroll snap-y snap-mandatory scrollbar-none relative">
            {videos.map((vid) => (
              <div key={vid.id} className="relative w-full h-full snap-start flex items-center justify-center bg-black">
                <video src={vid.videoUrl} className="w-full h-full object-cover" loop autoPlay muted playsInline />
                
                {/* التفاصيل السفلية */}
                <div className="absolute bottom-16 right-4 left-16 z-10 text-right">
                  <h4 className="font-bold text-base mb-1">@{vid.user}</h4>
                  <p className="text-xs text-gray-200 mb-2">{vid.desc}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1">🎵 {vid.song}</p>
                </div>

                {/* الشريط الجانبي للتفاعل */}
                <div className="absolute bottom-20 left-3 z-10 flex flex-col items-center gap-5">
                  <button onClick={() => handleLike(vid.id)} className="flex flex-col items-center">
                    <div className="p-2.5 bg-black/40 backdrop-blur-md rounded-full">
                      <Heart size={26} className={vid.liked ? "fill-red-500 text-red-500" : "text-white"} />
                    </div>
                    <span className="text-xs font-bold mt-1">{vid.likes}</span>
                  </button>

                  <div className="flex flex-col items-center">
                    <div className="p-2.5 bg-black/40 backdrop-blur-md rounded-full">
                      <MessageCircle size={26} />
                    </div>
                    <span className="text-xs font-bold mt-1">{vid.comments}</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="p-2.5 bg-black/40 backdrop-blur-md rounded-full">
                      <Share2 size={26} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- 2. واجهة البث المباشر (LIVE) --- */}
        {activeTab === 'live' && (
          <div className="relative flex-1 bg-neutral-950 flex flex-col justify-between p-4 pt-16">
            <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=500)' }}></div>
            
            <div className="relative z-10 flex justify-between items-center bg-black/50 p-2 rounded-xl backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center font-bold">LIVE</div>
                <div>
                  <p className="text-xs font-bold">بث مباشر - علي</p>
                  <p className="text-[10px] text-gray-300">👁️ 1.2k مشاهد</p>
                </div>
              </div>
            </div>

            {/* منطقة الشات والهدايا */}
            <div className="relative z-10 flex flex-col gap-3">
              <div className="h-32 overflow-y-auto flex flex-col gap-1 text-xs text-right pr-2">
                <p className="bg-black/30 p-1.5 rounded w-fit"><span className="text-yellow-400 font-bold">محمد:</span> منور البث يا بطل! 🔥</p>
                <p className="bg-black/30 p-1.5 rounded w-fit"><span className="text-pink-400 font-bold">سارة:</span> بالتوفيق 🙏</p>
              </div>

              {/* قسم إرسال الهدايا */}
              <div className="bg-black/70 p-3 rounded-2xl backdrop-blur-md border border-white/10">
                <p className="text-xs text-gray-300 mb-2 text-right font-bold flex items-center gap-1">
                  <Gift size={14} className="text-pink-500" /> إرسال هدية للمستضيف:
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {gifts.map((g, idx) => (
                    <button key={idx} onClick={() => handleSendGift(g)} className="flex flex-col items-center bg-white/5 hover:bg-white/10 p-2 rounded-xl border border-white/5 transition">
                      <span className="text-lg">{g.name.split(' ')[1]}</span>
                      <span className="text-[10px] font-bold mt-1 text-yellow-400">{g.price} 🪙</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- 3. واجهة المحفظة للشحن (Wallet) --- */}
        {activeTab === 'wallet' && (
          <div className="flex-1 bg-neutral-900 p-6 pt-20 text-right overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 justify-end text-yellow-400">
              <span>محفظة العملات</span>
              <Wallet />
            </h2>
            
            <div className="bg-neutral-800 p-4 rounded-2xl border border-neutral-700 mb-6 text-center">
              <p className="text-gray-400 text-xs">الرصيد الحالي</p>
              <p className="text-3xl font-extrabold text-yellow-400 mt-1 flex items-center justify-center gap-2">
                <Coins size={28} />
                {userCoins}
              </p>
            </div>

            <h3 className="font-bold text-sm mb-3">اختر باقة الشحن:</h3>
            <div className="flex flex-col gap-3">
              {[
                { coins: 100, price: '$0.99' },
                { coins: 500, price: '$4.99' },
                { coins: 1200, price: '$9.99' },
                { coins: 3000, price: '$24.99' },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-neutral-800 p-3.5 rounded-xl border border-neutral-700">
                  <span className="bg-red-600 hover:bg-red-700 text-xs font-bold px-4 py-2 rounded-lg cursor-pointer transition" onClick={() => handleRecharge(item.coins)}>
                    شراء {item.price}
                  </span>
                  <div className="flex items-center gap-1.5 font-bold text-sm">
                    <span>{item.coins} عملة</span>
                    <Coins size={16} className="text-yellow-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* النافذة المنبثقة لرفع فيديو (Upload Modal) */}
        {showUploadModal && (
          <div className="absolute inset-0 z-50 bg-black/90 flex flex-col justify-center items-center p-6 text-center">
            <button onClick={() => setShowUploadModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X size={24} />
            </button>
            <Video size={48} className="text-red-500 mb-3" />
            <h3 className="font-bold text-lg mb-2">رفع فيديو جديد</h3>
            <p className="text-xs text-gray-400 mb-4">اختر ملف فيديو قصير من جهازك</p>
            <input type="file" accept="video/*" className="text-xs text-gray-400 mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700" />
            <button onClick={() => { setShowUploadModal(false); alert('تم رفع الفيديو بنجاح!'); }} className="w-full bg-red-600 py-2.5 rounded-xl text-sm font-bold mt-2">
              نشر الآن
            </button>
          </div>
        )}

        {/* شريط التنقل السفلي (Bottom Navigation) */}
        <div className="h-14 bg-black border-t border-neutral-800 flex justify-around items-center px-2 z-20">
          <button onClick={() => setActiveTab('feed')} className={`flex flex-col items-center text-[10px] ${activeTab === 'feed' ? 'text-white' : 'text-gray-500'}`}>
            <Video size={20} />
            <span>الرئيسية</span>
          </button>
          <button onClick={() => setActiveTab('live')} className={`flex flex-col items-center text-[10px] ${activeTab === 'live' ? 'text-red-500' : 'text-gray-500'}`}>
            <Radio size={20} />
            <span>بث مباشر</span>
          </button>
          <button onClick={() => setActiveTab('wallet')} className={`flex flex-col items-center text-[10px] ${activeTab === 'wallet' ? 'text-yellow-400' : 'text-gray-500'}`}>
            <Wallet size={20} />
            <span>المحفظة</span>
          </button>
        </div>

      </div>
    </div>
  );
}
