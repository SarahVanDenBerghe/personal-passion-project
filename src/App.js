import React, { useState } from 'react';
import { Navbar, Loader, TreeLayout } from './components/UI';
import { Detail, Add, Tree, Home, Create } from './components/Pages';
import { AddBauble, AddInfo } from './components/Content';
import { CanvasWrapper } from './components/Scene';
import AnimatedCursor from 'react-animated-cursor';
import { Route, Redirect } from 'react-router-dom';
import { Switch, useLocation } from 'react-router';
import { ROUTES } from './consts';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Particles from 'react-particles-js';
import particlesConfig from './assets/configs/particles-config';
import { useStore } from './hooks';
import './App.scss';

const App = () => {
  const { baublesStore } = useStore();
  // baublesStore.removeBaubleFromUser();
  const [showContent, setShowContent] = useState(false);
  let location = useLocation();
  const bauble = baublesStore.baubleFromUser;
  const isTree = 'tree' === location.pathname.split('/')[1];
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
        <Navbar />
        {isTree && <CanvasWrapper />}
        {/* TransitionGroup & CSSTransition give time to animate page transitions */}
        <TransitionGroup className="transition">
          <CSSTransition key={location.pathname} timeout={500}>
            <Switch location={location}>
              <Route path={ROUTES.tree.path} component={Tree} />
              <Route exact path={ROUTES.create} component={Create} />
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
