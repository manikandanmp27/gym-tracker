import { useState } from 'react';

function Profile({ workouts, currentUser }) {
  const safeWorkouts = Array.isArray(workouts) ? workouts : [];
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const heaviestLift = safeWorkouts.reduce((max, w) => {
    const weight = w.weight || 0;
    return weight > max ? weight : max;
  }, 0);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError('All fields are required');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: currentUser.id,
          currentPassword,
          newPassword
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Password update failed');
        return;
      }

      setSuccess('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="profile-content">
      <div className="dashboard-header">
        <h2>Your Profile</h2>
        <p>Manage your account settings and view training summaries.</p>
      </div>

      <div className="profile-grid">
        <div className="profile-card stats-card-item">
          <h3>Account Info</h3>
          <div className="profile-info-row">
            <span className="profile-info-label">Username</span>
            <span className="profile-info-value">{currentUser?.username}</span>
          </div>
          <div className="profile-info-row">
            <span className="profile-info-label">Total Logs</span>
            <span className="profile-info-value">{safeWorkouts.length} sessions</span>
          </div>
          <div className="profile-info-row">
            <span className="profile-info-label">Heaviest Lift</span>
            <span className="profile-info-value">{heaviestLift} lbs</span>
          </div>
        </div>

        <div className="profile-card change-password-card">
          <h3>Change Password</h3>
          
          {error && <div className="auth-error">{error}</div>}
          {success && <div className="profile-success">{success}</div>}

          <form onSubmit={handleSubmit} className="profile-password-form">
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="submit-btn">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
