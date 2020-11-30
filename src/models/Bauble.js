import { makeObservable, observable, computed, action } from 'mobx';

class Bauble {
  constructor({ store, id, name, x, y, z, text, location, origin }) {
    this.store = store;
    this.id = id;
    this.name = name;
    this.x = parseFloat(x);
    this.y = parseFloat(y);
    this.z = parseFloat(z);
    this.text = text;
    this.location = location;
    this.origin = origin;
    this.store.addBauble(this);

    if (!store) {
      throw new Error('No store detected');
    }

    makeObservable(this, {
      id: observable,
      create: action,
      setId: action,
      idBauble: computed,
      asJson: computed,
    });
  }

  create = async () => this.store.createBauble(this);

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
    this.location = data.location;
  };

  // Get bauble as JSON to send to service
  get asJson() {
    return {
      name: this.name,
      x: parseFloat(this.x),
      y: parseFloat(this.y),
      z: parseFloat(this.z),
      text: this.text,
      location: this.location,
    };
  }

  get idBauble() {
    return this.id;
  }
}

export default Bauble;
