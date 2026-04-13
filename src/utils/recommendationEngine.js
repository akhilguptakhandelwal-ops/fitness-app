import exercises from '../data/exercises.json';

export const getDailyWorkout = (weightLogs) => {
  const TARGET_WEIGHT = 79.0;
  let focus = 'all'; 
  
  if (weightLogs && weightLogs.length > 0) {
    const currentWeight = weightLogs[weightLogs.length - 1].weight;
    
    // Core logic shifting towards the 79 Kg target
    if (currentWeight > TARGET_WEIGHT + 3) {
      focus = 'cut'; // Needs cutting to drop down closer to 79
    } else if (currentWeight > TARGET_WEIGHT) {
      focus = 'lean'; // Keep dropping gently to target
    } else if (currentWeight < TARGET_WEIGHT - 2) {
      focus = 'bulk'; // Build up to 79
    } else {
      focus = 'all'; // In the sweet spot
    }
  }

  const preWorkouts = exercises.filter(ex => ex.phase === 'pre-workout');
  const workouts = exercises.filter(ex => ex.phase === 'workout' && (ex.weightFocus.includes(focus) || ex.weightFocus.includes('all')));
  
  const todayRaw = new Date().toISOString().split('T')[0];
  const dateNum = parseInt(todayRaw.replace(/-/g, ''), 10);
  
  // Total Target Duration: 45 Minutes
  const selectedPre = [];
  let currentDurationPre = 0;
  
  const tempPre = [...preWorkouts];
  for (let i = 0; i < tempPre.length; i++) {
    const index = (dateNum + i) % tempPre.length;
    const ex = tempPre[index];
    if (currentDurationPre + ex.durationMinutes <= 15) { 
        selectedPre.push(ex);
        currentDurationPre += ex.durationMinutes;
    }
    tempPre.splice(index, 1);
  }

  const maxWorkoutDuration = 45 - currentDurationPre;
  const selectedWorkout = [];
  let currentWorkoutDuration = 0;
  
  const tempWk = [...workouts];
  // ensure we pick items until we hit ~maxWorkoutDuration
  for (let i = 0; i < 5 && tempWk.length > 0; i++) {
    const index = (dateNum * 3 + i) % tempWk.length;
    const ex = tempWk[index];
    
    if (currentWorkoutDuration + ex.durationMinutes <= maxWorkoutDuration + 5) { // small buffer over 45 allowed
       selectedWorkout.push(ex);
       currentWorkoutDuration += ex.durationMinutes;
    }
    tempWk.splice(index, 1);
  }

  const totalDuration = currentDurationPre + currentWorkoutDuration;

  return { routine: { pre: selectedPre, main: selectedWorkout }, focus, totalDuration, target: TARGET_WEIGHT };
};
