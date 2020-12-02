import { makeObservable, observable, computed, action } from 'mobx';

class Tree {
  constructor({ store, id, name }) {
    this.store = store;
    this.id = id;
    this.name = name;
    this.store.addTree(this);

    if (!store) {
      throw new Error('No store detected');
    }
  }

  create = async () => this.store.createTree(this);
}

export default Tree;
