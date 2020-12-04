const ROUTES = {
  home: '/',
  add: { root: '/add', firststep: '/add/place', secondstep: '/add/info' },
  tree: { path: '/tree/:treeId', to: '/tree/' },
  detail: { path: '/tree/:treeId/view/:baubleId', to: '/view/' },
  create: '/create',
};

export { ROUTES };
