const ROUTES = {
  home: '/',
  add: { root: '/add', firststep: '/add/place', secondstep: '/add/info' },
  tree: { path: '/tree/:id', to: '/tree/' },
  detail: { path: '/view/:id', to: '/view/' },
};

export { ROUTES };
