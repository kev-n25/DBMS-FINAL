import React, { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  return (
    <div className="App">
      {currentPage === 'login' ? (
        <Login switchToSignup={() => setCurrentPage('signup')} />
      ) : (
        <Signup switchToLogin={() => setCurrentPage('login')} />
      )}
    </div>
  );
}

export default App;