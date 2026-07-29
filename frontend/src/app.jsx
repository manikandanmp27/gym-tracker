import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import LogWorkout from './pages/LogWorkout.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem('workouts');
    return saved ? JSON.parse(saved) : [
      { id: 1, date: "Oct 12", type: "Push (Chest/Shoulders)", duration: "45 mins" },
      { id: 2, date: "Oct 10", type: "Pull (Back/Biceps)", duration: "50 mins" },
      { id: 3, date: "Oct 09", type: "Leg Day", duration: "60 mins" },
      { id: 4, date: "Oct 08", type: "Cardio & Core", duration: "30 mins" }
    ];
  });

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }, [workouts]);

  const handleAddWorkout = (newWorkout) => {
    setWorkouts([newWorkout, ...workouts]);
    setActiveTab('dashboard');
  };


  return (
    <div className="app-container">
      <Header />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="app-main">
        {activeTab === 'dashboard' ? (
          <Dashboard workouts={workouts} />
        ) : (
          <LogWorkout onAddWorkout={handleAddWorkout} />
        )}
      </main>
    </div>
  );
}






export default App;


