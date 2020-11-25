import React from 'react';
import { Navbar } from './components/UI';
import { Home } from './components/Pages';
import { ViewProvider, DetailProvider, BaublesProvider } from './contexts/index';
import './App.scss';
import { CanvasWrapper } from './components/Scene';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router';

const App = () => {
  return (
    <>
      <div className="noise" />

      <Navbar />
      <ViewProvider>
        <DetailProvider>
          <BaublesProvider>
            <CanvasWrapper />
          </BaublesProvider>
        </DetailProvider>
        <Switch>
          {/* <Router>
            <Route path={['/:id', '/']} component={Home} />
          </Router> */}
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </ViewProvider>
      
    </>
  );
};

export default App;
