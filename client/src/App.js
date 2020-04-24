import React from 'react';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import NavBar from './components/NavBar';

function App() {
  const { login, logout, token, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider
      value={{ login, logout, token, userId, isAuthenticated }}
    >
      <Router>
        {isAuthenticated && <NavBar />}
        <div className="container m-auto">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
