import React, { useContext, useState } from 'react';
import { Navbar, Loader, Sidebar } from './components/UI';
import { Home, Detail } from './components/Pages';
import './App.scss';
import { CanvasWrapper } from './components/Scene';
import AnimatedCursor from 'react-animated-cursor';
import { Route } from 'react-router-dom';
import { BaublesContext } from './contexts/BaublesContext';
import { Switch } from 'react-router';
import { ROUTES } from './consts';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useLocation } from 'react-router';

const App = () => {
  const [baubles, setBaubles, loading] = useContext(BaublesContext);
  const [showContent, setShowContent] = useState(false);
  let location = useLocation();

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
          {/* Canvas & navbar are always shown */}
          <Navbar />
          <CanvasWrapper />

          {/* TransitionGroup & CSSTransition give time to animate page transitions */}
          <TransitionGroup>
            <CSSTransition key={location.pathname} timeout={500}>
              <Switch location={location}>
                <Route path={ROUTES.detail.path}>
                  <Detail />
                </Route>
                <Route exact path={ROUTES.home}>
                  <Home />
                </Route>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </>
      )}
    </>
  );
};

export default App;
