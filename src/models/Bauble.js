import { makeObservable, observable, computed, action } from 'mobx';

class Bauble {
  constructor({ store, id = undefined, name, x, y, z, text, location }) {
    this.store = store;
    this.id = id;
    this.name = name;
    this.x = parseFloat(x);
    this.y = parseFloat(y);
    this.z = parseFloat(z);
    this.text = text;
    this.location = location;
    this.store.addBauble(this);

    if (!store) {
      throw new Error('No store detected');
    }

    makeObservable(this, {
      id: observable,
      create: action,
      setId: action,
      asJson: computed,
    });
  }

  create = async () => this.store.createBauble(this);

  // Set id after inserting in database
  setId(id) {
    this.id = id;
  }

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
}

export default Bauble;
