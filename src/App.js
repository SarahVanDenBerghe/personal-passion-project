import React, { useState, Suspense } from 'react';
import { Navbar } from './components/UI';
import { Home } from './components/Pages';
import { Sidebar } from './components/UI';
import { BaublesProvider, ViewProvider } from './contexts/index';
import './App.scss';
import { CanvasWrapper } from './components/Scene';

import { Route, Link } from 'react-router-dom';
import { Switch } from 'react-router';

const App = () => {
  const [baublePreview, setBaublePreview] = useState(null);

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
