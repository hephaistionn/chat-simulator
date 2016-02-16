module.exports = emitter => {

  /** User sends a message */
  emitter.on('send', function (data) {

    const transform = model => {
      const id = data.id;
      if(model[id].currentMessage === '') return model;
      model.thread.push({
        id: id,
        content: model[id].currentMessage,
        userName: model[id].label
      });
      model[id].currentMessage = '';
      return model;
    };

    emitter.emit('update', transform);
  });

  /** User writes a message */
  emitter.on('write', function (data) {

    const transform = model => {
      model[data.id].currentMessage = data.value;
      return model;
    };

    emitter.emit('update', transform);
  });
};
