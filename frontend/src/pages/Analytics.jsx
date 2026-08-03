function Analytics({ workouts }) {
  const categories = ['Push', 'Pull', 'Legs', 'Cardio'];

  const data = categories.map(cat => {
    const count = workouts.filter(w => w.type.startsWith(cat)).length;
    return { name: cat, count };
  });

  const maxCount = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="analytics-content">
      <div className="dashboard-header">
        <h2>Workout Analytics</h2>
        <p>A breakdown of your training sessions by category.</p>
      </div>

      <div className="analytics-card">
        <h3>Training Distribution</h3>
        <div className="chart-container">
          {data.map((item, index) => {
            const percentage = (item.count / maxCount) * 100;
            return (
              <div key={index} className="chart-bar-group">
                <div className="chart-label-group">
                  <span className="chart-label-name">{item.name}</span>
                  <span className="chart-label-val">{item.count} sessions</span>
                </div>
                <div className="chart-bar-bg">
                  <div 
                    className="chart-bar-fill" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Analytics;
