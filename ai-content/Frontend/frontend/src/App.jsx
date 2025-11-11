// src/App.jsx
// src/App.jsx
import React, { useState } from 'react';
import Generator from './Components/Generator'; // your AI Component
import LoginPage from './Components/LoginPage'; // new Login Component

function App() {
  // 'user' state .
  const [user, setUser] = useState(null); 

  const handleLoginSuccess = (username) => {
    setUser({ name: username });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      {/* check the user identity*/}
      {user ? (
        // --- user entry confirm(LOGGED IN) ---
        <>
          <div style={{ textAlign: 'right', padding: '10px', borderBottom: '1px solid #eee' }}>
            <span style={{ marginRight: '15px' }}>Welcome, **{user.name}**</span>
            <button onClick={handleLogout} style={{ padding: '8px 15px', backgroundColor: '#d9534f', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Log Out
            </button>
          </div>
          <Generator />
        </>
      ) : (
        // --- user not entry (LOGGED OUT) ---
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;