class Notification {
  constructor({ store, baubleId, name }) {
    if (!store) {
      throw new Error('No store detected');
    }

    this.currentTreeStore = store.treeStore;
    this.baubleId = baubleId;
    this.name = name;
    this.currentTreeStore.addNotification(this);
  }
}

export default Notification;
