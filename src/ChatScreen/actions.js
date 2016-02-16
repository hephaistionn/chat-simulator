module.exports = emitter => {

  emitter.on('send', function (data) {
    emitter.emit('update', model => {
      const id = data.id;
      if(model[id].currentMessage === '') return model;
      model.thread.push({
        id: id,
        content: model[id].currentMessage,
        userName: model[id].label
      });
      model[id].currentMessage = '';
      return model;
    });
  });

  emitter.on('write', function (data) {
    emitter.emit('update', model => {
      model[data.id].currentMessage = data.value;
      return model;
    });
  });
};
