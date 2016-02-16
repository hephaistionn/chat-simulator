module.exports = (React) => {

  const Button = require('../Button')(React);
  const Input = require('../Input')(React);
  const Thread = require('../Thread')(React);

  return require('./view.jsx')(React, Button, Input, Thread);
};
