function Sidebar({ activeTab, setActiveTab }) {
  const getQuoteOfDay = () => {
    const quotes = [
      "The only bad workout is the one that did not happen.",
      "Your body can stand almost anything. Convince your mind.",
      "No pain, no gain. Shut up and train.",
      "Strength comes from an indomitable will.",
      "Success starts with self-discipline.",
      "Action is the foundational key to all progress.",
      "Make yourself proud today."
    ];
    const day = new Date().getDay();
    return quotes[day];
  };

  return (
    <aside className="app-sidebar">
      <nav className="sidebar-nav">
        <ul>
          <li 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </li>
          <li 
            className={`nav-item ${activeTab === 'log' ? 'active' : ''}`}
            onClick={() => setActiveTab('log')}
          >
            Log Workout
          </li>
          <li 
            className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </li>
          <li 
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </li>
        </ul>
      </nav>

      <div className="sidebar-quote">
        <span className="quote-icon">“</span>
        <p>{getQuoteOfDay()}</p>
      </div>
    </aside>
  );
}

export default Sidebar;

