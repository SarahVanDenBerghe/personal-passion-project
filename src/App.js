import React, { useState } from 'react';
import { Navbar, Loader } from './components/UI';
import { Home, Detail, Add } from './components/Pages';
import { AddIntro, AddBauble, AddInfo } from './components/Content';
import { CanvasWrapper } from './components/Scene';
import AnimatedCursor from 'react-animated-cursor';
import { Route, Redirect } from 'react-router-dom';
import { Switch, useLocation } from 'react-router';
import { ROUTES } from './consts';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Particles from 'react-particles-js';
import particlesConfig from './assets/configs/particles-config';
import { useBaublesStore } from './hooks';
import './App.scss';

const App = () => {
  const baublesStore = useBaublesStore();
  const [showContent, setShowContent] = useState(false);
  let location = useLocation();
  const bauble = baublesStore.baubleFromUser;

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
              <Switch location={location}>
                <Route exact path={ROUTES.detail.path} component={Detail} />
                {/* <Route path={ROUTES.add.to} component={Add} /> */}

                <Route exact path={ROUTES.add.to + '/' + ROUTES.add.secondstep}>
                  {bauble ? <AddInfo /> : <Redirect to="/" />}
                </Route>

                <Route exact path={ROUTES.add.to + '/' + ROUTES.add.firststep} component={AddBauble} />
                <Route exact path={ROUTES.add.to} component={AddIntro} />

                <Route exact path={ROUTES.home} component={Home} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </>
      )}
    </>
  );
};

export default App;
