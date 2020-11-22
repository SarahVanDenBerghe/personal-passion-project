import React from 'react';
import { Navbar } from './components/UI';
import { Home } from './components/Pages';
import { ViewProvider } from './contexts/index';
import './App.scss';
import { CanvasWrapper } from './components/Scene';

import { Route } from 'react-router-dom';
import { Switch } from 'react-router';

const App = () => {
  return (
    <>
      <div className="noise" />
      <Navbar />
      <ViewProvider>
        <CanvasWrapper />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </ViewProvider>
    </>
  );
};

export default App;
