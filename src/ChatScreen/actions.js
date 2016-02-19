module.exports = emitter => {

  /** User sends a message */
  emitter.on('send', function(data) {

    const transform = model => {
      const id = data.id;
      const user = model.users[id];
      if (user.currentMessage === '') {
        return model;
      }
      model.thread.push({
        id: id,
        content: user.currentMessage,
        userName: user.label
      });
      user.currentMessage = '';
      return model;
    };
    /** call store to apply transformation */
    emitter.emit('update', transform);
  });

  /** User writes a message */
  emitter.on('write', function(data) {

    const transform = model => {
      model.users[data.id].currentMessage = data.value;
      return model;
    };
    /** call store to apply transformation */
    emitter.emit('update', transform);
  });
};
