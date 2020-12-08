import StrapiService from '../services/StrapiService';
import { makeObservable, observable, computed, action } from 'mobx';
import Bauble from '../models/Bauble';
import { toast } from 'react-toastify';
import { Notification } from '../components/Content';

class BaublesStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.baubles = [];
    this.strapiService = new StrapiService();

    makeObservable(this, {
      baubles: observable,
      addBauble: action,
      getBaubleById: action,
      baubleFromUser: computed,
      removeBaubleFromUser: action,
    });
  }

  createBauble = async (bauble) => {
    const baubleJson = bauble.asJson;
    if (baubleJson.image) {
      const json = await this.strapiService.createBaubleWithImage(baubleJson);

      bauble.setImage(json.image);
      this.updateBauble(bauble, json, baubleJson);
    } else {
      const json = await this.strapiService.createBauble(baubleJson);
      this.updateBauble(bauble, json, baubleJson);
    }
  };

  updateBauble = async (bauble, json, baubleJson) => {
    await bauble.setId(json.id);
    this.updateBaubleFromServer(json);
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
        origin: 'data',
        style: json.style,
        image: json.image,
        color: json.color,
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
        x: bauble.x,
        y: bauble.y,
        z: bauble.z,
        origin: 'socket',
        style: bauble.style,
        color: bauble.color,
        store: this,
      });

      toast(<Notification name={bauble.name} id={id} />, {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false,
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
