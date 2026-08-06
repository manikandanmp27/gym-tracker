import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import LogWorkout from './pages/LogWorkout.jsx';
import Analytics from './pages/Analytics.jsx';
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [workouts, setWorkouts] = useState([]);
  const [authView, setAuthView] = useState('login');
  
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('user');
    }
  }, [currentUser]);

  useEffect(() => {
    const getWorkouts = async () => {
      if (!currentUser) return;
      try {
        const res = await fetch(`http://localhost:5000/api/workouts?userId=${currentUser.id}`);
        const data = await res.json();
        setWorkouts(data);
      } catch (err) {
        console.error(err);
      }
    };
    getWorkouts();
  }, [currentUser]);

  const handleAddWorkout = async (newWorkout) => {
    try {
      const res = await fetch('http://localhost:5000/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...newWorkout, user_id: currentUser.id })
      });
      const data = await res.json();
      setWorkouts([data, ...workouts]);
      setActiveTab('dashboard');
    } catch (err) {
      console.error(err);
    }
  };



  const handleDeleteWorkout = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this workout log?");
    if (isConfirmed) {
      try {
        await fetch(`http://localhost:5000/api/workouts/${id}`, {
          method: 'DELETE'
        });
        setWorkouts(workouts.filter(workout => workout.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setWorkouts([]);
    setActiveTab('dashboard');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard workouts={workouts} onDeleteWorkout={handleDeleteWorkout} />;
      case 'log':
        return <LogWorkout onAddWorkout={handleAddWorkout} />;
      case 'analytics':
        return <Analytics workouts={workouts} />;
      default:
        return <Dashboard workouts={workouts} onDeleteWorkout={handleDeleteWorkout} />;
    }
  };

  if (!currentUser) {
    if (authView === 'login') {
      return (
        <Login 
          onSwitchToSignup={() => setAuthView('signup')} 
          onLoginSuccess={(user) => setCurrentUser(user)} 
        />
      );
    }
    return (
      <Signup 
        onSwitchToLogin={() => setAuthView('login')} 
        onSignupSuccess={(user) => {
          setCurrentUser(user);
          setAuthView('login');
        }} 
      />
    );
  }

  return (
    <div className="app-container">
      <Header currentUser={currentUser} onLogout={handleLogout} />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="app-main">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
