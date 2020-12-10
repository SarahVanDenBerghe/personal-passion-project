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
      const data = await this.strapiService.createBaubleWithImage(baubleJson);
      // console.log(json); image van database
      bauble.setImage(data.image);
      await bauble.setId(data.id);
      this.updateBauble(bauble, data, baubleJson);
    } else {
      const data = await this.strapiService.createBauble(baubleJson);
      await bauble.setId(data.id);
      this.updateBauble(bauble, data, baubleJson);
    }
  };

  updateBauble = async (data, baubleJson) => {
    this.updateBaubleFromServer(data);
    console.log(baubleJson);
    this.rootStore.socket.emit('bauble', { bauble: baubleJson, id: data.id });
  };

  updateBaubleFromServer(data) {
    let bauble = this.baubles.find((bauble) => bauble.id === data.id);

    if (!bauble) {
      bauble = new Bauble({
        id: data.id,
        name: data.name,
        x: data.x,
        y: data.y,
        z: data.z,
        text: data.text,
        origin: 'data',
        style: data.style,
        image: data.image,
        color: data.color,
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
        image: bauble.image,
        store: this,
      });

      console.log(bauble.image); // array buffer what

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
