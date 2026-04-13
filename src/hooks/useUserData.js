import { useState, useEffect } from 'react';

export const useUserData = () => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('fitnessAppData');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      weightLogs: [], // { date: string, weight: number }
      lastWeighInDate: null,
      streak: 0,
      lastWorkoutDate: null,
      completedToday: false
    };
  });

  useEffect(() => {
    localStorage.setItem('fitnessAppData', JSON.stringify(data));
  }, [data]);

  const addWeightLog = (weight) => {
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({
      ...prev,
      weightLogs: [...prev.weightLogs, { date: today, weight: parseFloat(weight) }],
      lastWeighInDate: today
    }));
  };

  const markWorkoutComplete = () => {
    const today = new Date().toISOString().split('T')[0];
    setData(prev => {
      let newStreak = prev.streak;
      if (prev.lastWorkoutDate !== today) {
         const yesterday = new Date();
         yesterday.setDate(yesterday.getDate() - 1);
         if (prev.lastWorkoutDate === yesterday.toISOString().split('T')[0]) {
             newStreak++;
         } else {
             newStreak = 1;
         }
      }
      
      return {
        ...prev,
        lastWorkoutDate: today,
        streak: newStreak,
        completedToday: true
      };
    });
  };

  const needsWeighIn = () => {
    if (!data.lastWeighInDate) return true;
    
    const lastDate = new Date(data.lastWeighInDate);
    const today = new Date();
    const diffTime = Math.abs(today - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays >= 7;
  };

  useEffect(() => {
     const today = new Date().toISOString().split('T')[0];
     if (data.lastWorkoutDate && data.lastWorkoutDate !== today && data.completedToday) {
         setData(prev => ({...prev, completedToday: false}));
     }
  }, [data.lastWorkoutDate, data.completedToday]);

  const currentWeight = data.weightLogs.length > 0 ? data.weightLogs[data.weightLogs.length - 1].weight : null;

  return { data, addWeightLog, markWorkoutComplete, needsWeighIn: needsWeighIn(), currentWeight };
};
