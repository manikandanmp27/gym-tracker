function Dashboard() {
  const stats = [
    { label: "Total Workouts", value: "12", color: "#3b82f6" },
    { label: "Active Streak", value: "4 days", color: "#10b981" },
    { label: "Weight Lifted", value: "4,500 lbs", color: "#8b5cf6" }
  ];

  const workouts = [
    { id: 1, date: "Oct 12", type: "Push (Chest/Shoulders)", duration: "45 mins" },
    { id: 2, date: "Oct 10", type: "Pull (Back/Biceps)", duration: "50 mins" },
    { id: 3, date: "Oct 09", type: "Leg Day", duration: "60 mins" },
    { id: 4, date: "Oct 08", type: "Cardio & Core", duration: "30 mins" }

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
              <div>
                <span className="workout-date">{workout.date}</span>
                <span className="workout-type">{workout.type}</span>
              </div>
              <span className="workout-duration">{workout.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
