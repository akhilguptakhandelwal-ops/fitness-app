import React, { useState } from 'react';

const WeeklyPrompt = ({ onSaveWeight }) => {
  const [weight, setWeight] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (weight && !isNaN(weight)) {
      onSaveWeight(weight);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '10px', color: 'var(--accent)' }}>Weekly Check-In</h2>
        <p style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>
          Please log your current weight to adjust your personalized routines.
        </p>
        <form onSubmit={handleSubmit}>
          <input 
            type="number" 
            step="0.1"
            placeholder="Weight in kg" 
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
            autoFocus
          />
          <button type="submit" className="btn-primary">
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default WeeklyPrompt;
