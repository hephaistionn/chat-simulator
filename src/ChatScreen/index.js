module.exports = emitter => {

  /**
   * Prepare actions
   * An action asks to the store to apply a transformation to the model.
   */
  require('./actions')(emitter);

  /**
   * Prepare the required component
   */
  const React = require('react');
  const ChatBox = require('../components/ChatBox')(React);

  return require('./view.jsx')(React, emitter, ChatBox);
};
