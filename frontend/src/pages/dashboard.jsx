function Dashboard({ workouts, onDeleteWorkout }) {
  const totalWeight = workouts.reduce((acc, workout) => {
    const weight = workout.weight || 0;
    const reps = workout.reps || 0;
    return acc + (weight * reps);
  }, 0);

  const stats = [
    { label: "Total Workouts", value: workouts.length.toString(), color: "#3b82f6" },
    { label: "Active Streak", value: "4 days", color: "#10b981" },
    { label: "Weight Lifted", value: `${totalWeight.toLocaleString()} lbs`, color: "#8b5cf6" }
  ];



  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h2>Welcome back, Champion!</h2>
        <p>Here is your progress summary for this week.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <span className="stat-label">{stat.label}</span>
            <span className="stat-value" style={{ color: stat.color }}>{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="recent-section">
        <h3>Recent Workouts</h3>
        <div className="workouts-list">
          {workouts.map((workout) => (
            <div key={workout.id} className="workout-row">
              <div className="workout-info">
                <div className="workout-main-info">
                  <span className="workout-date">{workout.date}</span>
                  <span className="workout-type">{workout.type}</span>
                </div>
                {workout.weight && workout.reps ? (
                  <div className="workout-details">
                    {workout.weight} lbs × {workout.reps} reps
                  </div>
                ) : null}
              </div>

              <div className="workout-actions">
                <span className="workout-duration">{workout.duration}</span>
                <button 
                  className="delete-btn" 
                  onClick={() => onDeleteWorkout(workout.id)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

