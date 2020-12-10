import React, { useState } from 'react';
import { Navbar } from './components/UI';
import { Tree, Home, Create } from './components/Pages';
import { CanvasWrapper } from './components/Scene';
import AnimatedCursor from 'react-animated-cursor';
import { Route } from 'react-router-dom';
import { Switch, useLocation } from 'react-router';
import { ROUTES } from './consts';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Particles from 'react-particles-js';
import particlesConfig from './assets/configs/particles-config';
import { useStore } from './hooks';

import './App.scss';

const App = () => {
  const { treeStore } = useStore();
  const [showTree, setShowTree] = useState(false);
  let location = useLocation();
  const isTree = 'tree' === location.pathname.split('/')[1];

  if (isTree) {
    const treeId = location.pathname.split('/')[2];
    treeStore.findTreeById(treeId);
  }

  return (
    <>
      {/* Style elements */}
      <div className="noise" />
      <Particles className="particles" params={particlesConfig} />
      <AnimatedCursor outerAlpha={0.3} color="255, 255, 255" />

      <Navbar />
      {isTree && showTree && treeStore.currentTree && <CanvasWrapper />}

      {/* TransitionGroup & CSSTransition give time to animate page transitions */}
      <TransitionGroup className="transition">
        <CSSTransition key={location.pathname} timeout={500}>
          <Switch location={location}>
            <Route path={ROUTES.tree.path}>
              <Tree setShowTree={setShowTree} showTree={showTree} />
            </Route>
            <Route exact path={ROUTES.create} component={Create} />
            <Route exact path={ROUTES.home} component={Home} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
};

export default App;
