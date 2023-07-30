import React from 'react';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import { ThemeProvider } from 'react-bootstrap';
import theme from './theme';
import AuthUser from './components/auth/AuthUser';
import Auth from './components/navbar/auth';
import './App.css';
import Welcome from './components/Welcome';
import './'
function App() {
  const { getToken } = AuthUser();

  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        {getToken() ? <Auth /> : <Welcome />}
      </div>
    </ThemeProvider>
  );
}

export default App;
