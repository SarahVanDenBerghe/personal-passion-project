import { makeObservable, observable, computed, action } from 'mobx';

class Bauble {
  constructor({ store, id, name, x, y, z, text, origin, treeId }) {
    if (!store) {
      throw new Error('No store detected');
    }

    this.store = store;
    this.id = id;
    this.treeId = treeId;
    this.name = name;
    this.x = parseFloat(x);
    this.y = parseFloat(y);
    this.z = parseFloat(z);
    this.text = text;
    this.origin = origin;
    this.store.addBauble(this);

    makeObservable(this, {
      id: observable,
      create: action,
      setId: action,
      asJson: computed,
    });
  }

  create = async () => this.store.createBauble(this);

  updateCoordinates({ x, y, z }) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  // Set id after inserting in database
  setId(id) {
    this.id = parseFloat(id);
  }

  // Set info from AddForm
  setOrigin(origin) {
    this.origin = origin;
  }

  // Set info from AddForm
  setInfo = (data) => {
    this.name = data.name;
    this.text = data.text;
    this.treeId = data.treeId;
  };

  // Get bauble as JSON to send to service
  get asJson() {
    return {
      name: this.name,
      x: parseFloat(this.x),
      y: parseFloat(this.y),
      z: parseFloat(this.z),
      text: this.text,
      treeId: this.treeId,
    };
  }
}

export default Bauble;
