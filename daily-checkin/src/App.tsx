// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import CheckinForm from './components/CheckinForm'
import Dashboard from './components/Dashboard';
import AuthGate from './components/AuthGate';
import GratitudeCorner from './components/GratitudeCorner';

function App() {
  return (
    
    <AuthGate>
      <div className="app-container" style={{ display: 'flex' , flexDirection: 'row', gap: '2rem' }}>
      <div className="container">
      <GratitudeCorner />
      </div>
        <div className="container">
          <h1>Daily Check-in</h1>
          <CheckinForm />
          <Dashboard />
          <br>
          </br>
          <div>
            <button onClick={() => {
              localStorage.removeItem("auth-ok");
              window.location.reload();
            }}>
              Log out
            </button>
          </div>
        </div>
      </div>
      
      
    </AuthGate>
  );
}

export default App
