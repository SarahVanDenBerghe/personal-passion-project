import React, { useContext, useState } from 'react';
import { Navbar, Loader } from './components/UI';
import { Home } from './components/Pages';
import { ViewProvider, DetailProvider } from './contexts/index';
import './App.scss';
import { CanvasWrapper } from './components/Scene';
import AnimatedCursor from 'react-animated-cursor';
import { Route } from 'react-router-dom';
import { BaublesContext } from './contexts/BaublesContext';
import { Switch } from 'react-router';

const App = () => {
  const [baubles, setBaubles, loading] = useContext(BaublesContext);
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      {/* Style elements */}
      <div className="noise" />
      <AnimatedCursor outerAlpha={0.3} color="255, 255, 255" />

      {/* Animated loader */}
      <Loader setShowContent={setShowContent} loading={loading} />

      {/* showContent is set to true after a delay for smooth transition */}
      {showContent && (
        <>
          <Navbar />
          <ViewProvider>
            {/* Canvas is always shown */}
            <DetailProvider>
              <CanvasWrapper />
            </DetailProvider>

            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/view/:id" exact></Route>
            </Switch>
          </ViewProvider>
        </>
      )}
    </>
  );
};

export default App;
