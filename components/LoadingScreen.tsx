import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const loadingMessages = [
  "Analyzing your unique profile DNA...",
  "Scanning government portals for latest vacancies...",
  "Evaluating private sector trends...",
  "Calculating competition density...",
  "Synthesizing your Master Plan..."
];

export const LoadingScreen: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative w-24 h-24 mb-10">
        <motion.div
          className="absolute inset-0 border-4 border-indigo-500/30 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 border-t-4 border-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
        </div>
      </div>
      
      <h2 className="text-2xl font-display font-bold text-white mb-2">Calibrating Compass</h2>
      
      <div className="h-8 overflow-hidden relative w-full max-w-md text-center">
        <motion.div
            key={messageIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="text-indigo-300"
        >
            {loadingMessages[messageIndex]}
        </motion.div>
      </div>
    </div>
  );
};