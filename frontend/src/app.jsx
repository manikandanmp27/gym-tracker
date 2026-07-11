import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Sidebar />

      <main className="app-main">
        <Dashboard />
      </main>
    </div>
  );
}


export default App;


