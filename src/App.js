import React from 'react';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import AuthUser from './components/auth/AuthUser';
import Guest from './components/navbar/guest';
import Auth from './components/navbar/auth';
import './App.css';
 
function App () {
    const { getToken } = AuthUser();

    if (!getToken()) {
        return (



            <Guest />
        );
    }

    return (
        <Auth />

    );
}

export default App;