import { socket } from '../services/StrapiService';
import BaublesStore from './BaublesStore';
import TreeStore from './TreeStore';

class RootStore {
  constructor() {
    this.baublesStore = new BaublesStore(this);
    this.treeStore = new TreeStore(this);
    this.socket = socket;

    this.socket.on('bauble', ({ bauble, id }) => {
      this.baublesStore.createBaubleFromSocket({ bauble, id });
    });
  }
}

export default RootStore;
