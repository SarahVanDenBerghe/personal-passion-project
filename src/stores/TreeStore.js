import StrapiService from '../services/StrapiService';
import { makeObservable, observable, action } from 'mobx';
import Tree from '../models/Tree';

class TreeStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.currentTree = {};
    this.loading = true;
    this.strapiService = new StrapiService();

    makeObservable(this, {
      loading: observable,
      currentTree: observable,
      findTreeById: action,
      createTree: action,
      // setCurrentTree: action,
    });
  }

  createTree = async (tree) => {
    const treeJson = tree.asJson;
    const json = await this.strapiService.createTree(treeJson);
    tree.setId(json.id);
  };

  // setCurrentTree(tree) {
  //   this.currentTree = tree;
  // }

  findTreeById = async (id) => {
    const json = await this.strapiService.findTreeById(id);

    const tree = new Tree({
      id: json.id,
      name: json.name,
      store: this,
    });

    json.messages.forEach((json) => this.rootStore.baublesStore.updateBaubleFromServer(json));
    this.currentTree = tree;
    if (this.loading) {
      this.loading = false;
    }
  };
}

export default TreeStore;
