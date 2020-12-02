import { makeObservable, observable, computed, action, ObservableSet } from 'mobx';

class Tree {
  constructor({ store, name, id }) {
    this.store = store;
    this.id = id;
    this.name = name;

    makeObservable(this, {
      id: observable,
      name: observable,
      create: action,
      asJson: computed,
      setId: action,
    });
  }

  create = async () => this.store.createTree(this);
  find = async () => this.store.findTree(this);

  get asJson() {
    return {
      name: this.name,
    };
  }

  setId(id) {
    this.id = parseFloat(id);
  }
}

export default Tree;
