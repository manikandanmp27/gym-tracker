function Dashboard({ workouts, onDeleteWorkout }) {
  const getPR = (keyword) => {
    const matching = workouts.filter(w => 
      w.type.toLowerCase().includes(keyword.toLowerCase())
    );

    if (matching.length === 0) return "0 lbs";

    const prWorkout = matching.reduce((max, curr) => {
      const currentWeight = curr.weight || 0;
      const maxWeight = max.weight || 0;
      if (currentWeight > maxWeight) {
        return curr;
      } else if (currentWeight === maxWeight) {
        return curr.reps > max.reps ? curr : max;
      }
      return max;
    }, { weight: 0, reps: 0 });

    return `${prWorkout.weight} lbs × ${prWorkout.reps} reps`;
  };

  const calculateStreak = () => {
    if (workouts.length === 0) return "0 days";

    const uniqueDates = [...new Set(workouts.map(w => {
      const d = w.id > 100000 ? new Date(w.id) : new Date();
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    }))].sort((a, b) => b - a);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    if (uniqueDates[0] !== today.getTime() && uniqueDates[0] !== yesterday.getTime()) {
      return "0 days";
    }

    let streak = 1;
    for (let i = 0; i < uniqueDates.length - 1; i++) {
      const diff = uniqueDates[i] - uniqueDates[i + 1];
      const oneDay = 24 * 60 * 60 * 1000;
      if (diff === oneDay) {
        streak++;
      } else if (diff > oneDay) {
        break;
      }
    }

    return `${streak} ${streak === 1 ? 'day' : 'days'}`;
  };

  const stats = [
    { label: "Bench Press PR", value: getPR("bench"), color: "#3b82f6" },
    { label: "Squat PR", value: getPR("squat"), color: "#10b981" },
    { label: "Deadlift PR", value: getPR("deadlift"), color: "#8b5cf6" },
    { label: "Active Streak", value: calculateStreak(), color: "#f59e0b" }
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

