import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Music, Unlock, Play, Pause, 
  SkipForward, SkipBack, Gift, ChevronRight, ChevronLeft, 
  Sparkles, Mail, Star 
} from 'lucide-react';

// --- CUSTOM CSS FOR ADVANCED ANIMATIONS ---
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
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  }

  .slide-enter { animation: slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  
  @keyframes slideIn {
    0% { opacity: 0; transform: scale(0.95) translateY(20px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }

  /* 3D Flip Card */
  .flip-card {
    perspective: 1000px;
    cursor: pointer;
  }
  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
    transform-style: preserve-3d;
  }
  .flip-card.flipped .flip-card-inner { transform: rotateY(180deg); }
  .flip-card-front, .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 1rem;
  }
  .flip-card-back { transform: rotateY(180deg); }

  /* Floating Particles */
  @keyframes float-up {
    0% { transform: translateY(100vh) scale(0.5) rotate(0deg); opacity: 0; }
    20% { opacity: 0.6; }
    80% { opacity: 0.6; }
    100% { transform: translateY(-20vh) scale(1.2) rotate(360deg); opacity: 0; }
  }
  .particle {
    position: absolute;
    pointer-events: none;
    animation: float-up linear infinite;
    z-index: 0;
  }

  /* Typewriter */
  .typewriter {
    overflow: hidden;
    white-space: pre-wrap;
    border-right: 2px solid #d81b60;
    animation: typing 3s steps(40, end), blink-caret .75s step-end infinite;
  }
  @keyframes blink-caret { from, to { border-color: transparent } 50% { border-color: #d81b60; } }

  /* Audio Visualizer */
  @keyframes bounceBar {
    0%, 100% { transform: scaleY(0.3); }
    50% { transform: scaleY(1); }
  }
  .bar { animation: bounceBar 1s ease-in-out infinite; transform-origin: bottom; }

  /* Cute Floating Illustration */
  @keyframes floatIllustration {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(3deg); }
  }
  .animate-float { animation: floatIllustration 4s ease-in-out infinite; }
`;

// --- MAIN APP COMPONENT ---
export default function App() {
  const [step, setStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalSteps = 7;

  // Handles smooth transitions between pages
  const goToStep = (newStep) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(newStep);
      setIsTransitioning(false);
    }, 400); // Wait for exit animation
  };

  const nextStep = () => step < totalSteps - 1 && goToStep(step + 1);
  const prevStep = () => step > 0 && goToStep(step - 1);

  // Background Particles Component
  const Particles = () => {
    const hearts = Array.from({ length: 15 });
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {hearts.map((_, i) => (
          <div 
            key={i} 
            className="particle text-pink-300 opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 20 + 10}px`
            }}
          >
            <Heart fill="currentColor" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-animated flex items-center justify-center p-4 sm:p-8 text-slate-800 font-sans overflow-hidden">
      <style>{styles}</style>
      <Particles />

      {/* Main App Container */}
      <div className="relative w-full max-w-md h-[800px] max-h-[90vh] glass-panel rounded-3xl flex flex-col shadow-2xl overflow-hidden z-10 border-white/40">
        
        {/* Dynamic Content Rendering */}
        <div className={`flex-1 overflow-y-auto overflow-x-hidden p-6 flex flex-col relative transition-opacity duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100 slide-enter'}`}>
          
          {step === 0 && <ScreenUnlock onUnlock={nextStep} />}
          {step === 1 && <ScreenWelcome />}
          {step === 2 && <ScreenGame />}
          {step === 3 && <ScreenLetter />}
          {step === 4 && <ScreenGallery />}
          {step === 5 && <ScreenMusic />}
          {step === 6 && <ScreenOutro />}

        </div>

        {/* Navigation Bar (Hidden on first screen) */}
        {step > 0 && (
          <div className="p-4 border-t border-white/30 flex justify-between items-center bg-white/20 backdrop-blur-md">
            <button 
              onClick={prevStep} 
              className={`p-2 rounded-full hover:bg-white/40 transition-colors ${step === 1 ? 'invisible' : ''}`}
            >
              <ChevronLeft className="text-pink-600" />
            </button>
            
            {/* Progress Indicators */}
            <div className="flex gap-2">
              {[...Array(totalSteps - 1)].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 rounded-full transition-all duration-500 ${step - 1 === i ? 'w-6 bg-pink-500' : 'w-2 bg-pink-300/50'}`}
                />
              ))}
            </div>

            <button 
              onClick={nextStep} 
              className={`p-2 rounded-full hover:bg-white/40 transition-colors ${step === totalSteps - 1 ? 'invisible' : ''}`}
            >
              <ChevronRight className="text-pink-600" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// INDIVIDUAL SCREENS
// ==========================================

// STEP 0: Lock Screen
const ScreenUnlock = ({ onUnlock }) => (
  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
    <div className="w-24 h-24 bg-white/50 rounded-full flex items-center justify-center animate-pulse shadow-[0_0_40px_rgba(255,105,180,0.5)]">
      <Unlock size={40} className="text-pink-600" />
    </div>
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Heyy Sis!</h1>
      <p className="text-pink-600 font-medium">Scan to open your gift ✨</p>
    </div>
    <button 
      onClick={onUnlock}
      className="mt-8 px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
    >
      <Sparkles size={20} />
      Tap to Unlock
    </button>
  </div>
);

// STEP 1: Welcome
const ScreenWelcome = () => (
  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
    <div className="text-sm font-bold tracking-widest text-pink-500 uppercase mb-4 border-b-2 border-pink-300 pb-2">
      For My Lovely Sister ✦
    </div>
    <h1 className="text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
      Happy <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Sister's Day!</span>
    </h1>
    <p className="text-gray-600 leading-relaxed max-w-[280px]">
      You've always been my biggest supporter, my secret keeper, and my forever partner-in-crime. 💖
    </p>
    <div className="mt-8 relative animate-float">
      <div className="absolute inset-0 bg-pink-200 rounded-full blur-2xl opacity-50 animate-pulse"></div>
      <img 
        src="https://api.dicebear.com/9.x/fun-emoji/svg?seed=Sister&backgroundColor=ffdfbf" 
        alt="Cute illustration" 
        className="w-48 h-48 object-cover rounded-3xl border-4 border-white shadow-xl relative z-10 bg-white"
      />
    </div>
  </div>
);

// STEP 2: 3D Game
const ScreenGame = () => {
  const [cards, setCards] = useState([
    { id: 1, flipped: false, type: 'empty' },
    { id: 2, flipped: false, type: 'chocolate' },
    { id: 3, flipped: false, type: 'empty' },
    { id: 4, flipped: false, type: 'chocolate' },
  ]);
  const won = cards.filter(c => c.type === 'chocolate' && c.flipped).length === 2;

  const flipCard = (index) => {
    if (cards[index].flipped || won) return;
    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Find the Treats! 🍫
      </h2>
      <p className="text-pink-600 text-center mb-4">Tap the cards to reveal your virtual chocolates.</p>
      
      <div className="grid grid-cols-2 gap-4 w-full max-w-[250px]">
        {cards.map((card, idx) => (
          <div key={card.id} className={`flip-card w-full h-32 ${card.flipped ? 'flipped' : ''}`} onClick={() => flipCard(idx)}>
            <div className="flip-card-inner shadow-lg rounded-2xl">
              {/* Front of card */}
              <div className="flip-card-front bg-white/60 border-2 border-pink-200 flex items-center justify-center">
                <Gift size={32} className="text-pink-400" />
              </div>
              {/* Back of card */}
              <div className={`flip-card-back flex items-center justify-center ${card.type === 'chocolate' ? 'bg-pink-100 border-pink-400' : 'bg-gray-100 border-gray-300'}`}>
                {card.type === 'chocolate' ? (
                  <span className="text-4xl animate-bounce">🍫</span>
                ) : (
                  <span className="text-4xl">❌</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {won && (
        <div className="mt-6 text-center animate-slideIn">
          <p className="text-xl font-bold text-pink-600 bg-white/80 px-4 py-2 rounded-xl shadow-sm">
            Yay! You unlocked the chocolates! 🎉
          </p>
        </div>
      )}
    </div>
  );
};

// STEP 3: The Letter
const ScreenLetter = () => {
  const [showText, setShowText] = useState(false);
  useEffect(() => { setTimeout(() => setShowText(true), 500); }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-start pt-8">
      <div className="w-full bg-yellow-50/90 border border-yellow-200 p-8 rounded-3xl shadow-xl relative overflow-hidden">
        {/* Decorative Tape */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-6 bg-white/40 backdrop-blur-sm rotate-[-2deg] shadow-sm"></div>
        
        <div className="flex items-center gap-2 mb-6 border-b border-pink-200 pb-4">
          <Mail className="text-pink-500" />
          <h2 className="text-sm font-bold tracking-widest text-pink-500 uppercase">A Letter From Your Bhai</h2>
        </div>
        
        <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">Dear Sis ❤️</h3>
        
        <div className="min-h-[150px]">
          {showText && (
            <p className="text-gray-700 leading-relaxed font-medium typewriter">
              I just want to remind you how special you are to me. May your life shine as bright as your smile, and may chocolates always find their way to you! 😉
            </p>
          )}
        </div>

        <div className="mt-8 text-right font-serif italic text-pink-600 font-semibold border-t border-pink-100 pt-4">
          — With love, your brother ✦
        </div>
      </div>
    </div>
  );
};

// STEP 4: Photo Gallery
const ScreenGallery = () => {
  // --- USER EDIT: Put your images in `public/photos/` and update filenames below ---
  const photos = [
    { url: '/photos/IMG_20260315_194629_311.jpg', label: 'Photo 1' },
    { url: '/photos/IMG_20260315_194642_0055.jpg', label: 'Photo 2' },
  ];
  const [current, setCurrent] = useState(0);

  const nextPhoto = () => setCurrent((c) => (c + 1) % photos.length);
  const prevPhoto = () => setCurrent((c) => (c === 0 ? photos.length - 1 : c - 1));

  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-4">

      {/* Polaroid Frame */}
      <div className="relative bg-white p-4 pb-12 rounded-lg shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] w-full max-w-[300px] transform transition-transform duration-500 hover:scale-105">
        <div className="overflow-hidden rounded-md bg-gray-100 aspect-square relative">
          <img 
            key={current}
            src={photos[current].url} 
            alt={photos[current].label} 
            className="w-full h-full object-cover animate-slideIn"
          />
        </div>
        <p className="absolute bottom-4 left-0 w-full text-center font-serif text-gray-700 italic">
          {photos[current].label}
        </p>
      </div>

      <div className="flex gap-4 mt-6">
        <button onClick={prevPhoto} className="p-3 bg-white/50 hover:bg-white rounded-full shadow transition"><ChevronLeft size={20}/></button>
        <button onClick={nextPhoto} className="p-3 bg-white/50 hover:bg-white rounded-full shadow transition"><ChevronRight size={20}/></button>
      </div>
    </div>
  );
};

// STEP 5: Music Player
const ScreenMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const musicTrack = {
    // Replace with your own song URL or local public path.
    // If you want to use a local file, put it in `public/music/` and use '/music/song.mp3'.
    src: '/music/Vintunnavaa - SenSongsmp3.Co.mp3',
    title: 'Vintunnavaa',
    artist: 'Karthik, Shreya Ghoshal',
  };

  useEffect(() => {
    let interval;
    const audio = audioRef.current;

    if (audio) {
      if (isPlaying) {
        audio.play().catch(() => {});
        interval = setInterval(() => {
          if (audio.duration) {
            setProgress((audio.currentTime / audio.duration) * 100);
          }
        }, 200);
      } else {
        audio.pause();
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
        <Music className="text-pink-500" /> Songs For You
      </h2>

      <audio ref={audioRef} src={musicTrack.src} preload="auto" />

      <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl w-full max-w-[320px]">
        {/* Album Art Cover */}
        <div className="w-full aspect-square bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 rounded-2xl mb-6 shadow-inner relative overflow-hidden flex items-center justify-center">
          <Music size={60} className="text-white/50 absolute" />
          
          {/* Visualizer Bars (Only animate when playing) */}
          <div className="absolute bottom-4 flex gap-1 h-12 items-end">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i} 
                className="w-2 bg-white rounded-t-sm bar"
                style={{ 
                  height: `${Math.random() * 100}%`,
                  animationPlayState: isPlaying ? 'running' : 'paused',
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-xs font-bold text-pink-500 uppercase mb-1">Now Playing ♪</p>
          <h3 className="text-lg font-bold text-gray-800">{musicTrack.title}</h3>
          <p className="text-sm text-gray-500">{musicTrack.artist}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-1.5 rounded-full mb-6 relative">
          <div className="bg-pink-500 h-full rounded-full transition-all duration-300 ease-linear" style={{ width: `${progress}%` }}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-pink-600 rounded-full shadow"></div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-6">
          <button className="text-gray-400 hover:text-pink-500 transition"><SkipBack size={24} /></button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-14 h-14 bg-pink-500 hover:bg-pink-600 text-white rounded-full flex items-center justify-center shadow-lg transition transform hover:scale-105 active:scale-95"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
          </button>
          <button className="text-gray-400 hover:text-pink-500 transition"><SkipForward size={24} /></button>
        </div>
      </div>
    </div>
  );
};

// STEP 6: Outro / Thank You
const ScreenOutro = () => (
  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-slideIn">
    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-xl">
      <Star size={40} className="text-yellow-400" fill="currentColor" />
    </div>
    
    <div className="text-xs font-bold tracking-widest text-pink-500 uppercase mb-2">
      ✦ From your Bhai with love ✦
    </div>
    
    <h1 className="text-4xl font-black text-gray-800">
      Thank You
    </h1>
    <h2 className="text-xl font-bold text-pink-500 uppercase">
      For always being there ❤️
    </h2>
    
    <div className="bg-white/50 p-6 rounded-2xl mt-4 border border-white">
      <p className="text-gray-700 font-medium leading-relaxed">
        You make every small thing brighter and happier. I'm lucky to have you — thanks for being the sweetest part of my days.
      </p>
    </div>
    
    <p className="text-xs text-gray-400 mt-8 italic">
      made with ✨ chocolates & sparkles — always your brother.
    </p>
  </div>
);
