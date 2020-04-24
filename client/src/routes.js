import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Page from './components/Page';
import Auth from './components/Auth';
import { StateProvider } from './context/localStorage';
import NavBar from './components/NavBar';

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <StateProvider>
          <Route path="/home" exact>
            <Page />
          </Route>
          <Redirect to="/home" />
        </StateProvider>
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exact>
        <Auth />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
