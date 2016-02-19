module.exports = (emitter)=> {

  class Store {

    /**
     * constructor
     *
     * @private
     */
    constructor() {
      this.model = {
        users: {},
        thread: [],
        maxLength: 60,
        labelButton: 'OK'
      };

      const users = ['A','B','C','D','E'];

      for (let i = 0; i < users.length; i++) {
        this.model.users['user' + user[i]] = {
          id: 'user' + user[i],
          label: 'Chat ' + user[i],
          currentMessage: ''
        };
      }
    }

    /**
     * Update store model
     *
     * @param {func} transform
     * @returns {{userA: {id: string, label: string, currentMessage: string}, userB: {id: string, label: string, currentMessage: string}, messages: Array, labelButton: string}|*}
     */
    updateModel(transform) {
      this.model = transform(this.model);
      return this.model;
    }

    /**
     * Get store model
     *
     * @returns {{userA: {id: string, label: string, currentMessage: string}, userB: {id: string, label: string, currentMessage: string}, thread: Array, labelButton: string}|*}
     */
    getModel() {
      return this.model;
    }
  }

  const store = new Store();

  /**
   * The 'update' event  transforms the store model.
   * The interest separation, the emitter mustn't be available in store.
   */
  emitter.on('update', (transform) => {
    store.updateModel(transform);
    const model = store.getModel();
    /**  force redraw */
    emitter.emit('draw', model);
  });

  return store;
};
