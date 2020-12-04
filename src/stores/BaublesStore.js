import StrapiService from '../services/StrapiService';
import { makeObservable, observable, computed, action } from 'mobx';
import Bauble from '../models/Bauble';
// https://mobx.js.org/observable-state.html

class BaublesStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.baubles = [];
    this.loading = true;
    this.strapiService = new StrapiService();

    makeObservable(this, {
      loading: observable,
      baubles: observable,
      // getAllBaublesByTreeId: action,
      addBauble: action,
      getBaubleById: action,
      baubleFromUser: computed,
      removeBaubleFromUser: action,
    });

    // const socket = io.connect('http://localhost:1337/');
    // socket.on('tree', (res) => console.log(res));
  }

  createBauble = async (bauble) => {
    const baubleJson = bauble.asJson;
    const json = await this.strapiService.createBauble(baubleJson);
    await bauble.setId(json.id);
    this.updateBaubleFromServer(json);
    console.log('emitting bauble');
    this.rootStore.socket.emit('bauble', { bauble: baubleJson, id: json.id });
  };

  updateBaubleFromServer(json) {
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

  addBauble(bauble) {
    this.baubles.push(bauble);
  }

  createBaubleFromSocket = async ({ bauble, id }) => {
    const exist = this.getBaubleById(id);
    if (this.rootStore.treeStore.currentTree.id == bauble.treeId && !exist) {
      new Bauble({
        id: id,
        name: bauble.name,
        text: bauble.text,
        location: bauble.location,
        x: bauble.x,
        y: bauble.y,
        z: bauble.z,
        origin: 'socket',
        store: this,
      });
    }
  };

  getBaubleById = (id) => this.baubles.find((bauble) => bauble.id === id);

  get baubleFromUser() {
    return this.baubles.find((bauble) => bauble.origin === 'user');
  }

  removeBaubleFromUser() {
    const bauble = this.baubles.find((bauble) => bauble.origin === 'user');
    this.baubles.remove(bauble);
  }
}

export default BaublesStore;
