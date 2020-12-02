import StrapiService from '../services/StrapiService';
import { makeObservable, observable, computed, action } from 'mobx';
import Bauble from '../models/Bauble';
// https://mobx.js.org/observable-state.html

class TreeStore {
  constructor() {
    this.tree = {};
    this.strapiService = new StrapiService();

    makeObservable(this, {
      tree: observable,
    });
  }

  // Back-end
  createTree = async (tree) => {
    const treeJson = tree.asJson;
    const json = await this.strapiService.createTree(treeJson);
  };

  // Front-end
  addTree(tree) {
    this.tree = tree;
  }
}

export default TreeStore;
