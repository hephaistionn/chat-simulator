
module.exports = (emitter)=> {

  class Store {

    /**
     * constructor
     * @private
     */
    constructor() {
      this.model = {
        userA: {
          id: 'userA',
          label: 'Chat A',
          currentMessage: ''
        },
        userB: {
          id: 'userB',
          label: 'Chat B',
          currentMessage: ''
        },
        thread: [],
        maxLength: 60,
        labelButton: 'OK'
      };
    }

    /**
     * Update store model
     * @param transform
     * @returns {{userA: {id: string, label: string, currentMessage: string}, userB: {id: string, label: string, currentMessage: string}, messages: Array, labelButton: string}|*}
     */
    updateModel(transform) {
      this.model = transform(this.model);
      return this.model;
    }

    /**
     * Get store model
     * @returns {{userA: {id: string, label: string, currentMessage: string}, userB: {id: string, label: string, currentMessage: string}, thread: Array, labelButton: string}|*}
     */
    getModel() {
      return this.model;
    }
  }

  const store = new Store();

  /**
   * The event Update transforms the store model.
   * The interest separation, the emitter mustn't be available in store.
   */
  emitter.on('update', (tranform) => {
    store.updateModel(tranform);
    const model = store.getModel();
    emitter.emit('draw', model) ;
  });

  return store;
};
