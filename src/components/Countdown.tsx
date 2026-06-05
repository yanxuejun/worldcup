import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const targetDate = new Date('2026-06-11T20:00:00-04:00').getTime();

  useEffect(() => {
    function calculate() {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { value: timeLeft.days, label: '天' },
    { value: timeLeft.hours, label: '时' },
    { value: timeLeft.minutes, label: '分' },
    { value: timeLeft.seconds, label: '秒' },
  ];

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-3 sm:gap-4">
          <motion.div
            key={`${unit.label}-${unit.value}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl glass neon-border flex items-center justify-center">
                <span className="text-2xl sm:text-3xl font-bold font-display gradient-text">
                  {String(unit.value).padStart(2, '0')}
                </span>
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#00ff88]/30 rounded-full blur-sm" />
            </div>
            <span className="mt-2 text-xs sm:text-sm text-gray-400 font-medium">{unit.label}</span>
          </motion.div>
          {i < units.length - 1 && (
            <span className="text-xl sm:text-2xl font-bold text-[#FFD700] -mt-4">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
