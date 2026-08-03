import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import LogWorkout from './pages/LogWorkout.jsx';
import Analytics from './pages/Analytics.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/workouts');
        const data = await res.json();
        setWorkouts(data);
      } catch (err) {
        console.error(err);
      }
    };
    getWorkouts();
  }, []);

  const handleAddWorkout = async (newWorkout) => {
    try {
      const res = await fetch('http://localhost:5000/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newWorkout)
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


  return (
    <div className="app-container">
      <Header />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="app-main">
        {renderContent()}
      </main>
    </div>
  );
}






export default App;
