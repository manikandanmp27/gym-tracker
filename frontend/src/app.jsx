import { useState } from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="app-container">
      <Header />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="app-main">
        {activeTab === 'dashboard' ? (
          <Dashboard />
        ) : (
          <div>Log Workout Page (Coming Soon!)</div>
        )}
      </main>
    </div>
  );
}



export default App;


