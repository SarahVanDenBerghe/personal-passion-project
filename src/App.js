import React, { useState } from 'react';
import { Navbar, Loader } from './components/UI';
import { Home, Detail, Add } from './components/Pages';
import { CanvasWrapper } from './components/Scene';
import AnimatedCursor from 'react-animated-cursor';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './consts';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useLocation } from 'react-router';
import Particles from 'react-particles-js';
import particlesConfig from './assets/configs/particles-config';
import { useBaublesStore } from './hooks';
import './App.scss';

const App = () => {
  const baublesStore = useBaublesStore();
  const [showContent, setShowContent] = useState(false);
  let location = useLocation();

  return (
    <>
      {/* Style elements */}
      <div className="noise" />
      <Particles className="particles" params={particlesConfig} />
      <AnimatedCursor outerAlpha={0.3} color="255, 255, 255" />

      {/* Animated loader */}
      <Loader setShowContent={setShowContent} loading={baublesStore.loading} />

      {/* showContent is set to true after a delay for smooth transition */}
      {showContent && (
        <>
          {/* Canvas & navbar are always shown */}
          <Navbar />
          <CanvasWrapper />

          {/* TransitionGroup & CSSTransition give time to animate page transitions */}
          <TransitionGroup>
            <CSSTransition key={location.pathname} timeout={500}>
              <Routes location={location}>
                <Route path={ROUTES.detail.path}>
                  <Detail />
                </Route>
                <Route path={ROUTES.add.to}>
                  <Add />
                </Route>
                <Route exact path={ROUTES.home}>
                  <Home />
                </Route>
              </Routes>
            </CSSTransition>
          </TransitionGroup>
        </>
      )}
    </>
  );
};

export default App;
