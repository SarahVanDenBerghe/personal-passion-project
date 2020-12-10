import StrapiService from '../services/StrapiService';
import { makeObservable, observable, action } from 'mobx';
import Tree from '../models/Tree';

class TreeStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.currentTree = undefined;
    this.loading = true;
    this.strapiService = new StrapiService();

    makeObservable(this, {
      loading: observable,
      currentTree: observable,
      findTreeById: action,
      setCurrentTree: action,
      createTree: action,
    });
  }

  createTree = async (tree) => {
    const treeJson = tree.asJson;
    const json = await this.strapiService.createTree(treeJson);
    tree.setId(json.id);
  };

  findTreeById = async (id) => {
    if (this.currentTree === undefined) {
      const data = await this.strapiService.findTreeById(id);
      if (data !== 404) {
        const tree = new Tree({
          id: data.id,
          name: data.name,
          store: this,
        });
        data.messages.forEach((data) => this.rootStore.baublesStore.updateBaubleFromServer(data));
        this.setCurrentTree(tree);
        if (this.loading) {
          this.loading = false;
        }
      } else {
        this.currentTree = undefined;
      }
    }
  };

  setCurrentTree = (tree) => {
    this.currentTree = tree;
  };
}

export default TreeStore;
