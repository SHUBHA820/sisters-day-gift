import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Music, Unlock, Play, Pause, 
  SkipForward, SkipBack, Gift, ChevronRight, ChevronLeft, 
  Sparkles, Mail, Star 
} from 'lucide-react';

const styles = `
  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .bg-animated {
    background: linear-gradient(-45deg, #ff9a9e, #fecfef, #a1c4fd, #fbc2eb);
    background-size: 400% 400%;
    animation: gradientBG 15s ease infinite;
  }
  .glass-panel {
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.6);
  }
  .slide-enter { animation: slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  @keyframes slideIn {
    0% { opacity: 0; transform: scale(0.95) translateY(20px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  .flip-card { perspective: 1000px; cursor: pointer; }
  .flip-card-inner { position: relative; width: 100%; height: 100%; text-align: center; transition: transform 0.6s; transform-style: preserve-3d; }
  .flip-card.flipped .flip-card-inner { transform: rotateY(180deg); }
  .flip-card-front, .flip-card-back { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 1rem; }
  .flip-card-back { transform: rotateY(180deg); }
  .particle { position: absolute; pointer-events: none; animation: float-up linear infinite; }
  @keyframes float-up { 0% { transform: translateY(100vh); opacity: 0; } 100% { transform: translateY(-20vh); opacity: 0.5; } }
  .typewriter { overflow: hidden; white-space: pre-wrap; border-right: 2px solid #d81b60; animation: typing 3s steps(40, end); }
  .animate-float { animation: floatIllustration 4s ease-in-out infinite; }
  @keyframes floatIllustration { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
`;

export default function App() {
  const [step, setStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalSteps = 7;

  const goToStep = (newStep) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => { setStep(newStep); setIsTransitioning(false); }, 400);
  };

  return (
    <div className="min-h-screen bg-animated flex items-center justify-center p-4 text-slate-800 font-sans overflow-hidden">
      <style>{styles}</style>
      <div className="relative w-full max-w-md h-[800px] max-h-[90vh] glass-panel rounded-3xl flex flex-col shadow-2xl overflow-hidden z-10 border-white/40">
        <div className={`flex-1 overflow-y-auto p-6 flex flex-col ${isTransitioning ? 'opacity-0' : 'opacity-100 transition-opacity'}`}>
          {step === 0 && <ScreenUnlock onUnlock={() => goToStep(1)} />}
          {step === 1 && <ScreenWelcome />}
          {step === 2 && <ScreenGame />}
          {step === 3 && <ScreenLetter />}
          {step === 4 && <ScreenGallery />}
          {step === 5 && <ScreenMusic />}
          {step === 6 && <ScreenOutro />}
        </div>
        {step > 0 && (
          <div className="p-4 border-t border-white/30 flex justify-between items-center bg-white/20">
            <button onClick={() => goToStep(step - 1)} className="p-2 rounded-full"><ChevronLeft /></button>
            <div className="flex gap-2">{[...Array(6)].map((_, i) => <div key={i} className={`h-2 rounded-full ${step - 1 === i ? 'w-6 bg-pink-500' : 'w-2 bg-pink-300'}`} />)}</div>
            <button onClick={() => goToStep(step + 1)} className="p-2 rounded-full"><ChevronRight /></button>
          </div>
        )}
      </div>
    </div>
  );
}

const ScreenUnlock = ({ onUnlock }) => (
  <div className="flex-1 flex flex-col items-center justify-center text-center">
    <Unlock size={40} className="text-pink-600 mb-8 animate-pulse" />
    <h1 className="text-3xl font-bold mb-4">Heyy Sis!</h1>
    <button onClick={onUnlock} className="px-8 py-4 bg-pink-500 text-white rounded-full font-bold">Tap to Unlock</button>
  </div>
);

const ScreenWelcome = () => (
  <div className="flex-1 flex flex-col items-center justify-center text-center">
    <h1 className="text-5xl font-extrabold mb-4">Happy Sister's Day!</h1>
    <p className="text-gray-600 mb-8">You've always been my best friend. 💖</p>
  </div>
);

const ScreenGame = () => {
  const [cards, setCards] = useState([{id:1, flipped:false}, {id:2, flipped:false}]);
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-6">Find the Treats!</h2>
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card, idx) => (
          <div key={card.id} className={`flip-card w-24 h-24 ${card.flipped ? 'flipped' : ''}`} onClick={() => {
            const nc = [...cards]; nc[idx].flipped = true; setCards(nc);
          }}>
            <div className="flip-card-inner"><div className="flip-card-front bg-pink-200"/><div className="flip-card-back bg-pink-500"/></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ScreenLetter = () => (
  <div className="flex-1 flex flex-col justify-center bg-yellow-50 p-6 rounded-2xl shadow-inner">
    <h3 className="text-2xl font-bold mb-4">Dear Sis ❤️</h3>
    <p className="typewriter">You make my life brighter. May your day be as sweet as you are!</p>
  </div>
);

const ScreenGallery = () => {
 const photos = [
    { url: "/photos/IMG_20260315_194629_311.jpg", label: "Always smiling" },
    { url: "/photos/IMG_20260315_194642_0055.jpg", label: "Best Times" }
  ];
  const [current, setCurrent] = useState(0);
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <img src={photos[current].url} className="w-64 h-64 object-cover rounded-xl shadow-lg mb-4" />
      <div className="flex gap-4">
        <button onClick={() => setCurrent((c) => (c === 0 ? photos.length - 1 : c - 1))}><ChevronLeft /></button>
        <button onClick={() => setCurrent((c) => (c + 1) % photos.length)}><ChevronRight /></button>
      </div>
    </div>
  );
};

const ScreenMusic = () => {
  const audioRef = useRef(new Audio('/music/Vintunnavaa - SenSongssmp3.Co.mp3'));
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-8">Songs For You</h2>
      <button onClick={() => { isPlaying ? audioRef.current.pause() : audioRef.current.play(); setIsPlaying(!isPlaying); }} 
              className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center text-white">
        {isPlaying ? <Pause /> : <Play />}
      </button>
    </div>
  );
};

const ScreenOutro = () => (
  <div className="flex-1 flex flex-col items-center justify-center text-center">
    <Star size={60} className="text-yellow-400 mb-4" />
    <h1 className="text-4xl font-black mb-4">Thank You</h1>
    <p>For being the best sister ever.</p>
  </div>
);