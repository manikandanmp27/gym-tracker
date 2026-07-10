import Header from './components/Header.jsx';

function App() {
  return (
    <div className="app-container">
      <Header />

      <aside className="app-sidebar">

        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Log Workout</li>
            <li>Analytics</li>
          </ul>
        </nav>
      </aside>

      <main className="app-main">
        <h1>My Personal Workout Space</h1>
        <p>This is where your workouts and graphs will appear!</p>
      </main>
    </div>
  );
}

export default App;


