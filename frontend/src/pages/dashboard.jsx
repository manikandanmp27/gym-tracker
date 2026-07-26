function Dashboard({ workouts }) {
  const stats = [
    { label: "Total Workouts", value: workouts.length.toString(), color: "#3b82f6" },
    { label: "Active Streak", value: "4 days", color: "#10b981" },
    { label: "Weight Lifted", value: "4,500 lbs", color: "#8b5cf6" }
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
