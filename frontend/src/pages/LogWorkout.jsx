import { useState } from 'react';

function LogWorkout({ onAddWorkout }) {
  const [exercise, setExercise] = useState('');
  const [category, setCategory] = useState('Push');
  const [duration, setDuration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!exercise || !duration) return;

    const newWorkout = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      type: `${category} (${exercise})`,
      duration: `${duration} mins`
    };

    onAddWorkout(newWorkout);
    setExercise('');
    setDuration('');
  };


  return (
    <div className="log-workout-content">
      <div className="dashboard-header">
        <h2>Log a New Workout</h2>
        <p>Record your session to keep your streak active.</p>
      </div>

      <form onSubmit={handleSubmit} className="workout-form">
        <div className="form-group">
          <label>Exercise Name</label>
          <input
            type="text"
            placeholder="e.g. Bench Press, Squats"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Workout Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Push">Push (Chest/Shoulders/Triceps)</option>
            <option value="Pull">Pull (Back/Biceps)</option>
            <option value="Legs">Legs (Squats/Quads/Calves)</option>
            <option value="Cardio">Cardio & Core</option>
          </select>
        </div>

        <div className="form-group">
          <label>Duration (minutes)</label>
          <input
            type="number"
            placeholder="e.g. 45"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-btn">
          Save Workout
        </button>
      </form>
    </div>
  );
}

export default LogWorkout;
