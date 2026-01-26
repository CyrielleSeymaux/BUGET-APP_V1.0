import { useState, useEffect } from 'react';
import { Tip } from '../types';
import tipsData from '../data/tips.json';

export const useTipOfTheDay = () => {
  const [currentTip, setCurrentTip] = useState<Tip | null>(null);
  const STORAGE_KEY = 'tipOfTheDay';

  // Initialize tip on mount
  useEffect(() => {
    const savedTip = localStorage.getItem(STORAGE_KEY);
    if (savedTip) {
      try {
        setCurrentTip(JSON.parse(savedTip));
      } catch (error) {
        console.error('Failed to parse saved tip:', error);
        pickRandomTip();
      }
    } else {
      pickRandomTip();
    }
  }, []);

  // Get a random tip from the tips data
  const pickRandomTip = () => {
    if (tipsData.length > 0) {
      const randomIndex = Math.floor(Math.random() * tipsData.length);
      const tip = tipsData[randomIndex] as Tip;
      setCurrentTip(tip);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tip));
    }
  };

  return {
    currentTip,
    pickRandomTip,
  };
};
