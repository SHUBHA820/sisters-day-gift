import { useState, useRef, useEffect } from 'react';
import { Unlock, Play, Pause, ChevronRight, ChevronLeft, Star, Heart, Sparkles } from 'lucide-react';

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
  .screen-panel { animation: fadeInUp 0.55s ease both; }
  .screen-zoom { animation: zoomIn 0.55s ease both; }
  .screen-wave { animation: waveIn 0.65s ease both; }
  .screen-pop { animation: popIn 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
  .screen-slide-left { animation: slideLeft 0.6s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .screen-scale { animation: scaleIn 0.55s ease both; }
  .screen-swing { animation: swingIn 0.7s ease both; }
  .screen-outro { animation: outroIn 0.65s ease both; }
  .unlock-background { background: radial-gradient(circle at top, rgba(255, 135, 178, 0.18), transparent 42%); }
  .welcome-glow { position: relative; overflow: hidden; }
  .welcome-card { animation: floatIllustration 5s ease-in-out infinite; }
  .game-grid { animation: pulseGrid 7s ease-in-out infinite; }
  .letter-panel { animation: gentleWave 8s ease-in-out infinite alternate; }
  .gallery-photo { animation: slideInPhoto 0.8s ease both; }
  .music-circle { animation: pulseCircle 1.8s ease-in-out infinite; }
  .outro-star { animation: spinGlow 2.2s linear infinite; }
  .fade-in-up { animation: fadeInUp 0.55s ease both; }
  .pop-in { animation: popIn 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
  .glow-up { animation: glowUp 1.8s ease-in-out infinite alternate; }
  .button-bounce:hover { transform: translateY(-3px) scale(1.03); }
  @keyframes slideIn {
    0% { opacity: 0; transform: scale(0.95) translateY(20px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(16px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes popIn {
    0% { opacity: 0; transform: scale(0.92); }
    70% { transform: scale(1.04); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes glowUp {
    0% { box-shadow: 0 0 0 rgba(255, 145, 188, 0); }
    100% { box-shadow: 0 0 30px rgba(255, 145, 188, 0.22); }
  }
  @keyframes pulseGrid {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.01); }
  }
  @keyframes gentleWave {
    0% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
    100% { transform: translateY(0); }
  }
  @keyframes slideInPhoto {
    0% { opacity: 0; transform: translateY(24px) scale(0.96); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes pulseCircle {
    0%, 100% { box-shadow: 0 0 0 rgba(255, 255, 255, 0.18); }
    50% { box-shadow: 0 0 28px rgba(255, 255, 255, 0.18); }
  }
  @keyframes spinGlow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes zoomIn {
    0% { opacity: 0; transform: scale(0.82); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes waveIn {
    0% { opacity: 0; transform: translateY(20px) rotate(-3deg); }
    60% { transform: translateY(-8px) rotate(2deg); }
    100% { opacity: 1; transform: translateY(0) rotate(0); }
  }
  @keyframes slideLeft {
    0% { opacity: 0; transform: translateX(24px); }
    100% { opacity: 1; transform: translateX(0); }
  }
  @keyframes scaleIn {
    0% { opacity: 0; transform: scale(0.88); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes swingIn {
    0% { opacity: 0; transform: translateY(30px) rotate(-8deg); }
    70% { transform: translateY(-10px) rotate(4deg); }
    100% { opacity: 1; transform: translateY(0) rotate(0); }
  }
  @keyframes outroIn {
    0% { opacity: 0; transform: translateY(30px) scale(0.92); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
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
  .floating-icon { position: absolute; opacity: 0.85; animation: float-up 4s ease-in-out infinite; }
  .floating-heart { animation: pulse-heart 1.8s ease-in-out infinite; }
  @keyframes pulse-heart { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.15); } }
  .treat-card { transition: transform 0.4s ease, box-shadow 0.4s ease; }
  .treat-card:hover { transform: translateY(-4px); box-shadow: 0 22px 45px rgba(15, 23, 42, 0.15); }
  .card-face { display: flex; align-items: center; justify-content: center; font-size: 2rem; }
`;

const getScreenClass = (stepIndex) => {
  switch (stepIndex) {
    case 0:
      return 'screen-zoom';
    case 1:
      return 'screen-wave';
    case 2:
      return 'screen-pop';
    case 3:
      return 'screen-slide-left';
    case 4:
      return 'screen-scale';
    case 5:
      return 'screen-swing';
    case 6:
      return 'screen-outro';
    default:
      return 'screen-panel';
  }
};

export default function App() {
  const [step, setStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalSteps = 7;

  const goToStep = (newStep) => {
    if (isTransitioning || newStep < 0 || newStep >= totalSteps) return;
    setIsTransitioning(true);
    setTimeout(() => { setStep(newStep); setIsTransitioning(false); }, 400);
  };

  return (
    <div className="min-h-screen bg-animated flex items-center justify-center p-4 text-slate-800 font-sans overflow-hidden">
      <style>{styles}</style>
      <div className="relative w-full max-w-md h-[800px] max-h-[90vh] glass-panel rounded-3xl flex flex-col shadow-2xl overflow-hidden z-10 border-white/40">
        <div key={step} className={`flex-1 overflow-y-auto p-6 flex flex-col ${isTransitioning ? 'opacity-0' : 'opacity-100 transition-opacity'} ${getScreenClass(step)}`}>
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
            <button onClick={() => goToStep(step - 1)} className="p-2 rounded-full transition-transform duration-300 button-bounce"><ChevronLeft /></button>
            <div className="flex gap-2">{Array.from({ length: totalSteps - 1 }).map((_, i) => <div key={i} className={`h-2 rounded-full ${step - 1 === i ? 'w-6 bg-pink-500' : 'w-2 bg-pink-300'}`} />)}</div>
            <button onClick={() => goToStep(step + 1)} className="p-2 rounded-full transition-transform duration-300 button-bounce"><ChevronRight /></button>
          </div>
        )}
      </div>
    </div>
  );
}

const ScreenUnlock = ({ onUnlock }) => (
  <div className="unlock-background screen-zoom fade-in-up flex-1 flex flex-col items-center justify-center text-center rounded-[2rem] p-4">
    <Unlock size={40} className="text-pink-600 mb-8 animate-pulse" />
    <h1 className="text-3xl font-bold mb-4">Heyy Sis!</h1>
    <button onClick={onUnlock} className="px-8 py-4 bg-pink-500 text-white rounded-full font-bold pop-in transition-transform duration-300 button-bounce">Tap to Unlock</button>
  </div>
);

const ScreenWelcome = () => (
  <div className="relative screen-wave fade-in-up flex-1 flex flex-col items-center justify-center text-center overflow-hidden welcome-glow">
    <div className="floating-icon left-10 top-10 text-pink-300 floating-heart"><Heart size={34} /></div>
    <div className="floating-icon right-10 top-24 text-slate-300 animate-float"><Sparkles size={26} /></div>
    <div className="floating-icon left-1/2 top-8 -translate-x-1/2 text-pink-200 animate-float"><Sparkles size={18} /></div>
    <h1 className="text-5xl font-extrabold mb-4 glow-up">Happy Sister&apos;s Day!</h1>
    <p className="text-gray-600 mb-8">You&apos;ve always been my best friend. 💖</p>
    <div className="max-w-md p-6 rounded-3xl bg-white/10 border border-white/30 shadow-lg backdrop-blur-xl">
      <p className="text-sm text-pink-600 font-medium">A little cartoon wish for you:</p>
      <p className="mt-4 text-left text-slate-700">May your day sparkle with laughter, dreams, and little surprises that make you smile.</p>
    </div>
  </div>
);

const createShuffledCards = () => {
  const pairContents = ['🎁', '🍬', '🎀', '🍫'];
  const cards = pairContents.flatMap((content, index) => [
    { id: index * 2 + 1, content, isFlipped: false, isMatched: false },
    { id: index * 2 + 2, content, isFlipped: false, isMatched: false },
  ]);

  for (let i = cards.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
};

const ScreenGame = () => {
  const [cards, setCards] = useState(createShuffledCards);
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [message, setMessage] = useState('Match the cards to win the game');
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    if (flippedIndexes.length !== 2) return;

    const [first, second] = flippedIndexes;
    const firstCard = cards[first];
    const secondCard = cards[second];

    if (firstCard.content === secondCard.content) {
      setCards((prev) => prev.map((card, idx) => idx === first || idx === second ? { ...card, isMatched: true } : card));
      setMessage('Nice! You found a match.');
      setFlippedIndexes([]);
      return;
    }

    setIsLocked(true);
    setTimeout(() => {
      setCards((prev) => prev.map((card, idx) => (idx === first || idx === second) ? { ...card, isFlipped: false } : card));
      setFlippedIndexes([]);
      setIsLocked(false);
      setMessage('Try again!');
    }, 900);
  }, [flippedIndexes, cards]);

  useEffect(() => {
    if (cards.every((card) => card.isMatched)) {
      setMessage(`All matched! You won in ${moves} ${moves === 1 ? 'move' : 'moves'} 🎉`);
      setShowSparkles(true);
      const sparkleTimer = setTimeout(() => setShowSparkles(false), 2400);
      return () => clearTimeout(sparkleTimer);
    }
    return undefined;
  }, [cards, moves]);

  const resetGame = () => {
    setCards(createShuffledCards());
    setFlippedIndexes([]);
    setMoves(0);
    setMessage('Match the cards to win the game');
    setIsLocked(false);
    setShowSparkles(false);
  };

  const flipCard = (index) => {
    if (isLocked) return;
    const card = cards[index];
    if (card.isFlipped || card.isMatched || flippedIndexes.length === 2) return;

    setCards((prev) => prev.map((c, idx) => idx === index ? { ...c, isFlipped: true } : c));
    setFlippedIndexes((prev) => [...prev, index]);
    if (flippedIndexes.length === 1) {
      setMoves((prev) => prev + 1);
    }
  };

  return (
    <div className="screen-pop game-grid fade-in-up flex-1 flex flex-col items-center justify-center relative">
      {showSparkles && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 10 }).map((_, idx) => (
              <span key={idx} className="text-3xl animate-float" style={{ animationDelay: `${idx * 0.1}s` }}>✨</span>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Find the Treats!</h2>
        <p className="text-sm text-slate-600">{message}</p>
        <div className="mt-3 text-xs uppercase tracking-[0.3em] text-pink-500">Moves: {moves}</div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, idx) => (
          <button
            key={card.id}
            type="button"
            onClick={() => flipCard(idx)}
            className={`w-24 h-24 rounded-3xl shadow-inner transition-transform duration-300 ${card.isMatched ? 'bg-emerald-500 text-white scale-105' : card.isFlipped ? 'bg-pink-500 text-white scale-105' : 'bg-pink-200 text-slate-700 hover:scale-105'} treat-card`}
          >
            <span className="text-4xl">{card.isFlipped || card.isMatched ? card.content : '❓'}</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={resetGame}
        className="mt-6 px-6 py-3 bg-slate-900 text-white rounded-full shadow-lg hover:bg-slate-800 transition transform duration-300 button-bounce"
      >
        Restart Game
      </button>
    </div>
  );
};

const ScreenLetter = () => (
  <div className="letter-panel screen-slide-left fade-in-up flex-1 flex flex-col justify-center bg-yellow-50 p-6 rounded-2xl shadow-inner pop-in">
    <h3 className="text-2xl font-bold mb-4">Dear Sis ❤️</h3>
    <p className="typewriter">You make my life brighter. May your day be as sweet as you are!</p>
  </div>
);

const ScreenGallery = () => {
 const baseUrl = import.meta.env.BASE_URL || '/'
 const photos = [
    { url: `${baseUrl}photos/IMG_20260315_194629_311.jpg`, label: "Always smiling" },
    { url: `${baseUrl}photos/IMG_20260315_194642_0055.jpg`, label: "Best Times" }
  ];
  const [current, setCurrent] = useState(0);
  return (
    <div className="screen-scale fade-in-up flex-1 flex flex-col items-center justify-center">
      <img src={photos[current].url} className="gallery-photo w-64 h-64 object-cover rounded-xl shadow-lg mb-4 pop-in" />
      <div className="flex gap-4">
        <button onClick={() => setCurrent((c) => (c === 0 ? photos.length - 1 : c - 1))} className="button-bounce p-2 rounded-full bg-white/50 hover:bg-white"><ChevronLeft /></button>
        <button onClick={() => setCurrent((c) => (c + 1) % photos.length)} className="button-bounce p-2 rounded-full bg-white/50 hover:bg-white"><ChevronRight /></button>
      </div>
    </div>
  );
};

const ScreenMusic = () => {
  const baseUrl = import.meta.env.BASE_URL || '/'
  const audioRef = useRef(new Audio(`${baseUrl}music/Vintunnavaa - SenSongsmp3.Co.mp3`));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.pause();
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="screen-swing fade-in-up flex-1 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-2 glow-up">Songs For You</h2>
      <p className="text-sm text-slate-600 mb-6">A sweet melody for your sisterly moments.</p>
      <div className="flex flex-col items-center gap-4">
        <button onClick={togglePlay}
                className="music-circle w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 transition-transform button-bounce">
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </button>
        <div className="w-64 text-center">
          <div className="text-base font-semibold">Vintunnavaa</div>
          <div className="text-xs uppercase tracking-[0.2em] text-slate-500">SenSongssmp3</div>
        </div>
        <div className="w-64 bg-white/40 rounded-full h-2 overflow-hidden">
          <div className="h-full rounded-full bg-pink-500" style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }} />
        </div>
        <div className="text-xs text-slate-500">{formatTime(currentTime)} / {formatTime(duration)}</div>
      </div>
    </div>
  );
};

const ScreenOutro = () => (
  <div className="screen-outro fade-in-up flex-1 flex flex-col items-center justify-center text-center">
    <Star size={60} className="text-yellow-400 mb-4 glow-up outro-star" />
    <h1 className="text-4xl font-black mb-4">Thank You</h1>
    <p>For being the best sister ever.</p>
  </div>
);