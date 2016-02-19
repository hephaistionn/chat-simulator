module.exports = (React, emitter, ChatBox) => {

  const _ = require('lodash');

  return React.createClass({

    componentWillMount: function() {

      /** The view is initialized*/
      this.setState(this.props.model);

      /** The view is redrawn when 'draw' event is triggered.*/
      emitter.on('draw', function(model) {
        this.setState(model);
      }.bind(this));
    },

    componentWillUnmount: function() {
      emitter.off('draw');
    },

    onSendMessage: function(id) {
      emitter.emit('send', {id: id});
    },

    onWriteMessage: function(value, id) {
      emitter.emit('write', {value: value, id: id});
    },

    render: function() {

      if (!this.state) {
        return <div />;
      }

      const users = this.state.users;

      const chats = _.map(users, (user, index) => {
        return <ChatBox
          id={user.id}
          key={index}
          label={user.label}
          currentMessage={user.currentMessage}
          labelButton={this.state.labelButton}
          maxLength={this.state.maxLength}
          thread={this.state.thread}
          onWriteMessage={this.onWriteMessage}
          onSendMessage={this.onSendMessage}
          />;
      });

      return (
        <div className={'screen'}>
          {chats}
        </div>
      );
    }
  });
};
