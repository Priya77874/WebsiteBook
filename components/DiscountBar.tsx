import React, { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Clock } from 'lucide-react';

const DiscountBar: React.FC = () => {
  const { activeDiscount } = useStore();
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const hour = now.getHours();
      let targetHour = 0;

      if (hour >= 6 && hour < 12) targetHour = 12; // Ends at 12 PM
      else if (hour >= 17 && hour < 22) targetHour = 22; // Ends at 10 PM
      else if (hour < 6) targetHour = 6; // Starts at 6 AM
      else if (hour >= 12 && hour < 17) targetHour = 17; // Starts at 5 PM
      else targetHour = 30; // 6 AM next day (simple logic fix needed for next day)

      if (targetHour === 30) targetHour = 6; // simplified wrap around

      let diff = (targetHour - hour) * 60 * 60 * 1000 - (now.getMinutes() * 60 * 1000) - (now.getSeconds() * 1000);
      if (diff < 0) diff += 24 * 60 * 60 * 1000;

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${h}h ${m}m ${s}s`);
    };

    const interval = setInterval(updateTimer, 1000);
    updateTimer();
    return () => clearInterval(interval);
  }, [activeDiscount]);

  if (activeDiscount === 0) return (
    <div className="bg-gray-100 text-gray-500 text-xs text-center py-1">
      Next discount starts soon! Check back at 5 PM.
    </div>
  );

  return (
    <div className="bg-gradient-to-r from-primary to-blue-600 text-white text-sm py-2 px-4 flex justify-center items-center gap-4 shadow-inner">
      <div className="flex items-center gap-2 animate-pulse">
        <span className="bg-secondary text-primary font-bold px-2 py-0.5 rounded text-xs">
          LIVE OFFER
        </span>
        <span className="font-semibold">
          Get {activeDiscount}% OFF on all orders!
        </span>
      </div>
      <div className="flex items-center gap-1 text-xs opacity-90 font-mono bg-black/20 px-2 py-1 rounded">
        <Clock size={12} />
        Ends in: {timeLeft}
      </div>
    </div>
  );
};

export default DiscountBar;