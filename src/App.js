import React, { useState } from 'react';
import {Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import AuthUser from './components/auth/AuthUser';
import Guest from './components/navbar/guest';
import Auth from './components/navbar/auth';
import './App.css';
import Welcome from './components/Welcome';
function App() {
  const { getToken } = AuthUser();
  const [showWelcome, setShowWelcome] = useState(true);

  const handleJoinNow = () => {
    setShowWelcome(false);
  };

  return (
 <>
        <Routes>
          {/* Show Welcome when the app is first visited */}
          {showWelcome && <Route path="/" element={<Welcome handleJoinNow={handleJoinNow} />} />}

          {/* Authenticated routes */}
          <Route path="/auth/*" element={<Auth />} />

          {/* Guest route */}
          <Route path="/guest" element={<Guest />} />

          {/* Add other routes here */}
          {/* <Route path="/some-other-route" element={<SomeComponent />} /> */}

          {/* Fallback route */}
          <Route path="*" element={<p>404 Not Found</p>} />
        </Routes>
      
      </>

  );
}

export default App;
