import StrapiService from '../services/StrapiService';
import { makeObservable, observable, computed, action } from 'mobx';
import Bauble from '../models/Bauble';
// https://mobx.js.org/observable-state.html

class TreeStore {
  constructor() {
    this.trees = [];
    this.loading = true;
    this.strapiService = new StrapiService();

    makeObservable(this, {
      loading: observable,
      baubles: observable,
      loadAllBaubles: action,
      addBauble: action,
      getBaubleById: action,
      baubleFromUser: computed,
      removeBaubleFromUser: action,
    });
  }

  createTree = async (tree) => {
    const baubleJson = bauble.asJson;
    const json = await this.strapiService.createBauble(baubleJson);
    await bauble.setId(json.id);
    this.updateBaubleFromServer(json);
  };

  updateTreeFromServer(json) {
    let bauble = this.baubles.find((bauble) => bauble.id === json.id);

    if (!bauble) {
      bauble = new Bauble({
        id: json.id,
        name: json.name,
        x: json.x,
        y: json.y,
        z: json.z,
        text: json.text,
        location: json.location,
        origin: 'data',
        store: this,
      });
    }
  }

  // 1 TREE
  addBauble(bauble) {
    this.baubles.push(bauble);
  }

  getBaubleById = (id) => this.baubles.find((bauble) => bauble.id === id);

  get baubleFromUser() {
    return this.baubles.find((bauble) => bauble.origin === 'user');
  }

  removeBaubleFromUser() {
    const bauble = this.baubles.find((bauble) => bauble.origin === 'user');
    this.baubles.remove(bauble);
  }
}

export default TreeStore;
