import BaublesStore from './BaublesStore';
import TreeStore from './TreeStore';

class RootStore {
  constructor() {
    this.baublesStore = new BaublesStore(this);
    this.treeStore = new TreeStore(this);
  }
}

export default RootStore;
