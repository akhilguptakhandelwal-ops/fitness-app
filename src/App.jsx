import React, { useMemo } from 'react';
import { useUserData } from './hooks/useUserData';
import { getDailyWorkout } from './utils/recommendationEngine';
import WeeklyPrompt from './components/WeeklyPrompt';
import Dashboard from './components/Dashboard';

function App() {
  const { data, addWeightLog, markWorkoutComplete, needsWeighIn, currentWeight } = useUserData();

  const { routine, focus, totalDuration, target } = useMemo(() => getDailyWorkout(data.weightLogs), [data.weightLogs]);

  return (
    <div className="app-container">
      {needsWeighIn && <WeeklyPrompt onSaveWeight={addWeightLog} />}
      
      {!needsWeighIn && (
        <Dashboard 
          routine={routine} 
          focus={focus} 
          totalDuration={totalDuration}
          target={target}
          completedToday={data.completedToday}
          streak={data.streak}
          onMarkComplete={markWorkoutComplete} 
        />
      )}
    </div>
  );
}

export default App;
