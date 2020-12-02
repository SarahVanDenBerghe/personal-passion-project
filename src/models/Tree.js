import { makeObservable, observable, computed, action } from 'mobx';
import { uid } from 'uid';
import StrapiService from '../services/StrapiService';

class Tree {
  constructor({ store, name, id = uid() }) {
    this.store = store;
    this.id = id;
    this.name = name;
    // Front-end
    this.store.addTree(this);

    if (!store) {
      throw new Error('No store detected');
    }

    makeObservable(this, {
      id: observable,
      name: observable,
      create: action,
      asJson: computed,
    });
  }

  // Back-end
  create = async () => this.store.createTree(this);

  get asJson() {
    return {
      name: this.name,
      uid: this.id,
    };
  }
}

export default Tree;
