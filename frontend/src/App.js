import React, { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Jobs from './components/Jobs';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [loggedInUser, setLoggedInUser] = useState('');

  const handleLoginSuccess = (username) => {
    setLoggedInUser(username);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setLoggedInUser('');
    setCurrentPage('login');
  };

  return (
    <div className="App">
      {currentPage === 'login' && (
        <Login
          switchToSignup={() => setCurrentPage('signup')}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {currentPage === 'signup' && (
        <Signup switchToLogin={() => setCurrentPage('login')} />
      )}
      {currentPage === 'dashboard' && (
        <Dashboard
          username={loggedInUser}
          onLogout={handleLogout}
          onProfile={() => setCurrentPage('profile')}
          onFindJobs={() => setCurrentPage('jobs')}
        />
      )}
      {currentPage === 'profile' && (
        <Profile
          username={loggedInUser}
          onBack={() => setCurrentPage('dashboard')}
        />
      )}
      {currentPage === 'jobs' && (
        <Jobs
          username={loggedInUser}
          onBack={() => setCurrentPage('dashboard')}
        />
      )}
    </div>
  );
}

export default App;