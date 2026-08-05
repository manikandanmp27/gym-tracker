function Header({ currentUser, onLogout }) {
  return (
    <header className="app-header">
      <div className="header-logo">
        <span>🏋️‍♂️</span>
        <span>GymTracker</span>
      </div>
      <div className="header-profile">
        <span>{currentUser?.username}</span>
        <div className="profile-avatar">
          {currentUser?.username?.[0]?.toUpperCase()}
        </div>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}


export default Header;
