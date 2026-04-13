import React from 'react';
import { CheckCircle2, Target } from 'lucide-react';

const ExerciseList = ({ items }) => (
  <div className="routine-list">
    {items.map(exercise => (
      <div key={exercise.id} className={`glass-panel exercise-card`}>
        <div className="exercise-header" style={{paddingBottom: '10px'}}>
          <div className="exercise-info">
            <h3 style={{fontSize: '1.2rem', color: 'var(--text-main)'}}>{exercise.title}</h3>
            <div className="exercise-meta" style={{color: 'var(--accent)', marginTop: '4px', fontWeight: '600'}}>
              <span>⏱ {exercise.durationMinutes} Mins</span>
              <span style={{marginLeft: '10px'}}>{exercise.reps}</span>
            </div>
          </div>
        </div>
        <div className="video-container">
          <iframe 
            src={exercise.youtubeEmbedUrl} 
            title={exercise.title} 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
        <div style={{padding: '15px 20px', fontSize: '0.9rem', color: 'var(--text-muted)'}}>
          {exercise.description}
        </div>
      </div>
    ))}
  </div>
);

const Dashboard = ({ routine, focus, totalDuration, target, completedToday, onMarkComplete, streak }) => {
  return (
    <div className="dashboard">
      <div className="header" style={{marginBottom: '15px'}}>
        <h1 style={{fontSize: '2rem'}}>Akhil@79 Kg</h1>
        <div className="stats-pill">
          🔥 Streak: {streak}
        </div>
      </div>
      
      <div className="glass-panel" style={{marginBottom: '30px', padding: '15px', display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(102, 252, 241, 0.05)'}}>
        <Target size={32} color="var(--accent)" />
        <div>
          <p style={{ margin: 0, fontWeight: 600 }}>Target Weight: {target} Kg</p>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)'}}>
             Current Phase: <strong style={{color: 'var(--accent)', textTransform: 'capitalize'}}>{focus}</strong> 
             {" "} • Total Time: ~{totalDuration} Mins
          </p>
        </div>
      </div>

      {completedToday ? (
        <div className="glass-panel completion-state">
           <CheckCircle2 size={64} className="completion-icon" />
           <h2>Workout Complete!</h2>
           <p style={{color: 'var(--text-muted)'}}>Great job today. Keep pushing towards 79 Kg!</p>
        </div>
      ) : (
        <>
          <h2 style={{borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '20px'}}>
             Pre-Workout <span style={{fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400}}>Warmup & Mobility</span>
          </h2>
          <ExerciseList items={routine.pre} />

          <h2 style={{borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '20px', marginTop: '30px'}}>
             Workout <span style={{fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400}}>Main Phase</span>
          </h2>
          <ExerciseList items={routine.main} />
          
          <button 
            className="btn-primary" 
            style={{marginTop: '30px', padding: '16px', fontSize: '1.2rem'}}
            onClick={onMarkComplete}
          >
            <CheckCircle2 size={24} /> Mark Day {streak + 1} as Done!
          </button>
        </>
      )}
    </div>
  );
};

export default Dashboard;
