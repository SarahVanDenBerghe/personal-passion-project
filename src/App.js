import React, { useState } from 'react';
import { Navbar, Loader } from './components/UI';
import { Detail, Add, Tree, Home } from './components/Pages';
import { AddBauble, AddInfo } from './components/Content';
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
  // baublesStore.removeBaubleFromUser();
  const [showContent, setShowContent] = useState(false);
  let location = useLocation();
  const bauble = baublesStore.baubleFromUser;
  // https://stackoverflow.com/questions/56711663/react-router-v5-0-nested-routes

  return (
    <>
      {/* Style elements */}
      <div className="noise" />
      <Particles className="particles" params={particlesConfig} />
      <AnimatedCursor outerAlpha={0.3} color="255, 255, 255" />

      {/* Animated loader */}
      {/* <Loader setShowContent={setShowContent} loading={baublesStore.loading} /> */}

      {/* showContent is set to true after a delay for smooth transition */}
      {/* {showContent && ( */}
      <>
        {/* Canvas & navbar are always shown */}
        <Navbar />
        {/* <CanvasWrapper /> */}

        {/* TransitionGroup & CSSTransition give time to animate page transitions */}
        <TransitionGroup className="transition">
          <CSSTransition key={location.pathname} timeout={500}>
            <Switch location={location}>
              <Route exact path={ROUTES.detail.path} component={Detail} />
              <Route exact path={ROUTES.add.secondstep} component={AddInfo} />
              <Route exact path={ROUTES.add.firststep} component={AddBauble} />
              <Route exact path={ROUTES.add.root} component={Add} />
              {/* <Route exact path={ROUTES.detail.path} component={Detail} /> */}

              <Route exact path={ROUTES.home} component={Home} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </>
      {/* )} */}
    </>
  );
};

export default App;
