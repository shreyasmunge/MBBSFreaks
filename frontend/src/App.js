import React, { useState, useEffect } from 'react';
import Login from './login';
import Signup from './Signup';  // Create this component as you have Login
import PDFList from './PDFList';
import StripeCheckout from './StripeCheckout';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPaidUser, setIsPaidUser] = useState(false);
  const [showLogin, setShowLogin] = useState(true); // toggle Login/Signup

  useEffect(() => {
    async function checkAuth() {
      // Replace with real auth status check from backend
      setIsLoggedIn(false);
      setIsPaidUser(false);
    }
    checkAuth();
  }, []);

  if (!isLoggedIn) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h1>MBBSFreaks Resources</h1>
        <div>
          <button onClick={() => setShowLogin(true)} disabled={showLogin}>Login</button>
          <button onClick={() => setShowLogin(false)} disabled={!showLogin}>Signup</button>
        </div>
        {showLogin ? (
          <Login onLogin={() => setIsLoggedIn(true)} />
        ) : (
          <Signup />
        )}
      </div>
    );
  }

  return (
    <div>
      <h1>MBBSFreaks Resources - PDF Platform</h1>
      {!isPaidUser && (
        <div>
          <h3>Upgrade to access all PDFs</h3>
          <StripeCheckout />
        </div>
      )}
      <PDFList />
    </div>
  );
}

export default App;
