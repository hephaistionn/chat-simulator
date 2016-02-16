/** Event Manager
 * This component is used to link the store, the view and actions
 * */
const emitter = require('event-emitter')();

/**Model manager
 * This component contains the global model and applies the wanted transformations at model.
 * */
const store = require('./store')(emitter);

/**Current screen
 * This component is a view.
 * A View hasn't logic and internal state
 */
const ChatScreen = require('./ChatScreen')(emitter);

/**Display current screen */
const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render((<ChatScreen
  model={store.getModel()}
  />), document.getElementById('app'));
