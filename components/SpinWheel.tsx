import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const PRIZES = [
  "Free Delivery",
  "5% Extra OFF",
  "Better Luck Next Time",
  "10% Extra OFF",
  "Fast 24h Delivery",
  "No Prize"
];

const COLORS = ["#F5A623", "#1A3C8C", "#F5A623", "#1A3C8C", "#F5A623", "#1A3C8C"];

const SpinWheel: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const today = new Date();
    const isSunday = today.getDay() === 0;
    const hasSpun = localStorage.getItem('hasSpunDate') === today.toDateString();

    if (isSunday && !hasSpun) {
      setTimeout(() => setIsVisible(true), 2000); // Show after 2 seconds
    }
  }, []);

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const randomDeg = Math.floor(5000 + Math.random() * 5000);
    setRotation(randomDeg);

    setTimeout(() => {
      setIsSpinning(false);
      const actualDeg = randomDeg % 360;
      const sliceAngle = 360 / PRIZES.length;
      const index = Math.floor(((360 - actualDeg + sliceAngle / 2) % 360) / sliceAngle);
      
      const wonPrize = PRIZES[index];
      setResult(wonPrize);
      localStorage.setItem('hasSpunDate', new Date().toDateString());
      localStorage.setItem('sundayReward', wonPrize);
    }, 5000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl p-6 shadow-2xl relative max-w-sm w-full text-center">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <h3 className="text-2xl font-bold text-primary font-poppins mb-2">Sunday Special!</h3>
        <p className="text-sm text-gray-500 mb-6">Spin the wheel to win exclusive rewards.</p>

        <div className="relative w-64 h-64 mx-auto mb-6 overflow-hidden rounded-full border-4 border-white shadow-lg">
          {/* Wheel */}
          <div 
            className="w-full h-full rounded-full transition-transform duration-[5000ms] cubic-bezier(0.25, 0.1, 0.25, 1)"
            style={{ 
              transform: `rotate(${rotation}deg)`,
              background: `conic-gradient(
                ${COLORS[0]} 0deg 60deg,
                ${COLORS[1]} 60deg 120deg,
                ${COLORS[2]} 120deg 180deg,
                ${COLORS[3]} 180deg 240deg,
                ${COLORS[4]} 240deg 300deg,
                ${COLORS[5]} 300deg 360deg
              )`
            }}
          >
          </div>
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-4 h-8 bg-red-600 z-10 clip-triangle"></div>
        </div>

        {result ? (
          <div className="bg-green-100 text-green-800 p-4 rounded-lg animate-bounce">
            <p className="font-bold text-lg">You Won: {result}!</p>
            <p className="text-xs">Applied automatically at checkout.</p>
            <button 
              onClick={() => setIsVisible(false)}
              className="mt-2 bg-primary text-white px-4 py-2 rounded text-sm"
            >
              Awesome!
            </button>
          </div>
        ) : (
          <button 
            onClick={spin}
            disabled={isSpinning}
            className="bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 disabled:opacity-50"
          >
            {isSpinning ? 'Spinning...' : 'SPIN NOW'}
          </button>
        )}
      </div>
    </div>
  );
};

export default SpinWheel;