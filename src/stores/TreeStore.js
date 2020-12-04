import StrapiService from '../services/StrapiService';
import { makeObservable, observable, computed, action } from 'mobx';
import Tree from '../models/Tree';
import { io } from 'socket.io-client';
// https://socket.io/docs/v3/client-api/index.html

class TreeStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.currentTree = {};
    this.strapiService = new StrapiService();

    makeObservable(this, {
      currentTree: observable,
      findTreeById: action,
      createTree: action,
    });

    // this.rootStore.socket.on('tree', (res) => console.log(res));
  }

  createTree = async (tree) => {
    const treeJson = tree.asJson;
    const json = await this.strapiService.createTree(treeJson);
    tree.setId(json.id);
  };

  addTree(tree) {
    this.currentTree = tree;
  }

  findTreeById = async (id) => {
    const json = await this.strapiService.findTreeById(id);

    const tree = new Tree({
      id: json.id,
      name: json.name,
      store: this,
    });

    json.messages.forEach((json) => this.rootStore.baublesStore.updateBaubleFromServer(json));
    this.currentTree = tree;
  };
}

export default TreeStore;
