import React, { useContext } from 'react';
import { Navbar } from './components/UI';
import { Home } from './components/Pages';
import {
  ViewProvider,
  DetailProvider,
} from './contexts/index';
import './App.scss';
import { CanvasWrapper } from './components/Scene';
import AnimatedCursor from 'react-animated-cursor';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { BaublesContext } from './contexts/BaublesContext';
import { Switch } from 'react-router';

const App = () => {
  const [baubles, setBaubles, loading] = useContext(BaublesContext);

  return (
    <>
      <div className="noise" />
      <AnimatedCursor outerAlpha={0.3} color="255, 255, 255" />

      {!loading ? (
        <>
          <Navbar />
          <ViewProvider>
            <DetailProvider>
              <CanvasWrapper />
              {/* <BaublesProvider>
            <CanvasWrapper />
          </BaublesProvider> */}
            </DetailProvider>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </ViewProvider>
        </>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default App;
